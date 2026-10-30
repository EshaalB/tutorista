import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiMenuLine, RiCloseLine, RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri'
import { catalog, requestLink } from '../content/site'
import './Navbar.css'

const links = [
  { to: '/services', label: 'How it works' },
  { to: '/about', label: 'About' },
]

function SubjectsMenu() {
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
      <button
        className="nav__link mega__trigger"
        aria-expanded={open}
        aria-controls="mega-panel"
        onClick={() => setOpen(o => !o)}
      >
        Subjects <RiArrowDownSLine aria-hidden="true" />
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
                    <strong>{c.label}</strong>
                    <small>{c.blurb}</small>
                  </span>
                  <RiArrowRightSLine aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mega__subjects">
            <p className="mega__heading">{group.label}</p>
            <ul>
              {group.subjects.map(s => (
                <li key={s}>
                  <Link to={requestLink({ level: group.label, subject: s })}>{s}</Link>
                </li>
              ))}
            </ul>
            <Link to="/services#subjects" className="link-arrow mega__all">
              See every subject <RiArrowRightSLine aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
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

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="Tutorista home" onClick={() => setOpen(false)}>
          <img src="/brand/mark.webp" alt="" width="27" height="40" />
          <span>Tutorista</span>
        </Link>

        <nav className="nav__desktop" aria-label="Main">
          <SubjectsMenu />
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className="nav__link">{l.label}</NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <Link to={requestLink({ role: 'tutor' })} className="nav__link nav__teach">Teach with us</Link>
          <Link to="/contact" className="btn btn--dark nav__cta">Find a tutor</Link>
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            {open ? <RiCloseLine size={26} /> : <RiMenuLine size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile" id="mobile-menu">
          <nav aria-label="Mobile" onClick={(e) => e.target.closest('a') && setOpen(false)}>
            <p className="nav__mobile-label">Subjects</p>
            {catalog.map(c => (
              <details key={c.id} className="nav__mobile-group">
                <summary>{c.label}</summary>
                <ul>
                  {c.subjects.map(s => (
                    <li key={s}><Link to={requestLink({ level: c.label, subject: s })}>{s}</Link></li>
                  ))}
                </ul>
              </details>
            ))}
            <ul className="nav__mobile-links">
              {links.map(l => <li key={l.to}><NavLink to={l.to}>{l.label}</NavLink></li>)}
              <li><Link to={requestLink({ role: 'tutor' })}>Teach with us</Link></li>
            </ul>
            <Link to="/contact" className="btn btn--primary btn--block">Find a tutor</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
