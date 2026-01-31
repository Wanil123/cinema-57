import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { news } from '../data/genres'
import { useTranslation } from '../contexts/LanguageContext'

export default function Actualites() {
  const { t, td } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="actualites" className="bg-ivory py-28 px-6">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-crimson" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson">{t('actualites.label')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{t('actualites.title')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.slice(0, 3).map((a, i) => (
            <motion.article key={a.id}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7 }} className="group">
              <Link to={`/article/${a.id}`} className="block">
                <div className="img-zoom rounded-xl aspect-[16/10] relative mb-5">
                  <img src={a.image} alt={td(a, 'title')} className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-[11px] font-semibold text-black">{td(a, 'date')}</span>
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold leading-tight mb-2 group-hover:text-crimson transition-colors duration-300">{td(a, 'title')}</h3>
                <p className="text-slate text-sm leading-relaxed mb-4">{td(a, 'text')}</p>
                <div className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-semibold text-crimson">
                  <span>{t('actualites.lire')}</span>
                  <span className="material-symbols-rounded text-sm group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
