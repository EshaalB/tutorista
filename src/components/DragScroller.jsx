import { useCallback, useEffect, useRef, useState } from 'react'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { useLang } from '../i18n'
import './DragScroller.css'

// Horizontal strip: drag with a mouse, swipe on touch, scroll with the keyboard,
// or use the back / next buttons. Every item, including the last, can reach the start.
export default function DragScroller({ children, label, dragLabel = 'drag', className = '', onActiveChange }) {
  const { lang, t } = useLang()
  const ref = useRef(null)
  const drag = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [active, setActive] = useState(0)

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const items = [...el.querySelectorAll(':scope > :not(.dragger__tail)')]
    const pos = Math.abs(el.scrollLeft)
    const max = el.scrollWidth - el.clientWidth
    const step = items[1] ? Math.abs(items[1].offsetLeft - items[0].offsetLeft) : el.clientWidth
    const index = Math.min(items.length - 1, Math.round(pos / step))
    setEdges({ start: pos < 4, end: index >= items.length - 1 || pos > max - 4 })
    setActive(index)
    onActiveChange?.(index)
  }, [onActiveChange])

  useEffect(() => {
    const el = ref.current
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => { el.removeEventListener('scroll', measure); window.removeEventListener('resize', measure) }
  }, [measure])

  const go = (dir) => {
    const el = ref.current
    const items = [...el.querySelectorAll(':scope > :not(.dragger__tail)')]
    const target = items[Math.max(0, Math.min(items.length - 1, active + dir))]
    if (!target) return
    const rtl = getComputedStyle(el).direction === 'rtl'
    const offset = rtl ? -(el.clientWidth - target.offsetLeft - target.offsetWidth) : target.offsetLeft - items[0].offsetLeft
    el.scrollTo({ left: offset, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.target.closest('button, a')) return
    drag.current = { x: e.clientX, left: ref.current.scrollLeft }
    ref.current.setPointerCapture(e.pointerId)
    ref.current.classList.add('is-dragging')
  }
  const onPointerMove = (e) => {
    if (e.pointerType === 'mouse') {
      const r = ref.current.getBoundingClientRect()
      setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
    }
    if (!drag.current) return
    ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const end = (e) => {
    if (!drag.current) return
    ref.current.releasePointerCapture?.(e.pointerId)
    ref.current.classList.remove('is-dragging')
    drag.current = null
  }

  const rtl = lang === 'ur'
  return (
    <div className="dragger" onPointerLeave={() => setCursor(null)}>
      <div
        ref={ref}
        className={`dragger__track ${className}`}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
      >
        {children}
        <span className="dragger__tail" aria-hidden="true" />
      </div>
      {cursor && (
        <span className="dragger__cursor" aria-hidden="true" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>
          {dragLabel}
        </span>
      )}
      <div className="dragger__controls">
        <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label={t.nav.prev}>
          {rtl ? <RiArrowRightLine aria-hidden="true" /> : <RiArrowLeftLine aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label={t.nav.next}>
          {rtl ? <RiArrowLeftLine aria-hidden="true" /> : <RiArrowRightLine aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
