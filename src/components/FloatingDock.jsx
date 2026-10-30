import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiArrowUpLine, RiArrowRightLine } from 'react-icons/ri'
import { useLang } from '../i18n'
import './FloatingDock.css'

// Appears once the hero is out of view: a quiet "find a tutor" shortcut plus back to top.
export default function FloatingDock() {
  const { t } = useLang()
  const { pathname } = useLocation()
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
      {pathname !== '/contact' && (
        <Link to="/contact" className="dock__find">
          {t.dock.find} <RiArrowRightLine aria-hidden="true" />
        </Link>
      )}
      <button type="button" className="dock__top" onClick={toTop} aria-label={t.dock.top} title={t.dock.top}>
        <RiArrowUpLine aria-hidden="true" />
      </button>
    </div>
  )
}
