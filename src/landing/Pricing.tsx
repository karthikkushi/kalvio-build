import { Check } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { WhatsAppIcon } from '../components/Icon'
import { PRICING, inr, usd } from '../config/pricing'
import { SITE, waLink } from '../config/site'

export function Pricing() {
  const [sp] = useSearchParams()
  const us = sp.get('region') === 'us'
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section bg-bg">
      <div className="wrap">
        <p className="eyebrow">Pricing</p>
        <h2 id="pricing-title" className="h2 mt-3 max-w-2xl text-ink">
          One-time price. See the sample first.
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">You pay only after you’ve seen your website and want it live.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PRICING.plans.map((p) => (
            <article key={p.key} data-reveal className={`card flex flex-col p-6 sm:p-8 ${p.highlight ? 'ring-2 ring-accent' : ''}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl text-ink">{p.name}</h3>
                {p.highlight && <span className="rounded-chip bg-highlight px-3 py-1 text-xs font-semibold text-on-highlight">Most chosen</span>}
              </div>
              <p className="mt-1 text-muted">{p.pages}</p>
              <p className="mt-5 font-display text-5xl text-ink tabular-nums">{inr(p.price)}</p>
              {us && (
                <p className="mt-1 font-semibold text-accent-ink tabular-nums">
                  {usd(p.price)} <span className="font-normal text-muted">for clients in the USA</span>
                </p>
              )}
              <p className="text-sm text-muted">one-time</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-ink">
                    <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-ink" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(SITE.whatsapp, `Hi Kalvio Build, I’m interested in the ${p.name} website (${inr(p.price)}).`)}
                target="_blank"
                rel="noopener"
                className={`btn mt-8 ${p.highlight ? 'btn-primary' : 'btn-ghost'}`}
              >
                <WhatsAppIcon size={18} /> Ask about {p.name}
              </a>
            </article>
          ))}
        </div>
        <dl className="mt-6 grid gap-3 rounded-card bg-surface-alt p-5 sm:grid-cols-2 sm:p-6">
          {PRICING.extras.map((x) => (
            <div key={x.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-ink">{x.label}</dt>
              <dd className="font-semibold whitespace-nowrap text-ink tabular-nums">
                {x.approx ? 'about ' : ''}
                {inr(x.price)} / {x.period}
                {us && <span className="ml-1 font-normal text-muted">({usd(x.price)})</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
