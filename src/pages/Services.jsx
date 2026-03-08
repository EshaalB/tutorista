import { Link } from 'react-router-dom'
import {
  RiArrowRightLine, RiUserSearchLine, RiVideoLine,
  RiCheckboxCircleLine, RiCheckLine, RiSparklingLine,
  RiShieldCheckLine, RiCustomerServiceLine, RiBarChartBoxLine,
} from 'react-icons/ri'
import Marquee from '../components/Marquee'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Services.css'

const capabilities = [
  {
    icon: <RiUserSearchLine />,
    title: 'AI-Powered Matching Engine',
    desc: 'Our proprietary algorithm processes 15+ parameters, including curriculum type, subject specialization, budget range, location preference, and learning style, to find your ideal educator match in under 15 minutes. Unlike generic platforms, Tutorista is built specifically for the Pakistani education system.',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    points: ['O/A-Level, FSc, MDCAT, ECAT curriculum filtering', 'Real-time rate comparison across 2,500+ tutors', 'Instant session booking with WhatsApp confirmation'],
    tag: 'Core Platform',
  },
  {
    icon: <RiVideoLine />,
    title: 'Enterprise Virtual Classroom',
    desc: 'Purpose-built learning infrastructure that runs entirely in-browser. No downloads, no plugins. Features HD video with adaptive bitrate for Pakistani internet conditions, a collaborative digital whiteboard with LaTeX support, and automatic session recording for revision before exams.',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    points: ['Ultra-low latency HD video (under 100ms)', 'Collaborative whiteboard with equation editor', 'Auto-archived sessions accessible for 90 days'],
    tag: 'Infrastructure',
  },
]

const addons = [
  { icon: <RiSparklingLine />, title: 'Progress Analytics', desc: 'Parents receive weekly reports with attendance, assessment scores, and tutor feedback. Data-driven insights to track your child\'s academic trajectory.' },
  { icon: <RiShieldCheckLine />, title: 'SafeGuard Protocol', desc: 'All sessions are monitored with AI-powered content moderation. Background checks are refreshed every 6 months. Your child\'s safety is non-negotiable.' },
  { icon: <RiCustomerServiceLine />, title: 'Dedicated Support', desc: 'Every family gets a dedicated education consultant. Available on WhatsApp, phone, and email. Average response time: 12 minutes during business hours.' },
  { icon: <RiBarChartBoxLine />, title: 'Performance Guarantee', desc: 'If your child does not show measurable improvement within 60 days, we will rematch you with a new tutor at no additional cost. Results or your money back.' },
]

