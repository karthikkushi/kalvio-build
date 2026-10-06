import type { Theme } from './types'

/** Health businesses sell trust and hygiene: airy white, one calm teal, crisp sans. */
export const cleanClinical: Theme = {
  key: 'clean-clinical',
  label: 'Clean Clinical',
  summary: 'Airy white, one calm teal and a crisp sans. Reads as hygienic and trustworthy.',
  mode: 'light',
  fonts: {
    display: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    body: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    displayWeight: 700,
    displayTracking: '-0.025em',
  },
  colors: {
    bg: '#F6F9FA',
    surface: '#FFFFFF',
    surfaceAlt: '#EAF2F4',
    ink: '#0F2530',
    muted: '#475C66',
    line: '#D3E0E5',
    accent: '#0B6B76',
    onAccent: '#FFFFFF',
    accentInk: '#0A6370',
    highlight: '#FFD27A',
    onHighlight: '#2B1D00',
    scrim: '#06161D',
  },
  radius: { card: '20px', button: '14px', image: '24px', chip: '999px' },
  shadow: {
    card: '0 1px 2px rgb(15 37 48 / 0.06), 0 8px 24px -12px rgb(15 37 48 / 0.18)',
    float: '0 12px 40px -12px rgb(15 37 48 / 0.35)',
  },
  heroFrame: 'inset',
  motion: { distance: 12, duration: 0.26, ease: [0.2, 0.7, 0.2, 1] },
}
