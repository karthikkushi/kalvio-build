# Kalvio Build — Mobile Responsiveness Fix
# Give this to Claude Code inside the kalvio-build project
# Fix ONLY mobile layout issues. Do NOT change desktop design at all.

---

## PROBLEMS TO FIX

Open src/pages/Landing.jsx and fix these specific mobile issues.
All fixes apply only at mobile breakpoint (below 768px / md breakpoint).
Desktop design must stay exactly the same.

---

## FIX 1 — NAVBAR

Problem: On mobile the logo wraps to 2 lines, nav links show and
overflow, "Get Started" button overlaps everything.

Fix the navbar component (src/components/Navbar.jsx or inside Landing.jsx):

On mobile (below md breakpoint):
- Logo "Kalvio Build" must stay on ONE line — reduce font size to 16px on mobile
- Hide ALL nav links (Work, Services, Pricing, Contact) on mobile
  Use: className="hidden md:flex" on the nav links container
- Hide the "Get Started" button on mobile
  Use: className="hidden md:block"
- Show a simple hamburger menu icon on mobile (right side)
  Use Lucide Menu icon (24px, white)
  No need to make it functional — just show the icon for now
- Navbar height on mobile: 56px (not 64px)
- Logo font size on mobile: 16px

```jsx
// Navbar mobile layout:
<nav className="fixed top-0 w-full z-50 ...">
  <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-5 max-w-[1440px] mx-auto">
    {/* Logo — single line always */}
    <div className="text-[16px] md:text-[20px] font-[700] text-white whitespace-nowrap ...">
      Kalvio Build
    </div>
    {/* Nav links — hidden on mobile */}
    <div className="hidden md:flex items-center gap-4">
      ... nav links ...
    </div>
    {/* Get Started — hidden on mobile, show hamburger instead */}
    <div className="flex items-center gap-3">
      <span className="hidden md:block text-white ...">Get Started →</span>
      <Menu className="md:hidden text-white" size={24} />
    </div>
  </div>
</nav>
```

---

## FIX 2 — HERO SECTION

Problem 1: The 3 floating preview cards (Glassmorphism, Neo Brutalism,
Minimalism) at the bottom of hero look bad on mobile — too small and cramped.
Fix: Hide these 3 preview cards completely on mobile.
Show them only on desktop (md and above).
Add className="hidden md:flex" to the preview cards container.

