// Usage: node scripts/previews.mjs [baseUrl]   (default: the live site)
// Captures every sample the way an iPhone 15 shows it in Safari: 393 pt wide, and 758 pt tall, which is the
// 852 pt screen minus the status bar (54) and Safari's minimised address bar (40). Writes:
//   public/previews/<key>.webp           the screenshot shown inside the iPhone frame on the landing page
//   src/data/previews.generated.json     size + the page's top and bottom colours, so the status bar and
//                                        Safari bar take on each site's colours like real Safari does
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'

const base = process.argv[2] ?? 'https://kalvio-build.pages.dev'
const keys = readdirSync('src/data/businesses')
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .map((f) => f.replace('.ts', ''))
mkdirSync('public/previews', { recursive: true })

const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
const isDark = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b < 140

async function pixel(png, x, y) {
  const { data } = await sharp(png).extract({ left: x, top: y, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true })
  return [data[0], data[1], data[2]]
}

const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({
  viewport: { width: 393, height: 758 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  reducedMotion: 'reduce',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
})
// Hide the "sample by Kalvio Build" ribbon: the landing page frames these itself.
await ctx.addInitScript(() => sessionStorage.setItem('kb-ribbon-hidden', '1'))
const page = await ctx.newPage()
const meta = {}
const W = 600
for (const key of keys) {
  await page.goto(`${base}/demo/${key}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const png = await page.screenshot()
  const { width, height } = await sharp(png).metadata()
  const top = await pixel(png, 6, 6)
  const bottom = await pixel(png, 6, height - 4)
  const info = await sharp(png).resize({ width: W }).webp({ quality: 72 }).toFile(`public/previews/${key}.webp`)
  meta[key] = {
    width: W,
    height: Math.round((W * height) / width),
    top: hex(top),
    topDark: isDark(top),
    bottom: hex(bottom),
    bottomDark: isDark(bottom),
  }
  console.log(key.padEnd(16), Math.round(info.size / 1024) + ' KB', meta[key].top, meta[key].bottom)
}
writeFileSync('src/data/previews.generated.json', JSON.stringify(meta, null, 2) + '\n')
await browser.close()
