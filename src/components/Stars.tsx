import { Star } from 'lucide-react'

export function Stars({ value, size = 16, className = '' }: { value: number; size?: number; className?: string }) {
  const full = Math.round(value)
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={i < full ? 'fill-[#F5B301] text-[#F5B301]' : 'fill-transparent text-current opacity-40'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}
