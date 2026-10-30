import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiSearchLine, RiArrowRightUpLine, RiCloseLine } from 'react-icons/ri'
import { useLang, dictionaries } from '../i18n'
import { catalog, subjectInfo, subjectName, requestLink } from '../content/site'
import './SearchDialog.css'

const normalize = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')

function useIndex() {
  const { t, lang } = useLang()
  return useMemo(() => {
    const subjects = catalog.flatMap(c => c.subjects.map(s => ({
      id: `s-${c.id}-${s}`,
      group: 'subjects',
      label: subjectName(s, lang),
      sub: t.levels[c.id].label,
      to: requestLink({ level: c.id, subject: s }),
      hay: normalize([s, subjectInfo[s]?.ur, subjectInfo[s]?.alias, dictionaries.en.levels[c.id].label, t.levels[c.id].label].join(' ')),
    })))
    const pageDefs = [
      ['how', '/services', 'process how works tareeqa طریقہ'],
      ['pricing', '/services#pricing', 'fees price cost rate qeemat kharcha فیس'],
      ['faq', '/services#faq', 'questions faq sawal سوال'],
      ['about', '/about', 'about team founders'],
      ['request', '/contact', 'request contact email rabta'],
      ['teach', requestLink({ role: 'tutor' }), 'teach apply job tutor parhana'],
      ['privacy', '/privacy', 'privacy data'],
      ['terms', '/terms', 'terms conditions rules shara'],
    ]
    const pages = pageDefs.map(([key, to, kw]) => ({
      id: `p-${key}`,
      group: 'pages',
      label: t.footer.links[key],
      to,
      hay: normalize(`${t.footer.links[key]} ${dictionaries.en.footer.links[key]} ${kw}`),
    }))
    return { subjects, pages }
  }, [t, lang])
}

export default function SearchDialog({ onClose }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const dialogRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const { subjects, pages } = useIndex()

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  const tokens = normalize(query).split(/\s+/).filter(Boolean)
  const match = (item) => tokens.every(tok => item.hay.includes(tok))
  const seen = new Set()
  const subjectHits = (tokens.length ? subjects.filter(match) : subjects.filter(s => s.sub === t.levels.cambridge.label))
    .filter(s => (seen.has(s.label + s.sub) ? false : seen.add(s.label + s.sub)))
    .slice(0, 8)
  const pageHits = tokens.length ? pages.filter(match).slice(0, 4) : pages.slice(0, 3)
  const results = [...subjectHits, ...pageHits]
  const current = Math.min(active, Math.max(results.length - 1, 0))

  const go = (item) => {
    onClose()
    navigate(item.to)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((current + 1) % results.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((current - 1 + results.length) % results.length) }
    else if (e.key === 'Enter' && results[current]) { e.preventDefault(); go(results[current]) }
  }

  const renderGroup = (items, heading, offset) => items.length > 0 && (
    <ul role="group" aria-label={t.nav[heading]}>
      <li role="presentation" aria-hidden="true" className="search__group">{t.nav[heading]}</li>
      {items.map((item, i) => (
        <li
          key={item.id}
          id={item.id}
          role="option"
          aria-selected={current === offset + i}
          className="search__option"
          onMouseMove={() => setActive(offset + i)}
          onClick={() => go(item)}
        >
          <span>
            <strong>{item.label}</strong>
            {item.sub && <small>{item.sub}</small>}
          </span>
          <RiArrowRightUpLine aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <dialog
      ref={dialogRef}
      className="search"
      aria-label={t.nav.searchLabel}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
    >
      <div className="search__panel">
        <div className="search__field">
          <RiSearchLine aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={onKeyDown}
            placeholder={t.nav.searchHint}
            role="combobox"
            aria-label={t.nav.searchLabel}
            aria-expanded="true"
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={results[current]?.id}
          />
          <button type="button" className="search__close" onClick={onClose} aria-label={t.nav.close}><RiCloseLine aria-hidden="true" /></button>
        </div>
        {results.length ? (
          <div id="search-results" role="listbox" aria-label={t.nav.searchLabel} className="search__results">
            {renderGroup(subjectHits, 'groupSubjects', 0)}
            {renderGroup(pageHits, 'groupPages', subjectHits.length)}
          </div>
        ) : (
          <p className="search__empty" role="status">{t.nav.noResults}</p>
        )}
      </div>
    </dialog>
  )
}
