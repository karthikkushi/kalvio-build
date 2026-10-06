export interface Phone {
  /** +919036993516 */
  e164: string
  /** 919036993516, for wa.me links */
  digits: string
  /** +91 90369 93516 or (512) 555-0142 */
  display: string
}

/**
 * Lenient phone parsing for URL params. A raw "+" in a query string decodes to a space,
 * so " 919036993516", "+919036993516", "09036993516" and "9036993516" all work.
 */
export function parsePhone(raw: string | null | undefined, region: 'IN' | 'US'): Phone | null {
  if (!raw) return null
  let digits = raw.replace(/\D/g, '')
  if (region === 'IN') {
    if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
    if (digits.length === 10) digits = '91' + digits
  } else {
    if (digits.length === 10) digits = '1' + digits
  }
  if (digits.length < 8 || digits.length > 15) return null
  return { e164: '+' + digits, digits, display: formatPhone(digits) }
}

export function formatPhone(digits: string): string {
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return '+' + digits
}
