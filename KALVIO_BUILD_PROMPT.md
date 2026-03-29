# Kalvio Build — Ultimate Claude Code Prompt
# Read this entire file carefully before writing a single line of code.
# This is a production-grade project. Every detail matters.

---

## WHAT YOU ARE BUILDING

A complete multi-page React web application for **Kalvio Build** — a premium Indian web agency that builds beautiful websites for small and medium businesses starting at ₹3,000.

This app has **8 pages total:**
- 1 stunning dark premium landing page (the main marketing page)
- 1 design selector page (where clients pick their style)
- 6 individual sample websites (one per design style)

**The client journey:**
1. Client lands on the landing page — gets impressed
2. Clicks "See Our Styles" — goes to design selector page
3. Sees 6 style cards — clicks one to see a live sample website
4. Explores the sample site — sees what their website could look like
5. Clicks "I want this style" or "← See all styles" to go back
6. Fills the contact form on the selector page
7. Form saves to Supabase + opens WhatsApp with their details

---

## QUALITY BAR

This is not a demo. This is a real agency website.
Every page must look like it could win on Awwwards.
Reference: linear.app, stripe.com, framer.com for the landing page quality.
No generic layouts. No placeholder content. No "lorem ipsum".
Every section must have real fake business content that looks convincing.

---

## TECH STACK

- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS v3 + custom CSS where Tailwind falls short
- **Animations:** Framer Motion (use extensively)
- **Database:** Supabase JS client
- **Deployment:** Vercel
- **Icons:** Material Symbols Outlined (Google)

---

## FONTS — THIS IS CRITICAL

Import ALL of these from Google Fonts in index.html or index.css:

```
Syne: weights 700, 800 — used for ALL headlines across the entire app
DM Sans: weights 300, 400, 500, 700 — used for ALL body text
Epilogue: weights 700, 800 — fallback display font
Inter: weights 300, 400, 500, 600 — fallback body font
```

Google Fonts import URL:
```
https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&family=Epilogue:wght@700;800&family=Inter:wght@300;400;500;600&display=swap
```

Special fonts loaded per sample site page (load via useEffect adding link tag to document.head):
- Skeuomorphism page: Playfair Display (weights 400, 700), Lato (weights 400, 700)
- Neo Brutalism page: Bebas Neue (weight 400), Space Grotesk (weights 400, 700)
- Minimalism page: DM Serif Display (weight 400), DM Sans (already loaded)
- Claymorphism page: Nunito (weights 400, 600, 700, 800)
- Liquid Glass page: Cormorant Garamond (weights 300, 400, 600 italic)

Font usage rules:
- font-family: 'Syne', 'Epilogue', sans-serif → ALL headings, h1 through h4
- font-family: 'DM Sans', 'Inter', sans-serif → ALL body text, labels, buttons
- NEVER use system fonts, Arial, Roboto, or Inter as primary fonts

---

## SETUP COMMANDS

```bash
npm create vite@latest kalvio-build -- --template react
cd kalvio-build
npm install
npm install react-router-dom framer-motion @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## FOLDER STRUCTURE

```
kalvio-build/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── lib/
│   │   └── supabase.js
│   ├── components/
│   │   ├── FloatingButtons.jsx
│   │   └── StyleCard.jsx
│   └── pages/
│       ├── Landing.jsx          ← NEW: main marketing landing page
│       ├── Selector.jsx         ← design selector + contact form
│       ├── Glassmorphism.jsx
│       ├── Skeuomorphism.jsx
│       ├── NeoBrutalism.jsx
│       ├── Claymorphism.jsx
│       ├── Minimalism.jsx
│       └── LiquidGlass.jsx
├── .env.local
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

---

## CONFIGURATION FILES

### .env.local
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WA_NUMBER=91XXXXXXXXXX
```

### src/lib/supabase.js
```javascript
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### tailwind.config.js
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        headline: ['Syne', 'Epilogue', 'sans-serif'],
        body: ['DM Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#7c6fff',
          'purple-light': '#a89fff',
          'purple-dark': '#5646d7',
          green: '#00d97e',
          pink: '#ff6b9d',
          bg: '#080810',
          surface: '#13131b',
          card: '#1f1f28',
        }
      }
    },
  },
  plugins: [],
}
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&family=Epilogue:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', 'Inter', sans-serif;
  background-color: #080810;
  color: #e4e1ed;
  overflow-x: hidden;
}

/* Noise texture overlay — apply to dark pages */
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.04;
}

