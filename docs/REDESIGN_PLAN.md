# Kalvio Build redesign plan (2026)

Branch: `redesign-2026`. Status: **all 17 businesses, landing page, enquiry storage and Cloudflare setup done.** Decisions (6 Oct 2026): all six themes approved; enquiries go to Lead Finder through `web_enquiry` (option a); hosting moves to Cloudflare Pages.

## 1. What I found (current site, 6 Oct 2026)

Screenshots of every current page at 375 px and 1440 px are in `docs/screenshots/before/`. I confirmed the audit:
the hero `<h1>` starts at `opacity: 0`, nav links run off the screen on phones, there are no photos, emoji are used as logos,
and floating pills cover the content.

Worth keeping:

- The **Kalvio Build wordmark and dark-violet brand** (`#14121f` + lavender). It now marks everything that is
  "Kalvio" rather than "the shop": the ribbon, the closing call to action, and the landing page.
- The **WhatsApp hand-off**, now on every button.
- The **Bengaluru-specific tone** of the copy (areas, Kannada, local prices).

Everything else is replaced. The old style pages are deleted from the branch; `/styles/*` redirects (see section 6).

## 2. Themes

Six themes. Every theme works with every business and passes WCAG AA, enforced by `src/themes/contrast.test.ts`
(84 checks). Each theme uses at most 2 self-hosted font families, latin subset only, `font-display: swap`.

| Theme | Fonts | Why |
|---|---|---|
| **Clean Clinical** | Plus Jakarta Sans | Airy white, one calm teal. Health businesses sell trust and hygiene. |
| **Warm Boutique** | Fraunces + DM Sans | Ivory, kumkum maroon, antique gold, with an arch-framed hero. Crafted and personal: salons, boutiques, sweets. |
| **Bold Studio** | Bricolage Grotesque + Manrope | Paper white, near-black, one loud orange. Energy for gyms and photographers (replaces Neo Brutalism). |
| **Soft Friendly** | Nunito | Cream, gentle violet, sunshine, big radii. Approachable for pets and kids (replaces Claymorphism, with no blobs over text). |
| **Luxe Dark** | Instrument Serif + Manrope | Green-black and champagne gold. Quiet luxury for jewellery and furniture (replaces Liquid Glass and Glassmorphism). |
| **Fresh Local** | Outfit + DM Sans | Warm white, leaf green, turmeric. Lively for food and services. |

Previews: `docs/previews/theme-directions.webp` (the two directions you asked for) and `docs/previews/all-themes-dentist.webp`
(all six themes on the same dentist).

Motion: fade/slide on scroll, 220–300 ms, CSS transitions armed by `IntersectionObserver`. Nothing on the first screen is
ever hidden, and motion is fully off under `prefers-reduced-motion`. The `motion` package replaces `framer-motion` and
is used only on the landing page's live preview.

## 3. Sections per business

All sections read from the preset and theme tokens only (`src/sections/*`). Every sample also gets: ribbon, header with
mobile menu, **signboard hero** (shop name, area and phone on the photo, then the headline, rating, years and trust
badges), seasonal offer banner, reviews (clearly marked as samples), timings with click-to-load Google Map, FAQ,
**"This could be live in 5 days. Reply YES on WhatsApp."**, footer, and the sticky **Call · WhatsApp · Directions** bar on phones.

