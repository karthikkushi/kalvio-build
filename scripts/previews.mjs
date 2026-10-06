// Usage: node scripts/previews.mjs <baseUrl>   (run against `npm run pages:dev` or a deployed preview)
// Phone-sized first-screen previews of every sample for the landing page: public/previews/<key>.webp
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { mkdirSync, readdirSync } from 'node:fs'

const base = process.argv[2] ?? 'http://127.0.0.1:8788'
const keys = readdirSync('src/data/businesses')
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .map((f) => f.replace('.ts', ''))
mkdirSync('public/previews', { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })
// Hide the "sample by Kalvio Build" ribbon: the landing page frames these itself.
await ctx.addInitScript(() => sessionStorage.setItem('kb-ribbon-hidden', '1'))
const page = await ctx.newPage()
for (const key of keys) {
  await page.goto(`${base}/demo/${key}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const png = await page.screenshot()
  const info = await sharp(png).resize({ width: 560 }).webp({ quality: 70 }).toFile(`public/previews/${key}.webp`)
  console.log(key.padEnd(16), Math.round(info.size / 1024) + ' KB')
}
await browser.close()
