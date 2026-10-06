import { Img } from '../components/Img'
import { Monogram } from '../components/Monogram'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'
import { instaHandle } from '../lib/personalise'
import { stockImage } from '../lib/stock'

type Props = Extract<SectionConfig, { kind: 'gallery' }> & { tone: Tone }

export function Gallery({ id, title, intro, items, style, tone }: Props) {
  const { preset, name, monogram } = useDemo()
  if (style === 'insta') {
    return (
      <Section
        id={id}
        tone={tone}
        title={title}
        intro={intro}
        aside={
          <div className="flex items-center gap-3">
            <Monogram text={monogram} size="sm" />
            <div>
              <p data-p="handle" className="font-semibold text-ink">
                {instaHandle(name)}
              </p>
              <p className="text-sm text-muted">Sample Instagram feed</p>
            </div>
          </div>
        }
      >
        <ul className="grid grid-cols-3 gap-1 overflow-hidden rounded-card sm:gap-2" data-reveal>
          {items.map((it) => (
            <li key={it.image} className="group relative aspect-square overflow-hidden bg-surface">
              <Img
                img={stockImage(preset.key, it.image)}
                alt={it.caption}
                sizes="(min-width: 1200px) 380px, 33vw"
                className="absolute inset-0 size-full transition duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-black/75 to-transparent p-3 pt-10 text-sm font-semibold text-white sm:block">
                {it.caption}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    )
  }
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.image + i} className={i === 0 ? 'col-span-2 lg:col-span-1' : ''} data-reveal>
            <figure>
              <div className={`relative overflow-hidden rounded-card ${i === 0 ? 'aspect-[16/10] lg:aspect-[4/5]' : 'aspect-[4/5]'}`}>
                <Img img={stockImage(preset.key, it.image)} alt={it.caption} sizes="(min-width: 1024px) 380px, 50vw" className="absolute inset-0 size-full" />
              </div>
              <figcaption className="mt-2 text-sm text-muted">{it.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
