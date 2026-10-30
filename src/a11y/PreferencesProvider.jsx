import { useEffect, useState } from 'react'
import { PreferencesContext, STORAGE_KEY, defaults } from '.'

function load() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  } catch {
    return defaults
  }
}

export default function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(load)

  useEffect(() => {
    const root = document.documentElement
    for (const [key, value] of Object.entries(prefs)) {
      if (value === defaults[key]) delete root.dataset[key]
      else root.dataset[key] = value
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)) } catch { /* storage blocked */ }
  }, [prefs])

  const setPref = (key, value) => setPrefs(p => ({ ...p, [key]: value }))
  const reset = () => setPrefs(defaults)

  return (
    <PreferencesContext.Provider value={{ prefs, setPref, reset }}>
      {children}
    </PreferencesContext.Provider>
  )
}
