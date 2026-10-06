import stock from '../data/stock.generated.json'
import type { BusinessKey, StockRef } from '../data/types'

export interface StockImage {
  base: string
  width: number
  height: number
  widths: number[]
  alt: string
  focus: string
}

type StockDb = Record<string, Record<string, Omit<StockImage, 'base'> & { id: string }>>
const db = stock as StockDb

/** Resolves `slot` (or `otherKey/slot`) to a self-hosted image under /stock. */
export function stockImage(key: BusinessKey, ref: StockRef): StockImage {
  const [k, slot] = ref.includes('/') ? ref.split('/') : [key, ref]
  const entry = db[k]?.[slot]
  if (!entry) throw new Error(`Missing stock photo ${k}/${slot}. Add it to scripts/stock/manifest.json.`)
  return { ...entry, base: `/stock/${k}/${slot}` }
}

export function srcSet(img: StockImage, ext: 'avif' | 'webp'): string {
  return img.widths.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ')
}
