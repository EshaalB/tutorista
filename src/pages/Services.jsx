import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import Accordion from '../components/Accordion'
import { PhotoTile, LoopVideo } from '../components/Motifs'
import TactileHighlight from '../components/ui/tactile-highlight'
import { catalog, requestLink, subjectName } from '../content/site'
import { useLang } from '../i18n'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Services.css'

const sections = { process: 'process', checks: 'vetting', subjects: 'subjects', pricing: 'pricing', faq: 'faq' }

export default function Services() {
  const { t, lang } = useLang()
  const s = t.how
  const scope = useRef(null)
  usePageMeta(t.meta.how)
  usePageMotion(scope, lang)

  return (
    <div ref={scope}>
      <section className="how-hero">
        <div className="container how-hero__grid">
          <div>
            <p className="kicker">{s.hero.kicker}</p>
            <h1 className="t-display">{s.hero.titleA} <TactileHighlight trigger="auto" delay={0.4}>{s.hero.titleB}</TactileHighlight></h1>
          </div>
          <div>
            <p className="t-lead">{s.hero.lead}</p>
            <nav className="how-hero__toc" aria-label={s.hero.tocLabel}>
              {Object.entries(sections).map(([key, id]) => <a key={key} href={`#${id}`}>{s.hero.toc[key]}</a>)}
            </nav>
          </div>
        </div>
      </section>

      <section id="process" className="section journey">
        <div className="container journey__grid">
          <div className="journey__aside">
            <h2 className="t-title">{s.process.title}</h2>
            <p className="t-lead">{s.process.lead}</p>
            <Link to="/contact" className="btn btn--primary">{s.process.cta} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <div className="journey__track">
            <svg className="journey__line" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 0V100" stroke="#e6dbba" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path data-path d="M2 0V100" stroke="#254d91" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="journey__list">
              {s.process.steps.map((j, i) => (
                <li key={j.title} className="journey__step">
                  <span className="journey__num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="t-sub">{j.title}</h3>
                    <p>{j.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--cream formats">
        <div className="container">
          <h2 className="t-title formats__title">{s.formats.title}</h2>
          <div className="formats__grid">
            <article className="format">
              <LoopVideo name="notes" frame="page" label={s.formats.onlineAlt} className="format__media" />
              <h3 className="t-sub">{s.formats.online.title}</h3>
              <p>{s.formats.online.desc}</p>
            </article>
            <article className="format format--offset">
              <PhotoTile src="/img/pk-reading.webp" frame="card" alt={s.formats.homeAlt} size={800} small={480} sizes="(max-width: 640px) 92vw, 520px" className="format__media" data-mask />
              <h3 className="t-sub">{s.formats.home.title}</h3>
              <p>{s.formats.home.desc}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="vetting" className="section section--blue checks">
        <div className="container">
          <div className="checks__head">
            <div className="section-head">
              <p className="kicker">{s.checks.kicker}</p>
              <h2 className="t-title">{s.checks.title}</h2>
              <p className="t-lead">{s.checks.lead}</p>
            </div>
            <Link to={requestLink({ role: 'tutor' })} className="link-arrow">{s.checks.cta} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <ol className="checks__row">
            {s.checks.items.map((c, i) => (
              <li key={c.title}>
                <span className="checks__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="subjects" className="section subjects">
        <div className="container">
          <div className="section-head">
            <h2 className="t-title">{s.subjects.title}</h2>
            <p className="t-lead">{s.subjects.lead}</p>
          </div>
          <div className="subjects__grid">
            {catalog.map(c => (
              <div key={c.id} className="subjects__group">
                <h3>{t.levels[c.id].label}</h3>
                <p className="t-small">{t.levels[c.id].blurb}</p>
                <ul>
                  {c.subjects.map(sub => (
                    <li key={sub}>
                      <Link to={requestLink({ level: c.id, subject: sub })}>
                        {subjectName(sub, lang)} <RiArrowRightLine aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section section--cream pricing">
        <div className="container pricing__grid">
          <div>
            <h2 className="t-title">{s.pricing.title}</h2>
            <p className="t-lead pricing__lead">{s.pricing.lead}</p>
          </div>
          {[
            ['students', '/contact', 'btn--primary'],
            ['tutors', requestLink({ role: 'tutor' }), 'btn--gold'],
          ].map(([key, to, btn]) => (
            <div key={key} className={`price price--${key}`}>
              <p className="price__who">{s.pricing[key].who}</p>
              <p className="price__amount">{s.pricing[key].amount} <span>{s.pricing[key].unit}</span></p>
              <ul className="list-check">
                {s.pricing[key].points.map(p => <li key={p}><RiCheckLine aria-hidden="true" />{p}</li>)}
              </ul>
              <Link to={to} className={`btn ${btn}`}>{s.pricing[key].cta} <RiArrowRightLine aria-hidden="true" /></Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="section faq">
        <div className="container faq__grid">
          <div>
            <h2 className="t-title">{s.faq.title}</h2>
            <p className="faq__lead">
              <span className="aside-ur" lang={lang === 'ur' ? 'ur' : 'ur-Latn'}>{s.faq.lead}</span>{' '}
              <Link to="/contact" className="faq__link">{s.faq.link}</Link>
            </p>
          </div>
          <Accordion items={s.faq.items} />
        </div>
      </section>
    </div>
  )
}
