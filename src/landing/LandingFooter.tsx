import { Mail, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '../components/Icon'
import { SITE, waLink } from '../config/site'
import { HELLO } from './LandingHeader'
import { Logo } from './Logo'

export function LandingFooter() {
  return (
    <footer className="bg-[#14121f] text-white">
      <section aria-labelledby="cta-title" className="wrap py-16 text-center lg:py-24">
        <h2 id="cta-title" className="mx-auto max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          Want to see your shop’s website?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">Send your shop’s name on WhatsApp. We’ll reply with your free sample.</p>
        <a href={waLink(SITE.whatsapp, HELLO)} target="_blank" rel="noopener" className="btn btn-wa mt-8 min-h-14 px-8 text-lg">
          <WhatsAppIcon size={22} /> WhatsApp {SITE.whatsappDisplay}
        </a>
      </section>
      <div className="border-t border-white/10">
        <div className="wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-3 max-w-sm text-white/70">Websites for local shops, clinics and studios. Free sample first, live in {SITE.delivery}.</p>
          </div>
          <ul className="space-y-1 text-white/85">
            <li>
              <a href={waLink(SITE.whatsapp, HELLO)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                <WhatsAppIcon size={18} /> {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
                <Mail size={18} aria-hidden="true" /> {SITE.email}
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-2">
              <MapPin size={18} aria-hidden="true" /> {SITE.city}
            </li>
          </ul>
          <ul className="space-y-1 text-white/85">
            <li>
              <a href="#samples" className="inline-flex min-h-11 items-center hover:text-white">
                Samples
              </a>
            </li>
            <li>
              <a href="#pricing" className="inline-flex min-h-11 items-center hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="/stock/CREDITS.md" className="inline-flex min-h-11 items-center hover:text-white">
                Photo credits
              </a>
            </li>
          </ul>
        </div>
        <p className="wrap pb-8 text-sm text-white/60">
          © {SITE.year} {SITE.name}, {SITE.city}
        </p>
      </div>
    </footer>
  )
}
