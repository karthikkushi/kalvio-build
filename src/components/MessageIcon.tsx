import { MessageSquareText } from 'lucide-react'
import { useMessaging } from '../lib/messaging'
import { WhatsAppIcon } from './Icon'

/** WhatsApp glyph in India, a speech bubble for SMS in the US. */
export function MessageIcon({ size = 18, className }: { size?: number; className?: string }) {
  const { sms } = useMessaging()
  return sms ? <MessageSquareText size={size} className={className} aria-hidden="true" /> : <WhatsAppIcon size={size} className={className} />
}
