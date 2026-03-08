import './Marquee.css'

const items = [
  'Tutor Matching',
  'Online Video Lessons',
  'Digital Whiteboard',
  'Verified Tutor Profiles',
  'Secure Payments',
  'Flexible Scheduling',
  'IGCSE & A-Level Support',
  'Live Screen Sharing',
  'University Courses',
  'Professional Skills Training',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
