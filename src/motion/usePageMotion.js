import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionAllowed } from '../a11y'

gsap.registerPlugin(ScrollTrigger)

/*
  Scroll motion for a page, driven by GSAP ScrollTrigger (synced to Lenis in SmoothScroll).
  data-reveal        fades up when it enters the viewport
  data-stagger       its direct children fade up one after another
  data-mask          an image frame is revealed from the bottom edge
  data-path          an SVG <path> draws itself as its section scrolls through
  data-parallax="k"  drifts by k × its height while it crosses the viewport
  .frame > img       every framed photo drifts slightly inside its frame
  data-journey       the How it works map: steps appear one by one as you scroll
  Nothing is hidden unless motion is allowed (OS setting and Lite mode).
*/
export function usePageMotion(scope, key) {
  const allowed = useMotionAllowed()

  useLayoutEffect(() => {
    const root = scope.current
    if (!root || !allowed) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const enter = (trigger, start = 'top 85%') => ({ trigger, start, once: true })

      q('[data-reveal]').forEach(el => {
        gsap.from(el, { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', scrollTrigger: enter(el) })
      })

      q('[data-stagger]').forEach(group => {
        gsap.from(group.children, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: 0.08, scrollTrigger: enter(group) })
      })

      q('[data-mask]').forEach(el => {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut', scrollTrigger: enter(el) })
      })

      q('[data-path]').forEach(path => {
        const length = path.getTotalLength()
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: path.closest('section'), start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
        })
      })

      q('[data-parallax]').forEach(el => {
        const k = Number(el.dataset.parallax) || 0.15
        gsap.fromTo(el, { yPercent: -k * 50 }, {
          yPercent: k * 50, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      q('.frame > img').forEach(img => {
        gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, {
          yPercent: 6, scale: 1.14, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // How it works: wide screens pin the map and play the steps in order with the scroll;
      // narrow screens reveal each step as it arrives.
      q('[data-journey]').forEach(map => {
        const steps = map.querySelectorAll('.jstep')
        const mm = gsap.matchMedia()
        mm.add('(min-width: 1101px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: map.closest('section'), start: 'top top', end: `+=${steps.length * 220}`, pin: true, scrub: 0.6 },
          })
          tl.from(map.querySelector('.journey-map__rail'), { scaleX: 0, transformOrigin: 'left center', duration: steps.length, ease: 'none' }, 0)
          steps.forEach((step, i) => {
            tl.from(step.querySelector('.jstep__pill'), { opacity: 0, scale: 0.6, duration: 0.4, ease: 'back.out(2)' }, i)
              .from(step.querySelector('.jstep__line'), { scaleY: 0, duration: 0.3 }, i + 0.25)
              .from(step.querySelector('.jstep__card'), { opacity: 0, y: step.classList.contains('jstep--up') ? 24 : -24, duration: 0.45 }, i + 0.4)
          })
        })
        mm.add('(max-width: 1100px)', () => {
          steps.forEach(step => {
            gsap.from(step, { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out', scrollTrigger: enter(step, 'top 80%') })
          })
        })
      })
    }, root)

    // positions change once fonts and lazy images settle
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [scope, key, allowed])
}
