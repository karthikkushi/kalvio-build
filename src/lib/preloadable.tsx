import { lazy, type ComponentType } from 'react'

/**
 * React.lazy that can be loaded ahead of the first render. Once `load()` has resolved, the component renders
 * synchronously, so React can replace prerendered HTML in a single commit instead of flashing a fallback.
 */
export function preloadable<P extends object>(factory: () => Promise<{ default: ComponentType<P> }>) {
  let loaded: ComponentType<P> | null = null
  const load = () =>
    factory().then((m) => {
      loaded = m.default
      return m
    })
  const Lazy = lazy(load)
  function Component(props: P) {
    const C = loaded ?? Lazy
    return <C {...props} />
  }
  return { Component, load }
}
