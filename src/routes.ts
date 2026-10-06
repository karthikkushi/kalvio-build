import { preloadable } from './lib/preloadable'

export const HomeRoute = preloadable(() => import('./pages/Landing'))
export const DemoRoute = preloadable(() => import('./pages/Demo'))
export const ShareRoute = preloadable(() => import('./pages/Share'))
export const NotFoundRoute = preloadable(() => import('./pages/NotFound'))
