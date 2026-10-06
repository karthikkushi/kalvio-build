/**
 * Kalvio Build's prices. Decided 6 Oct 2026: one price list for every business type, an optional monthly care
 * plan, and a monthly plan for US clients. Change prices here only: the landing page, its FAQ and the samples'
 * closing message read from this file (index.html's meta description is checked against it by a test).
 */
export interface PricingPlan {
  key: 'starter' | 'business' | 'premium'
  name: string
  price: number
  pages: string
  features: string[]
  highlight?: boolean
}

export const PRICING = {
  plans: [
    {
      key: 'starter',
      name: 'Starter',
      price: 7999,
      pages: '1 page',
      features: [
        'Your shop’s photos, services and prices',
        'Timings, Google Maps and directions',
        'Call, WhatsApp and Directions buttons',
        'Enquiries straight to your WhatsApp',
        '1 round of changes',
      ],
    },
    {
      key: 'business',
      name: 'Business',
      price: 14999,
      pages: 'Up to 5 pages',
      highlight: true,
      features: [
        'Everything in Starter',
        'Photo gallery',
        'Booking or enquiry form',
        'Festival offer banners',
        'Google Business Profile setup',
        'Basic Google search setup',
        '2 rounds of changes',
      ],
    },
    {
      key: 'premium',
      name: 'Premium',
      price: 24999,
      pages: 'Up to 10 pages',
      features: [
        'Everything in Business',
        'English + Kannada or Hindi',
        'Menu, catalogue or gold-rate board',
        'Instagram feed on your site',
        '3 months of the care plan free',
        '3 rounds of changes',
      ],
    },
  ] satisfies PricingPlan[],
  /** Included in every plan. */
  included: ['Live in about a week', 'Domain name free for the first year', 'Fast, secure hosting'],
  /** Optional, after launch. */
  care: {
    price: 999,
    period: 'month',
    features: [
      'Domain and hosting renewal included',
      'Unlimited small edits: prices, timings, photos, offers',
      'Edits done within 2 working days',
      'A festival offer banner each season',
      'A monthly check that everything works',
    ],
  },
  /** Without the care plan, from the second year. */
  renewal: { price: 1499, period: 'year' },
  /** Per small edit, without the care plan. */
  editPrice: 500,
  /** US clients (home services): monthly, no setup fee. */
  us: {
    monthly: 99,
    minimumMonths: 12,
    features: ['Website, domain and hosting', 'Unlimited small edits', 'Quote and booking form', 'No setup fee'],
  },
} as const

export function inr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}

export const FROM_PRICE = PRICING.plans[0].price
export const US_MONTHLY = `$${PRICING.us.monthly}`
