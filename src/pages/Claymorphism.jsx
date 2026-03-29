import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingButtons from '../components/FloatingButtons';

const clayCard = {
  background: 'white',
  borderRadius: 28,
  boxShadow: '0 8px 0 rgba(139,92,246,0.22), 0 16px 40px rgba(139,92,246,0.10)',
  padding: 24,
};

const clayBtnPurple = {
  borderRadius: 9999,
  background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
  color: 'white',
  fontWeight: 800,
  fontFamily: "'Nunito', sans-serif",
  boxShadow: '0 6px 0 rgba(109,40,217,0.35), inset 0 2px 0 rgba(255,255,255,0.25)',
  border: 'none',
  padding: '13px 28px',
  cursor: 'pointer',
  fontSize: 15,
};

const clayBtnGreen = {
  borderRadius: 9999,
  background: 'linear-gradient(135deg,#10b981,#059669)',
  color: 'white',
  fontWeight: 800,
  fontFamily: "'Nunito', sans-serif",
  boxShadow: '0 6px 0 rgba(5,150,105,0.35), inset 0 2px 0 rgba(255,255,255,0.25)',
  border: 'none',
  padding: '13px 28px',
  cursor: 'pointer',
  fontSize: 15,
};

const pill = (bg, color) => ({
  borderRadius: 9999,
  background: bg,
  color: color || 'white',
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 700,
  fontSize: 13,
  padding: '6px 16px',
  display: 'inline-block',
});

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: 9999,
  border: '2.5px solid #e9d5ff',
  padding: '14px 22px',
  fontFamily: "'Nunito', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  color: '#374151',
  background: '#faf8ff',
  outline: 'none',
  marginBottom: 14,
  boxShadow: '0 4px 0 rgba(139,92,246,0.10)',
};

