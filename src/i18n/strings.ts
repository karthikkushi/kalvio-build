import type { Lang, Localized } from '../data/types'

/**
 * UI strings for the hero and calls to action. Kannada and Hindi are first drafts:
 * have a native speaker check them before relying on them in sales.
 */
export const UI = {
  call: { en: 'Call', kn: 'ಕರೆ ಮಾಡಿ', hi: 'कॉल करें' },
  whatsapp: { en: 'WhatsApp', kn: 'WhatsApp', hi: 'WhatsApp' },
  directions: { en: 'Directions', kn: 'ದಾರಿ', hi: 'रास्ता' },
  openToday: { en: 'Open today', kn: 'ಇಂದು ತೆರೆದಿದೆ', hi: 'आज खुला है' },
  ribbonPersonal: {
    en: 'Free sample made for {name} by Kalvio Build.',
    kn: '{name} ಗಾಗಿ Kalvio Build ಮಾಡಿದ ಉಚಿತ ಮಾದರಿ.',
    hi: '{name} के लिए Kalvio Build का मुफ़्त सैंपल।',
  },
  ribbonGeneric: {
    en: 'Sample website by Kalvio Build.',
    kn: 'Kalvio Build ಮಾದರಿ ವೆಬ್‌ಸೈಟ್.',
    hi: 'Kalvio Build की सैंपल वेबसाइट।',
  },
  ribbonCta: { en: 'Like it? Reply on WhatsApp', kn: 'ಇಷ್ಟವಾಯಿತೇ? WhatsApp ಮಾಡಿ', hi: 'पसंद आई? WhatsApp करें' },
  closingTitle: {
    en: 'This could be live in a week.',
    kn: 'ಇದು ಒಂದು ವಾರದಲ್ಲಿ ಲೈವ್ ಆಗಬಹುದು.',
    hi: 'यह एक हफ़्ते में लाइव हो सकती है।',
  },
  closingBodyUS: { en: 'Your photos, your services, your real Google reviews, live in a week. {price} a month, no setup fee.' },
  closingCta: { en: 'Reply YES on WhatsApp', kn: 'WhatsApp ನಲ್ಲಿ YES ಕಳುಹಿಸಿ', hi: 'WhatsApp पर YES भेजें' },
  closingBody: {
    en: 'Your photos, your prices, your real Google reviews. Website from {price}, one-time.',
    kn: 'ನಿಮ್ಮ ಫೋಟೋಗಳು, ನಿಮ್ಮ ದರಗಳು, ನಿಮ್ಮ ನಿಜವಾದ Google ವಿಮರ್ಶೆಗಳು. ವೆಬ್‌ಸೈಟ್ {price} ರಿಂದ.',
    hi: 'आपकी फ़ोटो, आपके दाम, आपके असली Google रिव्यू। वेबसाइट {price} से।',
  },
} satisfies Record<string, Localized>

export function t(text: Localized, lang: Lang, vars: Record<string, string> = {}): string {
  const s = text[lang] ?? text.en
  return s.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '')
}

