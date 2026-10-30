import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingDock from './components/FloatingDock'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Plans from './pages/Plans'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AccessibilityPanel from './components/AccessibilityPanel'
import LanguageProvider from './i18n/LanguageProvider'
import PreferencesProvider from './a11y/PreferencesProvider'
import { usePreferences } from './a11y'
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

// Pages remount when the language or Lite mode changes: GSAP SplitText rewrites
// heading DOM, so React must render fresh nodes rather than patch the split ones.
function Pages() {
  const { lang } = useLang()
  const { prefs } = usePreferences()
  return (
    <main id="main" tabIndex={-1} key={`${lang}-${prefs.motion}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal key="privacy" doc="privacy" />} />
        <Route path="/terms" element={<Legal key="terms" doc="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

function SkipLink() {
  const { lang } = useLang()
  return <a href="#main" className="skip-link">{lang === 'ur' ? 'مواد پر جائیں' : 'Skip to content'}</a>
}

export default function App() {
  return (
    <LanguageProvider>
      <PreferencesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SkipLink />
          <Navbar />
          <Pages />
          <Footer />
          <FloatingDock />
          <AccessibilityPanel />
        </BrowserRouter>
      </PreferencesProvider>
    </LanguageProvider>
  )
}
