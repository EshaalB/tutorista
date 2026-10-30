import { createContext, useContext } from 'react'
import en from './en'
import roman from './roman'
import ur from './ur'

export const languages = [
  { id: 'en', label: 'EN', name: 'English', htmlLang: 'en', dir: 'ltr' },
  { id: 'roman', label: 'Roman', name: 'Roman Urdu', htmlLang: 'ur-Latn', dir: 'ltr' },
  { id: 'ur', label: 'اردو', name: 'اردو', htmlLang: 'ur', dir: 'rtl' },
]

// Missing keys in a translation fall back to English.
function withFallback(base, override) {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return override ?? base
  const out = { ...base }
  for (const key of Object.keys(override || {})) out[key] = withFallback(base[key], override[key])
  return out
}

export const dictionaries = { en, roman: withFallback(en, roman), ur: withFallback(en, ur) }

export const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: en })

export function useLang() {
  return useContext(LanguageContext)
}
