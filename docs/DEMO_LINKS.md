# Free sample links (`/demo`)

This is the contract Lead Finder's **Send sample** button relies on. To try changes before they go live, use the links on
the preview by replacing `kalvio-build.pages.dev` with the branch preview, `<branch>.kalvio-build.pages.dev`. Keep it stable: add parameters, never rename or
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
`gifts_books`, `hardware`, `pharmacy`, `laundry`, `sports`, `footwear`) get no Send sample button yet.

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

## WhatsApp kit for Shreya (`/share`)

After a call where the shop says "send it on WhatsApp", Shreya taps **Send sample** in Lead Finder (on the lead's
sheet, and on the card of every Interested lead). That opens:

```
https://kalvio-build.pages.dev/share?key=dermatologist&name=Avance%20Derma%20Skin%2C%20Hair%20and%20Laser%20Clinic&address=No%201338%2C%20First%20Floor%2C%2060%20Feet%20Road%2C%20D%20Block.%20AECS%20Layout%2C%20Kundalahalli&city=Bengaluru&phone=%2B919343800800#code=<her Lead Finder code>
```

It takes the same parameters as `/demo` (`key` instead of the path), plus:

| param | notes |
|---|---|
| `address` | Lead Finder's address. Used only when `area` is missing: the kit picks the area out of it ("…, Malleshwaram" → Malleshwaram) with `src/lib/area.ts`, and leaves it empty when unsure. |
| `#code=` | Her Lead Finder code, in the hash so it never reaches a server log. The kit keeps it on the phone, removes it from the address bar and uses it to take the picture. |

With the code present the kit starts by itself, with nothing to type:

1. **Message 1, the sample link**, ready at once, signed by `SITE.sender` (Shreya), "Hi Doctor" for clinics.
   **Send on WhatsApp** opens the shop's chat with it typed in.
2. **A picture** (1080 × 1350): "Made for <shop>", an iPhone showing their website. After about 10 seconds.
3. **A 10-second video** (MP4, about 2.5 MB) scrolling through their website, made right after the picture.
4. **Message 2, the details**: the sample is only an example, we build to their requirements, and we also make
   billing, a reception dashboard and analytics. No prices, no link. Wording in `src/share/messages.ts`.
5. **The link-preview image with their name**, uploaded while the picture is made, so WhatsApp's preview of the link
   shows "Avance Derma Skin, Hair and Laser Clinic". The page says when it's ready (wait for it before sending the link).

Both messages can be edited before sending. "Change details" at the bottom fixes the area, theme or language and
makes the kit again. Without a code (opened by hand) the page shows the form first and asks for the code once.

The picture is taken by Cloudflare's free Browser Rendering (10 browser-minutes a day, about 150 kits; it resets at
5:30 AM). Kits are cached for 30 days, so opening the same shop again is instant and free. When the daily limit is
used up, the link and both messages still work.

## Building links in Lead Finder

Lead Finder (`web/app.js`, `kitLink`) builds the Send sample link like this:

```js
const SAMPLE_KEYS = new Set(['dentist', 'dermatologist', 'clinic', 'physio', 'eye_clinic', 'vet', 'pet_shop',
  'salon_beauty', 'gym_fitness', 'jewellery', 'clothing', 'furniture_home', 'events_photo', 'tuition',
  'restaurant_cafe', 'bakery_sweets', 'home_services'])

function kitLink(lead, code) {
  if (!SAMPLE_KEYS.has(lead.category)) return null
  const q = new URLSearchParams({ key: lead.category, name: lead.name })
  if (lead.locality && lead.locality !== lead.city) q.set('area', lead.locality)
  else if (lead.address) q.set('address', lead.address)
  if (lead.city) q.set('city', lead.city)
  if (lead.phone_intl) q.set('phone', lead.phone_intl)
  return `https://kalvio-build.pages.dev/share?${q}#code=${encodeURIComponent(code)}`
}
```

`URLSearchParams` encodes `+` in `phone_intl` correctly. A plain sample link (no kit) is the same without `key` and
`#code`, at `/demo/<category>`.

## What the owner sees

- **WhatsApp link preview:** title "<name> | Dental clinic in <area>, <city>", description, and an image per business
  type (`/og/<key>.jpg`). The edge function (`functions/demo/[key].ts`) writes these into the HTML before it is sent,
  because WhatsApp doesn't run JavaScript.
- **First screen (painted in about 1.2 s on 4G, before any JavaScript):** their name, area and phone on a real photo,
  a monogram logo from their initials, a headline with their area, sample rating and badges.
- **Ribbon:** "Free sample made for <name> by Kalvio Build. Like it? Reply on WhatsApp", which opens a chat with
  Kalvio Build that already names the shop and the link.
- **Last screen:** "This could be live in a week. Reply YES on WhatsApp."

Personalised links send `noindex` (meta tag and `X-Robots-Tag`), so search engines never list a real shop with sample
prices and reviews. Reviews, ratings and "years in business" are labelled as sample content on the page.