export default function Services() {
  useScrollReveal()

  return (
    <div className="services">

      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero__bg" />
        <div className="glow-orb" style={{ top: '15%', left: '-5%' }} />
        <div className="container services-hero__inner reveal">
          <div className="hero-content">
            <div className="chip mb-6"><RiSparklingLine /> Platform Capabilities</div>
            <h1 className="display-hero text-white">
              The Complete Learning<br />
              <span className="text-gold">Infrastructure.</span>
            </h1>
            <p className="body-lg text-white opacity-70 mt-6 max-w-600">
              A unified suite of tools designed to remove every friction point from the 
              education lifecycle, from finding a tutor, to attending sessions, 
              to processing secure payments. Everything your family needs, in one platform.
            </p>
            <div className="mt-8" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn--gold btn--lg">
                Get Started Free <RiArrowRightLine />
              </Link>
              <Link to="/about" className="btn btn--outline-light btn--lg">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* CORE CAPABILITIES */}
      <section className="section bg-dots">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Core Services</div>
            <h2 className="display-lg section-title">Engineered for educational<br />excellence.</h2>
            <p className="body-lg section-subtitle mx-auto">
              We do not just connect tutors with students. We have built the entire technology 
              stack that powers modern private education in Lahore, from the matching algorithm 
              to the virtual classroom infrastructure.
            </p>
          </div>

          <div className="capabilities-list">
            {capabilities.map((s, i) => (
              <div key={i} className={`capability-row reveal ${i % 2 !== 0 ? 'capability-row--reverse' : ''}`}>
                <div className="cap-text">
                  <div className="chip chip--gold mb-4">{s.tag}</div>
                  <h3 className="heading-md mb-4">{s.title}</h3>
                  <p className="body-lg cap-desc">{s.desc}</p>
                  <ul className="cap-points">
                    {s.points.map((p, j) => (
                      <li key={j}><RiCheckboxCircleLine className="cap-check" /> {p}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn--outline">
                    Learn More <RiArrowRightLine />
                  </Link>
                </div>
                <div className="cap-visual">
                  <img src={s.img} alt={s.title} className="cap-img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS WE COVER */}
      <section className="section bg-grey">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Subject Coverage</div>
            <h2 className="display-lg section-title">50+ subjects across<br />every major curriculum.</h2>
            <p className="body-lg section-subtitle mx-auto">
              From Cambridge O/A-Levels to Punjab Board FSc, from MDCAT prep to 
              university-level engineering courses. Whatever your child needs, we 
              have a verified specialist for it.
            </p>
          </div>
          <div className="subjects-grid reveal">
            <div className="subject-item"><span className="subject-cat">STEM</span><span className="subject-name">Mathematics</span></div>
            <div className="subject-item"><span className="subject-cat">STEM</span><span className="subject-name">Physics</span></div>
            <div className="subject-item"><span className="subject-cat">STEM</span><span className="subject-name">Chemistry</span></div>
            <div className="subject-item"><span className="subject-cat">STEM</span><span className="subject-name">Biology</span></div>
            <div className="subject-item"><span className="subject-cat">STEM</span><span className="subject-name">Computer Science</span></div>
            <div className="subject-item"><span className="subject-cat">Humanities</span><span className="subject-name">English Literature</span></div>
            <div className="subject-item"><span className="subject-cat">Humanities</span><span className="subject-name">Urdu</span></div>
            <div className="subject-item"><span className="subject-cat">Humanities</span><span className="subject-name">Pakistan Studies</span></div>
            <div className="subject-item"><span className="subject-cat">Humanities</span><span className="subject-name">Islamiyat</span></div>
            <div className="subject-item"><span className="subject-cat">Test Prep</span><span className="subject-name">MDCAT</span></div>
            <div className="subject-item"><span className="subject-cat">Test Prep</span><span className="subject-name">ECAT</span></div>
            <div className="subject-item"><span className="subject-cat">Test Prep</span><span className="subject-name">IELTS / SAT</span></div>
          </div>
        </div>
      </section>

      {/* VALUE ADDS */}
      <section className="section bg-grey bg-grid">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Beyond Tutoring</div>
            <h2 className="display-lg section-title">Everything you need,<br />nothing you don't.</h2>
            <p className="body-lg section-subtitle mx-auto">
              Every feature on Tutorista exists because a real parent, student, or tutor in Lahore 
              asked for it. No bloat. No gimmicks. Just the tools that actually move the needle on 
              academic performance.
            </p>
          </div>
          <div className="addons-grid">
            {addons.map((a, i) => (
              <div key={i} className={`addon-card card reveal reveal-d${i+1}`}>
                <div className="addon-icon">{a.icon}</div>
                <h3 className="heading-sm mb-2">{a.title}</h3>
                <p className="body-md">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section bg-dark">
        <div className="glow-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px' }} />
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Simple Pricing</div>
            <h2 className="display-lg section-title">Transparency by design.</h2>
            <p className="body-lg section-subtitle mx-auto">
              We fund our infrastructure via a flat 15% service fee on tutor earnings. 
              Students pay the exact tutor rate, zero hidden markups, zero surprise charges. 
              The rate you see is the rate you pay.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card card reveal">
              <div className="pricing-header">
                <div className="chip mb-4">For Students and Parents</div>
                <h3 className="pricing-plan">Learn Direct</h3>
                <div className="pricing-amount">Free</div>
                <p className="body-md mt-4">Browse, compare, and book verified tutors at zero platform cost. You only pay the tutor's session rate.</p>
              </div>
              <ul className="pricing-features">
                <li><RiCheckLine /> Instant intelligent matching</li>
                <li><RiCheckLine /> Verified credential access</li>
                <li><RiCheckLine /> EasyPaisa, JazzCash and Cards</li>
                <li><RiCheckLine /> 90-day session archive</li>
                <li><RiCheckLine /> Weekly progress reports</li>
                <li><RiCheckLine /> Dedicated education consultant</li>
              </ul>
              <Link to="/contact" className="btn btn--outline btn--full">Join as Student</Link>
            </div>

            <div className="pricing-card card card--dark pricing-card--featured reveal reveal-d2">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <div className="chip chip--gold mb-4">For Educators</div>
                <h3 className="pricing-plan text-white">Scale Impact</h3>
                <div className="pricing-amount text-gold">15% <span className="pricing-period">/ session</span></div>
                <p className="body-md mt-4">Keep 85% of your earnings, far better than the 40% cut taken by traditional agencies. Grow your teaching practice with our technology.</p>
              </div>
              <ul className="pricing-features">
                <li><RiCheckLine /> Performance-based ranking</li>
                <li><RiCheckLine /> Enterprise virtual classroom</li>
                <li><RiCheckLine /> Automated payout processing</li>
                <li><RiCheckLine /> Verified educator badge</li>
                <li><RiCheckLine /> Marketing and student pipeline</li>
                <li><RiCheckLine /> Dedicated account manager</li>
              </ul>
              <Link to="/contact" className="btn btn--gold btn--full">Apply to Teach</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
