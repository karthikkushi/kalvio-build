import { Tag } from 'lucide-react'
import { ActionLink } from '../components/DemoActions'
import { MessageIcon } from '../components/MessageIcon'
import { useDemo } from '../lib/demo'
import { useMessaging } from '../lib/messaging'

/** Seasonal offer (Dasara, Diwali, wedding season...). Renders nothing outside a season. */
export function OfferBanner({ id }: { id: string }) {
  const { offer, name } = useDemo()
  const m = useMessaging()
  if (!offer) return null
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-bg py-4 sm:py-6">
      <div className="wrap">
        <div className="flex flex-col gap-4 rounded-card bg-highlight p-5 text-on-highlight sm:p-7 lg:flex-row lg:items-center lg:gap-8" data-reveal>
          <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-on-highlight text-highlight sm:grid">
            <Tag size={24} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 id={`${id}-title`} className="font-display text-2xl leading-tight">
              {offer.title}
            </h2>
            <p className="mt-1 text-[17px] leading-snug">{offer.text}</p>
          </div>
          <ActionLink kind="whatsapp" text={`Hi ${name}, I'd like the ${offer.title} offer.`} className="btn shrink-0 bg-on-highlight text-highlight">
            <MessageIcon size={18} /> {m.sms ? 'Claim by text' : 'Claim on WhatsApp'}
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
