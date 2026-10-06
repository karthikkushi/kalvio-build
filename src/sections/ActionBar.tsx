import { Navigation, Phone } from 'lucide-react'
import { ActionLink } from '../components/DemoActions'
import { WhatsAppIcon } from '../components/Icon'
import { UI, t } from '../i18n/strings'
import { useDemo } from '../lib/demo'

/** Sticky Call · WhatsApp · Directions bar on phones. Hidden from 1024 px up, where the header has these. */
export function ActionBar() {
  const { lang, directionsUrl } = useDemo()
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2 p-2">
        <ActionLink kind="call" className="btn btn-primary min-h-12 px-2 text-[15px]">
          <Phone size={18} aria-hidden="true" />
          {t(UI.call, lang)}
        </ActionLink>
        <ActionLink kind="whatsapp" className="btn btn-wa min-h-12 px-2 text-[15px]">
          <WhatsAppIcon size={18} />
          WhatsApp
        </ActionLink>
        <a href={directionsUrl} data-p-href="directions" target="_blank" rel="noopener" className="btn btn-ghost min-h-12 px-2 text-[15px]">
          <Navigation size={18} aria-hidden="true" />
          {t(UI.directions, lang)}
        </a>
      </div>
    </nav>
  )
}
