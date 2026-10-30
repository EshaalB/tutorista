import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { RiArrowRightLine, RiMailSendLine } from 'react-icons/ri'
import { site, catalog, subjectInfo } from '../content/site'
import { useLang, dictionaries } from '../i18n'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Contact.css'

const roleIds = ['parent', 'student', 'tutor', 'other']
const subjectOptions = Object.keys(subjectInfo)
const en = dictionaries.en

// The email always goes out in English so the team reads every request the same way.
function buildEmail(role, d) {
  const rows = [
    ['I am', en.contact.roles[role]],
    ['Name', d.name], ['Email', d.email], ['Phone', d.phone],
    ['Level', d.level && (en.levels[d.level]?.label ?? en.levels[d.level])], ['Subject', d.subject],
    ['Format', d.format && en.contact.labels.formats[d.format]], ['Area', d.area],
    ['Subjects taught', d.teaches], ['Qualifications', d.qualifications],
    ['Message', d.message],
  ].filter(([, v]) => v)
  const subject = role === 'tutor' ? `Tutor application: ${d.name}`
    : role === 'other' ? `Message from ${d.name}`
      : `Tutor request: ${[rows.find(r => r[0] === 'Level')?.[1], d.subject].filter(Boolean).join(' ')}`
  return { subject, body: rows.map(([k, v]) => `${k}: ${v}`).join('\n') }
}

// Remount when the query changes so menu links can re-prefill an open form.
export default function ContactRoute() {
  const [params] = useSearchParams()
  return <Contact key={params.toString()} params={params} />
}

function Contact({ params }) {
  const { t, lang } = useLang()
  const c = t.contact
  const scope = useRef(null)
  const [role, setRole] = useState(roleIds.includes(params.get('role')) ? params.get('role') : 'parent')
  const [sent, setSent] = useState(null)
  const isLearner = role === 'parent' || role === 'student'
  const kind = isLearner ? 'learner' : role
  const levelParam = params.get('level')

  usePageMeta({ title: role === 'tutor' ? t.meta.contact.tutorTitle : t.meta.contact.title, desc: t.meta.contact.desc })
  usePageMotion(scope, lang)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const d = Object.fromEntries([...form.entries()].map(([k, v]) => [k, v.toString().trim()]))
    const email = buildEmail(role, d)
    setSent(email)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`
  }

  const phoneField = (
    <div className="field">
      <label htmlFor="phone" className="form__label">{c.labels.phone} <span>{c.labels.optional}</span></label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" />
    </div>
  )

  return (
    <section className="request" ref={scope}>
      <div className="container request__grid">
        <div className="request__intro">
          <p className="eyebrow" data-reveal>{c.eyebrow[kind]}</p>
          <h1 key={kind} className="t-title" data-split="hero">{c.title[kind]}</h1>
          <p className="t-lead" data-reveal>{c.lead[kind]}</p>
        </div>

        <div className="request__card" data-reveal>
          {sent ? (
            <div className="request__sent" role="status">
              <RiMailSendLine className="request__sent-icon" aria-hidden="true" />
              <h2 className="t-sub">{c.sent.title}</h2>
              <p>{c.sent.body}</p>
              <p>{c.sent.fallback} <a className="request__mail" href={`mailto:${site.email}`} dir="ltr">{site.email}</a></p>
              <pre className="request__summary" dir="ltr">{`Subject: ${sent.subject}\n\n${sent.body}`}</pre>
              <button className="btn btn--ghost" onClick={() => setSent(null)}>{c.sent.edit}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              <fieldset className="form__roles">
                <legend className="form__label">{c.who}</legend>
                <div className="form__seg">
                  {roleIds.map(r => (
                    <label key={r}>
                      <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} />
                      <span>{c.roles[r]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="form__row">
                <div className="field">
                  <label htmlFor="name" className="form__label">{role === 'parent' ? c.labels.nameParent : c.labels.name}</label>
                  <input id="name" name="name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="email" className="form__label">{c.labels.email}</label>
                  <input id="email" name="email" type="email" autoComplete="email" dir="ltr" required />
                </div>
              </div>

              {isLearner && (
                <>
                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="level" className="form__label">{c.labels.level}</label>
                      <select id="level" name="level" defaultValue={catalog.some(x => x.id === levelParam) ? levelParam : ''} required>
                        <option value="" disabled>{c.labels.levelPlaceholder}</option>
                        {catalog.map(x => <option key={x.id} value={x.id}>{t.levels[x.id].label}</option>)}
                        <option value="university">{t.levels.university}</option>
                        <option value="other">{t.levels.other}</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="subject" className="form__label">{c.labels.subject}</label>
                      <input id="subject" name="subject" list="subject-list" defaultValue={params.get('subject') || ''} required />
                      <datalist id="subject-list">
                        {subjectOptions.map(s => <option key={s} value={s} />)}
                      </datalist>
                    </div>
                  </div>

                  <fieldset className="field">
                    <legend className="form__label">{c.labels.format}</legend>
                    <div className="form__seg form__seg--sm">
                      {['online', 'home', 'either'].map(v => (
                        <label key={v}>
                          <input type="radio" name="format" value={v} defaultChecked={v === 'either'} />
                          <span>{c.labels.formats[v]}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="area" className="form__label">{c.labels.area} <span>{c.labels.optional}</span></label>
                      <input id="area" name="area" placeholder={c.labels.areaPh} />
                    </div>
                    {phoneField}
                  </div>
                </>
              )}

              {role === 'tutor' && (
                <>
                  <div className="field">
                    <label htmlFor="teaches" className="form__label">{c.labels.teaches}</label>
                    <input id="teaches" name="teaches" placeholder={c.labels.teachesPh} required />
                  </div>
                  <div className="form__row">
                    <div className="field">
                      <label htmlFor="qualifications" className="form__label">{c.labels.qualifications}</label>
                      <input id="qualifications" name="qualifications" required />
                    </div>
                    {phoneField}
                  </div>
                </>
              )}

              <div className="field">
                <label htmlFor="message" className="form__label">
                  {role === 'other' ? c.labels.message : <>{c.labels.anything} <span>{c.labels.optional}</span></>}
                </label>
                <textarea id="message" name="message" rows="4" required={role === 'other'} placeholder={isLearner ? c.labels.messagePh : ''} />
              </div>

              <button type="submit" className="btn btn--primary btn--block">
                {c.submit[kind]} <RiArrowRightLine aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        <div className="request__aside" data-reveal>
          <ol className="request__next">
            {[c.next.one, role === 'tutor' ? c.next.twoTutor : c.next.twoLearner, c.next.three].map(([strong, rest]) => (
              <li key={strong}><span><strong>{strong}</strong> {rest}</span></li>
            ))}
          </ol>
          <p className="t-small">{c.preferEmail} <a className="request__mail" href={`mailto:${site.email}`} dir="ltr">{site.email}</a></p>
          <p className="t-small"><Link className="request__mail" to="/privacy">{c.privacy}</Link></p>
        </div>
      </div>
    </section>
  )
}
