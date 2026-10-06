import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { WhatsAppIcon } from '../components/Icon'
import { SITE, waLink } from '../config/site'
import { CATALOG, CATALOG_GROUPS } from '../data/catalog'
import type { BusinessKey } from '../data/types'
import { sendEnquiry } from '../lib/enquiry'

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
      {optional && <span className="font-normal text-muted"> (optional)</span>}
    </label>
  )
}

function BusinessSelect({ id, value, onChange }: { id: string; value: string; onChange: (v: BusinessKey) => void }) {
  return (
    <select id={id} className="field" value={value} required onChange={(e) => onChange(e.target.value as BusinessKey)}>
      <option value="" disabled>
        Choose your business
      </option>
      {CATALOG_GROUPS.map((g) => (
        <optgroup key={g} label={g}>
          {CATALOG.filter((c) => c.group === g).map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}

/** Two ways in: build your own sample right now, or leave your number and we make one for you. */
export function MakeSample() {
  const uid = useId()
  const navigate = useNavigate()
  const [biz, setBiz] = useState<BusinessKey | ''>('')
  const [shop, setShop] = useState('')
  const [area, setArea] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'whatsapp' | 'bad_phone'>('idle')

  function showSample(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    for (const k of ['name', 'area', 'city', 'phone'] as const) {
      const v = String(data.get(k) ?? '').trim()
      if (v) params.set(k, v)
    }
    navigate(`/demo/${biz}?${params}`)
    window.scrollTo(0, 0)
  }

  async function requestCall(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('person') ?? '').trim()
    const phone = String(data.get('mobile') ?? '').trim()
    const label = CATALOG.find((c) => c.key === biz)?.label
    setStatus('sending')
    const res = await sendEnquiry({
      name,
      phone,
      shop: shop || undefined,
      category: biz || undefined,
      area: area || undefined,
      city: SITE.city,
      message: String(data.get('note') ?? '').trim() || undefined,
      website: String(data.get('website') ?? ''),
    })
    if (res.ok) return setStatus('sent')
    if (res.reason === 'invalid_phone') return setStatus('bad_phone')
    // Couldn't save it: hand over to WhatsApp so the enquiry still reaches us.
    const text = [`Hi Kalvio Build, I’m ${name}.`, shop && `Shop: ${shop}${label ? ` (${label})` : ''}`, area && `Area: ${area}`, `Please send me a free sample.`]
      .filter(Boolean)
      .join('\n')
    window.open(waLink(SITE.whatsapp, text), '_blank', 'noopener')
    setStatus('whatsapp')
  }

  return (
    <section id="make" aria-labelledby="make-title" className="section bg-bg">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">Free sample</p>
          <h2 id="make-title" className="h2 mt-3 text-ink">
            Make your sample now. It takes a minute.
          </h2>
          <p className="mt-3 text-lg text-muted">Choose your business and type your shop’s name. You’ll see your own website straight away.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
          <form onSubmit={showSample} className="card grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
            <h3 className="font-display text-2xl text-ink sm:col-span-2">1. See it yourself</h3>
            <div className="sm:col-span-2">
              <Label htmlFor={`${uid}-biz`}>Type of business</Label>
              <BusinessSelect id={`${uid}-biz`} value={biz} onChange={setBiz} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`${uid}-name`}>Shop name</Label>
              <input id={`${uid}-name`} name="name" className="field" required maxLength={80} placeholder="e.g. Avinashi Dental Clinic" value={shop} onChange={(e) => setShop(e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`${uid}-area`} optional>
                Area
              </Label>
              <input id={`${uid}-area`} name="area" className="field" maxLength={60} placeholder="e.g. Jayanagar" value={area} onChange={(e) => setArea(e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`${uid}-city`} optional>
                City
              </Label>
              <input id={`${uid}-city`} name="city" className="field" maxLength={40} defaultValue={SITE.city} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`${uid}-phone`} optional>
                Shop phone number
              </Label>
              <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" className="field" maxLength={16} placeholder="For the Call button" />
            </div>
            <button type="submit" className="btn btn-primary mt-2 min-h-13 text-lg sm:col-span-2">
              Show my website <ArrowRight size={20} aria-hidden="true" />
            </button>
            <p className="text-sm text-muted sm:col-span-2">Nothing is saved. The sample opens on this screen.</p>
          </form>

          <div className="rounded-card bg-[#14121f] p-5 text-white sm:p-8">
            <h3 className="font-display text-2xl">2. Or let us make it for you</h3>
            {status === 'sent' ? (
              <div role="status" className="mt-6 rounded-card bg-white/10 p-5">
                <p className="flex items-center gap-2 text-lg font-semibold">
                  <Check size={22} aria-hidden="true" className="text-[#c9c3ff]" strokeWidth={3} /> Got it, thank you!
                </p>
                <p className="mt-2 text-white/80">We’ll send your free sample on WhatsApp soon. You can also message us any time.</p>
                <a href={waLink(SITE.whatsapp, 'Hi Kalvio Build, I just asked for a free sample on your website.')} target="_blank" rel="noopener" className="btn btn-wa mt-5">
                  <WhatsAppIcon size={18} /> Message us now
                </a>
              </div>
            ) : (
              <form onSubmit={requestCall} className="mt-5 grid gap-4">
                <p className="text-white/80">Leave your name and WhatsApp number. We’ll make the sample with your photos and send it to you.</p>
                <div>
                  <label htmlFor={`${uid}-person`} className="mb-1.5 block text-sm font-semibold">
                    Your name
                  </label>
                  <input id={`${uid}-person`} name="person" className="field" required minLength={2} maxLength={80} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor={`${uid}-mobile`} className="mb-1.5 block text-sm font-semibold">
                    WhatsApp number
                  </label>
                  <input
                    id={`${uid}-mobile`}
                    name="mobile"
                    className="field"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={16}
                    aria-invalid={status === 'bad_phone'}
                    aria-describedby={status === 'bad_phone' ? `${uid}-phone-err` : undefined}
                  />
                  {status === 'bad_phone' && (
                    <p id={`${uid}-phone-err`} className="mt-1.5 text-sm font-semibold text-[#ffb4a8]">
                      Please check the number: 10 digits, like 98450 12345.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-note`} className="mb-1.5 block text-sm font-semibold">
                    Anything we should know? <span className="font-normal text-white/70">(optional)</span>
                  </label>
                  <textarea id={`${uid}-note`} name="note" className="field" rows={2} maxLength={500} />
                </div>
                {/* Honeypot for bots. Hidden from people and screen readers. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
                  <label htmlFor={`${uid}-website`}>Website</label>
                  <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <button type="submit" disabled={status === 'sending'} className="btn min-h-13 bg-[#c9c3ff] text-lg text-[#14121f] hover:bg-white disabled:opacity-70">
                  {status === 'sending' ? <Loader2 size={20} aria-hidden="true" className="animate-spin" /> : null}
                  Send me a sample
                </button>
                <p className="text-sm text-white/70" role={status === 'whatsapp' ? 'status' : undefined}>
                  {status === 'whatsapp'
                    ? 'We opened WhatsApp so your message reaches us. Just press send.'
                    : 'We use your number only to send your sample. Shop details from step 1 are included.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
