import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const getSelectedStyle = () => localStorage.getItem('kalvio_selected_style') || ''
const setSelectedStyle = (s) => localStorage.setItem('kalvio_selected_style', s)

const styles = [
  { name: 'Glassmorphism', route: '/styles/glassmorphism', desc: 'Modern premium look with frosted glass effect', tags: ['Clinics', 'Salons', 'Spas'], tagColors: ['#e9d5ff', '#bae6fd', '#fbcfe8'],
    preview: (
      <div style={{ height:200, background:'linear-gradient(135deg,#1a0060,#0d1a60)', position:'relative', overflow:'hidden' }}>
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
  { name: 'Skeuomorphism', route: '/styles/skeuomorphism', desc: 'Classic trustworthy look, feels real and familiar', tags: ['Restaurants', 'Cafes', 'Shops'], tagColors: ['#fed7aa', '#d9f99d', '#e9d5ff'],
    preview: (
      <div style={{ height:200, background:'#1a0e06', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:165, background:'linear-gradient(145deg,#3d2510,#241508)', borderRadius:12, padding:14, boxShadow:'inset 0 1px 0 rgba(255,220,100,0.15), 0 8px 24px rgba(0,0,0,0.8)', border:'1px solid rgba(255,180,50,0.10)' }}>
          <div style={{ height:5, width:'55%', background:'rgba(200,134,10,0.4)', borderRadius:2, marginBottom:10 }} />
          <div style={{ height:24, background:'linear-gradient(145deg,#1a1008,#251808)', borderRadius:6, boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', marginBottom:6, border:'1px solid rgba(0,0,0,0.4)' }} />
          <div style={{ height:24, background:'linear-gradient(145deg,#1a1008,#251808)', borderRadius:6, boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', marginBottom:8, border:'1px solid rgba(0,0,0,0.4)' }} />
          <div style={{ height:30, background:'linear-gradient(145deg,#c8860a,#a06a05)', borderRadius:8, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 8px rgba(0,0,0,0.4)' }} />
        </div>
      </div>
    )
  },
  { name: 'Neo Brutalism', route: '/styles/neo-brutalism', desc: 'Bold and impossible to ignore, makes a statement', tags: ['Gyms', 'Bike shops', 'Bold brands'], tagColors: ['#fef08a', '#fca5a5', '#a5f3fc'],
    preview: (
      <div style={{ height:200, background:'#f0ebe0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:160, background:'white', border:'3px solid #0a0a0a', borderRadius:4, padding:12, boxShadow:'7px 7px 0px #0a0a0a' }}>
          <div style={{ height:22, background:'#ffe600', border:'2px solid #0a0a0a', borderRadius:2, marginBottom:8 }} />
          <div style={{ height:6, background:'#0a0a0a', borderRadius:1, marginBottom:5 }} />
          <div style={{ height:4, width:'65%', background:'rgba(0,0,0,0.2)', borderRadius:1, marginBottom:8 }} />
          <div style={{ height:26, background:'#0a0a0a', borderRadius:2, boxShadow:'4px 4px 0 #ff3300' }} />
        </div>
      </div>
    )
  },
  { name: 'Claymorphism', route: '/styles/claymorphism', desc: 'Friendly and playful, customers instantly smile', tags: ['Pet shops', 'Cafes', 'Kids'], tagColors: ['#e9d5ff', '#bbf7d0', '#fbcfe8'],
    preview: (
      <div style={{ height:200, background:'linear-gradient(135deg,#ffe8f5,#e8f0ff,#e8fff5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:160, background:'white', borderRadius:28, padding:14, boxShadow:'0 8px 0 rgba(180,140,220,0.40), 0 16px 32px rgba(150,100,200,0.20), inset 0 2px 0 rgba(255,255,255,0.90)' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#c084fc,#818cf8)', boxShadow:'0 6px 0 rgba(130,80,200,0.3), inset 0 2px 0 rgba(255,255,255,0.4)', margin:'0 auto 10px' }} />
          <div style={{ height:8, borderRadius:8, background:'linear-gradient(90deg,#f0e8ff,#e8eeff)', marginBottom:6, boxShadow:'0 2px 0 rgba(180,160,230,0.2)' }} />
          <div style={{ height:8, width:'65%', borderRadius:8, background:'linear-gradient(90deg,#ffe8f8,#ffe8d0)', marginBottom:10, boxShadow:'0 2px 0 rgba(230,160,160,0.2)' }} />
          <div style={{ height:30, borderRadius:16, background:'linear-gradient(135deg,#c084fc,#818cf8)', boxShadow:'0 5px 0 rgba(130,80,200,0.35), inset 0 2px 0 rgba(255,255,255,0.30)' }} />
        </div>
      </div>
    )
  },
  { name: 'Minimalism', route: '/styles/minimalism', desc: 'Clean professional, looks sharp on every phone', tags: ['Doctors', 'Lawyers', 'Consultants'], tagColors: ['#e2e8f0', '#dbeafe', '#dcfce7'],
    preview: (
      <div style={{ height:200, background:'#fafaf8', display:'flex', alignItems:'center', justifyContent:'center' }}>
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
  { name: 'Liquid Glass', route: '/styles/liquid-glass', desc: 'Futuristic ultra premium, unlike anything local', tags: ['Luxury spas', 'High-end clinics', 'Tech'], tagColors: ['#cffafe', '#f3e8ff', '#d1fae5'],
    preview: (
      <div style={{ height:200, background:'linear-gradient(135deg,#000510,#001030,#050010)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
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

const inputStyle = {
  width: '100%', padding: '14px 24px',
  background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(150,100,255,0.20)',
  borderRadius: 9999, fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 15, color: 'rgba(220,210,255,0.90)', outline: 'none',
  transition: 'border-color 200ms, background 200ms',
}

export default function Selector() {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const cardsRef = useRef(null)
  const [selectedStyle, _setSelectedStyle] = useState(getSelectedStyle)
  const [formData, setFormData] = useState({ name:'', phone:'', businessName:'', businessType:'', city:'', budget:'', notes:'' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectStyle = (name) => {
    _setSelectedStyle(name)
    setSelectedStyle(name)
  }

  const handleCardClick = (name) => {
    selectStyle(name)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 100)
  }

  const handlePreviewClick = (e, style) => {
    e.stopPropagation()
    selectStyle(style.name)
    navigate(style.route)
  }

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, phone, businessName, businessType, city, budget, notes } = formData
    if (!name.trim()) return alert('Please enter your name')
    if (phone.replace(/\D/g,'').length < 10) return alert('Please enter a valid phone number')
    if (!businessName.trim()) return alert('Please enter your business name')
    if (!businessType) return alert('Please select your business type')
    if (!city.trim()) return alert('Please enter your city')
    if (!budget) return alert('Please select a budget range')
    if (!selectedStyle) {
      cardsRef.current?.scrollIntoView({ behavior:'smooth' })
      return alert('Please select a design style first!')
    }

    setSubmitting(true)
    try {
      await supabase.from('leads').insert([{
        name, phone, business_name: businessName,
        business_type: businessType, city, budget,
        style_selected: selectedStyle, notes: notes || null,
      }])
    } catch(err) { console.warn('Supabase:', err) }

    const msg = encodeURIComponent(
      `Hello Kalvio Build! 👋\n\nI want a website for my business.\n\nName: ${name}\nBusiness: ${businessName} (${businessType})\nCity: ${city}\nDesign Style: ${selectedStyle}\nBudget: ${budget}${notes ? `\nSpecial needs: ${notes}` : ''}\n\nPlease send me a quote!`
    )
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => window.open(`https://wa.me/${import.meta.env.VITE_WA_NUMBER}?text=${msg}`, '_blank'), 600)
  }

  return (
    <div style={{ background:'#07060e', minHeight:'100vh', position:'relative', overflow:'hidden' }}>
      {/* Animated background orbs */}
      <motion.div animate={{ rotate:360 }} transition={{ duration:35, repeat:Infinity, ease:'linear' }}
        style={{ position:'fixed', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%', background:'conic-gradient(from 0deg,rgba(106,55,212,0.28),rgba(80,0,200,0.08),rgba(106,55,212,0.28))', filter:'blur(80px)', pointerEvents:'none', zIndex:0 }} />
      <motion.div animate={{ rotate:-360 }} transition={{ duration:50, repeat:Infinity, ease:'linear' }}
        style={{ position:'fixed', bottom:'-15%', left:'-10%', width:500, height:500, borderRadius:'50%', background:'conic-gradient(from 180deg,rgba(0,217,126,0.18),rgba(0,100,80,0.06),rgba(0,217,126,0.18))', filter:'blur(90px)', pointerEvents:'none', zIndex:0 }} />
      <motion.div animate={{ y:[0,40,0] }} transition={{ duration:14, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'fixed', top:'30%', left:'40%', width:300, height:300, borderRadius:'50%', background:'rgba(80,40,180,0.15)', filter:'blur(100px)', pointerEvents:'none', zIndex:0 }} />
      {/* Grid dots */}
      <div style={{ position:'fixed', inset:0, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.022) 1px,transparent 1px)', backgroundSize:'36px 36px', pointerEvents:'none', zIndex:0 }} />

      <div style={{ position:'relative', zIndex:1 }}>
      <style>{`
        @keyframes rotate-blob { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .selector-input:focus { border-color: rgba(150,100,255,0.50) !important; background: rgba(255,255,255,0.08) !important; }
        .selector-input::placeholder { color: rgba(200,180,255,0.35); }
        .cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
        @media (max-width:900px) { .cards-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:560px) { .cards-grid { grid-template-columns: 1fr !important; } }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width:560px) { .form-row-2 { grid-template-columns: 1fr !important; } }
        .selector-nav { padding: 14px 48px; }
        @media (max-width:640px) { .selector-nav { padding: 14px 20px; } }
      `}</style>

      {/* NAV */}
      <motion.nav initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5 }}
        className="selector-nav"
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(7,6,14,0.75)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', borderBottom:'1px solid rgba(150,100,255,0.15)', borderBottomLeftRadius:28, borderBottomRightRadius:28, boxShadow:'0 8px 32px rgba(0,0,0,0.40)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span onClick={() => navigate('/')} style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontStyle:'italic', fontSize:22, color:'rgba(200,180,255,0.95)', cursor:'pointer' }}>Kalvio Build</span>
        <span style={{ background:'rgba(106,55,212,0.18)', color:'rgba(200,180,255,0.90)', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:13, padding:'6px 16px', borderRadius:9999, border:'1px solid rgba(150,100,255,0.30)' }}>Professional websites from ₹3,000</span>
      </motion.nav>

      {/* HERO */}
      <section style={{ paddingTop:140, paddingBottom:60, textAlign:'center', padding:'140px 24px 60px' }}>
        {/* Step pills */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:40, flexWrap:'wrap' }}>
          {[
            { label:'1. Pick Style', active: true, done: !!selectedStyle },
            { label:'2. Fill Details', active: !!selectedStyle, done: submitted },
            { label:'3. We Build', active: submitted, done: false },
          ].map(({ label, active, done }, i) => (
            <span key={i}>
              <motion.span animate={{ scale: active ? [1,1.06,1] : 1 }} transition={{ duration:0.4 }}
                style={{ display:'inline-block', padding:'8px 20px', borderRadius:9999, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13,
                  background: done ? '#00b377' : active ? '#6a37d4' : 'transparent',
                  color: (done || active) ? 'white' : '#6a37d4',
                  border: (done || active) ? 'none' : '2px solid rgba(106,55,212,0.40)',
                  boxShadow: done ? '0 4px 12px rgba(0,179,119,0.35)' : active ? '0 4px 12px rgba(106,55,212,0.35)' : 'none',
                }}>
                {label}
              </motion.span>
              {i < 2 && <span style={{ display:'inline-block', width:32, height:2, background:'rgba(106,55,212,0.25)', borderRadius:2, verticalAlign:'middle', margin:'0 4px' }} />}
            </span>
          ))}
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
          style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(32px,5vw,64px)', lineHeight:1.1, color:'#fff', marginBottom:16 }}>
          Pick a style you love —<br/>
          <em style={{ background:'linear-gradient(90deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>we build the rest</em>
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300, fontSize:18, color:'rgba(200,180,255,0.60)' }}>
          No tech knowledge needed. Just point and we deliver.
        </motion.p>
      </section>

      {/* STYLE CARDS */}
      <section style={{ padding:'0 24px 80px', maxWidth:1140, margin:'0 auto' }} ref={cardsRef}>
        <motion.div className="cards-grid"
          initial="hidden" animate="show"
          variants={{ hidden:{opacity:0}, show:{opacity:1, transition:{staggerChildren:0.08, delayChildren:0.15}} }}>
          {styles.map(style => {
            const isSelected = selectedStyle === style.name
            return (
              <motion.div key={style.name}
                variants={{ hidden:{opacity:0,y:30}, show:{opacity:1,y:0,transition:{duration:0.5}} }}
                whileHover={{ y:-6, boxShadow: isSelected ? '0 0 0 4px rgba(106,55,212,0.15), 0 14px 0 rgba(106,55,212,0.25), 0 24px 48px rgba(106,55,212,0.12)' : '0 14px 0 rgba(180,140,220,0.30), 0 24px 48px rgba(150,100,200,0.18)' }}
                onClick={() => handleCardClick(style.name)}
                style={{ background:'white', borderRadius:28, overflow:'hidden', cursor:'pointer', position:'relative', transition:'box-shadow 0.3s',
                  border: isSelected ? '3px solid #6a37d4' : '3px solid transparent',
                  boxShadow: isSelected ? '0 0 0 4px rgba(106,55,212,0.15), 0 8px 0 rgba(106,55,212,0.25), 0 20px 40px rgba(106,55,212,0.12)' : '0 8px 0 rgba(180,140,220,0.25), 0 16px 40px rgba(150,100,200,0.12)',
                }}>
                {isSelected && (
                  <div style={{ position:'absolute', top:12, right:12, width:28, height:28, borderRadius:'50%', background:'#6a37d4', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, zIndex:10, boxShadow:'0 4px 12px rgba(106,55,212,0.40)' }}>✓</div>
                )}
                {style.preview}
                <div style={{ padding:20 }}>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:'#1a1040', marginBottom:4 }}>{style.name}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:'#7a7a9a', marginBottom:10 }}>{style.desc}</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:4 }}>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:'#9090aa', fontWeight:600 }}>Best for:</span>
                    {style.tags.map((tag, ti) => (
                      <span key={tag} style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:9999, background:style.tagColors[ti], color:'#444', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{tag}</span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale:1.03, boxShadow: isSelected ? '0 12px 28px rgba(106,55,212,0.40)' : '0 12px 28px rgba(0,179,119,0.40)' }}
                    whileTap={{ scale:0.97 }}
                    onClick={(e) => handlePreviewClick(e, style)}
                    style={{ width:'100%', padding:'13px', borderRadius:9999, border:'none', cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:14, marginTop:12, color:'white',
                      background: isSelected ? 'linear-gradient(135deg,#6a37d4,#5020b0)' : 'linear-gradient(135deg,#00b377,#009060)',
                      boxShadow: isSelected ? '0 8px 20px rgba(106,55,212,0.35)' : '0 8px 20px rgba(0,179,119,0.30)',
                    }}>
                    {isSelected ? 'Selected ✓' : 'See Live Preview →'}
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* CONTACT FORM */}
      <section style={{ padding:'0 24px 100px' }} ref={formRef}>
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ maxWidth:680, margin:'0 auto', background:'rgba(255,255,255,0.05)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', border:'1px solid rgba(150,100,255,0.20)', borderRadius:28, boxShadow:'0 40px 80px -20px rgba(0,0,0,0.50)', padding:'48px 48px 40px', position:'relative' }}>

          {/* Floating badge */}
          <motion.div
            key={selectedStyle}
            initial={{ scale:1.15 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:400, damping:20 }}
            style={{ position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)', background: selectedStyle ? '#6a37d4' : '#f59e0b', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13, padding:'8px 24px', borderRadius:9999, whiteSpace:'nowrap', boxShadow: selectedStyle ? '0 6px 20px rgba(106,55,212,0.35)' : '0 6px 20px rgba(245,158,11,0.35)' }}>
            {selectedStyle ? `✓ Style selected: ${selectedStyle}` : 'Please select a style above ↑'}
          </motion.div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" initial={{ opacity:1 }} exit={{ opacity:0, scale:0.95 }}>
                <div style={{ textAlign:'center', marginBottom:28 }}>
                  <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:28, color:'rgba(200,180,255,0.95)', marginBottom:6 }}>Tell us about your business</h2>
                  <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:'rgba(200,180,255,0.50)' }}>We will WhatsApp you in 2 hours with your quote</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row-2" style={{ marginBottom:14 }}>
                    <input className="selector-input" name="name" value={formData.name} onChange={handleChange} placeholder="Rahul Sharma" style={inputStyle} />
                    <input className="selector-input" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
                  </div>
                  <div className="form-row-2" style={{ marginBottom:14 }}>
                    <input className="selector-input" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Sharma Clinic" style={inputStyle} />
                    <select className="selector-input" name="businessType" value={formData.businessType} onChange={handleChange} style={inputStyle}>
                      <option value="">Business Type</option>
                      {['Doctor / Clinic','Dermatologist','Vet / Pet Shop','Bike Accessories','Salon / Spa','Restaurant / Cafe','Gym / Fitness','Sweet Shop','Pharmacy','Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-row-2" style={{ marginBottom:14 }}>
                    <input className="selector-input" name="city" value={formData.city} onChange={handleChange} placeholder="Bengaluru" style={inputStyle} />
                    <select className="selector-input" name="budget" value={formData.budget} onChange={handleChange} style={inputStyle}>
                      <option value="">Budget Range</option>
                      {['₹3,000 – ₹5,000','₹5,000 – ₹10,000','₹10,000 – ₹15,000','₹15,000+'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <textarea className="selector-input" name="notes" value={formData.notes} onChange={handleChange} rows={3}
                    placeholder="Online appointment booking, Hindi language, Instagram feed, Google Maps..."
                    style={{ ...inputStyle, borderRadius:20, resize:'vertical', minHeight:80, marginBottom:20 }} />

                  <motion.button type="submit" disabled={submitting}
                    whileHover={{ y:-2, boxShadow:'0 18px 40px -8px rgba(0,179,119,0.55)' }} whileTap={{ scale:0.97 }}
                    style={{ width:'100%', height:56, borderRadius:9999, background:'linear-gradient(135deg,#00b377,#009060)', border:'none', color:'white', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:16, cursor: submitting ? 'not-allowed' : 'pointer', boxShadow:'0 12px 30px -8px rgba(0,179,119,0.40)', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Sending...' : '💬 Send on WhatsApp →'}
                  </motion.button>
                  <p style={{ textAlign:'center', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'#aaaacc', marginTop:12 }}>We never share your number. No spam ever.</p>
                </form>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ type:'spring', stiffness:300, damping:20 }} style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ width:80, height:80, borderRadius:'50%', background:'rgba(0,179,119,0.12)', border:'2px solid #00b377', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:48, color:'#00b377', fontVariationSettings:"'FILL' 1" }}>check_circle</span>
                </div>
                <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:24, color:'rgba(200,180,255,0.95)', marginBottom:8 }}>We got your details!</h2>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:'rgba(200,180,255,0.55)', marginBottom:6 }}>Opening WhatsApp now — we reply within 2 hours.</p>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:18, color:'rgba(180,160,255,0.90)' }}>Thanks {formData.name}! 🎉</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'rgba(255,255,255,0.03)', borderTop:'1px solid rgba(150,100,255,0.12)', borderTopLeftRadius:32, borderTopRightRadius:32, padding:40, textAlign:'center', backdropFilter:'blur(20px)' }}>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:20, color:'rgba(200,180,255,0.90)', marginBottom:6 }}>Kalvio Build</div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:'rgba(200,180,255,0.45)', marginBottom:4 }}>Professional websites from ₹3,000 · Bengaluru, India</div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:'rgba(200,180,255,0.25)' }}>© 2025 Kalvio Build</div>
      </footer>
      </div>{/* end relative z-1 wrapper */}
    </div>
  )
}
