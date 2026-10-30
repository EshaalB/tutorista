import { useRef } from 'react'
import { site } from '../content/site'
import { useLang } from '../i18n'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'

// Privacy policy and terms share one layout; `doc` picks the copy.
export default function Legal({ doc }) {
  const { t, lang } = useLang()
  const page = t[doc]
  const scope = useRef(null)
  usePageMeta(t.meta[doc])
  usePageMotion(scope, `${doc}-${lang}`)

  return (
    <section className="section" ref={scope}>
      <div className="container legal">
        <h1 className="t-title">{page.title}</h1>
        <p className="t-small legal__updated">{page.updated}</p>
        {page.sections.map(s => (
          <section key={s.h} className="legal__block">
            <h2 className="t-sub">{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
        <p className="legal__contact">
          {page.contact} <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>
        </p>
      </div>
    </section>
  )
}
