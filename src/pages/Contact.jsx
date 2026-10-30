import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RiArrowRightLine, RiMailSendLine } from 'react-icons/ri'
import { site, catalog } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './Contact.css'

const roles = [
  { id: 'parent', label: 'I’m a parent' },
  { id: 'student', label: 'I’m a student' },
  { id: 'tutor', label: 'I want to teach' },
  { id: 'other', label: 'Something else' },
]

const subjectOptions = [...new Set(catalog.flatMap(c => c.subjects))]

function buildEmail(role, data) {
  const lines = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)
  const subject = role === 'tutor'
    ? `Tutor application: ${data.Name}`
    : role === 'other'
      ? `Message from ${data.Name}`
      : `Tutor request: ${[data.Level, data.Subject].filter(Boolean).join(' ')}`
  return { subject, body: lines.join('\n') }
}

// Remount when the query changes so menu links can re-prefill an open form.
export default function ContactRoute() {
  const [params] = useSearchParams()
  return <Contact key={params.toString()} params={params} />
}

function Contact({ params }) {
  const initialRole = roles.some(r => r.id === params.get('role')) ? params.get('role') : 'parent'
  const [role, setRole] = useState(initialRole)
  const [sent, setSent] = useState(null)
  const isLearner = role === 'parent' || role === 'student'

  usePageMeta(
    role === 'tutor' ? 'Apply to teach' : 'Request a tutor',
    'Tell Tutorista what you need and we will reply with vetted tutors in Lahore who fit your subject, level and schedule.'
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k) => (f.get(k) || '').toString().trim()
    const data = {
      'I am': roles.find(r => r.id === role).label.replace('I’m ', '').replace('I want to ', 'Wants to '),
      Name: get('name'),
      Email: get('email'),
      Phone: get('phone'),
      ...(isLearner && { Level: get('level'), Subject: get('subject'), Format: get('format'), Area: get('area') }),
      ...(role === 'tutor' && { 'Subjects taught': get('teaches'), Qualifications: get('qualifications') }),
      Message: get('message'),
    }
    const { subject, body } = buildEmail(role, data)
    setSent({ subject, body })
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="request">
      <div className="container request__grid">
        <div className="request__intro">
          <p className="eyebrow">{role === 'tutor' ? 'Apply to teach' : 'Request a tutor'}</p>
          <h1 className="t-title">
            {role === 'tutor' ? 'Tell us what you teach' : role === 'other' ? 'Write to us' : 'Tell us what you need'}
          </h1>
          <p className="t-lead">
            {role === 'tutor'
              ? 'We will reply with the next step in our checks.'
              : 'A few details now saves a lot of back and forth later.'}
          </p>
        </div>

        <div className="request__card">
          {sent ? (
            <div className="request__sent" role="status">
              <RiMailSendLine className="request__sent-icon" aria-hidden="true" />
              <h2 className="t-sub">Your email is ready to send</h2>
              <p>Your email app should have opened with everything filled in. Press send there and we will take it from here.</p>
              <p>If nothing opened, copy the text below and email it to <a className="request__mail" href={`mailto:${site.email}`}>{site.email}</a>.</p>
              <pre className="request__summary">{`Subject: ${sent.subject}\n\n${sent.body}`}</pre>
              <button className="btn btn--ghost" onClick={() => setSent(null)}>Edit my details</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              <fieldset className="form__roles">
                <legend className="form__label">Who is this for?</legend>
                <div className="form__seg">
                  {roles.map(r => (
                    <label key={r.id}>
                      <input type="radio" name="role" value={r.id} checked={role === r.id} onChange={() => setRole(r.id)} />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="name" className="form__label">{role === 'parent' ? 'Your name' : 'Name'}</label>
                  <input id="name" name="name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="email" className="form__label">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>

              {isLearner && (
                <>
                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="level" className="form__label">Level</label>
                      <select id="level" name="level" defaultValue={params.get('level') || ''} required>
                        <option value="" disabled>Choose a level</option>
                        {catalog.map(c => <option key={c.id}>{c.label}</option>)}
                        <option>University</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="subject" className="form__label">Subject</label>
                      <input id="subject" name="subject" list="subject-list" defaultValue={params.get('subject') || ''} required />
                      <datalist id="subject-list">
                        {subjectOptions.map(s => <option key={s} value={s} />)}
                      </datalist>
                    </div>
                  </div>

                  <fieldset className="field">
                    <legend className="form__label">Where should lessons happen?</legend>
                    <div className="form__seg form__seg--sm">
                      {['Online', 'At home', 'Either'].map((v, i) => (
                        <label key={v}>
                          <input type="radio" name="format" value={v} defaultChecked={i === 2} />
                          <span>{v}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="area" className="form__label">Area in Lahore <span>optional</span></label>
                      <input id="area" name="area" placeholder="e.g. Johar Town" />
                    </div>
                    <div className="field">
                      <label htmlFor="phone" className="form__label">Phone or WhatsApp <span>optional</span></label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
                    </div>
                  </div>
                </>
              )}

              {role === 'tutor' && (
                <>
                  <div className="field">
                    <label htmlFor="teaches" className="form__label">Subjects and levels you teach</label>
                    <input id="teaches" name="teaches" placeholder="e.g. A Level Chemistry, FSc Biology" required />
                  </div>
                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="qualifications" className="form__label">Highest qualification</label>
                      <input id="qualifications" name="qualifications" required />
                    </div>
                    <div className="field">
                      <label htmlFor="phone" className="form__label">Phone or WhatsApp <span>optional</span></label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
                    </div>
                  </div>
                </>
              )}

              <div className="field">
                <label htmlFor="message" className="form__label">
                  {role === 'other' ? 'Message' : <>Anything else? <span>optional</span></>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required={role === 'other'}
                  placeholder={isLearner ? 'Exam date, topics you are stuck on, days and times that suit you' : ''}
                />
              </div>

              <button type="submit" className="btn btn--dark btn--block">
                {role === 'tutor' ? 'Send application' : role === 'other' ? 'Send message' : 'Send request'} <RiArrowRightLine aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
        <div className="request__aside">
          <ol className="request__next">
            <li><span><strong>You send this form.</strong> It opens as an email from your own address.</span></li>
            <li><span><strong>We reply by email</strong> {role === 'tutor' ? 'to arrange your subject test and interview.' : 'with tutors who fit, and their rates.'}</span></li>
            <li><span><strong>You decide.</strong> Nothing is booked or charged until you say so.</span></li>
          </ol>
          <p className="t-small">Prefer plain email? <a className="request__mail" href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
      </div>
    </section>
  )
}
