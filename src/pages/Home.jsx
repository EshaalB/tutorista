import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { catalog, requestLink, subjectName } from '../content/site'
import { useLang } from '../i18n'
import { PhotoTile, LoopVideo, Star, Wave } from '../components/Motifs'
import LogoMarquee from '../components/LogoMarquee'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

function SubjectFinder() {
  const { t, lang } = useLang()
  const [active, setActive] = useState(catalog[0].id)
  const group = catalog.find(c => c.id === active)

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const dir = document.documentElement.dir === 'rtl' ? -step : step
    const i = (catalog.findIndex(c => c.id === active) + dir + catalog.length) % catalog.length
    setActive(catalog[i].id)
    document.getElementById(`tab-${catalog[i].id}`)?.focus()
  }

  return (
    <section className="section section--blue finder" aria-labelledby="finder-title">
      <div className="container">
        <div className="finder__head">
          <h2 id="finder-title" className="t-title" data-split="">{t.home.finder.title}</h2>
          <p data-reveal>{t.home.finder.sub}</p>
        </div>
        <div className="finder__tabs" role="tablist" aria-label={t.nav.subjects} onKeyDown={onKeyDown}>
          {catalog.map(c => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={c.id === active}
              tabIndex={c.id === active ? 0 : -1}
              aria-controls="finder-panel"
              className="finder__tab"
              onClick={() => setActive(c.id)}
            >
              {t.levels[c.id].label}
            </button>
          ))}
        </div>
        <div id="finder-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <ul className="finder__chips" key={active}>
            {group.subjects.map(s => (
              <li key={s}>
                <Link className="chip" to={requestLink({ level: group.id, subject: s })}>{subjectName(s, lang)}</Link>
              </li>
            ))}
            <li><Link className="chip chip--other" to="/contact">{t.home.finder.other}</Link></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t, lang } = useLang()
  const h = t.home
  const scope = useRef(null)
  usePageMeta(t.meta.home)
  usePageMotion(scope, lang)

  return (
    <div ref={scope}>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow" data-reveal>{h.hero.eyebrow}</p>
            <h1 className="t-display" data-split="hero">
              {h.hero.titleStart} <span className="mark">{h.hero.titleMark}</span>
            </h1>
            <p className="t-lead hero__lead" data-reveal>{h.hero.lead}</p>
            <div className="hero__actions" data-reveal>
              <Link to="/contact" className="btn btn--primary">{t.nav.find} <RiArrowRightLine aria-hidden="true" /></Link>
              <Link to="/services" className="btn btn--ghost">{t.nav.how}</Link>
            </div>
            <ul className="hero__notes" data-reveal>
              {h.hero.notes.map(n => <li key={n}><RiCheckLine aria-hidden="true" /> {n}</li>)}
            </ul>
          </div>

          <div className="hero__art">
            <span className="hero__sun" data-parallax="-18" aria-hidden="true" />
            <span className="dot hero__dot hero__dot--a" aria-hidden="true" />
            <span className="dot hero__dot hero__dot--b" aria-hidden="true" />
            <div className="hero__media" data-hero-media>
              <LoopVideo name="online-study" shape="arch" label={h.hero.videoAlt} className="hero__video" />
              <PhotoTile src="/img/study-group-sq.webp" shape="circle" priority sizes="(max-width: 560px) 40vw, 240px" className="hero__photo" />
              <PhotoTile src="/img/classroom-sq.webp" shape="quarter" sizes="(max-width: 560px) 40vw, 240px" className="hero__photo" />
              <div className="hero__ticket" aria-hidden="true">
                <div data-float>
                  <span className="hero__ticket-label">{h.hero.card.label}</span>
                  <strong>{h.hero.card.subject}</strong>
                  <span>{h.hero.card.detail}</span>
                </div>
              </div>
              <div className="hero__badge">
                <span className="hero__badge-icon" aria-hidden="true">
                  <Star size={44} data-spin />
                  <RiCheckLine />
                </span>
                <span>{h.hero.badge}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />

      <section className="section promise">
        <div className="container promise__grid">
          <div>
            <p className="eyebrow" data-reveal>{h.promise.eyebrow}</p>
            <h2 className="t-title" data-split="">{h.promise.title}</h2>
            <p className="t-lead promise__body" data-reveal>{h.promise.body}</p>
            <ul className="promise__points">
              {h.promise.points.map(p => (
                <li key={p.title} data-reveal>
                  <Star size={22} className="promise__star" />
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/services#vetting" className="link-arrow" data-reveal>{h.promise.link} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <div className="promise__media" data-reveal>
            <LoopVideo name="classroom" shape="soft" label={h.promise.videoAlt} className="promise__video" />
            <span className="promise__frame" aria-hidden="true" />
          </div>
        </div>
      </section>

      <SubjectFinder />

      <section className="section steps">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>{h.steps.eyebrow}</p>
            <h2 className="t-title" data-split="">{h.steps.title}</h2>
          </div>
          <ol className="steps__list">
            {h.steps.items.map((s, i) => (
              <li key={s.title} className="steps__item" data-reveal>
                <span className={`steps__num steps__num--${i + 1}`} aria-hidden="true">{i + 1}</span>
                <h3 className="t-sub">{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
          <Link to="/services" className="link-arrow" data-reveal>{h.steps.link} <RiArrowRightLine aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section section--cream compare">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>{h.compare.eyebrow}</p>
            <h2 className="t-title" data-split="">{h.compare.title}</h2>
          </div>
          <div className="compare__grid">
            <div className="compare__card compare__card--plain" data-reveal>
              <h3 className="t-sub">{h.compare.recorded.title}</h3>
              <ul>
                {h.compare.recorded.points.map(p => <li key={p}><RiCloseLine aria-hidden="true" /> {p}</li>)}
              </ul>
            </div>
            <div className="compare__card compare__card--ours" data-reveal>
              <Star size={30} className="compare__star" />
              <h3 className="t-sub">{h.compare.tutor.title}</h3>
              <ul>
                {h.compare.tutor.points.map(p => <li key={p}><RiCheckLine aria-hidden="true" /> {p}</li>)}
              </ul>
              <Link to="/contact" className="btn btn--gold">{h.compare.cta} <RiArrowRightLine aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section paths">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>{h.paths.eyebrow}</p>
            <h2 className="t-title" data-split="">{h.paths.title}</h2>
          </div>
          <div className="paths__grid">
            {[
              ['learn', '/img/young-learner.webp', 'leaf', '/contact', 'btn--primary'],
              ['teach', '/img/focused-writing.webp', 'arch', requestLink({ role: 'tutor' }), 'btn--gold'],
            ].map(([key, img, shape, to, btn]) => (
              <article key={key} className={`path path--${key}`} data-reveal>
                <PhotoTile src={img} shape={shape} size={800} small={480} sizes="(max-width: 960px) 90vw, 540px" className="zoom" />
                <div className="path__body">
                  <h3 className="t-sub">{h.paths[key].title}</h3>
                  <ul className="list-check">
                    {h.paths[key].points.map(p => <li key={p}><RiCheckLine aria-hidden="true" />{p}</li>)}
                  </ul>
                  <Link to={to} className={`btn ${btn}`}>{h.paths[key].cta} <RiArrowRightLine aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta__panel" data-reveal>
            <div>
              <h2 className="t-title">{h.cta.title}</h2>
              <p>{h.cta.body}</p>
            </div>
            <Link to="/contact" className="btn btn--gold">{h.cta.button} <RiArrowRightLine aria-hidden="true" /></Link>
            <Star size={160} className="cta__star" data-spin />
            <Wave className="cta__wave" />
          </div>
        </div>
      </section>
    </div>
  )
}
