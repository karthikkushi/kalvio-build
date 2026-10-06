import { Check, MapPin, Phone } from 'lucide-react'
import { ActionLink } from '../components/DemoActions'
import { Icon } from '../components/Icon'
import { MessageIcon } from '../components/MessageIcon'
import { Img } from '../components/Img'
import { Monogram } from '../components/Monogram'
import { Stars } from '../components/Stars'
import { tRich } from '../i18n/rich'
import { t } from '../i18n/strings'
import { useDemo } from '../lib/demo'
import { useMessaging } from '../lib/messaging'
import { NAME_BASE_CLASS, nameSizeClass } from '../lib/personalise'
import { stockImage } from '../lib/stock'

const FRAME = {
  inset: 'mx-4 mt-3 rounded-img sm:mx-8 lg:m-0',
  arch: 'mx-4 mt-3 rounded-img sm:mx-8 lg:m-0',
  bleed: 'lg:rounded-img',
} as const

// Keeps the overlaid name inside the photo's edges on phones.
const NAME_PAD = {
  inset: 'px-8 pb-6 sm:px-14',
  arch: 'px-8 pb-6 sm:px-14',
  bleed: 'px-5 pb-6 sm:px-8',
} as const

/** First screen: shop name, area and phone on the photo like a signboard, then the headline and proof. */
export function Hero() {
  const d = useDemo()
  const m = useMessaging()
  const p = d.preset
  const img = stockImage(p.key, p.hero.image)
  const hasBooking = p.sections.some((s) => s.kind === 'booking')
  const years = new Date().getFullYear() - p.demo.since

  return (
    <section id="top" aria-labelledby="shop-name" className="bg-bg pb-10 lg:py-14">
      <div className="hero-grid lg:wrap">
        <div className={`hero-media relative overflow-hidden ${FRAME[d.theme.heroFrame]}`}>
          <Img img={img} priority sizes="(min-width: 1024px) 560px, calc(100vw - 32px)" className="absolute inset-0 size-full" />
          <div className="absolute inset-0 bg-linear-to-t from-scrim via-scrim/45 via-45% to-transparent lg:hidden" />
        </div>

        <div className={`hero-name z-10 text-white lg:px-0 lg:pb-0 lg:text-ink ${NAME_PAD[d.theme.heroFrame]}`}>
          <div className="mb-5 hidden lg:block">
            <Monogram text={d.monogram} size="lg" />
          </div>
          <h1 id="shop-name" data-p="name" data-p-class="name" className={`${NAME_BASE_CLASS} ${nameSizeClass(d.name.length)}`}>
            {d.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-[17px] text-white/90 lg:text-lg lg:text-muted">
            <MapPin size={18} aria-hidden="true" className="shrink-0" />
            <span>
              <span data-p="area">{d.area}</span>, <span data-p="city">{d.city}</span>
            </span>
          </p>
          <ActionLink
            kind="call"
            className="mt-4 inline-flex min-h-12 items-center gap-2.5 rounded-chip bg-white/15 px-4 text-lg font-semibold tabular-nums ring-1 ring-white/35 backdrop-blur-sm lg:bg-surface lg:text-ink lg:shadow-card lg:ring-line"
          >
            <Phone size={19} aria-hidden="true" />
            <span className="sr-only">Call </span>
            <span data-p="phone">{d.phoneDisplay}</span>
          </ActionLink>
        </div>

        <div className="hero-copy px-4 pt-7 sm:px-8 lg:px-0 lg:pt-8">
          <p className="font-display text-[1.65rem] leading-[1.15] text-balance text-ink sm:text-3xl lg:text-[2.1rem]">
            {tRich(p.hero.headline, d.lang, d.vars)}
          </p>
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{tRich(p.hero.subline, d.lang, d.vars)}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.hero.chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-chip bg-surface px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-line">
                <Check size={15} aria-hidden="true" className="text-accent-ink" strokeWidth={3} />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {p.primaryAction?.kind === 'whatsapp' ? (
              <ActionLink
                kind="whatsapp"
                text={p.primaryAction.text.replace('{name}', d.name)}
                className="btn btn-primary flex-auto px-5 whitespace-nowrap sm:flex-none sm:px-6"
              >
                <MessageIcon size={19} /> {t(p.primaryCta, d.lang)}
              </ActionLink>
            ) : hasBooking ? (
              <a href="#book" className="btn btn-primary flex-auto px-5 whitespace-nowrap sm:flex-none sm:px-6">
                {t(p.primaryCta, d.lang)}
              </a>
            ) : (
              <ActionLink kind="call" className="btn btn-primary flex-auto px-5 whitespace-nowrap sm:flex-none sm:px-6">
                {t(p.primaryCta, d.lang)}
              </ActionLink>
            )}
            <ActionLink kind="whatsapp" className="btn btn-ghost flex-auto px-5 whitespace-nowrap sm:flex-none sm:px-6">
              <MessageIcon size={19} className="text-wa" /> {m.label}
            </ActionLink>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-card bg-surface p-4 shadow-card sm:p-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl leading-none text-ink">{p.rating.value}</span>
              <span>
                <Stars value={p.rating.value} className="text-muted" />
                <span className="mt-0.5 block text-sm text-muted">
                  {p.rating.count} Google reviews
                </span>
              </span>
            </div>
            <span className="hidden h-10 w-px bg-line sm:block" aria-hidden="true" />
            <div>
              <span className="block font-display text-2xl leading-none text-ink">{years}+ years</span>
              <span className="mt-1 block text-sm text-muted">
                in <span data-p="area">{d.area}</span>
              </span>
            </div>
            <p className="w-full border-t border-line pt-3 text-xs text-muted">
              Sample rating and history. We show your real Google rating once you’re live.
            </p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="Trust badges">
            {p.badges.map((b) => (
              <li key={b.label} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon name={b.icon} size={18} className="text-accent-ink" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
