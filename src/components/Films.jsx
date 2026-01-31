import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { films } from '../data/genres'
import { useTranslation } from '../contexts/LanguageContext'

export default function Films() {
  const { t, td } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const featured = films.slice(0, 6)

  return (
    <section id="films" className="bg-charcoal py-28 px-6 overflow-hidden">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-gold" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold">{t('films.label')}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {t('films.title')}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {featured.map((film, i) => (
            <motion.div key={film.id}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7 }}>
              <Link to={`/film/${film.id}`} className="group block">
                <div className="img-zoom rounded-lg aspect-[2/3] relative mb-3">
                  <img src={film.image} alt={film.title} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 bg-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded">{film.rating}</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="material-symbols-rounded text-white text-2xl">play_arrow</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-white text-sm font-semibold leading-tight group-hover:text-gold transition-colors">{film.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/40 text-xs">{td(film, 'genre')}</span>
                  <span className="text-white/20 text-xs">&bull;</span>
                  <span className="text-white/40 text-xs">{film.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
