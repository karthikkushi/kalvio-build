import { createElement, type ReactNode } from 'react'
import type { Lang, Localized } from '../data/types'

/** Like t(), but wraps each {var} in <span data-p="var"> so the edge function can personalise prerendered HTML. */
export function tRich(text: Localized, lang: Lang, vars: Record<string, string>): ReactNode[] {
  const s = text[lang] ?? text.en
  return s.split(/(\{\w+\})/).map((part, i) => {
    const m = /^\{(\w+)\}$/.exec(part)
    return m ? createElement('span', { key: i, 'data-p': m[1] }, vars[m[1]] ?? '') : part
  })
}
