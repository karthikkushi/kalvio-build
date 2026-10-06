const SIZES = { sm: 'size-10 text-base', md: 'size-12 text-lg', lg: 'size-16 text-2xl' } as const

/** Logo stand-in made from the shop's initials in the theme colours. */
export function Monogram({ text, size = 'md', className = '' }: { text: string; size?: keyof typeof SIZES; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-chip bg-accent font-display text-on-accent ${SIZES[size]} ${className} shadow-[inset_0_0_0_3px_var(--t-accent),inset_0_0_0_4.5px_color-mix(in_srgb,var(--t-on-accent)_40%,transparent)]`}
    >
      <span data-p="monogram" className="leading-none tracking-normal">
        {text}
      </span>
    </span>
  )
}
