import { ArrowDown, Check } from 'lucide-react'
import { WhatsAppIcon } from '../components/Icon'
import { FROM_PRICE, inr } from '../config/pricing'
import { SITE, waLink } from '../config/site'
import { HELLO } from './LandingHeader'
import { PhonePreview } from './PhonePreview'

export function LandingHero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-[#14121f] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-20%] size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(91_69_224/0.45),transparent)]" />
      <div className="wrap relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] text-[#c9c3ff] uppercase">Websites for local businesses · {SITE.city}</p>
          <h1 id="hero-title" className="mt-4 font-display text-[2.6rem] leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
            See your shop’s website before you pay.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Free sample in 1 minute, with your shop’s name, area and phone number. Like it? It goes live in {SITE.delivery}, from{' '}
            {inr(FROM_PRICE)}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#make" className="btn min-h-13 flex-auto bg-[#c9c3ff] px-6 text-lg text-[#14121f] hover:bg-white sm:flex-none">
              Make my free sample <ArrowDown size={20} aria-hidden="true" />
            </a>
            <a href={waLink(SITE.whatsapp, HELLO)} target="_blank" rel="noopener" className="btn btn-wa min-h-13 flex-auto px-6 text-lg sm:flex-none">
              <WhatsAppIcon size={20} /> WhatsApp us
            </a>
          </div>
          <ul className="mt-8 grid gap-2.5 text-white/85 sm:grid-cols-2">
            {['The sample is free, no obligation', 'Made for phones first', 'Call, WhatsApp and Maps buttons', 'One-time price, no monthly lock-in'].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Check size={18} aria-hidden="true" className="shrink-0 text-[#c9c3ff]" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <PhonePreview />
      </div>
    </section>
  )
}
