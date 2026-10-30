import { useLayoutEffect } from 'react'
import { useMotionAllowed } from '../a11y'

/*
  Lightweight, once-only scroll motion. Mark elements up and this wires them:
  data-reveal   fades up when it enters the viewport
  data-mask     an image frame is revealed from the bottom edge
  data-path     an SVG <path> draws itself once its section is in view
  Elements are only hidden once `.motion-on` is set on the page root, so content
  never depends on JS, and nothing is hidden under Lite mode or reduced motion.
*/
export function usePageMotion(scope, key) {
  const allowed = useMotionAllowed()

  useLayoutEffect(() => {
    const root = scope.current
    if (!root || !allowed || !('IntersectionObserver' in window)) return

    const paths = [...root.querySelectorAll('[data-path]')]
    paths.forEach(path => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
      path.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.4, 0, .2, 1)'
    })
    root.classList.add('motion-on')

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        if (el.dataset.path !== undefined) el.style.strokeDashoffset = '0'
        else el.classList.add('is-in')
        io.unobserve(el)
      })
    }, { rootMargin: '0px 0px -12% 0px' })

    root.querySelectorAll('[data-reveal], [data-mask], [data-path]').forEach(el => io.observe(el))

    return () => {
      io.disconnect()
      root.classList.remove('motion-on')
      root.querySelectorAll('.is-in').forEach(el => el.classList.remove('is-in'))
      paths.forEach(path => { path.style.cssText = '' })
    }
  }, [scope, key, allowed])
}
