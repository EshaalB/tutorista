import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiPauseFill, RiPlayFill, RiPlayCircleLine, RiDoubleQuotesL } from 'react-icons/ri'
import { useLang } from '../i18n'
import { useMotionAllowed } from '../a11y'
import TactileHighlight from '../components/ui/tactile-highlight'
import LogoMarquee from '../components/LogoMarquee'
import DragScroller from '../components/DragScroller'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

// Full-bleed classroom footage behind the hero. Poster only under Lite mode,
// reduced motion or Save-Data; always pausable.
function HeroVideo({ label }) {
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
        data-parallax="0.25"
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
      <div className="vhero__media">
        <button type="button" className="vhero__toggle" onClick={toggle} aria-label={playing ? t.video.pause : t.video.play}>
          {playing ? <RiPauseFill aria-hidden="true" /> : <RiPlayFill aria-hidden="true" />}
        </button>
      </div>
    </>
  )
}

// Every story section opens the same way: a small label, then one statement.
function SectionIntro({ id, label, title, light = false }) {
  return (
    <div className={`intro ${light ? 'intro--light' : ''}`}>
      <p className="intro__label">{label}</p>
      <h2 id={id} className="intro__title">{title}</h2>
    </div>
  )
}

function Journey({ data }) {
  return (
    <section className="journey-map" aria-labelledby="journey-title">
      <div className="container">
        <SectionIntro id="journey-title" label={data.label} title={data.title} light />
        <div className="journey-map__track" data-journey>
          <span className="journey-map__rail" aria-hidden="true" />
          <ol className="journey-map__list">
            {data.steps.map((s, i) => (
              <li key={s.pill} className={`jstep jstep--${i % 2 ? 'up' : 'down'}`}>
                <span className="jstep__pill">{s.pill}</span>
                <span className="jstep__line" aria-hidden="true" />
                <div className={`jstep__card jstep__card--${s.tone}`}>
                  <p className="jstep__head">{s.head}</p>
                  <p className="jstep__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Why({ data }) {
  const [active, setActive] = useState(0)
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container">
        <SectionIntro id="why-title" label={data.label} title={data.title} />
      </div>
      <div className="container why__grid">
        <div className="why__deck" aria-hidden="true">
          {data.items.map((item, i) => {
            const offset = (i - active + data.items.length) % data.items.length
            return (
              <img
                key={item.img}
                src={item.img}
                alt=""
                width="800"
                height="600"
                loading="lazy"
                className="why__card"
                style={{ '--o': offset, zIndex: data.items.length - offset }}
              />
            )
          })}
        </div>
        <div className="why__text">
          <DragScroller label={data.hint} dragLabel={data.drag} onActiveChange={setActive} className="why__track">
            {data.items.map((item, i) => (
              <article key={item.title} className={`why__col ${i === active ? 'is-active' : ''}`}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </DragScroller>
        </div>
      </div>
    </section>
  )
}

// Questions families raise before starting, each answered plainly. Real, consented
// testimonials can replace these later using the same cards.
function Testimonials({ data }) {
  return (
    <section className="section testimonials" aria-labelledby="tm-title">
      <div className="container">
        <SectionIntro id="tm-title" label={data.label} title={data.title} />
      </div>
      <div className="testimonials__rail">
        <DragScroller label={data.label} dragLabel={data.drag} className="testimonials__track">
          {data.items.map((item, i) => (
            <figure key={item.quote} className={`tcard tcard--${i % 5}`}>
              <RiDoubleQuotesL className="tcard__mark" aria-hidden="true" />
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <span className="tcard__tag">{item.tag}</span>
                <p>{item.answer}</p>
              </figcaption>
            </figure>
          ))}
        </DragScroller>
      </div>
      <div className="container">
        <Link to="/services#faq" className="link-arrow testimonials__more">{data.more} <RiArrowRightLine aria-hidden="true" /></Link>
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
      <section className="vhero">
        <HeroVideo label={h.hero.videoAlt} />
        <div className="vhero__shade" aria-hidden="true" />
        <div className="container vhero__inner">
          <div className="vhero__grid">
            <div className="vhero__main">
              <h1 className="vhero__title">
                <span>{h.hero.titleA}</span>
                <span className="vhero__title-gold">{h.hero.titleB}</span>
              </h1>
              <p className="vhero__lead">{h.hero.lead}</p>
              <div className="vhero__actions">
                <Link to="/contact" className="btn btn--gold">{h.hero.cta} <RiArrowRightLine aria-hidden="true" /></Link>
                <Link to="/services" className="btn vhero__ghost"><RiPlayCircleLine aria-hidden="true" /> {h.hero.secondary}</Link>
              </div>
            </div>
          </div>
          <dl className="vhero__stats">
            {h.hero.stats.map(s => (
              <div key={s.label}>
                <dt>{s.num}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <LogoMarquee />

      <section className="section who">
        <div className="container who__grid">
          <p className="intro__label">{h.about.label}</p>
          <p className="who__text" data-reveal>
            {h.about.before} <TactileHighlight direction="left" delay={0.2}>{h.about.em}</TactileHighlight> {h.about.after}
          </p>
        </div>
      </section>

      <Journey data={h.journey} />
      <Why data={h.why} />
      <Testimonials data={h.testimonials} />

    </div>
  )
}
