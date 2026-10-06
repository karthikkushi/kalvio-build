/**
 * Canvas drawing for the WhatsApp share kit: the same iPhone 15 Pro as the landing page (src/landing/IPhone.tsx),
 * in iPhone points (screen 393 × 852, device 411 × 870), scaled to any width.
 */
export interface ScreenColours {
  top: string
  topDark: boolean
  bottom: string
  bottomDark: boolean
}

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

/** Safari's visible area inside the screen, in points. */
export const CONTENT = { top: 54, height: 758 }

export function phoneHeight(width: number): number {
  return (width * 870) / 411
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

/** Draws the phone and calls `drawContent` with the rectangle where the web page goes (already clipped). */
export function drawPhone(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  colours: ScreenColours,
  domain: string,
  drawContent: (r: Rect) => void,
) {
  const u = width / 411
  const H = phoneHeight(width)

  // Shadow and glow.
  ctx.save()
  ctx.shadowColor = 'rgba(91, 69, 224, 0.5)'
  ctx.shadowBlur = 70 * u
  ctx.shadowOffsetY = 40 * u
  rr(ctx, x, y, width, H, 66 * u)
  ctx.fillStyle = '#222226'
  ctx.fill()
  ctx.restore()

  // Side buttons.
  const btn = ctx.createLinearGradient(x - 3 * u, 0, x + 1 * u, 0)
  btn.addColorStop(0, '#3a3a40')
  btn.addColorStop(0.45, '#8b8b93')
  btn.addColorStop(1, '#4a4a50')
  ctx.fillStyle = btn
  for (const [top, h] of [
    [130, 32],
    [190, 62],
    [266, 62],
  ]) {
    rr(ctx, x - 3 * u, y + top * u, 4 * u, h * u, 2 * u)
    ctx.fill()
  }
  const btnR = ctx.createLinearGradient(x + width - 1 * u, 0, x + width + 3 * u, 0)
  btnR.addColorStop(0, '#4a4a50')
  btnR.addColorStop(0.55, '#8b8b93')
  btnR.addColorStop(1, '#3a3a40')
  ctx.fillStyle = btnR
  rr(ctx, x + width - 1 * u, y + 225 * u, 4 * u, 100 * u, 2 * u)
  ctx.fill()

  // Titanium band.
  const band = ctx.createLinearGradient(x, y, x + width, y + H)
  for (const [stop, c] of [
    [0, '#8a8a92'],
    [0.14, '#3b3b41'],
    [0.4, '#222226'],
    [0.62, '#2b2b30'],
    [0.86, '#55555c'],
    [1, '#8f8f97'],
  ] as const) {
    band.addColorStop(stop, c)
  }
  rr(ctx, x, y, width, H, 66 * u)
  ctx.fillStyle = band
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.35)'
  ctx.lineWidth = 0.75 * u
  ctx.stroke()

  // Bezel.
  rr(ctx, x + 3 * u, y + 3 * u, width - 6 * u, H - 6 * u, 63 * u)
  ctx.fillStyle = '#050506'
  ctx.fill()

  // Screen.
  const sx = x + 9 * u
  const sy = y + 9 * u
  const sw = 393 * u
  const sh = 852 * u
  ctx.save()
  rr(ctx, sx, sy, sw, sh, 57 * u)
  ctx.clip()
  ctx.fillStyle = '#000'
  ctx.fillRect(sx, sy, sw, sh)

  const content: Rect = { x: sx, y: sy + CONTENT.top * u, w: sw, h: CONTENT.height * u }
  ctx.save()
  ctx.beginPath()
  ctx.rect(content.x, content.y, content.w, content.h)
  ctx.clip()
  drawContent(content)
  ctx.restore()

  // Status bar.
  ctx.fillStyle = colours.top
  ctx.fillRect(sx, sy, sw, CONTENT.top * u)
  const ink = colours.topDark ? '#fff' : '#000'
  ctx.fillStyle = ink
  ctx.font = `600 ${17 * u}px -apple-system, 'SF Pro Text', system-ui, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  const statusY = sy + 31 * u
  ctx.fillText('9:41', sx + 48 * u, statusY)
  // Signal bars.
  let ix = sx + sw - 30 * u - 27 * u - 6 * u - 16 * u - 6 * u - 18 * u
  for (let i = 0; i < 4; i++) {
    const h = (4 + i * 2.7) * u
    rr(ctx, ix + i * 5 * u, statusY + 6 * u - h, 3 * u, h, 1 * u)
    ctx.fill()
  }
  // Wi-Fi.
  ix += 24 * u
  ctx.strokeStyle = ink
  ctx.lineCap = 'round'
  ctx.lineWidth = 1.9 * u
  for (const r of [9, 5.6]) {
    ctx.beginPath()
    ctx.arc(ix + 8 * u, statusY + 6 * u, r * u, Math.PI * 1.25, Math.PI * 1.75)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.arc(ix + 8 * u, statusY + 5 * u, 1.8 * u, 0, Math.PI * 2)
  ctx.fill()
  // Battery.
  ix += 22 * u
  ctx.globalAlpha = 0.4
  ctx.lineWidth = 1 * u
  rr(ctx, ix, statusY - 6 * u, 23 * u, 12 * u, 3.8 * u)
  ctx.stroke()
  ctx.fillRect(ix + 24.5 * u, statusY - 2 * u, 1.6 * u, 4 * u)
  ctx.globalAlpha = 1
  rr(ctx, ix + 1.8 * u, statusY - 4.2 * u, 16 * u, 8.4 * u, 2.4 * u)
  ctx.fill()

  // Minimised Safari address bar.
  const barTop = sy + (CONTENT.top + CONTENT.height) * u
  ctx.fillStyle = colours.bottom
  ctx.fillRect(sx, barTop, sw, sh - (barTop - sy))
  ctx.fillStyle = colours.bottomDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)'
  ctx.font = `500 ${12 * u}px -apple-system, 'SF Pro Text', system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillText(domain, sx + sw / 2 + 5 * u, barTop + 13 * u)
  const lockX = sx + sw / 2 - ctx.measureText(domain).width / 2 - 6 * u
  rr(ctx, lockX - 4 * u, barTop + 12 * u, 8 * u, 6 * u, 1.2 * u)
  ctx.fill()
  ctx.lineWidth = 1.3 * u
  ctx.strokeStyle = ctx.fillStyle
  ctx.beginPath()
  ctx.arc(lockX, barTop + 12 * u, 2.3 * u, Math.PI, 0)
  ctx.stroke()
  // Home indicator.
  ctx.fillStyle = colours.bottomDark ? '#fff' : '#000'
  rr(ctx, sx + sw / 2 - 67 * u, sy + sh - 13 * u, 134 * u, 5 * u, 2.5 * u)
  ctx.fill()

  // Dynamic Island with camera.
  ctx.fillStyle = '#000'
  rr(ctx, sx + sw / 2 - 62.5 * u, sy + 11 * u, 125 * u, 37 * u, 20 * u)
  ctx.fill()
  const lens = ctx.createRadialGradient(sx + sw / 2 + 46 * u, sy + 28 * u, 0, sx + sw / 2 + 46 * u, sy + 29.5 * u, 6 * u)
  lens.addColorStop(0, '#3a4a78')
  lens.addColorStop(0.55, '#121829')
  lens.addColorStop(1, '#05070d')
  ctx.fillStyle = lens
  ctx.beginPath()
  ctx.arc(sx + sw / 2 + 46 * u, sy + 29.5 * u, 5.5 * u, 0, Math.PI * 2)
  ctx.fill()

  // Glass glare.
  const glare = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh * 0.6)
  glare.addColorStop(0, 'rgba(255,255,255,0.13)')
  glare.addColorStop(0.26, 'rgba(255,255,255,0.04)')
  glare.addColorStop(0.42, 'rgba(255,255,255,0)')
  ctx.fillStyle = glare
  ctx.fillRect(sx, sy, sw, sh)
  ctx.restore()
}

