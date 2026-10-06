import { CONTENT, drawBrandBackground, drawLogo, drawPhone, fitText, phoneHeight, type Rect, type ScreenColours } from './canvas'

/** A sample screenshot from the share Worker: the page (first screens) and its sticky action bar. */
export interface Shot {
  tall: HTMLImageElement
  bar: HTMLImageElement | null
  colours: ScreenColours
  /** Page height captured, in CSS px (393 wide). */
  height: number
  barHeight: number
}

export interface ShopText {
  name: string
  place: string
}

const DOMAIN = 'kalvio-build.pages.dev'
const LAVENDER = '#C9C3FF'
const display = (size: number) => `700 ${size}px Outfit, system-ui, sans-serif`
const body = (size: number, weight = 400) => `${weight} ${size}px 'DM Sans', system-ui, sans-serif`

export async function loadFonts() {
  await Promise.all([document.fonts.load(display(40)), document.fonts.load(body(20)), document.fonts.load(body(20, 600))])
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load ' + src))
    img.src = src
  })
}

/** Draws the web page scrolled by `scroll` CSS px, with the sticky action bar fixed at the bottom. */
function drawPage(ctx: CanvasRenderingContext2D, shot: Shot, r: Rect, scroll: number) {
  const scale = shot.tall.naturalWidth / 393
  const visible = CONTENT.height
  ctx.fillStyle = '#fff'
  ctx.fillRect(r.x, r.y, r.w, r.h)
  ctx.drawImage(shot.tall, 0, scroll * scale, shot.tall.naturalWidth, visible * scale, r.x, r.y, r.w, r.h)
  if (shot.bar) {
    const h = (r.w * shot.bar.naturalHeight) / shot.bar.naturalWidth
    ctx.drawImage(shot.bar, r.x, r.y + r.h - h, r.w, h)
  }
}

function eyebrow(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, align: CanvasTextAlign) {
  ctx.font = body(size, 600)
  ctx.fillStyle = LAVENDER
  ctx.textAlign = align
  ctx.textBaseline = 'alphabetic'
  ctx.letterSpacing = `${size * 0.14}px`
  ctx.fillText(text.toUpperCase(), x, y)
  ctx.letterSpacing = '0px'
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), type, quality))
}

/** Header block shared by the picture and the video. Returns the y below it. */
function header(ctx: CanvasRenderingContext2D, W: number, top: number, shop: ShopText, scale: number): number {
  eyebrow(ctx, 'Free website sample', W / 2, top, 22 * scale, 'center')
  const { size, lines } = fitText(ctx, `Made for ${shop.name}`, display, W - 120 * scale, 2, 58 * scale, 34 * scale)
  ctx.font = display(size)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  let y = top + 16 * scale + size
  for (const line of lines) {
    ctx.fillText(line, W / 2, y)
    y += size * 1.08
  }
  if (shop.place) {
    ctx.font = body(26 * scale)
    ctx.fillStyle = 'rgba(255,255,255,0.78)'
    ctx.fillText(shop.place, W / 2, y + 6 * scale)
    y += 34 * scale
  }
  return y
}

function footer(ctx: CanvasRenderingContext2D, W: number, y: number, scale: number) {
  ctx.font = body(24 * scale, 600)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  const text = 'Reply YES to make it live'
  const logoSize = 34 * scale
  ctx.font = `700 ${logoSize * 0.62}px Outfit, system-ui, sans-serif`
  const logoWidth = logoSize * 1.3 + ctx.measureText('Kalvio Build').width
  ctx.font = body(24 * scale, 600)
  const textWidth = ctx.measureText(text).width
  const gap = 28 * scale
  const startX = W / 2 - (logoWidth + gap + textWidth) / 2
  drawLogo(ctx, startX, y - logoSize / 2, logoSize)
  ctx.font = body(24 * scale, 600)
  ctx.fillStyle = LAVENDER
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, startX + logoWidth + gap, y + 1)
}

