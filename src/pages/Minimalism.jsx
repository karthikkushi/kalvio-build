import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingButtons from '../components/FloatingButtons'

const reveal = (delay=0) => ({
  initial:{ opacity:0, y:28 },
  whileInView:{ opacity:1, y:0 },
  viewport:{ once:true, margin:'-60px' },
  transition:{ duration:0.65, ease:'easeOut', delay },
})

const FAQS = [
  { q:'What is the consultation fee?', a:'The first consultation is ₹300. This is fully adjusted against any treatment or follow-up. We believe the first conversation should be about understanding your health, not billing.' },
  { q:'Do you see patients without an appointment?', a:'We keep 20% of daily slots for walk-in patients. However, booking ensures minimal waiting time. You can call or WhatsApp us to check availability.' },
  { q:'Do you offer home visits?', a:'For elderly and immobile patients within a 5km radius of Indiranagar, we offer home visits on Tuesdays and Thursdays. Please call at least one day in advance.' },
  { q:'Does the clinic accept health insurance?', a:'Yes. We are empanelled with Star Health, HDFC Ergo, New India Assurance, and the Government CGHS scheme. Please carry your insurance card on your visit.' },
]

const SERVICES = [
  { num:'01', title:'General Checkup', desc:'Comprehensive evaluation covering blood pressure, blood sugar, cholesterol, and full physical examination with personalised wellness guidance.' },
  { num:'02', title:'Chronic Disease Care', desc:'Ongoing management of diabetes, hypertension, hypothyroidism, and arthritis with regular monitoring, medication review, and lifestyle counselling.' },
  { num:'03', title:'Preventive Health', desc:'Annual wellness packages, vaccination schedules (adults & children), and early-detection programmes tailored to your age and risk profile.' },
  { num:'04', title:'Paediatric Care', desc:'Routine check-ups, growth tracking, immunisations, and common illness management for children from infancy through adolescence.' },
]

