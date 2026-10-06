import { describe, expect, it } from 'vitest'
import { CATALOG } from './catalog'
import { BUSINESS_KEYS, type BusinessPreset } from './types'

const modules = import.meta.glob<Record<string, BusinessPreset>>('./businesses/*.ts', { eager: true })

describe('catalog', () => {
  it('lists every business key exactly once', () => {
    expect(CATALOG.map((c) => c.key).sort()).toEqual([...BUSINESS_KEYS].sort())
  })

  it.each(CATALOG)('$key matches its preset', (c) => {
    const preset = modules[`./businesses/${c.key}.ts`][c.key]
    expect(preset.demo.name).toBe(c.demoName)
    expect(preset.region).toBe(c.region)
  })
})
