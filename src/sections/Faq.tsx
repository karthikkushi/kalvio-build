import { ChevronDown } from 'lucide-react'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'

type Props = Extract<SectionConfig, { kind: 'faq' }> & { tone: Tone }

export function Faq({ id, title, tone }: Props) {
  const { preset } = useDemo()
  return (
    <Section id={id} tone={tone} title={title}>
      <div className="card max-w-3xl divide-y divide-line px-5 sm:px-7" data-reveal>
        {preset.faq.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
