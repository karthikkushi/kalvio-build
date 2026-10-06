import { ActionLink } from '../components/DemoActions'
import { Icon, WhatsAppIcon } from '../components/Icon'
import type { SectionConfig } from '../data/types'

type Props = Extract<SectionConfig, { kind: 'callout' }>

/** A strong strip for one urgent action, e.g. "Pet emergency? Call now." Sits outside the tone rhythm. */
export function Callout({ id, title, text, action, label, icon }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-bg py-4 sm:py-6">
      <div className="wrap">
        <div className="flex flex-col gap-4 rounded-card bg-accent p-5 text-on-accent sm:p-7 lg:flex-row lg:items-center lg:gap-8" data-reveal>
          <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-on-accent text-accent sm:grid">
            <Icon name={icon} size={26} />
          </span>
          <div className="flex-1">
            <h2 id={`${id}-title`} className="font-display text-2xl leading-tight">
              {title}
            </h2>
            <p className="mt-1 text-[17px] leading-snug">{text}</p>
          </div>
          <ActionLink kind={action} className="btn shrink-0 bg-on-accent text-accent">
            {action === 'whatsapp' ? <WhatsAppIcon size={18} /> : <Icon name="phone" size={18} />} {label}
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
