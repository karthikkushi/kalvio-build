import { describe, expect, it } from 'vitest'
import { BUSINESS_KEYS } from '../data/types'
import { kitMessages } from './messages'

const link = 'https://kalvio-build.pages.dev/demo/dermatologist?name=Avance'

describe('kitMessages', () => {
  it('greets doctors as Doctor and sends the link in the first message', () => {
    const m = kitMessages({ key: 'dermatologist', name: 'Avance Derma', link, sender: 'Shreya' })
    expect(m.sample).toBe(
      `Hi Doctor, this is Shreya from Kalvio Build. As we talked on the phone, here is the free sample website we made for Avance Derma:\n${link}`,
    )
    expect(m.details).toContain('your own photos, treatments and details')
    expect(m.details).toContain('billing, a reception dashboard and analytics for clinics')
  })

  it('says plain Hi to shops', () => {
    const m = kitMessages({ key: 'bakery_sweets', name: 'Sri Ganesh Bakery', link, sender: 'Shreya' })
    expect(m.sample.startsWith('Hi, this is Shreya')).toBe(true)
    expect(m.details).toContain('for bakeries')
  })

  it.each(BUSINESS_KEYS)('%s: no prices, no link in the second message', (key) => {
    const m = kitMessages({ key, name: 'Test Shop', link, sender: 'Shreya' })
    for (const text of [m.sample, m.details]) expect(text).not.toMatch(/₹|\$|price list|\bfrom\s+\d/i)
    expect(m.details).not.toContain('http')
    expect(m.sample).toContain(link)
  })
})
