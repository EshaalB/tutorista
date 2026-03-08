import { Link } from 'react-router-dom'
import {
  RiArrowRightLine, RiUserSearchLine, RiVideoLine,
  RiCheckLine, RiCheckboxCircleLine
} from 'react-icons/ri'
import Marquee from '../components/Marquee'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Services.css'

const capabilities = [
  {
    icon: <RiUserSearchLine />,
    title: 'Matching Engine',
    desc: 'Proprietary matching connects students based on curriculum, grade, and budget. No generic results.',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    points: ['Curriculum-specific filtering', 'Verified rate comparisons', 'Instant session booking'],
    tag: 'Platform',
  },
  {
    icon: <RiVideoLine />,
    title: 'Virtual Classroom',
    desc: 'Infrastructure built for learning. Browser-native HD video, whiteboard, and record keeping.',
    img: 'https://images.unsplash.com/photo-1577891721396-8979b6013871?auto=format&fit=crop&q=80&w=800',
    points: ['Ultra-low latency HD video', 'Collaborative Whiteboard', 'Auto-archived sessions'],
    tag: 'Infrastructure',
  },
]

export default function Services() {
  useScrollReveal()

  return (
    <div className="services services--premium">
      
      {/* ─── 01: HERO (SHARP) ─── */}
      <section className="services-hero parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920)' }}>
        <div className="hero-overlay" />
        <div className="container services-hero-inner reveal">
          <div className="hero-box">
            <span className="section-label text-white">Capabilities</span>
            <h1 className="display-xl text-white">
              The Learning<br />
              <span className="highlight-gold">Infrastructure.</span>
            </h1>
            <p className="body-lg text-white opacity-70 mt-6">
              A unified suite of tools designed to remove friction from the education lifecycle. 
              Verified educators, secured payments, and world-class classrooms.
            </p>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ─── 02: CAPABILITIES (FLAT ASYMMETRIC) ─── */}
      <section className="section platform-capabilities">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="display-lg">Built for precision.</h2>
            <p className="body-lg mt-4 opacity-70">
              We engineer solutions that let tutors and students focus entirely on the curriculum.
            </p>
          </div>

          <div className="capabilities-list">
            {capabilities.map((s, i) => (
              <div key={i} className={`capability-row reveal ${i % 2 !== 0 ? 'capability-row--reverse' : ''}`}>
                <div className="cap-text">
                  <div className="cap-tag">{s.tag}</div>
                  <h3 className="heading-md">{s.title}</h3>
                  <p className="body-lg cap-desc">{s.desc}</p>
                  <ul className="cap-points">
                    {s.points.map((p, j) => (
                      <li key={j}><RiCheckboxCircleLine className="check-icon" /> {p}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-outline" data-tooltip="Explore tech">
                    View Specs <RiArrowRightLine />
                  </Link>
                </div>
                <div className="cap-visual border-sharp">
                  <img src={s.img} alt={s.title} className="cap-img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03: ECONOMICS (TRANSPARENCY GRID) ─── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="section-header reveal text-center">
            <span className="section-label">Economics</span>
            <h2 className="display-lg">Transparency by design.</h2>
            <p className="body-lg mt-4 max-w-600 mx-auto opacity-70">
              We fund our infrastructure via a flat 15% commission. Students pay the exact tutor rate. Zero hidden markups.
            </p>
          </div>
          
          <div className="pricing-layout">
            
            {/* Student Side */}
            <div className="tier-box border-sharp reveal">
              <div className="tier-header">
                <div className="tier-label">Parents & Students</div>
                <h3 className="tier-title">Learn Direct</h3>
                <div className="tier-price">PKR 0</div>
                <p className="body-lg opacity-70 mt-4">Browse and book verified tutors for free. You only pay for the sessions you take.</p>
              </div>
              <ul className="tier-list">
                <li><RiCheckLine /> Instant Matching</li>
                <li><RiCheckLine /> Verified Credentials</li>
                <li><RiCheckLine /> EasyPaisa & Cards</li>
                <li><RiCheckLine /> Session Archiving</li>
              </ul>
              <div className="tier-footer">
                <Link to="/contact" className="btn-outline w-full" data-tooltip="Book tutor">
                  Join as Student
                </Link>
              </div>
            </div>

            {/* Tutor Side */}
            <div className="tier-box tier-box--dark border-sharp reveal reveal-delay-2">
              <div className="tier-header">
                <div className="tier-label highlight-gold">Educators</div>
                <h3 className="tier-title text-white">Scale Impact</h3>
                <div className="tier-price">15% <span className="text-sm">/ session</span></div>
                <p className="body-lg text-white opacity-70 mt-4">Keep 85% of your earnings. Far better than the 40% cut taken by opaque agencies.</p>
              </div>
              <ul className="tier-list text-white opacity-90">
                <li><RiCheckLine /> Global Ranking</li>
                <li><RiCheckLine /> Virtual Classroom</li>
                <li><RiCheckLine /> Payout Automation</li>
                <li><RiCheckLine /> Verified Badge</li>
              </ul>
              <div className="tier-footer">
                <Link to="/contact" className="btn-yellow w-full" data-tooltip="Apply now">
                  Apply to Teach
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

