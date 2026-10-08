import type { ThemeKey } from '../themes'

/** The same keys Lead Finder uses for `category`. Keep in sync with docs/DEMO_LINKS.md. */
export const BUSINESS_KEYS = [
  'dentist',
  'dermatologist',
  'clinic',
  'physio',
  'eye_clinic',
  'vet',
  'pet_shop',
  'salon_beauty',
  'gym_fitness',
  'jewellery',
  'clothing',
  'furniture_home',
  'events_photo',
  'tuition',
  'restaurant_cafe',
  'bakery_sweets',
  'home_services',
] as const
export type BusinessKey = (typeof BUSINESS_KEYS)[number]

export type Lang = 'en' | 'kn' | 'hi'
/** Text with optional Kannada/Hindi versions. May contain {name}, {area}, {city}. */
export type Localized = { en: string; kn?: string; hi?: string }

/** A slot in public/stock/<key>/ (see scripts/stock/manifest.json). Use `other/slot` to borrow from another key. */
export type StockRef = string

export type IconName =
  | 'tooth'
  | 'sparkle'
  | 'shield'
  | 'clock'
  | 'heart'
  | 'star'
  | 'check'
  | 'award'
  | 'users'
  | 'calendar'
  | 'scissors'
  | 'home'
  | 'baby'
  | 'leaf'
  | 'gem'
  | 'truck'
  | 'camera'
  | 'dumbbell'
  | 'paw'
  | 'eye'
  | 'stethoscope'
  | 'wallet'
  | 'map'
  | 'phone'
  | 'whatsapp'
  | 'tag'
  | 'wrench'
  | 'bolt'
  | 'book'
  | 'cake'
  | 'utensils'
  | 'sofa'
  | 'shirt'
  | 'activity'

export interface ServiceItem {
  name: string
  desc?: string
  /** Price in the business's currency. null = "On request". */
  price: number | null
  /** Shown before the price, default "from". Use '' for a fixed price. */
  prefix?: string
  /** Shown after the price, e.g. "/session", "/month". */
  suffix?: string
  tag?: string
  /** Restaurant menus: true = veg, false = non-veg. */
  veg?: boolean
  image?: StockRef
}

export interface Person {
  name: string
  role: string
  quals: string
  years?: number
  image: StockRef
  bio: string
  languages?: string[]
}

export interface Plan {
  name: string
  price: number
  period: string
  features: string[]
  highlight?: boolean
  note?: string
}

export interface Field {
  name: string
  label: string
  type: 'text' | 'tel' | 'date' | 'time' | 'select' | 'textarea' | 'number' | 'email'
  options?: string[]
  required?: boolean
  placeholder?: string
}

interface SectionBase {
  /** Anchor id, also used in the menu. */
  id: string
  /** Menu label. Omit to keep the section out of the menu. */
  nav?: string
}

export type SectionConfig =
  | (SectionBase & {
      kind: 'services'
      title: string
      intro?: string
      layout: 'list' | 'cards' | 'menu'
      groups: { title?: string; items: ServiceItem[] }[]
      footnote?: string
      /** Restaurant: show Swiggy / Zomato buttons. */
      delivery?: boolean
    })
  | (SectionBase & { kind: 'plans'; title: string; intro?: string; plans: Plan[]; footnote?: string })
  | (SectionBase & { kind: 'team'; title: string; intro?: string; people: Person[] })
  | (SectionBase & { kind: 'beforeAfter'; title: string; intro: string; image: StockRef; caption: string })
  | (SectionBase & {
      kind: 'gallery'
      title: string
      intro?: string
      style: 'grid' | 'insta'
      items: { image: StockRef; caption: string }[]
    })
  | (SectionBase & {
      kind: 'features'
      title: string
      intro?: string
      items: { title: string; desc: string; icon: IconName }[]
    })
  | (SectionBase & {
      kind: 'schedule'
      title: string
      intro?: string
      columns: string[]
      rows: string[][]
      footnote?: string
    })
  | (SectionBase & {
      kind: 'about'
      title: string
      body: string[]
      image: StockRef
      points?: string[]
    })
  | (SectionBase & {
      kind: 'goldRate'
      title: string
      /** Rates per gram. Edit by hand; shown as "sample rate" on demos. */
      rates: { label: string; price: number }[]
      updated: string
      /** Worked price example so customers see how the bill is made up. */
      example?: { label: string; grams: number; rateIndex: number; makingPct: number }
    })
  | (SectionBase & {
      kind: 'booking'
      title: string
      intro: string
      fields: Field[]
      submit: Localized
      /** Kalvio Desk clinic slug. When set, a booking also goes to that clinic's request list. Samples leave it unset. */
      deskSlug?: string
    })
  | (SectionBase & {
      kind: 'callout'
      title: string
      text: string
      /** What the button does: call or WhatsApp the shop. */
      action: 'call' | 'whatsapp'
      label: string
      icon: IconName
    })
  | (SectionBase & {
      kind: 'deskProducts'
      title: string
      intro?: string
      /** Kalvio Desk clinic slug: the products it marks "Show on our website". */
      deskSlug: string
    })
  | (SectionBase & { kind: 'reviews'; title: string })
  | (SectionBase & { kind: 'faq'; title: string })
  | (SectionBase & { kind: 'timings'; title: string })
  | (SectionBase & { kind: 'offer' })

export type SectionKind = SectionConfig['kind']

export interface Review {
  name: string
  when: string
  stars: number
  text: string
}

export interface Offer {
  /** Season id from src/config/seasons.ts. */
  season: string
  title: string
  text: string
  code?: string
}

export interface BusinessPreset {
  key: BusinessKey
  /** e.g. "Dental clinic" */
  label: string
  /** schema.org type, e.g. Dentist, BeautySalon, Restaurant. */
  schemaType: string
  region: 'IN' | 'US'
  defaultTheme: ThemeKey
  /** Demo shop used when a URL param is missing. Clearly fictional. */
  demo: {
    name: string
    area: string
    city: string
    /** Shown on defaults only; calls are never placed to it. */
    phone: string
    street: string
    since: number
  }
  hero: {
    image: StockRef
    headline: Localized
    subline: Localized
    /** Three short proof points under the headline. */
    chips: string[]
  }
  primaryCta: Localized
  /** What the hero's main button does. Default: jump to the booking form (or call if there is none). */
  primaryAction?: { kind: 'whatsapp'; text: string }
  rating: { value: number; count: number }
  badges: { label: string; icon: IconName }[]
  timings: { days: string; hours: string }[]
  /** One-line note under timings, e.g. "Emergency? Call any time." */
  timingsNote?: string
  reviews: Review[]
  faq: { q: string; a: string }[]
  offers: Offer[]
  sections: SectionConfig[]
  /** Meta description template. */
  description: string
}
