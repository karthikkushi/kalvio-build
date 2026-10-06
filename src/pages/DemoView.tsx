import { useEffect, useRef } from 'react'
import { DemoActionsProvider } from '../components/DemoActions'
import { JsonLd } from '../components/JsonLd'
import { DemoContext, type DemoCtx } from '../lib/demo'
import { useReveal } from '../lib/reveal'
import { ActionBar } from '../sections/ActionBar'
import { Closing } from '../sections/Closing'
import { Footer } from '../sections/Footer'
import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { Ribbon } from '../sections/Ribbon'
import { Sections } from '../sections'
import { themeToCss } from '../themes'

/**
 * The whole sample site for one context. Pure: no data loading, safe to render on the server
 * (scripts/prerender) and on the client.
 */
export function DemoView({ ctx, onReady }: { ctx: DemoCtx; onReady?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveal(rootRef, ctx.theme.motion)
  useEffect(() => onReady?.(), [onReady])

  return (
    <DemoContext value={ctx}>
      <style href={`theme-${ctx.theme.key}`} precedence="theme">
        {themeToCss(ctx.theme)}
      </style>
      <div ref={rootRef} data-theme={ctx.theme.key} className="min-h-svh bg-bg font-body text-ink">
        <DemoActionsProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-btn bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Ribbon />
          <Header />
          <main id="main">
            <Hero />
            <Sections sections={ctx.preset.sections} hasOffer={!!ctx.offer} />
            <Closing />
          </main>
          <Footer />
          <ActionBar />
        </DemoActionsProvider>
        <JsonLd ctx={ctx} />
      </div>
    </DemoContext>
  )
}
