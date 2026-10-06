import { MoveHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Img } from '../components/Img'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'
import { stockImage } from '../lib/stock'

type Props = Extract<SectionConfig, { kind: 'beforeAfter' }> & { tone: Tone }

/** Drag (or use arrow keys) to compare. The "before" is the same photo, toned down, and labelled as an illustration. */
export function BeforeAfter({ id, title, intro, image, caption, tone }: Props) {
  const { preset } = useDemo()
  const img = stockImage(preset.key, image)
  const [pos, setPos] = useState(50)
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <figure data-reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card sm:aspect-[16/9]">
          <Img img={img} sizes="(min-width: 1200px) 1136px, 100vw" className="absolute inset-0 size-full" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Img
              img={img}
              alt=""
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="absolute inset-0 size-full"
              filter="sepia(0.55) saturate(0.7) brightness(0.88) contrast(0.92)"
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 grid size-11 -translate-1/2 place-items-center rounded-full bg-white text-[#111] shadow-float">
              <MoveHorizontal size={20} aria-hidden="true" />
            </span>
          </div>
          <span className="pointer-events-none absolute top-3 left-3 rounded-chip bg-black/65 px-3 py-1 text-sm font-semibold text-white">Before</span>
          <span className="pointer-events-none absolute top-3 right-3 rounded-chip bg-black/65 px-3 py-1 text-sm font-semibold text-white">After</span>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Slide to compare before and after"
            className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      </figure>
    </Section>
  )
}
