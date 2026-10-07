import type { BusinessKey } from '../data/types'

/**
 * The two WhatsApp messages Shreya sends after a call where the shop said "send it on WhatsApp":
 * the sample link, then a short note that it's only an example. Simple and human; no prices.
 */

interface Words {
  /** Owners of these are called "Doctor". */
  doctor?: boolean
  /** "your own photos, ___ and details" */
  items: string
  /** "billing, a reception dashboard and analytics for ___" */
  kind: string
}

const WORDS: Record<BusinessKey, Words> = {
  dentist: { doctor: true, items: 'treatments', kind: 'clinics' },
  dermatologist: { doctor: true, items: 'treatments', kind: 'clinics' },
  clinic: { doctor: true, items: 'treatments', kind: 'clinics' },
  physio: { doctor: true, items: 'treatments', kind: 'clinics' },
  eye_clinic: { items: 'services', kind: 'clinics' },
  vet: { doctor: true, items: 'services', kind: 'clinics' },
  pet_shop: { items: 'products', kind: 'shops' },
  salon_beauty: { items: 'services', kind: 'salons' },
  gym_fitness: { items: 'classes', kind: 'gyms' },
  jewellery: { items: 'designs', kind: 'shops' },
  clothing: { items: 'collections', kind: 'shops' },
  furniture_home: { items: 'products', kind: 'shops' },
  events_photo: { items: 'work', kind: 'studios' },
  tuition: { items: 'courses', kind: 'institutes' },
  restaurant_cafe: { items: 'menu', kind: 'restaurants' },
  bakery_sweets: { items: 'products', kind: 'bakeries' },
  home_services: { items: 'services', kind: 'businesses' },
}

export interface KitMessages {
  /** Sent first: who we are and the sample link (WhatsApp shows the preview with their name). */
  sample: string
  /** Sent after the link: it's only an example, we customise everything, and what else we make. */
  details: string
}

export function kitMessages({ key, name, link, sender }: { key: BusinessKey; name: string; link: string; sender: string }): KitMessages {
  const w = WORDS[key]
  const hi = w.doctor ? 'Hi Doctor' : 'Hi'
  return {
    sample: `${hi}, this is ${sender} from Kalvio Build. As we talked on the phone, here is the free sample website we made for ${name}:\n${link}`,
    details:
      `The sample I sent is just to give you an idea, so the photos, prices and reviews in it are examples. ` +
      `We will make your website as per your requirements, with your own photos, ${w.items} and details, and change anything you like.\n\n` +
      `We also make billing, a reception dashboard and analytics for ${w.kind}, if you need them.\n\n` +
      `Please have a look and let me know what you think 🙂`,
  }
}