| key | default theme | business-specific sections |
|---|---|---|
| `dentist` | Clean Clinical | treatments with prices, doctor profile + qualifications, before/after slider, clinic gallery, appointment booking |
| `dermatologist` | Warm Boutique | treatments, before/after, doctor profile, consultation booking |
| `clinic` | Clean Clinical | specialities, doctors + OPD timetable, emergency call strip, consultation fees |
| `physio` | Fresh Local | conditions treated, session packages, home-visit option, therapist profile |
| `eye_clinic` | Clean Clinical | eye tests with prices, frame brands, doctor, book an eye test |
| `vet` | Soft Friendly | services, vaccination schedule table, 24×7 emergency strip, vet profile |
| `pet_shop` | Soft Friendly | product cards, grooming menu, home delivery on WhatsApp |
| `salon_beauty` | Warm Boutique | bridal packages, salon menu with prices, Instagram-style grid, studio story, trial booking |
| `gym_fitness` | Bold Studio | membership plans, trainers, class timetable, free-trial booking |
| `jewellery` | Luxe Dark | today's gold rate (editable), collections lookbook, BIS hallmark, "WhatsApp for price" |
| `clothing` | Warm Boutique | collections, new arrivals, festive offers, custom stitching enquiry |
| `furniture_home` | Luxe Dark | catalogue by room, custom orders, showroom visit |
| `events_photo` | Bold Studio | portfolio gallery, packages, enquiry with event date |
| `tuition` | Soft Friendly | courses and batches, results, teachers, demo-class booking |
| `restaurant_cafe` | Fresh Local | menu with veg/non-veg marks, Swiggy/Zomato buttons, table booking |
| `bakery_sweets` | Warm Boutique | cake catalogue, custom cake order form, festival boxes |
| `home_services` | Fresh Local | US English and $, service areas, licensed & insured badges, instant quote form |

The section library also has product cards with an "Order on WhatsApp" button, a gold-rate board with a worked bill,
a stacked timetable for phones, an emergency call strip, and Swiggy/Zomato buttons.

## 4. File structure

```
src/
  data/
    types.ts                  BusinessPreset, SectionConfig, BUSINESS_KEYS (same keys as Lead Finder)
    businesses/<key>.ts       one preset per business, lazy-loaded (one small chunk per /demo page)
    stock.generated.json      photo sizes and credits (generated)
    testimonials.ts           real testimonials for the landing page (empty, section hidden)
  themes/<name>.ts            tokens (colours, fonts, radius, shadow, hero frame, motion)
  themes/index.ts             registry, old-style aliases, tokens → CSS variables
  sections/*.tsx              Hero, Services, Plans, Team, BeforeAfter, Gallery, Features, Schedule, About,
                              GoldRate, Booking, Reviews, Faq, Timings, OfferBanner, Closing, Footer, ActionBar, Ribbon
  config/site.ts              Kalvio contact details (WhatsApp, email, city)
  config/pricing.ts           landing page prices
  config/seasons.ts           Dasara / Diwali / wedding season / US seasons, editable dates
  i18n/strings.ts             en / kn / hi for hero and CTA strings
  lib/                        demo context from URL params, phone parsing, monogram, contrast, reveal, meta
  pages/                      Landing, Demo (+ DemoView), NotFound
scripts/
  stock/manifest.json         curated Unsplash photo IDs per business
  stock/fetch.mjs             downloads, makes AVIF + WebP at 480/800/1200/1600, writes CREDITS.md
  screenshots.mjs             375 + 1440 screenshots of any paths
  postbuild.mjs               prerenders the landing page and every business × theme
public/stock/<key>/           self-hosted photos (no hot-linking), CREDITS.md
docs/                         this plan, DEMO_LINKS.md, DEPLOY.md, screenshots, Lighthouse results
```

## 5. The `/demo` link and WhatsApp previews

`/demo/<key>?name=&area=&city=&phone=&theme=&lang=` works now. Missing values fall back to the preset's demo shop.
The phone parser accepts `+91…`, `91…`, `0…`, plain 10 digits, and a raw `+` (which URLs turn into a space).
Without `phone`, the Call/WhatsApp/Book buttons open a short "this button will call your shop" explainer instead of
dialling a stranger. Full contract goes in `docs/DEMO_LINKS.md`.

Link previews: WhatsApp doesn't run JavaScript, so:

1. **Build step (free, any host):** `postbuild.mjs` writes `dist/demo/<key>/index.html` with that business's
   title, description, `og:image` (`/og/<key>.png`, generated from the hero photo) and a preload for the hero image.
   This also makes the first paint faster.
2. **Edge step (free tier):** a tiny middleware rewrites `<title>` and `og:title` with `?name=`, so the preview says
   "Avinashi Dental Clinic". This is about 30 lines on Vercel Edge Middleware or Cloudflare Pages Functions.

