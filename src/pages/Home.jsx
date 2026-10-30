import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import { catalog, requestLink } from '../content/site'
import { PhotoTile, Wave } from '../components/Motifs'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

const steps = [
  { title: 'Tell us what you need', desc: 'Subject, level, goals and the times that work. Online or at your home in Lahore.' },
  { title: 'Choose your tutor', desc: 'We shortlist vetted tutors who teach your exact syllabus. You see their rate before you book.' },
  { title: 'Learn one-to-one', desc: 'Book single sessions or a weekly slot. You pay per session, with no contract to sign.' },
]

const vetting = [
  'Identity checked against CNIC',
  'Degrees and certificates verified',
  'Subject test for every subject they teach',
  'Interview on how they explain, not just what they know',
  'A supervised trial lesson before going live',
]

function SubjectFinder() {
  const [active, setActive] = useState(catalog[0].id)
  const group = catalog.find(c => c.id === active)

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const i = (catalog.findIndex(c => c.id === active) + step + catalog.length) % catalog.length
    setActive(catalog[i].id)
    document.getElementById(`tab-${catalog[i].id}`)?.focus()
  }

  return (
    <section className="section section--ink finder" aria-labelledby="finder-title">
      <div className="container">
        <div className="finder__head">
          <h2 id="finder-title" className="t-title">What are you studying?</h2>
          <p>Pick a subject and we will start your request with it filled in.</p>
        </div>
        <div className="finder__tabs" role="tablist" aria-label="Level" onKeyDown={onKeyDown}>
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
              {c.label}
            </button>
          ))}
        </div>
        <div id="finder-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <ul className="finder__chips">
            {group.subjects.map(s => (
              <li key={s}>
                <Link className="chip" to={requestLink({ level: group.label, subject: s })}>{s}</Link>
              </li>
            ))}
            <li><Link className="chip chip--other" to="/contact">Something else</Link></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useScrollReveal()
  usePageMeta(null)

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">One-to-one tutoring in Lahore</p>
            <h1 className="t-display">
              Find a tutor who makes it <span className="mark"><strong>make sense</strong></span>
            </h1>
            <p className="t-lead hero__lead">
              O and A Levels, Matric, FSc and entry tests. Tell us the subject and schedule and
              we match you with a vetted tutor, online or at your home.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn--primary">Find a tutor <RiArrowRightLine aria-hidden="true" /></Link>
              <Link to="/services" className="btn btn--ghost">How it works</Link>
            </div>
            <ul className="hero__notes">
              <li><RiCheckLine aria-hidden="true" /> Free to request</li>
              <li><RiCheckLine aria-hidden="true" /> Pay per session</li>
              <li><RiCheckLine aria-hidden="true" /> No contract</li>
            </ul>
          </div>

          <div className="hero__art" aria-hidden="true">
            <span className="dot hero__dot hero__dot--gold" />
            <span className="dot hero__dot hero__dot--teal" />
            <span className="dot hero__dot hero__dot--coral" />
            <span className="hero__sun" />
            <PhotoTile src="/img/study-group-sq.webp" shape="circle" priority sizes="(max-width: 560px) 31vw, (max-width: 960px) 210px, 250px" />
            <PhotoTile src="/img/online-learner-sq.webp" shape="leaf" sizes="(max-width: 560px) 31vw, (max-width: 960px) 210px, 250px" />
            <PhotoTile src="/img/classroom-sq.webp" shape="quarter" sizes="(max-width: 560px) 31vw, (max-width: 960px) 210px, 250px" />
            <PhotoTile src="/img/young-learner-sq.webp" shape="arch" sizes="(max-width: 560px) 31vw, (max-width: 960px) 210px, 250px" />
            <div className="hero__ticket">
              <span className="hero__ticket-label">New request</span>
              <strong>O Level Physics</strong>
              <span>Online · Tue &amp; Thu evenings</span>
            </div>
          </div>
        </div>
      </section>

      <SubjectFinder />

      <section className="section steps">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How it works</p>
            <h2 className="t-title">From request to first lesson in three steps</h2>
          </div>
          <ol className="steps__list">
            {steps.map((s, i) => (
              <li key={s.title} className={`steps__item reveal`} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className={`steps__num steps__num--${i + 1}`} aria-hidden="true">{i + 1}</span>
                <h3 className="t-sub">{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
          <Link to="/services" className="link-arrow">Read the full process <RiArrowRightLine aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section section--tint vet">
        <div className="container vet__grid">
          <div className="vet__art reveal">
            <PhotoTile src="/img/classroom.webp" shape="arch" alt="A tutor helping students with their work in a classroom" size={800} small={480} sizes="(max-width: 960px) 90vw, 460px" />
            <span className="dot vet__dot" />
          </div>
          <div className="reveal">
            <p className="eyebrow">Who teaches</p>
            <h2 className="t-title">Every tutor is checked before they teach a single lesson</h2>
            <p className="t-lead vet__lead">You are letting someone into your home or your child's screen. We take that seriously.</p>
            <ol className="vet__list">
              {vetting.map((v, i) => (
                <li key={v}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{v}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section paths">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Two ways in</p>
            <h2 className="t-title">Are you looking for a tutor, or are you one?</h2>
          </div>
          <div className="paths__grid">
            <article className="path path--learn reveal">
              <PhotoTile src="/img/young-learner.webp" shape="leaf" size={800} small={480} sizes="(max-width: 960px) 90vw, 540px" />
              <div className="path__body">
                <h3 className="t-sub">Students and parents</h3>
                <ul className="list-check">
                  <li><RiCheckLine aria-hidden="true" />Tutors matched to your board and syllabus</li>
                  <li><RiCheckLine aria-hidden="true" />See the rate before you book, nothing added on top</li>
                  <li><RiCheckLine aria-hidden="true" />Online, or at home in Lahore</li>
                </ul>
                <Link to="/contact" className="btn btn--dark">Request a tutor</Link>
              </div>
            </article>
            <article className="path path--teach reveal">
              <PhotoTile src="/img/focused-writing.webp" shape="quarter" size={800} small={480} sizes="(max-width: 960px) 90vw, 540px" />
              <div className="path__body">
                <h3 className="t-sub">Tutors</h3>
                <ul className="list-check">
                  <li><RiCheckLine aria-hidden="true" />Keep 85% of what you charge</li>
                  <li><RiCheckLine aria-hidden="true" />Set your own rate and hours</li>
                  <li><RiCheckLine aria-hidden="true" />Students who want your subject, sent to you</li>
                </ul>
                <Link to={requestLink({ role: 'tutor' })} className="btn btn--primary">Apply to teach</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta__panel reveal">
            <div>
              <h2 className="t-title">Tell us what you're studying</h2>
              <p>It takes two minutes. We reply by email with tutors who fit.</p>
            </div>
            <Link to="/contact" className="btn btn--primary">Start a request <RiArrowRightLine aria-hidden="true" /></Link>
            <Wave className="cta__wave" />
          </div>
        </div>
      </section>
    </>
  )
}
