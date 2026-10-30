import { useEffect, useRef, useState } from 'react'
import { useMotionAllowed } from '../../a11y'
import './tactile-highlight.css'

/**
 * TactileHighlight: a gold fill that sweeps in behind a phrase.
 * Port of the framer-motion original to plain React + CSS, drawn as an inline
 * background so it wraps with the text. Tied to scroll:
 * it fills when the phrase scrolls into view and empties again when you
 * scroll back up past it, so it replays on the way down. Not interactive.
 *   direction  'left' | 'right' | 'top' | 'bottom'
 *   delay      seconds before it springs in
 *   trigger    'inView' (default) | 'auto' (fill on mount, e.g. above the fold)
 */
export default function TactileHighlight({ children, className = '', direction = 'left', delay = 0.1, trigger = 'inView' }) {
  const ref = useRef(null)
  const allowed = useMotionAllowed()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (trigger !== 'inView' || !allowed || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
      // only reset when it leaves through the bottom (scrolling back up)
      else if (entry.boundingClientRect.top > 0) setInView(false)
    }, { rootMargin: '0px 0px -15% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [trigger, allowed])

  const shown = !allowed || trigger === 'auto' || inView || !('IntersectionObserver' in window)

  return (
    <span
      ref={ref}
      className={`tactile tactile--${direction} ${shown ? 'is-shown' : ''} ${className}`}
      style={{ '--tactile-delay': `${delay}s` }}
    >
      <span className="tactile__text">{children}</span>
    </span>
  )
}
