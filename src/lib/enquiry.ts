/**
 * Sends an enquiry to Lead Finder (public.web_enquiry RPC, see supabase/leadfinder/). The function only accepts
 * this one call with the publishable key; it validates, rate-limits and stores the enquiry as a warm lead.
 * If the endpoint isn't configured or the call fails, callers fall back to WhatsApp, so nothing is lost.
 */
export interface Enquiry {
  name: string
  phone: string
  shop?: string
  category?: string
  area?: string
  city?: string
  country?: 'IN' | 'US'
  message?: string
  /** Honeypot field value; real visitors leave it empty. */
  website?: string
}

export type EnquiryResult = { ok: true } | { ok: false; reason: 'not_configured' | 'invalid_phone' | 'rate_limited' | 'network' }

const URL_ = import.meta.env.VITE_LEADFINDER_URL as string | undefined
const KEY = import.meta.env.VITE_LEADFINDER_KEY as string | undefined

export const enquiryConfigured = Boolean(URL_ && KEY)

export async function sendEnquiry(e: Enquiry): Promise<EnquiryResult> {
  if (!URL_ || !KEY) return { ok: false, reason: 'not_configured' }
  try {
    const res = await fetch(`${URL_}/rest/v1/rpc/web_enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: KEY },
      body: JSON.stringify({
        p_name: e.name,
        p_phone: e.phone,
        p_shop: e.shop ?? null,
        p_category: e.category ?? null,
        p_area: e.area ?? null,
        p_city: e.city ?? null,
        p_country: e.country ?? 'IN',
        p_message: e.message ?? null,
        p_page: window.location.href,
        p_website: e.website ?? null,
      }),
    })
    if (res.ok) return { ok: true }
    const body = await res.text()
    if (body.includes('phone_invalid')) return { ok: false, reason: 'invalid_phone' }
    if (body.includes('rate_limited')) return { ok: false, reason: 'rate_limited' }
    return { ok: false, reason: 'network' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
