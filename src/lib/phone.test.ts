import { describe, expect, it } from 'vitest'
import { parsePhone } from './phone'
import { initials } from './monogram'

describe('parsePhone', () => {
  it.each([
    ['+919036993516', '+919036993516'],
    [' 919036993516', '+919036993516'], // "+" decoded to a space by URLSearchParams
    ['9036993516', '+919036993516'],
    ['09036993516', '+919036993516'],
    ['+91 90369-93516', '+919036993516'],
  ])('IN %s', (raw, e164) => {
    expect(parsePhone(raw, 'IN')?.e164).toBe(e164)
  })

  it('formats Indian numbers for display', () => {
    expect(parsePhone('9036993516', 'IN')?.display).toBe('+91 90369 93516')
  })

  it('handles US numbers', () => {
    const p = parsePhone('512-555-0142', 'US')
    expect(p?.e164).toBe('+15125550142')
    expect(p?.display).toBe('(512) 555-0142')
  })

  it('rejects junk', () => {
    expect(parsePhone('abc', 'IN')).toBeNull()
    expect(parsePhone('', 'IN')).toBeNull()
  })
})

describe('initials', () => {
  it.each([
    ['Avinashi Dental Clinic', 'AD'],
    ["Dr. Rao's Smile Care", 'RS'],
    ['The Bridal Room', 'BR'],
    ['Sri Lakshmi Jewellers', 'LJ'],
    ['Glow', 'G'],
  ])('%s -> %s', (name, want) => {
    expect(initials(name)).toBe(want)
  })
})
