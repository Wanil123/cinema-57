import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../contexts/LanguageContext'

export default function Header() {
  const { t, lang, toggleLang } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const navLinks = [
    { label: t('nav.programmation'), section: 'programmation' },
    { label: t('nav.festival'), section: 'apropos' },
    { label: t('nav.actualites'), section: 'actualites' },
    { label: t('nav.forfaits'), section: 'forfaits' },
    { label: t('nav.contact'), section: 'contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (section) => {
    setMobileOpen(false)
    if (isHome) {
      const el = document.getElementById(section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${section}`)
    }
  }

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  const handleLogoClick = () => {
    setMobileOpen(false)
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || !isHome ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map(link => (
              <NavBtn key={link.section} label={link.label} scrolled={scrolled || !isHome}
                onClick={() => handleNavClick(link.section)} />
            ))}
          </nav>

          {/* Logo */}
          <button onClick={handleLogoClick} className="relative z-10 cursor-pointer" data-hover>
            <span className={`font-display text-2xl lg:text-3xl font-bold tracking-wide transition-colors duration-500 ${
              scrolled || !isHome ? 'text-black' : 'text-white'
            }`}>
              5<span className={`italic font-normal ${scrolled || !isHome ? 'text-crimson' : 'text-gold-light'}`}>:</span>7
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map(link => (
              <NavBtn key={link.section} label={link.label} scrolled={scrolled || !isHome}
                onClick={() => handleNavClick(link.section)} />
            ))}
            {/* Language toggle */}
            <button onClick={toggleLang} data-hover
              className={`text-[11px] tracking-[0.1em] font-bold px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                scrolled || !isHome
                  ? 'border-charcoal/20 text-black/70 hover:border-crimson hover:text-crimson'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}>
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link to="/reservation" data-hover
              className="px-5 py-2 bg-crimson text-white text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-crimson-dark transition-colors duration-300">
              {t('nav.billetterie')}
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden relative z-10" aria-label="Menu">
            <div className="flex flex-col gap-1.5">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : {}} className={`w-6 h-0.5 block ${mobileOpen || (!scrolled && isHome) ? 'bg-white' : 'bg-black'}`} />
              <motion.span animate={mobileOpen ? { opacity: 0 } : {}} className={`w-6 h-0.5 block ${mobileOpen || (!scrolled && isHome) ? 'bg-white' : 'bg-black'}`} />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : {}} className={`w-6 h-0.5 block ${mobileOpen || (!scrolled && isHome) ? 'bg-white' : 'bg-black'}`} />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 32px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button key={link.section}
                  onClick={() => handleNavClick(link.section)}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="text-3xl font-display font-semibold text-white hover:text-gold transition-colors cursor-pointer">
                  {link.label}
                </motion.button>
              ))}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }} className="mt-4 flex flex-col items-center gap-4">
                <Link to="/reservation" onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 bg-crimson text-white text-sm font-semibold tracking-wider uppercase">
                  {t('nav.billetterie')}
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="text-white/50 text-sm hover:text-white transition-colors">
                  {t('nav.connexion')}
                </Link>
                <button onClick={() => { toggleLang(); setMobileOpen(false) }}
                  className="text-gold text-sm font-bold tracking-wider cursor-pointer">
                  {lang === 'fr' ? 'English' : 'Francais'}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavBtn({ label, scrolled, onClick }) {
  return (
    <button onClick={onClick} data-hover
      className={`group relative text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-500 cursor-pointer ${
        scrolled ? 'text-black/70 hover:text-crimson' : 'text-white/70 hover:text-white'
      }`}>
      {label}
      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-crimson scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </button>
  )
}
