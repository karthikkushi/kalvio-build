import { useYesLink } from '../lib/actions'
import { WhatsAppIcon } from '../components/Icon'
import { SITE } from '../config/site'
import { UI, t } from '../i18n/strings'
import { useDemo } from '../lib/demo'

/** Kalvio Build's sign-off after the sample. Same brand look in every theme. */
export function Closing() {
  const { lang, name, personalised } = useDemo()
  const yes = useYesLink()
  return (
    <section aria-labelledby="closing-title" className="bg-[#14121f] text-white">
      <div className="wrap py-16 text-center lg:py-24">
        <p data-p="closing-eyebrow" className="text-sm font-semibold tracking-[0.12em] text-[#c9c3ff] uppercase">
          {personalised ? `Made for ${name}` : 'Like this for your shop?'}
        </p>
        <h2 id="closing-title" className="mx-auto mt-3 max-w-2xl font-['Outfit',sans-serif] text-[2.1rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">
          {t(UI.closingTitle, lang)}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/80">{t(UI.closingBody, lang)}</p>
        <a href={yes} data-p-href="yes" target="_blank" rel="noopener" className="btn btn-wa mt-8 min-h-14 px-8 text-lg">
          <WhatsAppIcon size={22} /> {t(UI.closingCta, lang)}
        </a>
        <p className="mt-5 text-sm text-white/70">
          Kalvio Build · {SITE.whatsappDisplay} · {SITE.city}
        </p>
      </div>
    </section>
  )
}
