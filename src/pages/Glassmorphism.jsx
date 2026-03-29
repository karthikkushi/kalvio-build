import { useState } from 'react'
import FloatingButtons from '../components/FloatingButtons'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Design tokens ── */
const G = {
  glass: { backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', borderRadius:20 },
  glassStrong: { backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', background:'rgba(255,255,255,0.11)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:24 },
  glassInput: { backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:12, padding:'14px 20px', color:'#fff', fontSize:15, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:'none', width:'100%', boxSizing:'border-box' },
}

const reveal = { initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:0.2}, transition:{duration:0.65,ease:'easeOut'} }
const stagger = { hidden:{opacity:0}, show:{opacity:1,transition:{staggerChildren:0.09,delayChildren:0.1}} }
const cardReveal = { hidden:{opacity:0,y:30}, show:{opacity:1,y:0,transition:{duration:0.5}} }

const FAQS = [
  { q:'Is the treatment painful?', a:'Most of our treatments are non-invasive and virtually painless. For procedures like PRP or chemical peels, a topical numbing cream is applied to maximise comfort.' },
  { q:'How many sessions will I need?', a:'It depends on the condition and its severity. Most patients see significant results in 3–6 sessions. Dr. Priya will create a personalised treatment plan at your first consultation.' },
  { q:'Are the treatments safe for Indian skin tones?', a:'Absolutely. All our protocols are specifically calibrated for Fitzpatrick Type III–VI skin (Indian, Middle Eastern, and South Asian skin). We use FDA-approved technology.' },
  { q:'What is the cost of a consultation?', a:'A first consultation with Dr. Priya is ₹500, which is adjusted against your treatment cost. We believe in transparent, upfront pricing — no hidden fees.' },
]

