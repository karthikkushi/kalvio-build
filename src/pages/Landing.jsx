import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'

/* ── Cursor pixel trail ──────────────────────────────────── */
function CursorPixels() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mouse = useRef({ x: -999, y: -999 })
  const raf = useRef(null)
  const lastPos = useRef({ x: -999, y: -999 })

  const COLORS = [
    'rgba(124,111,255,',   // brand purple
    'rgba(168,159,255,',   // light purple
    'rgba(0,217,126,',     // brand green
    'rgba(255,107,157,',   // pink
    'rgba(255,255,255,',   // white
    'rgba(90,77,232,',     // deep purple
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      mouse.current = { x: e.clientX, y: e.clientY }
      lastPos.current = { x: e.clientX, y: e.clientY }

      // Spawn particles based on speed — faster = more pixels
      const count = Math.min(Math.floor(dist * 0.6) + 1, 8)
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        const size = Math.random() * 3 + 1.5
        // Scatter slightly around cursor
        const scatter = 6
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * scatter,
          y: e.clientY + (Math.random() - 0.5) * scatter,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.4,
          size,
          alpha: 0.85 + Math.random() * 0.15,
          decay: 0.018 + Math.random() * 0.022,
          color,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
        })
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.alpha > 0.02)

      for (const p of particles.current) {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        // Draw a small square pixel with glow
        ctx.globalAlpha = p.alpha
        ctx.shadowColor = p.color + '1)'
        ctx.shadowBlur = p.size * 3
        ctx.fillStyle = p.color + p.alpha + ')'
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)

        ctx.restore()

        // Update
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.025          // subtle gravity
        p.vx *= 0.97           // friction
        p.alpha -= p.decay
        p.size *= 0.97
        p.rotation += p.rotSpeed
      }

      raf.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
      }}
    />
  )
}

function useCountUp(target, duration=1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const start = () => {
    if (started) return
    setStarted(true)
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  return [count, start]
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] } }
})

