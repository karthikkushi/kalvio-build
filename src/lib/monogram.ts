import type { Theme } from '../themes'

const SKIP = new Set(['the', 'and', '&', 'of', 'dr', 'dr.', 'm/s', 'sri', 'shri', 'sree', 'new', 'a'])

/** Two-letter monogram from a shop name: "Avinashi Dental Clinic" -> "AD", "Dr. Rao's" -> "R". */
export function initials(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}&./\s'-]/gu, ' ')
    .split(/[\s-]+/)
    .filter(Boolean)
  const meaningful = words.filter((w) => !SKIP.has(w.toLowerCase()))
  const pick = (meaningful.length ? meaningful : words).slice(0, 2)
  const letters = pick.map((w) => Array.from(w.replace(/^['.]+/, ''))[0] ?? '').join('')
  return letters.toUpperCase() || 'K'
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/** SVG favicon of the monogram, so the browser tab shows the shop's initials. */
export function monogramFavicon(text: string, theme: Theme): string {
  const rx = theme.radius.chip === '999px' ? 32 : 10
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rx}" fill="${theme.colors.accent}"/><text x="32" y="33" text-anchor="middle" dominant-baseline="central" font-family="system-ui,sans-serif" font-weight="700" font-size="${text.length > 1 ? 26 : 32}" fill="${theme.colors.onAccent}">${esc(text)}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
