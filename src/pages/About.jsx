import { Link } from 'react-router-dom'
import {
  RiArrowRightLine, RiLightbulbLine, RiRocketLine,
  RiShieldCheckLine, RiGlobalLine, RiLinkedinFill, RiDownloadLine,
} from 'react-icons/ri'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

const founders = [
  {
    initials: 'ER',
    name: 'Eshaal Rehmatullah',
    role: 'Chief Executive',
    desc: 'Brings structural transparency to the Lahore tuition market. Focused on merit-first educator ranking.',
    featured: true,
  },
  {
    initials: 'AU',
    name: 'Asad Usman',
    role: 'Technology Lead',
    desc: 'Architect behind our low-latency virtual classroom and intelligent matching algorithms.',
  },
  {
    initials: 'AM',
    name: 'Ali Mahoon',
    role: 'Growth Strategy',
    desc: 'Scaled Tutorista to 2k+ tutors across DHA, Gulberg, and Model Town in 12 months.',
  },
  {
    initials: 'EI',
    name: 'Eesha Irfan',
    role: 'Operations Lead',
    desc: 'Manages the 5-step vetting funnel. Ensuring every tutor meets our 1% quality bar.',
  },
]

const pillars = [
  { icon: <RiLightbulbLine />, title: 'Merit First', desc: 'Ranking by ability, not commission.' },
  { icon: <RiShieldCheckLine />, title: 'Vetted 1%', desc: 'Credentials verified at source.' },
  { icon: <RiRocketLine />, title: 'Scale Ready', desc: 'Enterprise-grade HD infrastructure.' },
  { icon: <RiGlobalLine />, title: 'Deeply Local', desc: 'Built by and for the Lahore community.' },
]

export default function About() {
  useScrollReveal()

  return (
    <div className="about about--premium">
      
      {/* ─── 01: HERO (NARRATIVE) ─── */}
      <section className="about-hero parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920)' }}>
        <div className="hero-overlay" />
        <div className="container about-hero-inner reveal">
          <div className="hero-box">
            <span className="section-label text-white">The Mission</span>
            <h1 className="display-xl text-white">
              Democratizing<br />
              <span className="highlight-gold">Education.</span>
            </h1>
            <p className="body-lg text-white opacity-70 mt-6">
              Founded in Lahore to bridge the gap between world-class educators and ambitious students. 
              We are stripping away the middlemen to put merit back in focus.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 02: DUALITY SPLIT ─── */}
      <section className="section duality">
        <div className="container masonry-split">
          <div className="ms-text reveal">
            <span className="section-label">Our Vision</span>
            <h2 className="display-lg">A transparent ecosystem.</h2>
            <p className="body-lg">
              We empower tutors to scale their impact while providing parents with verifiable proof of quality. 
              No opaque agencies. No hidden fees. Just results.
            </p>
          </div>
          <div className="ms-visual reveal reveal-delay-2">
            <div className="visual-frame border-sharp">
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000" alt="Team" />
              <div className="visual-tag bg-teal text-gold">Lahore HQ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03: PILLARS (STRIPE TIER GRID) ─── */}
      <section className="section bg-teal">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="display-lg text-white">The Engineering<br />Framework.</h2>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className="pillar-tile reveal">
                <div className="pillar-icon">{p.icon}</div>
                <h3 className="heading-md text-white">{p.title}</h3>
                <p className="body-lg text-white opacity-60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04: ASYMMETRIC LEADERSHIP ─── */}
      <section className="section leadership">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Leadership</span>
            <h2 className="display-lg">The Founders.</h2>
          </div>
          
          <div className="founders-layout">
            {founders.map((f, i) => (
              <div key={i} className={`founder-card border-sharp ${f.featured ? 'founder--featured' : ''} reveal`}>
                <div className="founder-top">
                  <div className="founder-avatar">{f.initials}</div>
                  <div className="founder-links">
                    <a href="#" className="founder-btn" data-tooltip="Profile"><RiLinkedinFill /></a>
                    <a href="#" className="founder-btn" data-tooltip="Credentials"><RiDownloadLine /></a>
                  </div>
                </div>
                <div className="founder-body">
                  <h4 className="founder-name">{f.name}</h4>
                  <div className="founder-role">{f.role}</div>
                  <p className="body-lg opacity-70">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05: CAREERS CTA ─── */}
      <section className="section border-top">
        <div className="container text-center reveal">
          <h2 className="display-lg mb-4">Join our mission.</h2>
          <p className="body-lg mb-8 opacity-70">We are always looking for engineering and operational talent in Lahore.</p>
          <Link to="/contact" className="btn-primary" data-tooltip="Open Roles">
            View Careers <RiArrowRightLine />
          </Link>
        </div>
      </section>

    </div>
  )
}

