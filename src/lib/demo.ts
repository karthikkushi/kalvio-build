import { createContext, useContext } from 'react'
import { activeSeasons } from '../config/seasons'
import type { BusinessPreset, Lang, Offer } from '../data/types'
import { THEMES, resolveThemeKey, type Theme } from '../themes'
import { initials } from './monogram'
import { PARAM_LIMITS, cleanParam, directionsUrl, mapEmbedUrl } from './personalise'
import { parsePhone, type Phone } from './phone'

export interface DemoCtx {
  preset: BusinessPreset
  theme: Theme
  lang: Lang
  name: string
  area: string
  city: string
  street: string
  /** The shop's real number from the link. null = generic demo, buttons explain instead of dialling. */
  phone: Phone | null
  phoneDisplay: string
  /** True when the link carries the shop's own name. */
  personalised: boolean
  monogram: string
  offer: Offer | null
  vars: { name: string; area: string; city: string }
  money: (n: number) => string
  directionsUrl: string
  mapEmbedUrl: string
  pageUrl: string
}


export function buildDemo(preset: BusinessPreset, sp: URLSearchParams, pageUrl: string, today = new Date()): DemoCtx {
  const nameParam = cleanParam(sp.get('name'), PARAM_LIMITS.name)
  const name = nameParam || preset.demo.name
  const area = cleanParam(sp.get('area'), PARAM_LIMITS.area) || preset.demo.area
  const city = cleanParam(sp.get('city'), PARAM_LIMITS.city) || preset.demo.city
  const theme = THEMES[resolveThemeKey(sp.get('theme')) ?? preset.defaultTheme]
  const langParam = sp.get('lang')
  const lang: Lang = langParam === 'kn' || langParam === 'hi' ? langParam : 'en'
  const phone = parsePhone(sp.get('phone'), preset.region)

  const seasonOverride = sp.get('season')
  const seasons = seasonOverride ? [seasonOverride] : activeSeasons(preset.region, today).map((s) => s.id)
  const offer = seasons.map((id) => preset.offers.find((o) => o.season === id)).find(Boolean) ?? null

  const money = (n: number) =>
    preset.region === 'US' ? `$${n.toLocaleString('en-US')}` : `₹${n.toLocaleString('en-IN')}`

  return {
    preset,
    theme,
    lang,
    name,
    area,
    city,
    street: nameParam ? '' : preset.demo.street,
    phone,
    phoneDisplay: phone?.display ?? preset.demo.phone,
    personalised: !!nameParam,
    monogram: initials(name),
    offer,
    vars: { name, area, city },
    money,
    directionsUrl: directionsUrl(name, area, city),
    mapEmbedUrl: mapEmbedUrl(name, area, city),
    pageUrl,
  }
}

export const DemoContext = createContext<DemoCtx | null>(null)

export function useDemo(): DemoCtx {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo outside <DemoContext>')
  return ctx
}
