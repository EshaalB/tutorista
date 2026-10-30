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

    // Parallax: [data-parallax="0.2"] drifts with scroll; photos inside frames drift
    // a little inside their (slightly enlarged) frame. Transform only, one rAF per scroll.
    const drifters = [
      ...[...root.querySelectorAll('[data-parallax]')].map(el => ({ el, k: Number(el.dataset.parallax) })),
      ...[...root.querySelectorAll('.frame > img')].map(el => ({ el, k: -0.06, box: el.parentElement })),
    ]
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      drifters.forEach(({ el, k, box }) => {
        const r = (box || el).getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) return
        const offset = (r.top + r.height / 2 - vh / 2) * k
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      })
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    if (drifters.length) {
      update()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
      drifters.forEach(({ el }) => { el.style.transform = '' })
      io.disconnect()
      root.classList.remove('motion-on')
      root.querySelectorAll('.is-in').forEach(el => el.classList.remove('is-in'))
      paths.forEach(path => { path.style.cssText = '' })
    }
  }, [scope, key, allowed])
}
