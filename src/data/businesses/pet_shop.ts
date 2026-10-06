import type { BusinessPreset } from '../types'

export const pet_shop: BusinessPreset = {
  key: 'pet_shop',
  label: 'Pet shop & grooming',
  schemaType: 'PetStore',
  region: 'IN',
  defaultTheme: 'soft-friendly',
  demo: {
    name: 'Happy Tails Pet Store',
    area: 'JP Nagar',
    city: 'Bengaluru',
    phone: '+91 80 4150 2299',
    street: '34, 24th Main, 2nd Phase',
    since: 2017,
  },
  hero: {
    image: 'hero',
    headline: {
      en: 'Pet food, toys and grooming in {area}. Delivered home the same day.',
      kn: '{area} ನಲ್ಲಿ ಪೆಟ್ ಫುಡ್, ಆಟಿಕೆಗಳು ಮತ್ತು ಗ್ರೂಮಿಂಗ್. ಅದೇ ದಿನ ಮನೆಗೆ ಡೆಲಿವರಿ.',
      hi: '{area} में पेट फ़ूड, खिलौने और ग्रूमिंग। उसी दिन घर पर डिलीवरी।',
    },
    subline: {
      en: 'Order on WhatsApp before 5 PM and get it the same evening. 600+ products for dogs, cats, birds and fish.',
      kn: 'ಸಂಜೆ 5ರೊಳಗೆ WhatsApp ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ, ಅದೇ ಸಂಜೆ ಪಡೆಯಿರಿ. ನಾಯಿ, ಬೆಕ್ಕು, ಪಕ್ಷಿ ಮತ್ತು ಮೀನುಗಳಿಗೆ 600+ ಉತ್ಪನ್ನಗಳು.',
      hi: 'शाम 5 बजे से पहले WhatsApp पर ऑर्डर करें, उसी शाम पाएं। कुत्तों, बिल्लियों, पक्षियों और मछलियों के लिए 600+ प्रोडक्ट।',
    },
    chips: ['Same-day home delivery', 'Royal Canin, Drools, Whiskas', 'Grooming by appointment'],
  },
  primaryCta: { en: 'Book grooming', kn: 'ಗ್ರೂಮಿಂಗ್ ಬುಕ್ ಮಾಡಿ', hi: 'ग्रूमिंग बुक करें' },
  rating: { value: 4.8, count: 389 },
  badges: [
    { label: 'Genuine brands only', icon: 'shield' },
    { label: 'Same-day delivery', icon: 'truck' },
    { label: 'Certified groomers', icon: 'award' },
    { label: 'Vet-approved diets', icon: 'check' },
  ],
  timings: [{ days: 'Every day', hours: '9:30 AM – 9:30 PM' }],
  timingsNote: 'Home delivery within 5 km, free above ₹999.',
  reviews: [
    {
      name: 'Shruti Patil',
      when: '2 weeks ago',
      stars: 5,
      text: 'I order Bruno’s food on WhatsApp every month and it arrives the same evening. They even remind me before the bag runs out.',
    },
    {
      name: 'Aditya Rao',
      when: '1 month ago',
      stars: 5,
      text: 'Our Shih Tzu came back from grooming looking like a show dog. Patient groomers, and they sent photos while he was there.',
    },
    {
      name: 'Meenakshi Sundaram',
      when: '3 weeks ago',
      stars: 5,
      text: 'Good range of cat food and litter, fair prices, and the staff actually know pets. The cat tree was delivered and set up at home.',
    },
  ],
  faq: [
    {
      q: 'Do you deliver?',
      a: 'Yes, within 5 km. Order on WhatsApp before 5 PM for same-day delivery. Free above ₹999, ₹49 below that.',
    },
    { q: 'Are the products genuine?', a: 'We buy directly from brand distributors and check the expiry date on every pack.' },
    { q: 'How long does grooming take?', a: 'About 1.5–2 hours for a full groom. We message you when your pet is ready.' },
    { q: 'Do you groom cats?', a: 'Yes, by appointment, in a quiet room away from the dogs.' },
    { q: 'Can you get my usual food in?', a: 'Tell us the brand and size; most items arrive within 2 days.' },
  ],
  offers: [
    { season: 'dasara', title: 'Dasara pet pamper', text: 'Full groom + festive bandana at ₹1,199 (usually ₹1,499). Till 21 October.' },
    { season: 'diwali', title: 'Diwali calm pack', text: 'Anxiety wrap + calming treats at ₹799, before the crackers start.' },
    { season: 'summer', title: 'Summer cool-down', text: 'Short summer trim + tick and flea bath at ₹999.' },
  ],
  sections: [
    {
      kind: 'services',
      id: 'shop',
      nav: 'Shop',
      title: 'Popular in the store',
      intro: 'Tap Order and we’ll confirm the price and delivery time on WhatsApp.',
      layout: 'cards',
      groups: [
        {
          items: [
            { name: 'Dry dog food', desc: 'Royal Canin, Drools, Pedigree, Farmina', price: 499, image: 'dog-food', tag: 'Bestseller' },
            { name: 'Cat food & litter', desc: 'Whiskas, Me-O, Sheba, clumping litter', price: 249, image: 'cat-food' },
            { name: 'Clothes & bandanas', desc: 'Sizes XS to XXL, festive range', price: 399, image: 'clothes' },
            { name: 'Cat trees & scratchers', desc: 'Save your sofa', price: 899, image: 'scratcher' },
            { name: 'Toys & chews', desc: 'Rope toys, squeakers, catnip', price: 149, image: 'toys' },
          ],
        },
      ],
      footnote: 'Prices are for the smallest pack. Bigger packs and subscriptions cost less per kg.',
    },
    {
      kind: 'services',
      id: 'grooming',
      nav: 'Grooming',
      title: 'Grooming menu',
      layout: 'list',
      groups: [
        {
          title: 'Small dogs',
          items: [
            { name: 'Bath & blow-dry', price: 699, prefix: '' },
            { name: 'Full groom', desc: 'Bath, haircut, nails, ears', price: 1299, prefix: '', tag: 'Popular' },
            { name: 'Nail clipping', price: 199, prefix: '' },
            { name: 'Tick & flea bath', price: 899, prefix: '' },
          ],
        },
        {
          title: 'Large dogs',
          items: [
            { name: 'Bath & blow-dry', price: 999, prefix: '' },
            { name: 'Full groom', price: 1799, prefix: '' },
            { name: 'De-shedding treatment', price: 1299, prefix: '' },
          ],
        },
        {
          title: 'Cats',
          items: [
            { name: 'Bath & brush', price: 899, prefix: '' },
            { name: 'Full groom', price: 1499, prefix: '' },
          ],
        },
      ],
      footnote: 'Prices are for medium coats. Matted or double coats may cost more; we’ll tell you before we start.',
    },
    { kind: 'offer', id: 'offer' },
    {
      kind: 'about',
      id: 'delivery',
      nav: 'Delivery',
      title: 'Order on WhatsApp, get it home today',
      body: [
        'Send a photo of your pet’s current food, or just tell us the brand. We reply with the price and deliver within 5 km the same day.',
        'Monthly food subscriptions get 5% off, and you’ll never run out again.',
      ],
      image: 'store',
      points: ['Free delivery above ₹999', 'Cash, UPI or card on delivery', 'Monthly subscriptions, 5% off'],
    },
    {
      kind: 'gallery',
      id: 'groomed',
      title: 'Fresh from the grooming table',
      style: 'insta',
      items: [
        { image: 'groomed-1', caption: 'Coco after her full groom' },
        { image: 'groomed-2', caption: 'Summer trim for Milo' },
        { image: 'groomed-3', caption: 'Festive bandana season' },
        { image: 'groom-trim', caption: 'Careful face trims' },
        { image: 'groom-towel', caption: 'Warm towel, gentle dry' },
        { image: 'groom-brush', caption: 'De-shedding brush-out' },
      ],
    },
    { kind: 'reviews', id: 'reviews', nav: 'Reviews', title: 'What pet parents say' },
    {
      kind: 'booking',
      id: 'book',
      nav: 'Book',
      title: 'Book a grooming slot',
      intro: 'Tell us about your pet and we’ll confirm a time on WhatsApp.',
      fields: [
        { name: 'name', label: 'Your name', type: 'text', required: true },
        { name: 'phone', label: 'Phone number', type: 'tel', required: true },
        { name: 'pet', label: 'Pet’s name', type: 'text' },
        { name: 'breed', label: 'Breed', type: 'text', placeholder: 'e.g. Shih Tzu, Indie, Persian cat' },
        { name: 'service', label: 'Service', type: 'select', options: ['Bath & blow-dry', 'Full groom', 'Nail clipping', 'Tick & flea bath'] },
        { name: 'date', label: 'Preferred date', type: 'date' },
      ],
      submit: { en: 'Book on WhatsApp', kn: 'WhatsApp ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ', hi: 'WhatsApp पर बुक करें' },
    },
    { kind: 'timings', id: 'visit', nav: 'Visit', title: 'Visit the store' },
    { kind: 'faq', id: 'faq', nav: 'FAQ', title: 'Good to know' },
  ],
  description: '{name}, {area}, {city}. Pet food, toys, accessories and grooming for dogs and cats. Order on WhatsApp for same-day home delivery.',
}
