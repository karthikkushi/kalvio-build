import { Img } from '../components/Img'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'
import { stockImage } from '../lib/stock'

type Props = Extract<SectionConfig, { kind: 'team' }> & { tone: Tone }

export function Team({ id, title, intro, people, tone }: Props) {
  const { preset } = useDemo()
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <div className="grid gap-6">
        {people.map((person) => (
          <article key={person.name} className="card grid overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" data-reveal>
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-96">
              <Img img={stockImage(preset.key, person.image)} sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full" />
            </div>
            <div className="p-6 sm:p-8 lg:p-12">
              <h3 className="font-display text-2xl text-ink sm:text-3xl">{person.name}</h3>
              <p className="mt-1 font-semibold text-accent-ink">{person.role}</p>
              <p className="mt-1 text-sm text-muted">{person.quals}</p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-4">
                {person.years && (
                  <div>
                    <dt className="text-sm text-muted">Experience</dt>
                    <dd className="font-display text-2xl text-ink">{person.years}+ years</dd>
                  </div>
                )}
                {person.languages && (
                  <div>
                    <dt className="text-sm text-muted">Speaks</dt>
                    <dd className="mt-1 font-semibold text-ink">{person.languages.join(', ')}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-5 max-w-prose leading-relaxed text-ink">{person.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
