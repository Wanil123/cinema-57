import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { genres } from '../data/genres'
import { useTranslation } from '../contexts/LanguageContext'

export default function Programmation() {
  const { t, td } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="programmation" className="bg-ivory py-28 px-6">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-crimson" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson">{t('programmation.label')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('programmation.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {genres.map((g, i) => (
            <motion.article key={g.id}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="group"
            >
              <Link to={`/genre/${g.id}`} className="block">
                <div className="img-zoom rounded-lg aspect-[3/4] relative">
                  <img src={g.image} alt={td(g, 'title')} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white rounded-full mb-2"
                      style={{ background: g.color }}>
                      {td(g, 'date')}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">{td(g, 'title')}</h3>
                    <p className="text-white/60 text-xs mt-1 leading-relaxed">{td(g, 'description')}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-symbols-rounded text-white text-sm">arrow_forward</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
