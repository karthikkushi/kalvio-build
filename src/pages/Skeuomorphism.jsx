import { useEffect } from 'react'
import FloatingButtons from '../components/FloatingButtons'
import { motion } from 'framer-motion'

/* ── Warm, approachable restaurant palette ── */
const CREAM   = '#fdf6ee'
const PAPER   = '#f5ebe0'
const TAN     = '#e3cdb0'
const RUST    = '#c0522a'
const RUST2   = '#a8431f'
const BROWN   = '#5c2f14'
const MUTED   = '#7d5a42'
const WHITE   = '#ffffff'

const btnRust = {
  background: `linear-gradient(160deg, ${RUST}, ${RUST2})`,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 12px rgba(192,82,42,0.40)`,
  border: 'none',
  borderRadius: 8,
  padding: '13px 32px',
  color: WHITE,
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 15,
}

const btnOutline = {
  background: 'transparent',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15)`,
  border: `2px solid ${RUST}`,
  borderRadius: 8,
  padding: '11px 32px',
  color: RUST,
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 15,
}

const inputStyle = {
  background: WHITE,
  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.08)',
  border: `1px solid ${TAN}`,
  color: BROWN,
  borderRadius: 6,
  padding: '12px 18px',
  width: '100%',
  outline: 'none',
  fontFamily: "'Lato', sans-serif",
  fontSize: 15,
  boxSizing: 'border-box',
}

const menuCard = {
  background: WHITE,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.80), 0 4px 16px rgba(92,47,20,0.10)',
  border: `1px solid ${TAN}`,
  borderRadius: 12,
  padding: '28px 24px',
}

