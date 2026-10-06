import type { ReactNode } from 'react'

export type Tone = 'base' | 'alt'

interface Props {
  id: string
  tone: Tone
  title: string
  intro?: string
  eyebrow?: string
  children: ReactNode
  /** Extra element on the right of the heading on wide screens. */
  aside?: ReactNode
}

export function Section({ id, tone, title, intro, eyebrow, children, aside }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section ${tone === 'alt' ? 'bg-surface-alt' : 'bg-bg'}`}>
      <div className="wrap">
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between" data-reveal>
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 id={`${id}-title`} className="h2 text-ink">
              {title}
            </h2>
            {intro && <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  )
}