/** 1080 × 1350 picture for WhatsApp: "Made for <shop>", the phone showing their website, and a reply prompt. */
export async function makePicture(shot: Shot, shop: ShopText): Promise<Blob> {
  const W = 1080
  const H = 1350
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  drawBrandBackground(ctx, W, H)
  const below = header(ctx, W, 92, shop, 1)
  const footerY = H - 52
  const phoneW = Math.min(500, ((footerY - 50 - (below + 34)) * 411) / 870)
  drawPhone(ctx, (W - phoneW) / 2, below + 34, phoneW, shot.colours, DOMAIN, (r) => drawPage(ctx, shot, r, 0))
  footer(ctx, W, footerY, 1)
  return toBlob(canvas, 'image/jpeg', 0.9)
}

/** 1200 × 630 link-preview image: their name on the left, the phone with their website on the right. */
export async function makeLinkPreview(shot: Shot, shop: ShopText): Promise<Blob> {
  const W = 1200
  const H = 630
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  drawBrandBackground(ctx, W, H)
  const phoneW = 262
  drawPhone(ctx, W - phoneW - 96, (H - phoneHeight(phoneW)) / 2, phoneW, shot.colours, DOMAIN, (r) => drawPage(ctx, shot, r, 0))

  eyebrow(ctx, 'Free website sample', 72, 150, 24, 'left')
  const { size, lines } = fitText(ctx, shop.name, display, 640, 3, 76, 44)
  ctx.font = display(size)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  let y = 166 + size
  for (const line of lines) {
    ctx.fillText(line, 72, y)
    y += size * 1.06
  }
  if (shop.place) {
    ctx.font = body(30)
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fillText(shop.place, 72, y + 10)
  }
  drawLogo(ctx, 72, H - 104, 44)
  for (let q = 0.85; q >= 0.5; q -= 0.1) {
    const blob = await toBlob(canvas, 'image/jpeg', q)
    if (blob.size < 380_000) return blob
  }
  return toBlob(canvas, 'image/jpeg', 0.45)
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * 10-second 720 × 1280 MP4: the phone slowly scrolls through their website.
 * Encoded on the phone with WebCodecs (Mediabunny), so it works offline and costs nothing.
 */
export async function makeVideo(shot: Shot, shop: ShopText, onProgress: (p: number) => void): Promise<Blob> {
  const { Output, Mp4OutputFormat, BufferTarget, CanvasSource, canEncodeVideo } = await import('mediabunny')
  const W = 720
  const H = 1280
  const FPS = 30
  const SECONDS = 10
  if (!(await canEncodeVideo('avc', { width: W, height: H }))) throw new Error('no_video_encoder')

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Static parts drawn once, then copied each frame.
  const bg = document.createElement('canvas')
  bg.width = W
  bg.height = H
  const bctx = bg.getContext('2d')!
  drawBrandBackground(bctx, W, H)
  const scale = W / 1080
  const below = header(bctx, W, 70, shop, scale)
  const footerY = H - 46
  footer(bctx, W, footerY, scale)
  const phoneW = Math.min(470, ((footerY - 44 - (below + 26)) * 411) / 870)
  const phoneX = (W - phoneW) / 2
  const phoneY = below + 26

  const maxScroll = Math.max(0, shot.height - CONTENT.height + shot.barHeight)
  const output = new Output({ format: new Mp4OutputFormat({ fastStart: 'in-memory' }), target: new BufferTarget() })
  const source = new CanvasSource(canvas, { codec: 'avc', bitrate: 2_200_000 })
  output.addVideoTrack(source, { frameRate: FPS })
  await output.start()

  const frames = FPS * SECONDS
  for (let i = 0; i < frames; i++) {
    const t = i / FPS
    // Hold on their name for 1.2 s, scroll for 7.4 s, hold at the end.
    const p = t < 1.2 ? 0 : t > 8.6 ? 1 : ease((t - 1.2) / 7.4)
    ctx.drawImage(bg, 0, 0)
    drawPhone(ctx, phoneX, phoneY, phoneW, shot.colours, DOMAIN, (r) => drawPage(ctx, shot, r, p * maxScroll))
    await source.add(t, 1 / FPS)
    if (i % 10 === 0) onProgress(i / frames)
  }
  await output.finalize()
  onProgress(1)
  return new Blob([output.target.buffer!], { type: 'video/mp4' })
}
