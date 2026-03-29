import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Selector from './pages/Selector'
import Glassmorphism from './pages/Glassmorphism'
import Skeuomorphism from './pages/Skeuomorphism'
import NeoBrutalism from './pages/NeoBrutalism'
import Claymorphism from './pages/Claymorphism'
import Minimalism from './pages/Minimalism'
import LiquidGlass from './pages/LiquidGlass'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/styles" element={<Selector />} />
      <Route path="/styles/glassmorphism" element={<Glassmorphism />} />
      <Route path="/styles/skeuomorphism" element={<Skeuomorphism />} />
      <Route path="/styles/neo-brutalism" element={<NeoBrutalism />} />
      <Route path="/styles/claymorphism" element={<Claymorphism />} />
      <Route path="/styles/minimalism" element={<Minimalism />} />
      <Route path="/styles/liquid-glass" element={<LiquidGlass />} />
    </Routes>
  )
}
