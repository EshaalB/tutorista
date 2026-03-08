import { useState } from 'react'
import {
  RiMailLine, RiPhoneLine, RiMapPinLine, RiArrowRightLine,
  RiInstagramLine, RiFacebookFill, RiLinkedinFill,
  RiCheckLine, RiErrorWarningLine,
} from 'react-icons/ri'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Accordion from '../components/Accordion'
import './Contact.css'

const faqs = [
  {
    q: 'How does the vetting process verify tutors?',
    a: 'Every educator undergoes a 5-step funnel: ID verification, academic credential audit, a dynamic interview, curriculum-specific testing, and a trial session evaluation. Only the top 1% are onboarded.'
  },
  {
    q: 'How are session rates determined?',
    a: 'Rates are set by educators based on their experience and the subject complexity. Tutorista ensures full transparency—the rate you see is the rate you pay. No hidden agency markups.'
  },
  {
    q: 'Is there a minimum booking commitment?',
    a: 'No. Tutorista is built for flexibility. You can book a single session for exam prep or schedule recurring mentorship. You are only charged for the hours booked.'
  },
  {
    q: 'What payment methods are supported in Pakistan?',
    a: 'We support EasyPaisa, JazzCash, and all major Debit/Credit cards. All transactions are escrow-protected, meaning the payout is only released to the tutor after the session is successfully completed.'
  }
]

export default function Contact() {
  useScrollReveal()
  const [formState, setFormState] = useState('idle') // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => setFormState('success'), 1500)
  }

  return (
    <div className="contact contact--premium">
      
      {/* ─── 01: HERO (SHARP) ─── */}
      <section className="contact-hero">
        <div className="container reveal">
          <div className="hero-box">
            <span className="section-label">Connect</span>
            <h1 className="display-xl">Get in touch.</h1>
            <p className="body-lg mt-4 opacity-70 max-w-600">
              For institutional inquiries, partnership proposals, or tutor support. 
              Our Lahore response team typicaly replies within 4 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 02: SPLIT LAYOUT ─── */}
      <section className="section contact-main">
        <div className="container contact-grid">
          
          {/* Info Side */}
          <div className="contact-info reveal">
            <div className="info-block">
              <h2 className="heading-md mb-8">Lahore HQ</h2>
              <div className="info-item">
                <RiMapPinLine className="info-icon" />
                <div className="info-text">
                  <strong>Office</strong>
                  <p>Floor 4, Arfa Software Technology Park, Ferozepur Road, Lahore</p>
                </div>
              </div>
              <div className="info-item">
                <RiMailLine className="info-icon" />
                <div className="info-text">
                  <strong>Email</strong>
                  <p>inquiry@tutorista.com</p>
                </div>
              </div>
              <div className="info-item">
                <RiPhoneLine className="info-icon" />
                <div className="info-text">
                  <strong>Support</strong>
                  <p>+92 (300) 123 4567</p>
                </div>
              </div>
            </div>

            <div className="social-block">
              <h3 className="section-label mb-4">Ecosystem</h3>
              <div className="social-links">
                <a href="#" className="social-btn"><RiLinkedinFill /></a>
                <a href="#" className="social-btn"><RiInstagramLine /></a>
                <a href="#" className="social-btn"><RiFacebookFill /></a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-box reveal reveal-delay-2">
            {formState === 'success' ? (
              <div className="form-success border-sharp">
                <RiCheckLine className="success-icon" />
                <h3 className="display-lg">Message Received.</h3>
                <p className="body-lg opacity-70">A representative from Tutorista will reach out shortly.</p>
                <button onClick={() => setFormState('idle')} className="btn-outline mt-8">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-group grid-2">
                  <div className="input-wrap">
                    <label>Inquiry Type</label>
                    <select required>
                      <option value="">Select Category</option>
                      <option value="parent">Parent/Student Inquiries</option>
                      <option value="tutor">Educator Onboarding</option>
                      <option value="partner">Institutional Partnerships</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>
                  <div className="input-wrap">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Ali Ahmed" required />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrap">
                    <label>Business Email</label>
                    <input type="email" placeholder="name@company.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrap">
                    <label>Message</label>
                    <textarea rows="6" placeholder="Briefly describe your requirements..." required></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={formState === 'sending'}>
                  {formState === 'sending' ? 'Transmitting...' : 'Send Inquiry'} <RiArrowRightLine />
                </button>

                <p className="form-note">
                  <RiErrorWarningLine /> Securely transmitted via Tutorista Protocol.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ─── 03: FAQ SECTION (ACCORDION) ─── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="faq-header reveal mb-16">
            <span className="section-label">Support</span>
            <h2 className="display-lg">Technical & Operational FAQs.</h2>
          </div>
          <div className="faq-content-wrap reveal reveal-delay-2">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

    </div>
  )
}

