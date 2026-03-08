import { useState } from 'react'
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import './Accordion.css'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="accordion-root">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`accordion-item ${openIndex === index ? 'is-open' : ''}`}
        >
          <button 
            className="accordion-trigger" 
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className="accordion-title">{item.q}</span>
            <span className="accordion-icon">
              {openIndex === index ? <RiSubtractLine /> : <RiAddLine />}
            </span>
          </button>
          <div className="accordion-content">
            <div className="accordion-content-inner">
              <p className="body-lg">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
