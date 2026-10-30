import { Link } from 'react-router-dom'
import { RiInstagramLine, RiFacebookFill, RiLinkedinFill, RiWhatsappLine, RiPhoneLine, RiMailLine, RiMapPinLine } from 'react-icons/ri'
import { site, requestLink } from '../content/site'
import { useLang } from '../i18n'
import { Star } from './Motifs'
import './Footer.css'

const socialIcons = { instagram: RiInstagramLine, facebook: RiFacebookFill, linkedin: RiLinkedinFill }

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const socials = Object.entries(site.social).filter(([, url]) => url)
  const menu = [
    ['home', '/'], ['how', '/services'], ['subjects', '/services#subjects'], ['pricing', '/services#pricing'],
    ['faq', '/services#faq'], ['about', '/about'], ['request', '/contact'], ['teach', requestLink({ role: 'tutor' })], ['privacy', '/privacy'],
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__word" data-word="tutorista" aria-hidden="true" />

        <div className="footer__grid">
          <div className="footer__brand">
            <Star size={28} className="footer__star" />
            <p>{f.tagline}</p>
          </div>

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
              <li className="footer__place"><RiMapPinLine aria-hidden="true" /> {f.place}</li>
            </ul>
            {socials.length > 0 && (
              <>
                <h2 className="footer__heading footer__heading--gap">{f.social}</h2>
                <div className="footer__social">
                  {socials.map(([name, url]) => {
                    const Icon = socialIcons[name]
                    return <a key={name} href={url} aria-label={name} target="_blank" rel="noreferrer"><Icon aria-hidden="true" /></a>
                  })}
                </div>
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
