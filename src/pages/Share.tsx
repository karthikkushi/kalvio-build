import { Check, Copy, Download, ExternalLink, Image as ImageIcon, Loader2, RefreshCw, Share2, Video } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { WhatsAppIcon } from '../components/Icon'
import { SITE, waLink } from '../config/site'
import { CATALOG, CATALOG_GROUPS } from '../data/catalog'
import { isBusinessKey, loadPreset } from '../data/businesses'
import type { BusinessKey } from '../data/types'
import { guessArea } from '../lib/area'
import { cleanParam, PARAM_LIMITS } from '../lib/personalise'
import { parsePhone } from '../lib/phone'
import { ogKey } from '../lib/sharekit'
import { loadFonts, loadImage, makeLinkPreview, makePicture, makeVideo, type Shot, type ShopText } from '../share/compose'
import { kitMessages, type KitMessages } from '../share/messages'
import { THEMES, THEME_KEYS, resolveThemeKey, themeToCss } from '../themes'
import { kalvio } from '../themes/kalvio'

/** The share Worker; VITE_SHARE_API points local development at `wrangler dev`. */
const API = (import.meta.env.VITE_SHARE_API as string | undefined) ?? SITE.shareApi
const CODE_KEY = 'kb-leadfinder-code'

function storeCode(code: string) {
  try {
    localStorage.setItem(CODE_KEY, code)
  } catch {
    /* private mode */
  }
}

/** Lead Finder's Send sample button opens this page with `#code=…` (a hash is never sent to a server). */
function initialCode(): string {
  if (typeof window === 'undefined') return ''
  const fromLink = new URLSearchParams(window.location.hash.slice(1)).get('code')
  if (fromLink) {
    storeCode(fromLink)
    history.replaceState(null, '', window.location.pathname + window.location.search)
    return fromLink
  }
  try {
    return localStorage.getItem(CODE_KEY) ?? ''
  } catch {
    return ''
  }
}

type Status = 'idle' | 'working' | 'ready' | 'error'
interface Target {
  link: string
  shop: ShopText
  /** The shop's WhatsApp number, digits only, when known. */
  digits: string | null
}
interface Pics {
  picture: { blob: Blob; url: string }
  shot: Shot
  previewReady: boolean
}

const ERRORS: Record<string, string> = {
  bad_code: 'That Lead Finder code didn’t work. Open “Change details” and check it.',
  busy: 'Today’s free picture limit is used up. It resets at 5:30 AM. You can still send the link and the messages.',
  render_failed: 'Couldn’t open the sample to take its picture. Tap Make again in a minute.',
  no_video_encoder: 'This browser can’t make videos. Use Chrome on Android or Safari on iPhone.',
  network: 'No internet connection, or the share service didn’t answer. Tap Make again.',
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

async function share(file: File): Promise<void> {
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] })
      return
    } catch (e) {
      if ((e as Error).name === 'AbortError') return
    }
  }
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = file.name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 10_000)
}

/**
 * Shreya's WhatsApp kit (not linked from the site, noindex). Lead Finder's Send sample button opens it for one
 * shop; it then makes, without any typing: the sample link and the two messages, a picture of their website on
 * an iPhone, a 10-second video, and the link-preview image with their name.
 */
