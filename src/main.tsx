import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { isBusinessKey, loadPreset } from './data/businesses'
import { DemoRoute, HomeRoute } from './routes'
import './styles/app.css'

/**
 * /demo pages arrive prerendered (scripts/postbuild.mjs). Load the route and preset first, then render once,
 * so React swaps the static HTML for the live page in a single commit with no blank frame.
 */
async function boot() {
  const demo = /^\/demo\/([\w-]+)\/?$/.exec(location.pathname)
  if (demo) {
    const key = demo[1]
    await Promise.all([DemoRoute.load(), isBusinessKey(key) ? loadPreset(key).catch(() => null) : null])
  } else if (location.pathname === '/') {
    await HomeRoute.load()
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

boot()
