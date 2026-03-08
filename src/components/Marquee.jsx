import './Marquee.css'

const items = [
  'O-Level and A-Level Prep',
  'MDCAT Specialists',
  'ECAT Ready',
  'Verified Educators',
  'LGS Students Trust Us',
  'Aitchison College Prep',
  'LUMS Entry Test Coaching',
  'Beaconhouse Curriculum Support',
  'Secure Escrow Payments',
  'Live Virtual Classrooms',
  'Punjab Board FSc/FA',
  'FAST-NUCES Test Prep',
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
