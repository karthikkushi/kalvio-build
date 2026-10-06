import { ChevronDown } from 'lucide-react'
import { LANDING_FAQ } from './faq'

export function LandingFaq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-bg">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h2 mt-3 text-ink">
            Questions shop owners ask
          </h2>
        </div>
        <div className="card divide-y divide-line px-5 sm:px-7">
          {LANDING_FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
