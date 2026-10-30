import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { catalog, requestLink, subjectInfo, subjectName } from '../content/site'
import { useLang } from '../i18n'
import { PhotoTile, LoopVideo, PageCurves } from '../components/Motifs'
import LogoMarquee from '../components/LogoMarquee'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

// "I need help with [subject] for [level]" — the hero's one call to action.
function SentencePicker() {
  const { t, lang } = useLang()
  const p = t.home.hero.picker
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    navigate(requestLink({ subject: form.get('subject') || undefined, level: form.get('level') || undefined }))
  }

  return (
    <form className="picker" onSubmit={onSubmit}>
      <p className="picker__sentence">
        <label htmlFor="pick-subject">{p.need}</label>{' '}
        <span className="picker__select">
          <select id="pick-subject" name="subject" defaultValue="">
            <option value="">{p.anySubject}</option>
            {Object.keys(subjectInfo).map(s => <option key={s} value={s}>{subjectName(s, lang)}</option>)}
          </select>
        </span>{' '}
        <label htmlFor="pick-level">{p.for}</label>{' '}
        <span className="picker__select">
          <select id="pick-level" name="level" defaultValue="">
            <option value="">{p.anyLevel}</option>
            {catalog.map(c => <option key={c.id} value={c.id}>{t.levels[c.id].label}</option>)}
          </select>
        </span>
      </p>
      <button type="submit" className="btn btn--primary">{p.go} <RiArrowRightLine aria-hidden="true" /></button>
    </form>
  )
}

function CheckPath() {
  return (
    <svg className="checks__path" viewBox="0 0 60 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path d="M30 0C58 70 2 130 30 200s-28 130 0 200 28 130 0 200" stroke="#e6dbba" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <path data-path d="M30 0C58 70 2 130 30 200s-28 130 0 200 28 130 0 200" stroke="#254d91" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
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
            <h1 className="t-display" data-split="hero">
              {h.hero.titleA} <em>{h.hero.titleB}</em>
            </h1>
            <p className="t-lead hero__lead">{h.hero.lead}</p>
            <SentencePicker />
            <Link to="/services#vetting" className="link-arrow hero__secondary">{h.hero.secondary} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>

          <figure className="hero__book">
            <div className="book" data-pages>
              <LoopVideo name="online-study" frame="page" label={h.hero.videoAlt} className="book__page book__page--left" />
              <PhotoTile src="/img/classroom-sq.webp" frame="page" alt={h.hero.photoAlt} priority sizes="(max-width: 960px) 44vw, 260px" className="book__page book__page--right" />
            </div>
            <PageCurves className="book__curves" />
            <p className="hero__note aside-ur" lang={lang === 'ur' ? 'ur' : 'ur-Latn'}>{h.hero.note}</p>
            <figcaption className="t-small hero__caption">{h.hero.caption}</figcaption>
          </figure>
        </div>
      </section>

      <LogoMarquee />

      <section className="section statement">
        <div className="container">
          <p className="kicker">{h.statement.kicker}</p>
          <p className="statement__text" data-reveal>
            {h.statement.before} <span className="mark">{h.statement.em}</span>{h.statement.after}
          </p>
        </div>
      </section>

      <section className="section section--cream checks">
        <div className="container checks__grid">
          <div className="checks__media">
            <LoopVideo name="classroom" frame="page" label={h.checks.videoAlt} className="checks__video" />
          </div>
          <div>
            <p className="kicker">{h.checks.kicker}</p>
            <h2 className="t-title" data-split="">
              {h.checks.title} <em lang={lang === 'ur' ? 'ur' : 'ur-Latn'}>{h.checks.titleEm}</em>
            </h2>
            <div className="checks__track">
              <CheckPath />
              <ol className="checks__list">
                {t.how.checks.items.map((c, i) => (
                  <li key={c.title}>
                    <span className="checks__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Link to="/services#process" className="link-arrow">{h.checks.link} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section compare">
        <div className="container">
          <div className="section-head">
            <p className="kicker">{h.compare.kicker}</p>
            <h2 className="t-title" data-split="">{h.compare.title}</h2>
          </div>
          <table className="compare__table" data-reveal>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{h.compare.cols.situation}</span></th>
                <th scope="col">{h.compare.cols.recorded}</th>
                <th scope="col" className="compare__ours">{h.compare.cols.tutor}</th>
              </tr>
            </thead>
            <tbody>
              {h.compare.rows.map(([situation, recorded, tutor]) => (
                <tr key={situation}>
                  <th scope="row">{situation}</th>
                  <td data-label={h.compare.cols.recorded}>{recorded}</td>
                  <td data-label={h.compare.cols.tutor} className="compare__ours">{tutor}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/contact" className="btn btn--primary compare__cta">{h.compare.cta} <RiArrowRightLine aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section section--cream fees">
        <div className="container fees__grid">
          <div>
            <p className="kicker">{h.fees.kicker}</p>
            <h2 className="t-title" data-split="">{h.fees.title}</h2>
            <Link to="/services#pricing" className="link-arrow fees__link">{h.fees.link} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <dl className="fees__list">
            {h.fees.items.map(f => (
              <div key={f.num} data-reveal>
                <dt>{f.num}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section paths">
        <div className="container paths__grid">
          <article className="path path--learn">
            <PhotoTile src="/img/young-learner.webp" frame="page" alt={h.paths.learn.alt} size={800} small={480} sizes="(max-width: 960px) 92vw, 640px" className="path__image zoom" data-mask />
            <div className="path__body">
              <p className="kicker">{h.paths.learn.kicker}</p>
              <h2 className="t-sub">{h.paths.learn.title}</h2>
              <p>{h.paths.learn.body}</p>
              <Link to="/contact" className="btn btn--primary">{h.paths.learn.cta} <RiArrowRightLine aria-hidden="true" /></Link>
            </div>
          </article>
          <article className="path path--teach" data-reveal>
            <PhotoTile src="/img/focused-writing.webp" frame="card" alt={h.paths.teach.alt} size={800} small={480} sizes="(max-width: 960px) 92vw, 420px" className="path__image" />
            <div className="path__body">
              <p className="kicker">{h.paths.teach.kicker}</p>
              <h2 className="t-sub">{h.paths.teach.title}</h2>
              <p>{h.paths.teach.body}</p>
              <Link to={requestLink({ role: 'tutor' })} className="btn btn--gold">{h.paths.teach.cta} <RiArrowRightLine aria-hidden="true" /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="closing">
        <PageCurves edge className="closing__curves" />
        <div className="closing__body">
          <div className="container closing__inner">
            <p className="closing__aside aside-ur" lang={lang === 'ur' ? 'ur' : 'ur-Latn'}>{h.cta.aside}</p>
            <h2 className="t-title" data-split="">{h.cta.title}</h2>
            <p className="closing__text">{h.cta.body}</p>
            <Link to="/contact" className="btn btn--gold">{h.cta.button} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
