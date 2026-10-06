import type { BusinessPreset } from '../types'

export const eye_clinic: BusinessPreset = {
  key: 'eye_clinic',
  label: 'Eye clinic & opticals',
  schemaType: 'Optician',
  region: 'IN',
  defaultTheme: 'clean-clinical',
  demo: {
    name: 'Drishti Eye Care & Opticals',
    area: 'Rajajinagar',
    city: 'Bengaluru',
    phone: '+91 80 2335 6677',
    street: '45, Dr. Rajkumar Road, 1st Block',
    since: 2010,
  },
  hero: {
    image: 'hero',
    headline: {
      en: 'Eye tests and glasses in {area}. Ready in 60 minutes.',
      kn: '{area} ನಲ್ಲಿ ಕಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಕನ್ನಡಕ. 60 ನಿಮಿಷದಲ್ಲಿ ಸಿದ್ಧ.',
      hi: '{area} में आँखों की जाँच और चश्मा। 60 मिनट में तैयार।',
    },
    subline: {
      en: 'Computerised eye test by a qualified optometrist, 1,500+ frames, and lenses from brands you trust.',
      kn: 'ಅರ್ಹ ಆಪ್ಟೋಮೆಟ್ರಿಸ್ಟ್‌ರಿಂದ ಕಂಪ್ಯೂಟರ್ ಕಣ್ಣಿನ ಪರೀಕ್ಷೆ, 1,500+ ಫ್ರೇಮ್‌ಗಳು ಮತ್ತು ನಂಬಿಕೆಯ ಬ್ರ್ಯಾಂಡ್ ಲೆನ್ಸ್‌ಗಳು.',
      hi: 'क्वालिफ़ाइड ऑप्टोमेट्रिस्ट से कंप्यूटराइज़्ड आई टेस्ट, 1,500+ फ़्रेम और भरोसेमंद ब्रांड के लेंस।',
    },
    chips: ['Free eye test with glasses', 'Single-vision lenses in 1 hour', 'Kids frames from ₹799'],
  },
  primaryCta: { en: 'Book eye test', kn: 'ಕಣ್ಣಿನ ಪರೀಕ್ಷೆ ಬುಕ್ ಮಾಡಿ', hi: 'आई टेस्ट बुक करें' },
  rating: { value: 4.8, count: 352 },
  badges: [
    { label: 'Qualified optometrists', icon: 'award' },
    { label: 'Genuine brand lenses', icon: 'shield' },
    { label: '1-year frame warranty', icon: 'check' },
    { label: 'Free adjustments', icon: 'wrench' },
  ],
  timings: [{ days: 'Every day', hours: '10:00 AM – 9:00 PM' }],
  timingsNote: 'An eye test takes about 20 minutes. No appointment needed, but booking skips the queue.',
  reviews: [
    {
      name: 'Venkatesh Murthy',
      when: '2 weeks ago',
      stars: 5,
      text: 'First time with progressive lenses. They took time to explain how to get used to them and adjusted the frame twice for free.',
    },
    {
      name: 'Divya Hegde',
      when: '1 month ago',
      stars: 5,
      text: 'My 7-year-old was squinting at the board. The optometrist was so patient with him, and his glasses were ready the same evening.',
    },
    {
      name: 'Imran Sheikh',
      when: '3 months ago',
      stars: 5,
      text: 'Huge choice of frames and honest advice. They talked me out of an expensive lens I didn’t need.',
    },
  ],
  faq: [
    { q: 'Is the eye test really free?', a: 'Yes, when you buy glasses from us. On its own it costs ₹300.' },
    {
      q: 'How long do glasses take?',
      a: 'Single-vision lenses are ready in about an hour. Progressive and special lenses take 2–3 days.',
    },
    { q: 'Do you have frames for kids?', a: 'Yes, flexible, near-unbreakable kids’ frames from ₹799 with a 1-year warranty.' },
    {
      q: 'Can I bring my own prescription?',
      a: 'Yes. We’ll make your glasses from any valid prescription and recheck your eyes for free.',
    },
    {
      q: 'Do you sell contact lenses?',
      a: 'Monthly, daily and coloured lenses from Bausch + Lomb, Acuvue and Alcon, plus solutions.',
    },
  ],
  offers: [
    { season: 'dasara', title: 'Dasara offer', text: '20% off all frames, with a free eye test. Till 21 October.' },
    { season: 'diwali', title: 'Diwali offer', text: 'Buy any pair of glasses and get sunglasses for ₹499.' },
    { season: 'summer', title: 'Back to school', text: 'Kids’ glasses from ₹999, frame and lenses included.' },
  ],
  sections: [
    {
      kind: 'services',
      id: 'prices',
      nav: 'Prices',
      title: 'Eye tests, lenses and frames',
      layout: 'list',
      groups: [
        {
          title: 'Eye tests',
          items: [
            { name: 'Computerised eye test', desc: 'Free when you buy glasses', price: 300, prefix: '' },
            { name: 'Children’s eye test', desc: 'Ages 4 and up', price: 300, prefix: '' },
            { name: 'Contact lens fitting', price: 500, prefix: '' },
            { name: 'Eye pressure + retina check', desc: 'By our visiting ophthalmologist', price: 800, prefix: '' },
          ],
        },
        {
          title: 'Lenses',
          items: [
            { name: 'Single vision, anti-glare', price: 1200 },
            { name: 'Blue-cut computer lenses', price: 1800, tag: 'Popular' },
            { name: 'Photochromic (darken in sun)', price: 2800 },
            { name: 'Progressive lenses', price: 4500 },
          ],
        },
        {
          title: 'Frames',
          items: [
            { name: 'Kids frames', price: 799 },
            { name: 'Everyday frames', price: 1200 },
            { name: 'Designer frames', price: 3500 },
          ],
        },
      ],
      footnote: 'Lenses by Zeiss, Essilor and Hoya. Prices include GST.',
    },
    { kind: 'offer', id: 'offer' },
    {
      kind: 'about',
      id: 'eye-test',
      nav: 'Eye test',
      title: 'A proper eye test, not a quick guess',
      body: [
        'Our optometrists check your vision, eye-muscle balance and eye pressure, and refer you to an ophthalmologist if anything needs a closer look.',
        'Screen-time headaches, night-driving glare and children squinting at the board are often fixed with the right lens.',
      ],
      image: 'exam',
      points: ['Computerised refraction', 'Eye pressure check', 'Prescription sent on WhatsApp'],
    },
    {
      kind: 'gallery',
      id: 'frames',
      nav: 'Frames',
      title: '1,500+ frames to try',
      intro: 'Ray-Ban, Vogue, Oakley, Carrera, Fastrack and our own budget range.',
      style: 'grid',
      items: [
        { image: 'tryon', caption: 'Take your time trying frames on' },
        { image: 'frames', caption: 'Everyday frames from ₹1,200' },
        { image: 'round', caption: 'Classic round metal frames' },
      ],
    },
    { kind: 'reviews', id: 'reviews', nav: 'Reviews', title: 'What customers say' },
    {
      kind: 'booking',
      id: 'book',
      nav: 'Book',
      title: 'Book an eye test',
      intro: 'Pick a time and skip the queue. We confirm on WhatsApp.',
      fields: [
        { name: 'name', label: 'Your name', type: 'text', required: true },
        { name: 'phone', label: 'Phone number', type: 'tel', required: true },
        { name: 'for', label: 'Who is it for?', type: 'select', options: ['Myself', 'My child', 'A parent or elder'] },
        { name: 'need', label: 'What do you need?', type: 'select', options: ['Eye test', 'New glasses', 'Contact lenses', 'Sunglasses'] },
        { name: 'date', label: 'Preferred date', type: 'date' },
      ],
      submit: { en: 'Book on WhatsApp', kn: 'WhatsApp ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ', hi: 'WhatsApp पर बुक करें' },
    },
    { kind: 'timings', id: 'visit', nav: 'Visit', title: 'Timings and location' },
    { kind: 'faq', id: 'faq', nav: 'FAQ', title: 'Good to know' },
  ],
  description: '{name}, {area}, {city}. Computerised eye tests, 1,500+ frames and branded lenses, most glasses ready in an hour. Book on WhatsApp.',
}
