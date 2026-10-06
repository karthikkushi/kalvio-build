import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { CATALOG } from '../data/catalog'
import type { BusinessKey } from '../data/types'

const FEATURED: BusinessKey[] = ['dentist', 'salon_beauty', 'gym_fitness', 'jewellery', 'restaurant_cafe', 'clinic', 'bakery_sweets', 'clothing']
const items = FEATURED.map((k) => CATALOG.find((c) => c.key === k)!)

/** A phone showing real sample sites, switching every few seconds (or by tapping a business type). */
export function PhonePreview() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const current = items[i]

  useEffect(() => {
    if (paused || reduce) return
    const t = window.setTimeout(() => setI((n) => (n + 1) % items.length), 3200)
    return () => window.clearTimeout(t)
  }, [i, paused, reduce])

  return (
    <div
      className="flex flex-col items-center gap-5"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[560/1212] w-[min(68vw,280px)] rounded-[44px] bg-[#0b0a12] p-2.5 shadow-[0_40px_80px_-30px_rgb(91_69_224/0.6),inset_0_0_0_1.5px_rgb(255_255_255/0.12)] lg:w-[300px]">
        <div className="relative size-full overflow-hidden rounded-[36px] bg-[#1d1a2b]">
          <LazyMotion features={domAnimation} strict>
            <AnimatePresence initial={false}>
              <m.img
                key={current.key}
                src={`/previews/${current.key}.webp`}
                width={560}
                height={1212}
                alt={`Sample website for a ${current.label.toLowerCase()}: ${current.demoName}`}
                className="absolute inset-0 size-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                decoding="async"
              />
            </AnimatePresence>
          </LazyMotion>
        </div>
      </div>

      <div className="w-full max-w-md">
        <p id="preview-label" className="mb-3 text-center text-sm text-white/70">
          Real samples. Tap a business:
        </p>
        <ul className="flex flex-wrap justify-center gap-2" aria-labelledby="preview-label">
          {items.map((c, n) => (
            <li key={c.key}>
              <button
                type="button"
                aria-pressed={n === i}
                onClick={() => {
                  setI(n)
                  setPaused(true)
                }}
                className={`min-h-10 rounded-full px-3.5 text-sm font-semibold transition-colors ${
                  n === i ? 'bg-[#c9c3ff] text-[#14121f]' : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                {c.chip}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center">
          <Link to={`/demo/${current.key}`} className="inline-flex min-h-11 items-center gap-1 font-semibold text-[#c9c3ff] underline underline-offset-4">
            Open the {current.chip.toLowerCase()} sample <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </p>
      </div>
      {/* Warm the cache for the next image so the switch is instant. */}
      <link rel="prefetch" as="image" href={`/previews/${items[(i + 1) % items.length].key}.webp`} />
    </div>
  )
}
