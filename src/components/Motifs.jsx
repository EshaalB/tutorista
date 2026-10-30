import { useEffect, useRef, useState } from 'react'
import { RiPauseFill, RiPlayFill } from 'react-icons/ri'
import { useLang } from '../i18n'
import { useMotionAllowed } from '../a11y'

// Layered page curves from the logo, like pages lifting off the book. As a section
// edge (`edge`), gold peeks out behind and cobalt runs on into the section below.
export function PageCurves({ className = '', edge = false }) {
  const [back, front] = edge ? ['#efc35d', '#254d91'] : ['#254d91', '#efc35d']
  return (
    <svg className={className} viewBox="0 0 600 160" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 120C120 40 230 20 300 70c70-50 180-30 300 50v40H0z" fill={back} />
      <path d="M0 140c120-60 220-70 300-30 80-40 180-30 300 30v20H0z" fill={front} />
    </svg>
  )
}

// Every photo has a `-s` variant at `small` px wide next to it in /public.
export function PhotoTile({ src, frame = 'card', alt = '', priority = false, size = 560, small = 280, sizes, className = '', ...rest }) {
  return (
    <div className={`frame frame--${frame} ${className}`} {...rest}>
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
export function LoopVideo({ name, label, frame = 'page', className = '' }) {
  const { t } = useLang()
  const allowed = useMotionAllowed()
  const ref = useRef(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!allowed || navigator.connection?.saveData || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.25 })
    io.observe(video)
    return () => { io.disconnect(); video.pause() }
  }, [allowed])

  const toggle = () => {
    const video = ref.current
    userPaused.current = !video.paused
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <div className={`frame frame--${frame} video ${className}`}>
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
