import { useEffect, useRef } from 'react'
import { SITE } from '../config/site'
import { HowItWorks } from '../landing/HowItWorks'
import { Included } from '../landing/Included'
import { LANDING_FAQ } from '../landing/faq'
import { LandingFaq } from '../landing/LandingFaq'
import { LandingFooter } from '../landing/LandingFooter'
import { LandingHeader } from '../landing/LandingHeader'
import { LandingHero } from '../landing/LandingHero'
import { MakeSample } from '../landing/MakeSample'
import { Pricing } from '../landing/Pricing'
import { SampleGallery } from '../landing/SampleGallery'
import { Testimonials } from '../landing/Testimonials'
import { useReveal } from '../lib/reveal'
import { themeToCss } from '../themes'
import { kalvio } from '../themes/kalvio'

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: SITE.name,
      description: 'Websites for local businesses. Free sample first, live in 5 days.',
      telephone: `+${SITE.whatsapp}`,
      email: SITE.email,
      areaServed: SITE.city,
      address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: 'IN' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: LANDING_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}).replace(/</g, '\\u003c')

/** Kalvio Build's own page: one message, "See your shop's website before you pay." */
export default function Landing() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, kalvio.motion)
  useEffect(() => {
    document.title = 'Kalvio Build: see your shop’s website before you pay'
  }, [])
  return (
    <div ref={ref} data-theme="kalvio" className="min-h-svh bg-bg font-body text-ink">
      <style href="theme-kalvio" precedence="theme">
        {themeToCss(kalvio)}
      </style>
      <a href="#main" className="sr-only z-50 rounded-btn bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <LandingHeader />
      <main id="main">
        <LandingHero />
        <MakeSample />
        <HowItWorks />
        <SampleGallery />
        <Included />
        <Pricing />
        <Testimonials />
        <LandingFaq />
      </main>
      <LandingFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
    </div>
  )
}
