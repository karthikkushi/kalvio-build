/**
 * Pure helpers shared by the React app and the Cloudflare edge function (functions/demo/[key].ts),
 * so a personalised page looks identical before and after JavaScript takes over.
 */

/** Strip control characters and angle brackets, collapse spaces, cap length. */
export function cleanParam(v: string | null | undefined, max: number): string {
  return (
    v
      ?.replace(/[\p{Cc}<>]/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max) ?? ''
  )
}

export const PARAM_LIMITS = { name: 80, area: 60, city: 40 } as const

/** Font size for the shop name: long names step down so they never overflow a 375 px screen. */
export function nameSizeClass(len: number): string {
  if (len <= 14) return 'text-[2.75rem] sm:text-6xl lg:text-7xl'
  if (len <= 22) return 'text-[2.3rem] sm:text-5xl lg:text-[4.25rem]'
  if (len <= 32) return 'text-[1.95rem] sm:text-[2.75rem] lg:text-[3.5rem]'
  return 'text-[1.6rem] sm:text-4xl lg:text-5xl'
}

export const NAME_BASE_CLASS = 'font-display leading-[1.02] text-balance'

export function instaHandle(name: string): string {
  return '@' + name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24)
}

export function directionsUrl(name: string, area: string, city: string): string {
  const where = [name, area, city].filter(Boolean).join(', ')
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(where)}`
}

export function mapEmbedUrl(name: string, area: string, city: string): string {
  const where = [name, area, city].filter(Boolean).join(', ')
  return `https://maps.google.com/maps?q=${encodeURIComponent(where)}&z=15&output=embed`
}

export function ribbonMessage(personalised: boolean, name: string, label: string, pageUrl: string): string {
  return personalised
    ? `Hi Kalvio Build, I saw the sample website you made for ${name}. ${pageUrl}`
    : `Hi Kalvio Build, I saw your ${label.toLowerCase()} sample and want a website for my shop. ${pageUrl}`
}

export function yesMessage(name: string, area: string, pageUrl: string): string {
  return `YES, I want this website for ${name}${area ? ` (${area})` : ''}.\nSample: ${pageUrl}`
}

/** Query params that change what the page shows. */
export const PERSONAL_PARAMS = ['name', 'area', 'city', 'phone', 'theme', 'lang'] as const
