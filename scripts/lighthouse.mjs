// Usage: node scripts/lighthouse.mjs <baseUrl> <path> [path...]
// Mobile Lighthouse (simulated slow 4G, mid-range phone) with the installed Chrome.
// Writes docs/lighthouse/<slug>.json (scores + key metrics) and prints a table.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [base, ...paths] = process.argv.slice(2)
const out = 'docs/lighthouse'
mkdirSync(out, { recursive: true })
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const rows = []
for (const p of paths) {
  const slug = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[/?&=%]+/g, '_')).slice(0, 80)
  const tmp = join(out, `.${slug}.full.json`)
  execFileSync(
    'node_modules/.bin/lighthouse',
    [base + p, '--quiet', '--form-factor=mobile', '--chrome-flags=--headless=new', '--output=json', `--output-path=${tmp}`],
    { env: { ...process.env, CHROME_PATH: chrome }, stdio: 'ignore' },
  )
  const r = JSON.parse(readFileSync(tmp, 'utf8'))
  rmSync(tmp)
  const score = (k) => Math.round((r.categories[k]?.score ?? 0) * 100)
  const summary = {
    url: p,
    fetchTime: r.fetchTime,
    performance: score('performance'),
    accessibility: score('accessibility'),
    bestPractices: score('best-practices'),
    seo: score('seo'),
    fcp: r.audits['first-contentful-paint'].displayValue,
    lcp: r.audits['largest-contentful-paint'].displayValue,
    tbt: r.audits['total-blocking-time'].displayValue,
    cls: r.audits['cumulative-layout-shift'].displayValue,
    failing: Object.values(r.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && ['binary', 'numeric', 'metricSavings'].includes(a.scoreDisplayMode))
      .map((a) => a.id),
  }
  writeFileSync(join(out, `${slug}.json`), JSON.stringify(summary, null, 2) + '\n')
  rows.push(summary)
}
console.table(rows.map(({ url, performance, accessibility, bestPractices, seo, fcp, lcp, cls }) => ({ url, performance, accessibility, bestPractices, seo, fcp, lcp, cls })))
for (const r of rows) if (r.failing.length) console.log(r.url, 'below 0.9:', r.failing.join(', '))
