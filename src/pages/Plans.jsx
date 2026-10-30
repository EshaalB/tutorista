import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import { PhotoTile } from '../components/Motifs'
import { requestLink } from '../content/site'
import { useLang } from '../i18n'
import { useAuthModal } from '../auth'
import { usePageMotion } from '../motion/usePageMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import './Plans.css'

export default function Plans() {
  const { t, lang } = useLang()
  const p = t.plans
  const auth = useAuthModal()
  const scope = useRef(null)
  usePageMeta(t.meta.plans)
  usePageMotion(scope, lang)

  return (
    <div ref={scope}>
      <section className="plans-hero">
        <div className="container plans-hero__grid">
          <div>
            <p className="kicker">{p.kicker}</p>
            <h1 className="t-display">
              {p.titleA} {p.titleB}
            </h1>
            <p className="t-lead plans-hero__lead">{p.lead}</p>
          </div>
          <PhotoTile src="/img/pk-classroom.webp" frame="page" alt={p.image} size={800} small={480} sizes="(max-width: 960px) 90vw, 420px" className="plans-hero__image" />
        </div>
      </section>

      <section className="section plans">
        <div className="container">
          <ul className="plans__grid">
            {p.items.map(plan => (
              <li key={plan.id} className={`plan plan--${plan.id}`} data-reveal>
                {plan.badge && <span className="plan__badge">{plan.badge}</span>}
                <h2 className="plan__name">{plan.name}</h2>
                <p className="plan__desc">{plan.desc}</p>
                <p className="plan__price">
                  <span className="plan__unit">{plan.unit}</span>
                  <strong>{plan.price}</strong>
                </p>
                <ul className="list-check">
                  {plan.points.map(pt => <li key={pt}><RiCheckLine aria-hidden="true" />{pt}</li>)}
                </ul>
                <button type="button" onClick={() => auth.open('signup', { plan: plan.id })} className={`btn ${plan.id === 'monthly' ? 'btn--gold' : 'btn--primary'} btn--block`}>
                  {plan.cta} <RiArrowRightLine aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--cream included">
        <div className="container included__grid">
          <h2 className="t-title">{p.included.title}</h2>
          <ul className="included__list">
            {p.included.points.map((pt, i) => (
              <li key={pt}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{pt}</li>
            ))}
          </ul>
          <div className="included__tutor">
            <h3 className="t-sub">{p.tutors.title}</h3>
            <p>{p.tutors.body}</p>
            <Link to={requestLink({ role: 'tutor' })} className="link-arrow">{p.tutors.cta} <RiArrowRightLine aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
