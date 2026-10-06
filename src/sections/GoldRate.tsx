import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'

type Props = Extract<SectionConfig, { kind: 'goldRate' }> & { tone: Tone }

const GST = 0.03

/** "Today's gold rate" board, typed in by hand, plus a worked bill so customers see making charges up front. */
export function GoldRate({ id, title, rates, updated, example, tone }: Props) {
  const { money } = useDemo()
  const ex = example && rates[example.rateIndex]
  const gold = ex ? Math.round(ex.price * example!.grams) : 0
  const making = Math.round((gold * (example?.makingPct ?? 0)) / 100)
  const gst = Math.round((gold + making) * GST)
  return (
    <Section id={id} tone={tone} title={title}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="card p-5 sm:p-7" data-reveal>
          <dl className="divide-y divide-line">
            {rates.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="font-semibold text-ink">{r.label}</dt>
                <dd className="font-display text-2xl text-accent-ink tabular-nums">
                  {money(r.price)}
                  <span className="ml-1 font-body text-sm text-muted">/ g</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-muted">Sample rate, updated {updated}. Call or message us for today’s exact price.</p>
        </div>
        {ex && (
          <aside className="rounded-card bg-surface-alt p-5 shadow-card sm:p-7" data-reveal aria-labelledby={`${id}-example`}>
            <h3 id={`${id}-example`} className="font-display text-xl text-ink">
              How your bill is worked out
            </h3>
            <p className="mt-1 text-sm text-muted">Example: {example!.label}</p>
            <dl className="mt-4 space-y-2 text-[15px] tabular-nums">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">
                  Gold value ({example!.grams} g × {money(ex.price)})
                </dt>
                <dd className="text-ink">{money(gold)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Making charges ({example!.makingPct}%)</dt>
                <dd className="text-ink">{money(making)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">GST (3%)</dt>
                <dd className="text-ink">{money(gst)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-3 font-semibold">
                <dt className="text-ink">Total</dt>
                <dd className="font-display text-xl text-accent-ink">{money(gold + making + gst)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted">Every bill shows these lines separately, with the HUID of each piece.</p>
          </aside>
        )}
      </div>
    </Section>
  )
}
