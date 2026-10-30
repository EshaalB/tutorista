import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { useLang } from '../../i18n'
import { usePageMeta } from '../../hooks/usePageMeta'
import { AuthLayout, Field, PasswordInput, DemoNotice } from './AuthLayout'
import { isEmail, isPassword } from './validate'

// Demo only: validates in the browser and never sends anything.
export default function Login() {
  const { t } = useLang()
  const a = t.auth
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const [forgot, setForgot] = useState(false)
  usePageMeta(t.meta.login)

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const next = {}
    if (!isEmail(String(f.get('email')).trim())) next.email = a.errors.email
    if (!isPassword(String(f.get('password')))) next.password = a.errors.password
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
    <AuthLayout title={a.login.title} lead={a.login.lead}>
      {done ? <DemoNotice title={a.login.done} /> : (
        <form className="form auth__fields" onSubmit={onSubmit} noValidate>
          <Field id="login-email" label={a.email} error={errors.email}>
            {(p) => <input {...p} name="email" type="email" autoComplete="email" dir="ltr" required />}
          </Field>
          <Field id="login-password" label={a.password} error={errors.password}>
            {(p) => <PasswordInput {...p} autoComplete="current-password" required />}
          </Field>
          <div className="auth__row">
            <label className="check"><input type="checkbox" name="remember" /> {a.login.remember}</label>
            <button type="button" className="auth__link" onClick={() => setForgot(true)}>{a.login.forgot}</button>
          </div>
          {forgot && <p className="field__hint" role="status">{a.login.forgotNote}</p>}
          <button type="submit" className="btn btn--primary btn--block">{a.login.submit} <RiArrowRightLine aria-hidden="true" /></button>
        </form>
      )}
      <p className="auth__switch">{a.login.switchText} <Link to="/signup" className="auth__link">{a.login.switchLink}</Link></p>
    </AuthLayout>
  )
}
