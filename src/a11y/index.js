import { createContext, useContext } from 'react'

// Each preference maps to a data-* attribute on <html>; index.css reads them.
// index.html applies the saved values before first paint to avoid a jump.
export const STORAGE_KEY = 'tutorista-reading'
export const defaults = { text: 'base', contrast: 'off', readable: 'off', links: 'off', motion: 'on' }

export const PreferencesContext = createContext({ prefs: defaults, setPref: () => {}, reset: () => {} })

export function usePreferences() {
  return useContext(PreferencesContext)
}

// Lite mode or the OS setting both mean "no motion, no autoplay".
export function useMotionAllowed() {
  const { prefs } = usePreferences()
  return prefs.motion !== 'off' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
