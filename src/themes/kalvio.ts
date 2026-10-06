import type { BrandTheme } from './types'

/** Kalvio Build's own pages (landing). Ink-violet and lavender, carried over from the 2025 brand. */
export const kalvio: BrandTheme = {
  key: 'kalvio',
  label: 'Kalvio Build',
  summary: 'Agency brand: deep ink-violet, lavender and a confident geometric sans.',
  mode: 'light',
  fonts: {
    display: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    body: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    displayWeight: 700,
    displayTracking: '-0.03em',
  },
  colors: {
    bg: '#FBFAFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F1EEFC',
    ink: '#14121F',
    muted: '#4F4A63',
    line: '#E2DDF2',
    accent: '#5B45E0',
    onAccent: '#FFFFFF',
    accentInk: '#4C37CF',
    highlight: '#C9C3FF',
    onHighlight: '#14121F',
    scrim: '#14121F',
  },
  radius: { card: '20px', button: '14px', image: '24px', chip: '999px' },
  shadow: {
    card: '0 1px 2px rgb(20 18 31 / 0.05), 0 12px 32px -16px rgb(20 18 31 / 0.22)',
    float: '0 20px 50px -18px rgb(91 69 224 / 0.45)',
  },
  heroFrame: 'inset',
  motion: { distance: 14, duration: 0.28, ease: [0.2, 0.7, 0.2, 1] },
}
