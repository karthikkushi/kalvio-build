/**
 * Seasonal windows for the offer banner. Edit the dates each year; first match wins.
 * A preset shows a banner only if it has an offer for the active season.
 * Preview any season with `?season=<id>` on a /demo link.
 */
export interface Season {
  id: string
  label: string
  from: string // inclusive, YYYY-MM-DD
  to: string // inclusive, YYYY-MM-DD
  region: 'IN' | 'US'
}

export const SEASONS: Season[] = [
  // India 2026-27. Dates are approximate festival windows; check them each year.
  { id: 'dasara', label: 'Dasara', from: '2026-09-28', to: '2026-10-21', region: 'IN' },
  { id: 'diwali', label: 'Diwali', from: '2026-10-22', to: '2026-11-12', region: 'IN' },
  { id: 'wedding', label: 'Wedding season', from: '2026-11-13', to: '2027-02-28', region: 'IN' },
  { id: 'sankranti', label: 'Sankranti', from: '2027-01-08', to: '2027-01-16', region: 'IN' },
  { id: 'ugadi', label: 'Ugadi', from: '2027-03-25', to: '2027-04-08', region: 'IN' },
  { id: 'summer', label: 'Summer holidays', from: '2027-04-09', to: '2027-06-10', region: 'IN' },
  // USA
  { id: 'fall', label: 'Fall', from: '2026-09-22', to: '2026-11-30', region: 'US' },
  { id: 'winter', label: 'Winter', from: '2026-12-01', to: '2027-02-28', region: 'US' },
  { id: 'spring', label: 'Spring', from: '2027-03-01', to: '2027-05-31', region: 'US' },
]

export function activeSeasons(region: 'IN' | 'US', today = new Date()): Season[] {
  const d = today.toISOString().slice(0, 10)
  return SEASONS.filter((s) => s.region === region && s.from <= d && d <= s.to)
}
