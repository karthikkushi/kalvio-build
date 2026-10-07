import { SITE } from '../config/site'
import type { Field } from '../data/types'

/** Kalvio Desk public booking function (desk_book). Never throws: WhatsApp already has the details, Desk is the bonus copy. */
export interface DeskBooking {
  name: string
  phone: string
  day?: string
  timePref?: string
  message?: string
  /** Honeypot; real visitors leave it empty. */
  website?: string
}

export async function sendToDesk(slug: string, b: DeskBooking, doFetch: typeof fetch = fetch): Promise<boolean> {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 8000)
  try {
    const res = await doFetch(`${SITE.desk.url}/rest/v1/rpc/desk_book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SITE.desk.key },
      keepalive: true,
      signal: ctl.signal,
      body: JSON.stringify({
        p_slug: slug,
        p_name: b.name,
        p_phone: b.phone,
        p_day: b.day || null,
        p_time_pref: b.timePref || null,
        p_message: b.message || null,
        p_website: b.website || null,
      }),
    })
    const body = res.ok ? await res.json() : null
    return body?.ok === true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Preset field names -> desk_book params: name, phone, date -> day, time or slot -> time preference.
 * Every other filled field (concern, doctor, treatment...) becomes a "Label: value" line in the message.
 * Lengths are cut to what desk_book accepts (time preference 40, message 500) so a long entry is not rejected.
 */
export function toDeskBooking(fields: Field[], get: (name: string) => string): DeskBooking {
  const v = (n: string) => get(n).trim()
  const message = fields
    .filter((f) => !['name', 'phone', 'date', 'time', 'slot'].includes(f.name) && v(f.name))
    .map((f) => `${f.label}: ${v(f.name)}`)
    .join('\n')
  return {
    name: v('name'),
    phone: v('phone'),
    day: v('date'),
    timePref: (v('time') || v('slot')).slice(0, 40),
    message: message.slice(0, 500),
    website: v('website'),
  }
}

/** Opens WhatsApp / SMS first, synchronously, so pop-up blockers allow it; only then sends to Desk (not awaited). */
export function bookViaDesk(slug: string, b: DeskBooking, openMessage: () => void, doFetch?: typeof fetch): Promise<boolean> {
  openMessage()
  return sendToDesk(slug, b, doFetch)
}

/** A product the clinic marked "Show on our website" in Kalvio Desk (desk_public_products). */
export interface DeskProduct {
  id: string
  name: string
  description: string | null
  price_paise: number
  photo_path: string | null
  in_stock: boolean
}

/** The clinic's website products. Never throws: on any failure the section simply doesn't show. */
export async function deskProducts(slug: string, doFetch: typeof fetch = fetch): Promise<DeskProduct[]> {
  try {
    const res = await doFetch(`${SITE.desk.url}/rest/v1/rpc/desk_public_products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SITE.desk.key },
      body: JSON.stringify({ p_slug: slug }),
    })
    const body: unknown = res.ok ? await res.json() : null
    return Array.isArray(body) ? (body as DeskProduct[]) : []
  } catch {
    return []
  }
}

export const deskPhotoUrl = (path: string) => `${SITE.desk.url}/storage/v1/object/public/products/${path}`

/** What the "Order on WhatsApp" button types for the visitor. */
export function orderText(p: Pick<DeskProduct, 'name' | 'price_paise' | 'in_stock'>): string {
  const price = `₹${(p.price_paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
  return p.in_stock
    ? `Hi, I'd like to order ${p.name} (${price}). I saw it on your website.`
    : `Hi, is ${p.name} available? I saw it on your website.`
}