const sectionAnim = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 auto 24px', maxWidth: 420 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${TAN})` }} />
      <div style={{ width: 8, height: 8, background: RUST, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ width: 5, height: 5, background: TAN, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ width: 8, height: 8, background: RUST, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${TAN})` }} />
    </div>
  )
}

export default function Skeuomorphism() {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@400;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: CREAM, minHeight: '100vh', color: BROWN, overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: WHITE,
        borderBottom: `2px solid ${TAN}`,
        padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
        boxShadow: '0 2px 12px rgba(92,47,20,0.10)',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900, fontStyle: 'italic',
          fontSize: 22, color: RUST,
        }}>
          Sharma's Kitchen
        </span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Menu', 'About', 'Gallery', 'Reserve'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              color: MUTED, fontSize: 14, textDecoration: 'none',
              fontFamily: "'Lato', sans-serif", fontWeight: 700,
              letterSpacing: 0.5, cursor: 'pointer',
            }}>{link}</a>
          ))}
        </div>
        <button style={btnRust}>Reserve Table</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(180deg, #fdf0e4 0%, ${CREAM} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '130px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Subtle warm texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 80px)',
        }} />
        <motion.div {...sectionAnim} style={{ position: 'relative', zIndex: 1, maxWidth: 700, width: '100%' }}>
          <OrnamentalDivider />
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900, fontSize: 'clamp(44px,7vw,80px)', color: BROWN,
            margin: '0 0 16px', lineHeight: 1.05,
          }}>
            Sharma's Kitchen
          </h1>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontSize: 20,
            color: MUTED, margin: '0 0 20px',
          }}>
            Authentic North Indian flavors since 1998
          </p>
          {/* Award pill */}
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(145deg, #fff5ee, #ffe8d6)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.80), 0 2px 8px rgba(192,82,42,0.18), 0 0 0 1px ${TAN}`,
            borderRadius: 999,
            padding: '6px 18px', marginBottom: 36,
            fontSize: 12, fontWeight: 700, color: RUST,
            fontFamily: "'Lato', sans-serif", letterSpacing: 0.8,
          }}>
            🏆 Voted Best Biryani in Bengaluru 2024
          </div>
          <OrnamentalDivider />
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {[{ val: '25+', label: 'Years' }, { val: '4.9★', label: 'Rating' }, { val: '500+', label: 'Daily Covers' }].map(s => (
              <div key={s.val} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: RUST }}>{s.val}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: MUTED, letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={btnRust}>View Menu</button>
            <button style={btnOutline}>Book Table</button>
          </div>
        </motion.div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{ background: PAPER, padding: '80px 24px', borderTop: `1px solid ${TAN}` }}>
        <motion.div {...sectionAnim} style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RUST, marginBottom: 10 }}>Our Specialties</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 42, color: BROWN, margin: 0 }}>Signature Dishes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { name: 'Dal Makhani', price: '₹280', desc: 'Slow-cooked black lentils in rich tomato cream sauce, a timeless classic.', tag: '⭐ Best Seller' },
              { name: 'Butter Chicken', price: '₹380', desc: 'Tender chicken in velvety tomato-butter gravy, mildly spiced to perfection.', tag: '🔥 Most Loved' },
              { name: 'Paneer Tikka Masala', price: '₹320', desc: 'Grilled cottage cheese cubes in aromatic masala gravy, smoky and rich.', tag: '🌱 Veg' },
              { name: 'Dum Biryani', price: '₹350', desc: 'Aged basmati rice slow-cooked with spices and caramelised onions.', tag: '🏆 Award Winning' },
              { name: 'Shahi Korma', price: '₹420', desc: 'Rich royal gravy with cashews, cream, and whole aromatic spices.', tag: '👑 Premium' },
              { name: 'Garlic Naan', price: '₹60', desc: 'Soft leavened bread baked in tandoor, slathered with garlic butter.', tag: '🫓 Must Try' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.90), 0 12px 28px rgba(92,47,20,0.14)` }}
                transition={{ duration: 0.25 }}
                style={menuCard}
              >
                <div style={{ display: 'inline-block', background: `${RUST}15`, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: RUST, fontFamily: "'Lato', sans-serif", marginBottom: 10 }}>{item.tag}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: BROWN, margin: '0 0 6px' }}>{item.name}</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: RUST, margin: '0 0 10px' }}>{item.price}</p>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: CREAM, padding: '80px 24px', borderTop: `1px solid ${TAN}` }}>
        <motion.div {...sectionAnim} style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RUST, marginBottom: 12 }}>Our Story</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 40, color: BROWN, margin: '0 0 20px' }}>Since 1998</h2>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.8, margin: '0 0 20px' }}>
                Sharma's Kitchen was born from a family passion for authentic North Indian cooking.
                For over 25 years, we have served Bengaluru the same recipes passed down through generations —
                slow-cooked, hand-ground spices, tandoor-baked breads, and rich hearty curries.
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.8, margin: 0 }}>
                Every dish tells a story of heritage, love, and craftsmanship. Walk in as a guest, leave as family.
              </p>
            </div>
            {/* Right plaques */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { value: '25+', label: 'Years of Excellence' },
                { value: '200+', label: 'Dishes on Menu' },
                { value: '4.9★', label: 'Google Rating' },
                { value: '50,000+', label: 'Happy Diners' },
              ].map((plaque, i) => (
                <div key={i} style={{
                  background: WHITE,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.90), 0 4px 14px rgba(92,47,20,0.10)`,
                  border: `1px solid ${TAN}`,
                  borderRadius: 12, padding: '20px 16px', textAlign: 'center',
                  borderLeft: `3px solid ${RUST}`,
                }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: RUST, lineHeight: 1 }}>{plaque.value}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 6, fontFamily: "'Lato', sans-serif" }}>{plaque.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── GALLERY / AMBIANCE ── */}
      <section id="gallery" style={{ background: PAPER, padding: '80px 24px', borderTop: `1px solid ${TAN}` }}>
        <motion.div {...sectionAnim} style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RUST, marginBottom: 10 }}>Ambiance</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 40, color: BROWN, margin: 0 }}>The Experience</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { label: 'Main Hall', bg: '#e8d5c0', emoji: '🪑' },
              { label: 'Tandoor Corner', bg: '#f0c8a8', emoji: '🔥' },
              { label: 'Private Dining', bg: '#ddc8b0', emoji: '🕯️' },
              { label: 'Open Kitchen', bg: '#f5dcc8', emoji: '👨‍🍳' },
              { label: 'Rooftop Seating', bg: '#e0d4c0', emoji: '🌙' },
              { label: 'Takeaway Counter', bg: '#f2e0cc', emoji: '📦' },
            ].map((v, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                style={{ height: 120, background: v.bg, borderRadius: 12, border: `1px solid ${TAN}`, boxShadow: `0 4px 12px rgba(92,47,20,0.08)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 32 }}>{v.emoji}</span>
                <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, color: BROWN }}>{v.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: CREAM, padding: '80px 24px', borderTop: `1px solid ${TAN}` }}>
        <motion.div {...sectionAnim} style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RUST, marginBottom: 10 }}>Reviews</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 40, color: BROWN, margin: 0 }}>What Our Guests Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { name: 'Priya R.', text: 'The Dal Makhani here is unlike anything else in Bangalore. Rich, creamy, and absolutely authentic. Been coming for 10 years!', stars: 5 },
              { name: 'Akash M.', text: 'Perfect spot for a family dinner. Huge portions, warm service, and the Dum Biryani is heavenly. Highly recommended.', stars: 5 },
              { name: 'Sunita K.', text: 'Took my parents here for their anniversary. They loved the decor and the food was exactly like home-cooked North Indian food.', stars: 5 },
            ].map((r, i) => (
              <motion.div key={i} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                style={{ ...menuCard, position: 'relative', borderLeft: `3px solid ${RUST}` }}>
                <div style={{ color: '#f59e0b', fontSize: 16, marginBottom: 12 }}>{'★'.repeat(r.stars)}</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 15, color: MUTED, lineHeight: 1.7, margin: '0 0 16px' }}>"{r.text}"</p>
                <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 14, color: BROWN }}>— {r.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── RESERVATION FORM ── */}
      <section id="reserve" style={{ background: PAPER, padding: '80px 24px', borderTop: `1px solid ${TAN}` }}>
        <motion.div
          {...sectionAnim}
          style={{
            maxWidth: 560, margin: '0 auto',
            background: WHITE,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.90), 0 12px 40px rgba(92,47,20,0.12)`,
            border: `1px solid ${TAN}`,
            borderRadius: 16, padding: '48px 40px',
            borderTop: `3px solid ${RUST}`,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RUST, marginBottom: 8 }}>Reservations</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 32, color: BROWN, margin: 0 }}>Reserve Your Table</h2>
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { placeholder: 'Your Name', type: 'text' },
                { placeholder: 'Phone Number', type: 'tel' },
                { placeholder: 'Date', type: 'date' },
                { placeholder: 'Number of Guests', type: 'number' },
              ].map(field => (
                <input key={field.placeholder} type={field.type} placeholder={field.placeholder} style={inputStyle} />
              ))}
              <select style={{ ...inputStyle }}>
                <option value="">Preferred Time</option>
                <option value="lunch">Lunch (12PM – 3PM)</option>
                <option value="evening">Evening (6PM – 8PM)</option>
                <option value="dinner">Dinner (8PM – 11PM)</option>
              </select>
              <textarea placeholder="Special requests or occasion?" style={{ ...inputStyle, resize: 'vertical', minHeight: 80, borderRadius: 6 }} />
              <motion.button
                whileHover={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px rgba(192,82,42,0.50)` }}
                type="submit"
                style={{ ...btnRust, width: '100%', marginTop: 8, fontSize: 16, padding: '15px' }}
              >
                Confirm Reservation
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: BROWN,
        borderTop: `3px solid ${RUST}`,
        padding: '48px 40px 32px',
        color: CREAM,
      }}>
        <motion.div {...sectionAnim} style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 36 }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic', fontSize: 26, color: CREAM, margin: '0 0 10px' }}>Sharma's Kitchen</p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: TAN, lineHeight: 1.7, margin: 0 }}>
                Authentic North Indian flavors served with love since 1998. Family-owned, Bengaluru's favourite.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, color: TAN, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 14px' }}>Hours</p>
              {['Mon–Fri: 12PM–3PM, 7PM–11PM', 'Sat–Sun: 12PM–11PM', 'Holidays: 12PM–11PM'].map(h => (
                <p key={h} style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: `${CREAM}bb`, margin: '0 0 6px' }}>{h}</p>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, color: TAN, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 14px' }}>Contact</p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: `${CREAM}bb`, margin: '0 0 6px' }}>Brigade Road, Bengaluru</p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: `${CREAM}bb`, margin: '0 0 6px' }}>+91 80 4123 5678</p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: `${CREAM}bb`, margin: 0 }}>sharma@kitchen.in</p>
            </div>
          </div>
          <div style={{ height: 1, background: `${TAN}44`, marginBottom: 20 }} />
          <p style={{ fontSize: 13, color: `${TAN}88`, margin: 0, fontFamily: "'Lato', sans-serif", textAlign: 'center' }}>
            &copy; 2025 Sharma's Kitchen &nbsp;·&nbsp; All Rights Reserved
          </p>
        </motion.div>
      </footer>

      <FloatingButtons styleName="Skeuomorphism" />
    </div>
  )
}
