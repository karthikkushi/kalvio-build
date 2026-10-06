import { describe, expect, it } from 'vitest'
import { dentist } from '../data/businesses/dentist'
import { home_services } from '../data/businesses/home_services'
import { buildDemo } from './demo'

const at = (q: string, date = '2026-10-06') => buildDemo(dentist, new URLSearchParams(q), 'https://x.test/demo/dentist?' + q, new Date(date))

describe('buildDemo (the /demo link contract)', () => {
  it('falls back to the preset demo shop when params are missing', () => {
    const d = at('')
    expect(d.name).toBe(dentist.demo.name)
    expect(d.personalised).toBe(false)
    expect(d.phone).toBeNull()
    expect(d.theme.key).toBe(dentist.defaultTheme)
  })

  it('uses the shop’s own details', () => {
    const d = at('name=Avinashi%20Dental%20Clinic&area=Jayanagar&city=Bengaluru&phone=%2B919036993516&theme=warm-boutique')
    expect(d.name).toBe('Avinashi Dental Clinic')
    expect(d.monogram).toBe('AD')
    expect(d.area).toBe('Jayanagar')
    expect(d.phone?.e164).toBe('+919036993516')
    expect(d.theme.key).toBe('warm-boutique')
    expect(d.personalised).toBe(true)
    // The demo street address must never be shown under a real shop's name.
    expect(d.street).toBe('')
  })

  it('accepts a raw + in the phone (decoded as a space) and old style names', () => {
    const d = at('name=X&phone=+919036993516&theme=glassmorphism')
    expect(d.phone?.e164).toBe('+919036993516')
    expect(d.theme.key).toBe('clean-clinical')
  })

  it('strips markup and caps lengths', () => {
    const d = at('name=' + encodeURIComponent('<script>alert(1)</script>' + 'a'.repeat(200)))
    expect(d.name).not.toContain('<')
    expect(d.name.length).toBeLessThanOrEqual(80)
  })

  it('ignores unknown themes and languages', () => {
    const d = at('theme=neon&lang=fr')
    expect(d.theme.key).toBe(dentist.defaultTheme)
    expect(d.lang).toBe('en')
  })

  it('picks the seasonal offer by date, and ?season= overrides it', () => {
    expect(at('', '2026-10-06').offer?.season).toBe('dasara')
    expect(at('', '2026-11-01').offer?.season).toBe('diwali')
    expect(at('', '2027-07-01').offer).toBeNull()
    expect(at('season=wedding', '2027-07-01').offer?.season).toBe('wedding')
  })

  it('formats US numbers and dollars for US presets', () => {
    const d = buildDemo(home_services, new URLSearchParams('phone=512-555-0199'), 'https://x.test/', new Date('2026-10-06'))
    expect(d.phoneDisplay).toBe('(512) 555-0199')
    expect(d.money(1450)).toBe('$1,450')
    expect(d.offer?.season).toBe('fall')
  })
})
