import { Check, Copy, Download, ExternalLink, Image as ImageIcon, Loader2, Share2, Video } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { WhatsAppIcon } from '../components/Icon'
import { SITE } from '../config/site'
import { CATALOG, CATALOG_GROUPS } from '../data/catalog'
import { isBusinessKey, loadPreset } from '../data/businesses'
import type { BusinessKey } from '../data/types'
import { cleanParam, PARAM_LIMITS } from '../lib/personalise'
import { parsePhone } from '../lib/phone'
import { ogKey } from '../lib/sharekit'
import { loadFonts, loadImage, makeLinkPreview, makePicture, makeVideo, type Shot } from '../share/compose'
import { THEMES, THEME_KEYS, resolveThemeKey, themeToCss } from '../themes'
import { kalvio } from '../themes/kalvio'

/** The share Worker; VITE_SHARE_API points local development at `wrangler dev`. */
const API = (import.meta.env.VITE_SHARE_API as string | undefined) ?? SITE.shareApi
const CODE_KEY = 'kb-leadfinder-code'
const readCode = () => {
  try {
    return localStorage.getItem(CODE_KEY) ?? ''
  } catch {
    return ''
  }
}

type Status = 'idle' | 'working' | 'ready' | 'error'
interface Kit {
  link: string
  shop: { name: string; place: string }
  picture: { blob: Blob; url: string }
  shot: Shot
  previewReady: boolean
}

const ERRORS: Record<string, string> = {
  bad_code: 'That Lead Finder code didn’t work. Check it and try again.',
  busy: 'Today’s free picture limit is used up. It resets at 5:30 AM. You can still send the link.',
  render_failed: 'Couldn’t open the sample to take its picture. Try again in a minute.',
  no_video_encoder: 'This browser can’t make videos. Use Chrome on Android or Safari on iPhone.',
  network: 'No internet connection, or the share service didn’t answer. Try again.',
}

function Field({ label, children, hint }: { label: string; children: (id: string) => ReactNode; hint?: string }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children(id)}
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  )
}

async function share(file: File, text: string): Promise<'shared' | 'downloaded'> {
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text })
      return 'shared'
    } catch (e) {
      if ((e as Error).name === 'AbortError') return 'shared'
    }
  }
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = file.name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 10_000)
  return 'downloaded'
}

/**
 * Shreya's WhatsApp kit (not linked from the site, noindex). For one shop it makes:
 * a picture of their website on an iPhone (send first, nothing to click), a 10-second video,
 * a link-preview image with their name, and the messages to send.
 */
