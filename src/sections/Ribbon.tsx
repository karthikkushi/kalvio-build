import { X } from 'lucide-react'
import { useState } from 'react'
import { SITE, waLink } from '../config/site'
import { UI, t } from '../i18n/strings'
import { useDemo } from '../lib/demo'
import { ribbonMessage } from '../lib/personalise'

const KEY = 'kb-ribbon-hidden'

/** Slim Kalvio Build strip above the sample. Same brand colours in every theme. */
export function Ribbon() {
  const { name, personalised, lang, pageUrl, preset } = useDemo()
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })
  if (hidden) return null

  const message = ribbonMessage(personalised, name, preset.label, pageUrl)

  return (
    <div className="bg-[#14121f] text-sm text-white">
      <div className="wrap flex min-h-11 items-center gap-2 py-1">
        <p className="flex-1 leading-snug">
          <span data-p="ribbon-text" className="text-white/85">
            {personalised ? t(UI.ribbonPersonal, lang, { name }) : t(UI.ribbonGeneric, lang)}</span>{' '}
          <a
            href={waLink(SITE.whatsapp, message)}
            data-p-href="ribbon"
            target="_blank"
            rel="noopener"
            className="py-3 font-semibold text-[#c9c3ff] underline decoration-[#c9c3ff]/50 underline-offset-2 hover:decoration-[#c9c3ff]"
          >
            {t(UI.ribbonCta, lang)}
          </a>
        </p>
        <button
          type="button"
          className="-mr-2 grid size-11 shrink-0 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Hide this message"
          onClick={() => {
            setHidden(true)
            try {
              sessionStorage.setItem(KEY, '1')
            } catch {
              /* private mode */
            }
          }}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
