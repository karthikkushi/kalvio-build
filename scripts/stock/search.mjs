// Dev helper for curating stock photos: searches Unsplash (free licence only, no Unsplash+),
// writes a numbered contact sheet PNG + a JSON of candidates so photos can be picked by eye.
// Usage: node scripts/stock/search.mjs <outDir> "<query>" [perPage=24] [orientation]
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [outDir, query, perPage = '24', orientation = ''] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const slug = query.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}${orientation ? `&orientation=${orientation}` : ''}`
// The public endpoint rate-limits bursts; wait and retry a few times.
let data
for (let attempt = 0; attempt < 5; attempt++) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (res.ok) {
    data = await res.json()
    break
  }
  await new Promise((r) => setTimeout(r, 15000 * (attempt + 1)))
}
if (!data) throw new Error(`Unsplash search failed for "${query}"`)
const items = data.results
  .filter((r) => !r.premium && !r.plus && !r.urls.raw.includes('plus.unsplash.com'))
  .map((r) => ({
    id: r.id,
    raw: r.urls.raw.split('?')[0],
    w: r.width,
    h: r.height,
    alt: r.alt_description,
    author: r.user.name,
    authorUrl: r.user.links.html,
    page: r.links.html,
  }))

const cell = 300
const cols = 4
const tiles = []
for (const [i, it] of items.entries()) {
  const buf = await (await fetch(`${it.raw}?w=${cell * 2}&h=${cell * 2}&fit=crop&q=60&fm=jpg`)).arrayBuffer()
  const label = Buffer.from(
    `<svg width="${cell}" height="${cell}"><rect x="0" y="0" width="54" height="34" fill="#000" opacity="0.75"/><text x="8" y="25" font-size="22" font-family="Arial" font-weight="bold" fill="#fff">${i}</text></svg>`,
  )
  const tile = await sharp(Buffer.from(buf)).resize(cell, cell, { fit: 'cover' }).composite([{ input: label }]).png().toBuffer()
  tiles.push({ input: tile, left: (i % cols) * cell, top: Math.floor(i / cols) * cell })
}
const rows = Math.ceil(items.length / cols)
await sharp({ create: { width: cols * cell, height: Math.max(rows, 1) * cell, channels: 3, background: '#222' } })
  .composite(tiles)
  .png()
  .toFile(join(outDir, `${slug}.png`))
writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(items, null, 2))
console.log(`${items.length} free results -> ${join(outDir, slug)}.png`)
items.forEach((it, i) => console.log(i, it.id, `${it.w}x${it.h}`, (it.alt || '').slice(0, 70)))
