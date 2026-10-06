import { boldStudio } from './bold-studio'
import { cleanClinical } from './clean-clinical'
import { freshLocal } from './fresh-local'
import { luxeDark } from './luxe-dark'
import { softFriendly } from './soft-friendly'
import { THEME_KEYS, type BrandTheme, type Theme, type ThemeKey } from './types'
import { warmBoutique } from './warm-boutique'

export { THEME_KEYS, type BrandTheme, type Theme, type ThemeKey }

export const THEMES: Record<ThemeKey, Theme> = {
  'clean-clinical': cleanClinical,
  'warm-boutique': warmBoutique,
  'bold-studio': boldStudio,
  'soft-friendly': softFriendly,
  'luxe-dark': luxeDark,
  'fresh-local': freshLocal,
}

/** Old style names from the 2025 site, and loose spellings people might type. */
const ALIASES: Record<string, ThemeKey> = {
  glassmorphism: 'clean-clinical',
  minimalism: 'clean-clinical',
  clinical: 'clean-clinical',
  clean: 'clean-clinical',
  skeuomorphism: 'warm-boutique',
  boutique: 'warm-boutique',
  warm: 'warm-boutique',
  'neo-brutalism': 'bold-studio',
  brutalism: 'bold-studio',
  bold: 'bold-studio',
  claymorphism: 'soft-friendly',
  soft: 'soft-friendly',
  friendly: 'soft-friendly',
  'liquid-glass': 'luxe-dark',
  luxe: 'luxe-dark',
  dark: 'luxe-dark',
  fresh: 'fresh-local',
  local: 'fresh-local',
}

export function resolveThemeKey(raw: string | null | undefined): ThemeKey | null {
  if (!raw) return null
  const k = raw.trim().toLowerCase().replace(/[\s_]+/g, '-')
  if ((THEME_KEYS as readonly string[]).includes(k)) return k as ThemeKey
  return ALIASES[k] ?? null
}

/** CSS custom properties for a theme, scoped to `[data-theme="<key>"]`. Tailwind maps these to utilities. */
export function themeToCss(t: Theme | BrandTheme): string {
  const c = t.colors
  const vars: Record<string, string> = {
    '--t-bg': c.bg,
    '--t-surface': c.surface,
    '--t-surface-alt': c.surfaceAlt,
    '--t-ink': c.ink,
    '--t-muted': c.muted,
    '--t-line': c.line,
    '--t-accent': c.accent,
    '--t-on-accent': c.onAccent,
    '--t-accent-ink': c.accentInk,
    '--t-highlight': c.highlight,
    '--t-on-highlight': c.onHighlight,
    '--t-scrim': c.scrim,
    '--t-font-display': t.fonts.display,
    '--t-font-body': t.fonts.body,
    '--t-display-weight': String(t.fonts.displayWeight),
    '--t-display-tracking': t.fonts.displayTracking,
    '--t-radius-card': t.radius.card,
    '--t-radius-btn': t.radius.button,
    '--t-radius-img': t.radius.image,
    '--t-radius-chip': t.radius.chip,
    '--t-shadow-card': t.shadow.card,
    '--t-shadow-float': t.shadow.float,
  }
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';')
  return `[data-theme="${t.key}"]{${body};color-scheme:${t.mode}}html:has([data-theme="${t.key}"]){background:${c.bg}}`
}
