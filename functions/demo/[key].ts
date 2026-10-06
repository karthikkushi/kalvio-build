/**
 * Cloudflare Pages Function for /demo/<key>.
 * Picks the prerendered page for the requested theme and swaps in the shop's own name, area, city and phone
 * from the link (HTMLRewriter, streaming, a few ms of CPU). Result: the WhatsApp link preview shows the shop's
 * name, and the first screen paints with their details before any JavaScript runs.
 * The browser app then takes over with identical content (see src/main.tsx).
 */
import { SITE, waLink } from '../../src/config/site'
import { UI, t } from '../../src/i18n/strings'
import { initials } from '../../src/lib/monogram'
import {
  NAME_BASE_CLASS,
  PARAM_LIMITS,
  cleanParam,
  directionsUrl,
  instaHandle,
  nameSizeClass,
  ribbonMessage,
  yesMessage,
} from '../../src/lib/personalise'
import { parsePhone } from '../../src/lib/phone'
import { resolveThemeKey } from '../../src/themes'

interface Defaults {
  label: string
  region: 'IN' | 'US'
  theme: string
  description: string
  name: string
  area: string
  city: string
}

interface Env {
  ASSETS: Fetcher
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const url = new URL(request.url)
  const key = String(params.key)
  const asset = (path: string) => env.ASSETS.fetch(new URL(path, url))
  const sp = url.searchParams

  const all = await (await asset('/_demo/defaults.json')).json<Record<string, Defaults>>()
  const d = all[key]
  const lang = sp.get('lang')
  // Unknown business, or Kannada/Hindi (rendered in the browser only): hand over to the app.
  if (!d || lang === 'kn' || lang === 'hi') return asset('/')

  const theme = resolveThemeKey(sp.get('theme')) ?? d.theme
  const page = await asset(`/_demo/${key}/${theme}.html`)
  if (!page.ok) return asset('/')

  const nameParam = cleanParam(sp.get('name'), PARAM_LIMITS.name)
  const areaParam = cleanParam(sp.get('area'), PARAM_LIMITS.area)
  const cityParam = cleanParam(sp.get('city'), PARAM_LIMITS.city)
  const phone = parsePhone(sp.get('phone'), d.region)
  const personalised = !!nameParam
  const name = nameParam || d.name
  const area = areaParam || d.area
  const city = cityParam || d.city
  const vars: Record<string, string> = { name, area, city }
  const title = `${name} | ${d.label} in ${area}, ${city}`
  const description = d.description.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '')
  const pageUrl = url.toString()

  // Text for every element marked data-p="..." in the React components.
  const text: Record<string, string> = {}
  if (nameParam) {
    Object.assign(text, {
      name,
      monogram: initials(name),
      handle: instaHandle(name),
      'closing-eyebrow': `Made for ${name}`,
      'ribbon-text': t(UI.ribbonPersonal, 'en', { name }),
    })
  }
  if (areaParam) text.area = area
  if (cityParam) text.city = city
  if (phone) text.phone = phone.display
  const hrefs: Record<string, string> = {
    directions: directionsUrl(name, area, city),
    ribbon: waLink(SITE.whatsapp, ribbonMessage(personalised, name, d.label, pageUrl)),
    yes: waLink(SITE.whatsapp, yesMessage(name, area, pageUrl)),
  }

  const headers = new Headers(page.headers)
  // /_demo/* files are noindex on their own (public/_headers); the /demo page itself is indexable.
  headers.delete('x-robots-tag')
  headers.set('content-type', 'text/html; charset=utf-8')
  headers.set('cache-control', 'public, max-age=300')
  // Samples for real shops carry demo prices and reviews: keep them out of search results.
  if (personalised) headers.set('x-robots-tag', 'noindex, nofollow')

  return new HTMLRewriter()
    .on('html', { element: (e) => void e.setAttribute('data-edge', '') })
    .on('title', { element: (e) => void e.setInnerContent(title) })
    .on('meta[name="description"], meta[property="og:description"]', {
      element: (e) => void e.setAttribute('content', description),
    })
    .on('meta[property="og:title"]', { element: (e) => void e.setAttribute('content', title) })
    .on('meta[property="og:image"]', { element: (e) => void e.setAttribute('content', `${url.origin}/og/${key}.png`) })
    .on('meta[property="og:url"]', { element: (e) => void e.setAttribute('content', pageUrl) })
    .on('link[rel="canonical"]', { element: (e) => void e.setAttribute('href', `${url.origin}/demo/${key}`) })
    .on('head', {
      element: (e) => {
        if (personalised) e.append('<meta name="robots" content="noindex, nofollow">', { html: true })
      },
    })
    .on('[data-p]', {
      element: (e) => {
        const k = e.getAttribute('data-p') ?? ''
        if (k === 'jsonld' || (k === 'street' && personalised)) e.remove()
        else if (k in text) e.setInnerContent(text[k])
      },
    })
    .on('[data-p-href]', {
      element: (e) => {
        const href = hrefs[e.getAttribute('data-p-href') ?? '']
        if (href) e.setAttribute('href', href)
      },
    })
    .on('[data-p-class="name"]', {
      element: (e) => {
        if (nameParam) e.setAttribute('class', `${NAME_BASE_CLASS} ${nameSizeClass(name.length)}`)
      },
    })
    .transform(new Response(page.body, { status: 200, headers }))
}
