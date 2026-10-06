# Free sample links (`/demo`)

This is the contract Lead Finder's **Make sample** button relies on. Keep it stable: add parameters, never rename or
remove them.

```
https://kalvio-build.pages.dev/demo/<business-key>?name=…&area=…&city=…&phone=…&theme=…&lang=…
```

## Parameters

| param | required | example | notes |
|---|---|---|---|
| `<business-key>` (path) | yes | `dentist` | One of the 17 keys below, the same values as Lead Finder's `leads.category`. Unknown keys get a 404 page. |
| `name` | yes, for a personalised sample | `Avinashi Dental Clinic` | Shown big in the first screen and in the WhatsApp link preview. Max 80 characters; `<`, `>` and control characters are removed. Without it, the demo shop's name is used and the page is a generic sample. |
| `area` | no | `Jayanagar` | Locality. Used in the headline ("Painless root canal in Jayanagar"), the map and directions. Max 60. |
| `city` | no | `Bengaluru` | Max 40. |
| `phone` | no | `+919036993516` | Makes **Call**, **WhatsApp** and the booking forms go to the shop. Accepts `+91…`, `91…`, `0…`, 10 digits, spaces and dashes. Without it, those buttons show a short "on your website this calls your shop" note instead of dialling anyone. US numbers (`home_services`): 10 digits or `+1…`. |
| `theme` | no | `warm-boutique` | `clean-clinical`, `warm-boutique`, `bold-studio`, `soft-friendly`, `luxe-dark`, `fresh-local`. Each business has a sensible default. Old 2025 names (`glassmorphism`, `claymorphism`, …) still work. |
| `lang` | no | `kn` | `en` (default), `kn` Kannada, `hi` Hindi. Translates the headline, buttons and closing message; the rest stays in English. Translations are first drafts: have them checked. |
| `season` | no | `diwali` | Forces a seasonal offer banner for previews: `dasara`, `diwali`, `wedding`, `sankranti`, `ugadi`, `summer` (India), `fall`, `winter`, `spring` (US). Normally picked from today's date; dates live in `src/config/seasons.ts`. |

Remember to URL-encode values (`encodeURIComponent`): a space becomes `%20`, `+` becomes `%2B`, `&` becomes `%26`.

## Business keys

| key | sample | default theme |
|---|---|---|
| `dentist` | Dental clinic | clean-clinical |
| `dermatologist` | Skin & hair clinic | warm-boutique |
| `clinic` | Family clinic | clean-clinical |
| `physio` | Physiotherapy | fresh-local |
| `eye_clinic` | Eye clinic & opticals | clean-clinical |
| `vet` | Pet clinic | soft-friendly |
| `pet_shop` | Pet shop & grooming | soft-friendly |
| `salon_beauty` | Salon & bridal studio | warm-boutique |
| `gym_fitness` | Gym & fitness studio | bold-studio |
| `jewellery` | Jewellery showroom | luxe-dark |
| `clothing` | Sarees & boutique | warm-boutique |
| `furniture_home` | Furniture & home decor | luxe-dark |
| `events_photo` | Wedding photography | bold-studio |
| `tuition` | Tuition & classes | soft-friendly |
| `restaurant_cafe` | Restaurant & cafe | fresh-local |
| `bakery_sweets` | Bakery & sweet shop | warm-boutique |
| `home_services` | Plumbing & home services (USA, $, SMS instead of WhatsApp) | fresh-local |

Lead Finder categories without their own sample (`general_shop`, `auto_parts`, `mobile_electronics`, `grocery`,
`gifts_books`, `hardware`, `pharmacy`, `laundry`, `sports`, `footwear`) should not get a Make sample button yet.

## Examples (three real-looking shops)

A dentist in Jayanagar, in the Warm Boutique theme:

```
https://kalvio-build.pages.dev/demo/dentist?name=Avinashi%20Dental%20Clinic&area=Jayanagar&city=Bengaluru&phone=%2B919036993516&theme=warm-boutique
```

A bridal salon in Malleshwaram, with Kannada headline and buttons:

```
https://kalvio-build.pages.dev/demo/salon_beauty?name=Shree%20Lakshmi%20Beauty%20Parlour&area=Malleshwaram&city=Bengaluru&phone=9845012345&lang=kn
```

A plumber in Austin (US English, dollars, "Text us" buttons):

```
https://kalvio-build.pages.dev/demo/home_services?name=Peak%20Plumbing%20Co&area=Round%20Rock&city=Austin%2C%20TX&phone=5125550199
```

## Building links in Lead Finder

```ts
const SAMPLE_KEYS = new Set(['dentist', 'dermatologist', 'clinic', 'physio', 'eye_clinic', 'vet', 'pet_shop',
  'salon_beauty', 'gym_fitness', 'jewellery', 'clothing', 'furniture_home', 'events_photo', 'tuition',
  'restaurant_cafe', 'bakery_sweets', 'home_services'])

export function sampleLink(lead: { name: string; category: string; locality: string | null; city: string; phone_intl: string | null }) {
  if (!SAMPLE_KEYS.has(lead.category)) return null
  const q = new URLSearchParams({ name: lead.name })
  if (lead.locality) q.set('area', lead.locality)
  if (lead.city) q.set('city', lead.city)
  if (lead.phone_intl) q.set('phone', lead.phone_intl)
  return `https://kalvio-build.pages.dev/demo/${lead.category}?${q}`
}
```

`URLSearchParams` encodes `+` in `phone_intl` correctly. Send the link with a short message, e.g.
"Here's a free sample of your website: <link>".

## What the owner sees

- **WhatsApp link preview:** title "<name> | Dental clinic in <area>, <city>", description, and an image per business
  type (`/og/<key>.jpg`). The edge function (`functions/demo/[key].ts`) writes these into the HTML before it is sent,
  because WhatsApp doesn't run JavaScript.
- **First screen (painted in about 1.2 s on 4G, before any JavaScript):** their name, area and phone on a real photo,
  a monogram logo from their initials, a headline with their area, sample rating and badges.
- **Ribbon:** "Free sample made for <name> by Kalvio Build. Like it? Reply on WhatsApp", which opens a chat with
  Kalvio Build that already names the shop and the link.
- **Last screen:** "This could be live in 5 days. Reply YES on WhatsApp."

Personalised links send `noindex` (meta tag and `X-Robots-Tag`), so search engines never list a real shop with sample
prices and reviews. Reviews, ratings and "years in business" are labelled as sample content on the page.