Personalised links get `noindex` (in the page and as an `X-Robots-Tag` header from the edge step), so Google never
lists a real shop with our sample prices and reviews. The JSON-LD deliberately has no `aggregateRating`, because the
sample ratings aren't real.

## 6. Redirects for old URLs

| old | new |
|---|---|
| `/styles` | `/#samples` |
| `/styles/glassmorphism` | `/demo/dermatologist?theme=clean-clinical` |
| `/styles/skeuomorphism` | `/demo/restaurant_cafe?theme=fresh-local` |
| `/styles/neo-brutalism` | `/demo/gym_fitness?theme=bold-studio` |
| `/styles/claymorphism` | `/demo/vet?theme=soft-friendly` |
| `/styles/minimalism` | `/demo/clinic?theme=clean-clinical` |
| `/styles/liquid-glass` | `/demo/salon_beauty?theme=luxe-dark` |

Done as 301s in `public/_redirects` (Cloudflare) and `vercel.json`, and in the app as a fallback.

## 7. Evidence

- `npm test`: 238 passing. Covers contrast in every theme, every preset's photos/sections/seasons, the `/demo`
  link contract (fallbacks, phone formats, sanitising, seasons, US formatting) and the catalog.
- `npm run lint` and both type-checks are clean.
- Lighthouse mobile (production build served by Cloudflare's local runtime, simulated slow 4G), in `docs/lighthouse/`:

  | page | Perf | A11y | Best pr. | SEO | first paint | LCP |
  |---|---|---|---|---|---|---|
  | `/` | 95 | 100 | 100 | 100 | 1.2 s | 2.9 s |
  | `/demo/dentist` | 97 | 100 | 100 | 100 | 1.2 s | 2.5 s |
  | `/demo/salon_beauty` | 97 | 100 | 100 | 100 | 1.2 s | 2.6 s |
  | `/demo/restaurant_cafe` | 95 | 100 | 100 | 100 | 1.2 s | 2.8 s |
  | `/demo/jewellery?name=…` (personalised) | 95 | 100 | 100 | 69* | 1.2 s | 2.9 s |

  \* Personalised links are deliberately `noindex`, so Lighthouse's "page is blocked from indexing" check fails.
- Screenshots at 375 and 1440 for every page: `docs/screenshots/after/<group>/`; before: `docs/screenshots/before/`;
  side by side: `docs/screenshots/before-after.webp`.

## 8. What was built, by step

1. System: themes, sections, `/demo` route, personalisation, prerendering, edge function.
2. Health: `dentist`, `dermatologist`, `clinic`, `physio`, `eye_clinic`, `vet`.
3. Beauty & fitness: `salon_beauty`, `pet_shop`, `gym_fitness`.
4. Big-ticket retail: `jewellery` (gold rate + worked bill), `clothing`, `furniture_home`, `events_photo`.
5. Services & food: `tuition`, `restaurant_cafe` (veg marks, Swiggy/Zomato), `bakery_sweets` (custom cake form).
6. Home services (US): `home_services`, with "Text us" (SMS) instead of WhatsApp, US phone format and dollars.
7. Landing page with live phone preview, "make your own sample" form, enquiry form to Lead Finder, pricing config
   (`?region=us` adds USD), FAQ, honest copy only. `docs/DEMO_LINKS.md`, `docs/DEPLOY.md`, OG images, redirects.

## 9. Still yours to do or check

1. **Cloudflare Pages:** connect the repo (5 minutes, `docs/DEPLOY.md`). It needs your Cloudflare login.
2. **Kannada and Hindi** strings in `src/i18n/strings.ts` and the presets' headlines: first drafts, have them checked.
3. **Landing FAQ** (`src/landing/faq.ts`): policy wording ("you pay only after you've seen it", what's included)
   should match how you actually work.
4. **Seasonal dates** (`src/config/seasons.ts`): approximate festival windows, check them each year.
5. **Lead Finder:** copy `supabase/leadfinder/20261006_web_enquiry.sql` into the leadfinder repo's migrations (it is
   already applied to the database), and add the Make sample button using the snippet in `docs/DEMO_LINKS.md`.
