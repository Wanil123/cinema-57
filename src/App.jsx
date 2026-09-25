import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import FilmDetail from './pages/FilmDetail'
import ArticleDetail from './pages/ArticleDetail'
import Reservation from './pages/Reservation'
import Login from './pages/Login'
import Register from './pages/Register'
import GenrePage from './pages/GenrePage'
import Admin from './pages/Admin'
import ScrollProgress from './components/ScrollProgress'
import { useTranslation } from './contexts/LanguageContext'

const portfolioPreview = import.meta.env.VITE_PORTFOLIO_PREVIEW === 'true'

function PreviewNotice() {
  const { lang } = useTranslation()
  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] border-t border-gold/50 bg-charcoal px-4 py-3 text-center text-xs font-medium text-white shadow-2xl sm:text-sm">
      <span className="text-gold">5:7 · </span>
      {lang === 'fr'
        ? 'Prototype de portfolio. Festival fictif de 2025; aucune réservation ni billetterie réelle.'
        : 'Portfolio prototype. Fictional 2025 festival; no real reservations or ticket sales.'}
    </div>
  )
}

function PreviewOnly() {
  const { lang } = useTranslation()
  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 pb-20 text-center text-white">
      <div className="max-w-xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">5:7 · Portfolio</p>
        <h1 className="mb-5 font-display text-4xl font-bold sm:text-5xl">
          {lang === 'fr' ? 'Parcours de démonstration' : 'Demo experience'}
        </h1>
        <p className="mb-8 leading-relaxed text-white/70">
          {lang === 'fr'
            ? 'Ce site présente un concept de festival. Les comptes, réservations et billets ne sont pas ouverts au public.'
            : 'This site showcases a festival concept. Accounts, reservations and tickets are not open to the public.'}
        </p>
        <Link to="/" className="inline-block rounded bg-crimson px-6 py-3 font-semibold text-white hover:bg-crimson-dark">
          {lang === 'fr' ? 'Retour au projet' : 'Back to the project'}
        </Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <>
      <ScrollProgress />
      {portfolioPreview && <PreviewNotice />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/reservation" element={portfolioPreview ? <PreviewOnly /> : <Reservation />} />
        <Route path="/reservation/:filmId" element={portfolioPreview ? <PreviewOnly /> : <Reservation />} />
        <Route path="/login" element={portfolioPreview ? <PreviewOnly /> : <Login />} />
        <Route path="/register" element={portfolioPreview ? <PreviewOnly /> : <Register />} />
        <Route path="/admin/*" element={portfolioPreview ? <PreviewOnly /> : <Admin />} />
      </Routes>
    </>
  )
}

export default App
