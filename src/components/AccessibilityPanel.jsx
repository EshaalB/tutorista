import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RiCloseLine, RiVolumeUpLine, RiStopFill } from 'react-icons/ri'
import { usePreferences } from '../a11y'
import { useLang } from '../i18n'
import './AccessibilityPanel.css'

function AccessIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="7.2" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7 9.8l5 1.2 5-1.2M12 11v3.4M9.6 18l2.4-3.6 2.4 3.6" />
    </svg>
  )
}

function Switch({ checked, onChange, label, hint }) {
  const id = useId()
  return (
    <div className="a11y__row">
      <span>
        <span id={id} className="a11y__label">{label}</span>
        <span className="a11y__hint">{hint}</span>
      </span>
      <button type="button" role="switch" aria-checked={checked} aria-labelledby={id} className="a11y__switch" onClick={() => onChange(!checked)}>
        <span aria-hidden="true" />
      </button>
    </div>
  )
}

// Collect readable blocks from <main>, skipping anything hidden or nested in another block.
function pageText() {
  const blocks = [...document.querySelectorAll('#main :is(h1, h2, h3, p, li, td, th, label, legend)')]
  return blocks
    .filter(el => el.offsetParent !== null && !el.closest('[aria-hidden="true"]') && !el.parentElement.closest('#main :is(p, li, td, th, label)'))
    .map(el => el.innerText.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

function useReadAloud(lang) {
  const [reading, setReading] = useState(false)
  const [noVoice, setNoVoice] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const stop = () => {
    if (supported) window.speechSynthesis.cancel()
    setReading(false)
  }

  const start = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    const code = lang === 'ur' ? 'ur' : 'en'
    const voices = synth.getVoices()
    const voice = voices.find(v => v.lang.toLowerCase().startsWith(`${code}-pk`)) || voices.find(v => v.lang.toLowerCase().startsWith(code))
    setNoVoice(!voice && voices.length > 0)
    const blocks = pageText()
    blocks.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = voice?.lang || (code === 'ur' ? 'ur-PK' : 'en-GB')
      if (voice) u.voice = voice
      u.rate = 0.95
      if (i === blocks.length - 1) u.onend = () => setReading(false)
      synth.speak(u)
    })
    setReading(blocks.length > 0)
  }

  useEffect(() => () => { if (supported) window.speechSynthesis.cancel() }, [supported])

  return { supported, reading, noVoice, start, stop }
}

export default function AccessibilityPanel() {
  const { t, lang } = useLang()
  const a = t.a11y
  const { prefs, setPref, reset } = usePreferences()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const ref = useRef(null)
  const triggerRef = useRef(null)
  const titleId = useId()
  const read = useReadAloud(lang)
  const { stop } = read

  // Stop reading when the page changes underneath the voice.
  useEffect(() => { stop() }, [pathname, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return
    ref.current?.querySelector('h2')?.focus()
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus() } }
    const onDown = (e) => { if (!ref.current?.contains(e.target) && !triggerRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div className="a11y">
      <button
        ref={triggerRef}
        type="button"
        className={`a11y__trigger ${read.reading ? 'is-reading' : ''}`}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={a.open}
        title={a.open}
        onClick={() => setOpen(o => !o)}
      >
        <AccessIcon />
      </button>

      {open && (
        <div ref={ref} id="a11y-panel" className="a11y__panel" role="dialog" aria-labelledby={titleId}>
          <div className="a11y__head">
            <h2 id={titleId} tabIndex={-1}>{a.title}</h2>
            <button type="button" className="a11y__close" onClick={() => { setOpen(false); triggerRef.current?.focus() }} aria-label={a.close}>
              <RiCloseLine aria-hidden="true" />
            </button>
          </div>

          <div className="a11y__group" role="group" aria-label={a.text}>
            <span className="a11y__label">{a.text}</span>
            <div className="a11y__sizes">
              {['base', 'lg', 'xl'].map((size, i) => (
                <button key={size} type="button" aria-pressed={prefs.text === size} onClick={() => setPref('text', size)}>
                  <span aria-hidden="true" style={{ fontSize: `${1 + i * 0.2}rem` }}>A</span>
                  <span className="a11y__size-name">{a.sizes[size]}</span>
                </button>
              ))}
            </div>
          </div>

          <Switch checked={prefs.contrast === 'high'} onChange={v => setPref('contrast', v ? 'high' : 'off')} label={a.contrast} hint={a.contrastHint} />
          <Switch checked={prefs.readable === 'on'} onChange={v => setPref('readable', v ? 'on' : 'off')} label={a.readable} hint={a.readableHint} />
          <Switch checked={prefs.links === 'on'} onChange={v => setPref('links', v ? 'on' : 'off')} label={a.links} hint={a.linksHint} />
          <Switch checked={prefs.motion === 'off'} onChange={v => setPref('motion', v ? 'off' : 'on')} label={a.motion} hint={a.motionHint} />

          {read.supported && (
            <div className="a11y__read">
              <button type="button" className="btn btn--primary btn--block" onClick={read.reading ? read.stop : read.start}>
                {read.reading ? <RiStopFill aria-hidden="true" /> : <RiVolumeUpLine aria-hidden="true" />}
                {read.reading ? a.stop : a.read}
              </button>
              <p className="a11y__hint" role="status">{read.noVoice ? a.noVoice : a.readHint}</p>
            </div>
          )}

          <button type="button" className="a11y__reset" onClick={() => { reset(); read.stop() }}>{a.reset}</button>
        </div>
      )}
    </div>
  )
}
