import { Link } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { site, catalog, requestLink } from '../content/site'
import { useLang } from '../i18n'
import { useAuthModal } from '../auth'
import './Footer.css'

const socialNames = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn' }

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const auth = useAuthModal()
  const L = f.links
  const socials = Object.entries(site.social).filter(([, url]) => url)

  const columns = [
    { title: f.subjects, links: [...catalog.map(c => [t.levels[c.id].label, `/services#subjects`]), [L.pricing, '/services#pricing']] },
    { title: f.company, links: [[L.about, '/about'], [L.how, '/services'], [L.plans, '/plans'], [L.teach, requestLink({ role: 'tutor' })]] },
    { title: f.support, links: [[L.request, '/contact'], [L.faq, '/services#faq'], [L.privacy, '/privacy'], [L.terms, '/terms']] },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__tagline">{f.tagline}</p>
          <button type="button" className="btn btn--gold" onClick={() => auth.open('signup')}>{f.cta} <RiArrowRightLine aria-hidden="true" /></button>
        </div>

        <div className="footer__grid">
          {columns.map(col => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="footer__heading">{col.title}</h2>
              <ul>
                {col.links.map(([label, to]) => <li key={label}><Link to={to}>{label}</Link></li>)}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="footer__heading">{f.social}</h2>
            <ul>
              {socials.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noreferrer">{socialNames[name]}</a></li>)}
              {site.whatsapp && <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></li>}
              <li><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></li>
            </ul>
          </div>
        </div>

        <p className="footer__legal">© {new Date().getFullYear()} Tutorista™. {f.rights}</p>
      </div>

      <p className="footer__word" aria-hidden="true">
        {'Tutorista'.split('').map((ch, i) => <span key={i}>{ch}</span>)}
      </p>
    </footer>
  )
}
