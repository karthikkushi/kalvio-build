import { useDemo } from './demo'

/**
 * India runs on WhatsApp; US customers text. Everything that says "WhatsApp" on a sample reads its words from here,
 * so a US preset gets "Text us" and sms: links with no other changes.
 */
export interface Messaging {
  sms: boolean
  /** Short button label: "WhatsApp" / "Text us". */
  label: string
  /** "on WhatsApp" / "by text". */
  on: string
  /** "Message on WhatsApp" / "Send us a text". */
  cta: string
}

export function messagingFor(region: 'IN' | 'US'): Messaging {
  return region === 'US'
    ? { sms: true, label: 'Text us', on: 'by text', cta: 'Send us a text' }
    : { sms: false, label: 'WhatsApp', on: 'on WhatsApp', cta: 'Message on WhatsApp' }
}

export function useMessaging(): Messaging {
  return messagingFor(useDemo().preset.region)
}

/** wa.me link, or an sms: link with the body prefilled. */
export function messageHref(sms: boolean, digits: string, text: string): string {
  return sms ? `sms:+${digits}?&body=${encodeURIComponent(text)}` : `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}
