import { TESTIMONIALS } from '../data/testimonials'

/** Real client words only. Renders nothing until src/data/testimonials.ts has entries. */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null
  return (
    <section aria-labelledby="testimonials-title" className="section bg-surface-alt">
      <div className="wrap">
        <p className="eyebrow">Clients</p>
        <h2 id="testimonials-title" className="h2 mt-3 text-ink">
          What our clients say
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="card p-6">
              <figure>
                <blockquote className="leading-relaxed text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted">
                  <span className="font-semibold text-ink">{t.name}</span>, {t.business}, {t.area}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
