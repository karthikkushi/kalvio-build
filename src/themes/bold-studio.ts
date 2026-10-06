import type { Theme } from './types'

/** Energy and confidence: paper white, near-black and one loud orange, chunky grotesk. */
export const boldStudio: Theme = {
  key: 'bold-studio',
  label: 'Bold Studio',
  summary: 'Paper white, near-black and one loud orange with a chunky grotesk. Energetic and confident.',
  mode: 'light',
  fonts: {
    display: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
    body: "'Manrope', ui-sans-serif, system-ui, sans-serif",
    displayWeight: 800,
    displayTracking: '-0.035em',
  },
  colors: {
    bg: '#F3F1EC',
    surface: '#FFFFFF',
    surfaceAlt: '#E7E3DA',
    ink: '#111111',
    muted: '#4A4740',
    line: '#CFC9BC',
    accent: '#FF5A1F',
    onAccent: '#111111',
    accentInk: '#B3360B',
    highlight: '#D9FF3F',
    onHighlight: '#111111',
    scrim: '#0A0A0A',
  },
  radius: { card: '6px', button: '6px', image: '6px', chip: '6px' },
  shadow: {
    card: '0 0 0 1.5px #111111',
    float: '6px 6px 0 0 #111111',
  },
  heroFrame: 'bleed',
  motion: { distance: 24, duration: 0.22, ease: [0.3, 0.9, 0.3, 1] },
}