/** Kalvio Build's dark violet background with a soft glow, as on the landing page. */
export function drawBrandBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#14121f'
  ctx.fillRect(0, 0, w, h)
  const glow = ctx.createRadialGradient(w * 0.85, h * 0.05, 0, w * 0.85, h * 0.05, w * 0.75)
  glow.addColorStop(0, 'rgba(91, 69, 224, 0.5)')
  glow.addColorStop(1, 'rgba(91, 69, 224, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)
}

const K_PATH = new Path2D('M20 16h7v13.5L39.5 16H48L34.8 30.2 48.5 48h-8.7L29.9 34.7 27 37.8V48h-7z')

/** The Kalvio Build mark and name. Returns the width drawn. */
export function drawLogo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): number {
  ctx.fillStyle = '#C9C3FF'
  rr(ctx, x, y, size, size, size / 4)
  ctx.fill()
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 64, size / 64)
  ctx.fillStyle = '#14121F'
  ctx.fill(K_PATH)
  ctx.restore()
  ctx.fillStyle = '#fff'
  ctx.font = `700 ${size * 0.62}px Outfit, system-ui, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('Kalvio Build', x + size * 1.3, y + size / 2 + 1)
  return size * 1.3 + ctx.measureText('Kalvio Build').width
}

/** Splits text into lines that fit `maxWidth` with the current font. */
export function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width <= maxWidth || !line) line = next
    else {
      lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines
}

/** Largest font size (from `max` down) at which `text` fits in `maxLines` lines. */
export function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: (size: number) => string,
  maxWidth: number,
  maxLines: number,
  max: number,
  min: number,
): { size: number; lines: string[] } {
  for (let size = max; size >= min; size -= 2) {
    ctx.font = font(size)
    const lines = wrap(ctx, text, maxWidth)
    if (lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxWidth)) return { size, lines }
  }
  ctx.font = font(min)
  return { size: min, lines: wrap(ctx, text, maxWidth).slice(0, maxLines) }
}
