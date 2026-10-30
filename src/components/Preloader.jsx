import { useEffect, useState } from 'react'
import './Preloader.css'

// First visit in a session only: the mark, the wordmark filling in, then the curtain lifts.
// About 1.3s in total; skipped entirely under reduced motion or Lite mode.
const KEY = 'tutorista-intro-seen'

function shouldShow() {
  try {
    if (sessionStorage.getItem(KEY)) return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (document.documentElement.dataset.motion === 'off') return false
  } catch { return false }
  return true
}

export default function Preloader() {
  const [stage, setStage] = useState(() => (shouldShow() ? 'fill' : 'done'))

  useEffect(() => {
    if (stage !== 'fill') return
    try { sessionStorage.setItem(KEY, '1') } catch { /* storage blocked */ }
    const lift = setTimeout(() => setStage('lift'), 950)
    const done = setTimeout(() => setStage('done'), 1500)
    return () => { clearTimeout(lift); clearTimeout(done) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (stage === 'done') return null
  return (
    <div className={`preloader preloader--${stage}`} aria-hidden="true">
      <img src="/brand/mark.webp" alt="" width="53" height="80" />
      <span className="preloader__word" data-word="Tutorista">Tutorista</span>
    </div>
  )
}
