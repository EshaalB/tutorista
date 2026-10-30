import { useEffect, useRef, useState } from 'react'
import { RiPauseFill, RiPlayFill } from 'react-icons/ri'
import { useLang } from '../i18n'

// The logo's swoosh, redrawn in brand colours.
export function Wave({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 120" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 92C70 38 150 16 230 38c60 16 110 22 170 6v76H0z" fill="#176b52" opacity=".55" />
      <path d="M0 110c80-46 170-56 250-34 50 14 100 14 150-4v48H0z" fill="#efc35d" />
    </svg>
  )
}

// Eight-point star from Lahore's tile and jaali work.
export function Star({ size = 24, className = '', check = false, ...rest }) {
  return (
    <svg className={`star ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" {...rest}>
      <rect x="17" y="17" width="66" height="66" rx="5" fill="currentColor" />
      <rect x="17" y="17" width="66" height="66" rx="5" fill="currentColor" transform="rotate(45 50 50)" />
      {check && <path d="M34 51l11 11 22-24" fill="none" stroke="#233653" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}

// Every photo has a `-s` variant at `small` px wide next to it in /public.
export function PhotoTile({ src, shape, alt = '', priority = false, size = 560, small = 280, sizes, className = '' }) {
  return (
    <div className={`shape shape--${shape} ${className}`}>
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

// Muted loop that only plays while on screen, never under reduced motion or Save-Data,
// and always has a visible pause control.
export function LoopVideo({ name, label, shape = 'soft', className = '' }) {
  const { t } = useLang()
  const ref = useRef(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || navigator.connection?.saveData || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.25 })
    io.observe(video)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const video = ref.current
    userPaused.current = !video.paused
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <div className={`shape shape--${shape} video ${className}`}>
      <video
        ref={ref}
        src={`/video/${name}.mp4`}
        poster={`/video/${name}.webp`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="video__toggle" onClick={toggle} aria-label={playing ? t.video.pause : t.video.play}>
        {playing ? <RiPauseFill aria-hidden="true" /> : <RiPlayFill aria-hidden="true" />}
      </button>
    </div>
  )
}