/* Grid dot pattern */
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #a89fff 50%, #7c6fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass card */
.glass-card {
  background: rgba(31, 31, 40, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

/* Marquee animation */
.marquee-container { overflow: hidden; white-space: nowrap; }
.marquee-content {
  display: inline-block;
  animation: marquee 30s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Rotating blob animation for Liquid Glass */
@keyframes rotate-blob {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Material Symbols */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #080810; }
::-webkit-scrollbar-thumb { background: rgba(124,111,255,0.4); border-radius: 3px; }
```

### vercel.json
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

### src/App.jsx
```jsx
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
```

---

## SUPABASE SETUP

Run this SQL in Supabase SQL Editor after creating a free project:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  business_name text not null,
  business_type text not null,
  city text not null,
  budget text not null,
  style_selected text not null,
  notes text,
  created_at timestamptz default now()
);
```

---

## GLOBAL STATE: SELECTED STYLE

Use localStorage to persist selected style across all pages.

```javascript
// helpers used everywhere
const getSelectedStyle = () => localStorage.getItem('kalvio_selected_style') || ''
const setSelectedStyle = (style) => localStorage.setItem('kalvio_selected_style', style)
```

Valid values: `'Glassmorphism'` | `'Skeuomorphism'` | `'Neo Brutalism'` | `'Claymorphism'` | `'Minimalism'` | `'Liquid Glass'`

---

## FRAMER MOTION PATTERNS — USE THESE EVERYWHERE

```jsx
// Page load hero animation
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

// Stagger container for cards/lists
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Scroll reveal — use on every section
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>

// Button interactions
<motion.button
  whileHover={{ scale: 1.04, y: -2 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>

// Card hover
<motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25 }}>
```

---

## COMPONENT: src/components/FloatingButtons.jsx

Used on ALL 6 sample site pages. Fixed bottom-right corner.

```jsx
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
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
        onClick={handleWA}
        className="px-5 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg shadow-green-500/30 flex items-center gap-2 text-sm font-body"
        style={{ boxShadow: '0 8px 24px rgba(0,217,126,0.35)' }}
      >
        💬 I want this style
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/styles')}
        className="px-5 py-3 bg-white text-purple-700 font-bold rounded-full border-2 border-purple-300 shadow-lg text-sm font-body"
      >
        ← See all styles
      </motion.button>
    </div>
  )
}
```

---

## PAGE 1: src/pages/Landing.jsx

This is the most important page. It must look Awwwards-level premium.
Dark, sophisticated, trustworthy. Like linear.app meets an Indian business.

### Design System for Landing Page
```
Background primary: #080810
Background surface: #13131b
Background card: #1f1f28
Border default: rgba(255,255,255,0.07)
Border hover: rgba(255,255,255,0.15)
Text primary: #e4e1ed
Text secondary: rgba(228,225,237,0.55)
Text tertiary: rgba(228,225,237,0.30)
Accent purple: #7c6fff
Accent purple light: #a89fff
Accent green: #00d97e (or #45f798)
Accent pink: #ff6b9d
```

### Background Decorations (position fixed, z-index -1, pointer-events none)
```jsx
// Three large blurred gradient mesh blobs
<div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
  <div style={{
    position: 'absolute', top: '-10%', right: '-10%',
    width: '500px', height: '500px', borderRadius: '50%',
    background: '#7c6fff', filter: 'blur(120px)', opacity: 0.15
  }} />
  <div style={{
    position: 'absolute', bottom: '20%', left: '-10%',
    width: '400px', height: '400px', borderRadius: '50%',
    background: '#ff6b9d', filter: 'blur(120px)', opacity: 0.10
  }} />
  <div style={{
    position: 'absolute', top: '40%', left: '30%',
    width: '300px', height: '300px', borderRadius: '50%',
    background: '#04da7f', filter: 'blur(100px)', opacity: 0.08
  }} />
</div>
// Noise overlay
<div className="noise-overlay" />
// Grid dot pattern
<div className="grid-pattern" style={{ position: 'fixed' }} />
```

### SECTION 1 — Navigation
Fixed top, full width, z-index 50.
Background: rgba(8,8,16,0.80) + backdrop-filter blur(20px)
Bottom border: 1px solid rgba(255,255,255,0.06)

Left: Logo "Kalvio Build" — font-family Syne, weight 700, 20px, white
The word "Build" has underline decoration in #7c6fff (text-decoration, 2px, underline-offset 4px)

Center (hidden on mobile): nav links "Work" "Services" "Pricing" "Contact"
DM Sans 400, 14px, text-secondary color. On hover: white, transition 200ms

Right: "Get Started →" pill button
Background: rgba(124,111,255,0.15)
Border: 1px solid rgba(124,111,255,0.40)
Text: #a89fff, DM Sans 500, 14px, border-radius 9999px, padding 8px 20px
On hover: background rgba(124,111,255,0.25)

Framer Motion: slide down from y -60, opacity 0 to 1 on mount, duration 0.5s

### SECTION 2 — Hero
padding-top: 128px (below fixed nav), padding-bottom: 80px
max-width: 448px (mobile-first, center aligned)
On desktop: max-width 900px, two-column layout

**Small label pill (top):**
Background: rgba(124,111,255,0.08)
Border: 1px solid rgba(124,111,255,0.25)
Border-radius: 9999px, padding: 6px 16px
Text: "✦ WEBSITES FOR INDIAN BUSINESSES"
DM Sans 500, 10px, letter-spacing 0.15em, uppercase, color #a89fff
Framer Motion: fade in from y 20, delay 0.1s

**Main headline:**
font-family: Syne, weight 800
font-size: 40px mobile / 72px desktop
line-height: 1.05
letter-spacing: -1.5px mobile / -2.5px desktop
Apply className="text-gradient" to the whole headline
Text: "Your business deserves a website that actually works."
Framer Motion: fade in from y 30, delay 0.2s

**Subtext:**
"We build stunning, fast websites for clinics, gyms, and local shops... starting at just ₹3,000."
DM Sans 300, 18px, rgba(228,225,237,0.55), line-height 1.7
max-width: 520px, margin-top 24px
Framer Motion: fade in from y 20, delay 0.3s

**CTA Buttons (stacked on mobile, side by side on desktop):**
Button 1 — "Start Your Project":
background: #7c6fff, color white, DM Sans 700, 16px
padding: 18px 32px, border-radius: 14px
box-shadow: 0 0 40px rgba(124,111,255,0.30)
On hover: box-shadow increases, y -2px

Button 2 — "View Our Styles →":
background: transparent
border: 1px solid rgba(255,255,255,0.15)
color: rgba(228,225,237,0.70), DM Sans 600, 16px
padding: 18px 32px, border-radius: 14px
On hover: border rgba(255,255,255,0.30), color white

**Trust badges row below buttons:**
3 items with green checkmark icons (Material Symbols "check_circle" FILL 1):
"No advance payment" · "Ready in 5 days" · "100% satisfaction"
DM Sans 400, 12px, text-tertiary

**On click "Start Your Project":** navigate to /styles
**On click "View Our Styles →":** navigate to /styles

**Preview Cards (bottom of hero — desktop only):**
3 small floating cards shown at bottom, slightly tilted and overlapping:
These are decorative CSS-drawn previews (no images)
Card 1 (rotate -3deg): dark glass card labeled "Glassmorphism"
Card 2 (rotate 0deg, elevated): cream + black borders, labeled "Neo Brutalism"
Card 3 (rotate 3deg): white minimal card, labeled "Minimalism"
Each 140px × 90px, subtle floating shadow
Framer Motion: slide up from y 40 with spring animation

### SECTION 3 — Social Proof Marquee
Full width (no max-width), padding 48px top/bottom
Background: #13131b
Top and bottom: 1px solid rgba(255,255,255,0.04)

Small label above: "Trusted by businesses across India"
DM Sans 400, 11px, letter-spacing 0.10em, uppercase, text-tertiary

Marquee (infinite scroll, 30s):
```jsx
<div className="marquee-container">
  <div className="marquee-content flex gap-8 text-xl font-headline font-bold" style={{ color: 'rgba(228,225,237,0.35)' }}>
    <span>🏥 Dr. Meera Clinic</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>🐾 Pawsome Pet Shop</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>🏋️ IronForge Gym</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>☕ The Local Brew</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>🧵 Saree Palace</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>🛠️ FixIt Services</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>💇 Style Studio Salon</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    <span>🦷 SmileCare Dental</span>
    <span style={{ color: '#7c6fff', opacity: 0.4 }}>✦</span>
    {/* Duplicate all for infinite loop */}
  </div>
</div>
```
On hover any item: color turns white

### SECTION 4 — The Problem
max-width: 1200px, centered, padding: 120px 24px
Background: #080810

Section label: "THE REALITY" — DM Sans 500, 11px, letter-spacing 0.15em, #ff6b9d, uppercase

Headline (Syne 700, 40px mobile / 48px desktop):
"Your competitor already has a website."
color: text-primary

**Left column — Stats (stacked on mobile, 50% on desktop):**
Three stat cards, each in a glass-card with border-radius 16px, padding 32px:

Stat 1:
Big number: "73%" — Syne 800, 56px, text-gradient class
Text: "of customers search online before visiting a local shop"
DM Sans 400, 15px, text-secondary

Stat 2:
Big number: "2×" — Syne 800, 56px, text-gradient class
Text: "more trust for businesses with a professional website"
DM Sans 400, 15px, text-secondary

Stat 3:
Big number: "₹0" — Syne 800, 56px, color #00d97e
Text: "cost to start — we only take payment after you approve"
DM Sans 400, 15px, text-secondary

**Right column — Comparison card (glass-card, border-radius 20px, padding 32px):**

Title: "Without a website, you are invisible to:" DM Sans 600, 16px, text-primary

5 red ✗ items (Material Symbols "cancel", color #ffb4ab):
✗ Google searches in your area
✗ Customers who moved to your city
✗ People who ask "do you have a website?"
✗ Online appointment customers
✗ Young customers under 35

Thin divider line: 1px rgba(255,255,255,0.08)

"With Kalvio Build you get:" DM Sans 600, 16px, color #00d97e

5 green ✓ items (Material Symbols "check_circle" FILL 1, color #45f798):
✓ A beautiful website in 5 days
✓ Mobile-first responsive design
✓ WhatsApp button for instant leads
✓ Google Maps integration
✓ Ongoing WhatsApp support

### SECTION 5 — Style Selector Preview
max-width: 1280px, centered, padding: 120px 24px
Background: #080810

Section label: "PICK YOUR STYLE" uppercase, #7c6fff, DM Sans 500, 11px

Headline (Syne 800, 52px):
Line 1: "Choose how your website"
Line 2: "should look and feel"
Apply text-gradient to "look and feel"

Subtext: "Click any style to see a full live preview — a complete fake business website in that style."
DM Sans 400, 17px, text-secondary, max-width 600px, centered

**6 cards grid — 3 col desktop, 2 col tablet, 1 col mobile, gap 24px:**

Each card:
- className="glass-card" + border-radius 20px + overflow hidden
- On hover: border rgba(255,255,255,0.15) + translateY(-6px) + transition 0.3s
- Clicking navigates to the style's route

Top 220px: CSS-drawn style preview (detailed below)

Bottom section padding 24px:
- Style name: Syne 700, 20px, color text-primary
- Description: DM Sans 400, 14px, text-secondary, margin-top 6px
- "Best for:" + pill tags: DM Sans 400, 12px
  Pill style: background rgba(255,255,255,0.06), border 1px rgba(255,255,255,0.10), border-radius 20px, padding 3px 10px
- "See Live Preview →" button:
  width 100%, height 44px, border-radius 10px, margin-top 16px
  Background: rgba(124,111,255,0.10)
  Border: 1px solid rgba(124,111,255,0.25)
  Text: #a89fff, DM Sans 600, 14px
  Arrow → moves right 3px on hover (CSS transition)
  On click: navigate to style route + save to localStorage

**CSS-ONLY Style Previews (absolutely NO img tags):**

**Card 1 — Glassmorphism**
Best for: Clinics · Salons · Spas
Description: "Frosted glass effect, premium and modern"
Navigate to: /styles/glassmorphism
Preview JSX (height 220px, overflow hidden, position relative):
```jsx
<div style={{ height: 220, background: 'linear-gradient(135deg, #1a0060 0%, #0d1a60 100%)', position: 'relative', overflow: 'hidden' }}>
  {/* Two blurred blob divs */}
  <div style={{ position:'absolute', top:-30, left:-20, width:120, height:120, borderRadius:'50%', background:'rgba(150,100,255,0.5)', filter:'blur(30px)' }} />
  <div style={{ position:'absolute', bottom:-20, right:-10, width:100, height:100, borderRadius:'50%', background:'rgba(255,100,200,0.4)', filter:'blur(25px)' }} />
  {/* Glass card center */}
  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:160, padding:16, backdropFilter:'blur(16px)', background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.20)', borderRadius:16 }}>
    <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,rgba(120,100,255,0.6),rgba(200,100,255,0.6))', marginBottom:10 }} />
    <div style={{ height:6, background:'rgba(255,255,255,0.20)', borderRadius:3, marginBottom:6 }} />
    <div style={{ height:6, width:'65%', background:'rgba(255,255,255,0.12)', borderRadius:3, marginBottom:10 }} />
    <div style={{ height:26, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.20)', borderRadius:8 }} />
  </div>
</div>
```

**Card 2 — Skeuomorphism**
Best for: Restaurants · Cafes · Shops
Description: "Real-world textures, trustworthy and classic"
Navigate to: /styles/skeuomorphism
Preview JSX (height 220px):
```jsx
<div style={{ height:220, background:'#1a0e06', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
  <div style={{ width:165, background:'linear-gradient(145deg,#3d2510,#241508)', borderRadius:12, padding:14, boxShadow:'inset 0 1px 0 rgba(255,220,100,0.15), 0 8px 24px rgba(0,0,0,0.8)', border:'1px solid rgba(255,180,50,0.10)' }}>
    <div style={{ height:5, width:'55%', background:'rgba(200,134,10,0.4)', borderRadius:2, marginBottom:10 }} />
    <div style={{ height:24, background:'linear-gradient(145deg,#1a1008,#251808)', borderRadius:6, boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', marginBottom:6, border:'1px solid rgba(0,0,0,0.4)' }} />
    <div style={{ height:24, background:'linear-gradient(145deg,#1a1008,#251808)', borderRadius:6, boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)', marginBottom:8, border:'1px solid rgba(0,0,0,0.4)' }} />
    <div style={{ height:30, background:'linear-gradient(145deg,#c8860a,#a06a05)', borderRadius:8, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 8px rgba(0,0,0,0.4)' }} />
  </div>
</div>
```

**Card 3 — Neo Brutalism**
Best for: Gyms · Bike shops · Bold brands
Description: "Bold, raw, high contrast — impossible to ignore"
Navigate to: /styles/neo-brutalism
Preview JSX (height 220px):
```jsx
<div style={{ height:220, background:'#f0ebe0', display:'flex', alignItems:'center', justifyContent:'center' }}>
  <div style={{ width:160, background:'white', border:'3px solid #0a0a0a', borderRadius:4, padding:12, boxShadow:'7px 7px 0px #0a0a0a' }}>
    <div style={{ height:22, background:'#ffe600', border:'2px solid #0a0a0a', borderRadius:2, marginBottom:8 }} />
    <div style={{ height:6, background:'#0a0a0a', borderRadius:1, marginBottom:5 }} />
    <div style={{ height:4, width:'65%', background:'rgba(0,0,0,0.2)', borderRadius:1, marginBottom:8 }} />
    <div style={{ height:26, background:'#0a0a0a', borderRadius:2, boxShadow:'4px 4px 0 #ff3300' }} />
  </div>
</div>
```

**Card 4 — Claymorphism**
Best for: Pet shops · Cafes · Kids
Description: "Puffy 3D shapes, friendly and approachable"
Navigate to: /styles/claymorphism
Preview JSX (height 220px):
```jsx
<div style={{ height:220, background:'linear-gradient(135deg,#ffe8f5,#e8f0ff,#e8fff5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
  <div style={{ width:160, background:'white', borderRadius:28, padding:14, boxShadow:'0 8px 0 rgba(180,140,220,0.40), 0 16px 32px rgba(150,100,200,0.20), inset 0 2px 0 rgba(255,255,255,0.90)' }}>
    <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#c084fc,#818cf8)', boxShadow:'0 6px 0 rgba(130,80,200,0.3), inset 0 2px 0 rgba(255,255,255,0.4)', margin:'0 auto 10px' }} />
    <div style={{ height:8, borderRadius:8, background:'linear-gradient(90deg,#f0e8ff,#e8eeff)', marginBottom:6, boxShadow:'0 2px 0 rgba(180,160,230,0.2)' }} />
    <div style={{ height:8, width:'65%', borderRadius:8, background:'linear-gradient(90deg,#ffe8f8,#ffe8d0)', marginBottom:10, boxShadow:'0 2px 0 rgba(230,160,160,0.2)' }} />
    <div style={{ height:30, borderRadius:16, background:'linear-gradient(135deg,#c084fc,#818cf8)', boxShadow:'0 5px 0 rgba(130,80,200,0.35), inset 0 2px 0 rgba(255,255,255,0.30)' }} />
  </div>
</div>
```

**Card 5 — Minimalism**
Best for: Doctors · Lawyers · Consultants
Description: "Clean white space, sharp on every screen"
Navigate to: /styles/minimalism
Preview JSX (height 220px):
```jsx
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
```

**Card 6 — Liquid Glass**
Best for: Luxury spas · High-end clinics · Tech
Description: "Futuristic Apple Vision Pro style, ultra premium"
Navigate to: /styles/liquid-glass
Preview JSX (height 220px):
```jsx
<div style={{ height:220, background:'linear-gradient(135deg,#000510,#001030,#050010)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
  <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'conic-gradient(from 0deg, rgba(0,212,255,0.15), rgba(180,0,255,0.15), rgba(0,255,180,0.15), rgba(0,212,255,0.15))', filter:'blur(40px)', animation:'rotate-blob 20s linear infinite' }} />
  <div style={{ position:'relative', zIndex:1, width:160, padding:14, backdropFilter:'blur(20px)', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, boxShadow:'inset 0 0 30px rgba(255,255,255,0.03)' }}>
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
```

### SECTION 6 — How It Works
max-width: 1000px, centered, padding: 120px 24px
Background: #0e0e1a (slightly lighter)
Top + bottom: 1px solid rgba(255,255,255,0.05)

Section label: "THE PROCESS" uppercase, #7c6fff, DM Sans 500, 11px
Headline (Syne 800, 52px): "From zero to live in 5 days"
Subtext: "Simple, fast, and done entirely on WhatsApp." DM Sans 400, 17px, text-secondary

**3 steps — vertical timeline with line connector (mobile), horizontal (desktop):**

Vertical line between steps: 1px solid rgba(255,255,255,0.08) on left at x=16px

Step 1:
- Circle: 32px, background #7c6fff, white text "01", box-shadow 0 0 20px rgba(124,111,255,0.4)
- Title: "You pick a style" Syne 600, 20px
- Description: "Browse our 6 design styles. Click any to see a full live sample website. Pick the one that feels right for your business." DM Sans 400, 15px, text-secondary

Step 2:
- Circle: 32px, background rgba(255,255,255,0.05), border 1px rgba(255,255,255,0.15), text "02"
- Title: "We understand your needs" Syne 600, 20px
- Description: "Fill a simple form. We WhatsApp you within 2 hours with a custom plan and exact quote for your business." DM Sans 400, 15px, text-secondary

Step 3:
- Circle: same as step 2, text "03"
- Title: "We build and deliver"
- Description: "We build your website in 3–5 days. You approve it. We go live. Payment only after you are 100% happy." DM Sans 400, 15px, text-secondary

**Callout card below (glass-card, border-radius 16px, padding 20px 28px):**
Background: rgba(0,217,126,0.05), border: 1px solid rgba(0,217,126,0.15)
Icon: "rocket_launch" Material Symbol in #00d97e
Text: "Average delivery time: " + "4.2 days" (color #45f798) + " this month · All communication on WhatsApp · Pay only after approval"
DM Sans 400, 14px, rgba(228,225,237,0.60)

### SECTION 7 — Why Kalvio Build
max-width: 1200px, centered, padding: 120px 24px
Background: #080810

Section label: "WHY US" uppercase, #7c6fff
Headline (Syne 800, 52px): "Built for Indian businesses"

**6 feature cards in 3×2 grid (2×3 on mobile):**
Each glass-card, border-radius 16px, padding 28px
On hover: border rgba(255,255,255,0.15), translateY -4px

Each card:
- Icon: 40×40 rounded square (border-radius 12px), gradient bg, emoji inside
- Title: Syne 600, 18px, text-primary, margin-top 16px
- Description: DM Sans 400, 14px, text-secondary, margin-top 8px, line-height 1.6

Feature 1: 📱 Mobile First
Icon bg: linear-gradient(135deg,#7c6fff,#9b6fff)
Title: "Mobile First"
Desc: "Every website works perfectly on all phones. 80% of your customers browse on mobile."

Feature 2: 💬 WhatsApp Support
Icon bg: linear-gradient(135deg,#00b377,#00d97e)
Title: "WhatsApp Support"
Desc: "All communication on WhatsApp. No emails, no calls, no confusion. Fast and simple."

Feature 3: ⚡ 5 Day Delivery
Icon bg: linear-gradient(135deg,#f59e0b,#ef6c00)
Title: "5 Day Delivery"
Desc: "Complete website delivered in 3 to 5 working days. No long waits, no delays."

Feature 4: ✅ Pay After Approval
Icon bg: linear-gradient(135deg,#3b82f6,#1d4ed8)
Title: "Pay After Approval"
Desc: "See the finished website first. Pay only after you are fully happy. Zero risk."

Feature 5: 🇮🇳 India Focused
Icon bg: linear-gradient(135deg,#f97316,#ea580c)
Title: "India Focused"
Desc: "We understand Indian customers, UPI payments, Hindi/English content and local SEO."

Feature 6: 🔧 Ongoing Support
Icon bg: linear-gradient(135deg,#8b5cf6,#6d28d9)
Title: "Ongoing Support"
Desc: "We stay available on WhatsApp after delivery. Updates and fixes handled quickly."

### SECTION 8 — Pricing
max-width: 1100px, centered, padding: 120px 24px
Background: #0e0e1a

Section label: "PRICING" uppercase, #7c6fff
Headline (Syne 800, 52px): "Simple, transparent pricing"
Subtext: "No hidden charges. No maintenance fees unless you want them." DM Sans 400, 17px, text-secondary

**3 pricing cards — stacked on mobile, side by side on desktop:**

Card 1 — Starter:
glass-card, border-radius 20px, padding 36px
Plan label: "STARTER" DM Sans 600, 12px, text-tertiary, uppercase, letter-spacing 0.1em
Price: "₹3,000" Syne 800, 52px, text-primary
Note: "/one-time payment" DM Sans 400, 13px, text-tertiary
Divider: 1px rgba(255,255,255,0.07)
Features (5, each with Material Symbol "done" in #7c6fff):
  ✓ 1 page website
  ✓ Mobile responsive
  ✓ WhatsApp button
  ✓ Google Maps embed
  ✓ Contact form
CTA: "Select Starter" — border 1px rgba(255,255,255,0.15), DM Sans 600, text-secondary

Card 2 — Business (HIGHLIGHTED):
Background: rgba(124,111,255,0.10), border 1px solid rgba(124,111,255,0.40)
Border-radius 20px, padding 36px
"Most Popular" badge: top-right absolute, background #7c6fff, white DM Sans 600, 10px, uppercase, pill
Plan label: "BUSINESS" in #a89fff
Price: "₹7,000" Syne 800, 52px, text-gradient class
Features (8):
  ✓ Up to 5 pages
  ✓ Mobile responsive
  ✓ WhatsApp button
  ✓ Google Maps embed
  ✓ Contact form
  ✓ Image gallery
  ✓ Basic SEO setup
  ✓ 2 free revisions
CTA: "Get Started Now" — background #7c6fff, white text, box-shadow 0 10px 30px rgba(124,111,255,0.3)

Card 3 — Premium:
glass-card, same as Card 1
Plan label: "PREMIUM"
Price: "₹12,000"
Features (10):
  ✓ Up to 8 pages
  ✓ All Business features
  ✓ Online booking form
  ✓ WhatsApp auto-reply bot
  ✓ Instagram feed integration
  ✓ Google review widget
  ✓ Hindi + English support
  ✓ Analytics dashboard
  ✓ 3 months WhatsApp support
  ✓ Priority delivery (2 days)
CTA: "Inquire about Premium" — border style

Below all cards (centered):
"All prices include hosting setup · Domain not included (₹500/year) · Maintenance available at ₹500/month"
DM Sans 400, 13px, text-tertiary

### SECTION 9 — FAQ
max-width: 800px, centered, padding: 120px 24px
Background: #080810

Headline (Syne 800, 52px): "Questions you probably have"

5 accordion items (React useState for open/close):
Each item: glass-card, border-radius 12px, padding 20px 24px, cursor pointer
On click: toggle open/close state
Question row: DM Sans 600, 15px, text-primary + "+" icon (rotates to "−" when open, CSS transition)
Answer: DM Sans 400, 15px, text-secondary, line-height 1.7 (hidden when closed, animated height with Framer Motion)

Q1: "Do I need to pay anything upfront?"
A1: "No. We show you the complete finished website design before taking any payment. You pay 50% only after you approve the design, and the remaining 50% when the website goes live."

Q2: "I don't know anything about websites. Can you still help?"
A2: "Absolutely. You don't need any technical knowledge. Just tell us what your business does, share some photos, and we handle everything. All on WhatsApp in English or Hindi."

Q3: "Will my website work on iPhones and Android phones?"
A3: "Yes. Every website we build is mobile-first — designed for phones first, then for desktop. It works perfectly on all phones, tablets and computers."

Q4: "Do you handle website maintenance after delivery?"
A4: "Yes. Small text changes are free for 30 days after delivery. For ongoing maintenance, we charge ₹500 per month which includes updates, backups and support."

Q5: "Is GST included in the pricing?"
A5: "Our prices are exclusive of GST. 18% GST will be added for businesses that require a GST invoice. For individuals, no GST is charged."

### SECTION 10 — Final CTA
Full width, padding: 160px 24px
Background: #0e0e1a
Top border: 1px solid rgba(255,255,255,0.06)
position: relative, overflow: hidden

Decorative background text (position absolute, centered, pointer-events none):
"KALVIO" in Syne 800, 200px desktop/120px mobile, color rgba(255,255,255,0.02)

Content (all centered, position relative z-index 1):
Small label: "LET'S BUILD SOMETHING" DM Sans 500, 11px, letter-spacing 0.2em, #7c6fff, uppercase

Headline (Syne 800, 56px mobile 40px):
"Ready to get your
business online?"
Apply text-gradient

Subtext: "Join businesses across India who trusted Kalvio Build."
DM Sans 400, 18px, text-secondary, max-width 400px, centered

Two CTA buttons (stacked mobile, side by side desktop):
Button 1: "See All Styles →" — purple gradient, 18px 40px padding, border-radius 14px, large shadow
  On click: navigate to /styles

Button 2: "💬 Chat on WhatsApp" — rgba green bg, green border, green text
  On click: open wa.me link

Trust text: "Average response: under 2 hours · Available Mon–Sat, 9AM–8PM"
DM Sans 400, 13px, text-tertiary

### FOOTER
Background: #080810
Top border: 1px solid rgba(255,255,255,0.06)
Padding: 60px 24px 40px

4 column grid desktop, 2 column tablet, 1 column mobile:

Column 1 — Brand:
"Kalvio Build" Syne 700, 20px, white
"Build" has purple underline decoration
Tagline: "Professional websites for Indian businesses" DM Sans 400, 14px, text-tertiary
Location pill: "📍 Bengaluru, India" with glass-card styling

Column 2 — Services:
Heading: "Services" Syne 600, 13px, text-tertiary, uppercase
Links (DM Sans 400, 14px, text-secondary, hover → white):
Website Design / Mobile Websites / E-commerce / SEO Setup / WhatsApp Integration

Column 3 — Design Styles:
Heading: "Design Styles" same style
Links: Glassmorphism / Skeuomorphism / Neo Brutalism / Claymorphism / Minimalism / Liquid Glass

Column 4 — Contact:
Heading: "Contact" same style
Items (Material Symbol icon + text):
location_on: Bengaluru, Karnataka
mail: hello@kalviobuild.in
chat: +91 XXXXXXXXXX (WhatsApp)
Small note: "Reply within 2 hours" in #00d97e

Bottom bar (1px border-top rgba white 0.06):
Left: "© 2025 Kalvio Build. All rights reserved." DM Sans 400, 12px, text-tertiary
Right: "Made with ✦ in Bengaluru" DM Sans 400, 12px, text-tertiary

---

## PAGE 2: src/pages/Selector.jsx

This page is in Claymorphism style.
Background: soft pastel gradient linear-gradient(135deg, #f0edff 0%, #edfff6 100%)
All content uses rounded corners, puffy shadows, pastel colors.

### State
```javascript
const [selectedStyle, setSelectedStyle] = useState(getSelectedStyle())
const [formData, setFormData] = useState({
  name: '', phone: '', businessName: '',
  businessType: '', city: '', budget: '', notes: ''
})
const [submitting, setSubmitting] = useState(false)
const [submitted, setSubmitted] = useState(false)
const formRef = useRef(null)
const cardsRef = useRef(null)
```

### Navbar (clay style)
Fixed, full width
Background: rgba(255,255,255,0.80) + backdrop-filter blur 20px
Border-radius bottom: 32px
Box-shadow: 0 8px 32px rgba(106,55,212,0.12)
Left: "Kalvio Build" Syne 700, purple (#6a37d4), italic
Right: "Professional websites from ₹3,000" purple pill badge
Framer Motion: slide down on mount

### Hero (clay style)
Center aligned, padding-top 140px

3 step progress pills:
Pill 1: "1. Pick Style" — filled purple if no style selected, filled green if selected
Pill 2: "2. Fill Details" — filled purple if style selected
Pill 3: "3. We Build" — filled green only after form submitted
All use Framer Motion scale pulse when they activate

Headline (Syne 800, 64px desktop/40px mobile):
"Pick a style you love —"
"we build the rest" (italic, color #6a37d4)

Subtext: "No tech knowledge needed. Just point and we deliver." DM Sans 300, 18px, gray

### Style Cards Grid (clay style)
ref={cardsRef}
3 col desktop, 2 col tablet, 1 col mobile, gap 28px

Each card:
- White background, border-radius 28px
- Box-shadow: 0 20px 60px -15px rgba(106,55,212,0.15)
- On hover: translateY -6px, shadow increases
- Selected state: border 3px solid #6a37d4, box-shadow 0 0 0 4px rgba(106,55,212,0.15), checkmark badge top-right (absolute, 28px circle, purple bg, white ✓)

Card top (200px): same CSS previews as Landing page — identical JSX

Card bottom (padding 20px):
Style name: Syne 700, 18px, dark purple
Description: DM Sans 400, 13px, gray
"Best for:" tags: pastel pill backgrounds, DM Sans 400, 11px
"See Live Preview →" button:
  Green gradient (from #00b377 to #009060)
  Pill shape, border-radius 9999px, padding 12px 20px
  Box-shadow: 0 8px 20px rgba(0,179,119,0.30)
  DM Sans 600, 13px, white
  On click: setSelectedStyle + navigate to sample site

On card body click (not preview button):
  setSelectedStyle(styleName) → save to localStorage
  Smooth scroll to form section (formRef.current.scrollIntoView({ behavior: 'smooth' }))

Framer Motion: stagger 0.08s per card, whileHover y -6

### Contact Form (clay style)
ref={formRef}
max-width: 680px, centered, margin-top 80px, position relative

Floating badge (absolute, top -24px, left 50%, transform -50%):
If selectedStyle set: background #6a37d4, white text, bold
  "✓ Style selected: [selectedStyle]"
If not set: background #f59e0b, white text
  "Please select a style above ↑"
Framer Motion: animate scale 1.1 → 1.0 spring when selectedStyle changes

Form card: white bg, border-radius 28px, box-shadow 0 40px 80px -20px rgba(106,55,212,0.20), padding 48px

Title: "Tell us about your business" Syne 700, 28px, #6a37d4
Subtitle: "We will WhatsApp you in 2 hours with your quote" DM Sans 400, 15px, gray

All inputs shared style:
  background: #eff1f3
  border: 2px solid transparent
  On focus: border-color rgba(106,55,212,0.30), background white, transition 200ms
  border-radius: 9999px (pill) for all except textarea (20px)
  padding: 14px 24px
  font-family: DM Sans, 15px
  outline: none

Form layout:
Row 1 (2 col grid, gap 14px): Name + WhatsApp Number (type="tel")
Row 2 (2 col grid): Business Name + Business Type (select):
  Options: Doctor/Clinic, Dermatologist, Vet/Pet Shop, Bike Accessories,
           Salon/Spa, Restaurant/Cafe, Gym/Fitness, Sweet Shop, Pharmacy, Other
Row 3 (2 col grid): City + Budget (select):
  Options: ₹3,000–₹5,000, ₹5,000–₹10,000, ₹10,000–₹15,000, ₹15,000+
Full width: Notes textarea (3 rows)

Submit button:
Full width, height 56px, border-radius 9999px
Background: linear-gradient(135deg, #00b377, #009060)
Text: "💬 Send on WhatsApp →" DM Sans 700, 16px, white
Box-shadow: 0 12px 30px -8px rgba(0,179,119,0.40)
Shows spinner (animated border div) when submitting=true
Framer Motion: whileHover y -2 scale 1.02, whileTap scale 0.97

Validation:
  name.trim() not empty
  phone.replace(/\D/g,'').length >= 10
  businessName.trim() not empty
  businessType not empty
  city.trim() not empty
  budget not empty
  selectedStyle not empty → if empty: cardsRef.current.scrollIntoView({behavior:'smooth'}) + window.alert('Please select a design style first!')

On submit:
```javascript
// 1. Save to Supabase
const { error } = await supabase.from('leads').insert([{
  name: formData.name,
  phone: formData.phone,
  business_name: formData.businessName,
  business_type: formData.businessType,
  city: formData.city,
  budget: formData.budget,
  style_selected: selectedStyle,
  notes: formData.notes || null,
}])

// 2. Build WhatsApp message
const msg = encodeURIComponent(
  `Hello Kalvio Build! 👋\n\nI want a website for my business.\n\nName: ${formData.name}\nBusiness: ${formData.businessName} (${formData.businessType})\nCity: ${formData.city}\nDesign Style: ${selectedStyle}\nBudget: ${formData.budget}${formData.notes ? `\nSpecial needs: ${formData.notes}` : ''}\n\nPlease send me a quote!`
)

// 3. Mark submitted
setSubmitted(true)

// 4. Open WhatsApp
window.open(`https://wa.me/${import.meta.env.VITE_WA_NUMBER}?text=${msg}`, '_blank')
```

Success screen (replaces form when submitted=true):
Framer Motion: scale from 0.8 to 1 with spring
Large green circle (80px, background rgba(0,179,119,0.15), border 2px solid #00b377)
  With "✓" Material Symbol "check_circle" FILL 1, 48px, #00b377
"We got your details!" Syne 700, 24px, dark
"Opening WhatsApp now — we reply within 2 hours." DM Sans 400, 15px, gray
"Thanks [formData.name]! 🎉" Syne 600, 18px, #6a37d4

### Footer (clay style)
Background: #f3f0ff, border-radius top 40px, padding 40px
"Kalvio Build" Syne 700, purple, centered
"Professional websites from ₹3,000 · Bengaluru, India" DM Sans 400, gray, centered
"© 2025 Kalvio Build" DM Sans 400, 12px, text-tertiary, centered

---

## PAGES 3–8: SAMPLE SITE PAGES

Every sample site page must:
1. Render `<FloatingButtons styleName="[StyleName]" />` as the last element in the return
2. Have a complete, convincing fake business website
3. Use Framer Motion whileInView for every section reveal
4. Be fully mobile responsive
5. Use real content — prices, names, services, timings

---

### pages/Glassmorphism.jsx
Business: Dr. Priya Skin & Hair Clinic, Bengaluru
`<FloatingButtons styleName="Glassmorphism" />`

Load fonts: none extra (uses global Syne + DM Sans)

Full page: position relative, overflow hidden
Background element (position fixed, inset 0, z-index 0, pointer-events none):
```jsx
<div style={{ position:'fixed', inset:0, zIndex:0, background:'linear-gradient(135deg, #1a0060 0%, #001040 50%, #0d0030 100%)' }}>
  <div style={{ position:'absolute', top:'-20%', left:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'rgba(120,60,255,0.25)', filter:'blur(100px)' }} />
  <div style={{ position:'absolute', bottom:'10%', right:'-10%', width:'500px', height:'500px', borderRadius:'50%', background:'rgba(200,60,255,0.15)', filter:'blur(80px)' }} />
  <div style={{ position:'absolute', top:'40%', left:'30%', width:'400px', height:'400px', borderRadius:'50%', background:'rgba(60,120,255,0.15)', filter:'blur(90px)' }} />
</div>
```

All content: position relative, z-index 1
All text: white
Glass card style (reuse as inline style): `{ backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:16 }`

Sections (all fade-in whileInView):

1. FIXED NAVBAR:
Glass style bg (rgba white 0.06, backdrop blur 20px)
Bottom border 1px rgba white 0.10
Left: "Dr. Priya Clinic" Syne 700, 18px, white
Center: "Services" "About" "Contact" DM Sans 400, 14px, rgba white 0.70
Right: "Book Now →" glass pill button (rgba white 0.10 bg, white border, white text)

2. HERO (min-height 100vh, flex center, padding-top 100px):
Desktop: 2 column layout. Mobile: single column

Left column:
Small label pill: "MBBS · MD Dermatology · 15 Years Experience" (glass pill, DM Sans 500, 12px)
Headline Syne 800, 56px desktop/36px mobile, white:
"Expert Skin &
Hair Care
in Bengaluru"
Subtext: "Advanced treatments for acne, hair fall, skin brightening and anti-ageing. USFDA approved technology." DM Sans 300, 17px, rgba white 0.70
Two buttons:
  "Book Appointment" — glass card button (rgba white 0.12 bg, white border, white text)
  "View Treatments" — transparent, white border

Right column (desktop only):
Glass card (280px wide, padding 28px):
Header: "Next Available Slot" DM Sans 600, 14px, rgba white 0.60
Date pills: "Today 4PM" "Tomorrow 11AM" "Tomorrow 3PM" — glass pill buttons
Selected state: rgba white 0.20 bg
"Book This Slot →" full-width glass button

3. SERVICES (padding 100px 24px):
Heading: "Our Treatments" Syne 800, 48px, white, centered
3 glass cards in a row (1 col mobile):
Card 1: "Acne & Pimple Treatment" — ₹800/session — "Advanced laser therapy for clear skin" — Framer Motion hover lift
Card 2: "Hair Fall Solution" — ₹1,200/session — "PRP therapy and growth factor treatment"
Card 3: "Skin Brightening" — ₹1,500/session — "Chemical peels and photofacial treatment"

4. STATS (4 glass boxes in a row, 2 col mobile):
"15+ Years" / "5,000+ Patients" / "100% Safe" / "FDA Approved"
Each: large number Syne 800, 40px, white. Label DM Sans 400, 14px, rgba white 0.60

5. CONTACT FORM (max-width 600px, centered, glass card, padding 40px):
Title: "Book a Consultation" Syne 700, 32px, white
Fields (glass style inputs — rgba white 0.06 bg, white border rgba 0.15, white text, border-radius 12px):
  Name / Phone / Preferred Date (type date) / Treatment (select dropdown)
Submit: glass button full width with white glow on hover

6. FOOTER (dark glass bg, padding 40px):
"Dr. Priya Skin & Hair Clinic" Syne 700, white
"MG Road, Bengaluru · +91 98765 43210 · Mon–Sat 10AM–7PM"
DM Sans 400, rgba white 0.50

---

### pages/Skeuomorphism.jsx
Business: Sharma's Kitchen — Authentic North Indian Restaurant, Bengaluru
`<FloatingButtons styleName="Skeuomorphism" />`

Load via useEffect:
```javascript
useEffect(() => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@400;700&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}, [])
```

Color palette: bg #1a0e06, surface #2b1500, gold #c8860a, gold-light #e8a830
All text: warm cream (#f5e6c8) or gold (#c8860a)
3D button style: `{ background:'linear-gradient(145deg,#c8860a,#a06a05)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 12px rgba(0,0,0,0.5)', border:'none' }`
3D button active: `{ transform:'translateY(2px)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.5)' }`
Recessed input: `{ background:'linear-gradient(145deg,#0d0703,#180b03)', boxShadow:'inset 0 3px 6px rgba(0,0,0,0.6)', border:'1px solid rgba(0,0,0,0.5)', color:'#f5e6c8' }`

Sections:

1. NAVBAR (background #1a0e06 with subtle noise texture):
"Sharma's Kitchen" in Playfair Display 700, gold, italic, large
Nav links: Lato 400, gold/60%
"Reserve Table" 3D gold button

2. HERO (full height, background #1a0e06):
Center aligned
Gold ornamental divider (CSS: 2px gradient line with diamond shape center)
Large heading: "Sharma's Kitchen" Playfair Display 800, 72px, gold
Subtitle: "Authentic North Indian flavors since 1998" Playfair Display italic, cream
Two 3D buttons: "View Menu" (gold) + "Book Table" (dark, recessed look)
Small tag: "Voted Best Biryani in Bengaluru 2024" in small pill

3. MENU (background #241200):
Section heading "Our Specialties" Playfair Display, gold
4 menu cards with leather-texture backgrounds:
  Dal Makhani ₹280 / Butter Chicken ₹380 / Paneer Tikka Masala ₹320 / Dum Biryani ₹350
Each card: brown gradient bg, inset highlight at top, deep shadow, gold text for name

4. ABOUT ("Since 1998" huge Playfair Display gold, paragraph in Lato cream):
Two stat "brass plaque" boxes: "25+ Years" / "200+ Dishes"
Each plaque: gold border, dark bg, gold text, inset glow

5. RESERVATION FORM (dark leather-style card):
"Reserve Your Table" Playfair Display, gold
Recessed input fields (all with leather notebook look)
3D gold submit button: "Confirm Reservation"

6. FOOTER (very dark, #0d0703, gold top border 2px):
"Sharma's Kitchen" gold Playfair Display
Address + phone in Lato, gold/50%

---

### pages/NeoBrutalism.jsx
Business: IronForge Gym, Bengaluru
`<FloatingButtons styleName="Neo Brutalism" />`

Load via useEffect:
```javascript
useEffect(() => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;700&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}, [])
```

Colors: white bg (#ffffff), near black (#0a0a0a), yellow (#ffe600), red (#ff3300)
font-family display: 'Bebas Neue', cursive
font-family body: 'Space Grotesk', sans-serif
All borders: 3px solid #0a0a0a (NEVER less than 3px)
All shadows: hard flat (no blur) — ALWAYS `Xpx Xpx 0 #color`
Border-radius: 0 or max 4px — NEVER more
NO dark backgrounds on main sections

Sections:

1. NAVBAR (white bg, 4px black bottom border):
"IRONFORGE" Bebas Neue, 32px, black
Nav: "TRAINING" "PRICING" "ABOUT" "CONTACT" — Space Grotesk 700, uppercase, black
"JOIN NOW" button: black bg, white text, 0 radius, box-shadow 4px 4px 0 #ffe600

2. HERO (white bg):
Pre-header: small yellow block with black border: "BENGALURU'S #1 TRAINING GYM"
Giant heading: Bebas Neue, 120px desktop/56px mobile, line-height 0.9:
"GET STRONG.
GET RESULTS."
Black with yellow on "RESULTS."
Subtext: "₹999/month · No joining fee · 3 locations" — Space Grotesk 700, black, inside yellow block with black border and hard shadow
Two brutal buttons:
  "START TODAY →" — black bg, white text, 3px black border, 5px 5px 0 #ff3300 shadow
  "SEE PLANS" — white bg, black text, 3px black border, 5px 5px 0 #0a0a0a shadow

3. SERVICES (yellow #ffe600 background):
"WHAT WE OFFER" Bebas Neue, 72px, black
3 cards (white bg, 3px black border, 7px 7px 0 #0a0a0a shadow):
  WEIGHT TRAINING / CARDIO ZONE / PERSONAL TRAINER
Each with a large Space Grotesk 700 heading, description, and "FROM ₹999" in yellow block

4. PRICING (white background):
"PRICING" Bebas Neue, huge
3 cards — same brutal card style:
  Basic ₹999/month / Pro ₹1,499/month / Elite ₹2,499/month
Popular card: yellow background (#ffe600)
Each card: plan name Bebas Neue big, feature list with ✓ marks, brutal CTA button

5. FOOTER (black background):
"IRONFORGE GYM" Bebas Neue, 72px, white
Address in yellow: "HSR Layout, Bengaluru · +91 98765 43210"
Top border: 6px solid #ffe600

---

### pages/Claymorphism.jsx
Business: Pawsome Pet Shop & Vet Clinic, Bengaluru
`<FloatingButtons styleName="Claymorphism" />`

Load via useEffect:
```javascript
useEffect(() => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}, [])
```

font-family: 'Nunito' everywhere on this page
Colors: bg linear-gradient(135deg, #f0edff, #edfff6), purple #8b5cf6, green #10b981
Clay card style: `{ background:'white', borderRadius:28, boxShadow:'0 8px 0 rgba(139,92,246,0.25), 0 16px 40px rgba(139,92,246,0.12)', padding:24 }`
Clay button style: `{ borderRadius:9999, background:'linear-gradient(135deg,#8b5cf6,#7c3aed)', color:'white', fontWeight:700, fontFamily:'Nunito', boxShadow:'0 6px 0 rgba(109,40,217,0.35), inset 0 2px 0 rgba(255,255,255,0.25)' }`

Sections:

1. NAVBAR (white bg, bottom border-radius 32px, soft purple shadow):
"Pawsome 🐾" Nunito 800, purple
Pill nav links (hover: pastel purple bg)
"Book Vet Visit" clay green button (pill, green gradient, green shadow)

2. HERO (pastel gradient bg):
Floating blob shapes (position absolute, CSS border-radius trick for organic shapes, pastel colors)
Left: Heading Nunito 800, dark purple, with emoji:
"Your pet's happiness
is our priority 🐶🐱"
Subtext Nunito 400, gray
Two clay buttons: "Book Appointment" (purple) + "Shop Products" (white outline)
Right: clay card "Today's Clinic Hours":
  "10AM–8PM" in big text
  Days as green pills
  "Emergency: +91 98765 43210" in red pill

3. SERVICES (4 clay cards, 2×2 grid mobile / 4 col desktop):
Vet Consultation 🩺 ₹400 / Grooming 🛁 ₹600 / Vaccination 💉 ₹800 / Pet Food Shop 🛒
Each card: clay style, puffy emoji icon, name, price, "Book" pill button

4. GALLERY (6 pastel colored rounded boxes, 3×2 grid):
Each box: one of 6 pastel colors, border-radius 24px, height 120px
Name pill below: "Max 🐕" "Luna 🐈" "Rocky 🐕" "Milo 🐈" "Coco 🐕" "Bella 🐈"

5. CONTACT FORM (big clay card, centered):
Clay-style input fields (rounded, slight shadow, no sharp edges)
Green clay submit button: "Book Appointment 🐾"

6. FOOTER (soft purple bg #ede9fe, rounded top 40px):
"Pawsome 🐾" logo
Address in purple

---

### pages/Minimalism.jsx
Business: Dr. Arjun Mehta — General Physician, Bengaluru
`<FloatingButtons styleName="Minimalism" />`

Load via useEffect:
```javascript
useEffect(() => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}, [])
```

font-family headings: 'DM Serif Display', serif
font-family body: 'DM Sans' (already loaded globally)
Colors: white #ffffff, near black #0a0a0a, light gray #f5f5f3, border gray #e5e5e3
Accent: deep blue #1a3cff (used VERY sparingly — 1 or 2 places only)
NO shadows, NO gradients, NO colors on backgrounds except one gray block
Everything is about spacing, typography, thin lines

Sections:

1. NAVBAR (pure white, only 1px #e5e5e3 bottom border):
"Dr. Arjun Mehta" DM Serif Display, 18px, black, no decoration
Nav links: DM Sans 400, 14px, #888, simple underline on hover
"Book →" — just text with an arrow, no button styling. cursor pointer, black on hover

2. HERO (90vh min-height, white bg, padding-top 120px):
Desktop: 2 column
Left 60%:
  Small label: "GENERAL PHYSICIAN · BENGALURU" DM Sans 500, 11px, #888, uppercase, letter-spacing 0.15em
  Headline: "Quality healthcare, close to home." DM Serif Display, 64px desktop/40px mobile, black, line-height 1.15
  Thin 1px #e5e5e3 horizontal line (margin: 24px 0)
  Two stats in a row: "20+ years experience" | "MBBS, MD Medicine" — separated by thin vertical line. DM Sans 400, 14px, #666
  One minimal button: "Schedule a visit →" — only 1.5px black border, white fill, 4px border-radius. On hover: black bg, white text, transition 200ms

Right 40%:
  Background: #f5f5f3 (just a bg color, no card)
  Inside: minimal appointment card
    "NEXT AVAILABLE" DM Sans 500, 10px, #888, uppercase, letter-spacing
    "Tomorrow · 10:00 AM" DM Serif Display, 28px, black
    1px border-bottom #e5e5e3
    "Your name" — only bottom border input (no box, no bg, no shadow)
    "Confirm →" small black button

3. SERVICES (white bg, lots of padding — min 120px top/bottom):
Small cap label: "WHAT WE TREAT"
3 services in a horizontal row with thin 1px vertical dividers between them:
  General Checkup / Chronic Disease Care / Preventive Health
Each: DM Serif Display 22px heading, DM Sans 400 14px description (2 lines), #666

4. ABOUT (split: left 50% bg #f5f5f3, right 50% white):
Left: DM Serif Display italic, 28px, black:
"Medicine is not just science,
it is also an art."
Right: DM Sans 400, 15px, #444, paragraph about Dr. Arjun Mehta, his education, approach

5. CONTACT FORM (white bg, max-width 560px, centered):
NO card border or shadow
Title: "Get in touch" DM Serif Display, 36px, black
Fields with underline only — 1px black bottom border, no box, no bg:
  Name / Phone / Reason for visit (select)
Submit: full width, black bg (#0a0a0a), white text, DM Sans 600, 0px border-radius, height 48px

6. FOOTER (white bg, 1px #e5e5e3 top border only):
Two columns: left has address, right has phone/email
All DM Sans 400, 14px, #888
Bottom: "© 2025 Dr. Arjun Mehta Clinic" centered, 12px, #aaa

---

### pages/LiquidGlass.jsx
Business: Aura Luxury Spa & Wellness, Bengaluru
`<FloatingButtons styleName="Liquid Glass" />`

Load via useEffect:
```javascript
useEffect(() => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}, [])
```

font-family headings: 'Cormorant Garamond', serif
font-family body: 'DM Sans' (already loaded globally)
Colors: bg #000510, surface #001030, cyan #00d4ff, purple #b400ff, green #00ffb4
All text: white or rgba(255,255,255,0.65)
Glass card: `{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.10)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderRadius:20 }`

Add this inside the component JSX (style tag for keyframes):
```jsx
<style>{`
  @keyframes aura-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .aura-blob {
    animation: aura-rotate 25s linear infinite;
  }
`}</style>
```

Sections:

1. FIXED NAVBAR (rgba(0,5,16,0.70) bg, backdrop blur 24px, 1px rgba white 0.08 bottom border):
"AURA" Cormorant Garamond 600, 22px, white, letter-spacing 8px
Nav: DM Sans 400, 13px, rgba white 0.60
"Book Now" pill: rgba white 0.08 bg, 1px rgba white 0.15 border, white text, on hover: rgba white 0.15 bg + subtle white glow

2. HERO (100vh, overflow hidden, position relative):
Rotating blob (className "aura-blob", position absolute centered):
```jsx
<div className="aura-blob" style={{
  position:'absolute', width:600, height:600, borderRadius:'50%',
  background:'conic-gradient(from 0deg, rgba(0,212,255,0.20), rgba(180,0,255,0.15), rgba(0,255,180,0.20), rgba(0,212,255,0.20))',
  filter:'blur(80px)', top:'50%', left:'50%', transform:'translate(-50%,-50%)'
}} />
```
Content (center aligned, position relative z-index 1):
Small label: "BENGALURU'S PREMIER WELLNESS DESTINATION" DM Sans 400, 10px, rgba white 0.50, letter-spacing 0.25em, uppercase
Large heading: "Where luxury meets serenity" Cormorant Garamond italic 400, 80px desktop/44px mobile, white, line-height 1.1
Iridescent divider (thin horizontal line): 
```jsx
<div style={{ width:200, height:1, background:'linear-gradient(90deg,#00d4ff,#b400ff,#00ffb4)', margin:'24px auto', opacity:0.6 }} />
```
Two glass buttons:
  "Book Experience" — glass card style, white text, Cormorant Garamond 400
  "Explore Treatments" — transparent, 1px rgba white 0.20 border, rgba white 0.70 text

3. TREATMENTS (padding 100px 24px, dark bg):
Small label: "OUR TREATMENTS" DM Sans 500, 10px, #00d4ff, letter-spacing 0.2em
3 glass cards in a row:
Each card has a different iridescent top line (4px, full width, no radius):
  Card 1 top: linear-gradient(90deg, #00d4ff, #7c6fff) — "Deep Tissue Massage" ₹3,500
  Card 2 top: linear-gradient(90deg, #b400ff, #ff6b9d) — "Ayurvedic Ritual" ₹4,200
  Card 3 top: linear-gradient(90deg, #00ffb4, #00d4ff) — "Crystal Facial" ₹2,800
Each card: glass style, padding 28px, description in DM Sans rgba white 0.60

4. STATS (4 glass boxes, 2×2 mobile / 4 col desktop):
"12 Treatment Rooms" / "Since 2010" / "Award Winning" / "5-Star Rated"
Each with a small iridescent accent line at top (different color each)

5. BOOKING FORM (glass card, max-width 560px, centered, padding 40px):
"Reserve Your Experience" Cormorant Garamond italic, 40px, white
Dark glass input fields: rgba white 0.05 bg, rgba white 0.12 border, white text, border-radius 12px
Fields: Name / Phone / Treatment (select) / Preferred Date
Submit button: gradient from #00d4ff to #b400ff, white text, box-shadow 0 8px 30px rgba(124,0,255,0.35)

6. FOOTER (bg #000510, padding 60px 24px):
"AURA" Cormorant Garamond 600, 36px, white, letter-spacing 12px, centered
Iridescent divider line (same as hero, centered, 160px wide)
"Koramangala, Bengaluru · hello@aura-spa.in · +91 98765 43210"
DM Sans 400, 14px, rgba white 0.40, centered
"© 2025 Aura Luxury Spa & Wellness" 12px, rgba white 0.25, centered

---

## FINAL CHECKLIST — VERIFY EVERY ITEM

### Functionality
- [ ] npm run dev starts with zero errors
- [ ] npm run build completes with zero errors
- [ ] All 8 React Router routes load without errors
- [ ] Landing page "/" loads and all 9 sections render
- [ ] Selector page "/styles" loads with all 6 cards
- [ ] All 6 sample site routes load
- [ ] Clicking "See Our Styles" on Landing navigates to /styles
- [ ] Clicking style card on Selector navigates to correct sample site
- [ ] Coming back from sample site shows correct card as selected
- [ ] localStorage saves and reads correctly
- [ ] Form badge updates dynamically with selected style
- [ ] Form validation blocks empty/invalid submit
- [ ] Supabase insert works (test and verify in Supabase dashboard)
- [ ] WhatsApp link opens with correct pre-filled message (URL encoded)
- [ ] Success screen appears after form submit
- [ ] FloatingButtons visible on all 6 sample pages
- [ ] "I want this style" button saves to localStorage + opens WhatsApp
- [ ] "← See all styles" button navigates to /styles
- [ ] vercel.json present for SPA routing

### Design
- [ ] Syne font renders on all headlines
- [ ] DM Sans renders on all body text
- [ ] All 6 CSS card previews look visually distinct — NO images used
- [ ] Noise overlay visible on dark pages
- [ ] Gradient text (text-gradient class) works on headlines
- [ ] Glass card effect (backdrop-filter) works
- [ ] Marquee scrolls infinitely
- [ ] Framer Motion animations play on page load
- [ ] Framer Motion whileInView triggers on scroll
- [ ] Button hover and tap animations work
- [ ] Mobile responsive at 375px, 768px, 1280px breakpoints
- [ ] No horizontal scroll on any page
- [ ] Floating buttons never overlap important content

### Content
- [ ] Landing page has all 9 sections with real content
- [ ] All pricing shows Indian Rupee ₹ symbol correctly
- [ ] All 6 sample sites have convincing fake business content
- [ ] No "lorem ipsum" anywhere
- [ ] No placeholder "TODO" or "ADD CONTENT HERE" text

---

## DEPLOY TO VERCEL

```bash
npm run build
npx vercel --prod
```

Set these environment variables in Vercel dashboard:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_WA_NUMBER

---

## IMPORTANT FINAL NOTES FOR CLAUDE CODE

1. Build ALL 8 pages completely. Do not skip or simplify any page.
2. Every section in every page must have real, convincing fake content.
3. CSS card previews must be hand-crafted JSX — never use img tags or external images.
4. The floating buttons on sample sites must always be visible above all content (z-index 9999).
5. All WhatsApp URLs must be properly encodeURIComponent encoded.
6. The entire project must work with just: npm install → npm run dev
7. Test mobile layout mentally — every component must look good at 375px width.
8. Framer Motion must be used on EVERY page — not just the landing page.
9. The landing page is the face of the business — make it exceptional.
10. Fonts are critical — Syne for headlines, DM Sans for body, special fonts per sample page.
