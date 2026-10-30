import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionAllowed } from '../a11y'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync.
// Only when motion is allowed; native scroll otherwise.
export default function SmoothScroll() {
  const allowed = useMotionAllowed()

  useEffect(() => {
    if (!allowed) return
    const lenis = new Lenis({ lerp: 0.12 })
    const tick = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [allowed])

  return null
}
