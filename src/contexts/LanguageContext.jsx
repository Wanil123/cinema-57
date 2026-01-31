import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

function getInitialLang() {
  const saved = localStorage.getItem('lang')
  if (saved === 'fr' || saved === 'en') return saved
  const browser = navigator.language || navigator.userLanguage || 'fr'
  return browser.startsWith('en') ? 'en' : 'fr'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang(l => l === 'fr' ? 'en' : 'fr')

  // t('nav.programmation') → nested key lookup
  const t = (key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      val = val?.[k]
    }
    return val || key
  }

  // td(item, 'title') → returns item.title_en if en, else item.title
  const td = (item, field) => {
    if (lang === 'en' && item[field + '_en']) return item[field + '_en']
    return item[field]
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, td }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
