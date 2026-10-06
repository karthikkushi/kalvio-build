import type { BusinessKey } from './types'

/** Lightweight list of the samples for the landing page (the full presets load only on /demo pages). */
export interface CatalogEntry {
  key: BusinessKey
  /** What an owner would call themselves: "Dental clinic". */
  label: string
  /** Short chip label for the live preview. */
  chip: string
  group: 'Health' | 'Beauty & fitness' | 'Shops' | 'Food' | 'Services'
  /** The demo shop shown in the preview image. */
  demoName: string
  region: 'IN' | 'US'
}

export const CATALOG: CatalogEntry[] = [
  { key: 'dentist', label: 'Dental clinic', chip: 'Dentist', group: 'Health', demoName: 'Nandi Dental Care', region: 'IN' },
  { key: 'dermatologist', label: 'Skin & hair clinic', chip: 'Skin clinic', group: 'Health', demoName: 'Tvacha Skin & Hair Clinic', region: 'IN' },
  { key: 'clinic', label: 'Family clinic', chip: 'Clinic', group: 'Health', demoName: 'Sanjeevini Family Clinic', region: 'IN' },
  { key: 'physio', label: 'Physiotherapy', chip: 'Physio', group: 'Health', demoName: 'Movewell Physiotherapy', region: 'IN' },
  { key: 'eye_clinic', label: 'Eye clinic & opticals', chip: 'Opticals', group: 'Health', demoName: 'Drishti Eye Care & Opticals', region: 'IN' },
  { key: 'vet', label: 'Pet clinic', chip: 'Vet', group: 'Health', demoName: 'Wag & Whiskers Pet Clinic', region: 'IN' },
  { key: 'salon_beauty', label: 'Salon & bridal studio', chip: 'Salon', group: 'Beauty & fitness', demoName: 'Swara Bridal Studio', region: 'IN' },
  { key: 'gym_fitness', label: 'Gym & fitness studio', chip: 'Gym', group: 'Beauty & fitness', demoName: 'Forge Fitness Studio', region: 'IN' },
  { key: 'pet_shop', label: 'Pet shop & grooming', chip: 'Pet shop', group: 'Shops', demoName: 'Happy Tails Pet Store', region: 'IN' },
  { key: 'jewellery', label: 'Jewellery showroom', chip: 'Jewellery', group: 'Shops', demoName: 'Sri Lakshmi Jewellers', region: 'IN' },
  { key: 'clothing', label: 'Sarees & boutique', chip: 'Boutique', group: 'Shops', demoName: 'Kanchana Silks & Boutique', region: 'IN' },
  { key: 'furniture_home', label: 'Furniture & home decor', chip: 'Furniture', group: 'Shops', demoName: 'Teakwood & Co. Furniture', region: 'IN' },
  { key: 'restaurant_cafe', label: 'Restaurant & cafe', chip: 'Restaurant', group: 'Food', demoName: 'Kudla Kitchen', region: 'IN' },
  { key: 'bakery_sweets', label: 'Bakery & sweet shop', chip: 'Bakery', group: 'Food', demoName: 'Sri Ganesh Iyengar Bakery & Sweets', region: 'IN' },
  { key: 'tuition', label: 'Tuition & classes', chip: 'Tuition', group: 'Services', demoName: 'Bright Minds Tuition Centre', region: 'IN' },
  { key: 'events_photo', label: 'Wedding photography', chip: 'Photography', group: 'Services', demoName: 'Kalyana Frames Studio', region: 'IN' },
  { key: 'home_services', label: 'Plumbing & home services (USA)', chip: 'Plumber (US)', group: 'Services', demoName: 'Lone Star Plumbing & Electric', region: 'US' },
]

export const CATALOG_GROUPS = ['Health', 'Beauty & fitness', 'Shops', 'Food', 'Services'] as const
