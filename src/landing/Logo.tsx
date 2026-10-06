/** Kalvio Build wordmark. The K mark matches public/favicon.svg. */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const text = tone === 'light' ? 'text-white' : 'text-ink'
  return (
    <span className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={tone === 'light' ? '#C9C3FF' : '#14121F'} />
        <path d="M20 16h7v13.5L39.5 16H48L34.8 30.2 48.5 48h-8.7L29.9 34.7 27 37.8V48h-7z" fill={tone === 'light' ? '#14121F' : '#C9C3FF'} />
      </svg>
      <span className={`font-display text-xl leading-none ${text}`}>Kalvio Build</span>
    </span>
  )
}
