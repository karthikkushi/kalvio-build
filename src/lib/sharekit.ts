/**
 * Shared by the share page, the /demo edge function and the share Worker, so they agree on cache keys.
 *
 * - The share Worker screenshots a personalised sample once and caches it under shotKey(samplePath).
 * - The share page uploads a link-preview image with the shop's name under ogKey(...); the /demo edge function
 *   computes the same key to point og:image at it (falling back to the generic image when there is none).
 */
export async function sha(text: string, length = 24): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length)
}

/** Bump when the screenshot process changes, so older cached screenshots are not reused. */
export const SHOT_VERSION = 3

/** Cache key for a sample's screenshot: everything that changes how the page looks. */
export function shotKey(samplePath: string): Promise<string> {
  return sha(`shot|v${SHOT_VERSION}|${samplePath}`)
}

/** Cache key for a link-preview image: the values printed on it, after defaults were applied. */
export function ogKey(v: { key: string; theme: string; name: string; area: string; city: string }): Promise<string> {
  return sha(['og', v.key, v.theme, v.name, v.area, v.city].join('|'))
}
