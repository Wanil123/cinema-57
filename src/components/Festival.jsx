import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from '../contexts/LanguageContext'

export default function Festival() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="apropos" className="bg-cream py-28 px-6 overflow-hidden">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}>
            <motion.div style={{ y: imgY }} className="relative">
              <div className="img-zoom rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1000&fit=crop&q=80"
                  alt="Festival cinema" className="w-full h-full object-cover" />
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 hidden lg:block">
                <div className="text-3xl font-display font-bold text-crimson">50+</div>
                <div className="text-xs text-slate tracking-wider uppercase mt-1">{t('festival.films_presentes')}</div>
              </motion.div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-crimson/10 rounded-full -z-10" />
            </motion.div>
          </motion.div>
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[1px] bg-gold" />
                <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold">{t('festival.label')}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                {t('festival.title_line1')} <br />{t('festival.title_line2')} <span className="text-shimmer">{t('festival.title_accent')}</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }} className="space-y-4 mb-10">
              <p className="text-slate text-base leading-relaxed">
                {t('festival.p1')} <strong className="text-black">{t('festival.drame')}</strong>,
                {' '}<strong className="text-black">{t('festival.comedie')}</strong>, <strong className="text-black">{t('festival.action')}</strong>,
                {' '}<strong className="text-black">{t('festival.scifi')}</strong>{' '}
                <strong className="text-black">{t('festival.horreur')}</strong>.
              </p>
              <p className="text-slate text-base leading-relaxed">{t('festival.p2')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mb-10 py-8 border-y border-light-grey">
              {[{ n: '5', l: t('festival.jours') }, { n: '5', l: t('festival.genres') }, { n: '50+', l: 'Films' }].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-3xl font-bold text-crimson">{s.n}</div>
                  <div className="text-xs text-slate tracking-wider uppercase mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
            <motion.a href="#forfaits" data-hover
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="btn-fill inline-flex items-center gap-3 px-8 py-4 bg-crimson text-white text-sm tracking-wider uppercase font-medium hover:text-white transition-colors">
              <span className="relative z-10">{t('festival.cta')}</span>
              <span className="material-symbols-rounded text-lg relative z-10">arrow_forward</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