export default function Claymorphism() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(160deg, #f3f0ff 0%, #edfff6 100%)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'white',
        borderRadius: '0 0 28px 28px',
        boxShadow: '0 8px 32px rgba(139,92,246,0.15)',
        padding: '0 32px',
        height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 22, color: '#8b5cf6' }}>
          Pawsome 🐾
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {['Services', 'Products', 'Gallery', 'Reviews', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14,
              color: '#6b7280', textDecoration: 'none', padding: '8px 14px',
              borderRadius: 9999, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0edff'; e.currentTarget.style.color = '#7c3aed'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; }}
            >{link}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <a href="tel:+919876543210" style={{
            ...clayBtnGreen, padding: '10px 20px', fontSize: 14, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>📞 Call Us</a>
          <button style={{ ...clayBtnPurple, padding: '10px 20px', fontSize: 14 }}>Book Vet Visit</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 90, minHeight: '94vh', position: 'relative', overflow: 'hidden' }}>
        {/* Blob shapes */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, background: 'rgba(139,92,246,0.10)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 320, height: 320, background: 'rgba(16,185,129,0.10)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '35%', left: '43%', width: 200, height: 200, background: 'rgba(251,191,36,0.08)', borderRadius: '50%', zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left */}
          <motion.div {...sectionReveal}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              <span style={{ ...pill('#fef3c7', '#92400e'), fontSize: 12 }}>🏆 #1 Pet Clinic in Koramangala</span>
              <span style={{ ...pill('#d1fae5', '#065f46'), fontSize: 12 }}>✅ RCVS Certified</span>
            </div>
            <h1 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 'clamp(34px,4.5vw,56px)', color: '#4c1d95', lineHeight: 1.15, margin: '0 0 18px' }}>
              Your pet's happiness<br />is our priority 🐶🐱
            </h1>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 400, fontSize: 17, color: '#6b7280', lineHeight: 1.7, margin: '0 0 32px' }}>
              Bengaluru's most trusted pet care destination — vet consultations, grooming, vaccinations, and a premium pet food shop. Because your furry family deserves the best.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
              <button style={clayBtnPurple}>Book Appointment</button>
              <button style={{ borderRadius: 9999, background: 'white', color: '#8b5cf6', fontWeight: 800, fontFamily: "'Nunito', sans-serif", border: '2.5px solid #8b5cf6', padding: '13px 28px', cursor: 'pointer', fontSize: 15, boxShadow: '0 6px 0 rgba(139,92,246,0.15)' }}>Shop Products</button>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[{ n: '5000+', l: 'Happy Pets' }, { n: '4.9★', l: 'Google Rating' }, { n: '10 Yrs', l: 'Experience' }].map(s => (
                <div key={s.n} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 22, color: '#7c3aed' }}>{s.n}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: '#9ca3af' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Clinic card */}
          <motion.div {...sectionReveal} transition={{ duration: 0.55, delay: 0.15 }}>
            <div style={{ ...clayCard, padding: 32, boxShadow: '0 10px 0 rgba(139,92,246,0.20), 0 20px 50px rgba(139,92,246,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🩺</div>
                <div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 17, color: '#4c1d95' }}>Today's Clinic Hours</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: '#8b5cf6' }}>Dr. Meera Nair, BVSc — On Duty</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={pill('linear-gradient(135deg,#10b981,#059669)')}>🌅 Morning: 9AM–1PM</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={pill('linear-gradient(135deg,#3b82f6,#2563eb)')}>🌆 Evening: 5PM–8PM</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={pill('linear-gradient(135deg,#ef4444,#dc2626)')}>🚨 Emergency: +91 98765 43210</span></div>
              </div>
              {/* Next appointments */}
              <div style={{ background: '#faf5ff', borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#7c3aed', marginBottom: 8 }}>Next available slots today</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['10:30 AM', '11:00 AM', '5:30 PM', '6:00 PM'].map(t => (
                    <span key={t} style={{ ...pill('#ede9fe', '#6d28d9'), fontSize: 12, border: '1.5px solid #ddd6fe' }}>{t}</span>
                  ))}
                </div>
              </div>
              <button style={{ ...clayBtnPurple, width: '100%', textAlign: 'center' }}>Book Slot Now</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...sectionReveal} style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 42, color: '#4c1d95', margin: '0 0 10px' }}>Our Services 🐾</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: '#9ca3af', margin: 0 }}>Everything your pet needs under one roof</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { emoji: '🩺', name: 'Vet Consultation', desc: 'Expert care from certified vets for your pet\'s health and wellbeing.', price: '₹400', tag: 'Most Booked', tagColor: '#8b5cf6' },
              { emoji: '🛁', name: 'Grooming', desc: 'Full grooming packages — bath, trim, nail clipping, ear cleaning & more.', price: '₹600', tag: 'New Offer', tagColor: '#10b981' },
              { emoji: '💉', name: 'Vaccination', desc: 'Complete vaccination schedule for dogs, cats & small pets. Certified records.', price: '₹800', tag: 'Essential', tagColor: '#3b82f6' },
              { emoji: '🛒', name: 'Pet Food Shop', desc: 'Royal Canin, Pedigree, fresh treats & specialty food. Delivered home.', price: null, tag: 'Shop Open', tagColor: '#f59e0b' },
            ].map((s, i) => (
              <motion.div key={s.name} {...sectionReveal} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}>
                <div style={{ ...clayCard, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <span style={{ ...pill(`${s.tagColor}20`, s.tagColor), fontSize: 11 }}>{s.tag}</span>
                  </div>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>{s.emoji}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 17, color: '#4c1d95', marginBottom: 8 }}>{s.name}</div>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: '#9ca3af', lineHeight: 1.6, flexGrow: 1, margin: '0 0 14px' }}>{s.desc}</p>
                  {s.price && <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 22, color: '#10b981', marginBottom: 12 }}>from {s.price}</div>}
                  <button style={{ ...clayBtnPurple, width: '100%', textAlign: 'center', fontSize: 14, padding: '11px 20px' }}>Book Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: '64px 40px', background: 'linear-gradient(135deg,#fdf4ff,#f0fff4)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...sectionReveal} style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 42, color: '#4c1d95', margin: '0 0 10px' }}>Shop Pet Essentials 🛒</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: '#9ca3af', margin: 0 }}>Premium brands, freshest stocks, delivered to your door</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { emoji: '🥘', name: 'Royal Canin Dog Food', price: '₹1,200', qty: '3kg bag', bg: '#fef3c7' },
              { emoji: '🐟', name: 'Whiskas Cat Food', price: '₹320', qty: '500g pack', bg: '#dbeafe' },
              { emoji: '🦴', name: 'Rawhide Chew Treats', price: '₹180', qty: 'Pack of 6', bg: '#d1fae5' },
              { emoji: '🛏️', name: 'Orthopedic Pet Bed', price: '₹2,400', qty: 'Medium Size', bg: '#fce7f3' },
              { emoji: '🪮', name: 'Grooming Kit', price: '₹650', qty: '7-piece set', bg: '#ede9fe' },
              { emoji: '💊', name: 'Multivitamin Drops', price: '₹420', qty: '30ml bottle', bg: '#fef9c3' },
            ].map((p, i) => (
              <motion.div key={i} {...sectionReveal} transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}>
                <div style={{ ...clayCard, display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 18, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, boxShadow: '0 4px 0 rgba(139,92,246,0.10)' }}>{p.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15, color: '#4c1d95', marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>{p.qty}</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 18, color: '#10b981' }}>{p.price}</div>
                  </div>
                  <button style={{ ...clayBtnPurple, padding: '8px 14px', fontSize: 13, flexShrink: 0 }}>Add</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...sectionReveal} style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 42, color: '#4c1d95', margin: '0 0 10px' }}>Happy Patients 🐾</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: '#9ca3af', margin: 0 }}>Because every pet deserves a great visit</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { label: 'Max 🐕', breed: 'Golden Retriever', bg: '#fce4ec' },
              { label: 'Luna 🐈', breed: 'Persian Cat', bg: '#e8f5e9' },
              { label: 'Rocky 🐕', breed: 'German Shepherd', bg: '#ede7f6' },
              { label: 'Milo 🐈', breed: 'Ragdoll Cat', bg: '#fff3e0' },
              { label: 'Coco 🐕', breed: 'Cocker Spaniel', bg: '#e3f2fd' },
              { label: 'Bella 🐈', breed: 'Siamese Cat', bg: '#fffde7' },
            ].map((pet, i) => (
              <motion.div key={pet.label} {...sectionReveal} transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}>
                <div style={{ ...clayCard, padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: pet.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 4px 0 rgba(139,92,246,0.12)', flexShrink: 0 }}>
                    {pet.label.split(' ')[1]}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 16, color: '#4c1d95', marginBottom: 4 }}>{pet.label}</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: '#9ca3af' }}>{pet.breed}</div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                      {['Vaccinated ✅', 'Groomed 🛁'].map(t => (
                        <span key={t} style={{ ...pill('#ede9fe', '#6d28d9'), fontSize: 11, padding: '3px 10px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: '64px 40px', background: 'linear-gradient(135deg,#f5f3ff,#ecfdf5)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...sectionReveal} style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 42, color: '#4c1d95', margin: '0 0 10px' }}>What Pet Parents Say 💬</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: '#9ca3af', margin: 0 }}>4.9 stars across 1,200+ Google reviews</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { name: 'Priya S.', pet: 'Mom of Max 🐕', text: 'Dr. Meera is so gentle with Max! He used to dread vet visits but now he actually wags his tail when we arrive. Truly amazing care.' },
              { name: 'Rahul K.', pet: 'Cat parent 🐈', text: 'Luna had a bad infection and they treated her so quickly. The staff is always kind and patient. Won\'t go anywhere else.' },
              { name: 'Anita D.', pet: 'Mom of Coco 🐕', text: 'Grooming session was fantastic! Coco came out looking like a show dog. Highly recommend the premium grooming package.' },
            ].map((r, i) => (
              <motion.div key={i} {...sectionReveal} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}>
                <div style={{ ...clayCard, position: 'relative' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: '0 0 16px', fontStyle: 'italic' }}>"{r.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>{r.name[0]}</div>
                    <div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14, color: '#4c1d95' }}>{r.name}</div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: '#9ca3af' }}>{r.pet}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" style={{ padding: '64px 40px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.div {...sectionReveal}>
            <div style={{ ...clayCard, padding: 40, boxShadow: '0 10px 0 rgba(139,92,246,0.2), 0 24px 60px rgba(139,92,246,0.14)' }}>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 28, color: '#4c1d95', margin: '0 0 8px', textAlign: 'center' }}>Book an Appointment 📋</h2>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: '#9ca3af', textAlign: 'center', margin: '0 0 28px' }}>We'll confirm your slot within 2 hours</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                <input style={{ ...inputStyle, marginRight: 8 }} type="text" placeholder="Your Name" />
                <input style={inputStyle} type="tel" placeholder="Phone Number" />
              </div>
              <input style={inputStyle} type="text" placeholder="Pet's Name & Type (e.g. Max, Dog)" />
              <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option value="">Select Service</option>
                <option>Vet Consultation — ₹400</option>
                <option>Full Grooming — ₹600</option>
                <option>Vaccination Package — ₹800</option>
                <option>Other / Not Sure</option>
              </select>
              <input style={inputStyle} type="date" placeholder="Preferred Date" />
              <textarea style={{ ...inputStyle, borderRadius: 20, resize: 'vertical', minHeight: 80, marginBottom: 20 }} placeholder="Any notes for the vet?" />
              <button style={{ ...clayBtnGreen, width: '100%', textAlign: 'center', fontSize: 16, padding: '15px' }}>
                Book Appointment 🐾
              </button>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: '#9ca3af', textAlign: 'center', marginTop: 14, marginBottom: 0 }}>
                Or call us directly at <strong style={{ color: '#7c3aed' }}>+91 98765 43210</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#2d1b69', borderRadius: '40px 40px 0 0', padding: '48px 40px 32px', marginTop: 20 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, alignItems: 'start', marginBottom: 36 }}>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 28, color: 'white', marginBottom: 10 }}>Pawsome 🐾</div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: '#c4b5fd', lineHeight: 1.6, margin: '0 0 16px' }}>
                Bengaluru's most trusted pet care destination since 2015. Certified vets, loving staff, premium care.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Instagram', 'Facebook', 'YouTube'].map(s => (
                  <span key={s} style={{ ...pill('rgba(255,255,255,0.10)', 'white'), fontSize: 12, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14, color: '#a78bfa', marginBottom: 14 }}>Services</div>
              {['Vet Consultation', 'Grooming', 'Vaccination', 'Pet Shop'].map(s => (
                <p key={s} style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: '#c4b5fd', margin: '0 0 8px', cursor: 'pointer' }}>{s}</p>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14, color: '#a78bfa', marginBottom: 14 }}>Hours</div>
              {['Mon–Sat: 9AM–8PM', 'Sunday: 10AM–6PM', 'Emergency: 24/7'].map(h => (
                <p key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: '#c4b5fd', margin: '0 0 8px' }}>{h}</p>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14, color: '#a78bfa', marginBottom: 14 }}>Visit Us</div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: '#c4b5fd', lineHeight: 1.7, margin: 0 }}>
                12, Koramangala 5th Block<br />Bengaluru 560095<br />+91 98765 43210
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 20, textAlign: 'center', fontFamily: "'Nunito', sans-serif", fontSize: 13, color: '#7c3aed' }}>
            © 2025 Pawsome Pet Shop & Vet Clinic. Made with 🐾 in Bengaluru.
          </div>
        </div>
      </footer>

      <FloatingButtons styleName="Claymorphism" />
    </div>
  );
}
