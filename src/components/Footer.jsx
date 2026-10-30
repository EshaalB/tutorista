import { Link } from 'react-router-dom'
import { RiInstagramLine, RiFacebookFill, RiLinkedinFill, RiWhatsappLine, RiPhoneLine, RiMailLine } from 'react-icons/ri'
import { site, requestLink } from '../content/site'
import { useLang } from '../i18n'
import './Footer.css'

const socialIcons = { instagram: RiInstagramLine, facebook: RiFacebookFill, linkedin: RiLinkedinFill }
const socialNames = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn' }

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const socials = Object.entries(site.social).filter(([, url]) => url)
  const menu = [
    ['home', '/'], ['how', '/services'], ['subjects', '/services#subjects'], ['pricing', '/services#pricing'],
    ['faq', '/services#faq'], ['about', '/about'], ['request', '/contact'], ['teach', requestLink({ role: 'tutor' })],
    ['privacy', '/privacy'], ['terms', '/terms'],
  ]

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__word" aria-hidden="true">
          {'tutorista'.split('').map((ch, i) => <span key={i} style={{ '--i': i }}>{ch}</span>)}
        </p>

        <div className="footer__grid">
          <p className="footer__tagline">{f.tagline}</p>

          <nav aria-labelledby="footer-menu">
            <h2 id="footer-menu" className="footer__heading">{f.menu}</h2>
            <ul className="footer__menu">
              {menu.map(([key, to]) => <li key={key}><Link to={to}>{f.links[key]}</Link></li>)}
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">{f.contact}</h2>
            <ul className="footer__contact">
              <li><a href={`mailto:${site.email}`}><RiMailLine aria-hidden="true" /> <span dir="ltr">{site.email}</span></a></li>
              {site.whatsapp && <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"><RiWhatsappLine aria-hidden="true" /> WhatsApp</a></li>}
              {site.phone && <li><a href={`tel:${site.phone}`}><RiPhoneLine aria-hidden="true" /> <span dir="ltr">{site.phone}</span></a></li>}
              <li className="footer__place">{f.place}</li>
            </ul>
            {socials.length > 0 && (
              <>
                <h2 className="footer__heading footer__heading--gap">{f.social}</h2>
                <ul className="footer__social">
                  {socials.map(([name, url]) => {
                    const Icon = socialIcons[name]
                    return <li key={name}><a href={url} target="_blank" rel="noreferrer"><Icon aria-hidden="true" /> {socialNames[name]}</a></li>
                  })}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Tutorista™</span>
          <span>{f.rights}</span>
        </div>
      </div>
    </footer>
  )
}
