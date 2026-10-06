/**
 * Kalvio share Worker.
 *
 *   POST /api/prepare   {code, path}   Screenshots the personalised sample at `path` (e.g. /demo/dentist?name=…)
 *                                      the way an iPhone shows it in Safari, caches it, returns image URLs + colours.
 *   GET  /img/tall/<h>.jpg             The sample, first ~4 screens, without its sticky action bar.
 *   GET  /img/bar/<h>.png              The sample's sticky Call · WhatsApp · Directions bar, drawn over the top.
 *   PUT  /og/<key>/<h>.jpg  (x-code)   Stores a link-preview image with the shop's name (made on the share page).
 *   GET  /og/<key>/<h>.jpg             Serves it to WhatsApp; falls back to the generic image for that business.
 *
 * Anything that costs browser time or writes storage needs a Lead Finder team code (admin or caller).
 */
import puppeteer from '@cloudflare/puppeteer'
import { sha, shotKey } from '../../../src/lib/sharekit'

interface Env {
  BROWSER: Fetcher
  SHARE: KVNamespace
  SITE: string
  LEADFINDER_URL: string
  LEADFINDER_KEY: string
  /** Local testing only (`wrangler dev --var TEST_CODE:…`). Never set in production. */
  TEST_CODE?: string
}

const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
/** Safari's visible area on an iPhone 15 (852 pt screen minus status bar and minimised address bar). */
const VIEW = { width: 393, height: 758 }
/** Enough page for a 10-second scroll; keeps the image around 1 MB. */
const MAX_HEIGHT = 3400
const DAY = 86400

function cors(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get('origin') ?? ''
  const site = new URL(env.SITE)
  const ok =
    origin === site.origin ||
    origin.endsWith('.' + site.host) ||
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:')
  return ok
    ? {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
        'access-control-allow-headers': 'content-type, x-code',
        'access-control-max-age': '86400',
        vary: 'origin',
      }
    : {}
}

function json(req: Request, env: Env, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...cors(req, env) } })
}

