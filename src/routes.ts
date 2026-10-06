import { preloadable } from './lib/preloadable'

export const HomeRoute = preloadable(() => import('./pages/Landing'))
export const DemoRoute = preloadable(() => import('./pages/Demo'))
export const NotFoundRoute = preloadable(() => import('./pages/NotFound'))
