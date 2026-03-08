import { Link } from 'react-router-dom'
import {
  RiArrowRightLine, RiCheckLine, RiUserSearchLine,
  RiPhoneCameraLine, RiWallet3Line, RiShieldCheckLine,
  RiStarFill, RiGroupLine, RiTimeLine, RiAwardLine,
  RiBookOpenLine, RiGlobalLine, RiFlashlightLine,
  RiAlarmWarningLine,
} from 'react-icons/ri'
import Marquee from '../components/Marquee'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Home.css'

const stats = [
  { num: '2,500+', label: 'Verified Educators', icon: <RiGroupLine /> },
  { num: '50+', label: 'Specialized Subjects', icon: <RiBookOpenLine /> },
  { num: '4.9/5', label: 'Average Rating', icon: <RiStarFill /> },
  { num: '15 min', label: 'Avg. Match Time', icon: <RiTimeLine /> },
]

const institutions = [
  { name: 'LUMS', full: 'Lahore University of Management Sciences' },
  { name: 'UET', full: 'University of Engineering and Technology' },
  { name: 'FAST-NUCES', full: 'National University of Computer and Emerging Sciences' },
  { name: 'GCU', full: 'Government College University' },
  { name: 'Punjab University', full: 'University of the Punjab' },
  { name: 'Kinnaird', full: 'Kinnaird College for Women' },
  { name: 'Aitchison', full: 'Aitchison College' },
  { name: 'LGS', full: 'Lahore Grammar School' },
  { name: 'Beaconhouse', full: 'Beaconhouse School System' },
  { name: 'FC College', full: 'Forman Christian College University' },
]

const process = [
  {
    step: '01',
    icon: <RiUserSearchLine />,
    title: 'Intelligent Matching',
    desc: 'Our proprietary algorithm analyzes your curriculum requirements, preferred schedule, budget range, and learning style to match you with the most suitable educator from our verified network of 2,500+ tutors across Lahore.',
  },
  {
    step: '02',
    icon: <RiPhoneCameraLine />,
    title: 'Hybrid Learning Sessions',
    desc: 'Choose between in-person tutoring sessions at your home in Gulberg, DHA, or Bahria Town, or access our browser-based HD virtual classroom with built-in whiteboard, screen sharing, and automatic session recording.',
  },
  {
    step: '03',
    icon: <RiWallet3Line />,
    title: 'Escrow-Protected Payments',
    desc: 'All payments are processed through our secure escrow system via EasyPaisa, JazzCash, or bank transfer. Funds are only released to the tutor after you confirm session completion and satisfaction.',
  },
]

const trustPoints = [
  { icon: <RiShieldCheckLine />, title: 'Background Verified', desc: 'Every educator passes a 5-step vetting: CNIC verification, degree attestation, subject testing, live interview, and trial session evaluation.' },
  { icon: <RiAwardLine />, title: 'Merit-Based Ranking', desc: 'Tutors are ranked by student reviews, session attendance rates, and assessment outcomes, not commissions paid. Transparent, fair, and accountable.' },
  { icon: <RiGlobalLine />, title: 'Built for Lahore', desc: 'Designed specifically for the Lahore education market, supporting O/A-Levels, FSc, MDCAT, ECAT, and university-level courses across all major boards.' },
]

const testimonials = [
  { name: 'Fatima Ahmed', role: 'Parent, DHA Phase 6', text: 'My daughter\'s Chemistry grades improved from C to A* in just three months. The tutor matching was instant and the quality of educators is outstanding. We cancelled our coaching centre subscription.', rating: 5 },
  { name: 'Hassan Raza', role: 'A-Level Student, Gulberg', text: 'The virtual classroom is incredibly smooth. I can review recorded sessions before exams which has been a game-changer. Way better than the coaching centres I was attending before.', rating: 5 },
  { name: 'Dr. Ayesha Khan', role: 'Tutor, Mathematics', text: 'As a tutor, I now earn 85% of my rate versus the 60% agencies were giving me. The platform handles scheduling, payments, and even generates my tax receipts automatically.', rating: 5 },
]

