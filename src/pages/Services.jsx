import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiCheckLine, RiComputerLine, RiHome4Line } from 'react-icons/ri'
import Accordion from '../components/Accordion'
import { catalog, requestLink } from '../content/site'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import './Services.css'

const journey = [
  { title: 'Send a request', desc: 'Tell us the subject, level, board, goals and when you are free. Parents can request for their child, students can request for themselves.' },
  { title: 'Get a shortlist', desc: 'We reply with tutors who teach that syllabus and have time in your schedule, with each tutor’s rate shown up front.' },
  { title: 'Book a first lesson', desc: 'Pick a tutor and book one session. If it clicks, set up a regular slot. If not, tell us and we suggest someone else.' },
  { title: 'Keep going at your pace', desc: 'Book single sessions before an exam or a weekly slot for the whole year. You pay for the sessions you take.' },
]

const checks = [
  { title: 'Identity', desc: 'CNIC checked against the person who turns up to teach.' },
  { title: 'Qualifications', desc: 'Degrees and certificates verified, not taken on trust.' },
  { title: 'Subject test', desc: 'A written test in every subject and level they want to teach.' },
  { title: 'Interview', desc: 'We look at how clearly they explain, not only what they know.' },
  { title: 'Trial lesson', desc: 'A supervised lesson with a real student before they go live.' },
]

const faqs = [
  { q: 'How much does a tutor cost?', a: 'Tutors set their own rates based on their experience, the subject and the level. You see the rate before you book and nothing is added on top for students. Tutors pay a 15% service fee out of their earnings.' },
  { q: 'Do I have to commit to a number of sessions?', a: 'No. Book one session before an exam, a weekly slot for the year, or anything in between. There is no contract and you can stop at any time.' },
  { q: 'Are lessons online or at home?', a: 'Both. Online lessons work from anywhere with a stable connection. Home lessons are available across Lahore, depending on which tutors cover your area.' },
  { q: 'How do I pay?', a: 'EasyPaisa, JazzCash, debit or credit card, or bank transfer. You pay per session.' },
  { q: 'What if the tutor is not the right fit?', a: 'Tell us after any lesson and we will suggest another tutor. Finding the right person sometimes takes a second try, and that is fine.' },
  { q: 'Can I teach with Tutorista?', a: 'Yes, if you can pass the five checks above. Send an application through the contact form and choose “I want to teach”.' },
]

export default function Services() {
  useScrollReveal()
  usePageMeta('How it works', 'How Tutorista matches students in Lahore with vetted one-to-one tutors: the process, how tutors are checked, subjects, pricing and FAQs.')

  return (
    <>
      <section className="how-hero">
        <div className="container how-hero__grid">
          <div>
            <p className="eyebrow">How it works</p>
            <h1 className="t-display">Simple to start, <span className="mark">easy to stop</span></h1>
          </div>
          <div className="how-hero__side">
            <p className="t-lead">
              No sign-up fee, no package to buy, no contract. You tell us what you need, we find tutors who fit,
              and you only pay for the lessons you take.
            </p>
            <nav className="how-hero__toc" aria-label="On this page">
              <a href="#process">Process</a>
              <a href="#vetting">Tutor checks</a>
              <a href="#subjects">Subjects</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQs</a>
            </nav>
          </div>
        </div>
      </section>

      <section id="process" className="section journey">
        <div className="container journey__grid">
          <div className="journey__aside">
            <h2 className="t-title">The process</h2>
            <p className="t-lead">Most of it happens over email. You will never be asked to pay before you have chosen a tutor.</p>
            <Link to="/contact" className="btn btn--primary">Start a request <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
          <ol className="journey__list">
            {journey.map((j, i) => (
              <li key={j.title} className="journey__step reveal">
                <span className="journey__num" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="t-sub">{j.title}</h3>
                  <p>{j.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint formats">
        <div className="container">
          <h2 className="t-title formats__title reveal">Two ways to learn</h2>
          <div className="formats__grid">
            <div className="format reveal">
              <RiComputerLine className="format__icon" aria-hidden="true" />
              <h3 className="t-sub">Online</h3>
              <p>Live video lessons from home, school or a hostel room. Useful for late evenings and for subjects where the best tutor lives across town.</p>
            </div>
            <div className="format reveal">
              <RiHome4Line className="format__icon" aria-hidden="true" />
              <h3 className="t-sub">At home</h3>
              <p>The tutor comes to you, anywhere in Lahore that our tutors cover. Good for younger students and for parents who want to be close by.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="vetting" className="section section--ink checks">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Tutor checks</p>
            <h2 className="t-title">Five checks before anyone teaches</h2>
            <p className="t-lead checks__lead">Every tutor goes through the same steps, whatever their degree or experience.</p>
          </div>
          <ol className="checks__row">
            {checks.map((c, i) => (
              <li key={c.title} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span aria-hidden="true">{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="subjects" className="section subjects">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="t-title">Subjects</h2>
            <p className="t-lead">Pick one to start a request. Don’t see yours? Ask anyway, we may have a tutor for it.</p>
          </div>
          <div className="subjects__grid">
            {catalog.map(c => (
              <div key={c.id} className="subjects__group reveal">
                <h3>{c.label}</h3>
                <p className="t-small">{c.blurb}</p>
                <ul>
                  {c.subjects.map(s => (
                    <li key={s}><Link to={requestLink({ level: c.label, subject: s })}>{s}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section section--tint pricing">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="t-title">What it costs</h2>
            <p className="t-lead">One rule: the rate you see is the rate you pay.</p>
          </div>
          <div className="pricing__grid">
            <div className="price reveal">
              <p className="price__who">Students and parents</p>
              <p className="price__amount">Free <span>to request and to book</span></p>
              <ul className="list-check">
                <li><RiCheckLine aria-hidden="true" />Pay the tutor’s listed session rate</li>
                <li><RiCheckLine aria-hidden="true" />No booking fee, no markup</li>
                <li><RiCheckLine aria-hidden="true" />EasyPaisa, JazzCash, card or bank transfer</li>
              </ul>
              <Link to="/contact" className="btn btn--dark">Request a tutor</Link>
            </div>
            <div className="price price--tutor reveal">
              <p className="price__who">Tutors</p>
              <p className="price__amount">15% <span>service fee per session</span></p>
              <ul className="list-check">
                <li><RiCheckLine aria-hidden="true" />Keep 85% of your rate</li>
                <li><RiCheckLine aria-hidden="true" />Set your own rate and hours</li>
                <li><RiCheckLine aria-hidden="true" />No fee to apply</li>
              </ul>
              <Link to={requestLink({ role: 'tutor' })} className="btn btn--primary">Apply to teach</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq">
        <div className="container faq__grid">
          <div>
            <h2 className="t-title">Questions parents ask</h2>
            <p className="t-lead faq__lead">Something else on your mind? <Link to="/contact" className="faq__link">Ask us directly</Link>.</p>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  )
}
