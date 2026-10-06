import type { Theme } from './types'

/** Crafted and personal: ivory, kumkum maroon and antique gold, with a soft serif. */
export const warmBoutique: Theme = {
  key: 'warm-boutique',
  label: 'Warm Boutique',
  summary: 'Ivory, kumkum maroon and antique gold with a soft serif. Feels crafted and personal.',
  mode: 'light',
  fonts: {
    display: "'Fraunces', ui-serif, Georgia, serif",
    body: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    displayWeight: 600,
    displayTracking: '-0.015em',
  },
  colors: {
    bg: '#FBF6EF',
    surface: '#FFFDF9',
    surfaceAlt: '#F3E9DD',
    ink: '#2B1712',
    muted: '#694C42',
    line: '#E5D5C3',
    accent: '#8A2C37',
    onAccent: '#FFF8F0',
    accentInk: '#86293A',
    highlight: '#E8C27A',
    onHighlight: '#2B1712',
    scrim: '#1E0E0A',
  },
  radius: { card: '18px', button: '999px', image: '200px 200px 18px 18px', chip: '999px' },
  shadow: {
    card: '0 1px 2px rgb(43 23 18 / 0.06), 0 10px 30px -14px rgb(43 23 18 / 0.22)',
    float: '0 16px 44px -14px rgb(43 23 18 / 0.4)',
  },
  heroFrame: 'arch',
  motion: { distance: 16, duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
}
