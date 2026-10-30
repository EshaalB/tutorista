import { useRef } from 'react'
import { site } from '../content/site'
import { useLang } from '../i18n'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Privacy() {
  const { t, lang } = useLang()
  const p = t.privacy
  const scope = useRef(null)
  usePageMeta(t.meta.privacy)
  usePageMotion(scope, lang)

  return (
    <section className="section" ref={scope}>
      <div className="container legal">
        <h1 className="t-title" data-split="hero">{p.title}</h1>
        <p className="t-small legal__updated">{p.updated}</p>
        {p.sections.map(s => (
          <section key={s.h} className="legal__block" data-reveal>
            <h2 className="t-sub">{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
        <p className="legal__contact" data-reveal>
          {p.contact} <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>
        </p>
      </div>
    </section>
  )
}
