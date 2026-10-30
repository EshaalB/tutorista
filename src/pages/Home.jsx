import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiArrowRightLine, RiPauseFill, RiPlayFill } from 'react-icons/ri'
import { catalog, requestLink, subjectInfo, subjectName } from '../content/site'
import { useLang } from '../i18n'
import { useMotionAllowed } from '../a11y'
import { PhotoTile, LoopVideo } from '../components/Motifs'
import TactileHighlight from '../components/ui/tactile-highlight'
import LogoMarquee from '../components/LogoMarquee'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

// Full-bleed classroom footage behind the hero. Poster only under Lite mode,
// reduced motion or Save-Data; always pausable.
function HeroVideo({ label, caption }) {
  const { t } = useLang()
  const allowed = useMotionAllowed()
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const play = allowed && !navigator.connection?.saveData

  useEffect(() => {
    const video = ref.current
    if (!play) { video.pause(); return }
    video.play().catch(() => {})
  }, [play])

  const toggle = () => {
    const video = ref.current
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <>
      <video
        ref={ref}
        className="vhero__video"
        muted
        loop
        playsInline
        preload={play ? 'auto' : 'none'}
        poster="/video/hero.webp"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/video/hero-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="container vhero__meta">
        <button type="button" className="vhero__toggle" onClick={toggle} aria-label={playing ? t.video.pause : t.video.play}>
          {playing ? <RiPauseFill aria-hidden="true" /> : <RiPlayFill aria-hidden="true" />}
        </button>
        <p>{caption}</p>
      </div>
    </>
  )
}

// "I need help with [subject] for [level]": one line to a pre-filled request.
function SentencePicker() {
  const { t, lang } = useLang()
  const p = t.home.picker
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
  const roman = lang === 'ur' ? 'ur' : 'ur-Latn'

  return (
    <div ref={scope}>
      <section className="vhero">
        <HeroVideo label={h.hero.videoAlt} caption={h.hero.media} />
        <div className="vhero__shade" aria-hidden="true" />
        <div className="container vhero__grid">
          <div className="vhero__main">
            <h1 className="t-display vhero__title">
              {h.hero.titleA}{' '}
              <TactileHighlight trigger="auto" delay={0.6}>{h.hero.titleB}</TactileHighlight>
            </h1>
            <p className="vhero__lead">{h.hero.lead}</p>
            <div className="vhero__actions">
              <Link to="/signup" className="btn btn--gold">{h.hero.cta} <RiArrowRightLine aria-hidden="true" /></Link>
              <Link to="/plans" className="btn vhero__ghost">{h.hero.secondary}</Link>
            </div>
          </div>
          <div className="vhero__side">
            <p>{h.hero.side}</p>
            <aside className="trust" aria-labelledby="trust-title">
              <h2 id="trust-title" className="trust__title">{h.hero.trust.title}</h2>
              <dl className="trust__stats">
                {h.hero.trust.stats.map(s => (
                  <div key={s.label}>
                    <dt>{s.num}</dt>
                    <dd>{s.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="trust__note">{h.hero.trust.note}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="pickband" aria-labelledby="pick-title">
        <div className="container pickband__inner">
          <h2 id="pick-title" className="kicker pickband__title">{h.picker.title}</h2>
          <SentencePicker />
        </div>
      </section>

      <LogoMarquee />

      <section className="section who">
        <div className="container who__grid">
          <p className="who__label">{h.about.label}</p>
          <p className="who__text" data-reveal>
            {h.about.before} <TactileHighlight direction="left" delay={0.2}>{h.about.em}</TactileHighlight> {h.about.after}
          </p>
          <dl className="who__stats">
            {h.about.stats.map(s => (
              <div key={s.label} data-reveal>
                <dt>{s.num}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--cream checks">
        <div className="container checks__grid">
          <div className="checks__media">
            <LoopVideo name="online-study" frame="page" label={h.checks.videoAlt} className="checks__video" />
          </div>
          <div>
            <p className="kicker">{h.checks.kicker}</p>
            <h2 className="t-title">
              {h.checks.title} <em lang={roman}>{h.checks.titleEm}</em>
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
            <h2 className="t-title">{h.compare.title}</h2>
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

      <section className="section section--cream paths">
        <div className="container paths__grid">
          <article className="path path--learn">
            <PhotoTile src="/img/pk-uniform.webp" frame="page" alt={h.paths.learn.alt} size={800} small={480} sizes="(max-width: 960px) 92vw, 640px" className="path__image zoom" data-mask />
            <div className="path__body">
              <p className="kicker">{h.paths.learn.kicker}</p>
              <h2 className="t-sub">{h.paths.learn.title}</h2>
              <p>{h.paths.learn.body}</p>
              <Link to="/contact" className="btn btn--primary">{h.paths.learn.cta} <RiArrowRightLine aria-hidden="true" /></Link>
            </div>
          </article>
          <article className="path path--teach">
            <PhotoTile src="/img/pk-notes.webp" frame="card" alt={h.paths.teach.alt} size={800} small={480} sizes="(max-width: 960px) 92vw, 420px" className="path__image" />
            <div className="path__body">
              <p className="kicker">{h.paths.teach.kicker}</p>
              <h2 className="t-sub">{h.paths.teach.title}</h2>
              <p>{h.paths.teach.body}</p>
              <Link to={requestLink({ role: 'tutor' })} className="btn btn--gold">{h.paths.teach.cta} <RiArrowRightLine aria-hidden="true" /></Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
