import { describe, expect, it } from 'vitest'
import { SEASONS } from '../config/seasons'
import { stockImage } from '../lib/stock'
import { THEMES } from '../themes'
import type { BusinessPreset, SectionConfig } from './types'

const modules = import.meta.glob<Record<string, BusinessPreset>>('./businesses/*.ts', { eager: true })
const presets = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts'))
  .map(([path, mod]) => {
    const key = path.match(/\/(\w+)\.ts$/)![1]
    return mod[key]
  })

/** Every StockRef used by a section, so a typo in a slot name fails here instead of on a phone. */
function imagesIn(s: SectionConfig): string[] {
  switch (s.kind) {
    case 'team':
      return s.people.map((p) => p.image)
    case 'beforeAfter':
    case 'about':
      return [s.image]
    case 'gallery':
      return s.items.map((i) => i.image)
    case 'services':
      return s.groups.flatMap((g) => g.items.flatMap((i) => (i.image ? [i.image] : [])))
    default:
      return []
  }
}

describe.each(presets)('preset $key', (p) => {
  it('has a known default theme', () => {
    expect(THEMES[p.defaultTheme]).toBeDefined()
  })

  it('resolves every photo', () => {
    const refs = [p.hero.image, ...p.sections.flatMap(imagesIn)]
    for (const ref of refs) expect(() => stockImage(p.key, ref), ref).not.toThrow()
  })

  it('has unique section ids and a booking or call path', () => {
    const ids = p.sections.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toContain('visit')
  })

  it('only uses known seasons', () => {
    const known = new Set(SEASONS.map((s) => s.id))
    for (const o of p.offers) expect(known.has(o.season), o.season).toBe(true)
  })

  it('has enough proof: 3 reviews, 4+ FAQs, 3 chips, 3+ badges', () => {
    expect(p.reviews).toHaveLength(3)
    expect(p.faq.length).toBeGreaterThanOrEqual(4)
    expect(p.hero.chips).toHaveLength(3)
    expect(p.badges.length).toBeGreaterThanOrEqual(3)
  })

  it('puts {area} in the headline so the owner sees their locality', () => {
    expect(p.hero.headline.en).toContain('{area}')
    if (p.hero.headline.kn) expect(p.hero.headline.kn).toContain('{area}')
    if (p.hero.headline.hi) expect(p.hero.headline.hi).toContain('{area}')
  })
})
