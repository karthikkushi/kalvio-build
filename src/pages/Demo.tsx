import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { cachedPreset, hasPreset, isBusinessKey, loadPreset } from '../data/businesses'
import type { BusinessPreset } from '../data/types'
import { buildDemo } from '../lib/demo'
import { applyMeta } from '../lib/meta'
import { monogramFavicon } from '../lib/monogram'
import { DemoView } from './DemoView'
import NotFound from './NotFound'

/** Shows the page that was hidden while a personalised link waited for JavaScript (see index.html). */
const reveal = () => document.documentElement.classList.remove('kb-wait')

export default function Demo() {
  const { key } = useParams()
  const [sp] = useSearchParams()
  const valid = isBusinessKey(key) && hasPreset(key)
  const [preset, setPreset] = useState<BusinessPreset | null>(() => (valid ? (cachedPreset(key) ?? null) : null))

  useEffect(() => {
    if (!valid) return
    let alive = true
    loadPreset(key).then((p) => alive && setPreset(p))
    return () => {
      alive = false
    }
  }, [key, valid])

  const ctx = useMemo(() => (preset && preset.key === key ? buildDemo(preset, sp, window.location.href) : null), [preset, sp, key])

  useEffect(() => {
    if (!ctx) return
    const { preset: p } = ctx
    applyMeta({
      title: `${ctx.name} | ${p.label} in ${ctx.area}, ${ctx.city}`,
      description: p.description.replace(/\{(\w+)\}/g, (_, k: 'name' | 'area' | 'city') => ctx.vars[k] ?? ''),
      // Samples made for real shops contain demo prices and reviews: keep them out of search results.
      robots: ctx.personalised ? 'noindex, nofollow' : undefined,
      canonical: `${window.location.origin}/demo/${p.key}`,
      icon: monogramFavicon(ctx.monogram, ctx.theme),
      themeColor: ctx.theme.colors.bg,
      image: `${window.location.origin}/og/${p.key}.png`,
      lang: ctx.lang,
    })
  }, [ctx])

  useEffect(() => {
    if (!valid) reveal()
  }, [valid])

  if (!valid) return <NotFound />
  if (!ctx) return <div className="min-h-svh" aria-busy="true" />
  return <DemoView ctx={ctx} onReady={reveal} />
}
