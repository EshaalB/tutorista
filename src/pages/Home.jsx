import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiCheckLine,
  RiUserSearchLine,
  RiPhoneCameraLine,
  RiWallet3Line,
} from 'react-icons/ri'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Home.css'

export default function Home() {
  useScrollReveal()

  return (
    <div className="home home--premium">
      
      {/* ─── 01: HERO (STRIPE TIER) ─── */}
      <section className="hero parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920)' }}>
        <div className="hero__gradient" />
        <div className="container hero__inner reveal">
          <div className="hero__content">
            <span className="section-label text-white">The Future of Learning</span>
            <h1 className="display-xl hero__title text-white">
              The 1% Educators.<br />
              <span className="highlight-gold">Zero Agency Fees.</span>
            </h1>
            <p className="body-lg text-white opacity-80 hero__desc">
              Connect directly with verified tutors for O/A-Levels and Entry Tests. 
              We removed the middlemen in Lahore to put merit back in focus.
            </p>
            <div className="hero__actions">
              <Link to="/services" className="btn-yellow" data-tooltip="Explore our ecosystem">
                Find Tutors <RiArrowRightLine />
              </Link>
              <Link to="/about" className="btn-outline-white" data-tooltip="The engine under the hood">
                Methodology
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02: THE DISRUPTION ─── */}
      <section className="section disruption">
        <div className="container">
          <div className="disruption__grid">
            <div className="disruption__text reveal">
              <span className="section-label">Disrupting Lahore</span>
              <h2 className="display-lg">Stop paying for<br />expensive offices.</h2>
              <p className="body-lg">
                Traditional agencies charge 40% commissions to fund their overhead. 
                Tutorista connects you directly, ensuring educators earn more while parents pay less.
              </p>
              <ul className="disruption__list">
                <li><RiCheckLine className="check" /> Live PKR rate transparency</li>
                <li><RiCheckLine className="check" /> Direct WhatsApp communication</li>
                <li><RiCheckLine className="check" /> Real-time credential verification</li>
              </ul>
            </div>
            
            <div className="disruption__visual reveal reveal-delay-2">
              <div className="premium-card">
                <div className="card-header">
                  <span>Traditional Agency</span>
                  <span className="strike">Rs. 5,000/hr</span>
                </div>
                <div className="card-divider" />
                <div className="card-header highlight">
                  <span>Tutorista Direct</span>
                  <span className="text-gold">Rs. 2,500/hr</span>
                </div>
                <p className="card-footer-text">Pure merit. No hidden markups.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03: CONTINUOUS STORY PATH ─── */}
      <section className="section story bg-teal">
        <div className="container">
          <div className="story-path">
            <div className="story-line-vertical" />
            
            <div className="story-node reveal">
              <div className="node__icon-box"><RiUserSearchLine /></div>
              <div className="node__text">
                <h3 className="heading-md text-white">Intelligent Matching.</h3>
                <p className="body-lg text-white opacity-70">
                  Our algorithm filters thousands of tutors based on your specific curriculum and budget requirements.
                </p>
              </div>
            </div>

            <div className="story-node reveal">
              <div className="node__icon-box"><RiPhoneCameraLine /></div>
              <div className="node__text">
                <h3 className="heading-md text-white">Hybrid Interface.</h3>
                <p className="body-lg text-white opacity-70">
                  Switch between in-home sessions in Gulberg or remote HD learning via our built-in virtual classroom.
                </p>
              </div>
            </div>

            <div className="story-node reveal">
              <div className="node__icon-box"><RiWallet3Line /></div>
              <div className="node__text">
                <h3 className="heading-md text-white">Secured Payouts.</h3>
                <p className="body-lg text-white opacity-70">
                  Escrow-protected payments via EasyPaisa or JazzCash. Only pay when you are 100% satisfied with the lesson.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04: METRICS ─── */}
      <section className="section border-bottom">
        <div className="container metrics-grid reveal">
          <div className="metric-item">
            <div className="m-num">50+</div>
            <div className="m-label">Specialized Subjects</div>
          </div>
          <div className="metric-item">
            <div className="m-num">2k+</div>
            <div className="m-label">Verified Educators</div>
          </div>
          <div className="metric-item">
            <div className="m-num">4.9/5</div>
            <div className="m-label">User Satisfaction</div>
          </div>
        </div>
      </section>

      {/* ─── 05: GLOBAL CALL TO ACTION ─── */}
      <section className="section cta-banner">
        <div className="container text-center reveal">
          <h2 className="display-xl mb-4">Elevate your potential.</h2>
          <p className="body-lg mb-8 opacity-70">Join the thousands of families in Lahore choosing direct education.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="btn-primary" data-tooltip="Immediate matching">
              Get Started <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

