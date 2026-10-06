import { FROM_PRICE, PRICING, inr } from '../config/pricing'
import { SITE } from '../config/site'

const domain = PRICING.extras[0]
const care = PRICING.extras[1]

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
    a: `About ${SITE.deliveryDays} days after you send your details and photos.`,
  },
  {
    q: 'Do I have to pay every month?',
    a: `No. The website is a one-time price from ${inr(FROM_PRICE)}. A web address (domain) costs about ${inr(domain.price)} a year. If you want us to keep changing prices and photos for you, maintenance is ${inr(care.price)} a month, and it’s optional.`,
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
