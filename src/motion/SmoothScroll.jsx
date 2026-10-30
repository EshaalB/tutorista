import { useEffect } from 'react'
import Lenis from 'lenis'
import { useMotionAllowed } from '../a11y'

// Lenis smooth scrolling, only when motion is allowed. Native scroll otherwise.
export default function SmoothScroll() {
  const allowed = useMotionAllowed()

  useEffect(() => {
    if (!allowed) return
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [allowed])

  return null
}
