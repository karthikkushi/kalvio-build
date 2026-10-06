import { Phone } from 'lucide-react'
import { useId, type FormEvent } from 'react'
import { ActionLink } from '../components/DemoActions'
import { useActionHint } from '../lib/actions'
import { WhatsAppIcon } from '../components/Icon'
import { Section, type Tone } from '../components/Section'
import { waLink } from '../config/site'
import type { Field, SectionConfig } from '../data/types'
import { t } from '../i18n/strings'
import { useDemo } from '../lib/demo'

type Props = Extract<SectionConfig, { kind: 'booking' }> & { tone: Tone }

function Input({ f, id }: { f: Field; id: string }) {
  const common = { id, name: f.name, required: f.required, className: 'field' }
  switch (f.type) {
    case 'select':
      return (
        <select {...common} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {f.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )
    case 'textarea':
      return <textarea {...common} rows={3} maxLength={500} placeholder={f.placeholder} />
    case 'tel':
      return <input {...common} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} placeholder={f.placeholder} />
    case 'date':
      return <input {...common} type="date" min={new Date().toISOString().slice(0, 10)} />
    default:
      return (
        <input
          {...common}
          type={f.type}
          maxLength={80}
          autoComplete={f.name === 'name' ? 'name' : f.type === 'email' ? 'email' : undefined}
          placeholder={f.placeholder}
        />
      )
  }
}

/** Booking goes to the shop's WhatsApp with the details filled in. No data is stored by the site. */
export function Booking({ id, title, intro, fields, submit, tone }: Props) {
  const d = useDemo()
  const hint = useActionHint()
  const uid = useId()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!d.phone) return hint('book')
    const data = new FormData(e.currentTarget)
    const lines = fields
      .map((f) => [f.label, String(data.get(f.name) ?? '').trim()] as const)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
    window.open(waLink(d.phone.digits, `Hi ${d.name}, I'd like to book.\n${lines.join('\n')}`), '_blank', 'noopener')
  }

  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
        <form onSubmit={onSubmit} className="card grid gap-4 p-5 sm:grid-cols-2 sm:p-8" data-reveal>
          {fields.map((f, i) => (
            <div key={f.name} className={f.type === 'textarea' || (i === 0 && fields.length % 2 === 1) ? 'sm:col-span-2' : ''}>
              <label htmlFor={`${uid}-${f.name}`} className="mb-1.5 block text-sm font-semibold text-ink">
                {f.label}
                {f.required && (
                  <>
                    <span aria-hidden="true" className="text-accent-ink">
                      {' '}
                      *
                    </span>
                    <span className="sr-only"> (required)</span>
                  </>
                )}
              </label>
              <Input f={f} id={`${uid}-${f.name}`} />
            </div>
          ))}
          <button type="submit" className="btn btn-primary mt-2 sm:col-span-2">
            <WhatsAppIcon size={19} /> {t(submit, d.lang)}
          </button>
          <p className="text-sm text-muted sm:col-span-2">Opens WhatsApp with your details filled in. Nothing is stored on this website.</p>
        </form>
        <aside className="self-start rounded-card bg-surface-alt p-6 sm:p-8" data-reveal>
          <h3 className="font-display text-xl text-ink">Prefer to talk?</h3>
          <p className="mt-2 text-muted">Call or message and we’ll find a time that suits you.</p>
          <div className="mt-5 grid gap-3">
            <ActionLink kind="call" className="btn btn-ghost justify-start tabular-nums">
              <Phone size={18} aria-hidden="true" /> <span data-p="phone">{d.phoneDisplay}</span>
            </ActionLink>
            <ActionLink kind="whatsapp" className="btn btn-wa justify-start">
              <WhatsAppIcon size={18} /> Message on WhatsApp
            </ActionLink>
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            {d.preset.timings.map((tm) => (
              <div key={tm.days} className="flex justify-between gap-4">
                <dt className="font-semibold whitespace-nowrap text-ink">{tm.days}</dt>
                <dd className="text-right text-muted">{tm.hours}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
