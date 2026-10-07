/**
 * Lead Finder's `locality` is nearly always just the city, but the address usually ends with the area:
 * "8th Cross, East Park Road, Sampige Road, Malleshwaram". Pick that out so the sample says
 * "in Malleshwaram". When unsure it returns '' (the sample then says the city), because a wrong area
 * looks worse than none.
 */

/** Words that mark a street, building or landmark rather than an area. */
const NOT_AREA =
  /\b(road|rd|street|st|cross|main|floor|flour|block|building|bldg|complex|plaza|arcade|mall|chambers?|cent(re|er)|tower|towers|apartments?|residency|opp|opposite|near|beside|behind|above|below|before|after|next|hotel|shop|no|temple|church|mosque|school|college|hospital|bus|stop|park|side|metro|station|circle|junction|signal|gate|post|market|hypermarket|multiplex|icon|square|house|villa|lane|avenue|highway|nh|bypass|karnataka|india)\b/i

/** Endings of Indian area names: Jayanagar, Marathahalli, Basavanagudi, HSR Layout, Frazer Town… */
const AREA_ENDING =
  /(nagar|nagara|halli|hally|pura|puram|pur|palya|palaya|layout|pet|pete|peth|wadi|gudi|town|colony|extension|sandra|hatti|kere|city|vihar|enclave|garden|gardens|eshwaram|ram|abad|ganj|gaon)$/i

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/bangalore/g, 'bengaluru')
    .replace(/mysore/g, 'mysuru')
    .replace(/mangalore/g, 'mangaluru')
    .replace(/[^a-z]/g, '')

function tidy(part: string): string {
  const t = part
    .replace(/\b(post|p\.?o\.?)$/i, '')
    .replace(/\s+(stage|phase|sector)\s+\S+$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
  // "jp nagar" -> "Jp Nagar" reads badly, but all-lowercase looks careless on the sample.
  return t === t.toLowerCase() ? t.replace(/\b\w/g, (c) => c.toUpperCase()) : t
}

export function guessArea(address: string | null | undefined, city: string | null | undefined): string {
  if (!address) return ''
  const cityNorm = norm(city ?? '')
  const parts = address
    .split(/[,.;]| - /)
    .map(tidy)
    .filter((p) => p.length >= 4 && p.length <= 40 && !/\d/.test(p) && !NOT_AREA.test(p))
    .filter((p) => norm(p) !== cityNorm && !['bengaluru', 'mysuru', 'mangaluru'].includes(norm(p)))
  // The last part that looks like an area name; otherwise a last single word ("Chamarajpet", "Rajaji").
  const named = parts.filter((p) => p.split(' ').length <= 3 && AREA_ENDING.test(p.replace(/\s+/g, '')))
  if (named.length) return named[named.length - 1]
  const single = parts.filter((p) => !p.includes(' '))
  return single.length ? single[single.length - 1] : ''
}
