import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingButtons from '../components/FloatingButtons';

const colors = {
  white: '#ffffff',
  black: '#0a0a0a',
  yellow: '#ffe600',
  red: '#ff3300',
};

const brutalCard = {
  background: colors.white,
  border: '3px solid #0a0a0a',
  borderRadius: 2,
  padding: '24px',
  boxShadow: '7px 7px 0 #0a0a0a',
};

const btnPrimary = {
  background: '#0a0a0a',
  color: 'white',
  border: '3px solid #0a0a0a',
  borderRadius: 2,
  padding: '15px 32px',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  textTransform: 'uppercase',
  letterSpacing: 1,
  cursor: 'pointer',
  boxShadow: '5px 5px 0 #ff3300',
};

const btnSecondary = {
  background: 'white',
  color: '#0a0a0a',
  border: '3px solid #0a0a0a',
  borderRadius: 2,
  padding: '15px 32px',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
  boxShadow: '5px 5px 0 #0a0a0a',
  textTransform: 'uppercase',
  letterSpacing: 1,
};

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function NeoBrutalism() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: colors.white, overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: colors.white,
        borderBottom: '4px solid #0a0a0a',
        padding: '0 40px',
        height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32,
          color: colors.black,
          letterSpacing: 2,
        }}>IRONFORGE</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['TRAINING', 'PRICING', 'ABOUT', 'CONTACT'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'uppercase',
              color: colors.black,
              textDecoration: 'none',
              letterSpacing: 1,
            }}>{link}</a>
          ))}
          <button style={{
            background: colors.black,
            color: 'white',
            border: '3px solid #0a0a0a',
            borderRadius: 0,
            padding: '10px 22px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: 1,
            cursor: 'pointer',
            boxShadow: '4px 4px 0 #ffe600',
          }}>JOIN NOW</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: colors.white, paddingTop: 90, minHeight: '100vh' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '60px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
        }}>
          {/* Left */}
          <motion.div {...sectionReveal}>
            {/* Pre-header badge */}
            <div style={{
              display: 'inline-block',
              background: colors.yellow,
              border: '3px solid #0a0a0a',
              padding: '6px 16px',
              marginBottom: 24,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: 1,
              boxShadow: '4px 4px 0 #0a0a0a',
            }}>BENGALURU'S #1 TRAINING GYM</div>

            {/* Heading */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 8vw, 120px)',
              lineHeight: 0.9,
              marginBottom: 32,
            }}>
              <div style={{ color: colors.black }}>GET STRONG.</div>
              <div style={{ color: colors.yellow, WebkitTextStroke: '2px #0a0a0a' }}>GET RESULTS.</div>
            </div>

            {/* Subtext block */}
            <div style={{
              background: colors.yellow,
              border: '3px solid #0a0a0a',
              padding: '14px 20px',
              marginBottom: 36,
              boxShadow: '6px 6px 0 #0a0a0a',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: colors.black,
              display: 'inline-block',
            }}>₹999/month · No joining fee · 3 locations</div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button style={btnPrimary}>START TODAY</button>
              <button style={btnSecondary}>VIEW PLANS</button>
            </div>
          </motion.div>

          {/* Right — Stats box */}
          <motion.div {...sectionReveal} transition={{ duration: 0.5, delay: 0.15 }}>
            <div style={{
              background: colors.black,
              border: '3px solid #0a0a0a',
              borderRadius: 2,
              padding: '32px',
              boxShadow: '10px 10px 0 #ffe600',
            }}>
              <div style={{
                background: colors.yellow,
                border: '3px solid #0a0a0a',
                padding: '8px 16px',
                marginBottom: 28,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: 2,
                color: colors.black,
                display: 'inline-block',
              }}>GYM STATS</div>

              {[
                { label: 'MEMBERS', value: '2,500+' },
                { label: 'EQUIPMENT PIECES', value: '150+' },
                { label: 'CERTIFIED TRAINERS', value: '18' },
                { label: 'YEARS IN BENGALURU', value: '12' },
                { label: 'DAILY CLASSES', value: '24' },
                { label: 'LOCATIONS', value: '3' },
              ].map(stat => (
                <div key={stat.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '2px solid #333',
                  padding: '12px 0',
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: colors.yellow, letterSpacing: 1 }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="training" style={{ background: colors.yellow, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...sectionReveal}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 72,
              color: colors.black,
              marginBottom: 12,
              letterSpacing: 2,
            }}>WHAT WE OFFER</div>
            <div style={{
              width: 80, height: 6, background: colors.black, marginBottom: 48,
            }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              {
                icon: '🏋️',
                title: 'WEIGHT TRAINING',
                desc: 'Full free-weights floor, power racks, Olympic platforms, and 80+ machines. Build the physique you deserve.',
              },
              {
                icon: '🏃',
                title: 'CARDIO ZONE',
                desc: 'Treadmills, bikes, rowers, stair climbers — 40+ cardio machines with personal screens. Burn hard, recover fast.',
              },
              {
                icon: '👊',
                title: 'PERSONAL TRAINER',
                desc: 'One-on-one sessions with NSCA-certified coaches. Custom programs, nutrition guidance, weekly progress checks.',
              },
            ].map((s, i) => (
              <motion.div key={s.title} {...sectionReveal} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div style={brutalCard}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 32,
                    color: colors.black,
                    marginBottom: 12,
                    letterSpacing: 1,
                  }}>{s.title}</div>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    color: '#333',
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}>{s.desc}</p>
                  <div style={{
                    display: 'inline-block',
                    background: colors.black,
                    color: 'white',
                    padding: '8px 18px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: 1,
                  }}>FROM ₹999</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: colors.white, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...sectionReveal}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: colors.black,
              marginBottom: 12,
              letterSpacing: 2,
            }}>PLANS & PRICING</div>
            <div style={{ width: 80, height: 6, background: colors.red, marginBottom: 48 }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              {
                name: 'BASIC',
                price: '₹999',
                period: '/month',
                features: ['Gym Floor Access', 'Cardio Zone', 'Locker Room', '1 Guest Pass/Month', 'Open 6AM–10PM'],
                cta: 'GET BASIC',
                highlight: false,
              },
              {
                name: 'PRO',
                price: '₹1,499',
                period: '/month',
                features: ['Everything in Basic', 'Group Classes (20+)', '2 PT Sessions/Month', 'Nutrition Consultation', 'Priority Booking'],
                cta: 'GET PRO',
                highlight: true,
                badge: 'MOST POPULAR',
              },
              {
                name: 'ELITE',
                price: '₹2,499',
                period: '/month',
                features: ['Everything in Pro', 'Unlimited PT Sessions', 'Body Composition Analysis', 'Custom Meal Plan', 'All 3 Locations Access'],
                cta: 'GET ELITE',
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div key={plan.name} {...sectionReveal} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div style={{
                  background: plan.highlight ? colors.yellow : colors.white,
                  border: '3px solid #0a0a0a',
                  borderRadius: 2,
                  padding: '32px 28px',
                  boxShadow: plan.highlight ? '8px 8px 0 #ff3300' : '7px 7px 0 #0a0a0a',
                  position: 'relative',
                  height: '100%',
                  boxSizing: 'border-box',
                }}>
                  {plan.badge && (
                    <div style={{
                      position: 'absolute',
                      top: -3,
                      right: 24,
                      background: colors.black,
                      color: 'white',
                      padding: '6px 14px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>{plan.badge}</div>
                  )}

                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 42,
                    color: colors.black,
                    letterSpacing: 2,
                    marginBottom: 8,
                  }}>{plan.name}</div>

                  <div style={{ marginBottom: 24 }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 56,
                      color: colors.black,
                      letterSpacing: 1,
                    }}>{plan.price}</span>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#444',
                    }}>{plan.period}</span>
                  </div>

                  <div style={{ borderTop: '2px solid #0a0a0a', paddingTop: 20, marginBottom: 28 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 12,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: colors.black,
                      }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 22, height: 22, background: colors.black, color: 'white',
                          fontSize: 12, fontWeight: 700, flexShrink: 0,
                        }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button style={{
                    ...btnPrimary,
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: plan.highlight ? '5px 5px 0 #ff3300' : '5px 5px 0 #ff3300',
                  }}>{plan.cta}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: colors.black,
        borderTop: '6px solid #ffe600',
        padding: '60px 40px 40px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 72,
            color: 'white',
            letterSpacing: 4,
            marginBottom: 16,
          }}>IRONFORGE GYM</div>

          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: colors.yellow,
            marginBottom: 32,
            letterSpacing: 1,
          }}>HSR Layout, Bengaluru · +91 98765 43210</div>

          <div style={{ borderTop: '2px solid #333', paddingTop: 24 }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              color: '#888',
            }}>© 2025 IronForge Gym. All rights reserved.</span>
          </div>
        </div>
      </footer>

      <FloatingButtons styleName="Neo Brutalism" />
    </div>
  );
}
