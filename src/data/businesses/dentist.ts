import type { BusinessPreset } from '../types'

export const dentist: BusinessPreset = {
  key: 'dentist',
  label: 'Dental clinic',
  schemaType: 'Dentist',
  region: 'IN',
  defaultTheme: 'clean-clinical',
  demo: {
    name: 'Nandi Dental Care',
    area: 'Jayanagar',
    city: 'Bengaluru',
    phone: '+91 80 4123 4567',
    street: '22, 11th Main Road, 4th Block',
    since: 2012,
  },
  hero: {
    image: 'hero',
    headline: {
      en: 'Painless root canal in {area}. Same-day appointments.',
      kn: '{area} ನಲ್ಲಿ ನೋವಿಲ್ಲದ ರೂಟ್ ಕೆನಾಲ್. ಅದೇ ದಿನ ಅಪಾಯಿಂಟ್ಮೆಂಟ್.',
      hi: '{area} में बिना दर्द रूट कैनाल। उसी दिन अपॉइंटमेंट।',
    },
    subline: {
      en: 'Gentle, modern dental care for the whole family, with the full price explained before we start.',
      kn: 'ಇಡೀ ಕುಟುಂಬಕ್ಕೆ ಸೌಮ್ಯ, ಆಧುನಿಕ ದಂತ ಚಿಕಿತ್ಸೆ. ಚಿಕಿತ್ಸೆಗೆ ಮೊದಲೇ ಪೂರ್ತಿ ದರ ತಿಳಿಸುತ್ತೇವೆ.',
      hi: 'पूरे परिवार के लिए आरामदायक, आधुनिक इलाज। शुरू करने से पहले पूरी कीमत बताते हैं।',
    },
    chips: ['Same-day slots', 'Sterilised single-use kits', 'EMI on implants'],
  },
  primaryCta: { en: 'Book appointment', kn: 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ', hi: 'अपॉइंटमेंट बुक करें' },
  rating: { value: 4.8, count: 326 },
  badges: [
    { label: 'IDA registered', icon: 'shield' },
    { label: 'Class B autoclave', icon: 'check' },
    { label: 'Digital X-ray', icon: 'sparkle' },
    { label: 'Kids friendly', icon: 'baby' },
  ],
  timings: [
    { days: 'Mon – Sat', hours: '10:00 AM – 1:30 PM, 5:00 – 9:00 PM' },
    { days: 'Sunday', hours: 'By appointment' },
  ],
  timingsNote: 'Tooth pain at night? Call us. We keep one slot free for emergencies.',
  reviews: [
    {
      name: 'Priya Raghavan',
      when: '2 weeks ago',
      stars: 5,
      text: 'Had my root canal done in one sitting and honestly felt nothing. The doctor explained every step and the price before starting.',
    },
    {
      name: 'Mohammed Irfan',
      when: '1 month ago',
      stars: 5,
      text: 'Took my 6-year-old for a filling. The staff were so patient with her that she wasn’t scared at all. Clean clinic, always on time.',
    },
    {
      name: 'Lakshmi Narayan',
      when: '3 months ago',
      stars: 5,
      text: 'Got my implant here after comparing three clinics. Fair price, an EMI option, and they called twice afterwards to check on me.',
    },
  ],
  faq: [
    {
      q: 'Is root canal treatment painful?',
      a: 'With modern rotary instruments and proper anaesthesia most patients feel only mild pressure. Many root canals are finished in a single one-hour sitting.',
    },
    {
      q: 'Do you offer EMI?',
      a: 'Yes. 0% EMI for 6 months on implants, aligners and crowns above ₹15,000, through most credit cards.',
    },
    {
      q: 'Do I need an appointment?',
      a: 'Walk-ins are welcome, but booking on WhatsApp means you won’t wait. Same-day slots are usually available.',
    },
    {
      q: 'How do you sterilise instruments?',
      a: 'Every instrument is ultrasonically cleaned and sterilised in a Class B autoclave. Gloves, masks and patient kits are single-use.',
    },
    {
      q: 'Do you treat children?',
      a: 'Yes. We see children from age 3 for check-ups, fillings, fluoride and sealants, in a calm and friendly way.',
    },
  ],
  offers: [
    {
      season: 'dasara',
      title: 'Dasara smile check',
      text: 'Cleaning and polishing at ₹999 (usually ₹1,200), with a free consultation. Till 21 October.',
    },
    {
      season: 'diwali',
      title: 'Diwali smile makeover',
      text: 'Teeth whitening at ₹4,999 (usually ₹6,500). Book before 12 November.',
    },
    {
      season: 'wedding',
      title: 'Wedding-ready smile',
      text: 'Whitening + cleaning combo at ₹5,499 for brides, grooms and family.',
    },
  ],
  sections: [
    {
      kind: 'services',
      id: 'treatments',
      nav: 'Treatments',
      title: 'Treatments and prices',
      intro: 'Clear starting prices. You get the exact cost after a check-up, before any treatment begins.',
      layout: 'list',
      groups: [
        {
          title: 'Everyday care',
          items: [
            { name: 'Consultation + digital X-ray', price: 300, prefix: '' },
            { name: 'Cleaning & polishing', desc: 'Removes stains and tartar in 40 minutes', price: 1200, prefix: '' },
            { name: 'Tooth-coloured filling', price: 1500 },
            { name: 'Children’s check-up', desc: 'Includes fluoride varnish', price: 500, prefix: '' },
          ],
        },
        {
          title: 'Repair & replace',
          items: [
            { name: 'Root canal treatment', desc: 'Single-sitting option', price: 4500, tag: 'Most booked' },
            { name: 'Zirconia crown', desc: 'Natural look, 10-year warranty', price: 8000 },
            { name: 'Dental implant', desc: 'Swiss implant + crown', price: 28000 },
          ],
        },
        {
          title: 'Smile makeover',
          items: [
            { name: 'Teeth whitening', desc: 'In-clinic, about 1 hour', price: 6500, prefix: '' },
            { name: 'Metal braces', price: 30000 },
            { name: 'Clear aligners', desc: 'Nearly invisible, removable', price: 65000 },
          ],
        },
      ],
      footnote: 'Prices include GST. 0% EMI available above ₹15,000.',
    },
    { kind: 'offer', id: 'offer' },
    {
      kind: 'team',
      id: 'doctor',
      nav: 'Doctor',
      title: 'Meet your dentist',
      people: [
        {
          name: 'Dr. Arjun Hegde',
          role: 'Root canal & implant specialist',
          quals: 'BDS, MDS (Conservative Dentistry & Endodontics)',
          years: 12,
          image: 'doctor',
          bio: 'Dr. Arjun has done more than 4,000 root canals and believes no one should fear the dentist. He explains every option in plain language and never pushes treatment you don’t need.',
          languages: ['English', 'Kannada', 'Hindi', 'Tamil'],
        },
      ],
    },
    {
      kind: 'beforeAfter',
      id: 'results',
      nav: 'Results',
      title: 'Before and after',
      intro: 'Drag the slider to compare. Whitening and cleaning in a single visit.',
      image: 'smile',
      caption: 'Illustration only. Real patient photos are shown with written consent.',
    },
    {
      kind: 'gallery',
      id: 'clinic',
      title: 'Inside the clinic',
      style: 'grid',
      items: [
        { image: 'hero', caption: 'Treatment room with a fully adjustable chair' },
        { image: 'care', caption: 'Unhurried check-ups with magnification' },
        { image: 'reception', caption: 'Calm waiting lounge, no crowding' },
      ],
    },
    { kind: 'reviews', id: 'reviews', nav: 'Reviews', title: 'What patients say' },
    {
      kind: 'booking',
      id: 'book',
      nav: 'Book',
      title: 'Book an appointment',
      intro: 'Send your details and we’ll confirm a slot on WhatsApp within 15 minutes during clinic hours.',
      fields: [
        { name: 'name', label: 'Your name', type: 'text', required: true },
        { name: 'phone', label: 'Phone number', type: 'tel', required: true },
        {
          name: 'treatment',
          label: 'What do you need?',
          type: 'select',
          options: ['Check-up', 'Tooth pain', 'Cleaning', 'Root canal', 'Implant', 'Braces / aligners', 'Whitening', 'Child’s check-up'],
        },
        { name: 'date', label: 'Preferred date', type: 'date' },
        { name: 'slot', label: 'Preferred time', type: 'select', options: ['Morning', 'Evening'] },
      ],
      submit: { en: 'Book on WhatsApp', kn: 'WhatsApp ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ', hi: 'WhatsApp पर बुक करें' },
    },
    { kind: 'timings', id: 'visit', nav: 'Visit', title: 'Timings and location' },
    { kind: 'faq', id: 'faq', nav: 'FAQ', title: 'Questions patients ask' },
  ],
  description: '{name}, {area}, {city}. Painless root canals, implants, braces and family dental care. Same-day appointments. Call or WhatsApp to book.',
}
