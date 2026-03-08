import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <img src="/logo.png" alt="Tutorista Logo" className="navbar__logo" />
          <span>Tutorista</span>
        </Link>

        <ul className={`navbar__links ${open ? 'open' : ''}`}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
                onClick={() => setOpen(false)}
                end={to === '/'}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link 
              to="/contact" 
              className="navbar__cta" 
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </li>
        </ul>

        <button
          className="navbar__burger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </div>
    </nav>
  )
}
