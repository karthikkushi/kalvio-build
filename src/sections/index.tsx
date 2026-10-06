import type { Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { About } from './About'
import { BeforeAfter } from './BeforeAfter'
import { Callout } from './Callout'
import { Booking } from './Booking'
import { Faq } from './Faq'
import { Features } from './Features'
import { Gallery } from './Gallery'
import { GoldRate } from './GoldRate'
import { OfferBanner } from './OfferBanner'
import { Plans } from './Plans'
import { Reviews } from './Reviews'
import { Schedule } from './Schedule'
import { Services } from './Services'
import { Team } from './Team'
import { Timings } from './Timings'

/** Renders a preset's sections in order, alternating background tones. The offer banner sits outside the rhythm. */
export function Sections({ sections, hasOffer }: { sections: SectionConfig[]; hasOffer: boolean }) {
  let n = 0
  return sections.map((s) => {
    if (s.kind === 'offer') return hasOffer ? <OfferBanner key={s.id} id={s.id} /> : null
    if (s.kind === 'callout') return <Callout key={s.id} {...s} />
    const tone: Tone = n++ % 2 ? 'base' : 'alt'
    switch (s.kind) {
      case 'services':
        return <Services key={s.id} {...s} tone={tone} />
      case 'plans':
        return <Plans key={s.id} {...s} tone={tone} />
      case 'team':
        return <Team key={s.id} {...s} tone={tone} />
      case 'beforeAfter':
        return <BeforeAfter key={s.id} {...s} tone={tone} />
      case 'gallery':
        return <Gallery key={s.id} {...s} tone={tone} />
      case 'features':
        return <Features key={s.id} {...s} tone={tone} />
      case 'schedule':
        return <Schedule key={s.id} {...s} tone={tone} />
      case 'about':
        return <About key={s.id} {...s} tone={tone} />
      case 'goldRate':
        return <GoldRate key={s.id} {...s} tone={tone} />
      case 'booking':
        return <Booking key={s.id} {...s} tone={tone} />
      case 'reviews':
        return <Reviews key={s.id} {...s} tone={tone} />
      case 'faq':
        return <Faq key={s.id} {...s} tone={tone} />
      case 'timings':
        return <Timings key={s.id} {...s} tone={tone} />
    }
  })
}
