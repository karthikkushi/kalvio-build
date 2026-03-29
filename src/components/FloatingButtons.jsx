import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FloatingButtons({ styleName }) {
  const navigate = useNavigate()
  const waNumber = import.meta.env.VITE_WA_NUMBER

  const handleWA = () => {
    localStorage.setItem('kalvio_selected_style', styleName)
    const msg = encodeURIComponent(
      `Hello Kalvio Build! 👋\n\nI visited your ${styleName} sample website and I love the style.\n\nI want a similar website for my business.\n\nPlease contact me with a quote!`
    )
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999]">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleWA}
        className="px-5 py-3 bg-green-500 text-white font-bold rounded-full flex items-center gap-2 text-sm font-body"
        style={{ boxShadow: '0 8px 24px rgba(0,217,126,0.35)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        💬 I want this style
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/styles')}
        className="px-5 py-3 bg-white text-purple-700 font-bold rounded-full border-2 border-purple-300 text-sm"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
      >
        ← See all styles
      </motion.button>
    </div>
  )
}
