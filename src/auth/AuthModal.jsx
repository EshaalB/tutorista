import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiCloseLine, RiCheckboxCircleLine } from 'react-icons/ri'
import { useLang } from '../i18n'
import { AuthContext } from '.'
import { isEmail, isPassword } from './validate'
import './AuthModal.css'

function PasswordField({ id, label, hint, error, autoComplete }) {
  const { t } = useLang()
  const [shown, setShown] = useState(false)
  return (
    <div className={`am-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="am-password">
        <input id={id} name="password" type={shown ? 'text' : 'password'} autoComplete={autoComplete} dir="ltr"
          aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} />
        <button type="button" onClick={() => setShown(s => !s)} aria-pressed={shown}>{shown ? t.auth.hide : t.auth.show}</button>
      </div>
      {hint && !error && <p id={`${id}-hint`} className="am-hint">{hint}</p>}
      {error && <p id={`${id}-err`} className="am-error">{error}</p>}
    </div>
  )
}

function TextField({ id, label, error, ...input }) {
  return (
    <div className={`am-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...input} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} />
      {error && <p id={`${id}-err`} className="am-error">{error}</p>}
    </div>
  )
}

// Demo account dialog: validates in the browser, never sends or stores anything.
function AuthDialog({ mode, setMode, plan, onClose }) {
  const { t } = useLang()
  const a = t.auth
  const ref = useRef(null)
  const titleId = useId()
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  const switchTo = (m) => { setMode(m); setErrors({}); setDone(false) }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const next = {}
    if (mode === 'signup' && !String(f.get('name')).trim()) next.name = a.errors.name
    if (!isEmail(String(f.get('email')).trim())) next.email = a.errors.email
    if (!isPassword(String(f.get('password')))) next.password = a.errors.password
    if (mode === 'signup' && !f.get('terms')) next.terms = a.errors.terms
    setErrors(next)
    if (Object.keys(next).length) { setTimeout(() => form.querySelector('[aria-invalid="true"]')?.focus()); return }
    setDone(true)
  }

  const copy = mode === 'login' ? a.login : a.signup

  return (
    <dialog ref={ref} className="am" aria-labelledby={titleId}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={(e) => { if (e.target === ref.current) onClose() }}>
      <div className="am__panel" data-lenis-prevent>
        <button type="button" className="am__close" onClick={onClose} aria-label={t.nav.close}><RiCloseLine aria-hidden="true" /></button>
        <div className="am__tabs" role="tablist">
          {['login', 'signup'].map(m => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => switchTo(m)}>
              {m === 'login' ? t.nav.login : t.nav.signup}
            </button>
          ))}
        </div>
        <h2 id={titleId} className="am__title">{copy.title}</h2>
        <p className="am__lead">{copy.lead}</p>

        {done ? (
          <div className="am__done" role="status">
            <RiCheckboxCircleLine aria-hidden="true" />
            <div><strong>{copy.done}</strong><p>{a.demo}</p></div>
          </div>
        ) : (
          <form className="am__form" onSubmit={onSubmit} noValidate key={mode}>
            {mode === 'signup' && (
              <>
                <div className="am-field">
                  <label htmlFor="am-role">{a.signup.role}</label>
                  <select id="am-role" name="role" defaultValue="student">
                    {Object.entries(a.signup.roles).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                  </select>
                </div>
                <TextField id="am-name" label={a.signup.name} error={errors.name} name="name" autoComplete="name" />
              </>
            )}
            <TextField id="am-email" label={a.email} error={errors.email} name="email" type="email" autoComplete="email" dir="ltr" />
            <PasswordField id="am-password" label={a.password} error={errors.password}
              hint={mode === 'signup' ? a.signup.passwordHint : null}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            {mode === 'signup' && (
              <div className={`am-field ${errors.terms ? 'has-error' : ''}`}>
                <label className="am-check">
                  <input type="checkbox" name="terms" aria-invalid={errors.terms ? true : undefined} aria-describedby={errors.terms ? 'am-terms-err' : undefined} />
                  <span>{a.signup.termsA} <Link to="/terms" onClick={onClose}>{a.signup.termsLink}</Link> {a.signup.termsB} <Link to="/privacy" onClick={onClose}>{a.signup.privacyLink}</Link></span>
                </label>
                {errors.terms && <p id="am-terms-err" className="am-error">{errors.terms}</p>}
              </div>
            )}
            {plan && <input type="hidden" name="plan" value={plan} />}
            <button type="submit" className="btn btn--primary btn--block">{copy.submit}</button>
          </form>
        )}
        <p className="am__switch">
          {copy.switchText}{' '}
          <button type="button" onClick={() => switchTo(mode === 'login' ? 'signup' : 'login')}>{copy.switchLink}</button>
        </p>
      </div>
    </dialog>
  )
}

export default function AuthProvider({ children }) {
  const [state, setState] = useState(null)
  const open = useCallback((mode = 'login', opts = {}) => setState({ mode, plan: opts.plan || null }), [])
  const close = useCallback(() => setState(null), [])
  return (
    <AuthContext.Provider value={{ open }}>
      {children}
      {state && <AuthDialog mode={state.mode} plan={state.plan} setMode={(m) => setState(s => ({ ...s, mode: m }))} onClose={close} />}
    </AuthContext.Provider>
  )
}
