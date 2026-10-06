import { Check } from 'lucide-react'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'

type Props = Extract<SectionConfig, { kind: 'plans' }> & { tone: Tone }

export function Plans({ id, title, intro, plans, footnote, tone }: Props) {
  const { money, preset } = useDemo()
  const hasBooking = preset.sections.some((s) => s.kind === 'booking')
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.name}
            data-reveal
            className={`card flex flex-col p-6 sm:p-7 ${p.highlight ? 'ring-2 ring-accent lg:-my-3 lg:py-10' : ''}`}
          >
            {p.note && (
              <span className="mb-3 self-start rounded-chip bg-highlight px-3 py-1 text-xs font-semibold text-on-highlight">{p.note}</span>
            )}
            <h3 className="font-display text-2xl text-ink">{p.name}</h3>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl text-ink tabular-nums">{money(p.price)}</span>
              <span className="text-muted">/ {p.period}</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-ink">
                  <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-ink" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            {hasBooking && (
              <a href="#book" className={`btn mt-7 ${p.highlight ? 'btn-primary' : 'btn-ghost'}`}>
                Enquire<span className="sr-only"> about {p.name}</span>
              </a>
            )}
          </article>
        ))}
      </div>
      {footnote && <p className="mt-6 text-sm text-muted">{footnote}</p>}
    </Section>
  )
}
