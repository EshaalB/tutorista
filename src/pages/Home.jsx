import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiPauseFill, RiPlayFill, RiPlayCircleLine, RiDoubleQuotesL } from 'react-icons/ri'
import { useLang } from '../i18n'
import { useMotionAllowed } from '../a11y'
import TactileHighlight from '../components/ui/tactile-highlight'
import LogoMarquee from '../components/LogoMarquee'
import DragScroller from '../components/DragScroller'
import Accordion from '../components/Accordion'
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

function Journey({ data }) {
  return (
    <section className="journey-map" aria-labelledby="journey-title">
      <div className="container">
        <h2 id="journey-title" className="t-title">{data.title}</h2>
        <ol className="journey-map__list">
          {data.steps.map((s, i) => (
            <li key={s.pill} className={`jstep jstep--${i % 2 ? 'up' : 'down'}`} data-reveal>
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
    </section>
  )
}

function Why({ data }) {
  const [active, setActive] = useState(0)
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container why__grid">
        <div className="why__deck" aria-hidden="true" data-parallax="-0.08">
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
          <h2 id="why-title" className="why__label">{data.label}</h2>
          <DragScroller label={data.hint} dragLabel={data.drag} onActiveChange={setActive} className="why__track">
            {data.items.map((item, i) => (
              <article key={item.title} className={`why__col ${i === active ? 'is-active' : ''}`}>
                <p className="why__letter">{String.fromCharCode(65 + i)}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </DragScroller>
          <p className="t-small why__hint">{data.hint}</p>
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
        <h2 id="tm-title" className="testimonials__label">{data.label}</h2>
      </div>
      <div className="testimonials__rail">
        <DragScroller label={data.label} dragLabel={data.drag} className="testimonials__track">
          {data.items.map((item, i) => (
            <figure key={item.quote} className={`tcard tcard--${i % 5}`}>
              <div className="tcard__top">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <RiDoubleQuotesL aria-hidden="true" />
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <span className="tcard__tag">{item.tag}</span>
                <p>{item.answer}</p>
              </figcaption>
            </figure>
          ))}
        </DragScroller>
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
          <p className="who__label">{h.about.label}</p>
          <p className="who__text" data-reveal>
            {h.about.before} <TactileHighlight direction="left" delay={0.2}>{h.about.em}</TactileHighlight> {h.about.after}
          </p>
        </div>
      </section>

      <Journey data={h.journey} />
      <Why data={h.why} />
      <Testimonials data={h.testimonials} />

      <section className="section faqs" aria-labelledby="faq-title">
        <div className="container faqs__inner">
          <h2 id="faq-title" className="t-title">{h.faq.title}</h2>
          <Accordion items={t.how.faq.items} numbered />
          <Link to="/contact" className="link-arrow faqs__more">{t.how.faq.link} <RiArrowRightLine aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  )
}
