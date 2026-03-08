import { Link } from 'react-router-dom'
import {
  RiArrowRightLine, RiLightbulbLine, RiRocketLine,
  RiShieldCheckLine, RiGlobalLine, RiLinkedinFill, RiMailLine,
  RiCheckLine, RiTimeLine, RiTeamLine, RiHeartLine,
} from 'react-icons/ri'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

const founders = [
  {
    img: '/founders/eshaal.png',
    name: 'Eshaal Rehmatullah',
    role: 'Chief Executive Officer',
    desc: 'Former educational consultant with 5+ years driving transparency in the Lahore private tuition market. Eshaal leads Tutorista\'s mission to build a merit-first educator marketplace.',
    featured: true,
  },
  {
    img: '/founders/asad.png',
    name: 'Asad Usman',
    role: 'Chief Technology Officer',
    desc: 'Computer Science graduate specializing in distributed systems. Asad architects the virtual classroom, matching engine, and payment infrastructure.',
  },
  {
    img: '/founders/ali.png',
    name: 'Ali Mahoon',
    role: 'Head of Growth',
    desc: 'Growth strategist focused on scaling educational access across Punjab. Ali leads partnerships with schools and educational NGOs.',
  },
  {
    img: '/founders/eesha.png',
    name: 'Eesha Irfan',
    role: 'Head of Operations',
    desc: 'Operations specialist who designed our rigorous 5-step vetting funnel. Eesha ensures only the top 1% of educators are onboarded.',
  },
]

const pillars = [
  { icon: <RiLightbulbLine />, title: 'Merit-First Philosophy', desc: 'Educators are ranked by student outcomes, session attendance rates, and verified reviews, not by the commission they pay. This ensures the best tutors rise to the top, not the wealthiest.' },
  { icon: <RiShieldCheckLine />, title: 'Rigorous Vetting', desc: 'Every tutor undergoes CNIC verification, degree attestation from HEC, a live subject-specific assessment, a dynamic interview, and a supervised trial session. Acceptance rate: 8%.' },
  { icon: <RiRocketLine />, title: 'Scale-Ready Infrastructure', desc: 'Our platform is built to handle 100,000+ concurrent sessions with enterprise-grade security, 99.9% uptime SLA, and automatic failover. No downtime during exam season.' },
  { icon: <RiGlobalLine />, title: 'Deeply Local, Globally Inspired', desc: 'Built specifically for the Pakistani education system, supporting all local boards, curricula, and payment methods, while drawing on best practices from global EdTech leaders.' },
]

const milestones = [
  { year: '2024', title: 'Founded in Lahore', desc: 'Tutorista was founded by four LUMS graduates with a shared frustration: why do tuition agencies charge 40% and deliver 0% transparency?' },
  { year: '2024', title: 'First 100 Tutors Onboarded', desc: 'Launched our vetting pipeline and onboarded our first 100 verified educators across Mathematics, Physics, Chemistry, and English.' },
  { year: '2025', title: 'Virtual Classroom Goes Live', desc: 'Released our browser-based virtual classroom with HD video, collaborative whiteboard, and automatic session recording, built for Pakistani internet conditions.' },
  { year: '2025', title: '10,000 Families Served', desc: 'Crossed the milestone of 10,000 registered families across Lahore, with a 95% satisfaction rate and average grade improvement of 1.5 letter grades.' },
]

