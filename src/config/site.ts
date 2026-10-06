/** Kalvio Build's own contact details. Change them here only. */
export const SITE = {
  name: 'Kalvio Build',
  /** WhatsApp number in international format, digits only. */
  whatsapp: '918123097334',
  whatsappDisplay: '+91 81230 97334',
  email: 'kushikarthikeyenmr@gmail.com',
  city: 'Bengaluru',
  /** Time from "yes" to live, used in copy: "live in a week". */
  delivery: 'a week',
  year: new Date().getFullYear(),
} as const

export function waLink(digits: string, text?: string): string {
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
