import { BUSINESS_KEYS, type BusinessKey, type BusinessPreset } from '../types'

// Each preset is its own chunk, so a /demo page only downloads the business it shows.
const loaders = import.meta.glob<Record<string, BusinessPreset>>('./*.ts')
const cache = new Map<BusinessKey, BusinessPreset>()

export function isBusinessKey(k: string | undefined): k is BusinessKey {
  return !!k && (BUSINESS_KEYS as readonly string[]).includes(k)
}

export function hasPreset(key: BusinessKey): boolean {
  return `./${key}.ts` in loaders
}

export async function loadPreset(key: BusinessKey): Promise<BusinessPreset> {
  const hit = cache.get(key)
  if (hit) return hit
  const mod = await loaders[`./${key}.ts`]()
  cache.set(key, mod[key])
  return mod[key]
}

/** Already-loaded preset, so the first render after boot can be synchronous (no blank frame). */
export function cachedPreset(key: BusinessKey): BusinessPreset | undefined {
  return cache.get(key)
}
