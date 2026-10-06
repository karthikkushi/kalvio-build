import { Check } from 'lucide-react'
import { Img } from '../components/Img'
import type { Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'
import { stockImage } from '../lib/stock'

type Props = Extract<SectionConfig, { kind: 'about' }> & { tone: Tone }

export function About({ id, title, body, image, points, tone }: Props) {
  const { preset } = useDemo()
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section ${tone === 'alt' ? 'bg-surface-alt' : 'bg-bg'}`}>
      <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-img" data-reveal>
          <Img img={stockImage(preset.key, image)} sizes="(min-width: 1024px) 560px, 100vw" className="absolute inset-0 size-full" />
        </div>
        <div data-reveal>
          <h2 id={`${id}-title`} className="h2 text-ink">
            {title}
          </h2>
          {body.map((para) => (
            <p key={para.slice(0, 24)} className="mt-4 text-[17px] leading-relaxed text-muted">
              {para}
            </p>
          ))}
          {points && (
            <ul className="mt-6 grid gap-2.5">
              {points.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 font-semibold text-ink">
                  <Check size={18} aria-hidden="true" className="text-accent-ink" strokeWidth={2.5} />
                  {pt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
