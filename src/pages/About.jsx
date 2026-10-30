import { Link } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { PhotoTile } from '../components/Motifs'
import { requestLink } from '../content/site'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './About.css'

const team = [
  { img: '/founders/eshaal.webp', name: 'Eshaal Rehmatullah', role: 'Chief Executive Officer', focus: 'Sets direction and keeps the focus on families and tutors.', shape: 'circle' },
  { img: '/founders/asad.webp', name: 'Asad Usman', role: 'Chief Technology Officer', focus: 'Builds the tools behind matching, booking and payments.', shape: 'leaf' },
  { img: '/founders/ali.webp', name: 'Ali Mahoon', role: 'Head of Growth', focus: 'Works with schools and communities across Punjab.', shape: 'arch' },
  { img: '/founders/eesha.webp', name: 'Eesha Irfan', role: 'Head of Operations', focus: 'Runs the tutor checks and keeps them consistent.', shape: 'quarter' },
]

const principles = [
  { title: 'Merit decides who rises', desc: 'Tutors are recommended for how well they teach and how reliably they show up, not for what they pay us.' },
  { title: 'Checked, every time', desc: 'The same five checks for every tutor, whoever they are and whoever they know.' },
  { title: 'Made for Pakistani syllabuses', desc: 'Cambridge, Punjab and Federal Board, and the entry tests that come after them.' },
  { title: 'Prices in the open', desc: 'Families see the tutor’s rate. Tutors know exactly what we keep. No one is surprised later.' },
]

export default function About() {
  useScrollReveal()
  usePageMeta('About us', 'Why Tutorista exists, what we believe about tutoring in Lahore, and the team building it.')

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow">About Tutorista</p>
          <h1 className="t-display about-hero__title">
            Finding a good tutor in Lahore shouldn’t depend on <span className="mark">who you know</span>
          </h1>
          <div className="about-hero__cols">
            <p className="t-lead">
              Most families find tutors through a cousin, a neighbour or an agency. Word of mouth is hit and miss,
              and agencies often take a large cut while telling parents very little about who is actually teaching.
            </p>
            <p className="t-lead">
              Tutorista is our answer: tutors who have been properly checked, rates that are shown up front,
              and a tutor’s reputation built on how well they teach.
            </p>
          </div>
        </div>
      </section>

      <section className="section principles">
        <div className="container principles__grid">
          <h2 className="t-title principles__title">What we hold ourselves to</h2>
          <ol className="principles__list">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal">
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-sub">{p.title}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint team">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">The team</p>
            <h2 className="t-title">The people building Tutorista</h2>
          </div>
          <ul className="team__grid">
            {team.map(m => (
              <li key={m.name} className="team__card reveal">
                <PhotoTile src={m.img} shape={m.shape} alt={`Portrait of ${m.name}`} size={520} sizes="(max-width: 960px) 45vw, 270px" />
                <h3>{m.name}</h3>
                <p className="team__role">{m.role}</p>
                <p className="team__focus">{m.focus}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container about-cta__inner reveal">
          <h2 className="t-title">Teach with us, or work with us</h2>
          <p className="t-lead">Tutors can apply through our request form. For partnerships or anything else, write to us and a founder will reply.</p>
          <div className="about-cta__actions">
            <Link to={requestLink({ role: 'tutor' })} className="btn btn--primary">Apply to teach <RiArrowRightLine aria-hidden="true" /></Link>
            <Link to={requestLink({ role: 'other' })} className="btn btn--ghost">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
