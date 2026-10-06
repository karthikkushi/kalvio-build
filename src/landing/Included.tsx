import { Icon } from '../components/Icon'
import type { IconName } from '../data/types'

const ITEMS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'phone', title: 'Call and WhatsApp buttons', text: 'One tap from Google or Instagram to your phone, with the message already typed.' },
  { icon: 'map', title: 'Directions to your door', text: 'Your Google Maps location, timings and address, always up to date.' },
  { icon: 'tag', title: 'Your services and prices', text: 'Customers see what you offer and what it costs before they call.' },
  { icon: 'bolt', title: 'Fast on any phone', text: 'Built for ₹10,000 phones on 4G. Pages open in about two seconds.' },
  { icon: 'star', title: 'Your Google reviews', text: 'Your real rating and reviews, shown where new customers decide.' },
  { icon: 'book', title: 'English, Kannada or Hindi', text: 'Speak to customers in their language (Premium plan).' },
]

export function Included() {
  return (
    <section aria-labelledby="included-title" className="section bg-surface-alt">
      <div className="wrap">
        <p className="eyebrow">In every website</p>
        <h2 id="included-title" className="h2 mt-3 max-w-2xl text-ink">
          Made for how your customers really find you
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <li key={it.title} className="card flex gap-4 p-5 sm:p-6" data-reveal>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#14121f] text-[#c9c3ff]">
                <Icon name={it.icon} size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg text-ink">{it.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
