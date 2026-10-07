import { describe, expect, it } from 'vitest'
import { guessArea } from './area'

describe('guessArea (area from a Lead Finder address)', () => {
  it.each([
    ['8th Cross, East Park Road, Sampige Road, Malleshwaram', 'Malleshwaram'],
    ['52 Lalbagh Road, Beside Passport Office, Basavanagudi', 'Basavanagudi'],
    ['Second Floor, Phoenix Mall Of Asia, Byatarayanapura, Bellary Rd, near Mall of Asia', 'Byatarayanapura'],
    ['Chamarajpet, 7Th Cross Road, Near Junior College', 'Chamarajpet'],
    ['SVN Plaza, Devarachikkanahalli Main Rd, Maruthi Layout, Hongasandra', 'Hongasandra'],
    ['Chandramalli Business Centre, 2 nd floor ,Sapthagiri Layout, Doddathogur Main Road, Electronic City', 'Electronic City'],
    ['Tilak Nagar, Banaswadi', 'Banaswadi'],
    ['98/5, Davis Road, Cooke Town, Frazer Town', 'Frazer Town'],
    ['No. 1036, srinidhi plaza, 3rd floor, above easy day, Banashankari Stage ll', 'Banashankari'],
    ['Kodigehalli Main Road, Kadugodi Post', 'Kadugodi'],
    ['No 1338, First Floor, 60 Feet Road, D Block. AECS Layout, Kundalahalli', 'Kundalahalli'],
    ['Triveni Road,Yeswantpur', 'Yeswantpur'],
    ['Kasturinagar', 'Kasturinagar'],
  ])('%s -> %s', (address, area) => {
    expect(guessArea(address, 'Bengaluru')).toBe(area)
  })

  it.each([
    '520, First Floor, 8, Main, 8th Cross Rd',
    '4th Floor, above More Hypermarket, near INNOVATIVE MULTIPLEX',
    'Ritual Park Side',
    '2B, Indaus Icon',
    'Raju Building',
    'Double Church Rd',
    '17, Hosahalli Main Rd',
    'Shop No 289, Ground Floor, Santhanam Arcade, Narayanapillai Street',
  ])('returns nothing when unsure: %s', (address) => {
    expect(guessArea(address, 'Bengaluru')).toBe('')
  })

  it('never returns the city itself', () => {
    expect(guessArea('MG Road, Bangalore', 'Bengaluru')).toBe('')
    expect(guessArea('Vijayanagar, Mysore', 'Mysuru')).toBe('Vijayanagar')
    expect(guessArea(null, 'Bengaluru')).toBe('')
  })

  it('capitalises all-lowercase areas', () => {
    expect(guessArea('12, rajajinagar', 'Bengaluru')).toBe('Rajajinagar')
  })
})
