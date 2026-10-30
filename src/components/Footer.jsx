import { Link } from 'react-router-dom'
import { RiInstagramLine, RiFacebookFill, RiLinkedinFill } from 'react-icons/ri'
import { site, catalog, requestLink } from '../content/site'
import './Footer.css'

const socialIcons = { instagram: RiInstagramLine, facebook: RiFacebookFill, linkedin: RiLinkedinFill }

export default function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url)
  const popular = catalog.flatMap(c => c.subjects.slice(0, 2).map(s => ({ s, level: c.label })))

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__word" data-word="tutorista" aria-hidden="true" />

        <div className="footer__grid">
          <div className="footer__intro">
            <p>One-to-one tutoring for students in {site.city}, online or at home.</p>
            <a href={`mailto:${site.email}`} className="footer__email">{site.email}</a>
            {socials.length > 0 && (
              <div className="footer__social">
                {socials.map(([name, url]) => {
                  const Icon = socialIcons[name]
                  return <a key={name} href={url} aria-label={name} target="_blank" rel="noreferrer"><Icon /></a>
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="footer__heading">Tutorista</h2>
            <ul>
              <li><Link to="/services">How it works</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Students & parents</h2>
            <ul>
              <li><Link to="/contact">Request a tutor</Link></li>
              <li><Link to="/services#subjects">All subjects</Link></li>
              <li><Link to="/services#pricing">Pricing</Link></li>
              <li><Link to="/services#faq">FAQs</Link></li>
            </ul>
            <h2 className="footer__heading footer__heading--gap">Tutors</h2>
            <ul>
              <li><Link to={requestLink({ role: 'tutor' })}>Apply to teach</Link></li>
              <li><Link to="/services#vetting">How we vet tutors</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Popular subjects</h2>
            <ul>
              {popular.map(({ s, level }) => (
                <li key={level + s}><Link to={requestLink({ level, subject: s })}>{s} <span>{level}</span></Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Tutorista, {site.city}</span>
        </div>
      </div>
    </footer>
  )
}