export default function Glassmorphism() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", minHeight:'100vh', color:'#fff', overflowX:'hidden' }}>

      {/* ── FIXED BACKGROUND ── */}
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'linear-gradient(140deg,#050118 0%,#0a0235 40%,#060120 100%)' }}>
        {/* Animated blobs */}
        <motion.div animate={{ rotate:360 }} transition={{ duration:28, repeat:Infinity, ease:'linear' }}
          style={{ position:'absolute', top:'-15%', left:'-10%', width:700, height:700, borderRadius:'50%', background:'conic-gradient(from 0deg,rgba(130,50,255,0.30),rgba(80,0,200,0.12),rgba(0,100,255,0.18),rgba(130,50,255,0.30))', filter:'blur(70px)', pointerEvents:'none' }} />
        <motion.div animate={{ rotate:-360 }} transition={{ duration:40, repeat:Infinity, ease:'linear' }}
          style={{ position:'absolute', bottom:'-10%', right:'-15%', width:600, height:600, borderRadius:'50%', background:'conic-gradient(from 180deg,rgba(255,60,180,0.20),rgba(60,0,160,0.10),rgba(0,200,255,0.18),rgba(255,60,180,0.20))', filter:'blur(80px)', pointerEvents:'none' }} />
        <motion.div animate={{ y:[0,30,0] }} transition={{ duration:12, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'40%', left:'35%', width:400, height:400, borderRadius:'50%', background:'rgba(60,20,180,0.20)', filter:'blur(100px)', pointerEvents:'none' }} />
        {/* Grid dots */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'36px 36px', pointerEvents:'none' }} />
      </div>

      <div style={{ position:'relative', zIndex:1 }}>

        {/* ── NAVBAR ── */}
        <motion.nav initial={{ y:-60,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ duration:0.5 }}
          style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, ...G.glass, borderRadius:0, borderTop:'none', borderLeft:'none', borderRight:'none', borderBottom:'1px solid rgba(255,255,255,0.10)', padding:'0 48px', height:68, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,rgba(150,80,255,0.9),rgba(0,180,255,0.7))', boxShadow:'0 0 16px rgba(130,80,255,0.50)' }} />
            <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:17, color:'#fff' }}>Dr. Priya Clinic</span>
          </div>
          <div style={{ display:'flex', gap:28 }}>
            {['Treatments','Before & After','Reviews','Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ & /,'-').replace(/ /g,'-')}`}
                style={{ color:'rgba(255,255,255,0.60)', fontSize:14, textDecoration:'none', cursor:'pointer', transition:'color 200ms' }}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,1)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.60)'}>
                {link}
              </a>
            ))}
          </div>
          <motion.button whileHover={{ background:'rgba(130,80,255,0.30)', boxShadow:'0 0 20px rgba(130,80,255,0.40)' }} whileTap={{ scale:0.97 }}
            style={{ ...G.glass, borderRadius:9999, padding:'9px 22px', color:'#fff', fontSize:14, cursor:'pointer', background:'rgba(130,80,255,0.20)', border:'1px solid rgba(150,100,255,0.40)' }}>
            Book Now →
          </motion.button>
        </motion.nav>

        {/* ── HERO ── */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'110px 48px 72px' }}>
          <div style={{ maxWidth:1160, width:'100%', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center' }}>

            {/* Left */}
            <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, ease:'easeOut' }}>
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                style={{ display:'inline-flex', alignItems:'center', gap:8, ...G.glass, borderRadius:9999, padding:'7px 18px', marginBottom:28, fontSize:12, fontWeight:600, color:'rgba(200,180,255,0.95)', letterSpacing:'0.06em' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#a0f0a0', boxShadow:'0 0 8px #a0f0a0', flexShrink:0 }} />
                MBBS · MD Dermatology · 15 Years · Bengaluru
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
                style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.08, margin:'0 0 8px', color:'#fff' }}>
                Expert Skin &amp; Hair
              </motion.h1>
              <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.7 }}
                style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.08, margin:'0 0 24px',
                  background:'linear-gradient(90deg,#c084fc,#60a5fa,#34d399)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Care in Bengaluru
              </motion.h1>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                style={{ fontSize:17, fontWeight:300, color:'rgba(255,255,255,0.65)', lineHeight:1.75, margin:'0 0 36px', maxWidth:500 }}>
                Advanced laser treatments for acne, hair fall, skin brightening and anti-ageing. USFDA-approved technology. Results you can see in just 3 sessions.
              </motion.p>

              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
                style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:40 }}>
                <motion.button whileHover={{ y:-2, boxShadow:'0 0 32px rgba(150,100,255,0.55)' }} whileTap={{ scale:0.97 }}
                  style={{ background:'linear-gradient(135deg,rgba(130,80,255,0.80),rgba(80,40,200,0.80))', ...G.glass, padding:'14px 30px', color:'#fff', fontSize:15, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, cursor:'pointer', border:'1px solid rgba(150,100,255,0.50)', borderRadius:12 }}>
                  Book Consultation →
                </motion.button>
                <motion.button whileHover={{ y:-2, borderColor:'rgba(255,255,255,0.40)' }} whileTap={{ scale:0.97 }}
                  style={{ ...G.glass, padding:'14px 30px', color:'rgba(255,255,255,0.80)', fontSize:15, cursor:'pointer', background:'transparent', borderRadius:12 }}>
                  View Treatments
                </motion.button>
              </motion.div>

              {/* Trust row */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
                {['FDA Certified', 'IADVL Member', '5,000+ Patients', 'Same-day Reports'].map(t => (
                  <span key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'rgba(255,255,255,0.45)', fontWeight:500 }}>
                    <span style={{ color:'#4ade80', fontSize:13 }}>✓</span> {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — appointment card */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }}
              style={{ ...G.glassStrong, padding:32 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,rgba(130,80,255,0.7),rgba(0,200,255,0.5))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>🩺</div>
                <div>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, margin:0, color:'#fff' }}>Book a Slot</p>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.45)', margin:0 }}>Dr. Priya Nair — Available Today</p>
                </div>
              </div>
              <div style={{ height:1, background:'rgba(255,255,255,0.10)', marginBottom:20 }} />
              <p style={{ fontSize:12, fontWeight:600, color:'rgba(200,180,255,0.80)', textTransform:'uppercase', letterSpacing:'0.10em', marginBottom:12 }}>Today's available slots</p>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                {[{ time:'4:00 PM', status:'2 left' }, { time:'5:30 PM', status:'Available' }, { time:'7:00 PM', status:'1 left' }].map(s => (
                  <motion.button key={s.time} whileHover={{ background:'rgba(130,80,255,0.30)', borderColor:'rgba(150,100,255,0.60)' }} whileTap={{ scale:0.97 }}
                    style={{ ...G.glass, borderRadius:10, padding:'11px 16px', color:'#fff', fontSize:14, cursor:'pointer', background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontWeight:600 }}>{s.time}</span>
                    <span style={{ fontSize:11, color:'rgba(180,255,180,0.80)', background:'rgba(100,255,100,0.10)', padding:'3px 10px', borderRadius:9999 }}>{s.status}</span>
                  </motion.button>
                ))}
              </div>
              <input type="text" placeholder="Your name" style={{ ...G.glassInput, marginBottom:10 }} />
              <input type="tel" placeholder="+91 98765 43210" style={{ ...G.glassInput, marginBottom:16 }} />
              <motion.button whileHover={{ boxShadow:'0 0 28px rgba(130,80,255,0.55)', background:'rgba(130,80,255,0.50)' }} whileTap={{ scale:0.97 }}
                style={{ width:'100%', ...G.glass, borderRadius:12, padding:'13px', color:'#fff', fontSize:15, cursor:'pointer', background:'rgba(130,80,255,0.35)', border:'1px solid rgba(150,100,255,0.50)', fontWeight:600, textAlign:'center' }}>
                Confirm Booking →
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <motion.section {...reveal} style={{ padding:'0 48px 72px' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true,amount:0.3 }} variants={stagger}
            style={{ maxWidth:1000, margin:'0 auto', ...G.glass, padding:'32px 40px', borderRadius:24, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
            {[
              { value:'15+', label:'Years Experience', icon:'🏥' },
              { value:'5,000+', label:'Patients Treated', icon:'👤' },
              { value:'100%', label:'Safe Procedures', icon:'✅' },
              { value:'4.9★', label:'Google Rating', icon:'⭐' },
            ].map((s, i) => (
              <motion.div key={i} variants={cardReveal}
                style={{ textAlign:'center', padding:'0 20px', borderLeft: i>0 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:36, color:'#fff', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.50)', marginTop:6 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── TREATMENTS ── */}
        <section id="treatments" style={{ padding:'72px 48px' }}>
          <motion.div {...reveal} style={{ maxWidth:1160, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:52 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(180,140,255,0.80)', marginBottom:12 }}>What We Treat</p>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,48px)', color:'#fff', margin:0 }}>Advanced Dermatology Treatments</h2>
            </div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once:true, amount:0.1 }} variants={stagger}
              style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {[
                { icon:'✨', title:'Acne & Pimple Treatment', price:'from ₹800/session', desc:'Q-switched laser + salicylic peels for clear, blemish-free skin in 4–6 weeks.', tag:'Most Popular' },
                { icon:'💆', title:'Hair Fall Treatment', price:'from ₹1,200/session', desc:'PRP therapy using your own growth factors to strengthen follicles and regrow hair.', tag:'Proven Results' },
                { icon:'🌟', title:'Skin Brightening', price:'from ₹1,500/session', desc:'Chemical peels and photofacial to even skin tone, reduce pigmentation and boost radiance.', tag:'Top Rated' },
                { icon:'⏰', title:'Anti-Ageing', price:'from ₹2,500/session', desc:'Botox, fillers and skin-tightening radiofrequency for a naturally youthful appearance.', tag:'Premium' },
                { icon:'🩹', title:'Scar Reduction', price:'from ₹900/session', desc:'Micro-needling and fractional laser to fade acne scars, stretch marks and surgical scars.', tag:'Effective' },
                { icon:'🌿', title:'Medi-Facials', price:'from ₹600/session', desc:'Medical-grade facials targeting oiliness, dehydration, and sensitised skin conditions.', tag:'Relaxing' },
              ].map((t, i) => (
                <motion.div key={i} variants={cardReveal}
                  whileHover={{ y:-6, boxShadow:'0 20px 60px rgba(130,80,255,0.25), inset 0 1px 0 rgba(255,255,255,0.20)' }}
                  style={{ ...G.glass, padding:'28px 24px', cursor:'pointer', position:'relative', overflow:'hidden', transition:'box-shadow 0.3s' }}>
                  <div style={{ position:'absolute', top:14, right:14, fontSize:11, fontWeight:600, color:'rgba(200,180,255,0.90)', background:'rgba(130,80,255,0.20)', padding:'3px 10px', borderRadius:9999, border:'1px solid rgba(150,100,255,0.30)' }}>{t.tag}</div>
                  <div style={{ fontSize:32, marginBottom:14 }}>{t.icon}</div>
                  <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:'#fff', margin:'0 0 6px' }}>{t.title}</h3>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:17, color:'rgba(180,140,255,1)', margin:'0 0 10px' }}>{t.price}</p>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.60)', lineHeight:1.65, margin:0 }}>{t.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── BEFORE & AFTER ── */}
        <section id="before-&-after" style={{ padding:'72px 48px' }}>
          <motion.div {...reveal} style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(180,140,255,0.80)', marginBottom:12 }}>Results</p>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,46px)', color:'#fff', margin:0 }}>Real Patient Results</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {[
                { cond:'Acne Treatment', duration:'6 sessions · 8 weeks', result:'90% reduction in breakouts', beforeBg:'rgba(180,80,80,0.25)', afterBg:'rgba(80,180,120,0.25)' },
                { cond:'Hair Regrowth (PRP)', duration:'4 sessions · 12 weeks', result:'60% increase in hair density', beforeBg:'rgba(150,100,50,0.25)', afterBg:'rgba(80,160,200,0.25)' },
                { cond:'Pigmentation Clearing', duration:'5 sessions · 10 weeks', result:'Uniform skin tone achieved', beforeBg:'rgba(150,100,80,0.25)', afterBg:'rgba(100,180,150,0.25)' },
              ].map((r, i) => (
                <motion.div key={i} variants={cardReveal} {...reveal}
                  whileHover={{ y:-4 }}
                  style={{ ...G.glass, padding:24, overflow:'hidden' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
                    <div style={{ height:80, borderRadius:12, background:r.beforeBg, border:'1px solid rgba(255,100,100,0.20)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,150,150,0.80)' }}>BEFORE</span>
                    </div>
                    <div style={{ height:80, borderRadius:12, background:r.afterBg, border:'1px solid rgba(100,255,150,0.20)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:11, fontWeight:600, color:'rgba(150,255,180,0.80)' }}>AFTER</span>
                    </div>
                  </div>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, color:'#fff', margin:'0 0 4px' }}>{r.cond}</p>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.45)', margin:'0 0 10px' }}>{r.duration}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:'rgba(160,240,180,0.90)', margin:0 }}>✓ {r.result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" style={{ padding:'72px 48px' }}>
          <motion.div {...reveal} style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(180,140,255,0.80)', marginBottom:12 }}>Reviews</p>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,46px)', color:'#fff', margin:0 }}>What Patients Say</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {[
                { name:'Kavitha R.', condition:'Acne treatment', text:'My skin has completely transformed in 2 months. Dr. Priya is incredibly thorough and the laser sessions were gentle. Worth every rupee.', stars:5 },
                { name:'Deepak M.', condition:'Hair fall (PRP)', text:'I was sceptical about PRP but the results speak for themselves. Significant regrowth after just 4 sessions. The clinic is very professional.', stars:5 },
                { name:'Ananya S.', condition:'Pigmentation', text:'Finally found someone who understood my skin concerns. The photofacial sessions have made my complexion so much more even. Highly recommend.', stars:5 },
              ].map((r, i) => (
                <motion.div key={i} {...reveal} transition={{ delay:i*0.1 }}
                  whileHover={{ y:-5, boxShadow:'0 20px 50px rgba(130,80,255,0.20)' }}
                  style={{ ...G.glass, padding:28 }}>
                  <div style={{ display:'flex', gap:4, marginBottom:14 }}>
                    {'★★★★★'.split('').map((s,j) => <span key={j} style={{ color:'#fbbf24', fontSize:16 }}>{s}</span>)}
                  </div>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.75, margin:'0 0 20px', fontStyle:'italic' }}>"{r.text}"</p>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,rgba(130,80,255,0.7),rgba(0,180,255,0.5))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:15, flexShrink:0 }}>{r.name[0]}</div>
                    <div>
                      <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, color:'#fff', margin:0 }}>{r.name}</p>
                      <p style={{ fontSize:12, color:'rgba(255,255,255,0.40)', margin:0 }}>{r.condition}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding:'72px 48px' }}>
          <motion.div {...reveal} style={{ maxWidth:760, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(180,140,255,0.80)', marginBottom:12 }}>FAQ</p>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'#fff', margin:0 }}>Common Questions</h2>
            </div>
            {FAQS.map((f, i) => (
              <motion.div key={i} {...reveal} transition={{ delay:i*0.08 }}
                style={{ ...G.glass, borderRadius:16, marginBottom:12, overflow:'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                  style={{ width:'100%', background:'none', border:'none', padding:'20px 24px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:16, color:'#fff', textAlign:'left' }}>{f.q}</span>
                  <motion.span animate={{ rotate: openFaq===i ? 45:0 }} transition={{ duration:0.2 }}
                    style={{ fontSize:20, color:'rgba(180,140,255,0.80)', flexShrink:0 }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.div initial={{ height:0,opacity:0 }} animate={{ height:'auto',opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.3 }}
                      style={{ overflow:'hidden', padding:'0 24px 20px', fontSize:14, color:'rgba(255,255,255,0.60)', lineHeight:1.7 }}>
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── BOOKING FORM ── */}
        <section id="contact" style={{ padding:'72px 48px' }}>
          <motion.div {...reveal} style={{ maxWidth:640, margin:'0 auto', ...G.glassStrong, padding:48 }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(180,140,255,0.80)', marginBottom:12 }}>Contact</p>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:32, color:'#fff', margin:0 }}>Book a Consultation</h2>
            </div>
            <form onSubmit={e=>e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <input type="text" placeholder="Your Name" style={G.glassInput} />
                <input type="tel" placeholder="+91 98765 43210" style={G.glassInput} />
              </div>
              <input type="date" style={G.glassInput} />
              <select style={{ ...G.glassInput, appearance:'none', cursor:'pointer' }}>
                <option value="" style={{ background:'#0a0235' }}>Select Treatment</option>
                {['Acne & Pimple Treatment','Hair Fall Solution (PRP)','Skin Brightening','Anti-Ageing','Scar Reduction','Medi-Facial'].map(o=>(
                  <option key={o} style={{ background:'#0a0235' }}>{o}</option>
                ))}
              </select>
              <textarea placeholder="Tell us more (optional)" rows={3} style={{ ...G.glassInput, borderRadius:16, resize:'vertical', minHeight:80 }} />
              <motion.button whileHover={{ boxShadow:'0 0 32px rgba(130,80,255,0.55)', background:'rgba(130,80,255,0.50)' }} whileTap={{ scale:0.97 }}
                type="submit"
                style={{ width:'100%', ...G.glass, borderRadius:12, padding:'15px', color:'#fff', fontSize:16, cursor:'pointer', background:'rgba(130,80,255,0.35)', border:'1px solid rgba(150,100,255,0.50)', fontFamily:"'Outfit',sans-serif", fontWeight:700 }}>
                Confirm Appointment →
              </motion.button>
            </form>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="about" style={{ ...G.glass, borderRadius:0, borderBottom:'none', borderLeft:'none', borderRight:'none', padding:'48px 48px 32px', marginTop:40 }}>
          <motion.div {...reveal} style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:36 }}>
              <div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:20, color:'#fff', margin:'0 0 10px' }}>Dr. Priya Skin &amp; Hair Clinic</p>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', lineHeight:1.7, margin:'0 0 16px' }}>USFDA-approved dermatology treatments. Award-winning skin and hair care in Bengaluru since 2009.</p>
                <div style={{ display:'flex', gap:10 }}>
                  {['Instagram','WhatsApp','Google Maps'].map(s=>(
                    <span key={s} style={{ ...G.glass, borderRadius:9999, padding:'5px 12px', fontSize:12, color:'rgba(255,255,255,0.60)', cursor:'pointer' }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize:12, fontWeight:600, color:'rgba(180,140,255,0.80)', textTransform:'uppercase', letterSpacing:'0.10em', margin:'0 0 14px' }}>Treatments</p>
                {['Acne Care','Hair Fall','Skin Brightening','Anti-Ageing'].map(s=>(
                  <p key={s} style={{ fontSize:14, color:'rgba(255,255,255,0.45)', margin:'0 0 8px', cursor:'pointer' }}>{s}</p>
                ))}
              </div>
              <div>
                <p style={{ fontSize:12, fontWeight:600, color:'rgba(180,140,255,0.80)', textTransform:'uppercase', letterSpacing:'0.10em', margin:'0 0 14px' }}>Hours</p>
                {['Mon–Fri: 10AM–7PM','Sat: 10AM–4PM','Sun: Closed'].map(h=>(
                  <p key={h} style={{ fontSize:14, color:'rgba(255,255,255,0.45)', margin:'0 0 8px' }}>{h}</p>
                ))}
              </div>
              <div>
                <p style={{ fontSize:12, fontWeight:600, color:'rgba(180,140,255,0.80)', textTransform:'uppercase', letterSpacing:'0.10em', margin:'0 0 14px' }}>Contact</p>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', margin:'0 0 8px' }}>MG Road, Bengaluru</p>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', margin:'0 0 8px' }}>+91 98765 43210</p>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', margin:0 }}>drpriya@clinic.in</p>
              </div>
            </div>
            <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:13, margin:0, textAlign:'center' }}>
              © 2025 Dr. Priya Skin &amp; Hair Clinic · All Rights Reserved
            </p>
          </motion.div>
        </footer>

      </div>
      <FloatingButtons styleName="Glassmorphism" />
    </div>
  )
}
