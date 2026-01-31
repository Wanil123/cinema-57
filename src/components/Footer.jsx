import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../contexts/LanguageContext'

const socialLinks = [
  { name: 'Instagram', icon: 'photo_camera', url: '#' },
  { name: 'Facebook', icon: 'thumb_up', url: '#' },
  { name: 'TikTok', icon: 'music_note', url: '#' },
  { name: 'Twitter', icon: 'alternate_email', url: '#' },
]

export default function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const navLinks = [
    { label: t('nav.programmation'), section: 'programmation' },
    { label: t('footer.nav_films'), section: 'films' },
    { label: t('footer.nav_apropos'), section: 'apropos' },
    { label: t('nav.forfaits'), section: 'forfaits' },
    { label: t('nav.actualites'), section: 'actualites' },
    { label: t('nav.contact'), section: 'contact' },
  ]
  const handleNavClick = (section) => {
    if (isHome) { const el = document.getElementById(section); if (el) el.scrollIntoView({ behavior: 'smooth' }) }
    else { navigate(`/#${section}`) }
  }
  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-baseline gap-0.5 mb-4">
              <span className="font-display text-4xl font-bold tracking-tighter">5</span>
              <span className="font-display text-4xl font-bold tracking-tighter text-crimson">:</span>
              <span className="font-display text-4xl font-bold tracking-tighter">7</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{t('footer.tagline1')}<br />{t('footer.tagline2')}<br />{t('footer.tagline3')}</p>
            <div className="flex gap-3">
              {socialLinks.map(link => (
                <motion.a key={link.name} href={link.url} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-crimson hover:border-crimson transition-all duration-300" aria-label={link.name}>
                  <span className="material-symbols-rounded text-lg">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold mb-6">{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              {navLinks.map(item => (<li key={item.section}><button onClick={() => handleNavClick(item.section)} className="text-white/50 hover:text-white text-sm transition-all duration-300 hover:pl-2 cursor-pointer">{item.label}</button></li>))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold mb-6">{t('contact.label')}</h3>
            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-start gap-3"><span className="material-symbols-rounded text-crimson text-lg mt-0.5">location_on</span><div><p>2800 Ave du Cosmodome</p><p>Laval, QC H7T 2X1</p></div></div>
              <div className="flex items-center gap-3"><span className="material-symbols-rounded text-crimson text-lg">call</span><p>1-855-800-2114</p></div>
              <div className="flex items-center gap-3"><span className="material-symbols-rounded text-crimson text-lg">mail</span><p>infofestival@fdf.ca</p></div>
            </div>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold mb-6">{t('footer.infolettre')}</h3>
            <p className="text-white/50 text-sm mb-4">{t('footer.infolettre_text')}</p>
            <form onSubmit={e => e.preventDefault()} className="flex">
              <input type="email" placeholder={t('footer.courriel_placeholder')} className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-crimson transition-colors" />
              <button type="submit" className="bg-crimson px-4 rounded-r-lg hover:bg-crimson-dark transition-colors"><span className="material-symbols-rounded text-lg">arrow_forward</span></button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wider">&copy; 2025 5:7 Festival de Films. {t('footer.droits')}</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-white/30 text-xs tracking-wider hover:text-white transition-colors">{t('nav.connexion')}</Link>
            <Link to="/register" className="text-white/30 text-xs tracking-wider hover:text-white transition-colors">{t('nav.inscription')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
