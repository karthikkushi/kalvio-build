import { createContext, useContext } from 'react'
import { SITE, waLink } from '../config/site'
import { useDemo } from './demo'
import { yesMessage } from './personalise'

export type ActionKind = 'call' | 'whatsapp' | 'book'

export const HintContext = createContext<(kind: ActionKind) => void>(() => {})

/** Opens the "this is a sample button" explainer. */
export function useActionHint() {
  return useContext(HintContext)
}

/** Message Kalvio Build gets when an owner says yes. */
export function useYesLink(): string {
  const { name, area, pageUrl } = useDemo()
  return waLink(SITE.whatsapp, yesMessage(name, area, pageUrl))
}
