import type { Theme } from './types'

/** Premium and quiet: deep green-black, champagne gold and an elegant serif. */
export const luxeDark: Theme = {
  key: 'luxe-dark',
  label: 'Luxe Dark',
  summary: 'Deep green-black, champagne gold and an elegant serif. Quiet luxury for big-ticket buys.',
  mode: 'dark',
  fonts: {
    display: "'Instrument Serif', ui-serif, Georgia, serif",
    body: "'Manrope', ui-sans-serif, system-ui, sans-serif",
    displayWeight: 400,
    displayTracking: '-0.01em',
  },
  colors: {
    bg: '#0E1311',
    surface: '#161D1A',
    surfaceAlt: '#121916',
    ink: '#F3EEE4',
    muted: '#B9B2A4',
    line: '#2B3531',
    accent: '#D9B66B',
    onAccent: '#15110A',
    accentInk: '#E3C482',
    highlight: '#D9B66B',
    onHighlight: '#15110A',
    scrim: '#050807',
  },
  radius: { card: '4px', button: '2px', image: '2px', chip: '2px' },
  shadow: {
    card: '0 0 0 1px #2B3531',
    float: '0 24px 60px -20px rgb(0 0 0 / 0.7)',
  },
  heroFrame: 'bleed',
  motion: { distance: 10, duration: 0.3, ease: [0.2, 0.6, 0.2, 1] },
}