export default function Minimalism() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formReason, setFormReason] = useState('')
  const [btnHover, setBtnHover] = useState(false)
  const [submitHover, setSubmitHover] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", background:'#ffffff', color:'#0a0a0a', margin:0, padding:0, overflowX:'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'#ffffff', borderBottom:'1px solid #e5e5e3', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 48px', height:64 }}>
        <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:'#0a0a0a', fontWeight:400, letterSpacing:'0.01em' }}>Dr. Arjun Mehta</span>
        <div style={{ display:'flex', alignItems:'center', gap:32 }}>
          {['Services','About','Testimonials','Contact'].map(item => (
            <NavLink key={item} label={item} />
          ))}
        </div>
        <a href="#contact" style={{
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:14,
          color:'#0a0a0a', textDecoration:'none', borderBottom:'1.5px solid #0a0a0a',
          paddingBottom:2, cursor:'pointer',
        }}>Book a visit →</a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background:'#ffffff', paddingTop:64, minHeight:'88vh', display:'flex', alignItems:'stretch' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'58% 42%', alignItems:'stretch' }}>
          {/* Left */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8 }}
            style={{ padding:'72px 64px 72px 48px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid #e5e5e3' }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:'0 0 32px' }}>
              General Physician · Internal Medicine · Bengaluru
            </p>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(40px,4.5vw,68px)', color:'#0a0a0a', lineHeight:1.12, fontWeight:400, margin:'0 0 28px', maxWidth:540 }}>
              Unhurried care.<br />Clear answers.<br /><em>Real results.</em>
            </h1>
            <div style={{ height:1, background:'#e5e5e3', marginBottom:28, maxWidth:480 }} />
            <p style={{ fontSize:16, color:'#555', lineHeight:1.8, margin:'0 0 40px', maxWidth:460 }}>
              Dr. Arjun Mehta has practised general medicine in Bengaluru for over two decades. Every consultation is unhurried, every question answered. Medicine the way it should be.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:40 }}>
              <button style={{ background: btnHover?'#0a0a0a':'white', color: btnHover?'white':'#0a0a0a', border:'1.5px solid #0a0a0a', borderRadius:4, padding:'13px 32px', fontSize:14, fontWeight:500, cursor:'pointer', transition:'all 200ms', fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                onMouseEnter={()=>setBtnHover(true)} onMouseLeave={()=>setBtnHover(false)}>
                Schedule a visit →
              </button>
              <a href="#services" style={{ display:'flex', alignItems:'center', gap:6, color:'#666', fontSize:14, textDecoration:'none', borderBottom:'1px solid #e5e5e3', paddingBottom:2, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                View services
              </a>
            </div>
            {/* Credentials row */}
            <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
              {['MBBS, St. Johns Medical College','MD Internal Medicine','20+ Years Experience','CGHS Empanelled'].map(c => (
                <span key={c} style={{ fontSize:12, color:'#999', display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ color:'#0a0a0a', fontSize:10 }}>—</span> {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — appointment card */}
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }}
            style={{ background:'#f7f6f3', padding:'72px 48px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:10, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:'0 0 12px' }}>Next Available</p>
            <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:30, color:'#0a0a0a', fontWeight:400, margin:'0 0 28px' }}>Tomorrow · 10:00 AM</p>
            <div style={{ height:1, background:'#e5e5e3', marginBottom:28 }} />
            <p style={{ fontSize:12, color:'#999', margin:'0 0 20px', lineHeight:1.6 }}>Available slots this week: <strong style={{ color:'#0a0a0a' }}>Tue, Wed, Thu · 9AM–7PM</strong></p>
            {['10:00 AM', '11:30 AM', '3:00 PM', '5:30 PM'].map(slot => (
              <SlotRow key={slot} time={slot} />
            ))}
            <div style={{ height:1, background:'#e5e5e3', margin:'20px 0' }} />
            <p style={{ fontSize:13, color:'#888', margin:0, lineHeight:1.6 }}>
              Emergency: <a href="tel:+919876543210" style={{ color:'#0a0a0a', fontWeight:500, textDecoration:'none' }}>+91 98765 43210</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE / CREDENTIALS STRIP ── */}
      <div style={{ background:'#0a0a0a', padding:'16px 0', overflow:'hidden', whiteSpace:'nowrap' }}>
        <div style={{ display:'inline-flex', gap:48, animation:'marquee-min 30s linear infinite' }}>
          {['MBBS · St. Johns Medical College', 'MD Internal Medicine', 'CGHS Empanelled', 'Star Health Partner', '20+ Years Experience', '10,000+ Patients', 'Indiranagar Clinic', 'Mon – Sat · 9AM–7PM',
            'MBBS · St. Johns Medical College', 'MD Internal Medicine', 'CGHS Empanelled', 'Star Health Partner', '20+ Years Experience'].map((item, i) => (
            <span key={i} style={{ fontSize:13, color:'rgba(255,255,255,0.50)', letterSpacing:'0.06em', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400 }}>
              {item} <span style={{ color:'rgba(255,255,255,0.20)', marginLeft:24 }}>·</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee-min { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background:'#ffffff', padding:'96px 48px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <motion.div {...reveal()}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:'0 0 52px' }}>What We Treat</p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} index={i} />
            ))}
          </div>
          <div style={{ height:1, background:'#e5e5e3', marginTop:0 }} />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <motion.section {...reveal()} style={{ background:'#0a0a0a', padding:'64px 48px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {[
            { value:'20+', label:'Years in Practice' },
            { value:'10,000+', label:'Patients Treated' },
            { value:'4.9', label:'Google Rating' },
            { value:'₹300', label:'Consultation Fee' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign:'center', padding:'0 20px', borderLeft: i>0 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
              <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:52, color:'#ffffff', fontWeight:400, margin:'0 0 8px', lineHeight:1 }}>{s.value}</p>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.45)', margin:0, letterSpacing:'0.06em', textTransform:'uppercase', fontWeight:500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background:'#ffffff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:420 }}>
          <motion.div {...reveal()} style={{ background:'#f7f6f3', display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px 64px' }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:'0 0 20px' }}>About the Doctor</p>
            <blockquote style={{ fontFamily:"'DM Serif Display',serif", fontStyle:'italic', fontSize:'clamp(22px,2.5vw,32px)', fontWeight:400, color:'#0a0a0a', lineHeight:1.45, margin:'0 0 28px' }}>
              "Medicine is not just science,<br />it is also an art."
            </blockquote>
            <div style={{ height:1, background:'#e5e5e3', marginBottom:24 }} />
            <div style={{ display:'flex', gap:24 }}>
              {[{ val:'2004', label:'Year of MBBS' }, { val:'2006', label:'MD Completed' }, { val:'2008', label:'Clinic Founded' }].map(s => (
                <div key={s.val}>
                  <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:'#0a0a0a', margin:'0 0 4px', fontWeight:400 }}>{s.val}</p>
                  <p style={{ fontSize:11, color:'#999', margin:0, textTransform:'uppercase', letterSpacing:'0.10em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...reveal(0.15)} style={{ background:'#ffffff', display:'flex', alignItems:'center', padding:'80px 64px' }}>
            <div>
              <p style={{ fontSize:15, color:'#555', lineHeight:1.85, margin:'0 0 24px', maxWidth:440 }}>
                Dr. Arjun Mehta completed his MBBS from St. Johns Medical College, Bengaluru, followed by an MD in Internal Medicine. He founded his Indiranagar practice in 2008 with a simple belief: every patient deserves a doctor who listens.
              </p>
              <p style={{ fontSize:15, color:'#555', lineHeight:1.85, margin:'0 0 28px', maxWidth:440 }}>
                Over 20 years and 10,000 patients later, that philosophy has never changed. Consultations are unhurried. Questions are welcome. Every diagnosis is explained in plain language.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                {['Diabetes Management', 'Hypertension', 'Paediatrics', 'Geriatric Care'].map(tag => (
                  <span key={tag} style={{ fontSize:12, color:'#666', border:'1px solid #e5e5e3', borderRadius:4, padding:'5px 12px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ background:'#f7f6f3', padding:'96px 48px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div {...reveal()} style={{ marginBottom:52 }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:0 }}>Patient Stories</p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#e5e5e3' }}>
            {[
              { name:'Meena R.', years:'Patient since 2015', text:'Dr. Mehta has been our family doctor for nearly a decade. He never rushes you, always explains everything clearly. Rare to find a doctor like him.' },
              { name:'Suresh P.', years:'Patient since 2019', text:'I have had diabetes for 12 years. Dr. Mehtas management plan has kept my numbers stable. His guidance on diet and lifestyle has been life-changing.' },
              { name:'Anjali K.', years:'Patient since 2018', text:'Took my parents to him after we moved to Bengaluru. He built a complete health history for both of them in the first visit. Incredibly thorough.' },
            ].map((r, i) => (
              <motion.div key={i} {...reveal(i*0.1)} style={{ background:'#ffffff', padding:'44px 36px' }}>
                <p style={{ fontFamily:"'DM Serif Display',serif", fontStyle:'italic', fontSize:18, color:'#0a0a0a', lineHeight:1.65, margin:'0 0 28px' }}>
                  "{r.text}"
                </p>
                <div style={{ height:1, background:'#e5e5e3', marginBottom:20 }} />
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:14, color:'#0a0a0a', margin:'0 0 4px' }}>{r.name}</p>
                <p style={{ fontSize:12, color:'#999', margin:0 }}>{r.years}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:'#ffffff', padding:'96px 48px' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <motion.div {...reveal()} style={{ marginBottom:52 }}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:0 }}>Common Questions</p>
          </motion.div>
          {FAQS.map((f, i) => (
            <motion.div key={i} {...reveal(i*0.06)} style={{ borderTop:'1px solid #e5e5e3' }}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{ width:'100%', background:'none', border:'none', padding:'24px 0', cursor:'pointer', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:20, textAlign:'left' }}>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:'#0a0a0a', fontWeight:400 }}>{f.q}</span>
                <motion.span animate={{ rotate:openFaq===i?45:0 }} transition={{ duration:0.2 }}
                  style={{ fontSize:22, color:'#999', flexShrink:0, lineHeight:1, marginTop:2 }}>+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}
                    style={{ overflow:'hidden' }}>
                    <p style={{ fontSize:15, color:'#555', lineHeight:1.8, margin:'0 0 24px', maxWidth:560 }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div style={{ borderTop:'1px solid #e5e5e3' }} />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background:'#f7f6f3', padding:'96px 48px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <motion.div {...reveal()}>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'0.15em', margin:'0 0 16px' }}>Book a Visit</p>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(32px,3vw,48px)', fontWeight:400, color:'#0a0a0a', lineHeight:1.2, margin:'0 0 24px' }}>Come in for a consultation</h2>
            <p style={{ fontSize:15, color:'#666', lineHeight:1.8, margin:'0 0 36px' }}>We see patients by appointment and walk-in (limited slots). Same-day appointments are often available.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { label:'Address', val:'14, 3rd Cross, Indiranagar, Bengaluru — 560038' },
                { label:'Phone', val:'+91 98765 43210' },
                { label:'Email', val:'hello@drarjunmehta.in' },
                { label:'Hours', val:'Mon – Sat · 9:00 AM – 7:00 PM' },
              ].map(c => (
                <div key={c.label} style={{ display:'flex', gap:16 }}>
                  <span style={{ fontSize:11, fontWeight:600, color:'#999', textTransform:'uppercase', letterSpacing:'0.10em', minWidth:60, paddingTop:2 }}>{c.label}</span>
                  <span style={{ fontSize:15, color:'#333', lineHeight:1.5 }}>{c.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal(0.15)}>
            <form onSubmit={e=>e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:0 }}>
              <div style={{ marginBottom:32 }}>
                <input type="text" placeholder="Your Name" value={formName} onChange={e=>setFormName(e.target.value)} style={underlineInput} />
              </div>
              <div style={{ marginBottom:32 }}>
                <input type="tel" placeholder="Phone Number" value={formPhone} onChange={e=>setFormPhone(e.target.value)} style={underlineInput} />
              </div>
              <div style={{ marginBottom:32 }}>
                <input type="date" style={underlineInput} />
              </div>
              <div style={{ marginBottom:48 }}>
                <select value={formReason} onChange={e=>setFormReason(e.target.value)} style={{ ...underlineInput, appearance:'none', cursor:'pointer' }}>
                  <option value="" disabled>Reason for visit</option>
                  <option>General Checkup</option>
                  <option>Diabetes / BP Management</option>
                  <option>Child Consultation</option>
                  <option>Preventive Health Package</option>
                  <option>Other</option>
                </select>
              </div>
              <button type="submit"
                style={{ display:'block', width:'100%', background: submitHover?'#1a1a40':'#0a0a0a', color:'white', border:'none', borderRadius:0, height:52, fontSize:14, fontWeight:500, fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:'pointer', transition:'background 200ms', letterSpacing:'0.05em' }}
                onMouseEnter={()=>setSubmitHover(true)} onMouseLeave={()=>setSubmitHover(false)}>
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#ffffff', borderTop:'1px solid #e5e5e3', padding:'48px 48px 32px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:'#0a0a0a', margin:'0 0 12px', fontWeight:400 }}>Dr. Arjun Mehta Clinic</p>
            <p style={{ fontSize:14, color:'#888', lineHeight:1.7, margin:0, maxWidth:260 }}>Patient-first general medicine in the heart of Indiranagar, Bengaluru. Serving families since 2008.</p>
          </div>
          {[
            { title:'Services', items:['General Checkup','Chronic Care','Preventive Health','Paediatrics'] },
            { title:'Info', items:['About Dr. Mehta','Patient FAQ','Insurance','Home Visits'] },
            { title:'Contact', items:['+91 98765 43210','hello@drarjunmehta.in','14, Indiranagar','Mon–Sat 9AM–7PM'] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize:11, fontWeight:600, color:'#999', textTransform:'uppercase', letterSpacing:'0.12em', margin:'0 0 14px' }}>{col.title}</p>
              {col.items.map(item => (
                <p key={item} style={{ fontSize:14, color:'#888', margin:'0 0 8px', cursor:'pointer' }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ height:1, background:'#e5e5e3', marginBottom:20 }} />
        <p style={{ fontSize:12, color:'#bbb', textAlign:'center', margin:0 }}>© 2025 Dr. Arjun Mehta Clinic · All Rights Reserved</p>
      </footer>

      <FloatingButtons styleName="Minimalism" />
    </div>
  )
}

function NavLink({ label }) {
  const [hover, setHover] = useState(false)
  return (
    <a href={`#${label.toLowerCase()}`}
      style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize:14, color: hover?'#0a0a0a':'#888', textDecoration:'none', cursor:'pointer', transition:'color 150ms' }}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      {label}
    </a>
  )
}

function SlotRow({ time }) {
  const [hover, setHover] = useState(false)
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #e5e5e3', cursor:'pointer' }}>
      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:'#333', fontWeight:400 }}>{time}</span>
      <span style={{ fontSize:13, color: hover?'#0a0a0a':'#999', fontWeight:500, textDecoration: hover?'underline':'none', transition:'all 150ms' }}>
        {hover?'Select →':'Available'}
      </span>
    </div>
  )
}

function ServiceCard({ service, index }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ duration:0.6, delay:index*0.1 }}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ padding:'48px 36px', borderLeft: index===0?'none':'1px solid #e5e5e3', borderTop:'1px solid #e5e5e3', background: hover?'#f7f6f3':'#ffffff', transition:'background 250ms', cursor:'default' }}>
      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600, color:'#bbb', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 20px' }}>{service.num}</p>
      <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, fontWeight:400, color:'#0a0a0a', margin:'0 0 16px', lineHeight:1.3 }}>{service.title}</h3>
      <p style={{ fontSize:14, color:'#666', lineHeight:1.75, margin:0 }}>{service.desc}</p>
      <div style={{ marginTop:24, height:1.5, width: hover?48:24, background:'#0a0a0a', transition:'width 300ms', borderRadius:2 }} />
    </motion.div>
  )
}

const underlineInput = {
  display:'block', width:'100%', border:'none', borderBottom:'1px solid #0a0a0a',
  background:'transparent', padding:'10px 0', fontSize:15,
  fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#0a0a0a', outline:'none', boxSizing:'border-box',
}
