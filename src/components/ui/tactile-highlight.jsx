import { useEffect, useRef, useState } from 'react'
import { useMotionAllowed } from '../../a11y'
import './tactile-highlight.css'

/**
 * TactileHighlight: a block that springs in behind a phrase.
 * Port of the framer-motion original to plain React + CSS (the project has no
 * framer-motion; GSAP was removed to keep mobile light). Same API:
 *   direction  'left' | 'right' | 'top' | 'bottom'   where the block grows from
 *   delay      seconds before it springs in
 *   trigger    'inView' (default, once) | 'auto' | 'hover'
 * The text uses mix-blend-mode: difference over a gold block, so it reads as
 * dark ink on light pages and as cobalt inside the block, without extra colours.
 */
export default function TactileHighlight({ children, className = '', direction = 'left', delay = 0.1, trigger = 'inView' }) {
  const ref = useRef(null)
  const allowed = useMotionAllowed()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (trigger !== 'inView' || !allowed || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect() }
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [trigger, allowed])

  const shown = !allowed || trigger === 'auto' || (trigger === 'inView' && (inView || !('IntersectionObserver' in window)))

  return (
    <span
      ref={ref}
      className={`tactile tactile--${direction} ${trigger === 'hover' ? 'tactile--hover' : ''} ${shown ? 'is-shown' : ''} ${className}`}
      style={{ '--tactile-delay': `${delay}s` }}
    >
      <span className="tactile__block" aria-hidden="true" />
      <span className="tactile__text">{children}</span>
    </span>
  )
}
