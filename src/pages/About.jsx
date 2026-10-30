import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { PhotoTile } from '../components/Motifs'
import { requestLink } from '../content/site'
import { useLang } from '../i18n'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './About.css'

const team = [
  { id: 'eshaal', name: 'Eshaal Rehmatullah' },
  { id: 'asad', name: 'Asad Usman' },
  { id: 'ali', name: 'Ali Mahoon' },
  { id: 'eesha', name: 'Eesha Irfan' },
]

export default function About() {
  const { t, lang } = useLang()
  const a = t.about
  const scope = useRef(null)
  usePageMeta(t.meta.about)
  usePageMotion(scope, lang)

  return (
    <div ref={scope}>
      <section className="about-hero">
        <div className="container">
          <p className="kicker">{a.hero.kicker}</p>
          <h1 className="t-display about-hero__title" data-split="hero">
            {a.hero.titleA} <em>{a.hero.titleB}</em>
          </h1>
          <div className="about-hero__cols">
            <p className="t-lead">{a.hero.p1}</p>
            <p className="t-lead">{a.hero.p2}</p>
          </div>
        </div>
      </section>

      <section className="section section--cream story">
        <div className="container story__grid">
          <PhotoTile src="/img/classroom.webp" frame="page" alt={a.story.alt} size={800} small={480} sizes="(max-width: 960px) 90vw, 480px" className="story__media" data-mask />
          <div>
            <p className="kicker">{a.story.kicker}</p>
            <h2 className="t-title" data-split="">{a.story.title}</h2>
            <p className="t-lead story__body">{a.story.body}</p>
          </div>
        </div>
      </section>

      <section className="section principles">
        <div className="container principles__grid">
          <h2 className="t-title principles__title" data-split="">{a.principles.title}</h2>
          <ol className="principles__list">
            {a.principles.items.map((p, i) => (
              <li key={p.title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-sub">{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--cream team">
        <div className="container">
          <div className="section-head">
            <p className="kicker">{a.team.kicker}</p>
            <h2 className="t-title" data-split="">{a.team.title}</h2>
          </div>
          <ul className="team__grid">
            {team.map(m => (
              <li key={m.id} className="team__card" data-reveal>
                <PhotoTile src={`/founders/${m.id}.webp`} frame="card" alt={m.name} size={520} sizes="(max-width: 960px) 45vw, 270px" className="zoom" />
                <h3 dir="ltr">{m.name}</h3>
                <p className="team__role">{a.team.members[m.id].role}</p>
                <p className="team__focus">{a.team.members[m.id].focus}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container about-cta__inner">
          <h2 className="t-title" data-split="">{a.cta.title}</h2>
          <p className="t-lead">{a.cta.lead}</p>
          <div className="about-cta__actions">
            <Link to={requestLink({ role: 'tutor' })} className="btn btn--primary">{a.cta.teach} <RiArrowRightLine aria-hidden="true" /></Link>
            <Link to={requestLink({ role: 'other' })} className="btn btn--ghost">{a.cta.touch}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
