import { describe, expect, it } from 'vitest'
import { contrast } from '../lib/contrast'
import { THEMES } from './index'
import { kalvio } from './kalvio'

// Every text/background pair the sections use. AA = 4.5:1 for body text, 3:1 for UI parts.
const TEXT_PAIRS = [
  ['ink', 'bg'],
  ['ink', 'surface'],
  ['ink', 'surfaceAlt'],
  ['muted', 'bg'],
  ['muted', 'surface'],
  ['muted', 'surfaceAlt'],
  ['accentInk', 'bg'],
  ['accentInk', 'surface'],
  ['accentInk', 'surfaceAlt'],
  ['onAccent', 'accent'],
  ['onHighlight', 'highlight'],
] as const

describe.each([...Object.values(THEMES), kalvio])('theme $key', (theme) => {
  it.each(TEXT_PAIRS)('%s on %s meets WCAG AA (4.5:1)', (fg, bg) => {
    const ratio = contrast(theme.colors[fg], theme.colors[bg])
    expect(ratio, `${theme.key}: ${fg} ${theme.colors[fg]} on ${bg} ${theme.colors[bg]}`).toBeGreaterThanOrEqual(4.5)
  })

  it('white text on the photo scrim meets AA', () => {
    expect(contrast('#FFFFFF', theme.colors.scrim)).toBeGreaterThanOrEqual(4.5)
  })

  it('primary button is distinguishable from the page (3:1 non-text)', () => {
    const ratio = Math.max(contrast(theme.colors.accent, theme.colors.bg), contrast(theme.colors.onAccent, theme.colors.bg))
    expect(ratio).toBeGreaterThanOrEqual(3)
  })

  it('motion stays at or under 300 ms', () => {
    expect(theme.motion.duration).toBeLessThanOrEqual(0.3)
  })
})
