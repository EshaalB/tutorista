import { useState, useId } from 'react'
import './Accordion.css'

export default function Accordion({ items }) {
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
                {item.q}
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
