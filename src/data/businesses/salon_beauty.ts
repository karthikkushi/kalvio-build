import type { BusinessPreset } from '../types'

export const salon_beauty: BusinessPreset = {
  key: 'salon_beauty',
  label: 'Salon & bridal studio',
  schemaType: 'BeautySalon',
  region: 'IN',
  defaultTheme: 'warm-boutique',
  demo: {
    name: 'Swara Bridal Studio',
    area: 'Malleshwaram',
    city: 'Bengaluru',
    phone: '+91 80 4987 6543',
    street: '41, 8th Cross, Sampige Road',
    since: 2014,
  },
  hero: {
    image: 'hero',
    headline: {
      en: 'Bridal makeup in {area} that lasts from muhurtham to reception.',
      kn: '{area} ನಲ್ಲಿ ಮುಹೂರ್ತದಿಂದ ರಿಸೆಪ್ಷನ್‌ವರೆಗೂ ಉಳಿಯುವ ಬ್ರೈಡಲ್ ಮೇಕಪ್.',
      hi: '{area} में ब्राइडल मेकअप, जो मुहूर्त से रिसेप्शन तक टिके।',
    },
    subline: {
      en: 'HD and airbrush bridal looks, hair, saree draping and mehendi, all under one roof.',
      kn: 'HD ಮತ್ತು ಏರ್‌ಬ್ರಶ್ ಬ್ರೈಡಲ್ ಲುಕ್, ಹೇರ್, ಸೀರೆ ಡ್ರೇಪಿಂಗ್ ಮತ್ತು ಮೆಹಂದಿ, ಎಲ್ಲವೂ ಒಂದೇ ಕಡೆ.',
      hi: 'HD और एयरब्रश ब्राइडल लुक, हेयर, साड़ी ड्रेपिंग और मेहंदी, सब एक ही जगह।',
    },
    chips: ['Trial before the big day', 'MAC, Huda & Kryolan', 'Home & venue service'],
  },
  primaryCta: { en: 'Book a trial', kn: 'ಟ್ರಯಲ್ ಬುಕ್ ಮಾಡಿ', hi: 'ट्रायल बुक करें' },
  rating: { value: 4.9, count: 512 },
  badges: [
    { label: 'Certified artists', icon: 'award' },
    { label: 'Sealed, hygienic kits', icon: 'shield' },
    { label: 'Bridal specialists', icon: 'sparkle' },
    { label: 'Venue service', icon: 'map' },
  ],
  timings: [
    { days: 'Tue – Sun', hours: '10:00 AM – 8:30 PM' },
    { days: 'Monday', hours: 'Closed (bridal bookings on call)' },
  ],
  timingsNote: 'Early-morning muhurtham? Bridal makeup starts as early as 4 AM.',
  reviews: [
    {
      name: 'Ananya Krishnan',
      when: '1 month ago',
      stars: 5,
      text: 'They did my wedding and reception looks. Natural in person, stunning in photos, and it stayed perfect through a 12-hour day.',
    },
    {
      name: 'Divya Shetty',
      when: '3 weeks ago',
      stars: 5,
      text: 'Keratin here cost half of what the mall salons quoted and my hair is still smooth after 4 months. Sealed kits opened in front of me.',
    },
    {
      name: 'Fathima Zahra',
      when: '2 months ago',
      stars: 5,
      text: 'Booked a trial first, loved it, then took the full package for my sister’s wedding. They reached the venue on time at 5 AM!',
    },
  ],
  faq: [
    {
      q: 'Can I have a trial before the wedding?',
      a: 'Yes. The Bridal Signature and Full Wedding packages include one trial. A trial on its own is ₹2,500, adjusted if you book.',
    },
    {
      q: 'Do you come to the venue or home?',
      a: 'Yes, anywhere in Bengaluru. Travel is free within 10 km, ₹500 beyond that.',
    },
    {
      q: 'Which brands do you use?',
      a: 'MAC, Huda Beauty, Kryolan and Bobbi Brown for makeup, and professional heat tools for hair. We show you every product at the trial.',
    },
    {
      q: 'How early should I book?',
      a: 'For November to February weddings, 2–3 months ahead. A 20% advance blocks your date.',
    },
    {
      q: 'Do you do makeup for the family?',
      a: 'Yes. Mother, sisters and bridesmaids get 20% off when booked with a bridal package.',
    },
  ],
  offers: [
    {
      season: 'dasara',
      title: 'Dasara glow',
      text: 'Signature facial + hair spa at ₹2,499 (usually ₹3,000). Till 21 October.',
    },
    {
      season: 'diwali',
      title: 'Diwali party look',
      text: 'Party makeup + hairstyle at ₹2,999. Book your slot early, evenings fill fast.',
    },
    {
      season: 'wedding',
      title: 'Wedding season',
      text: 'Book any bridal package before 30 November and get a pre-bridal facial free.',
    },
  ],
  sections: [
    {
      kind: 'plans',
      id: 'bridal',
      nav: 'Bridal',
      title: 'Bridal packages',
      intro: 'Every package includes lashes, draping, hair accessories setting and a touch-up kit.',
      plans: [
        {
          name: 'Engagement or reception',
          price: 12000,
          period: 'one look',
          features: ['HD makeup', 'Hairstyling', 'Saree or lehenga draping', 'Premium lashes'],
        },
        {
          name: 'Bridal Signature',
          price: 25000,
          period: 'wedding day',
          highlight: true,
          features: ['Airbrush makeup', 'Hairdo with fresh flowers', 'Draping + jewellery setting', 'One trial session', 'Touch-up kit for the day'],
          note: 'Most chosen',
        },
        {
          name: 'Full wedding',
          price: 55000,
          period: '3 events',
          features: ['Mehendi, wedding and reception looks', 'Pre-bridal facial and spa', '20% off family makeup', 'Venue service in Bengaluru'],
        },
      ],
      footnote: 'Prices include GST. 20% advance blocks your date.',
    },
    { kind: 'offer', id: 'offer' },
    {
      kind: 'services',
      id: 'menu',
      nav: 'Services',
      title: 'Salon menu',
      layout: 'list',
      groups: [
        {
          title: 'Hair',
          items: [
            { name: 'Haircut & blow-dry', price: 600, prefix: '' },
            { name: 'Hair spa', price: 1200, prefix: '' },
            { name: 'Global colour', price: 3500 },
            { name: 'Keratin smoothening', desc: 'Lasts 4–5 months', price: 4500, tag: 'Popular' },
          ],
        },
        {
          title: 'Skin',
          items: [
            { name: 'Clean-up', price: 800, prefix: '' },
            { name: 'D-tan pack', price: 700, prefix: '' },
            { name: 'Signature glow facial', price: 1800, prefix: '' },
          ],
        },
        {
          title: 'Hands & feet',
          items: [
            { name: 'Manicure', price: 600, prefix: '' },
            { name: 'Pedicure', price: 800, prefix: '' },
            { name: 'Gel nails', price: 1200 },
          ],
        },
      ],
    },
    {
      kind: 'gallery',
      id: 'looks',
      nav: 'Looks',
      title: 'Recent looks',
      intro: 'A few brides from this season. More on our Instagram.',
      style: 'insta',
      items: [
        { image: 'bridal-1', caption: 'Traditional red, airbrush finish' },
        { image: 'bridal-2', caption: 'Soft glam eyes with nath' },
        { image: 'bridal-3', caption: 'Low bun with fresh jasmine' },
        { image: 'engagement', caption: 'Pastel engagement look' },
        { image: 'hair-styling', caption: 'Reception updo' },
        { image: 'haircut', caption: 'Pre-wedding trim & gloss' },
      ],
    },
    {
      kind: 'about',
      id: 'studio',
      title: 'A calm studio, not a crowded salon',
      body: [
        'Appointments are spaced so you are never rushed. Every client gets a freshly sanitised station and a sealed kit opened in front of them.',
        'Our five artists are trained in HD, airbrush and South Indian bridal styles, and the team is all women.',
      ],
      image: 'salon',
      points: ['Private bridal room', 'Free parking on 8th Cross', 'Card, UPI and EMI'],
    },
    { kind: 'reviews', id: 'reviews', nav: 'Reviews', title: 'Brides and regulars' },
    {
      kind: 'booking',
      id: 'book',
      nav: 'Book',
      title: 'Book a trial or appointment',
      intro: 'Tell us the date and we’ll confirm availability on WhatsApp.',
      fields: [
        { name: 'name', label: 'Your name', type: 'text', required: true },
        { name: 'phone', label: 'Phone number', type: 'tel', required: true },
        {
          name: 'service',
          label: 'Service',
          type: 'select',
          options: ['Bridal trial', 'Bridal package', 'Party makeup', 'Hair', 'Skin', 'Nails'],
        },
        { name: 'date', label: 'Event or visit date', type: 'date' },
      ],
      submit: { en: 'Check availability', kn: 'ಲಭ್ಯತೆ ಪರಿಶೀಲಿಸಿ', hi: 'उपलब्धता देखें' },
    },
    { kind: 'timings', id: 'visit', nav: 'Visit', title: 'Visit the studio' },
    { kind: 'faq', id: 'faq', nav: 'FAQ', title: 'Good to know' },
  ],
  description: '{name}, {area}, {city}. Bridal makeup, hair, skin and nails with clear prices. Book a trial on WhatsApp.',
}