export default function Share() {
  const [sp] = useSearchParams()
  const [key, setKey] = useState<BusinessKey | ''>(() => (isBusinessKey(sp.get('key') ?? undefined) ? (sp.get('key') as BusinessKey) : ''))
  const [name, setName] = useState(sp.get('name') ?? '')
  const [area, setArea] = useState(sp.get('area') ?? '')
  const [city, setCity] = useState(sp.get('city') ?? SITE.city)
  const [phone, setPhone] = useState(sp.get('phone') ?? '')
  const [theme, setTheme] = useState(resolveThemeKey(sp.get('theme')) ?? '')
  const [lang, setLang] = useState(sp.get('lang') === 'kn' || sp.get('lang') === 'hi' ? (sp.get('lang') as string) : 'en')
  const [code, setCode] = useState(readCode)
  const [status, setStatus] = useState<Status>('idle')
  const [step, setStep] = useState('')
  const [error, setError] = useState('')
  const [kit, setKit] = useState<Kit | null>(null)
  const [video, setVideo] = useState<{ blob: Blob; url: string } | null>(null)
  const [videoProgress, setVideoProgress] = useState<number | null>(null)
  const [copied, setCopied] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'WhatsApp kit | Kalvio Build'
  }, [])

  const region = CATALOG.find((c) => c.key === key)?.region ?? 'IN'

  const messages = useMemo(() => {
    if (!kit) return null
    return {
      first: `Namaste! This is Kalvio Build. Here is a free sample website we made for ${kit.shop.name}. Shall I send you the link to see it on your phone? No payment needed.`,
      second: `Here is your sample: ${kit.link}\nIt opens straight away. No login, no payment. Reply YES if you'd like it live in a week.`,
    }
  }, [kit])

  async function makeKit(e: FormEvent) {
    e.preventDefault()
    if (!key) return
    setError('')
    setKit(null)
    setVideo(null)
    setStatus('working')
    try {
      const preset = await loadPreset(key)
      const shopName = cleanParam(name, PARAM_LIMITS.name)
      const shopArea = cleanParam(area, PARAM_LIMITS.area)
      const shopCity = cleanParam(city, PARAM_LIMITS.city)
      const phoneParsed = parsePhone(phone, preset.region)
      const q = new URLSearchParams({ name: shopName })
      if (shopArea) q.set('area', shopArea)
      if (shopCity) q.set('city', shopCity)
      if (phoneParsed) q.set('phone', phoneParsed.e164)
      if (theme) q.set('theme', theme)
      if (lang !== 'en') q.set('lang', lang)
      const path = `/demo/${key}?${q}`
      const link = `${window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? 'https://kalvio-build.pages.dev' : window.location.origin}${path}`

      setStep('Opening the sample in a browser (about 10 seconds)…')
      let res: Response
      try {
        res = await fetch(`${API}/api/prepare`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ code: code.trim(), path }),
        })
      } catch {
        throw new Error('network')
      }
      const data = await res.json().catch(() => ({ error: 'network' }))
      if (!res.ok) throw new Error(data.error ?? 'network')
      try {
        localStorage.setItem(CODE_KEY, code.trim())
      } catch {
        /* private mode */
      }

      setStep('Making the picture…')
      await loadFonts()
      const [tall, bar] = await Promise.all([
        loadImage(API + data.tall),
        data.bar ? loadImage(API + data.bar) : Promise.resolve(null),
      ])
      const shot: Shot = {
        tall,
        bar,
        colours: { top: data.top, topDark: data.topDark, bottom: data.bottom, bottomDark: data.bottomDark },
        height: data.height,
        barHeight: data.barHeight,
      }
      const effArea = shopArea || preset.demo.area
      const effCity = shopCity || preset.demo.city
      const shop = { name: shopName, place: [effArea, effCity].filter(Boolean).join(', ') }
      const pictureBlob = await makePicture(shot, shop)

      setStep('Adding their name to the link preview…')
      const effTheme = resolveThemeKey(theme) ?? preset.defaultTheme
      const oh = await ogKey({ key, theme: effTheme, name: shopName, area: effArea, city: effCity })
      const og = await makeLinkPreview(shot, shop)
      const put = await fetch(`${API}/og/${key}/${oh}.jpg`, { method: 'PUT', headers: { 'x-code': code.trim() }, body: og }).catch(
        () => null,
      )

      setKit({ link, shop, shot, picture: { blob: pictureBlob, url: URL.createObjectURL(pictureBlob) }, previewReady: !!put?.ok })
      setStatus('ready')
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } catch (err) {
      setError(ERRORS[(err as Error).message] ?? ERRORS.network)
      setStatus('error')
    } finally {
      setStep('')
    }
  }

  async function buildVideo() {
    if (!kit) return
    setVideoProgress(0)
    setError('')
    try {
      const blob = await makeVideo(kit.shot, kit.shop, setVideoProgress)
      setVideo({ blob, url: URL.createObjectURL(blob) })
    } catch (err) {
      setError(ERRORS[(err as Error).message] ?? 'Couldn’t make the video on this phone.')
    } finally {
      setVideoProgress(null)
    }
  }

  async function copy(text: string, what: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(''), 2000)
    } catch {
      /* clipboard blocked: the text is visible to copy by hand */
    }
  }

  const slug = (kit?.shop.name ?? 'sample').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  const shopPhone = parsePhone(phone, region)

  return (
    <div data-theme="kalvio" className="min-h-svh bg-bg font-body text-ink">
      <style href="theme-kalvio" precedence="theme">
        {themeToCss(kalvio)}
      </style>
      <header className="bg-[#14121f] text-white">
        <div className="wrap flex h-16 items-center justify-between">
          <a href="/" className="font-display text-xl">
            Kalvio Build
          </a>
          <span className="text-sm text-white/70">WhatsApp kit</span>
        </div>
      </header>
      <main className="wrap max-w-2xl py-8">
        <h1 className="h2 text-ink">Make a WhatsApp kit for a shop</h1>
        <p className="mt-2 text-muted">A picture of their website to send first, a short video, and the link with their name in the preview.</p>

        <form onSubmit={makeKit} className="card mt-6 grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
          <div className="sm:col-span-2">
            <Field label="Type of business">
              {(id) => (
                <select id={id} className="field" required value={key} onChange={(e) => setKey(e.target.value as BusinessKey)}>
                  <option value="" disabled>
                    Choose
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
              )}
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Shop name">
              {(id) => <input id={id} className="field" required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />}
            </Field>
          </div>
          <Field label="Area">{(id) => <input id={id} className="field" maxLength={60} value={area} onChange={(e) => setArea(e.target.value)} />}</Field>
          <Field label="City">{(id) => <input id={id} className="field" maxLength={40} value={city} onChange={(e) => setCity(e.target.value)} />}</Field>
          <Field label="Shop phone" hint="Makes the Call and WhatsApp buttons work.">
            {(id) => <input id={id} className="field" type="tel" inputMode="tel" maxLength={16} value={phone} onChange={(e) => setPhone(e.target.value)} />}
          </Field>
          <Field label="Language">
            {(id) => (
              <select id={id} className="field" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">English</option>
                <option value="kn">Kannada headline and buttons</option>
                <option value="hi">Hindi headline and buttons</option>
              </select>
            )}
          </Field>
          <div className="sm:col-span-2">
            <Field label="Look">
              {(id) => (
                <select id={id} className="field" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="">Best for this business</option>
                  {THEME_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {THEMES[k].label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Your Lead Finder code" hint="Asked once on this phone. It keeps strangers from using up the free daily pictures.">
              {(id) => (
                <input id={id} className="field" type="password" autoComplete="current-password" required value={code} onChange={(e) => setCode(e.target.value)} />
              )}
            </Field>
          </div>
          <button type="submit" disabled={status === 'working'} className="btn btn-primary min-h-13 text-lg sm:col-span-2">
            {status === 'working' ? <Loader2 size={20} aria-hidden="true" className="animate-spin" /> : <ImageIcon size={20} aria-hidden="true" />}
            {status === 'working' ? 'Making the kit…' : 'Make WhatsApp kit'}
          </button>
          <p role="status" className="text-sm text-muted sm:col-span-2">
            {step}
          </p>
          {error && (
            <p role="alert" className="rounded-card bg-[#fde8e6] p-3 text-sm font-semibold text-[#8a1c12] sm:col-span-2">
              {error}
            </p>
          )}
        </form>

        {kit && messages && (
          <div ref={resultRef} className="mt-8 grid gap-6">
            <section className="card p-5 sm:p-7" aria-labelledby="step1">
              <h2 id="step1" className="font-display text-xl text-ink">
                1. Send the picture first
              </h2>
              <p className="mt-1 text-muted">Nothing to click, so it doesn’t look like spam. Ask if you can send the link.</p>
              <img src={kit.picture.url} alt={`Picture of the sample website for ${kit.shop.name}`} className="mt-4 w-full rounded-card" width={1080} height={1350} />
              <p className="mt-4 rounded-card bg-surface-alt p-3 text-[15px] leading-relaxed">{messages.first}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="btn btn-wa"
                  onClick={() => share(new File([kit.picture.blob], `${slug}-website.jpg`, { type: 'image/jpeg' }), messages.first)}
                >
                  <Share2 size={18} aria-hidden="true" /> Send picture
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => copy(messages.first, 'first')}>
                  {copied === 'first' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />} Copy message
                </button>
              </div>
            </section>

            <section className="card p-5 sm:p-7" aria-labelledby="step2">
              <h2 id="step2" className="font-display text-xl text-ink">
                2. Optional: send a 10-second video
              </h2>
              {video ? (
                <>
                  <video src={video.url} poster={kit.picture.url} controls playsInline muted className="mt-4 w-full rounded-card bg-black" />
                  <button
                    type="button"
                    className="btn btn-wa mt-4 w-full"
                    onClick={() => share(new File([video.blob], `${slug}-website.mp4`, { type: 'video/mp4' }), messages.first)}
                  >
                    <Share2 size={18} aria-hidden="true" /> Send video
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-ghost mt-4 w-full" disabled={videoProgress !== null} onClick={buildVideo}>
                  {videoProgress !== null ? (
                    <>
                      <Loader2 size={18} aria-hidden="true" className="animate-spin" /> Making video… {Math.round(videoProgress * 100)}%
                    </>
                  ) : (
                    <>
                      <Video size={18} aria-hidden="true" /> Make video
                    </>
                  )}
                </button>
              )}
            </section>

            <section className="card p-5 sm:p-7" aria-labelledby="step3">
              <h2 id="step3" className="font-display text-xl text-ink">
                3. After they reply, send the link
              </h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                {kit.previewReady ? (
                  <>
                    <Check size={16} aria-hidden="true" className="text-accent-ink" /> The link preview will show “{kit.shop.name}”.
                  </>
                ) : (
                  'The link preview will show the general picture for this business.'
                )}
              </p>
              <p className="mt-4 rounded-card bg-surface-alt p-3 text-[15px] leading-relaxed break-words whitespace-pre-line">{messages.second}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {shopPhone ? (
                  <a className="btn btn-wa" href={`https://wa.me/${shopPhone.digits}?text=${encodeURIComponent(messages.second)}`} target="_blank" rel="noopener">
                    <WhatsAppIcon size={18} /> Open their chat
                  </a>
                ) : null}
                <button type="button" className="btn btn-ghost" onClick={() => copy(messages.second, 'second')}>
                  {copied === 'second' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />} Copy message
                </button>
                <a className="btn btn-ghost" href={kit.link} target="_blank" rel="noopener">
                  <ExternalLink size={18} aria-hidden="true" /> Open sample
                </a>
                <a className="btn btn-ghost" href={kit.picture.url} download={`${slug}-website.jpg`}>
                  <Download size={18} aria-hidden="true" /> Save picture
                </a>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
