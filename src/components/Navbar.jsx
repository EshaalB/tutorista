import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { RiMenuLine, RiCloseLine, RiArrowDownSLine, RiArrowRightSLine, RiSearchLine } from 'react-icons/ri'
import { catalog, requestLink, subjectName } from '../content/site'
import { useLang, languages } from '../i18n'
import SearchDialog from './SearchDialog'
import { useAuthModal } from '../auth'
import AnnouncementBar from './AnnouncementBar'
import './Navbar.css'

// One compact toggle: shows the language you would switch to.
function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useLang()
  const other = languages.find(l => l.id !== lang)
  return (
    <button type="button" className={`lang ${className}`} lang={other.htmlLang} onClick={() => setLang(other.id)}
      aria-label={`${t.nav.language}: ${other.name}`} title={other.name}>
      {other.label}
    </button>
  )
}

function SubjectsMenu() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(catalog[0].id)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus() } }
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  const group = catalog.find(c => c.id === active)

  return (
    <div className="mega" ref={ref}>
      <button className="nav__link mega__trigger" aria-expanded={open} aria-controls="mega-panel" onClick={() => setOpen(o => !o)}>
        {t.nav.subjects} <RiArrowDownSLine aria-hidden="true" />
      </button>
      {open && (
        <div className="mega__panel" id="mega-panel" onClick={(e) => e.target.closest('a') && setOpen(false)}>
          <ul className="mega__groups">
            {catalog.map(c => (
              <li key={c.id}>
                <button
                  className={`mega__group ${c.id === active ? 'is-active' : ''}`}
                  aria-pressed={c.id === active}
                  onMouseEnter={() => setActive(c.id)}
                  onFocus={() => setActive(c.id)}
                  onClick={() => setActive(c.id)}
                >
                  <span>
                    <strong>{t.levels[c.id].label}</strong>
                    <small>{t.levels[c.id].blurb}</small>
                  </span>
                  <RiArrowRightSLine aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mega__subjects">
            <p className="mega__heading">{t.levels[group.id].label}</p>
            <ul key={group.id}>
              {group.subjects.map(s => (
                <li key={s}><Link to={requestLink({ level: group.id, subject: s })}>{subjectName(s, lang)}</Link></li>
              ))}
            </ul>
            <Link to="/services#subjects" className="link-arrow mega__all">
              {t.nav.seeAll} <RiArrowRightSLine aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// On the homepage the header sits over the hero video and fills in once you scroll.
function useOverlay() {
  const { pathname } = useLocation()
  const [top, setTop] = useState(true)
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY < 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return pathname === '/' && top
}

export default function Navbar() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const overlay = useOverlay() && !open
  const auth = useAuthModal()
  const header = useRef(null)

  // the ticker scrolls away under the sticky nav, so the drawer opens from wherever the nav ends
  const toggleMenu = () => {
    header.current?.style.setProperty('--drawer-top', `${header.current.getBoundingClientRect().bottom}px`)
    setOpen(o => !o)
  }

  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName)
      if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault()
        setOpen(false)
        setSearching(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const openSearch = () => { setOpen(false); setSearching(true) }

  return (
    <header ref={header} className={`nav ${overlay ? 'nav--overlay' : ''}`}>
      <AnnouncementBar />
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="Tutorista" onClick={() => setOpen(false)}>
          <img src="/brand/mark.webp" alt="" width="27" height="40" />
          <span>Tutorista</span>
        </Link>

        <nav className="nav__desktop" aria-label={t.nav.main}>
          <NavLink to="/about" className="nav__link">{t.nav.about}</NavLink>
          <NavLink to="/services" className="nav__link">{t.nav.how}</NavLink>
          <SubjectsMenu />
          <NavLink to="/plans" className="nav__link">{t.nav.plans}</NavLink>
        </nav>

        <div className="nav__actions">
          <button type="button" className="nav__search" onClick={openSearch} aria-label={t.nav.searchLabel}>
            <RiSearchLine aria-hidden="true" />
            <span className="nav__search-text">{t.nav.search}</span>
            <kbd aria-hidden="true">/</kbd>
          </button>
          <LangSwitch className="nav__lang" />
          <button type="button" className="nav__link nav__teach" onClick={() => auth.open('login')}>{t.nav.login}</button>
          <Link to="/contact" className="btn btn--primary nav__cta">{t.nav.find}</Link>
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={toggleMenu}
          >
            {open ? <RiCloseLine size={26} /> : <RiMenuLine size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile" id="mobile-menu">
          <nav aria-label={t.nav.main} onClick={(e) => e.target.closest('a') && setOpen(false)}>
            <button type="button" className="nav__mobile-search" onClick={openSearch}>
              <RiSearchLine aria-hidden="true" /> {t.nav.search}
            </button>
            <LangSwitch className="nav__mobile-lang" />
            <p className="nav__mobile-label">{t.nav.subjects}</p>
            {catalog.map(c => (
              <details key={c.id} className="nav__mobile-group">
                <summary>{t.levels[c.id].label}</summary>
                <ul>
                  {c.subjects.map(s => (
                    <li key={s}><Link to={requestLink({ level: c.id, subject: s })}>{subjectName(s, lang)}</Link></li>
                  ))}
                </ul>
              </details>
            ))}
            <ul className="nav__mobile-links">
              <li><NavLink to="/about">{t.nav.about}</NavLink></li>
              <li><NavLink to="/services">{t.nav.how}</NavLink></li>
              <li><NavLink to="/plans">{t.nav.plans}</NavLink></li>
              <li><Link to={requestLink({ role: 'tutor' })}>{t.nav.teach}</Link></li>
            </ul>
            <div className="nav__mobile-cta">
              <button type="button" className="btn btn--ghost" onClick={() => { setOpen(false); auth.open('login') }}>{t.nav.login}</button>
              <button type="button" className="btn btn--primary" onClick={() => { setOpen(false); auth.open('signup') }}>{t.nav.signup}</button>
            </div>
          </nav>
        </div>
      )}

      {searching && <SearchDialog onClose={() => setSearching(false)} />}
    </header>
  )
}
