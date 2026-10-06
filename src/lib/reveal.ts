import { useEffect, type RefObject } from 'react'
import type { Theme } from '../themes'

/**
 * Fade/slide in `[data-reveal]` elements as they scroll into view (CSS transition + IntersectionObserver).
 * Progressive enhancement only: nothing is hidden by default CSS, anything on screen at load is never
 * touched, and it is skipped for prefers-reduced-motion, printing and browsers without IntersectionObserver.
 */
export function useReveal(root: RefObject<HTMLElement | null>, motion: Theme['motion'] | null) {
  useEffect(() => {
    const el = root.current
    if (!el || !motion || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.style.setProperty('--rv-distance', `${motion.distance}px`)
    el.style.setProperty('--rv-duration', `${motion.duration}s`)
    el.style.setProperty('--rv-ease', `cubic-bezier(${motion.ease.join(',')})`)

    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    const show = (i: Element) => i.setAttribute('data-reveal', 'shown')
    const seen = new WeakSet<Element>()
    // The observer's first report tells us what is already on screen without forcing a layout:
    // those stay as they are; everything else is armed and revealed when it scrolls in.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const first = !seen.has(e.target)
          seen.add(e.target)
          if (e.isIntersecting) {
            if (!first) show(e.target)
            io.unobserve(e.target)
          } else if (first && e.boundingClientRect.top >= window.innerHeight) {
            e.target.setAttribute('data-reveal', 'pending')
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    for (const i of items) io.observe(i)
    const showAll = () => items.forEach(show)
    window.addEventListener('beforeprint', showAll)
    return () => {
      io.disconnect()
      window.removeEventListener('beforeprint', showAll)
      items.forEach(show)
    }
  }, [root, motion])
}
