import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useMotionAllowed } from '../a11y'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
  Declarative motion for a page. Mark elements up and this wires them:
  data-split="hero|"  heading lines rise out of a mask (hero plays on load, others on scroll)
  .mark               the gold underline draws in after its heading
  data-pages          hero: two children open outward from the spine like a book
  data-mask           an image frame is revealed from the bottom edge
  data-path           an SVG <path> draws itself as its section scrolls through
  data-reveal         a quiet fade-up, used for supporting groups only
  Nothing is hidden unless motion is allowed (OS setting and Lite mode), so content
  never depends on JS.
*/
export function usePageMotion(scope, key) {
  const allowed = useMotionAllowed()

  useLayoutEffect(() => {
    const root = scope.current
    if (!root || !allowed) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const once = (el) => ({ trigger: el, start: 'top 88%', once: true })
      // Nastaliq is costly to re-shape line by line; Urdu headings fade instead.
      const nastaliq = document.documentElement.lang === 'ur'

      q('[data-split]').forEach(el => {
        const hero = el.dataset.split === 'hero'
        if (nastaliq) {
          gsap.from(el, { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', delay: hero ? 0.1 : 0, scrollTrigger: hero ? undefined : once(el) })
          return
        }
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: self => gsap.from(self.lines, {
            yPercent: 110,
            duration: hero ? 1 : 0.85,
            ease: 'power4.out',
            stagger: 0.09,
            delay: hero ? 0.1 : 0,
            scrollTrigger: hero ? undefined : once(el),
          }),
        })
      })

      q('.mark').forEach(el => {
        const hero = el.closest('[data-split="hero"]')
        gsap.fromTo(el, { '--mark': 0 }, { '--mark': 1, duration: 0.9, ease: 'power3.inOut', delay: hero ? 0.8 : 0.4, scrollTrigger: hero ? undefined : once(el) })
      })

      q('[data-pages]').forEach(book => {
        const [left, right] = book.children
        const tl = gsap.timeline({ delay: 0.25, defaults: { duration: 1.2, ease: 'expo.out' } })
        tl.from(left, { rotationY: 28, xPercent: 18, opacity: 0, transformOrigin: '100% 50%' })
          .from(right, { rotationY: -28, xPercent: -18, opacity: 0, transformOrigin: '0% 50%' }, '<')
      })

      q('[data-mask]').forEach(el => {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: once(el) })
      })

      q('[data-path]').forEach(path => {
        const length = path.getTotalLength()
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: path.closest('section'), start: 'top 65%', end: 'bottom 75%', scrub: 0.6 },
        })
      })

      const reveals = q('[data-reveal]')
      if (reveals.length) {
        gsap.set(reveals, { opacity: 0, y: 24 })
        ScrollTrigger.batch(reveals, {
          start: 'top 90%',
          once: true,
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
        })
      }
    }, root)

    return () => ctx.revert()
  }, [scope, key, allowed])
}
