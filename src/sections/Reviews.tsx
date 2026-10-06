import { Section, type Tone } from '../components/Section'
import { Stars } from '../components/Stars'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'

type Props = Extract<SectionConfig, { kind: 'reviews' }> & { tone: Tone }

export function Reviews({ id, title, tone }: Props) {
  const { preset } = useDemo()
  const { rating, reviews } = preset
  return (
    <Section
      id={id}
      tone={tone}
      title={title}
      aside={
        <div className="flex items-center gap-3">
          <span className="font-display text-5xl leading-none text-ink">{rating.value}</span>
          <span>
            <Stars value={rating.value} size={18} className="text-muted" />
            <span className="mt-1 block text-sm text-muted">{rating.count} reviews on Google</span>
          </span>
        </div>
      }
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.name} className="card flex flex-col p-5 sm:p-6" data-reveal>
            <figure>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-surface-alt font-semibold text-ink">
                  {r.name[0]}
                </span>
                <div>
                  <figcaption className="font-semibold text-ink">{r.name}</figcaption>
                  <p className="text-sm text-muted">{r.when}</p>
                </div>
              </div>
              <Stars value={r.stars} className="mt-4 text-muted" />
              <blockquote className="mt-2 leading-relaxed text-ink">{r.text}</blockquote>
            </figure>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-muted">Sample reviews. Your real Google reviews appear here once you’re live.</p>
    </Section>
  )
}