export default function Home() {
  useScrollReveal()

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="glow-orb" style={{ top: '-10%', left: '-5%' }} />

        <div className="container hero__inner reveal">
          <div className="hero__content">
            <div className="chip mb-6">
              <RiFlashlightLine /> Rated #1 Tutor Platform in Lahore
            </div>
            <h1 className="display-hero text-white">
              Pakistan's Leading<br />
              <span className="text-gold">EdTech Platform.</span>
            </h1>
            <p className="body-lg text-white opacity-70 hero__desc">
              Tutorista connects students with the top 1% of verified, background-checked 
              educators for O/A-Levels, FSc, MDCAT, ECAT and university courses. 
              Zero agency fees. Zero hidden markups. Pure merit-driven learning.
            </p>
            <div className="hero__actions">
              <Link to="/services" className="btn btn--gold btn--lg">
                Find Your Tutor <RiArrowRightLine />
              </Link>
              <Link to="/about" className="btn btn--outline-light btn--lg">
                How It Works
              </Link>
            </div>

            {/* Social Proof Strip */}
            <div className="hero__proof">
              <div className="proof-avatars">
                <span className="proof-av">FA</span>
                <span className="proof-av">HR</span>
                <span className="proof-av">AK</span>
                <span className="proof-av proof-av--more">+2K</span>
              </div>
              <div className="proof-text">
                <div className="proof-stars">
                  <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill />
                  <span>4.9/5</span>
                </div>
                <span className="proof-sub">from 2,500+ verified parent reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* TRUSTED BY INSTITUTIONS */}
      <section className="institutions-section">
        <div className="container">
          <p className="institutions-label">
            Trusted by students and educators from Lahore's top institutions
          </p>
          <div className="institutions-grid">
            {institutions.map((inst, i) => (
              <div key={i} className="institution-item" title={inst.full}>
                <span className="institution-name">{inst.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-section bg-grey">
        <div className="container">
          <div className="stats-grid reveal">
            {stats.map((s, i) => (
              <div key={i} className={`stat-item reveal-d${i+1}`}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section bg-grid">
        <div className="container">
          <div className="split-grid">
            <div className="reveal">
              <div className="section-eyebrow">The Problem</div>
              <h2 className="display-lg section-title">Traditional agencies are<br />costing you <span className="text-gold">40% more.</span></h2>
              <p className="body-lg section-subtitle mb-8">
                In Lahore's tuition market, traditional agencies charge families between 
                30-40% in hidden commissions to fund their overhead: expensive offices, 
                sales teams, and marketing budgets. Tutors receive only 60% of what parents pay. 
                Everyone loses except the middleman.
              </p>
              <ul className="check-list">
                <li><RiCheckLine className="check-icon" /> Live PKR rate transparency, see exactly what you pay</li>
                <li><RiCheckLine className="check-icon" /> Direct WhatsApp communication with your tutor</li>
                <li><RiCheckLine className="check-icon" /> Real-time credential verification via blockchain</li>
                <li><RiCheckLine className="check-icon" /> No lock-in contracts, cancel any time</li>
              </ul>
            </div>
            <div className="reveal reveal-d2">
              <div className="comparison-card card">
                <div className="compare-row compare-row--old">
                  <span className="compare-label">Traditional Agency</span>
                  <span className="compare-price compare-price--strike">Rs. 5,000/hr</span>
                </div>
                <div className="compare-divider" />
                <div className="compare-row compare-row--new">
                  <span className="compare-label">Tutorista Direct</span>
                  <span className="compare-price text-gold">Rs. 2,500/hr</span>
                </div>
                <div className="compare-savings">
                  <RiCheckLine /> You save <strong>Rs. 2,500</strong> every session
                </div>
                <p className="compare-note">Same quality, verified educators. No hidden markups. Transparent pricing from day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-dark">
        <div className="glow-orb" style={{ top: '20%', right: '-10%' }} />
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">How Tutorista Works</div>
            <h2 className="display-lg section-title">Three steps to better<br />education outcomes.</h2>
            <p className="body-lg section-subtitle mx-auto">
              From your first search to your first lesson, our streamlined process
              takes an average of just 15 minutes. Here is how it works.
            </p>
          </div>

          <div className="process-grid">
            {process.map((p, i) => (
              <div key={i} className={`process-card card card--dark reveal reveal-d${i+1}`}>
                <div className="process-step">{p.step}</div>
                <div className="process-icon">{p.icon}</div>
                <h3 className="heading-md text-white">{p.title}</h3>
                <p className="body-md mt-4">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="section bg-grid">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Why Families Trust Us</div>
            <h2 className="display-lg section-title">Built on transparency,<br />powered by merit.</h2>
            <p className="body-lg section-subtitle mx-auto">
              Every decision we make is driven by one question: does this benefit the student?
              Our vetting is rigorous, our pricing is transparent, and our platform is built locally for Lahore families.
            </p>
          </div>

          <div className="trust-grid">
            {trustPoints.map((t, i) => (
              <div key={i} className={`trust-card card reveal reveal-d${i+1}`}>
                <div className="trust-icon">{t.icon}</div>
                <h3 className="heading-sm">{t.title}</h3>
                <p className="body-md mt-2">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-grey">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Success Stories</div>
            <h2 className="display-lg section-title">Hear from our community.</h2>
            <p className="body-lg section-subtitle mx-auto">
              Real results from real families and educators across Lahore.
              Over 95% of our students report measurable grade improvements within 8 weeks.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card card reveal reveal-d${i+1}`}>
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <RiStarFill key={j} />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong className="testimonial-name">{t.name}</strong>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGENCY CTA */}
      <section className="section cta-section bg-dark">
        <div className="glow-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px' }} />
        <div className="container text-center reveal">
          <div className="urgency-badge mb-6">
            <RiAlarmWarningLine /> Limited: Only 47 MDCAT tutor slots left for 2025
          </div>
          <h2 className="display-lg section-title">Ready to transform your<br />child's education?</h2>
          <p className="body-lg section-subtitle mx-auto mb-8">
            Join 10,000+ families across Lahore who have already switched to direct, 
            merit-based education. Your first consultation is completely free.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--gold btn--lg">
              Start Free Consultation <RiArrowRightLine />
            </Link>
            <Link to="/services" className="btn btn--outline-light btn--lg">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
