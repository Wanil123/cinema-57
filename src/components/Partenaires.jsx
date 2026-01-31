import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '../contexts/LanguageContext'

const brands = ['A24 FILMS', 'NETFLIX', 'LOTO-QUEBEC', 'VILLE DE MONTREAL', 'SUPER ECRAN', 'TELEFILM CANADA', 'ONF', 'SODEC']

export default function Partenaires() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <section className="bg-ivory py-20 px-6 overflow-hidden">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-slate">{t('partenaires.label')}</span>
        </motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ivory to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ivory to-transparent z-10" />
          <div className="overflow-hidden">
            <div className="marquee-track flex items-center gap-20 w-max">
              {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
                <span key={`${b}-${i}`} className="text-lg font-display font-bold text-charcoal/40 hover:text-crimson transition-colors duration-500 whitespace-nowrap cursor-default tracking-wider" data-hover>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