export default function Share() {
  const [sp] = useSearchParams()
  const [key, setKey] = useState<BusinessKey | ''>(() => (isBusinessKey(sp.get('key') ?? undefined) ? (sp.get('key') as BusinessKey) : ''))
  const [name, setName] = useState(sp.get('name') ?? '')
  const [city, setCity] = useState(sp.get('city') ?? SITE.city)
  const [area, setArea] = useState(() => sp.get('area') || guessArea(sp.get('address'), sp.get('city') ?? SITE.city))
  const [phone, setPhone] = useState(sp.get('phone') ?? '')
  const [theme, setTheme] = useState(resolveThemeKey(sp.get('theme')) ?? '')
  const [lang, setLang] = useState(sp.get('lang') === 'kn' || sp.get('lang') === 'hi' ? (sp.get('lang') as string) : 'en')
  const [code, setCode] = useState(initialCode)
  const [status, setStatus] = useState<Status>('idle')
  const [step, setStep] = useState('')
  const [error, setError] = useState('')
  const [target, setTarget] = useState<Target | null>(null)
  const [texts, setTexts] = useState<KitMessages | null>(null)
  const [pics, setPics] = useState<Pics | null>(null)
  const [video, setVideo] = useState<{ blob: Blob; url: string } | null>(null)
  const [videoProgress, setVideoProgress] = useState<number | null>(null)
  const [videoError, setVideoError] = useState('')
  const [copied, setCopied] = useState('')
  /** Each Make starts a new run; results of an older run are dropped. */
  const run = useRef(0)
  /** Opened from Lead Finder with everything filled in: make the kit straight away. */
  const auto = useRef(Boolean(key && name.trim() && code.trim()))

  useEffect(() => {
    document.title = 'WhatsApp kit | Kalvio Build'
    if (!auto.current) return
    const t = setTimeout(() => void makeKit(), 0)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, with the values from the link
  }, [])

  async function makeKit(e?: FormEvent) {
    e?.preventDefault()
    if (!key) return
    const me = ++run.current
    const live = () => me === run.current
    setError('')
    setPics(null)
    setVideo(null)
    setVideoError('')
    setVideoProgress(null)
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
      const local = /localhost|127\.0\.0\.1/.test(window.location.origin)
      const link = `${local ? 'https://kalvio-build.pages.dev' : window.location.origin}${path}`
      const effArea = shopArea || preset.demo.area
      const effCity = shopCity || preset.demo.city
      const shop = { name: shopName, place: [effArea, effCity].filter(Boolean).join(', ') }

      // The link and the messages need nothing from the network: show them at once.
      if (!live()) return
      setTarget({ link, shop, digits: phoneParsed?.digits ?? null })
      setTexts(kitMessages({ key, name: shopName, link, sender: SITE.sender }))

      setStep('Taking a picture of their website (about 10 seconds)…')
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
      storeCode(code.trim())

      setStep('Making the picture…')
      await loadFonts()
      const [tall, bar] = await Promise.all([loadImage(API + data.tall), data.bar ? loadImage(API + data.bar) : Promise.resolve(null)])
      const shot: Shot = {
        tall,
        bar,
        colours: { top: data.top, topDark: data.topDark, bottom: data.bottom, bottomDark: data.bottomDark },
        height: data.height,
        barHeight: data.barHeight,
      }
      const pictureBlob = await makePicture(shot, shop)

      setStep('Putting their name on the link preview…')
      const effTheme = resolveThemeKey(theme) ?? preset.defaultTheme
      const oh = await ogKey({ key, theme: effTheme, name: shopName, area: effArea, city: effCity })
      const og = await makeLinkPreview(shot, shop)
      const put = await fetch(`${API}/og/${key}/${oh}.jpg`, { method: 'PUT', headers: { 'x-code': code.trim() }, body: og }).catch(() => null)

      if (!live()) return
      setPics({ shot, picture: { blob: pictureBlob, url: URL.createObjectURL(pictureBlob) }, previewReady: !!put?.ok })
      setStatus('ready')
      setStep('')
      void buildVideo(shot, shop, me)
    } catch (err) {
      if (!live()) return
      setError(ERRORS[(err as Error).message] ?? ERRORS.network)
      setStatus('error')
      setStep('')
    }
  }

  async function buildVideo(shot: Shot, shop: ShopText, me = run.current) {
    const live = () => me === run.current
    setVideoProgress(0)
    setVideoError('')
    try {
      const blob = await makeVideo(shot, shop, (p) => live() && setVideoProgress(p))
      if (live()) setVideo({ blob, url: URL.createObjectURL(blob) })
    } catch (err) {
      if (live()) setVideoError(ERRORS[(err as Error).message] ?? 'Couldn’t make the video on this phone.')
    } finally {
      if (live()) setVideoProgress(null)
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

  const slug = (target?.shop.name ?? 'sample').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)

  const messageCard = (n: number, title: string, which: keyof KitMessages, note?: ReactNode) =>
    target &&
    texts && (
      <section className="card p-5 sm:p-7" aria-labelledby={`step${n}`}>
        <h2 id={`step${n}`} className="font-display text-xl text-ink">
          {n}. {title}
        </h2>
        {note}
        <label className="sr-only" htmlFor={`msg-${which}`}>
          Message
        </label>
        <textarea
          id={`msg-${which}`}
          className="field mt-4 min-h-40 text-[15px] leading-relaxed"
          value={texts[which]}
          onChange={(e) => setTexts({ ...texts, [which]: e.target.value })}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {target.digits && (
            <a className="btn btn-wa" href={waLink(target.digits, texts[which])} target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> Send on WhatsApp
            </a>
          )}
          <button type="button" className="btn btn-ghost" onClick={() => copy(texts[which], which)}>
            {copied === which ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />} Copy message
          </button>
        </div>
      </section>
    )

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
        <h1 className="h2 text-ink">{target ? `Ready for ${target.shop.name}` : 'Make a WhatsApp kit for a shop'}</h1>
        <p className="mt-2 text-muted">
          {target
            ? 'Send these on WhatsApp one after the other. You can change the messages before sending.'
            : 'Fill in the shop. The link, both messages, a picture and a 10-second video of their website are made for you.'}
        </p>

        {target && texts && (
          <div className="mt-6 grid gap-6">
            {messageCard(
              1,
              'Send the sample link',
              'sample',
              <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                {pics?.previewReady ? (
                  <>
                    <Check size={16} aria-hidden="true" className="shrink-0 text-accent-ink" /> The link preview shows “{target.shop.name}”.
                  </>
                ) : status === 'working' ? (
                  <>
                    <Loader2 size={16} aria-hidden="true" className="shrink-0 animate-spin" /> Putting their name on the link preview. Wait about 10
                    seconds before sending.
                  </>
                ) : (
                  'The link preview shows their name in the title.'
                )}
              </p>,
            )}

            <section className="card p-5 sm:p-7" aria-labelledby="step2">
              <h2 id="step2" className="font-display text-xl text-ink">
                2. Send the picture and the video
              </h2>
              <p className="mt-1 text-muted">So they can see their website without opening the link.</p>
              {pics ? (
                <img src={pics.picture.url} alt={`Picture of the sample website for ${target.shop.name}`} className="mt-4 w-full rounded-card" width={1080} height={1350} />
              ) : status === 'working' ? (
                <div role="status" className="mt-4 flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-card bg-surface-alt p-6 text-center text-muted">
                  <Loader2 size={28} aria-hidden="true" className="animate-spin" />
                  {step}
                </div>
              ) : null}
              {error && (
                <p role="alert" className="mt-4 rounded-card bg-[#fde8e6] p-3 text-sm font-semibold text-[#8a1c12]">
                  {error}
                </p>
              )}
              {pics && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button type="button" className="btn btn-wa" onClick={() => share(new File([pics.picture.blob], `${slug}-website.jpg`, { type: 'image/jpeg' }))}>
                    <Share2 size={18} aria-hidden="true" /> Send picture
                  </button>
                  {video ? (
                    <button type="button" className="btn btn-wa" onClick={() => share(new File([video.blob], `${slug}-website.mp4`, { type: 'video/mp4' }))}>
                      <Video size={18} aria-hidden="true" /> Send video
                    </button>
                  ) : videoProgress !== null ? (
                    <button type="button" className="btn btn-ghost" disabled>
                      <Loader2 size={18} aria-hidden="true" className="animate-spin" /> Making video… {Math.round(videoProgress * 100)}%
                    </button>
                  ) : (
                    <button type="button" className="btn btn-ghost" onClick={() => buildVideo(pics.shot, target.shop)}>
                      <RefreshCw size={18} aria-hidden="true" /> Make video again
                    </button>
                  )}
                </div>
              )}
              {videoError && <p className="mt-3 text-sm text-muted">{videoError}</p>}
              {video && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-ink">Watch the video</summary>
                  <video src={video.url} poster={pics?.picture.url} controls playsInline muted className="mx-auto mt-3 max-h-[70svh] rounded-card bg-black" />
                </details>
              )}
            </section>

            {messageCard(3, 'Send the details', 'details')}

            <div className="grid gap-3 sm:grid-cols-2">
              <a className="btn btn-ghost" href={target.link} target="_blank" rel="noopener">
                <ExternalLink size={18} aria-hidden="true" /> Open their sample
              </a>
              {pics && (
                <a className="btn btn-ghost" href={pics.picture.url} download={`${slug}-website.jpg`}>
                  <Download size={18} aria-hidden="true" /> Save picture
                </a>
              )}
            </div>
          </div>
        )}

        <details className="card mt-8" open={!target}>
          <summary className="cursor-pointer p-5 font-semibold text-ink sm:px-7">{target ? 'Change details' : 'Shop details'}</summary>
          <form onSubmit={makeKit} className="grid gap-4 px-5 pb-5 sm:grid-cols-2 sm:px-7 sm:pb-7">
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
            <Field label="Area" hint={sp.get('address') ? `From the address: ${sp.get('address')}` : undefined}>
              {(id) => <input id={id} className="field" maxLength={60} value={area} onChange={(e) => setArea(e.target.value)} />}
            </Field>
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
              <Field label="Your Lead Finder code" hint="Filled in by Lead Finder's Send sample button. It keeps strangers from using up the free daily pictures.">
                {(id) => (
                  <input id={id} className="field" type="password" autoComplete="current-password" required value={code} onChange={(e) => setCode(e.target.value)} />
                )}
              </Field>
            </div>
            <button type="submit" disabled={status === 'working'} className="btn btn-primary min-h-13 text-lg sm:col-span-2">
              {status === 'working' ? <Loader2 size={20} aria-hidden="true" className="animate-spin" /> : <ImageIcon size={20} aria-hidden="true" />}
              {status === 'working' ? 'Making the kit…' : target ? 'Make again' : 'Make WhatsApp kit'}
            </button>
            {error && !target && (
              <p role="alert" className="rounded-card bg-[#fde8e6] p-3 text-sm font-semibold text-[#8a1c12] sm:col-span-2">
                {error}
              </p>
            )}
          </form>
        </details>
      </main>
    </div>
  )
}
