import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RiMailLine, RiPhoneLine, RiMapPinLine, RiArrowRightLine,
  RiInstagramLine, RiFacebookFill, RiLinkedinFill,
  RiCheckLine, RiErrorWarningLine, RiTimeLine, RiWhatsappLine,
  RiCustomerServiceLine,
} from 'react-icons/ri'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Accordion from '../components/Accordion'
import './Contact.css'

const faqs = [
  {
    q: 'How does the 5-step vetting process verify tutors?',
    a: 'Every educator undergoes a comprehensive funnel: (1) CNIC and identity verification, (2) academic credential audit with HEC attestation check, (3) a dynamic interview assessing communication skills and teaching methodology, (4) a curriculum-specific subject assessment with a minimum pass threshold of 85%, and (5) a supervised trial session with a real student. Only 8% of applicants are ultimately onboarded to the Tutorista platform.'
  },
  {
    q: 'How are session rates determined and displayed?',
    a: 'Rates are set by educators based on their experience level, subject complexity, and market benchmarks for their area. Tutorista ensures full price transparency. The rate displayed on a tutor\'s profile is the exact amount you pay per session. There are zero hidden agency markups, booking fees, or platform charges for students. Tutors pay a flat 15% service fee from their earnings.'
  },
  {
    q: 'Is there a minimum booking commitment or contract?',
    a: 'Absolutely not. Tutorista is built for maximum flexibility. You can book a single session for exam preparation, schedule weekly recurring sessions for long-term improvement, or book intensive daily slots for MDCAT/ECAT prep. You are only charged for the sessions you actually attend. Cancel any time with no penalties or lock-in periods.'
  },
  {
    q: 'What payment methods are supported in Pakistan?',
    a: 'We support EasyPaisa, JazzCash, all major Debit and Credit cards (Visa, Mastercard, UnionPay), and direct bank transfer. All transactions are escrow-protected, meaning the payment is held securely and only released to the tutor after the session is successfully completed and you confirm satisfaction. Refund requests are processed within 48 hours.'
  },
  {
    q: 'What subjects and curricula does Tutorista cover?',
    a: 'We cover all major Pakistani curricula including Cambridge O-Levels and A-Levels, Federal Board (FSc/FA), Punjab Board, Aga Khan Board, and university-level courses. Subjects range from STEM (Mathematics, Physics, Chemistry, Biology, Computer Science) to Humanities (English, Urdu, Islamiyat, Pakistan Studies) to test preparation (MDCAT, ECAT, GAT, SAT, IELTS).'
  },
  {
    q: 'How quickly can I get matched with a tutor?',
    a: 'Our AI matching engine processes your requirements (curriculum, subject, budget, location, and schedule preference) and presents verified tutor matches within an average of 15 minutes. You can review profiles, check reviews, compare rates, and book your first session all within the same hour. Most students complete their first session within 24 hours of signing up.'
  },
]

const contactInfo = [
  { icon: <RiMapPinLine />, label: 'Head Office', value: 'Floor 4, Arfa Software Technology Park, Ferozepur Road, Lahore 54600, Pakistan' },
  { icon: <RiMailLine />, label: 'Email', value: 'hello@tutorista.pk' },
  { icon: <RiPhoneLine />, label: 'Phone', value: '+92 (300) 123-4567' },
  { icon: <RiWhatsappLine />, label: 'WhatsApp Support', value: '+92 (300) 123-4567' },
  { icon: <RiTimeLine />, label: 'Response Time', value: 'Average 12 minutes during 9 AM - 9 PM PKT' },
]

export default function Contact() {
  useScrollReveal()
  const [formState, setFormState] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => setFormState('success'), 1500)
  }

  return (
    <div className="contact">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero__bg" />
        <div className="glow-orb" style={{ top: '10%', left: '-5%' }} />
        <div className="container reveal">
          <div className="contact-hero__content">
            <div className="chip mb-6"><RiCustomerServiceLine /> Talk to Our Team</div>
            <h1 className="display-hero text-white">Let's start a<br />conversation.</h1>
            <p className="body-lg text-white opacity-70 mt-6 max-w-600">
              Whether you are a parent looking for the right tutor, an educator wanting to 
              join our platform, or an institution exploring partnerships, we would love to 
              hear from you. Our Lahore-based team typically responds within 4 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT GRID ─── */}
      <section className="section bg-dots">
        <div className="container contact-grid">

          {/* Info Side */}
          <div className="contact-info reveal">
            <h2 className="heading-md mb-8">Get in Touch</h2>
            <div className="info-list">
              {contactInfo.map((item, i) => (
                <div key={i} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <strong className="info-label">{item.label}</strong>
                    <p className="info-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-block">
              <h3 className="info-label mb-4">Follow Our Journey</h3>
              <div className="social-links">
                <a href="#" className="social-btn" aria-label="LinkedIn"><RiLinkedinFill /></a>
                <a href="#" className="social-btn" aria-label="Instagram"><RiInstagramLine /></a>
                <a href="#" className="social-btn" aria-label="Facebook"><RiFacebookFill /></a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-wrap reveal reveal-d2">
            {formState === 'success' ? (
              <div className="form-success card">
                <RiCheckLine className="success-icon" />
                <h3 className="display-lg mb-4">Message Received.</h3>
                <p className="body-lg opacity-70 mb-8">
                  Thank you for reaching out. A member of our team will get back 
                  to you within 4 business hours. Check your email for a confirmation.
                </p>
                <button onClick={() => setFormState('idle')} className="btn btn--outline">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form card">
                <h3 className="heading-md mb-6">Send Us a Message</h3>
                <div className="form-row form-row--half">
                  <div className="input-group">
                    <label>Inquiry Type</label>
                    <select required>
                      <option value="">Select category...</option>
                      <option value="parent">Parent / Student Inquiry</option>
                      <option value="tutor">Educator Onboarding</option>
                      <option value="partner">Institutional Partnership</option>
                      <option value="press">Press & Media</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Ali Ahmed" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="name@email.com" required />
                  </div>
                </div>

                <div className="form-row form-row--half">
                  <div className="input-group">
                    <label>Phone (Optional)</label>
                    <input type="tel" placeholder="+92 300 1234567" />
                  </div>
                  <div className="input-group">
                    <label>Subject</label>
                    <input type="text" placeholder="Brief subject line" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Message</label>
                    <textarea rows="5" placeholder="Tell us about your requirements, questions, or how we can help..." required></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={formState === 'sending'}>
                  {formState === 'sending' ? 'Sending...' : 'Send Message'} <RiArrowRightLine />
                </button>

                <p className="form-footer">
                  <RiErrorWarningLine /> Your data is encrypted and transmitted securely.
                  We never share your information with third parties.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section bg-grey bg-grid">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-sidebar reveal">
              <div className="section-eyebrow">FAQ</div>
              <h2 className="display-lg section-title">Common questions,<br />clear answers.</h2>
              <p className="body-lg mb-8">
                Can't find what you're looking for? Our support team is available 
                on WhatsApp from 9 AM to 9 PM PKT, seven days a week.
              </p>
              <Link to="/contact" className="btn btn--primary">
                Chat on WhatsApp <RiWhatsappLine />
              </Link>
            </div>
            <div className="faq-content reveal reveal-d2">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
