import { useEffect, useState } from 'react'
import { RiArrowUpLine } from 'react-icons/ri'
import { useLang } from '../i18n'
import './FloatingDock.css'

// Back-to-top button that appears once the hero is out of view.
export default function FloatingDock() {
  const { t } = useLang()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    // React skips the re-render when the boolean hasn't changed, so this stays cheap.
    const onScroll = () => setShown(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.querySelector('.nav__brand')?.focus({ preventScroll: true })
  }

  return (
    <div className={`dock ${shown ? 'is-shown' : ''}`} inert={!shown}>
      <button type="button" className="dock__top" onClick={toTop} aria-label={t.dock.top} title={t.dock.top}>
        <RiArrowUpLine aria-hidden="true" />
      </button>
    </div>
  )
}