const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const styles = [
  {
    name: 'Glassmorphism', route: '/styles/glassmorphism',
    desc: 'Frosted glass effect, premium and modern',
    tags: ['Clinics', 'Salons', 'Spas'],
    preview: (
      <div style={{ height: 220, background: 'linear-gradient(135deg, #1a0060 0%, #0d1a60 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:-30, left:-20, width:120, height:120, borderRadius:'50%', background:'rgba(150,100,255,0.5)', filter:'blur(30px)' }} />
        <div style={{ position:'absolute', bottom:-20, right:-10, width:100, height:100, borderRadius:'50%', background:'rgba(255,100,200,0.4)', filter:'blur(25px)' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:160, padding:16, backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.20)', borderRadius:16 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,rgba(120,100,255,0.6),rgba(200,100,255,0.6))', marginBottom:10 }} />
          <div style={{ height:6, background:'rgba(255,255,255,0.20)', borderRadius:3, marginBottom:6 }} />
          <div style={{ height:6, width:'65%', background:'rgba(255,255,255,0.12)', borderRadius:3, marginBottom:10 }} />
          <div style={{ height:26, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.20)', borderRadius:8 }} />
        </div>
      </div>
    )
  },
  {
    name: 'Skeuomorphism', route: '/styles/skeuomorphism',
    desc: 'Real-world textures, trustworthy and classic',
    tags: ['Restaurants', 'Cafes', 'Shops'],
    preview: (
      <div style={{ height:220, background:'#1a0e06', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
        <div style={{ width:165, background:'linear-gradient(145deg,#3d2510,#241508)', borderRadius:12, padding:14, boxShadow:'inset 0 1px 0 rgba(255,220,100,0.15), 0 8px 24px rgba(0,0,0,0.8)', border:'1px solid rgba(255,180,50,0.10)' }}>
          <div style={{ height:5, width:'55%', background:'rgba(200,134,10,0.4)', borderRadius:2, marginBottom:10 }} />
          <div style={{ height:24, background:'linear-gradient(145deg,#1a1008,#251808)', borderRadius:6, boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', marginBottom:6, border:'1px solid rgba(0,0,0,0.4)' }} />
          <div style={{ height:24, background:'linear-gradient(145deg,#1a1008,#251808)', borderRadius:6, boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', marginBottom:8, border:'1px solid rgba(0,0,0,0.4)' }} />
          <div style={{ height:30, background:'linear-gradient(145deg,#c8860a,#a06a05)', borderRadius:8, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 8px rgba(0,0,0,0.4)' }} />
        </div>
      </div>
    )
  },
  {
    name: 'Neo Brutalism', route: '/styles/neo-brutalism',
    desc: 'Bold, raw, high contrast — impossible to ignore',
    tags: ['Gyms', 'Bike shops', 'Bold brands'],
    preview: (
      <div style={{ height:220, background:'#f0ebe0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:160, background:'white', border:'3px solid #0a0a0a', borderRadius:4, padding:12, boxShadow:'7px 7px 0px #0a0a0a' }}>
          <div style={{ height:22, background:'#ffe600', border:'2px solid #0a0a0a', borderRadius:2, marginBottom:8 }} />
          <div style={{ height:6, background:'#0a0a0a', borderRadius:1, marginBottom:5 }} />
          <div style={{ height:4, width:'65%', background:'rgba(0,0,0,0.2)', borderRadius:1, marginBottom:8 }} />
          <div style={{ height:26, background:'#0a0a0a', borderRadius:2, boxShadow:'4px 4px 0 #ff3300' }} />
        </div>
      </div>
    )
  },
  {
    name: 'Claymorphism', route: '/styles/claymorphism',
    desc: 'Puffy 3D shapes, friendly and approachable',
    tags: ['Pet shops', 'Cafes', 'Kids'],
    preview: (
      <div style={{ height:220, background:'linear-gradient(135deg,#ffe8f5,#e8f0ff,#e8fff5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:160, background:'white', borderRadius:28, padding:14, boxShadow:'0 8px 0 rgba(180,140,220,0.40), 0 16px 32px rgba(150,100,200,0.20), inset 0 2px 0 rgba(255,255,255,0.90)' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#c084fc,#818cf8)', boxShadow:'0 6px 0 rgba(130,80,200,0.3), inset 0 2px 0 rgba(255,255,255,0.4)', margin:'0 auto 10px' }} />
          <div style={{ height:8, borderRadius:8, background:'linear-gradient(90deg,#f0e8ff,#e8eeff)', marginBottom:6, boxShadow:'0 2px 0 rgba(180,160,230,0.2)' }} />
          <div style={{ height:8, width:'65%', borderRadius:8, background:'linear-gradient(90deg,#ffe8f8,#ffe8d0)', marginBottom:10, boxShadow:'0 2px 0 rgba(230,160,160,0.2)' }} />
          <div style={{ height:30, borderRadius:16, background:'linear-gradient(135deg,#c084fc,#818cf8)', boxShadow:'0 5px 0 rgba(130,80,200,0.35), inset 0 2px 0 rgba(255,255,255,0.30)' }} />
        </div>
      </div>
    )
  },
  {
    name: 'Minimalism', route: '/styles/minimalism',
    desc: 'Clean white space, sharp on every screen',
    tags: ['Doctors', 'Lawyers', 'Consultants'],
    preview: (
      <div style={{ height:220, background:'#fafaf8', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:160, padding:16 }}>
          <div style={{ width:18, height:18, background:'#0a0a0a', borderRadius:3, marginBottom:16 }} />
          <div style={{ height:3, width:'80%', background:'#0a0a0a', borderRadius:2, marginBottom:10 }} />
          <div style={{ height:1.5, background:'rgba(0,0,0,0.12)', borderRadius:1, marginBottom:6 }} />
          <div style={{ height:1.5, width:'60%', background:'rgba(0,0,0,0.08)', borderRadius:1, marginBottom:10 }} />
          <div style={{ height:1, background:'rgba(0,0,0,0.08)', marginBottom:12 }} />
          <div style={{ height:26, width:80, border:'1.5px solid #0a0a0a', borderRadius:3, background:'white' }} />
        </div>
      </div>
    )
  },
  {
    name: 'Liquid Glass', route: '/styles/liquid-glass',
    desc: 'Futuristic Apple Vision Pro style, ultra premium',
    tags: ['Luxury spas', 'High-end clinics', 'Tech'],
    preview: (
      <div style={{ height:220, background:'linear-gradient(135deg,#000510,#001030,#050010)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'conic-gradient(from 0deg, rgba(0,212,255,0.15), rgba(180,0,255,0.15), rgba(0,255,180,0.15), rgba(0,212,255,0.15))', filter:'blur(40px)', animation:'rotate-blob 20s linear infinite' }} />
        <div style={{ position:'relative', zIndex:1, width:160, padding:14, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, boxShadow:'inset 0 0 30px rgba(255,255,255,0.03)' }}>
          <div style={{ height:4, borderRadius:2, background:'linear-gradient(90deg,#00d4ff,#b400ff,#00ffb4)', marginBottom:10 }} />
          <div style={{ height:6, background:'rgba(255,255,255,0.08)', borderRadius:3, marginBottom:5 }} />
          <div style={{ height:6, width:'60%', background:'rgba(255,255,255,0.05)', borderRadius:3, marginBottom:10 }} />
          <div style={{ display:'flex', gap:6 }}>
            {['rgba(0,212,255,0.20)','rgba(180,0,255,0.20)','rgba(0,255,180,0.20)'].map((bg, i) => (
              <div key={i} style={{ width:22, height:22, borderRadius:'50%', background:bg, border:'1px solid rgba(255,255,255,0.15)' }} />
            ))}
          </div>
        </div>
      </div>
    )
  },
]

const features = [
  { emoji: '📱', title: 'Mobile First', desc: 'Every website works perfectly on all phones. 80% of your customers browse on mobile.', grad: 'linear-gradient(135deg,#7c6fff,#9b6fff)' },
  { emoji: '💬', title: 'WhatsApp Support', desc: 'All communication on WhatsApp. No emails, no calls, no confusion. Fast and simple.', grad: 'linear-gradient(135deg,#00b377,#00d97e)' },
  { emoji: '⚡', title: '5 Day Delivery', desc: 'Complete website delivered in 3 to 5 working days. No long waits, no delays.', grad: 'linear-gradient(135deg,#f59e0b,#ef6c00)' },
  { emoji: '✅', title: 'Pay After Approval', desc: 'See the finished website first. Pay only after you are fully happy. Zero risk.', grad: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' },
  { emoji: '🇮🇳', title: 'India Focused', desc: 'We understand Indian customers, UPI payments, Hindi/English content and local SEO.', grad: 'linear-gradient(135deg,#f97316,#ea580c)' },
  { emoji: '🔧', title: 'Ongoing Support', desc: 'We stay available on WhatsApp after delivery. Updates and fixes handled quickly.', grad: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
]

const faqs = [
  { q: 'Do I need to pay anything upfront?', a: 'No. We show you the complete finished website design before taking any payment. You pay 50% only after you approve the design, and the remaining 50% when the website goes live.' },
  { q: "I don't know anything about websites. Can you still help?", a: "Absolutely. You don't need any technical knowledge. Just tell us what your business does, share some photos, and we handle everything. All on WhatsApp in English or Hindi." },
  { q: 'Will my website work on iPhones and Android phones?', a: 'Yes. Every website we build is mobile-first — designed for phones first, then for desktop. It works perfectly on all phones, tablets and computers.' },
  { q: 'Do you handle website maintenance after delivery?', a: 'Yes. Small text changes are free for 30 days after delivery. For ongoing maintenance, we charge ₹500 per month which includes updates, backups and support.' },
  { q: 'Is GST included in the pricing?', a: 'Our prices are exclusive of GST. 18% GST will be added for businesses that require a GST invoice. For individuals, no GST is charged.' },
]

const marqueeItems = [
  '🏥 Dr. Meera Clinic', '🐾 Pawsome Pet Shop', '🏋️ IronForge Gym', '☕ The Local Brew',
  '🧵 Saree Palace', '🛠️ FixIt Services', '💇 Style Studio Salon', '🦷 SmileCare Dental',
  '🍜 Spice Route Dhaba', '🚴 Wheelhouse Bikes', '🌿 Ayur Wellness', '🎓 Bright Minds Academy',
]

export default function Landing() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [stat73, start73] = useCountUp(73)
  const [stat2, start2] = useCountUp(2)

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#080810', minHeight: '100vh', color: '#e4e1ed' }}>
      <CursorPixels />
      {/* Scroll progress bar */}
      <motion.div style={{ scaleX, transformOrigin:'left', position:'fixed', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#7c6fff,#00d97e)', zIndex:9999 }} />
      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:'-10%', right:'-10%', width:500, height:500, borderRadius:'50%', background:'#7c6fff', filter:'blur(120px)', opacity:0.15 }} />
        <div style={{ position:'absolute', bottom:'20%', left:'-10%', width:400, height:400, borderRadius:'50%', background:'#ff6b9d', filter:'blur(120px)', opacity:0.10 }} />
        <div style={{ position:'absolute', top:'40%', left:'30%', width:300, height:300, borderRadius:'50%', background:'#04da7f', filter:'blur(100px)', opacity:0.08 }} />
      </div>
      <div className="noise-overlay" />
      <div className="grid-pattern" style={{ position: 'fixed' }} />

      {/* NAV */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-3 md:px-12 md:py-4 flex items-center justify-between"
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, background:'rgba(8,8,16,0.80)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="text-[16px] md:text-[20px] whitespace-nowrap" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, color:'white', cursor:'pointer' }} onClick={() => navigate('/')}>
          Kalvio <span style={{ textDecoration:'underline', textDecorationColor:'#7c6fff', textUnderlineOffset:4 }}>Build</span>
        </span>
        <div style={{ display:'flex', gap:32 }} className="hidden md:flex">
          {['Work','Services','Pricing','Contact'].map(link => (
            <span key={link} style={{ color:'rgba(228,225,237,0.55)', fontSize:14, cursor:'pointer', transition:'color 200ms', fontFamily:"'Plus Jakarta Sans',sans-serif" }}
              onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(228,225,237,0.55)'}>
              {link}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <motion.button
            className="hidden md:block"
            whileHover={{ background:'rgba(124,111,255,0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/styles')}
            style={{ background:'rgba(124,111,255,0.15)', border:'1px solid rgba(124,111,255,0.40)', color:'#a89fff', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14, borderRadius:9999, padding:'8px 20px', cursor:'pointer' }}
          >
            Get Started →
          </motion.button>
          <svg className="md:hidden" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="pt-20 md:pt-[100px] pb-14 px-4 md:px-6" style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:48 }}>
          <div style={{ maxWidth:700 }}>
            <motion.div {...fadeUp(0.1)}>
              <motion.span animate={{ y:[0,-4,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
                style={{ display:'inline-block', background:'rgba(124,111,255,0.08)', border:'1px solid rgba(124,111,255,0.25)', borderRadius:9999, padding:'6px 16px', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#a89fff', marginBottom:28 }}>
                ✦ WEBSITES FOR INDIAN BUSINESSES
              </motion.span>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="text-gradient"
              style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(36px,6vw,72px)', lineHeight:1.05, letterSpacing:-2, marginBottom:24 }}>
              Your business deserves a website that actually works.
            </motion.h1>

            <motion.p {...fadeUp(0.3)} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300, fontSize:18, color:'rgba(228,225,237,0.55)', lineHeight:1.7, maxWidth:520, marginBottom:40 }}>
              We build stunning, fast websites for clinics, gyms, and local shops... starting at just ₹3,000.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 mb-7">
              <motion.button
                className="w-full sm:w-auto"
                animate={{ boxShadow:['0 0 30px rgba(124,111,255,0.25)','0 0 50px rgba(124,111,255,0.45)','0 0 30px rgba(124,111,255,0.25)'] }}
                transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
                whileHover={{ y:-3, scale:1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/styles')}
                style={{ background:'linear-gradient(135deg,#7c6fff,#5a4de8)', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:16, padding:'18px 32px', borderRadius:14, border:'none', cursor:'pointer', boxShadow:'0 0 40px rgba(124,111,255,0.30)' }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="w-full sm:w-auto"
                whileHover={{ borderColor:'rgba(255,255,255,0.30)', color:'white' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/styles')}
                style={{ background:'transparent', color:'rgba(228,225,237,0.70)', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:16, padding:'18px 32px', borderRadius:14, border:'1px solid rgba(255,255,255,0.15)', cursor:'pointer' }}
              >
                View Our Styles →
              </motion.button>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="flex flex-col md:flex-row gap-2 md:gap-5">
              {['No advance payment', 'Ready in 5 days', '100% satisfaction'].map(t => (
                <span key={t} style={{ display:'flex', alignItems:'center', gap:6, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'rgba(228,225,237,0.30)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:14, color:'#00d97e', fontVariationSettings:"'FILL' 1" }}>check_circle</span>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Decorative preview cards */}
          <motion.div initial="hidden" animate="show"
            variants={{ hidden:{opacity:0}, show:{opacity:1,transition:{staggerChildren:0.15,delayChildren:0.6}} }}
            className="hidden md:flex"
            style={{ gap:16, alignItems:'flex-end', justifyContent:'center', marginTop:20 }}>
            {[
              { label: 'Glassmorphism', rot: -3, floatDelay: 0, bg: 'linear-gradient(135deg,#1a0060,#0d1a60)', inner: <div style={{height:'100%', display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:80,padding:8,background:'rgba(255,255,255,0.10)',border:'1px solid rgba(255,255,255,0.20)',borderRadius:8,backdropFilter:'blur(8px)'}}><div style={{width:20,height:20,borderRadius:'50%',background:'rgba(120,100,255,0.6)',marginBottom:6}}/><div style={{height:4,background:'rgba(255,255,255,0.3)',borderRadius:2,marginBottom:4}}/><div style={{height:4,width:'65%',background:'rgba(255,255,255,0.15)',borderRadius:2}}/></div></div> },
              { label: 'Neo Brutalism', rot: 0, floatDelay: 0.5, bg: '#f0ebe0', inner: <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:80,background:'white',border:'2px solid #0a0a0a',padding:8,boxShadow:'4px 4px 0 #0a0a0a'}}><div style={{height:12,background:'#ffe600',border:'1.5px solid #0a0a0a',marginBottom:5}}/><div style={{height:3,background:'#0a0a0a',marginBottom:3}}/><div style={{height:3,width:'65%',background:'rgba(0,0,0,0.3)',marginBottom:6}}/><div style={{height:14,background:'#0a0a0a',boxShadow:'3px 3px 0 #ff3300'}}/></div></div> },
              { label: 'Minimalism', rot: 3, floatDelay: 1, bg: '#fafaf8', inner: <div style={{height:'100%',display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:14}}><div style={{width:80}}><div style={{width:10,height:10,background:'#0a0a0a',borderRadius:1,marginBottom:8}}/><div style={{height:2,background:'#0a0a0a',borderRadius:1,marginBottom:6}}/><div style={{height:1,background:'rgba(0,0,0,0.15)',marginBottom:4}}/><div style={{height:1,width:'60%',background:'rgba(0,0,0,0.10)',marginBottom:8}}/><div style={{height:1,background:'rgba(0,0,0,0.08)',marginBottom:8}}/><div style={{height:14,width:50,border:'1px solid #0a0a0a',borderRadius:2,background:'white'}}/></div></div> },
            ].map(({ label, rot, bg, inner, floatDelay }) => (
              <motion.div key={label}
                variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:0.6,type:'spring'}} }}
                animate={{ y:[0,-6,0] }}
                transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut', delay:floatDelay }}
                style={{ transform:`rotate(${rot}deg)`, background:bg, width:140, height:90, borderRadius:12, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.40)', border:'1px solid rgba(255,255,255,0.06)', flexShrink:0, position:'relative' }}>
                {inner}
                <div style={{ position:'absolute', bottom:6, left:0, right:0, textAlign:'center', fontSize:9, fontFamily:"'Plus Jakarta Sans',sans-serif", color:'rgba(150,150,150,0.8)', letterSpacing:'0.05em' }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section style={{ background:'#13131b', borderTop:'1px solid rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.04)', padding:'40px 0', position:'relative', zIndex:1, overflow:'hidden' }}>
        <p style={{ textAlign:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize:11, letterSpacing:'0.10em', textTransform:'uppercase', color:'rgba(228,225,237,0.25)', marginBottom:20 }}>
          Trusted by businesses across India
        </p>
        <div className="marquee-container">
          <div className="marquee-content" style={{ display:'inline-flex', gap:32, paddingRight:32 }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-base md:text-[18px]" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, color:'rgba(228,225,237,0.30)', cursor:'default', transition:'color 200ms', whiteSpace:'nowrap' }}
                onMouseEnter={e => e.target.style.color='rgba(228,225,237,0.90)'}
                onMouseLeave={e => e.target.style.color='rgba(228,225,237,0.30)'}>
                {item}
                {i < [...marqueeItems,...marqueeItems].length - 1 && <span style={{ marginLeft:32, color:'rgba(124,111,255,0.35)' }}>✦</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <motion.section {...scrollReveal} className="py-16 md:py-[72px] px-4 md:px-6" style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#ff6b9d', marginBottom:16 }}>THE REALITY</p>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'clamp(32px,4vw,48px)', color:'#e4e1ed', marginBottom:60 }}>Your competitor already has a website.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { display: `${stat73}%`, startFn: start73, text: 'of customers search online before visiting a local shop', gradient: true },
            { display: `${stat2}×`, startFn: start2, text: 'more trust for businesses with a professional website', gradient: true },
            { display: '₹0', startFn: ()=>{}, text: 'cost to start — we only take payment after you approve', color: '#00d97e' },
          ].map(({ display, startFn, text, gradient, color }) => (
            <motion.div key={text} {...scrollReveal} onViewportEnter={startFn} className="glass-card" style={{ borderRadius:16, padding:32 }}>
              <div className={`text-[40px] md:text-[56px] ${gradient ? 'text-gradient' : ''}`} style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, color:color||undefined, marginBottom:12 }}>{display}</div>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:'rgba(228,225,237,0.55)', lineHeight:1.6 }}>{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...scrollReveal} className="glass-card" style={{ borderRadius:20, padding:32 }}>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:16, color:'#e4e1ed', marginBottom:20 }}>Without a website, you are invisible to:</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:10, marginBottom:24 }}>
            {['Google searches in your area', 'Customers who moved to your city', 'People who ask "do you have a website?"', 'Online appointment customers', 'Young customers under 35'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.55)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:18, color:'#ffb4ab', fontVariationSettings:"'FILL' 0" }}>cancel</span>{item}
              </div>
            ))}
          </div>
          <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:24 }} />
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:16, color:'#00d97e', marginBottom:16 }}>With Kalvio Build you get:</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:10 }}>
            {['A beautiful website in 5 days', 'Mobile-first responsive design', 'WhatsApp button for instant leads', 'Google Maps integration', 'Ongoing WhatsApp support'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.70)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:18, color:'#45f798', fontVariationSettings:"'FILL' 1" }}>check_circle</span>{item}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* STYLE SELECTOR PREVIEW */}
      <motion.section {...scrollReveal} className="py-16 md:py-[72px] px-4 md:px-6" style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#7c6fff', marginBottom:16 }}>PICK YOUR STYLE</p>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,52px)', marginBottom:16 }}>
            Choose how your website<br />
            should <span className="text-gradient">look and feel</span>
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:17, color:'rgba(228,225,237,0.55)', maxWidth:600, margin:'0 auto' }}>
            Click any style to see a full live preview — a complete fake business website in that style.
          </p>
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}
          className="style-cards-grid"
        >
          {styles.map(style => (
            <motion.div key={style.name}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)' }}
              onClick={() => {
                localStorage.setItem('kalvio_selected_style', style.name)
                navigate(style.route)
              }}
              className="glass-card"
              style={{ borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'border-color 0.3s' }}
            >
              {style.preview}
              <div style={{ padding:24 }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:20, color:'#e4e1ed', marginBottom:6 }}>{style.name}</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.50)', marginBottom:12 }}>{style.desc}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                  {style.tags.map(tag => (
                    <span key={tag} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:20, padding:'3px 10px', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'rgba(228,225,237,0.40)' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ width:'100%', height:44, borderRadius:10, background:'rgba(124,111,255,0.10)', border:'1px solid rgba(124,111,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, color:'#a89fff', cursor:'pointer' }}>
                  See Live Preview →
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <style>{`@media (max-width:900px) { .style-cards-grid { grid-template-columns: repeat(2,1fr) !important; } } @media (max-width:560px) { .style-cards-grid { grid-template-columns: 1fr !important; } }`}</style>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section {...scrollReveal} className="py-16 md:py-[72px] px-4 md:px-6" style={{ background:'#0e0e1a', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#7c6fff', marginBottom:16 }}>THE PROCESS</p>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,52px)', marginBottom:16 }}>From zero to live in 5 days</h2>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:17, color:'rgba(228,225,237,0.55)' }}>Simple, fast, and done entirely on WhatsApp.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:40 }}>
            {[
              { num: '01', filled: true, title: 'You pick a style', desc: 'Browse our 6 design styles. Click any to see a full live sample website. Pick the one that feels right for your business.' },
              { num: '02', filled: false, title: 'We understand your needs', desc: 'Fill a simple form. We WhatsApp you within 2 hours with a custom plan and exact quote for your business.' },
              { num: '03', filled: false, title: 'We build and deliver', desc: 'We build your website in 3–5 days. You approve it. We go live. Payment only after you are 100% happy.' },
            ].map(step => (
              <motion.div key={step.num} {...scrollReveal} style={{ display:'flex', gap:20 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background: step.filled ? '#7c6fff' : 'rgba(255,255,255,0.05)', border: step.filled ? 'none' : '1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13, color: step.filled ? 'white' : 'rgba(228,225,237,0.40)', flexShrink:0, boxShadow: step.filled ? '0 0 20px rgba(124,111,255,0.4)' : 'none' }}>
                  {step.num}
                </div>
                <div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:20, color:'#e4e1ed', marginBottom:8 }}>{step.title}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:'rgba(228,225,237,0.50)', lineHeight:1.7 }}>{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...scrollReveal} style={{ marginTop:48, background:'rgba(0,217,126,0.05)', border:'1px solid rgba(0,217,126,0.15)', borderRadius:16, padding:'20px 28px', display:'flex', alignItems:'center', gap:16 }}>
            <span className="material-symbols-outlined" style={{ fontSize:28, color:'#00d97e' }}>rocket_launch</span>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.60)', lineHeight:1.5 }}>
              Average delivery time: <span style={{ color:'#45f798', fontWeight:600 }}>4.2 days</span> this month · All communication on WhatsApp · Pay only after approval
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* WHY KALVIO BUILD */}
      <motion.section {...scrollReveal} className="py-16 md:py-[72px] px-4 md:px-6" style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#7c6fff', marginBottom:16 }}>WHY US</p>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,52px)' }}>Built for Indian businesses</h2>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="features-grid">
          {features.map(f => (
            <motion.div key={f.title}
              variants={{ hidden: { opacity:0, y:30 }, show: { opacity:1, y:0, transition:{ duration:0.5 } } }}
              whileHover={{ y:-4, borderColor:'rgba(255,255,255,0.15)' }}
              className="glass-card p-5 md:p-7" style={{ borderRadius:16, transition:'border-color 0.3s' }}>
              <div style={{ width:40, height:40, borderRadius:12, background:f.grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:16 }}>{f.emoji}</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:18, color:'#e4e1ed', marginBottom:8 }}>{f.title}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.50)', lineHeight:1.6 }}>{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>
        <style>{`@media (max-width:900px) { .features-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
      </motion.section>

      {/* PRICING */}
      <motion.section {...scrollReveal} className="py-16 md:py-[72px] px-4 md:px-6" style={{ background:'#0e0e1a', borderTop:'1px solid rgba(255,255,255,0.05)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#7c6fff', marginBottom:16 }}>PRICING</p>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,52px)', marginBottom:16 }}>Simple, transparent pricing</h2>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:17, color:'rgba(228,225,237,0.55)' }}>No hidden charges. No maintenance fees unless you want them.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="pricing-grid">
            {/* Starter */}
            <motion.div {...scrollReveal} className="glass-card p-6 md:p-9" style={{ borderRadius:20 }}>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color:'rgba(228,225,237,0.30)', textTransform:'uppercase', letterSpacing:'0.10em', marginBottom:12 }}>STARTER</div>
              <div className="text-[40px] md:text-[52px]" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, color:'#e4e1ed', marginBottom:4 }}>₹3,000</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'rgba(228,225,237,0.30)', marginBottom:24 }}>/one-time payment</div>
              <div style={{ height:1, background:'rgba(255,255,255,0.07)', marginBottom:24 }} />
              {['1 page website','Mobile responsive','WhatsApp button','Google Maps embed','Contact form'].map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.60)', marginBottom:10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16, color:'#7c6fff' }}>done</span>{f}
                </div>
              ))}
              <motion.button whileHover={{ borderColor:'rgba(255,255,255,0.30)', color:'white' }} whileTap={{ scale:0.97 }} onClick={() => navigate('/styles')}
                style={{ width:'100%', marginTop:24, padding:'14px', border:'1px solid rgba(255,255,255,0.15)', borderRadius:12, background:'transparent', color:'rgba(228,225,237,0.55)', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, cursor:'pointer' }}>
                Select Starter
              </motion.button>
            </motion.div>

            {/* Business */}
            <motion.div {...scrollReveal} className="p-6 md:p-9" style={{ borderRadius:20, position:'relative', background:'rgba(124,111,255,0.10)', border:'1px solid rgba(124,111,255,0.40)' }}>
              <div style={{ position:'absolute', top:16, right:16, background:'#7c6fff', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:10, textTransform:'uppercase', letterSpacing:'0.05em', borderRadius:9999, padding:'4px 10px' }}>Most Popular</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color:'#a89fff', textTransform:'uppercase', letterSpacing:'0.10em', marginBottom:12 }}>BUSINESS</div>
              <div className="text-gradient text-[40px] md:text-[52px]" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, marginBottom:4 }}>₹7,000</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'rgba(228,225,237,0.30)', marginBottom:24 }}>/one-time payment</div>
              <div style={{ height:1, background:'rgba(124,111,255,0.20)', marginBottom:24 }} />
              {['Up to 5 pages','Mobile responsive','WhatsApp button','Google Maps embed','Contact form','Image gallery','Basic SEO setup','2 free revisions'].map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.70)', marginBottom:10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16, color:'#7c6fff' }}>done</span>{f}
                </div>
              ))}
              <motion.button whileHover={{ boxShadow:'0 16px 40px rgba(124,111,255,0.50)', y:-2 }} whileTap={{ scale:0.97 }} onClick={() => navigate('/styles')}
                style={{ width:'100%', marginTop:24, padding:'14px', borderRadius:12, background:'#7c6fff', border:'none', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:15, cursor:'pointer', boxShadow:'0 10px 30px rgba(124,111,255,0.3)' }}>
                Get Started Now
              </motion.button>
            </motion.div>

            {/* Premium */}
            <motion.div {...scrollReveal} className="glass-card p-6 md:p-9" style={{ borderRadius:20 }}>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:12, color:'rgba(228,225,237,0.30)', textTransform:'uppercase', letterSpacing:'0.10em', marginBottom:12 }}>PREMIUM</div>
              <div className="text-[40px] md:text-[52px]" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, color:'#e4e1ed', marginBottom:4 }}>₹12,000</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'rgba(228,225,237,0.30)', marginBottom:24 }}>/one-time payment</div>
              <div style={{ height:1, background:'rgba(255,255,255,0.07)', marginBottom:24 }} />
              {['Up to 8 pages','All Business features','Online booking form','WhatsApp auto-reply bot','Instagram feed integration','Google review widget','Hindi + English support','Analytics dashboard','3 months WhatsApp support','Priority delivery (2 days)'].map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.60)', marginBottom:10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16, color:'#7c6fff' }}>done</span>{f}
                </div>
              ))}
              <motion.button whileHover={{ borderColor:'rgba(255,255,255,0.30)', color:'white' }} whileTap={{ scale:0.97 }} onClick={() => navigate('/styles')}
                style={{ width:'100%', marginTop:24, padding:'14px', border:'1px solid rgba(255,255,255,0.15)', borderRadius:12, background:'transparent', color:'rgba(228,225,237,0.55)', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, cursor:'pointer' }}>
                Inquire about Premium
              </motion.button>
            </motion.div>
          </div>
          <style>{`@media (max-width:900px) { .pricing-grid { grid-template-columns: 1fr !important; } }`}</style>

          <p style={{ textAlign:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'rgba(228,225,237,0.25)', marginTop:28 }}>
            All prices include hosting setup · Domain not included (₹500/year) · Maintenance available at ₹500/month
          </p>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section {...scrollReveal} className="py-16 md:py-[72px] px-4 md:px-6" style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,52px)', textAlign:'center', marginBottom:64 }}>Questions you probably have</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} layout className="glass-card" style={{ borderRadius:12, overflow:'hidden', cursor:'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
                <span className="text-sm md:text-[15px] leading-snug" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, color:'#e4e1ed' }}>{faq.q}</span>
                <span style={{ color:'#7c6fff', fontSize:20, fontWeight:300, flexShrink:0, transition:'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}>
                    <div style={{ padding:'0 24px 20px', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:'rgba(228,225,237,0.55)', lineHeight:1.7 }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section {...scrollReveal} className="py-16 md:py-[160px] px-4 md:px-6" style={{ background:'#0e0e1a', borderTop:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden', zIndex:1, textAlign:'center' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(80px,15vw,200px)', color:'rgba(255,255,255,0.02)', pointerEvents:'none', whiteSpace:'nowrap' }}>KALVIO</div>
        <div style={{ position:'relative', zIndex:1 }}>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:'0.20em', textTransform:'uppercase', color:'#7c6fff', marginBottom:20 }}>LET'S BUILD SOMETHING</p>
          <h2 className="text-gradient text-[36px] md:text-[56px]" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, lineHeight:1.15, marginBottom:20 }}>
            Ready to get your<br />business online?
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, color:'rgba(228,225,237,0.50)', maxWidth:400, margin:'0 auto 40px' }}>Join businesses across India who trusted Kalvio Build.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <motion.button className="w-full sm:w-auto" whileHover={{ y:-2, boxShadow:'0 20px 50px rgba(124,111,255,0.50)' }} whileTap={{ scale:0.97 }}
              onClick={() => navigate('/styles')}
              style={{ background:'linear-gradient(135deg,#7c6fff,#5646d7)', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:16, padding:'18px 40px', borderRadius:14, border:'none', cursor:'pointer', boxShadow:'0 10px 30px rgba(124,111,255,0.35)' }}>
              See All Styles →
            </motion.button>
            <motion.button className="w-full sm:w-auto" whileHover={{ background:'rgba(0,217,126,0.15)' }} whileTap={{ scale:0.97 }}
              onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WA_NUMBER}?text=${encodeURIComponent('Hello Kalvio Build! I want to discuss a website for my business.')}`, '_blank')}
              style={{ background:'rgba(0,217,126,0.08)', color:'#00d97e', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:16, padding:'18px 40px', borderRadius:14, border:'1px solid rgba(0,217,126,0.30)', cursor:'pointer' }}>
              💬 Chat on WhatsApp
            </motion.button>
          </div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'rgba(228,225,237,0.25)' }}>Average response: under 2 hours · Available Mon–Sat, 9AM–8PM</p>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="pt-10 md:pt-[60px] pb-6 md:pb-10 px-4 md:px-12" style={{ background:'#080810', borderTop:'1px solid rgba(255,255,255,0.06)', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40 }} className="footer-grid">
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:20, color:'white', marginBottom:10 }}>
              Kalvio <span style={{ textDecoration:'underline', textDecorationColor:'#7c6fff', textUnderlineOffset:4 }}>Build</span>
            </div>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.30)', marginBottom:16, lineHeight:1.6 }}>Professional websites for Indian businesses</p>
            <span className="glass-card" style={{ display:'inline-block', padding:'6px 14px', borderRadius:20, fontSize:13, color:'rgba(228,225,237,0.50)', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>📍 Bengaluru, India</span>
          </div>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13, color:'rgba(228,225,237,0.30)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:16 }}>Services</div>
            {['Website Design','Mobile Websites','E-commerce','SEO Setup','WhatsApp Integration'].map(s => (
              <div key={s} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.45)', marginBottom:10, cursor:'pointer' }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13, color:'rgba(228,225,237,0.30)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:16 }}>Design Styles</div>
            {['Glassmorphism','Skeuomorphism','Neo Brutalism','Claymorphism','Minimalism','Liquid Glass'].map(s => (
              <div key={s} onClick={() => navigate(`/styles/${s.toLowerCase().replace(' ', '-')}`)} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.45)', marginBottom:10, cursor:'pointer' }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13, color:'rgba(228,225,237,0.30)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:16 }}>Contact</div>
            {[
              { icon:'location_on', text:'Bengaluru, Karnataka' },
              { icon:'mail', text:'hello@kalviobuild.in' },
              { icon:'chat', text:'+91 81230 97334' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(228,225,237,0.45)', marginBottom:12 }}>
                <span className="material-symbols-outlined" style={{ fontSize:16 }}>{icon}</span>{text}
              </div>
            ))}
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'#00d97e', marginTop:4 }}>Reply within 2 hours</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center" style={{ maxWidth:1200, margin:'28px auto 0', paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'rgba(228,225,237,0.25)' }}>© 2025 Kalvio Build. All rights reserved.</span>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'rgba(228,225,237,0.25)' }}>Made with ✦ in Bengaluru</span>
        </div>
        <style>{`@media (max-width:900px) { .footer-grid { grid-template-columns: repeat(2,1fr) !important; } } @media (max-width:560px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
      </footer>
    </div>
  )
}
