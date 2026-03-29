import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FloatingButtons from '../components/FloatingButtons'

/* ── Design tokens ──────────────────────────────────────── */
const C = {
  bg: '#000510',
  surface: '#001030',
  cyan: '#00d4ff',
  purple: '#b400ff',
  green: '#00ffb4',
  white: '#ffffff',
  dim: 'rgba(255,255,255,0.65)',
  dim40: 'rgba(255,255,255,0.40)',
  dim25: 'rgba(255,255,255,0.25)',
  dim08: 'rgba(255,255,255,0.08)',
  dim12: 'rgba(255,255,255,0.12)',
  dim15: 'rgba(255,255,255,0.15)',
  dim05: 'rgba(255,255,255,0.05)',
}

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: 20,
}

const IridescentDivider = ({ width = 200 }) => (
  <div style={{
    width,
    height: 1,
    background: 'linear-gradient(90deg,#00d4ff,#b400ff,#00ffb4)',
    margin: '24px auto',
    opacity: 0.6,
  }} />
)

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

/* ── Component ──────────────────────────────────────────── */
export default function LiquidGlass() {
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formTreatment, setFormTreatment] = useState('')
  const [formDate, setFormDate] = useState('')
  const [bookHover, setBookHover] = useState(false)
  const [exploreHover, setExploreHover] = useState(false)
  const [submitHover, setSubmitHover] = useState(false)
  const [navBookHover, setNavBookHover] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap'
    document.head.appendChild(link)

    const dmSans = document.createElement('link')
    dmSans.rel = 'stylesheet'
    dmSans.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap'
    document.head.appendChild(dmSans)
  }, [])

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: C.bg, color: C.white, margin: 0, padding: 0 }}>

      <style>{`
        @keyframes aura-rotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @media (max-width: 768px) {
          .lg-hero-title { font-size: 44px !important; }
          .lg-hero-btns  { flex-direction: column !important; align-items: center !important; }
          .lg-treatments-grid { grid-template-columns: 1fr !important; }
          .lg-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(0,5,16,0.70)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: 68,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 22,
          color: C.white,
          letterSpacing: 8,
        }}>
          AURA
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {['Treatments', 'About', 'Book'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: C.dim,
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
            >
              {item}
            </a>
          ))}
          <button
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: C.white,
              background: navBookHover ? 'rgba(255,255,255,0.14)' : C.dim08,
              border: `1px solid ${C.dim15}`,
              borderRadius: 100,
              padding: '8px 20px',
              cursor: 'pointer',
              transition: 'background 200ms',
            }}
            onMouseEnter={() => setNavBookHover(true)}
            onMouseLeave={() => setNavBookHover(false)}
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: C.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Rotating blob */}
        <div style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, rgba(0,212,255,0.20), rgba(180,0,255,0.15), rgba(0,255,180,0.20), rgba(0,212,255,0.20))',
          filter: 'blur(80px)',
          top: '50%',
          left: '50%',
          animation: 'aura-rotate 25s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: 800,
          }}
        >
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 10,
            color: 'rgba(255,255,255,0.50)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: '0 0 28px 0',
          }}>
            Bengaluru's Premier Wellness Destination
          </p>

          <h1
            className="lg-hero-title"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 80,
              color: C.white,
              lineHeight: 1.1,
              margin: '0 0 8px 0',
            }}
          >
            Where luxury<br />meets serenity
          </h1>

          <IridescentDivider width={200} />

          <div
            className="lg-hero-btns"
            style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}
          >
            <button
              style={{
                ...glassCard,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: C.white,
                padding: '14px 32px',
                cursor: 'pointer',
                border: bookHover ? '1px solid rgba(0,212,255,0.40)' : '1px solid rgba(255,255,255,0.10)',
                transition: 'border 200ms, background 200ms',
                background: bookHover ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={() => setBookHover(true)}
              onMouseLeave={() => setBookHover(false)}
            >
              Book Experience
            </button>
            <button
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: C.white,
                background: exploreHover ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: 20,
                padding: '14px 32px',
                cursor: 'pointer',
                transition: 'background 200ms',
              }}
              onMouseEnter={() => setExploreHover(true)}
              onMouseLeave={() => setExploreHover(false)}
            >
              Explore Treatments
            </button>
          </div>
        </motion.div>
      </section>

      {/* TREATMENTS */}
      <motion.section
        id="treatments"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
        style={{ padding: '100px 24px', background: C.bg }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: 10,
            color: C.cyan,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: '0 0 56px 0',
          }}>
            Our Treatments
          </p>

          <div
            className="lg-treatments-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
          >
            {[
              {
                accent: C.cyan,
                name: 'Deep Tissue Massage',
                price: '₹3,500',
                duration: '90 min',
                desc: 'Targets deep muscle layers to release chronic tension. Ideal for athletes and those with persistent muscle pain or postural stress.',
              },
              {
                accent: C.purple,
                name: 'Ayurvedic Ritual',
                price: '₹4,200',
                duration: '120 min',
                desc: 'A full-body experience rooted in ancient Ayurvedic tradition — warm herbal oils, rhythmic strokes, and deep holistic restoration.',
              },
              {
                accent: C.green,
                name: 'Crystal Facial',
                price: '₹2,800',
                duration: '75 min',
                desc: 'Harnessing the energy of healing crystals alongside premium botanicals to rejuvenate, brighten, and deeply hydrate the skin.',
              },
            ].map((t) => (
              <TreatmentCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* STATS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
        style={{ padding: '0 24px 100px', background: C.bg }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            className="lg-stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}
          >
            {[
              { value: '12', label: 'Treatment Rooms', accent: C.cyan },
              { value: '2010', label: 'Since', accent: C.purple },
              { value: '★', label: 'Award Winning', accent: C.green },
              { value: '5★', label: 'Rated', accent: C.cyan },
            ].map((s) => (
              <div
                key={s.label}
                style={{ ...glassCard, padding: '28px 24px', textAlign: 'center', overflow: 'hidden', position: 'relative' }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: s.accent,
                  borderRadius: '20px 20px 0 0',
                  opacity: 0.85,
                }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 44,
                  fontWeight: 400,
                  color: C.white,
                  margin: '12px 0 8px 0',
                  lineHeight: 1,
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: C.dim40,
                  margin: 0,
                  letterSpacing: '0.05em',
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BOOKING FORM */}
      <motion.section
        id="book"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionReveal}
        style={{ padding: '0 24px 100px', background: C.bg }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ ...glassCard, padding: 40 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 40,
              color: C.white,
              margin: '0 0 8px 0',
              textAlign: 'center',
            }}>
              Reserve Your Experience
            </h2>
            <IridescentDivider width={120} />

            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 16 }}>
              {[
                { placeholder: 'Your Name', value: formName, onChange: setFormName, type: 'text' },
                { placeholder: 'Phone Number', value: formPhone, onChange: setFormPhone, type: 'tel' },
              ].map((field) => (
                <input
                  key={field.placeholder}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={glassInputStyle}
                />
              ))}

              <select
                value={formTreatment}
                onChange={(e) => setFormTreatment(e.target.value)}
                style={{ ...glassInputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="" disabled>Select Treatment</option>
                <option value="deep-tissue">Deep Tissue Massage — ₹3,500</option>
                <option value="ayurvedic">Ayurvedic Ritual — ₹4,200</option>
                <option value="crystal-facial">Crystal Facial — ₹2,800</option>
              </select>

              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                placeholder="Preferred Date"
                style={{ ...glassInputStyle, colorScheme: 'dark' }}
              />

              <button
                type="submit"
                style={{
                  display: 'block',
                  width: '100%',
                  background: submitHover
                    ? 'linear-gradient(90deg, #00c8f0, #a000ef)'
                    : 'linear-gradient(90deg, #00d4ff, #b400ff)',
                  color: C.white,
                  border: 'none',
                  borderRadius: 12,
                  height: 52,
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: 'pointer',
                  transition: 'background 200ms, box-shadow 200ms',
                  boxShadow: submitHover
                    ? '0 0 32px rgba(0,212,255,0.45), 0 0 60px rgba(180,0,255,0.25)'
                    : '0 0 20px rgba(0,212,255,0.25)',
                  marginTop: 8,
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer style={{ background: C.bg, padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: 36,
            color: C.white,
            letterSpacing: 12,
            margin: '0 0 4px 0',
          }}>
            AURA
          </p>
          <IridescentDivider width={160} />
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.40)',
            margin: '0 0 16px 0',
          }}>
            Koramangala, Bengaluru · hello@aura-spa.in · +91 98765 43210
          </p>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 12,
            color: 'rgba(255,255,255,0.25)',
            margin: 0,
          }}>
            © 2025 Aura Luxury Spa & Wellness
          </p>
        </div>
      </footer>

      <FloatingButtons styleName="Liquid Glass" />
    </div>
  )
}

/* ── TreatmentCard ──────────────────────────────────────── */
function TreatmentCard({ accent, name, price, duration, desc }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{
        ...glassCard,
        padding: 28,
        overflow: 'hidden',
        position: 'relative',
        transition: 'border 200ms, background 200ms',
        border: hover ? `1px solid ${accent}44` : '1px solid rgba(255,255,255,0.10)',
        background: hover ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: accent,
        opacity: 0.9,
        borderRadius: '20px 20px 0 0',
      }} />

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 24,
        fontWeight: 400,
        color: '#ffffff',
        margin: '16px 0 8px 0',
        lineHeight: 1.2,
      }}>
        {name}
      </h3>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 500, color: accent }}>
          {price}
        </span>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12,
          color: 'rgba(255,255,255,0.40)',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 100,
          padding: '3px 10px',
        }}>
          {duration}
        </span>
      </div>

      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 13,
        fontWeight: 400,
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.7,
        margin: 0,
      }}>
        {desc}
      </p>
    </div>
  )
}

/* ── Shared style objects ───────────────────────────────── */
const glassInputStyle = {
  display: 'block',
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  padding: '13px 20px',
  fontSize: 14,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  color: '#ffffff',
  outline: 'none',
  marginBottom: 16,
  boxSizing: 'border-box',
  transition: 'border 150ms',
}