export default function About() {
  useScrollReveal()

  const ceo = founders[0]
  const team = founders.slice(1)

  return (
    <div className="about">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="glow-orb" style={{ top: '20%', left: '-5%' }} />
        <div className="container about-hero__inner reveal">
          <div className="hero-content">
            <div className="chip chip--on-dark mb-6"><RiHeartLine /> Our Mission</div>
            <h1 className="display-hero text-white">
              Democratizing Quality<br />
              <span className="text-gold">Education in Lahore.</span>
            </h1>
            <p className="body-lg text-white opacity-70 mt-6 max-w-600">
              We started Tutorista because we believe every student in Lahore deserves 
              access to a world-class educator, regardless of their family's ability 
              to pay a 40% agency commission. Our platform removes the middlemen and puts 
              merit back at the centre of private education.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section bg-dots">
        <div className="container">
          <div className="split-about">
            <div className="reveal">
              <div className="section-eyebrow">Our Story</div>
              <h2 className="display-lg section-title">Born from frustration,<br />built with purpose.</h2>
              <p className="body-lg mb-6">
                In 2024, four graduates from the Lahore University of Management Sciences (LUMS) 
                set out to solve a problem they had experienced firsthand as students and later 
                as tutors: Pakistan's private tuition industry is broken.
              </p>
              <p className="body-lg mb-8">
                Traditional agencies charge families 30-40% in hidden commissions, offer zero 
                transparency into tutor qualifications, and provide no accountability for learning 
                outcomes. Tutors, meanwhile, receive only 60% of what parents pay. We built 
                Tutorista to fix this, a technology-first platform where quality is verified, 
                pricing is transparent, and everyone wins.
              </p>
              <div className="about-metrics">
                <div className="about-metric">
                  <div className="about-metric__num">10K+</div>
                  <div className="about-metric__label">Families Served</div>
                </div>
                <div className="about-metric">
                  <div className="about-metric__num">2.5K+</div>
                  <div className="about-metric__label">Verified Tutors</div>
                </div>
                <div className="about-metric">
                  <div className="about-metric__num">95%</div>
                  <div className="about-metric__label">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="about-visual reveal reveal-d2">
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" alt="Tutorista team collaborating at Arfa Technology Park" />
              <div className="visual-label">
                <RiGlobalLine /> Arfa Technology Park, Lahore
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section bg-grey bg-grid">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Our Journey</div>
            <h2 className="display-lg section-title">Key milestones in our<br />growth story.</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item reveal reveal-d${(i % 4) + 1}`}>
                <div className="timeline-marker" />
                <div className="timeline-content card">
                  <div className="chip chip--gold mb-4">{m.year}</div>
                  <h3 className="heading-sm mb-2">{m.title}</h3>
                  <p className="body-md">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section bg-dark">
        <div className="glow-orb" style={{ bottom: '10%', right: '-5%' }} />
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Our Principles</div>
            <h2 className="display-lg section-title">The engineering framework<br />behind Tutorista.</h2>
            <p className="body-lg section-subtitle mx-auto">
              Every feature we build, every tutor we onboard, and every decision we make 
              is guided by these four non-negotiable principles.
            </p>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className={`pillar-card card card--dark reveal reveal-d${i+1}`}>
                <div className="pillar-icon">{p.icon}</div>
                <h3 className="heading-sm text-white mb-2">{p.title}</h3>
                <p className="body-md">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section bg-grid">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="section-eyebrow">Leadership</div>
            <h2 className="display-lg section-title">Meet the team building<br />Tutorista.</h2>
            <p className="body-lg section-subtitle mx-auto">
              A small team of passionate builders, educators, and operators 
              working from Arfa Technology Park in Lahore. We believe technology 
              should serve education, not the other way around.
            </p>
          </div>

          {/* CEO - Full Width Featured Card */}
          <div className="founder-ceo-card card reveal">
            <div className="founder-ceo-img-wrap">
              <img src={ceo.img} alt={ceo.name} className="founder-ceo-img" />
            </div>
            <div className="founder-ceo-info">
              <div className="founder-role-chip">{ceo.role}</div>
              <h4 className="founder-name founder-name--lg">{ceo.name}</h4>
              <p className="body-lg">{ceo.desc}</p>
              <div className="founder-links mt-6">
                <a href="#" className="founder-btn" aria-label="LinkedIn"><RiLinkedinFill /></a>
                <a href="#" className="founder-btn" aria-label="Email"><RiMailLine /></a>
              </div>
            </div>
          </div>

          {/* Team - 3 Vertical Portrait Cards */}
          <div className="founders-grid">
            {team.map((f, i) => (
              <div key={i} className={`founder-card card reveal reveal-d${i+1}`}>
                <div className="founder-img-wrap">
                  <img src={f.img} alt={f.name} className="founder-img" />
                </div>
                <div className="founder-card-body">
                  <div className="founder-role-chip">{f.role}</div>
                  <h4 className="founder-name">{f.name}</h4>
                  <p className="body-md">{f.desc}</p>
                  <div className="founder-links mt-4">
                    <a href="#" className="founder-btn" aria-label="LinkedIn"><RiLinkedinFill /></a>
                    <a href="#" className="founder-btn" aria-label="Email"><RiMailLine /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-grey">
        <div className="container text-center reveal">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Careers</div>
          <h2 className="display-lg section-title">Join our mission.</h2>
          <p className="body-lg section-subtitle mx-auto mb-8">
            We are always looking for talented engineers, designers, educators, and operators 
            who are passionate about transforming education in Pakistan. 
            Remote-friendly with offices at Arfa Technology Park.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--gold btn--lg">
              View Open Positions <RiArrowRightLine />
            </Link>
            <Link to="/contact" className="btn btn--outline btn--lg">
              General Inquiry
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
