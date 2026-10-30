import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
  Declarative motion for a page. Mark elements up and this wires them:
  data-split="hero|"   heading lines rise out of a mask (hero plays on load, others on scroll)
  .mark                the gold underline draws in after its heading
  data-reveal          fades up in scroll-batched groups
  data-hero-media      direct children pop in on load
  data-float / data-spin   slow idle loops for small decorative pieces
  data-parallax="-12"  yPercent drift while the section scrolls (wide screens only)
  data-draw            scales in along Y as its parent scrolls through (progress lines)
  Nothing is hidden unless motion is allowed, so content never depends on JS.
*/
export function usePageMotion(scope, key) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia(root)

    mm.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 961px)' }, (ctx) => {
      const { motion, wide } = ctx.conditions
      if (!motion) return
      const q = gsap.utils.selector(root)
      // Nastaliq is costly to re-shape line by line; Urdu headings fade up instead.
      const nastaliq = document.documentElement.lang === 'ur'

      if (nastaliq) {
        q('[data-split]').forEach(el => {
          const hero = el.dataset.split === 'hero'
          gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.9, ease: 'power3.out', delay: hero ? 0.15 : 0, scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%', once: true } })
        })
      }

      q(nastaliq ? '[data-split-none]' : '[data-split]').forEach(el => {
        const hero = el.dataset.split === 'hero'
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: self => gsap.from(self.lines, {
            yPercent: 110,
            duration: hero ? 1.05 : 0.85,
            ease: 'power4.out',
            stagger: 0.1,
            delay: hero ? 0.15 : 0,
            scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%', once: true },
          }),
        })
      })

      q('.mark').forEach(el => {
        const hero = el.closest('[data-split="hero"]')
        gsap.fromTo(el, { '--mark': 0 }, {
          '--mark': 1,
          duration: 0.9,
          ease: 'power3.inOut',
          delay: hero ? 0.95 : 0.45,
          scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%', once: true },
        })
      })

      const reveals = q('[data-reveal]')
      if (reveals.length) {
        gsap.set(reveals, { autoAlpha: 0, y: 28 })
        ScrollTrigger.batch(reveals, {
          start: 'top 90%',
          once: true,
          onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true }),
        })
      }

      const media = q('[data-hero-media] > *')
      if (media.length) gsap.from(media, { autoAlpha: 0, scale: 0.9, y: 30, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.35 })

      q('[data-float]').forEach((el, i) => gsap.to(el, { y: -10, duration: 2.4 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      q('[data-spin]').forEach(el => gsap.to(el, { rotate: 360, duration: 28, ease: 'none', repeat: -1 }))

      if (wide) {
        q('[data-parallax]').forEach(el => gsap.to(el, {
          yPercent: Number(el.dataset.parallax),
          ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top top', end: 'bottom top', scrub: true },
        }))
      }

      q('[data-draw]').forEach(el => gsap.from(el, {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: true },
      }))
    })

    return () => mm.revert()
  }, [scope, key])
}
