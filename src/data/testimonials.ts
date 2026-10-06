export interface Testimonial {
  name: string
  business: string
  area: string
  text: string
}

/** Real client testimonials only, added with permission. The landing page hides the section while this is empty. */
export const TESTIMONIALS: Testimonial[] = []
