import { ActionLink } from '../components/DemoActions'
import { WhatsAppIcon } from '../components/Icon'
import { Img } from '../components/Img'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig, ServiceItem } from '../data/types'
import { useDemo } from '../lib/demo'
import { stockImage } from '../lib/stock'

type Props = Extract<SectionConfig, { kind: 'services' }> & { tone: Tone }

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      role="img"
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      className={`mt-1 inline-grid size-4 shrink-0 place-items-center rounded-[3px] border-2 ${veg ? 'border-[#1a7f37]' : 'border-[#b42318]'}`}
    >
      <span className={`size-1.5 rounded-full ${veg ? 'bg-[#1a7f37]' : 'bg-[#b42318]'}`} />
    </span>
  )
}

function Price({ item }: { item: ServiceItem }) {
  const { money } = useDemo()
  if (item.price === null) return <span className="text-sm font-semibold text-muted">On request</span>
  const prefix = item.prefix ?? 'from'
  return (
    <span className="whitespace-nowrap">
      {prefix && <span className="mr-1 text-sm text-muted">{prefix}</span>}
      <span className="font-semibold text-accent-ink tabular-nums">{money(item.price)}</span>
      {item.suffix && <span className="text-sm text-muted">{item.suffix}</span>}
    </span>
  )
}

/** Product cards with a photo and an "Order" button that opens WhatsApp with the item filled in. */
function Cards({ items, sub }: { items: ServiceItem[]; sub: boolean }) {
  const { preset, name } = useDemo()
  const H = sub ? 'h4' : 'h3'
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:gap-5 ${items.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map((it, i) => (
        <li
          key={it.name}
          data-reveal
          className={`card flex flex-col overflow-hidden ${i === 0 && items.length % 2 ? 'col-span-2 sm:col-span-1' : ''}`}
        >
          {it.image && (
            <div className={`relative ${i === 0 && items.length % 2 ? 'aspect-[16/9] sm:aspect-[4/3]' : 'aspect-[4/3]'}`}>
              <Img img={stockImage(preset.key, it.image)} alt="" sizes="(min-width: 1024px) 380px, 50vw" className="absolute inset-0 size-full" />
              {it.tag && (
                <span className="absolute top-2 left-2 rounded-chip bg-highlight px-2 py-0.5 text-xs font-semibold text-on-highlight">{it.tag}</span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col p-3 sm:p-5">
            <H className="font-semibold leading-snug text-ink sm:text-lg">{it.name}</H>
            {it.desc && <p className="mt-1 text-sm leading-snug text-muted">{it.desc}</p>}
            <p className="mt-auto pt-3">
              <Price item={it} />
            </p>
            <ActionLink
              kind="whatsapp"
              text={`Hi ${name}, I'd like to order: ${it.name}`}
              className="btn btn-ghost mt-3 min-h-11 px-3 text-[15px]"
            >
              <WhatsAppIcon size={17} className="text-wa" /> Order<span className="sr-only"> {it.name} on WhatsApp</span>
            </ActionLink>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Services({ id, title, intro, groups, footnote, tone, layout }: Props) {
  if (layout === 'cards') {
    return (
      <Section id={id} tone={tone} title={title} intro={intro}>
        <div className="grid gap-10">
          {groups.map((g, gi) => (
            <div key={g.title ?? gi}>
              {g.title && <h3 className="mb-4 font-display text-xl text-ink sm:text-2xl">{g.title}</h3>}
              <Cards items={g.items} sub={!!g.title} />
            </div>
          ))}
        </div>
        {footnote && <p className="mt-6 text-sm text-muted">{footnote}</p>}
      </Section>
    )
  }
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <div className={`grid gap-5 ${groups.length > 2 ? 'lg:grid-cols-3' : groups.length === 2 ? 'md:grid-cols-2' : ''}`}>
        {groups.map((g, gi) => (
          <div key={g.title ?? gi} className="card p-5 sm:p-6" data-reveal>
            {g.title && <h3 className="mb-1 font-display text-xl text-ink">{g.title}</h3>}
            <ul className="divide-y divide-line">
              {g.items.map((it) => (
                <li key={it.name} className="flex items-start justify-between gap-4 py-3.5">
                  <div className="flex min-w-0 gap-2.5">
                    {layout === 'menu' && it.veg !== undefined && <VegMark veg={it.veg} />}
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-ink">
                        {it.name}
                        {it.tag && (
                          <span className="ml-2 inline-block rounded-chip bg-highlight px-2 py-0.5 align-[2px] text-xs font-semibold text-on-highlight">
                            {it.tag}
                          </span>
                        )}
                      </p>
                      {it.desc && <p className="mt-0.5 text-sm leading-snug text-muted">{it.desc}</p>}
                    </div>
                  </div>
                  <p className="shrink-0 pt-px text-right">
                    <Price item={it} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {footnote && <p className="mt-6 text-sm text-muted">{footnote}</p>}
    </Section>
  )
}
