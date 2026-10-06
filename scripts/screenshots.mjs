// Usage: node scripts/screenshots.mjs <baseUrl> <outDir> <path> [path...]
// Takes full-page screenshots at 375 px and 1440 px using the installed Google Chrome.
import { chromium } from 'playwright-core'
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const [baseUrl, outDir, ...paths] = process.argv.slice(2)
if (!baseUrl || !outDir || paths.length === 0) {
  console.error('Usage: node scripts/screenshots.mjs <baseUrl> <outDir> <path> [path...]')
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

const widths = [
  { w: 375, h: 812, mobile: true },
  { w: 1440, h: 900, mobile: false },
]

const browser = await chromium.launch({ channel: 'chrome' })
for (const { w, h, mobile } of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    // Final state, no scroll-reveal: Chrome's full-page capture can skip layers that were animating.
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()
  for (const p of paths) {
    const slug = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[/?&=%]+/g, '_')).slice(0, 80)
    await page.goto(baseUrl + p, { waitUntil: 'networkidle' })
    // Scroll through so scroll-triggered content renders, then return to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    await page.waitForTimeout(800)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    // Compressed formats keep the committed screenshots small (a full-page PNG is ~2 MB).
    // Full pages are JPEG because WebP can't exceed 16,383 px in height.
    const file = join(outDir, `${slug}-${w}.jpg`)
    const fold = await page.screenshot()
    await sharp(fold).webp({ quality: 80 }).toFile(join(outDir, `${slug}-${w}-fold.webp`))
    // scale: 'css' keeps very long pages under Chrome's max texture size (otherwise the capture tiles).
    const full = await page.screenshot({ fullPage: true, scale: 'css' })
    await sharp(full, { limitInputPixels: false }).jpeg({ quality: 76, mozjpeg: true }).toFile(file)
    console.log(`${file}${overflow > 0 ? `  (horizontal overflow ${overflow}px)` : ''}`)
  }
  await ctx.close()
}
await browser.close()
