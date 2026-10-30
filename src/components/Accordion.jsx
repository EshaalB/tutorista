import { useState, useId } from 'react'
import './Accordion.css'

export default function Accordion({ items, numbered = false }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const id = `${baseId}-${index}`
        return (
          <div key={item.q} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button
                id={`${id}-btn`}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {numbered && <span className="accordion__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
                <span className="accordion__q">{item.q}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className="accordion__panel" inert={!isOpen}>
              <div><p>{item.a}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
