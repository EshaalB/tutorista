import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiCheckLine, RiComputerLine, RiHome4Line } from 'react-icons/ri'
import Accordion from '../components/Accordion'
import { PhotoTile, LoopVideo, Star } from '../components/Motifs'
import { catalog, requestLink, subjectName } from '../content/site'
import { useLang } from '../i18n'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Services.css'

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
            <p className="eyebrow" data-reveal>{s.hero.eyebrow}</p>
            <h1 className="t-display" data-split="hero">{s.hero.titleStart} <span className="mark">{s.hero.titleMark}</span></h1>
          </div>
          <div className="how-hero__side">
            <p className="t-lead" data-reveal>{s.hero.lead}</p>
            <nav className="how-hero__toc" aria-label={s.hero.tocLabel} data-reveal>
              {Object.entries({ process: 'process', checks: 'vetting', subjects: 'subjects', pricing: 'pricing', faq: 'faq' }).map(([key, id]) => (
                <a key={key} href={`#${id}`}>{s.hero.toc[key]}</a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section id="process" className="section journey">
        <div className="container journey__grid">
          <div className="journey__aside">
            <h2 className="t-title" data-split="">{s.process.title}</h2>
            <p className="t-lead" data-reveal>{s.process.lead}</p>
            <Link to="/contact" className="btn btn--primary" data-reveal>{s.process.cta} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <div className="journey__track">
            <span className="journey__line" data-draw aria-hidden="true" />
            <ol className="journey__list">
              {s.process.steps.map((j, i) => (
                <li key={j.title} className="journey__step" data-reveal>
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
          <h2 className="t-title formats__title" data-split="">{s.formats.title}</h2>
          <div className="formats__grid">
            <article className="format" data-reveal>
              <LoopVideo name="notes" shape="leaf" label={s.formats.onlineAlt} className="format__media" />
              <div className="format__body">
                <RiComputerLine className="format__icon" aria-hidden="true" />
                <h3 className="t-sub">{s.formats.online.title}</h3>
                <p>{s.formats.online.desc}</p>
              </div>
            </article>
            <article className="format" data-reveal>
              <PhotoTile src="/img/young-learner.webp" shape="arch" alt={s.formats.homeAlt} size={800} small={480} sizes="(max-width: 640px) 90vw, 540px" className="format__media zoom" />
              <div className="format__body">
                <RiHome4Line className="format__icon" aria-hidden="true" />
                <h3 className="t-sub">{s.formats.home.title}</h3>
                <p>{s.formats.home.desc}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="vetting" className="section section--blue checks">
        <div className="container">
          <div className="checks__head">
            <div className="section-head">
              <p className="eyebrow" data-reveal>{s.checks.eyebrow}</p>
              <h2 className="t-title" data-split="">{s.checks.title}</h2>
              <p className="t-lead" data-reveal>{s.checks.lead}</p>
            </div>
            <Link to={requestLink({ role: 'tutor' })} className="link-arrow" data-reveal>{s.checks.cta} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <ol className="checks__row">
            {s.checks.items.map((c, i) => (
              <li key={c.title} data-reveal>
                <span className="checks__badge" aria-hidden="true">
                  <Star size={44} />
                  <b>{i + 1}</b>
                </span>
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
            <h2 className="t-title" data-split="">{s.subjects.title}</h2>
            <p className="t-lead" data-reveal>{s.subjects.lead}</p>
          </div>
          <div className="subjects__grid">
            {catalog.map(c => (
              <div key={c.id} className="subjects__group" data-reveal>
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
        <div className="container">
          <div className="section-head">
            <h2 className="t-title" data-split="">{s.pricing.title}</h2>
            <p className="t-lead" data-reveal>{s.pricing.lead}</p>
          </div>
          <div className="pricing__grid">
            {[
              ['students', '/contact', 'btn--primary'],
              ['tutors', requestLink({ role: 'tutor' }), 'btn--gold'],
            ].map(([key, to, btn]) => (
              <div key={key} className={`price price--${key}`} data-reveal>
                <p className="price__who">{s.pricing[key].who}</p>
                <p className="price__amount">{s.pricing[key].amount} <span>{s.pricing[key].unit}</span></p>
                <ul className="list-check">
                  {s.pricing[key].points.map(p => <li key={p}><RiCheckLine aria-hidden="true" />{p}</li>)}
                </ul>
                <Link to={to} className={`btn ${btn}`}>{s.pricing[key].cta} <RiArrowRightLine aria-hidden="true" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section faq">
        <div className="container faq__grid">
          <div>
            <h2 className="t-title" data-split="">{s.faq.title}</h2>
            <p className="t-lead faq__lead" data-reveal>{s.faq.lead} <Link to="/contact" className="faq__link">{s.faq.link}</Link></p>
          </div>
          <div data-reveal><Accordion items={s.faq.items} /></div>
        </div>
      </section>
    </div>
  )
}
