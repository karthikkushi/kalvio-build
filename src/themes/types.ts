export const THEME_KEYS = [
  'clean-clinical',
  'warm-boutique',
  'bold-studio',
  'soft-friendly',
  'luxe-dark',
  'fresh-local',
] as const
export type ThemeKey = (typeof THEME_KEYS)[number]

/** How the hero photo is framed. Same markup, different shape. */
export type HeroFrame = 'inset' | 'arch' | 'bleed'

export interface Theme {
  key: ThemeKey
  label: string
  /** One-line rationale shown in docs and the landing page. */
  summary: string
  mode: 'light' | 'dark'
  fonts: {
    /** CSS font-family stack for headings and the shop name. */
    display: string
    body: string
    /** Font weight for display text. */
    displayWeight: number
    /** Letter-spacing for display text. */
    displayTracking: string
  }
  colors: {
    /** Page background. */
    bg: string
    /** Cards, sheets, inputs. */
    surface: string
    /** Alternating section background. */
    surfaceAlt: string
    /** Main text. Must reach 4.5:1 on bg, surface and surfaceAlt. */
    ink: string
    /** Secondary text. Must reach 4.5:1 on bg, surface and surfaceAlt. */
    muted: string
    /** Hairlines and input borders. */
    line: string
    /** Primary buttons, monogram, active states. */
    accent: string
    /** Text on accent. Must reach 4.5:1 on accent. */
    onAccent: string
    /** Accent-coloured text and icons on bg/surface. Must reach 4.5:1. */
    accentInk: string
    /** Secondary accent: badges, offer banner, stars. */
    highlight: string
    /** Text on highlight. Must reach 4.5:1 on highlight. */
    onHighlight: string
    /** Dark scrim used behind text that sits on photos. */
    scrim: string
  }
  radius: { card: string; button: string; image: string; chip: string }
  shadow: { card: string; float: string }
  heroFrame: HeroFrame
  motion: {
    /** Reveal travel distance in px. */
    distance: number
    /** Reveal duration in seconds (≤ 0.3). */
    duration: number
    ease: [number, number, number, number]
  }
}
