// The swoosh from the logo, redrawn as a single reusable SVG.
export function Wave({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 120" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 96C70 40 150 18 230 40c60 16 110 22 170 6v74H0z" fill="#148ba6" opacity=".55" />
      <path d="M0 110c80-46 170-56 250-34 50 14 100 14 150-4v48H0z" fill="#f2b630" />
    </svg>
  )
}

// Every photo has a `-s` variant at `small` px wide next to it in /public.
export function PhotoTile({ src, shape, alt = '', priority = false, size = 560, small = 280, sizes }) {
  return (
    <div className={`shape shape--${shape}`}>
      <img
        src={src}
        srcSet={`${src.replace('.webp', '-s.webp')} ${small}w, ${src} ${size}w`}
        sizes={sizes}
        alt={alt}
        width={size}
        height={size}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </div>
  )
}
