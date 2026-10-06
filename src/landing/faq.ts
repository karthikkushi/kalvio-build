import { FROM_PRICE, PRICING, inr } from '../config/pricing'
import { SITE } from '../config/site'

export const LANDING_FAQ = [
  {
    q: 'Is the sample really free?',
    a: 'Yes. We make a sample with your shop’s name so you can see it on your phone before you decide. If you don’t want it, you don’t pay anything.',
  },
  {
    q: 'What do I need to send?',
    a: 'Your shop’s name, timings, your main services or products with prices, and a few photos from your phone. We write the rest and show it to you.',
  },
  {
    q: 'How long does it take?',
    a: `About ${SITE.delivery} after you send your details and photos.`,
  },
  {
    q: 'Do I have to pay every month?',
    a: `No. The website is a one-time price from ${inr(FROM_PRICE)}, and your domain name is free for the first year. After that it’s ${inr(PRICING.renewal.price)} a year for the domain and hosting, with small changes at ${inr(PRICING.editPrice)} each. Or choose the optional care plan at ${inr(PRICING.care.price)} a month: renewals and unlimited small changes included.`,
  },
  {
    q: 'Will my shop show up on Google?',
    a: 'Business and Premium websites include the basic Google setup: page titles, your location and a link to your Google Business Profile. Your ranking also depends on your reviews and nearby competitors, so we don’t promise a position.',
  },
  {
    q: 'Can the website be in Kannada or Hindi?',
    a: 'Yes. The Premium plan includes English plus Kannada or Hindi.',
  },
]
