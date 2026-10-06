import { Check, Wrench } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { WhatsAppIcon } from '../components/Icon'
import { PRICING, US_MONTHLY, inr } from '../config/pricing'
import { SITE, waLink } from '../config/site'

function Tick({ children }: { children: string }) {
  return (
    <li className="flex gap-2.5 text-ink">
      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-ink" strokeWidth={2.5} />
      {children}
    </li>
  )
}

/** Shown first when the page is opened with ?region=us (US plumbers, electricians, cleaners). */
function UsPlan() {
  const us = PRICING.us
  return (
    <article className="card mb-8 flex flex-col gap-6 p-6 ring-2 ring-accent sm:p-8 lg:flex-row lg:items-center lg:justify-between" data-reveal>
      <div>
        <p className="eyebrow">For clients in the USA</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-5xl text-ink tabular-nums">{US_MONTHLY}</span>
          <span className="text-lg text-muted">/ month</span>
        </p>
        <p className="mt-1 text-muted">No setup fee. {us.minimumMonths}-month minimum.</p>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {us.features.map((f) => (
          <Tick key={f}>{f}</Tick>
        ))}
      </ul>
      <a
        href={waLink(SITE.whatsapp, `Hi Kalvio Build, I’m in the USA and interested in the ${US_MONTHLY}/month website.`)}
        target="_blank"
        rel="noopener"
        className="btn btn-primary shrink-0"
      >
        <WhatsAppIcon size={18} /> Ask about the US plan
      </a>
    </article>
  )
}

export function Pricing() {
  const [sp] = useSearchParams()
  const us = sp.get('region') === 'us'
  const { care, renewal, editPrice } = PRICING
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section bg-bg">
      <div className="wrap">
        <p className="eyebrow">Pricing</p>
        <h2 id="pricing-title" className="h2 mt-3 max-w-2xl text-ink">
          One price list for every business. See the sample first.
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">You pay only after you’ve seen your website and want it live.</p>

        <div className="mt-10">
          {us && <UsPlan />}
          <div className="grid gap-5 lg:grid-cols-3">
            {PRICING.plans.map((p) => (
              <article key={p.key} data-reveal className={`card flex flex-col p-6 sm:p-8 ${p.highlight ? 'ring-2 ring-accent' : ''}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-ink">{p.name}</h3>
                  {p.highlight && <span className="rounded-chip bg-highlight px-3 py-1 text-xs font-semibold text-on-highlight">Most chosen</span>}
                </div>
                <p className="mt-1 text-muted">{p.pages}</p>
                <p className="mt-5 font-display text-5xl text-ink tabular-nums">{inr(p.price)}</p>
                <p className="text-sm text-muted">one-time</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <Tick key={f}>{f}</Tick>
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
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-card bg-surface-alt px-5 py-4 sm:px-6">
          <p className="font-semibold text-ink">Every plan includes:</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {PRICING.included.map((f) => (
              <Tick key={f}>{f}</Tick>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <article className="card p-6 sm:p-8" data-reveal aria-labelledby="care-title">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 id="care-title" className="flex items-center gap-2.5 font-display text-2xl text-ink">
                <Wrench size={22} aria-hidden="true" className="text-accent-ink" /> Care plan
              </h3>
              <p className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl text-ink tabular-nums">{inr(care.price)}</span>
                <span className="text-muted">/ {care.period}, optional</span>
              </p>
            </div>
            <p className="mt-2 text-muted">For owners who want us to keep the website up to date.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {care.features.map((f) => (
                <Tick key={f}>{f}</Tick>
              ))}
            </ul>
          </article>
          <article className="rounded-card bg-surface-alt p-6 sm:p-8" data-reveal aria-labelledby="renewal-title">
            <h3 id="renewal-title" className="font-display text-xl text-ink">
              Without the care plan
            </h3>
            <dl className="mt-4 space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink">Domain and hosting, from year 2</dt>
                <dd className="font-semibold whitespace-nowrap text-ink tabular-nums">
                  {inr(renewal.price)} / {renewal.period}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink">Each small change</dt>
                <dd className="font-semibold whitespace-nowrap text-ink tabular-nums">{inr(editPrice)}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  )
}
