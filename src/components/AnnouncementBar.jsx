import { useLang } from '../i18n'
import './AnnouncementBar.css'

// Thin ticker above the navbar: offers and headline numbers.
export default function AnnouncementBar() {
  const { t } = useLang()
  const items = t.home.announce
  const row = (hidden) => (
    <ul className="announce__row" aria-hidden={hidden || undefined}>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  )
  return (
    <div className="announce" role="region" aria-label={t.home.announceLabel}>
      <div className="announce__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
