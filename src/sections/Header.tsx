import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { ActionLink } from '../components/DemoActions'
import { MessageIcon } from '../components/MessageIcon'
import { Monogram } from '../components/Monogram'
import { UI, t } from '../i18n/strings'
import { useDemo } from '../lib/demo'
import { useMessaging } from '../lib/messaging'

export function Header() {
  const { name, monogram, preset, lang } = useDemo()
  const [open, setOpen] = useState(false)
  const m = useMessaging()
  const menuId = useId()
  const links = preset.sections.filter((s) => s.nav).map((s) => ({ id: s.id, label: s.nav! }))
  const hasBooking = preset.sections.some((s) => s.kind === 'booking')
  // On desktop the booking button sits next to the menu, so its link would be a duplicate.
  const deskLinks = links.filter((l) => !(hasBooking && l.id === 'book'))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="relative z-30 border-b border-line bg-bg lg:sticky lg:top-0 lg:bg-bg/90 lg:backdrop-blur-md">
      <div className="wrap flex h-16 items-center gap-3">
        <a href="#top" className="flex min-w-0 items-center gap-3 rounded-md xl:min-w-[13rem]">
          <Monogram text={monogram} size="sm" />
          <span data-p="name" className="truncate font-display text-lg leading-tight text-ink">
            {name}
          </span>
        </a>
        <nav aria-label="Sections" className="ml-auto hidden xl:block">
          <ul className="flex items-center">
            {deskLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="rounded-btn px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap text-muted hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex xl:ml-2">
          <ActionLink kind="call" className="btn btn-ghost min-h-11 whitespace-nowrap">
            <Phone size={18} aria-hidden="true" /> {t(UI.call, lang)}
          </ActionLink>
          {hasBooking && (
            <a href="#book" className="btn btn-primary min-h-11 whitespace-nowrap">
              {t(preset.primaryCta, lang)}
            </a>
          )}
        </div>
        <button
          type="button"
          className="-mr-2 ml-auto grid size-11 shrink-0 place-items-center rounded-btn text-ink lg:ml-1 xl:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <div id={menuId} hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-float xl:hidden">
        <nav aria-label="Sections" className="wrap py-2">
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-lg font-semibold text-ink last:border-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 py-4">
            <ActionLink kind="call" className="btn btn-primary">
              <Phone size={18} aria-hidden="true" /> {t(UI.call, lang)}
            </ActionLink>
            <ActionLink kind="whatsapp" className="btn btn-wa">
              <MessageIcon size={18} /> {m.label}
            </ActionLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
