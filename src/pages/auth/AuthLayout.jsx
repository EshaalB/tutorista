import { useId, useState } from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { PhotoTile } from '../../components/Motifs'
import { useLang } from '../../i18n'
import './Auth.css'

// Form on one side, a Pakistani classroom photo with a margin note on the other.
export function AuthLayout({ title, lead, children }) {
  const { t, lang } = useLang()
  return (
    <section className="auth">
      <div className="container auth__grid">
        <div className="auth__form">
          <h1 className="t-title">{title}</h1>
          <p className="t-lead auth__lead">{lead}</p>
          {children}
        </div>
        <figure className="auth__aside">
          <PhotoTile src="/img/pk-reading.webp" frame="page" alt="" size={800} small={480} sizes="(max-width: 960px) 0px, 440px" priority />
          <p className="auth__note aside-ur" lang={lang === 'ur' ? 'ur' : 'ur-Latn'}>{t.auth.aside.note}</p>
          <figcaption className="t-small">{t.auth.aside.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export function Field({ label, hint, error, optional, children, id }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="form__label">{label}{optional && <span> {optional}</span>}</label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && <p id={`${id}-hint`} className="field__hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="field__error">{error}</p>}
    </div>
  )
}

export function PasswordInput({ autoComplete, ...props }) {
  const { t } = useLang()
  const [shown, setShown] = useState(false)
  return (
    <div className="password">
      <input {...props} name="password" type={shown ? 'text' : 'password'} autoComplete={autoComplete} dir="ltr" />
      <button type="button" className="password__toggle" onClick={() => setShown(s => !s)} aria-pressed={shown}>
        {shown ? t.auth.hide : t.auth.show}
      </button>
    </div>
  )
}

export function DemoNotice({ title }) {
  const { t } = useLang()
  const id = useId()
  return (
    <div className="auth__done" role="status" aria-labelledby={id}>
      <RiCheckboxCircleLine aria-hidden="true" />
      <div>
        <p id={id} className="auth__done-title">{title}</p>
        <p>{t.auth.demo}</p>
      </div>
    </div>
  )
}
