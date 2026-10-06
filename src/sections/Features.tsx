import { Icon } from '../components/Icon'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'

type Props = Extract<SectionConfig, { kind: 'features' }> & { tone: Tone }

export function Features({ id, title, intro, items, tone }: Props) {
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.title} className="card flex gap-4 p-4 sm:block sm:p-6" data-reveal>
            <span className="grid size-11 shrink-0 place-items-center rounded-chip bg-surface-alt text-accent-ink">
              <Icon name={it.icon} size={22} />
            </span>
            <div>
              <h3 className="font-display text-lg leading-snug text-ink sm:mt-4 sm:text-xl">{it.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted sm:mt-1.5 sm:text-base">{it.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
