import { describe, expect, it } from 'vitest'
import { ogKey, shotKey } from './sharekit'

describe('share cache keys', () => {
  const base = { key: 'dentist', theme: 'clean-clinical', name: 'Avinashi Dental Clinic', area: 'Jayanagar', city: 'Bengaluru' }

  it('are stable (the edge function and the share page must compute the same key)', async () => {
    expect(await ogKey(base)).toBe(await ogKey({ ...base }))
    expect(await ogKey(base)).toMatch(/^[a-f0-9]{24}$/)
  })

  it('change when anything printed on the image changes', async () => {
    const k = await ogKey(base)
    expect(await ogKey({ ...base, name: 'Avinashi Dental Care' })).not.toBe(k)
    expect(await ogKey({ ...base, theme: 'warm-boutique' })).not.toBe(k)
  })

  it('screenshot keys depend on the whole sample link', async () => {
    expect(await shotKey('/demo/dentist?name=A')).not.toBe(await shotKey('/demo/dentist?name=A&phone=%2B919036993516'))
  })
})
