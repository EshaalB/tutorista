import { useEffect, useRef, useState } from 'react'
import './DragScroller.css'

// Horizontal strip you can drag with a mouse, swipe on touch, or scroll with the keyboard.
// A round "drag" cursor follows the pointer on devices with a fine pointer.
export default function DragScroller({ children, label, dragLabel = 'drag', className = '', onActiveChange }) {
  const ref = useRef(null)
  const drag = useRef(null)
  const [cursor, setCursor] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!onActiveChange) return
    const onScroll = () => {
      const items = [...el.children]
      const start = el.getBoundingClientRect().left
      const rtl = getComputedStyle(el).direction === 'rtl'
      let best = 0
      let bestDist = Infinity
      items.forEach((item, i) => {
        const r = item.getBoundingClientRect()
        const dist = Math.abs((rtl ? el.getBoundingClientRect().right - r.right : r.left - start))
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      onActiveChange(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onActiveChange])

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false }
    ref.current.setPointerCapture(e.pointerId)
    ref.current.classList.add('is-dragging')
  }
  const onPointerMove = (e) => {
    if (e.pointerType === 'mouse') {
      const r = ref.current.getBoundingClientRect()
      setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
    }
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    ref.current.scrollLeft = drag.current.left - dx
  }
  const end = (e) => {
    if (!drag.current) return
    ref.current.releasePointerCapture?.(e.pointerId)
    ref.current.classList.remove('is-dragging')
    drag.current = null
  }

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
      </div>
      {cursor && (
        <span className="dragger__cursor" aria-hidden="true" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>
          {dragLabel}
        </span>
      )}
    </div>
  )
}
