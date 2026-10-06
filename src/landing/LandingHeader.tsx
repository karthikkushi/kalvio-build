import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { WhatsAppIcon } from '../components/Icon'
import { SITE, waLink } from '../config/site'
import { Logo } from './Logo'

const LINKS = [
  { href: '#make', label: 'Free sample' },
  { href: '#samples', label: 'Samples' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export const HELLO = 'Hi Kalvio Build, I’d like a free sample website for my shop.'

export function LandingHeader() {
  const [open, setOpen] = useState(false)
  const id = useId()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#14121f]/95 text-white backdrop-blur-md">
      <div className="wrap flex h-16 items-center gap-4">
        <a href="#top" className="flex min-h-11 items-center rounded-md" aria-label="Kalvio Build, back to top">
          <Logo tone="light" />
        </a>
        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center rounded-btn px-3 text-[15px] font-semibold text-white/80 hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={waLink(SITE.whatsapp, HELLO)}
          target="_blank"
          rel="noopener"
          className="btn btn-wa ml-auto hidden min-h-11 sm:inline-flex lg:ml-2"
        >
          <WhatsAppIcon size={18} /> WhatsApp us
        </a>
        <button
          type="button"
          className="-mr-2 ml-auto grid size-11 place-items-center rounded-btn sm:ml-1 lg:hidden"
          aria-expanded={open}
          aria-controls={id}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <div id={id} hidden={!open} className="border-t border-white/10 bg-[#14121f] lg:hidden">
        <nav aria-label="Main" className="wrap py-2">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-white/10 text-lg font-semibold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={waLink(SITE.whatsapp, HELLO)} target="_blank" rel="noopener" className="btn btn-wa my-4 w-full">
            <WhatsAppIcon size={18} /> WhatsApp us
          </a>
        </nav>
      </div>
    </header>
  )
}
