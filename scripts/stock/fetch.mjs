// Downloads the curated photos in scripts/stock/manifest.json from Unsplash (free licence),
// writes AVIF + WebP at several widths to public/stock/<key>/<slot>-<w>.<ext>,
// records sizes in src/data/stock.generated.json and credits in public/stock/CREDITS.md.
// Already-processed photos are skipped, so it is safe to re-run after adding entries.
// Usage: node scripts/stock/fetch.mjs [businessKey...]
import sharp from 'sharp'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../../', import.meta.url).pathname
const manifest = JSON.parse(readFileSync(join(root, 'scripts/stock/manifest.json'), 'utf8'))
const outJson = join(root, 'src/data/stock.generated.json')
const db = existsSync(outJson) ? JSON.parse(readFileSync(outJson, 'utf8')) : {}
const WIDTHS = [480, 640, 800, 1200, 1600]
const cacheDir = join(root, '.cache/stock')
const force = process.argv.includes('--force')
/**
 * AVIF + WebP at one width. The hero is the largest download on the first screen and sits under a dark
 * gradient, so it gets a byte budget: quality steps down until the 800 px AVIF is under ~36 KB.
 */
export async function encode(src, base, w, hero) {
  const img = sharp(src).resize({ width: w })
  const budget = hero ? Math.round((36_000 * (w * w)) / (800 * 800)) : Infinity
  let q = hero ? 44 : 50
  let avif = await img.clone().avif({ quality: q, effort: 6 }).toBuffer()
  while (avif.length > budget && q > 28) {
    q -= 4
    avif = await img.clone().avif({ quality: q, effort: 6 }).toBuffer()
  }
  writeFileSync(`${base}.avif`, avif)
  await img.clone().webp({ quality: hero ? Math.min(64, q + 20) : 72 }).toFile(`${base}.webp`)
}

const only = process.argv.slice(2).filter((a) => !a.startsWith('--'))

for (const [key, slots] of Object.entries(manifest)) {
  if (only.length && !only.includes(key)) continue
  const dir = join(root, 'public/stock', key)
  mkdirSync(dir, { recursive: true })
  db[key] ??= {}
  for (const [slot, entry] of Object.entries(slots)) {
    const prev = db[key][slot]
    if (!force && prev && prev.id === entry.id && existsSync(join(dir, `${slot}-${prev.widths[0]}.avif`))) {
      Object.assign(prev, { alt: entry.alt, focus: entry.focus ?? '50% 50%' })
      continue
    }
    const info = await (await fetch(`https://unsplash.com/napi/photos/${entry.id}`, { headers: { Accept: 'application/json' } })).json()
    if (info.premium || info.plus) throw new Error(`${key}/${slot}: ${entry.id} is Unsplash+ (not free licence)`)
    const raw = info.urls.raw.split('?')[0]
    const src = Buffer.from(await (await fetch(`${raw}?w=1600&q=85&fm=jpg`)).arrayBuffer())
    // Keep the source so sizes and quality can be changed later without downloading again.
    mkdirSync(cacheDir, { recursive: true })
    writeFileSync(join(cacheDir, `${entry.id}.jpg`), src)
    const meta = await sharp(src).metadata()
    // Portraits never render wider than ~600 CSS px, so 1200 px is enough and saves bytes.
    const maxW = meta.height > meta.width ? 1200 : 1600
    const widths = WIDTHS.filter((w) => w <= Math.min(meta.width, maxW))
    for (const w of widths) await encode(src, join(dir, `${slot}-${w}`), w, slot === 'hero')
    db[key][slot] = {
      id: entry.id,
      width: meta.width,
      height: meta.height,
      widths,
      alt: entry.alt,
      focus: entry.focus ?? '50% 50%',
      author: info.user.name,
      authorUrl: info.user.links.html,
      page: info.links.html,
      raw,
    }
    console.log(`${key}/${slot} <- ${entry.id} (${info.user.name}) ${meta.width}x${meta.height}`)
  }
}

mkdirSync(join(root, 'src/data'), { recursive: true })
writeFileSync(outJson, JSON.stringify(db, null, 2) + '\n')
const lines = [
  '# Photo credits',
  '',
  'All photos are from [Unsplash](https://unsplash.com) under the [Unsplash Licence](https://unsplash.com/license)',
  '(free for commercial use, no permission needed). They are downloaded and self-hosted, never hot-linked.',
  'Regenerate with `node scripts/stock/fetch.mjs` after editing `scripts/stock/manifest.json`.',
  '',
]
for (const [key, slots] of Object.entries(db)) {
  lines.push(`## ${key}`, '')
  for (const [slot, p] of Object.entries(slots)) {
    lines.push(`- \`${slot}\`: [photo](${p.page}) by [${p.author}](${p.authorUrl})`)
  }
  lines.push('')
}
writeFileSync(join(root, 'public/stock/CREDITS.md'), lines.join('\n'))
