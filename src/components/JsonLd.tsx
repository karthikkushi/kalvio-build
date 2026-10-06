import type { DemoCtx } from '../lib/demo'
import { stockImage } from '../lib/stock'

/**
 * schema.org LocalBusiness (or a subtype) built from the link's params, so name, address and phone match the page.
 * Deliberately no aggregateRating: the sample's ratings are not real.
 */
export function JsonLd({ ctx }: { ctx: DemoCtx }) {
  const { preset } = ctx
  const origin = new URL(ctx.pageUrl).origin
  const hero = stockImage(preset.key, preset.hero.image)
  const data = {
    '@context': 'https://schema.org',
    '@type': preset.schemaType,
    name: ctx.name,
    url: ctx.pageUrl,
    image: `${origin}${hero.base}-1200.webp`,
    ...(ctx.phone ? { telephone: ctx.phone.e164 } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(ctx.street ? { streetAddress: ctx.street } : {}),
      addressLocality: ctx.area,
      addressRegion: ctx.city,
      addressCountry: preset.region,
    },
    priceRange: preset.region === 'US' ? '$$' : '₹₹',
    hasMap: ctx.directionsUrl,
  }
  // Escape "<" so a crafted ?name= can't close the script tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" data-p="jsonld" dangerouslySetInnerHTML={{ __html: json }} />
}
