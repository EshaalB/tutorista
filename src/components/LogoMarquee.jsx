import { examLogos } from '../content/site'
import { useLang } from '../i18n'
import './LogoMarquee.css'

// The only logo strip on the site. Logos are greyed so they inform without competing.
export default function LogoMarquee() {
  const { t } = useLang()
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {examLogos.map(l => (
        <li key={l.src}>
          <img src={l.src} alt={hidden ? '' : l.alt} width={l.w / 2} height={48} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  )

  return (
    <section className="marquee" aria-label={t.home.marquee}>
      <div className="container marquee__inner">
        <p className="marquee__label">{t.home.marquee}</p>
        <div className="marquee__viewport">
          <div className="marquee__track">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  )
}
