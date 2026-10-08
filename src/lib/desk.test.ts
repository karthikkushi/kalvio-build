import { describe, expect, it, vi } from 'vitest'
import { bookViaDesk, sendToDesk, toDeskBooking, deskProducts, orderText } from './desk'
import type { Field } from '../data/types'

const fields: Field[] = [
  { name: 'name', label: 'Your name', type: 'text' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'concern', label: 'Main concern', type: 'select' },
  { name: 'date', label: 'Preferred date', type: 'date' },
  { name: 'time', label: 'Time', type: 'select' },
]
const values: Record<string, string> = { name: ' Asha ', phone: '98450 12345', concern: 'Acne', date: '2026-10-20', time: 'Evening', website: '' }
const get = (n: string) => values[n] ?? ''
const ok = () => Promise.resolve(new Response('{"ok": true}', { status: 200 }))

describe('toDeskBooking', () => {
  it('maps preset fields to desk params; other fields go in the message', () => {
    expect(toDeskBooking(fields, get)).toEqual({
      name: 'Asha',
      phone: '98450 12345',
      day: '2026-10-20',
      timePref: 'Evening',
      message: 'Main concern: Acne',
      website: '',
    })
  })
  it('cuts long entries to what desk_book accepts', () => {
    const long: Record<string, string> = { ...values, time: 'x'.repeat(60), concern: 'y'.repeat(600) }
    const b = toDeskBooking(fields, (n) => long[n] ?? '')
    expect(b.timePref).toHaveLength(40)
    expect(b.message).toHaveLength(500)
  })
})

describe('sendToDesk', () => {
  it('posts the RPC params with the key and keepalive, true on {ok:true}', async () => {
    const f = vi.fn(ok)
    expect(await sendToDesk('demo', { name: 'Asha', phone: '9845012345', day: '2026-10-20', timePref: 'Evening', message: 'Hi', website: '' }, f as never)).toBe(true)
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toMatch(/\/rest\/v1\/rpc\/desk_book$/)
    expect(init.keepalive).toBe(true)
    expect((init.headers as Record<string, string>).apikey).toMatch(/^sb_publishable_/)
    expect(JSON.parse(init.body as string)).toEqual({
      p_slug: 'demo', p_name: 'Asha', p_phone: '9845012345', p_day: '2026-10-20', p_time_pref: 'Evening', p_message: 'Hi', p_website: null,
    })
  })
  it('resolves false, never throws, when fetch rejects or the server errors', async () => {
    expect(await sendToDesk('demo', { name: 'A', phone: '1' }, (() => Promise.reject(new Error('offline'))) as never)).toBe(false)
    expect(await sendToDesk('demo', { name: 'A', phone: '1' }, (() => Promise.resolve(new Response('{"message":"Please check the name"}', { status: 400 }))) as never)).toBe(false)
  })
  it('gives up after 8 seconds', async () => {
    vi.useFakeTimers()
    const hang = (_u: string, init: RequestInit) =>
      new Promise((_, rej) => init.signal!.addEventListener('abort', () => rej(new Error('aborted'))))
    const p = sendToDesk('demo', { name: 'A', phone: '1' }, hang as never)
    await vi.advanceTimersByTimeAsync(8000)
    expect(await p).toBe(false)
    vi.useRealTimers()
  })
})

describe('bookViaDesk', () => {
  it('opens the message before fetch, and still opens when fetch rejects', async () => {
    const order: string[] = []
    const f = vi.fn(() => (order.push('fetch'), Promise.reject(new Error('offline'))))
    const done = await bookViaDesk('demo', { name: 'A', phone: '1' }, () => order.push('open'), f as never)
    expect(order).toEqual(['open', 'fetch'])
    expect(done).toBe(false)
  })
})

describe('deskProducts', () => {
  const p = { id: '1', name: 'Sunscreen SPF 50', description: null, price_paise: 65000, photo_path: null, in_stock: true }
  it('returns the list, or nothing on any failure', async () => {
    const ok = (async () => new Response(JSON.stringify([p]))) as unknown as typeof fetch
    expect(await deskProducts('demo', ok)).toEqual([p])
    const down = (async () => {
      throw new Error('offline')
    }) as unknown as typeof fetch
    expect(await deskProducts('demo', down)).toEqual([])
    const odd = (async () => new Response('{"message":"x"}', { status: 400 })) as unknown as typeof fetch
    expect(await deskProducts('demo', odd)).toEqual([])
  })
  it('types the order message', () => {
    expect(orderText(p)).toBe("Hi, I'd like to order Sunscreen SPF 50 (₹650). I saw it on your website.")
    expect(orderText({ ...p, in_stock: false })).toBe('Hi, is Sunscreen SPF 50 available? I saw it on your website.')
  })
})
