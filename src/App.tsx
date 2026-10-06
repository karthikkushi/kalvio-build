import { Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { DemoRoute, HomeRoute, NotFoundRoute, ShareRoute } from './routes'

const Home = HomeRoute.Component
const Demo = DemoRoute.Component
const NotFound = NotFoundRoute.Component
const Share = ShareRoute.Component

/** The 2025 site's style pages, mapped to the closest business + theme. Also done as 301s in vercel.json. */
const OLD_STYLES: Record<string, string> = {
  glassmorphism: '/demo/dermatologist?theme=clean-clinical',
  skeuomorphism: '/demo/restaurant_cafe?theme=fresh-local',
  'neo-brutalism': '/demo/gym_fitness?theme=bold-studio',
  claymorphism: '/demo/vet?theme=soft-friendly',
  minimalism: '/demo/clinic?theme=clean-clinical',
  'liquid-glass': '/demo/salon_beauty?theme=luxe-dark',
}

function OldStyle() {
  const { style = '' } = useParams()
  return <Navigate to={OLD_STYLES[style] ?? '/#samples'} replace />
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-svh" aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/:key" element={<Demo />} />
        <Route path="/share" element={<Share />} />
        <Route path="/styles" element={<Navigate to="/#samples" replace />} />
        <Route path="/styles/:style" element={<OldStyle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
