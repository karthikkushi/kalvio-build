// Link-preview images (1200×630 JPEG, ~100 KB) for WhatsApp, Facebook and X: public/og/<key>.jpg and home.jpg.
// The shop's own name is in og:title (set per link by the edge function); the image names the kind of business.
// Usage: node scripts/og.mjs   (after scripts/stock/fetch.mjs and scripts/previews.mjs)
import sharp from 'sharp'
import { mkdirSync, readFileSync } from 'node:fs'

const stock = JSON.parse(readFileSync('src/data/stock.generated.json', 'utf8'))
const catalogSrc = readFileSync('src/data/catalog.ts', 'utf8')
const catalog = [...catalogSrc.matchAll(/key: '(\w+)', label: '([^']+)'/g)].map((m) => ({ key: m[1], label: m[2] }))
mkdirSync('public/og', { recursive: true })

const W = 1200
const H = 630
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#39;')
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

function wrap(text, max) {
  const words = text.split(' ')
  const lines = ['']
  for (const w of words) {
    const cur = lines[lines.length - 1]
    if ((cur + ' ' + w).trim().length > max) lines.push(w)
    else lines[lines.length - 1] = (cur + ' ' + w).trim()
  }
  return lines
}

function textSvg({ eyebrow, title, footer, max = 22 }) {
  const lines = wrap(title, max)
  const size = lines.length > 2 ? 64 : 76
  const startY = 330 - ((lines.length - 1) * size * 1.08) / 2
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#14121f" stop-opacity="0.96"/><stop offset="0.55" stop-color="#14121f" stop-opacity="0.82"/><stop offset="1" stop-color="#14121f" stop-opacity="0.05"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="${startY - size - 8}" font-family="${FONT}" font-size="26" font-weight="700" letter-spacing="3" fill="#C9C3FF">${esc(eyebrow.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="72" y="${startY + i * size * 1.08}" font-family="${FONT}" font-size="${size}" font-weight="700" fill="#FFFFFF">${esc(l)}</text>`).join('')}
  <rect x="72" y="520" width="44" height="44" rx="11" fill="#C9C3FF"/>
  <path transform="translate(72 520) scale(0.6875)" d="M20 16h7v13.5L39.5 16H48L34.8 30.2 48.5 48h-8.7L29.9 34.7 27 37.8V48h-7z" fill="#14121F"/>
  <text x="132" y="551" font-family="${FONT}" font-size="28" font-weight="700" fill="#FFFFFF">Kalvio Build</text>
  <text x="318" y="551" font-family="${FONT}" font-size="26" fill="#FFFFFF" fill-opacity="0.75">${esc(footer)}</text>
</svg>`)
}

for (const { key, label } of catalog) {
  const hero = stock[key].hero
  const src = `public/stock/${key}/hero-${Math.max(...hero.widths)}.webp`
  const [fx, fy] = hero.focus.split(' ').map((v) => parseFloat(v) / 100)
  // Photo on the right two-thirds, cropped around the slot's focus point.
  const meta = await sharp(src).metadata()
  const scale = Math.max(W / meta.width, H / meta.height)
  const rw = Math.round(meta.width * scale)
  const rh = Math.round(meta.height * scale)
  const left = Math.min(Math.max(Math.round(rw * fx - W * 0.62), 0), rw - W)
  const top = Math.min(Math.max(Math.round(rh * fy - H / 2), 0), rh - H)
  const photo = await sharp(src).resize(rw, rh).extract({ left, top, width: W, height: H }).toBuffer()
  const info = await sharp(photo)
    .composite([{ input: textSvg({ eyebrow: 'Free website sample', title: label.replace(' (USA)', ''), footer: '· See your website before you pay' }) }])
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(`public/og/${key}.jpg`)
  console.log(key.padEnd(16), Math.round(info.size / 1024) + ' KB')
}

// Home: three sample phones on the brand background.
const phones = ['salon_beauty', 'restaurant_cafe']
const phoneW = 210
const tiles = await Promise.all(
  phones.map(async (k, i) => ({
    input: await sharp(`public/previews/${k}.webp`)
      .resize(phoneW)
      .extract({ left: 0, top: 0, width: phoneW, height: 400 })
      .composite([{ input: Buffer.from(`<svg width="${phoneW}" height="400"><rect width="${phoneW}" height="400" rx="26" fill="none" stroke="#C9C3FF" stroke-opacity="0.35" stroke-width="3"/></svg>`) }])
      .png()
      .toBuffer(),
    left: 730 + i * 230,
    top: 70 + i * 70,
  })),
)
const home = await sharp({ create: { width: W, height: H, channels: 3, background: '#14121f' } })
  .composite([
    { input: textSvg({ eyebrow: 'Websites for local shops', title: 'See your shop’s website before you pay', footer: '· Free sample in 1 minute', max: 15 }) },
    ...tiles,
  ])
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile('public/og/home.jpg')
console.log('home'.padEnd(16), Math.round(home.size / 1024) + ' KB')
