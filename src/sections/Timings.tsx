import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { useState } from 'react'
import { ActionLink } from '../components/DemoActions'
import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'
import { useDemo } from '../lib/demo'

type Props = Extract<SectionConfig, { kind: 'timings' }> & { tone: Tone }

/** Timings, address and a click-to-load Google Map (no API key, nothing heavy until asked for). */
export function Timings({ id, title, tone }: Props) {
  const d = useDemo()
  const [showMap, setShowMap] = useState(false)
  return (
    <Section id={id} tone={tone} title={title}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-6 sm:p-8" data-reveal>
          <h3 className="flex items-center gap-2 font-display text-xl text-ink">
            <Clock size={20} aria-hidden="true" className="text-accent-ink" /> Timings
          </h3>
          <dl className="mt-3 divide-y divide-line">
            {d.preset.timings.map((tm) => (
              <div key={tm.days} className="flex justify-between gap-4 py-3">
                <dt className="font-semibold whitespace-nowrap text-ink">{tm.days}</dt>
                <dd className="text-right text-muted">{tm.hours}</dd>
              </div>
            ))}
          </dl>
          {d.preset.timingsNote && <p className="mt-3 rounded-card bg-surface-alt p-3.5 text-sm text-ink">{d.preset.timingsNote}</p>}

          <h3 className="mt-8 flex items-center gap-2 font-display text-xl text-ink">
            <MapPin size={20} aria-hidden="true" className="text-accent-ink" /> Address
          </h3>
          <address className="mt-2 leading-relaxed text-muted not-italic">
            <span data-p="name" className="font-semibold text-ink">
              {d.name}
            </span>
            <br />
            {d.street && (
              <span data-p="street">
                {d.street}
                <br />
              </span>
            )}
            <span data-p="area">{d.area}</span>, <span data-p="city">{d.city}</span>
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={d.directionsUrl} data-p-href="directions" target="_blank" rel="noopener" className="btn btn-primary">
              <Navigation size={18} aria-hidden="true" /> Get directions
            </a>
            <ActionLink kind="call" className="btn btn-ghost tabular-nums">
              <Phone size={18} aria-hidden="true" /> <span data-p="phone">{d.phoneDisplay}</span>
            </ActionLink>
          </div>
        </div>

        <div className="map-placeholder relative min-h-80 overflow-hidden rounded-card shadow-card" data-reveal>
          {showMap ? (
            <iframe
              src={d.mapEmbedUrl}
              title={`Map showing ${d.name}, ${d.area}`}
              className="absolute inset-0 size-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <button type="button" onClick={() => setShowMap(true)} className="absolute inset-0 grid size-full place-items-center p-6">
              <span className="flex flex-col items-center gap-3 rounded-card bg-surface/95 px-6 py-5 text-center shadow-card">
                <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent">
                  <MapPin size={22} aria-hidden="true" />
                </span>
                <span className="font-semibold text-ink">Show on Google Maps</span>
                <span className="text-sm text-muted">
                  <span data-p="area">{d.area}</span>, <span data-p="city">{d.city}</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </Section>
  )
}