Problem 2: Trust badges row ("No advance payment · Ready in 5 days ·
100% satisfaction") is overflowing horizontally on mobile.
Fix: Stack them vertically on mobile, horizontal on desktop.

```jsx
// Trust badges fix:
<div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-4">
  <div className="flex items-center gap-1.5 text-xs text-slate-400">
    <span>✓</span> No advance payment
  </div>
  <div className="flex items-center gap-1.5 text-xs text-slate-400">
    <span>✓</span> Ready in 5 days
  </div>
  <div className="flex items-center gap-1.5 text-xs text-slate-400">
    <span>✓</span> 100% satisfaction
  </div>
</div>
```

Problem 3: Hero padding-top on mobile should be 80px (not 140px)
since navbar is smaller on mobile.
Fix: className="pt-20 md:pt-36"

Problem 4: Hero buttons on mobile should be full width stacked.
Fix:
```jsx
<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-8">
  <button className="w-full sm:w-auto px-8 py-4 ...">Start Your Project</button>
  <button className="w-full sm:w-auto px-8 py-4 ...">View Our Styles →</button>
</div>
```

---

## FIX 3 — MARQUEE SECTION

Problem: Marquee is getting cut off on the left side on mobile.
Fix: Add overflow-x: hidden to the marquee container div.
Also reduce the marquee text font size on mobile to 16px.

```jsx
<div className="overflow-hidden w-full"> {/* overflow-hidden is key */}
  <div className="marquee-container">
    <div className="marquee-content text-base md:text-xl font-headline font-bold">
      ... items ...
    </div>
  </div>
</div>
```

---

## FIX 4 — THE PROBLEM SECTION (73% stats)

Problem: The 2-column layout (stats left, comparison card right)
is too cramped on mobile.
Fix: Single column on mobile, 2 columns on desktop.

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
  {/* Left stats */}
  <div className="flex flex-col gap-6"> ... </div>
  {/* Right comparison card */}
  <div className="glass-card ..."> ... </div>
</div>
```

Also reduce the big stat numbers on mobile:
"73%" → font-size 40px on mobile (not 56px)
Use: className="text-[40px] md:text-[56px] font-headline font-extrabold text-gradient"

---

## FIX 5 — STYLE CARDS SECTION

Problem: 3-column grid on desktop needs to work well on mobile.
Fix: 1 column on mobile, 2 columns on tablet, 3 on desktop.

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

Also make sure section padding is smaller on mobile:
```jsx
<section className="py-16 md:py-[120px] px-4 md:px-6">
```

---

## FIX 6 — HOW IT WORKS SECTION

Problem: Steps layout may be too wide on mobile.
Fix: Full width single column on mobile with proper padding.

```jsx
<div className="max-w-[1000px] mx-auto px-4 md:px-6 py-16 md:py-[120px]">
```

Step numbers: reduce from 80px to 48px on mobile:
```jsx
<span className="text-[48px] md:text-[80px] font-headline font-extrabold ...">
```

---

## FIX 7 — WHY US FEATURES GRID

Problem: 3×2 grid on desktop.
Fix: 2×3 on mobile (2 columns), 3×2 on desktop.
This is probably already working but verify:
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
```

Feature card padding on mobile: reduce to 20px:
```jsx
<div className="p-5 md:p-7 ...">
```

---

## FIX 8 — PRICING SECTION

Problem: 3 pricing cards stacked on mobile may have padding issues.
Fix: Proper single column on mobile.

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

Card padding on mobile: 24px (not 36px):
```jsx
<div className="p-6 md:p-9 ...">
```

Price number on mobile: 40px (not 52px):
```jsx
<span className="text-[40px] md:text-[52px] font-headline font-extrabold">
```

---

## FIX 9 — FAQ SECTION

FAQ items are probably fine but ensure:
Question text wraps properly on mobile and does not overflow.
Add: className="text-sm md:text-base leading-snug" to question text.

---

## FIX 10 — FINAL CTA SECTION

Headline on mobile: 36px (not 56px):
```jsx
<h2 className="text-[36px] md:text-[56px] font-headline font-extrabold ...">
```

Buttons: full width stacked on mobile:
```jsx
<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
  <button className="w-full sm:w-auto px-10 py-[18px] ...">See All Styles →</button>
  <button className="w-full sm:w-auto px-10 py-[18px] ...">💬 Chat on WhatsApp</button>
</div>
```

Decorative "KALVIO" background text: reduce to 80px on mobile:
```jsx
<div className="text-[80px] md:text-[200px] font-black ...">KALVIO</div>
```

---

## FIX 11 — FOOTER

Problem (Image 1): Footer columns are stacking but with bad spacing.
Fix: Proper responsive grid for footer.

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
  {/* Column 1 - Brand */}
  <div className="sm:col-span-2 lg:col-span-1"> ... </div>
  {/* Column 2 - Services */}
  <div> ... </div>
  {/* Column 3 - Design Styles */}
  <div> ... </div>
  {/* Column 4 - Contact */}
  <div> ... </div>
</div>
```

Footer padding on mobile: 40px top, 24px sides:
```jsx
<footer className="bg-[#080810] pt-10 md:pt-16 pb-6 md:pb-10 px-4 md:px-6">
```

Bottom bar on mobile: stack vertically, centered:
```jsx
<div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center">
  <p>© 2025 Kalvio Build...</p>
  <p>Made with ✦ in Bengaluru</p>
</div>
```

---

## GLOBAL MOBILE FIXES

Add these global rules — apply throughout the entire Landing.jsx:

1. All section max-width containers: add px-4 on mobile
   className="max-w-[1200px] mx-auto px-4 md:px-6"

2. All section vertical padding on mobile: py-16 (not py-[120px])
   className="py-16 md:py-[120px]"

3. All large headlines: scale down on mobile
   h1: text-[36px] md:text-[72px]
   h2 sections: text-[28px] md:text-[52px]

4. Prevent horizontal overflow on entire page:
   Add to the outermost div in Landing.jsx:
   className="overflow-x-hidden"

---

## WHAT NOT TO CHANGE

- Do NOT change any desktop styles (md: and above)
- Do NOT change colors, fonts, or visual design
- Do NOT change any functionality
- Do NOT change the dark theme
- Do NOT touch any other pages (Selector, sample sites, etc.)
- Only fix mobile layout in Landing.jsx and Navbar component

---

## TEST AFTER FIXING

Test at these widths in browser DevTools:
- 375px (iPhone SE) — most important
- 390px (iPhone 14)
- 414px (iPhone Plus)
- 768px (iPad) — desktop layout should kick in here

All content should be:
- Fully visible, no overflow
- Text readable (not too small)
- Buttons full width and tappable
- No horizontal scroll
- Navbar clean and simple
