import type { BusinessPreset } from '../types'

export const dermatologist: BusinessPreset = {
  key: 'dermatologist',
  label: 'Skin & hair clinic',
  schemaType: 'MedicalClinic',
  region: 'IN',
  defaultTheme: 'warm-boutique',
  demo: {
    name: 'Tvacha Skin & Hair Clinic',
    area: 'Indiranagar',
    city: 'Bengaluru',
    phone: '+91 80 4211 7788',
    street: '1st Floor, 512, 100 Feet Road, HAL 2nd Stage',
    since: 2015,
  },
  hero: {
    image: 'hero',
    headline: {
      en: 'Acne, pigmentation and hair fall, treated by a skin doctor in {area}.',
      kn: '{area} ನಲ್ಲಿ ಮೊಡವೆ, ಕಲೆ ಮತ್ತು ಕೂದಲು ಉದುರುವಿಕೆಗೆ ಚರ್ಮ ವೈದ್ಯರಿಂದ ಚಿಕಿತ್ಸೆ.',
      hi: '{area} में मुंहासे, पिगमेंटेशन और बाल झड़ने का इलाज, स्किन डॉक्टर से।',
    },
    subline: {
      en: 'Every treatment is planned by an MD dermatologist, not a salon therapist, with honest advice on what will work.',
      kn: 'ಪ್ರತಿ ಚಿಕಿತ್ಸೆಯನ್ನು MD ಚರ್ಮರೋಗ ತಜ್ಞರೇ ಯೋಜಿಸುತ್ತಾರೆ. ಯಾವುದು ಫಲ ಕೊಡುತ್ತದೆ ಎಂಬ ಬಗ್ಗೆ ಪ್ರಾಮಾಣಿಕ ಸಲಹೆ.',
      hi: 'हर इलाज MD डर्मेटोलॉजिस्ट तय करते हैं, सैलून थेरेपिस्ट नहीं। क्या असर करेगा, इस पर ईमानदार सलाह।',
    },
    chips: ['MD dermatologist', 'US-FDA approved lasers', 'Progress tracked with photos'],
  },
  primaryCta: { en: 'Book consultation', kn: 'ಕನ್ಸಲ್ಟೇಶನ್ ಬುಕ್ ಮಾಡಿ', hi: 'कंसल्टेशन बुक करें' },
  rating: { value: 4.8, count: 284 },
  badges: [
    { label: 'MD Dermatology', icon: 'award' },
    { label: 'IADVL member', icon: 'shield' },
    { label: 'FDA-approved lasers', icon: 'sparkle' },
    { label: 'Private treatment rooms', icon: 'check' },
  ],
  timings: [
    { days: 'Mon – Sat', hours: '11:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: '11:00 AM – 2:00 PM' },
  ],
  timingsNote: 'Consultations are by appointment, so you are seen on time.',
  reviews: [
    {
      name: 'Sneha Rao',
      when: '1 month ago',
      stars: 5,
      text: 'I’d tried every face wash for my acne. The doctor put me on a proper plan and after three months my skin is clear. Never pushed expensive packages.',
    },
    {
      name: 'Karthik Menon',
      when: '2 months ago',
      stars: 5,
      text: 'Came in for hair fall. They did a scalp analysis, found a vitamin deficiency and only then started PRP. Hair fall has visibly reduced.',
    },
    {
      name: 'Ayesha Siddiqui',
      when: '3 weeks ago',
      stars: 5,
      text: 'Laser for pigmentation on my cheeks. Painless and quick, and they tracked my progress with photos every session. Very professional.',
    },
  ],
  faq: [
    {
      q: 'Is laser safe for Indian skin?',
      a: 'Yes, with the right machine and settings. We use US-FDA approved lasers suited to Indian skin types and always do a patch test first.',
    },
    {
      q: 'How many sessions will I need?',
      a: 'Most acne and pigmentation plans need 4–6 sessions, 3–4 weeks apart. You get a written plan and cost after the first consultation.',
    },
    {
      q: 'Do you treat hair problems too?',
      a: 'Yes. Hair fall, dandruff, alopecia and scalp conditions are treated by the same dermatologist.',
    },
    {
      q: 'Will I have to avoid the sun?',
      a: 'For a few days after peels and lasers, yes. You’ll get a simple aftercare sheet and the right sunscreen.',
    },
    { q: 'Is EMI available?', a: 'Yes, 0% EMI on treatment packages above ₹15,000.' },
  ],
  offers: [
    { season: 'dasara', title: 'Dasara glow', text: 'Hydrafacial at ₹3,499 (usually ₹4,500). Till 21 October.' },
    { season: 'diwali', title: 'Diwali-ready skin', text: 'Peel + Hydrafacial combo at ₹5,999. Book before 12 November.' },
    { season: 'wedding', title: 'Bridal skin plan', text: 'A 3-month pre-wedding skin programme from ₹24,000, planned by the dermatologist.' },
  ],
  sections: [
    {
      kind: 'features',
      id: 'concerns',
      nav: 'Concerns',
      title: 'What we treat',
      items: [
        { title: 'Acne & acne scars', desc: 'Medical treatment for active acne, then peels or lasers for marks and scars.', icon: 'sparkle' },
        { title: 'Pigmentation & melasma', desc: 'Dark spots, tanning and uneven tone, treated gently for Indian skin.', icon: 'leaf' },
        { title: 'Hair fall & dandruff', desc: 'Scalp analysis, blood tests if needed, then PRP or GFC.', icon: 'activity' },
        { title: 'Fine lines & ageing', desc: 'Botox, fillers and skin boosters with a natural result.', icon: 'clock' },
        { title: 'Moles, warts & skin tags', desc: 'Quick, safe removal by radiofrequency in a single visit.', icon: 'shield' },
        { title: 'Unwanted hair', desc: 'Laser hair reduction for face, underarms, arms and legs.', icon: 'bolt' },
      ],
    },
    {
      kind: 'services',
      id: 'treatments',
      nav: 'Prices',
      title: 'Treatments and prices',
      intro: 'Starting prices per session. Packages of 4–6 sessions cost less.',
      layout: 'list',
      groups: [
        {
          title: 'Skin',
          items: [
            { name: 'Dermatologist consultation', desc: 'Includes skin analysis, free follow-up in 15 days', price: 800, prefix: '' },
            { name: 'Acne & scar treatment', price: 2500, suffix: '/session' },
            { name: 'Chemical peel', price: 2000 },
            { name: 'Hydrafacial', desc: 'Deep cleanse and hydration, no downtime', price: 4500, prefix: '', tag: 'Popular' },
          ],
        },
        {
          title: 'Hair',
          items: [
            { name: 'Scalp analysis + consultation', price: 1200, prefix: '' },
            { name: 'PRP for hair loss', price: 6000, suffix: '/session' },
            { name: 'GFC hair therapy', price: 9000, suffix: '/session' },
            { name: 'Laser hair reduction', desc: 'Underarms', price: 2500, suffix: '/session' },
          ],
        },
        {
          title: 'Anti-ageing',
          items: [
            { name: 'Botox', desc: 'Per area', price: 9000 },
            { name: 'Under-eye filler', price: 18000 },
            { name: 'Skin boosters', price: 15000 },
          ],
        },
      ],
      footnote: 'Prices include GST. Your exact plan is decided after the consultation.',
    },
    { kind: 'offer', id: 'offer' },
    {
      kind: 'team',
      id: 'doctor',
      nav: 'Doctor',
      title: 'Your dermatologist',
      people: [
        {
          name: 'Dr. Meera Iyer',
          role: 'Consultant dermatologist',
          quals: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
          years: 11,
          image: 'doctor',
          bio: 'Dr. Meera has treated acne, pigmentation and hair loss for over a decade. She will tell you plainly when a prescription cream will do the job and a laser won’t.',
          languages: ['English', 'Kannada', 'Hindi', 'Malayalam'],
        },
      ],
    },
    {
      kind: 'beforeAfter',
      id: 'results',
      nav: 'Results',
      title: 'Before and after',
      intro: 'Drag to compare. Pigmentation treatment over four sessions.',
      image: 'glow',
      caption: 'Illustration only. Real patient photos are shown with written consent.',
    },
    {
      kind: 'gallery',
      id: 'clinic',
      title: 'Inside the clinic',
      style: 'grid',
      items: [
        { image: 'hydrafacial', caption: 'Hydrafacial in a private treatment room' },
        { image: 'peel', caption: 'Medical-grade peels, applied by the doctor’s team' },
        { image: 'consult', caption: 'Unhurried consultations with a written plan' },
      ],
    },
    { kind: 'reviews', id: 'reviews', nav: 'Reviews', title: 'What patients say' },
    {
      kind: 'booking',
      id: 'book',
      nav: 'Book',
      title: 'Book a consultation',
      intro: 'Tell us what’s bothering you and pick a time. We confirm on WhatsApp.',
      fields: [
        { name: 'name', label: 'Your name', type: 'text', required: true },
        { name: 'phone', label: 'Phone number', type: 'tel', required: true },
        {
          name: 'concern',
          label: 'Main concern',
          type: 'select',
          options: ['Acne', 'Pigmentation', 'Hair fall', 'Anti-ageing', 'Laser hair removal', 'Something else'],
        },
        { name: 'date', label: 'Preferred date', type: 'date' },
        { name: 'slot', label: 'Preferred time', type: 'select', options: ['Morning', 'Afternoon', 'Evening'] },
      ],
      submit: { en: 'Book on WhatsApp', kn: 'WhatsApp ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ', hi: 'WhatsApp पर बुक करें' },
    },
    { kind: 'timings', id: 'visit', nav: 'Visit', title: 'Timings and location' },
    { kind: 'faq', id: 'faq', nav: 'FAQ', title: 'Questions patients ask' },
  ],
  description: '{name}, {area}, {city}. Dermatologist-led treatment for acne, pigmentation, hair fall and anti-ageing. Book a consultation on WhatsApp.',
}
