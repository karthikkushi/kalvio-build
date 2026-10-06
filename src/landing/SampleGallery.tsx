import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { CATALOG, CATALOG_GROUPS } from '../data/catalog'

export function SampleGallery() {
  return (
    <section id="samples" aria-labelledby="samples-title" className="section bg-bg">
      <div className="wrap">
        <p className="eyebrow">Samples</p>
        <h2 id="samples-title" className="h2 mt-3 max-w-2xl text-ink">
          A sample for every kind of local business
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          These are demo shops with made-up names. Open one on your phone: yours will look like this, with your own name, photos and prices.
        </p>
        <div className="mt-10 grid gap-12">
          {CATALOG_GROUPS.map((g) => (
            <div key={g}>
              <h3 className="font-display text-2xl text-ink">{g}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {CATALOG.filter((c) => c.group === g).map((c) => (
                  <li key={c.key} data-reveal>
                    <Link to={`/demo/${c.key}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface-alt shadow-card ring-1 ring-line">
                        <img
                          src={`/previews/${c.key}.webp`}
                          width={560}
                          height={1212}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 size-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <p className="mt-3 flex items-center justify-between gap-2 font-semibold text-ink">
                        {c.label}
                        <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-accent-ink" />
                      </p>
                      <p className="text-sm text-muted">{c.demoName}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
