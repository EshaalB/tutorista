import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingDock from './components/FloatingDock'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import LanguageProvider from './i18n/LanguageProvider'
import { useLang } from './i18n'
import { usePageMeta } from './hooks/usePageMeta'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function NotFound() {
  const { t } = useLang()
  usePageMeta(t.meta.notFound)
  return (
    <section className="section container">
      <h1 className="t-title">{t.notFound.title}</h1>
      <p className="t-lead" style={{ margin: '16px 0 28px' }}>{t.notFound.body}</p>
      <Link to="/" className="btn btn--primary">{t.notFound.home}</Link>
    </section>
  )
}

// Pages remount on a language switch: GSAP SplitText rewrites heading DOM,
// so React must render fresh nodes rather than patch the split ones.
function Pages() {
  const { lang } = useLang()
  return (
    <main id="main" tabIndex={-1} key={lang}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

function SkipLink() {
  const { lang } = useLang()
  return <a href="#main" className="skip-link">{lang === 'ur' ? 'مواد پر جائیں' : lang === 'roman' ? 'Content par jayein' : 'Skip to content'}</a>
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SkipLink />
        <Navbar />
        <Pages />
        <Footer />
        <FloatingDock />
      </BrowserRouter>
    </LanguageProvider>
  )
}
