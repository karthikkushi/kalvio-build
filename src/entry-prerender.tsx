/**
 * Server entry used only at build time (see package.json "build" and scripts/postbuild.mjs).
 * Renders every business in every theme to static HTML, so the first screen paints before JavaScript.
 */
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import type { BusinessPreset } from './data/types'
import { buildDemo } from './lib/demo'
import { stockImage } from './lib/stock'
import { DemoView } from './pages/DemoView'
import Landing from './pages/Landing'
import { THEME_KEYS, THEMES } from './themes'

const modules = import.meta.glob<Record<string, BusinessPreset>>('./data/businesses/*.ts', { eager: true })

export const presets: BusinessPreset[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('/index.ts'))
  .map(([path, mod]) => mod[path.match(/\/(\w+)\.ts$/)![1]])

export const themeKeys = THEME_KEYS

export function render(preset: BusinessPreset, themeKey: (typeof THEME_KEYS)[number], origin: string) {
  const ctx = buildDemo(preset, new URLSearchParams({ theme: themeKey }), `${origin}/demo/${preset.key}`)
  // The seasonal banner is left to the browser so a stale build never shows last month's offer.
  ctx.offer = null
  const html = renderToString(<DemoView ctx={ctx} />)
  const hero = stockImage(preset.key, preset.hero.image)
  const theme = THEMES[themeKey]
  return {
    html,
    title: `${ctx.name} | ${preset.label} in ${ctx.area}, ${ctx.city}`,
    description: preset.description.replace(/\{(\w+)\}/g, (_, k: 'name' | 'area' | 'city') => ctx.vars[k]),
    hero,
    themeColor: theme.colors.bg,
    displayFont: theme.fonts.display,
    displayWeight: theme.fonts.displayWeight,
  }
}

/** The agency landing page, prerendered into dist/index.html. */
export function renderLanding() {
  return renderToString(
    <MemoryRouter initialEntries={['/']}>
      <Landing />
    </MemoryRouter>,
  )
}

/** What the edge function needs to personalise a page, keyed by business. */
export function defaults() {
  return Object.fromEntries(
    presets.map((p) => [
      p.key,
      {
        label: p.label,
        region: p.region,
        theme: p.defaultTheme,
        description: p.description,
        name: p.demo.name,
        area: p.demo.area,
        city: p.demo.city,
      },
    ]),
  )
}
