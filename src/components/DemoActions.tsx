import { X } from 'lucide-react'
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { messageHref, useMessaging } from '../lib/messaging'
import { HintContext, useActionHint, useYesLink, type ActionKind } from '../lib/actions'
import { useDemo } from '../lib/demo'
import { WhatsAppIcon } from './Icon'

const HINTS: Record<ActionKind, string> = {
  call: 'On your website, this button calls {name} directly.',
  whatsapp: 'On your website, this opens a {channel} chat with {name}.',
  book: 'On your website, bookings arrive on {name}’s {channel} with the customer’s details filled in.',
}

/**
 * Generic demos have no real number, so Call / WhatsApp / Book explain what they would do
 * instead of dialling a stranger. Personalised links with ?phone= go straight through.
 */
export function DemoActionsProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [kind, setKind] = useState<ActionKind>('call')
  const { name } = useDemo()
  const { sms } = useMessaging()
  const yes = useYesLink()
  const open = useCallback((k: ActionKind) => {
    setKind(k)
    ref.current?.showModal()
  }, [])

  return (
    <HintContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="hint-title"
        className="m-auto w-[min(92vw,420px)] rounded-card bg-surface p-0 text-ink shadow-float backdrop:bg-black/50"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
      >
        <div className="relative p-6">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute top-2 right-2 grid size-11 place-items-center rounded-full text-muted hover:bg-surface-alt"
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <p className="eyebrow mb-2">Sample button</p>
          <h2 id="hint-title" className="pr-8 font-display text-xl leading-snug">
            {HINTS[kind].replace('{name}', name).replace('{channel}', sms ? 'text message' : 'WhatsApp')}
          </h2>
          <p className="mt-2 text-muted">This sample doesn’t have your phone number yet. Say yes and we’ll connect it.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a className="btn btn-wa" href={yes} target="_blank" rel="noopener">
              <WhatsAppIcon size={20} /> Make this my website
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => ref.current?.close()}>
              Keep looking
            </button>
          </div>
        </div>
      </dialog>
    </HintContext.Provider>
  )
}

interface ActionProps {
  kind: 'call' | 'whatsapp'
  className?: string
  children: ReactNode
  /** Prefilled message (WhatsApp in India, SMS in the US). */
  text?: string
  label?: string
}

/** A tel:/wa.me link when the shop's number is known, otherwise a button that explains. */
export function ActionLink({ kind, className, children, text, label }: ActionProps) {
  const { phone, name } = useDemo()
  const { sms } = useMessaging()
  const hint = useActionHint()
  const href = useMemo(() => {
    if (!phone) return null
    return kind === 'call' ? `tel:${phone.e164}` : messageHref(sms, phone.digits, text ?? `Hi ${name}, I found your website and would like to know more.`)
  }, [phone, kind, text, name, sms])

  if (href) {
    return (
      <a href={href} className={className} aria-label={label} {...(kind === 'whatsapp' && !sms ? { target: '_blank', rel: 'noopener' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={className} aria-label={label} onClick={() => hint(kind)}>
      {children}
    </button>
  )
}