/** Checks a Lead Finder team code (cached for a day so the RPC isn't called on every request). */
async function authorised(code: string | null, env: Env): Promise<boolean> {
  if (!code || code.length > 100) return false
  if (env.TEST_CODE && code === env.TEST_CODE) return true
  const cacheKey = 'auth:' + (await sha(code, 32))
  if (await env.SHARE.get(cacheKey)) return true
  const res = await fetch(`${env.LEADFINDER_URL}/rest/v1/rpc/app_login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', apikey: env.LEADFINDER_KEY },
    body: JSON.stringify({ p_code: code }),
  })
  if (!res.ok) return false
  await env.SHARE.put(cacheKey, '1', { expirationTtl: DAY })
  return true
}

interface ShotMeta {
  top: string
  topDark: boolean
  bottom: string
  bottomDark: boolean
  height: number
  barHeight: number
}

async function prepare(req: Request, env: Env): Promise<Response> {
  const body = (await req.json().catch(() => null)) as { code?: string; path?: string } | null
  if (!body || !(await authorised(body.code ?? null, env))) return json(req, env, { error: 'bad_code' }, 401)
  const path = body.path ?? ''
  if (!/^\/demo\/[a-z_]+(\?[^#\s]{0,600})?$/.test(path)) return json(req, env, { error: 'bad_path' }, 400)

  const h = await shotKey(path)
  const cached = await env.SHARE.getWithMetadata<ShotMeta>('tall:' + h, 'stream')
  if (cached.value && cached.metadata) {
    await cached.value.cancel()
    return json(req, env, { h, tall: `/img/tall/${h}.jpg`, bar: `/img/bar/${h}.png`, ...cached.metadata })
  }

  let browser
  try {
    browser = await puppeteer.launch(env.BROWSER)
  } catch {
    // Free plan: 10 browser-minutes a day. Resets at midnight UTC (5:30 AM in India).
    return json(req, env, { error: 'busy' }, 429)
  }
  try {
    const page = await browser.newPage()
    await page.setUserAgent(IPHONE_UA)
    await page.setViewport({ ...VIEW, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    // The share picture frames the sample itself, so hide the "sample by Kalvio Build" ribbon.
    await page.evaluateOnNewDocument(`sessionStorage.setItem('kb-ribbon-hidden', '1')`)
    await page.goto(env.SITE + path, { waitUntil: 'networkidle0', timeout: 25000 })

    // Runs inside the page (a string, because this Worker is type-checked without browser types).
    const info = (await page.evaluate(`(() => {
      const rgb = (el) => (el ? getComputedStyle(el).backgroundColor : 'rgb(255, 255, 255)')
      const bar = document.querySelector('nav[aria-label="Quick actions"]')
      return {
        top: rgb(document.querySelector('header')),
        bottom: rgb(bar),
        height: document.documentElement.scrollHeight,
        barHeight: bar ? Math.ceil(bar.getBoundingClientRect().height) : 0,
      }
    })()`)) as { top: string; bottom: string; height: number; barHeight: number }
    const barShot = info.barHeight
      ? ((await (await page.$('nav[aria-label="Quick actions"]'))!.screenshot({ type: 'png' })) as Uint8Array)
      : null
    // Photos further down load lazily: scroll through the page like a visitor, then wait for every image
    // (max 6 s) so the scroll video has no blank boxes.
    await page.evaluate(`(async () => {
      const step = (ms) => new Promise((r) => setTimeout(r, ms))
      const imgs = [...document.images]
      imgs.forEach((i) => { i.loading = 'eager' })
      for (let y = 0; y < ${MAX_HEIGHT}; y += 500) { window.scrollTo(0, y); await step(80) }
      window.scrollTo(0, 0)
      await Promise.race([
        Promise.all(imgs.map((i) => (i.complete && i.naturalWidth) ? 0 : new Promise((r) => { i.onload = i.onerror = r }))),
        step(6000),
      ])
      await Promise.all(imgs.map((i) => i.decode().catch(() => 0)))
      await step(150)
    })()`)
    // The bar stays fixed at the bottom of the phone screen, so the tall image is taken without it.
    await page.addStyleTag({ content: 'nav[aria-label="Quick actions"]{display:none!important}' })
    const height = Math.min(info.height, MAX_HEIGHT)
    const tall = (await page.screenshot({
      type: 'jpeg',
      quality: 72,
      clip: { x: 0, y: 0, width: VIEW.width, height },
      captureBeyondViewport: true,
    })) as Uint8Array

    const toHex = (c: string) => {
      const m = c.match(/\d+/g)?.map(Number) ?? [255, 255, 255]
      return { hex: '#' + m.slice(0, 3).map((v) => v.toString(16).padStart(2, '0')).join(''), dark: 0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2] < 140 }
    }
    const t = toHex(info.top)
    const b = toHex(info.bottom)
    const meta: ShotMeta = { top: t.hex, topDark: t.dark, bottom: b.hex, bottomDark: b.dark, height, barHeight: info.barHeight }
    await env.SHARE.put('tall:' + h, tall, { expirationTtl: 30 * DAY, metadata: meta })
    if (barShot) await env.SHARE.put('bar:' + h, barShot, { expirationTtl: 30 * DAY })
    return json(req, env, { h, tall: `/img/tall/${h}.jpg`, bar: barShot ? `/img/bar/${h}.png` : null, ...meta })
  } catch (e) {
    return json(req, env, { error: 'render_failed', detail: String(e).slice(0, 200) }, 502)
  } finally {
    await browser.close()
  }
}

async function image(req: Request, env: Env, kind: 'tall' | 'bar', h: string): Promise<Response> {
  const data = await env.SHARE.get(`${kind}:${h}`, 'arrayBuffer')
  if (!data) return new Response('Not found', { status: 404, headers: cors(req, env) })
  return new Response(data, {
    headers: {
      'content-type': kind === 'tall' ? 'image/jpeg' : 'image/png',
      'cache-control': 'public, max-age=86400',
      ...cors(req, env),
    },
  })
}

async function putOg(req: Request, env: Env, key: string, h: string): Promise<Response> {
  if (!(await authorised(req.headers.get('x-code'), env))) return json(req, env, { error: 'bad_code' }, 401)
  const data = await req.arrayBuffer()
  const bytes = new Uint8Array(data.slice(0, 3))
  // JPEG only, at most 400 KB.
  if (data.byteLength > 400_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    return json(req, env, { error: 'bad_image' }, 400)
  }
  await env.SHARE.put(`og:${key}:${h}`, data, { expirationTtl: 365 * DAY })
  return json(req, env, { ok: true })
}

async function getOg(req: Request, env: Env, key: string, h: string): Promise<Response> {
  const data = await env.SHARE.get(`og:${key}:${h}`, 'arrayBuffer')
  if (data) {
    return new Response(data, { headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=604800' } })
  }
  // No personalised image (yet): serve the generic one for this business so the preview still has a picture.
  const generic = await fetch(`${env.SITE}/og/${key}.jpg`)
  return new Response(generic.body, {
    status: generic.ok ? 200 : 404,
    headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=3600' },
  })
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req, env) })
    if (req.method === 'POST' && url.pathname === '/api/prepare') return prepare(req, env)

    const img = url.pathname.match(/^\/img\/(tall|bar)\/([a-f0-9]{24})\.(jpg|png)$/)
    if (img && req.method === 'GET') return image(req, env, img[1] as 'tall' | 'bar', img[2])

    const og = url.pathname.match(/^\/og\/([a-z_]{2,30})\/([a-f0-9]{24})\.jpg$/)
    if (og && req.method === 'PUT') return putOg(req, env, og[1], og[2])
    if (og && (req.method === 'GET' || req.method === 'HEAD')) return getOg(req, env, og[1], og[2])

    return new Response('Not found', { status: 404 })
  },
}
