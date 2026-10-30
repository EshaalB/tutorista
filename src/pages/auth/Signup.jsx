import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { useLang } from '../../i18n'
import { usePageMeta } from '../../hooks/usePageMeta'
import { AuthLayout, Field, PasswordInput, DemoNotice } from './AuthLayout'
import { isEmail, isPassword } from './validate'

const roles = ['student', 'parent', 'tutor']

// Demo only: validates in the browser and never sends anything.
export default function Signup() {
  const { t } = useLang()
  const a = t.auth
  const s = a.signup
  const [params] = useSearchParams()
  const planIds = t.plans.items.map(p => p.id)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  usePageMeta(t.meta.signup)

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const next = {}
    if (!String(f.get('name')).trim()) next.name = a.errors.name
    if (!isEmail(String(f.get('email')).trim())) next.email = a.errors.email
    if (!isPassword(String(f.get('password')))) next.password = a.errors.password
    if (!f.get('terms')) next.terms = a.errors.terms
    setErrors(next)
    if (Object.keys(next).length) {
      // wait for React to mark the fields invalid, then move focus to the first one
      const form = e.currentTarget
      setTimeout(() => form.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    setDone(true)
  }

  return (
    <AuthLayout title={s.title} lead={s.lead}>
      {done ? <DemoNotice title={s.done} /> : (
        <form className="form auth__fields" onSubmit={onSubmit} noValidate>
          <fieldset className="form__roles">
            <legend className="form__label">{s.role}</legend>
            <div className="form__seg form__seg--sm">
              {roles.map((r, i) => (
                <label key={r}>
                  <input type="radio" name="role" value={r} defaultChecked={i === 0} />
                  <span>{s.roles[r]}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="su-name" label={s.name} error={errors.name}>
            {(p) => <input {...p} name="name" autoComplete="name" required />}
          </Field>
          <div className="form__row">
            <Field id="su-email" label={a.email} error={errors.email}>
              {(p) => <input {...p} name="email" type="email" autoComplete="email" dir="ltr" required />}
            </Field>
            <Field id="su-phone" label={s.phone} optional={s.optional}>
              {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" />}
            </Field>
          </div>
          <div className="form__row">
            <Field id="su-password" label={a.password} hint={s.passwordHint} error={errors.password}>
              {(p) => <PasswordInput {...p} autoComplete="new-password" required />}
            </Field>
            <Field id="su-plan" label={s.plan}>
              {(p) => (
                <select {...p} name="plan" defaultValue={planIds.includes(params.get('plan')) ? params.get('plan') : ''}>
                  <option value="">{s.planLater}</option>
                  {t.plans.items.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
                </select>
              )}
            </Field>
          </div>
          <div className={`field ${errors.terms ? 'has-error' : ''}`}>
            <label className="check">
              <input type="checkbox" name="terms" aria-invalid={errors.terms ? true : undefined} aria-describedby={errors.terms ? 'su-terms-error' : undefined} />
              <span>{s.termsA} <Link to="/terms" className="auth__link">{s.termsLink}</Link> {s.termsB} <Link to="/privacy" className="auth__link">{s.privacyLink}</Link></span>
            </label>
            {errors.terms && <p id="su-terms-error" className="field__error">{errors.terms}</p>}
          </div>
          <button type="submit" className="btn btn--gold btn--block">{s.submit} <RiArrowRightLine aria-hidden="true" /></button>
        </form>
      )}
      <p className="auth__switch">{s.switchText} <Link to="/login" className="auth__link">{s.switchLink}</Link></p>
    </AuthLayout>
  )
}
