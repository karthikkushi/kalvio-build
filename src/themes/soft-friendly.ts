import type { Theme } from './types'

/** Approachable and kind: cream, gentle violet and sunshine, round type and big radii. */
export const softFriendly: Theme = {
  key: 'soft-friendly',
  label: 'Soft Friendly',
  summary: 'Cream, gentle violet and sunshine yellow with rounded type. Approachable for pets and kids.',
  mode: 'light',
  fonts: {
    display: "'Nunito', ui-rounded, ui-sans-serif, system-ui, sans-serif",
    body: "'Nunito', ui-rounded, ui-sans-serif, system-ui, sans-serif",
    displayWeight: 800,
    displayTracking: '-0.02em',
  },
  colors: {
    bg: '#FFF8F1',
    surface: '#FFFFFF',
    surfaceAlt: '#F3EEFF',
    ink: '#2A2340',
    muted: '#5A5270',
    line: '#E6DDF3',
    accent: '#6346DE',
    onAccent: '#FFFFFF',
    accentInk: '#5636D0',
    highlight: '#FFCF5C',
    onHighlight: '#2A2340',
    scrim: '#1A1430',
  },
  radius: { card: '28px', button: '999px', image: '32px', chip: '999px' },
  shadow: {
    card: '0 2px 0 rgb(42 35 64 / 0.04), 0 14px 30px -16px rgb(99 70 222 / 0.35)',
    float: '0 18px 40px -16px rgb(99 70 222 / 0.5)',
  },
  heroFrame: 'inset',
  motion: { distance: 14, duration: 0.3, ease: [0.34, 1.3, 0.64, 1] },
}
