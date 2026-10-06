// After `vite build` + the SSR build of src/entry-prerender.tsx:
// writes a static HTML page for every business × theme with the first screen already rendered,
// critical CSS inlined, and the hero photo, display font and JS chunks preloaded.
//   dist/demo/<key>.html            default theme (served as-is by any static host)
//   dist/_demo/<key>/<theme>.html   every theme (picked by the edge function, functions/demo/[key].ts)
//   dist/_demo/defaults.json        demo defaults the edge function needs
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = 'dist'
const ORIGIN = process.env.SITE_ORIGIN ?? 'https://kalvio-build.pages.dev'
const manifestPath = join(dist, '.vite/manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const ssr = await import(pathToFileURL(join(process.cwd(), 'dist-ssr/entry-prerender.js')).href)
// index.html hard-codes the default origin for og:image; swap in SITE_ORIGIN when a custom domain is set.
const shell = readFileSync(join(dist, 'index.html'), 'utf8').replaceAll('https://kalvio-build.pages.dev', ORIGIN)
const assets = readdirSync(join(dist, 'assets'))

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function deps(key, seen = new Set()) {
  const chunk = manifest[key]
  if (!chunk || seen.has(key)) return seen
  seen.add(key)
  for (const i of chunk.imports ?? []) deps(i, seen)
  return seen
}

const entry = manifest['index.html']
const css = (entry.css ?? []).map((f) => readFileSync(join(dist, f), 'utf8')).join('\n')
const entryDeps = deps('index.html')

function fontFile(stack, weight) {
  const family = /'([^']+)'/.exec(stack)?.[1]
  if (!family) return null
  const slug = family.toLowerCase().replace(/\s+/g, '-')
  return assets.find((a) => a.startsWith(`${slug}-latin-${weight}-normal-`) && a.endsWith('.woff2')) ?? null
}

// Shown only when a personalised link is opened without the edge step (e.g. on a plain static host):
// hide the default content until React has rendered the shop's own details.
const WAIT = `<script>(function(){var d=document.documentElement;if(!d.hasAttribute('data-edge')&&/[?&](name|area|city|phone|theme|lang)=/.test(location.search)){d.classList.add('kb-wait');setTimeout(function(){d.classList.remove('kb-wait')},6000)}})()</script><style>.kb-wait #root{visibility:hidden}</style>`

let count = 0
for (const preset of ssr.presets) {
  const chunks = new Set([...deps('src/pages/Demo.tsx'), ...deps(`src/data/businesses/${preset.key}.ts`)])
  const modulepreload = [...chunks]
    .filter((k) => !entryDeps.has(k))
    .map((k) => `<link rel="modulepreload" crossorigin fetchpriority="low" href="/${manifest[k].file}">`)
    .join('')
  for (const themeKey of ssr.themeKeys) {
    const r = ssr.render(preset, themeKey, ORIGIN)
    const srcset = r.hero.widths.map((w) => `${r.hero.base}-${w}.avif ${w}w`).join(', ')
    const font = fontFile(r.displayFont, r.displayWeight)
    const head = [
      WAIT,
      `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset}" imagesizes="(min-width: 1024px) 560px, calc(100vw - 32px)" fetchpriority="high">`,
      font ? `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${font}">` : '',
      modulepreload,
      `<link rel="canonical" href="${ORIGIN}/demo/${preset.key}">`,
      `<meta property="og:url" content="${ORIGIN}/demo/${preset.key}">`,
    ].join('')

    let html = shell
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.description)}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.title)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(r.description)}`)
      .replace(/(<meta property="og:image" content=")[^"]*/, `$1${ORIGIN}/og/${preset.key}.jpg`)
      .replace(/(<meta name="theme-color" content=")[^"]*/, `$1${r.themeColor}`)
      .replace(/<link rel="stylesheet"[^>]*>/, `<style>${css}</style>`)
      .replace('<!--app-head-->', head)
      .replace('<div id="root"></div>', `<div id="root">${r.html}</div>`)
      // The page is already painted; let the hero photo and fonts win the bandwidth race over JavaScript.
      .replace('<script type="module" crossorigin src=', '<script type="module" crossorigin fetchpriority="low" src=')

    mkdirSync(join(dist, '_demo', preset.key), { recursive: true })
    writeFileSync(join(dist, '_demo', preset.key, `${themeKey}.html`), html)
    if (themeKey === preset.defaultTheme) {
      mkdirSync(join(dist, 'demo'), { recursive: true })
      writeFileSync(join(dist, 'demo', `${preset.key}.html`), html)
    }
    count++
  }
}
writeFileSync(join(dist, '_demo', 'defaults.json'), JSON.stringify(ssr.defaults()))

// The empty app shell becomes 404.html (Cloudflare Pages serves it for unknown paths, with a 404 status);
// index.html gets the prerendered landing page.
const lowPriority = (html) =>
  html
    .replace('<script type="module" crossorigin src=', '<script type="module" crossorigin fetchpriority="low" src=')
    .replace(/<link rel="modulepreload" crossorigin href=/g, '<link rel="modulepreload" crossorigin fetchpriority="low" href=')
writeFileSync(join(dist, '404.html'), shell.replace('<!--app-head-->', '<meta name="robots" content="noindex">'))
const landingChunks = [...deps('src/pages/Landing.tsx')]
  .filter((k) => !entryDeps.has(k))
  .map((k) => `<link rel="modulepreload" crossorigin fetchpriority="low" href="/${manifest[k].file}">`)
  .join('')
const landingFont = fontFile("'Outfit'", 700)
writeFileSync(
  join(dist, 'index.html'),
  lowPriority(
    shell
      .replace(/<link rel="stylesheet"[^>]*>/, `<style>${css}</style>`)
      .replace(
        '<!--app-head-->',
        [landingFont ? `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${landingFont}">` : '', landingChunks, `<link rel="canonical" href="${ORIGIN}/">`].join(''),
      )
      .replace('<div id="root"></div>', `<div id="root">${ssr.renderLanding()}</div>`),
  ),
)
rmSync(join(dist, '.vite'), { recursive: true, force: true })
// Only cleanup: macOS Finder can drop a .DS_Store into the folder while it is being removed, so never fail on it.
try {
  if (existsSync('dist-ssr')) rmSync('dist-ssr', { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
} catch (e) {
  console.warn(`postbuild: could not remove dist-ssr (${e.code}); it is ignored by git and safe to delete`)
}
console.log(`postbuild: prerendered the landing page and ${count} sample pages for ${ssr.presets.length} businesses`)
