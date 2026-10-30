import { useEffect, useState } from 'react'
import { LanguageContext, dictionaries, languages } from '.'

const STORAGE_KEY = 'tutorista-lang'

// ?lang=ur wins, so a shared link opens in the sender's language.
function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (dictionaries[fromUrl]) return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (dictionaries[saved]) return saved
  } catch { /* storage blocked */ }
  return 'en'
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    const meta = languages.find(l => l.id === lang)
    document.documentElement.lang = meta.htmlLang
    document.documentElement.dir = meta.dir
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* storage blocked */ }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
