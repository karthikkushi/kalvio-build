/**
 * Kalvio Build's prices. Change them here only: the landing page and the samples' closing message read from this file.
 * The USD row (landing page with ?region=us, and US samples) is converted from the rupee price at `usdRate`.
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
  usdRate: 88,
  plans: [
    {
      key: 'starter',
      name: 'Starter',
      price: 3000,
      pages: '1 page',
      features: ['Your shop’s details, photos and timings', 'Call, WhatsApp and Google Maps buttons', 'Works on every phone', 'Live in 5 days'],
    },
    {
      key: 'business',
      name: 'Business',
      price: 7000,
      pages: 'Up to 5 pages',
      highlight: true,
      features: ['Everything in Starter', 'Photo gallery', 'Services and prices', 'Basic Google search setup', '2 rounds of changes'],
    },
    {
      key: 'premium',
      name: 'Premium',
      price: 12000,
      pages: 'Up to 8 pages',
      features: ['Everything in Business', 'Booking or enquiry form', 'Google reviews on your site', 'English + Hindi or Kannada', '3 months of support'],
    },
  ] satisfies PricingPlan[],
  extras: [
    { label: 'Domain name (yourshop.in)', price: 500, period: 'year', approx: true },
    { label: 'Maintenance and small changes', price: 500, period: 'month', approx: false },
  ],
} as const

export function inr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}

/** Rupee price converted to dollars, rounded to the nearest $5. */
export function usd(n: number): string {
  return `$${Math.max(5, Math.round(n / PRICING.usdRate / 5) * 5)}`
}

export const FROM_PRICE = PRICING.plans[0].price
