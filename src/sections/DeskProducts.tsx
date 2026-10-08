import { useEffect, useState } from 'react'
import { ActionLink } from '../components/DemoActions'
import { MessageIcon } from '../components/MessageIcon'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { deskPhotoUrl, deskProducts, orderText, type DeskProduct } from '../lib/desk'
import { useMessaging } from '../lib/messaging'

type Props = Extract<SectionConfig, { kind: 'deskProducts' }> & { tone: Tone }

/**
 * The clinic's own products, straight from Kalvio Desk: change a price or run out of stock there and the website
 * follows. Each card has "Order on WhatsApp" ("Ask if available" when out of stock). Shows nothing until it loads,
 * and nothing at all if Desk has no products or can't be reached.
 */
// ponytail: loaded in the browser, so Google doesn't see these yet; render them at the edge when a clinic needs SEO for products.
export function DeskProducts({ id, title, intro, deskSlug, tone }: Props) {
  const m = useMessaging()
  const [items, setItems] = useState<DeskProduct[]>([])
  useEffect(() => {
    let stale = false
    deskProducts(deskSlug).then((p) => !stale && setItems(p))
    return () => {
      stale = true
    }
  }, [deskSlug])

  if (!items.length) return null
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {items.map((p) => (
          <li key={p.id} className="card flex flex-col overflow-hidden">
            {p.photo_path && (
              <div className="relative aspect-square bg-surface-alt">
                <img src={deskPhotoUrl(p.photo_path)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
              </div>
            )}
            <div className="flex flex-1 flex-col p-3 sm:p-5">
              <h3 className="font-semibold leading-snug text-ink sm:text-lg">{p.name}</h3>
              {p.description && <p className="mt-1 text-sm leading-snug text-muted">{p.description}</p>}
              <p className="mt-auto pt-3 font-semibold text-accent-ink tabular-nums">
                ₹{(p.price_paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                {!p.in_stock && <span className="ml-2 text-sm font-normal text-muted">Out of stock</span>}
              </p>
              <ActionLink kind="whatsapp" text={orderText(p)} className="btn btn-ghost mt-3 min-h-11 px-3 text-[15px]">
                <MessageIcon size={17} className="text-wa" /> {p.in_stock ? 'Order' : 'Ask if available'}
                <span className="sr-only">
                  {' '}
                  {p.name} {m.on}
                </span>
              </ActionLink>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
