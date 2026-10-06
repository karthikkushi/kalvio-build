interface Meta {
  title: string
  description: string
  /** e.g. "noindex" for personalised samples of real shops. */
  robots?: string
  icon?: string
  themeColor?: string
  canonical?: string
  image?: string
  lang?: string
}

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string | undefined) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!value) {
    el?.remove()
    return
  }
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (key: 'name' | 'property', name: string) => () => {
  const m = document.createElement('meta')
  m.setAttribute(key, name)
  return m
}
const link = (rel: string) => () => {
  const l = document.createElement('link')
  l.rel = rel
  return l
}

/** Client-side head updates. Link previews (WhatsApp) rely on the static/edge HTML instead, see docs/DEMO_LINKS.md. */
export function applyMeta(m: Meta) {
  document.title = m.title
  if (m.lang) document.documentElement.lang = m.lang
  upsert('meta[name="description"]', meta('name', 'description'), 'content', m.description)
  upsert('meta[property="og:title"]', meta('property', 'og:title'), 'content', m.title)
  upsert('meta[property="og:description"]', meta('property', 'og:description'), 'content', m.description)
  upsert('meta[property="og:image"]', meta('property', 'og:image'), 'content', m.image)
  upsert('meta[name="robots"]', meta('name', 'robots'), 'content', m.robots)
  upsert('meta[name="theme-color"]', meta('name', 'theme-color'), 'content', m.themeColor)
  upsert('link[rel="icon"]', link('icon'), 'href', m.icon)
  upsert('link[rel="canonical"]', link('canonical'), 'href', m.canonical)
}
