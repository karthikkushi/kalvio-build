import type { Theme } from './types'

/** Lively and local: warm white, leaf green and turmeric, a friendly geometric sans. */
export const freshLocal: Theme = {
  key: 'fresh-local',
  label: 'Fresh Local',
  summary: 'Warm white, leaf green and turmeric with a friendly geometric sans. Lively for food and services.',
  mode: 'light',
  fonts: {
    display: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    body: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    displayWeight: 700,
    displayTracking: '-0.025em',
  },
  colors: {
    bg: '#FCFBF6',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF4E8',
    ink: '#16251A',
    muted: '#4A594D',
    line: '#D8E3D1',
    accent: '#1E7539',
    onAccent: '#FFFFFF',
    accentInk: '#1C6D35',
    highlight: '#F6B42C',
    onHighlight: '#231800',
    scrim: '#08130B',
  },
  radius: { card: '16px', button: '12px', image: '20px', chip: '999px' },
  shadow: {
    card: '0 1px 2px rgb(22 37 26 / 0.06), 0 10px 26px -14px rgb(22 37 26 / 0.22)',
    float: '0 14px 36px -12px rgb(22 37 26 / 0.38)',
  },
  heroFrame: 'inset',
  motion: { distance: 12, duration: 0.24, ease: [0.2, 0.7, 0.2, 1] },
}
