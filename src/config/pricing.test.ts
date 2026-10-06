import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { FROM_PRICE, PRICING, inr } from './pricing'
import { SITE } from './site'

describe('pricing', () => {
  it('plans go up in price', () => {
    const prices = PRICING.plans.map((p) => p.price)
    expect([...prices].sort((a, b) => a - b)).toEqual(prices)
  })

  it('index.html (link previews and Google) quotes the current starting price and delivery time', () => {
    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
    expect(html).toContain(`From ${inr(FROM_PRICE)}`)
    expect(html).toContain(`live in ${SITE.delivery}`)
    expect(html).not.toMatch(/₹3,000|5 days/)
  })
})
