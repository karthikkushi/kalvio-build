import { SITE } from '../config/site'

const STEPS = [
  { title: 'Tell us about your shop', text: 'On a call or on WhatsApp: your shop’s name, area and what you sell.' },
  { title: 'Get a free sample in a minute', text: 'A link on WhatsApp to a website with your name, area and phone number on it.' },
  { title: 'Approve, or ask for changes', text: 'Send your photos, prices and timings. We put them in and show you again.' },
  { title: `Live in ${SITE.delivery}`, text: 'On your own web address, with Call, WhatsApp and Google Maps buttons that work.' },
]

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="section bg-surface-alt">
      <div className="wrap">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title" className="h2 mt-3 max-w-2xl text-ink">
          From a phone call to a live website in a week
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card relative p-6" data-reveal>
              <span className="grid size-11 place-items-center rounded-full bg-[#14121f] font-display text-lg text-[#c9c3ff]" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
