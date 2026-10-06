import { ActionLink } from '../components/DemoActions'
import { Monogram } from '../components/Monogram'
import { useDemo } from '../lib/demo'
import { useMessaging } from '../lib/messaging'

export function Footer() {
  const d = useDemo()
  const m = useMessaging()
  return (
    <footer className="border-t border-line bg-bg pb-24 lg:pb-0">
      <div className="wrap grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Monogram text={d.monogram} size="sm" />
            <p data-p="name" className="font-display text-xl text-ink">
              {d.name}
            </p>
          </div>
          <p className="mt-3 text-muted">
            {d.preset.label} in <span data-p="area">{d.area}</span>, <span data-p="city">{d.city}</span>
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-ink">Visit</h2>
          <address className="mt-2 leading-relaxed text-muted not-italic">
            {d.street && (
              <span data-p="street">
                {d.street}
                <br />
              </span>
            )}
            <span data-p="area">{d.area}</span>, <span data-p="city">{d.city}</span>
          </address>
          <p className="mt-2 text-muted">
            {d.preset.timings[0].days}: {d.preset.timings[0].hours}
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-ink">Contact</h2>
          <ul className="mt-1">
            <li>
              <ActionLink kind="call" className="inline-flex min-h-11 items-center font-semibold text-accent-ink tabular-nums underline-offset-4 hover:underline">
                <span data-p="phone">{d.phoneDisplay}</span>
              </ActionLink>
            </li>
            <li>
              <ActionLink kind="whatsapp" className="inline-flex min-h-11 items-center font-semibold text-accent-ink underline-offset-4 hover:underline">
                {m.sms ? 'Text us' : 'WhatsApp us'}
              </ActionLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col py-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <span data-p="name">{d.name}</span>
          </p>
          <p>
            Sample website by{' '}
            <a href="/" className="inline-block py-3 font-semibold text-ink underline underline-offset-4">
              Kalvio Build
            </a>{' '}
            ·{' '}
            <a href="/stock/CREDITS.md" className="inline-block py-3 underline underline-offset-4">
              Photo credits
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
