import { srcSet, type StockImage } from '../lib/stock'

interface Props {
  img: StockImage
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string
  className?: string
  /** Above-the-fold hero image: load eagerly with high priority. */
  priority?: boolean
  alt?: string
  filter?: string
}

/** Self-hosted stock photo as AVIF with a WebP fallback, with intrinsic size to prevent layout shift. */
export function Img({ img, sizes, className = '', priority, alt, filter }: Props) {
  const fallback = img.widths.find((w) => w >= 800) ?? img.widths[img.widths.length - 1]
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet(img, 'avif')} sizes={sizes} />
      <img
        src={`${img.base}-${fallback}.webp`}
        srcSet={srcSet(img, 'webp')}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`object-cover ${className}`}
        style={{ objectPosition: img.focus, filter }}
      />
    </picture>
  )
}
