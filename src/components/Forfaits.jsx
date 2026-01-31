import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { forfaits } from '../data/genres'
import { useTranslation } from '../contexts/LanguageContext'

export default function Forfaits() {
  const { t, td } = useTranslation()
  const ref = useRef(null)
  const navigate = useNavigate()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="forfaits" className="bg-black py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[200px]" />
      <div ref={ref} className="max-w-[1100px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold">{t('forfaits.label')}</span>
            <div className="w-10 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">{t('forfaits.title')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forfaits.map((f, i) => (
            <motion.div key={f.id}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.7 }}
              className={`relative rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 ${f.popular ? 'bg-crimson border-crimson text-white' : 'bg-white/5 border-white/10 text-white hover:border-gold/40'}`}>
              {f.popular && (<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-black text-[10px] font-bold tracking-wider uppercase rounded-full">{t('forfaits.populaire')}</div>)}
              <h3 className="font-display text-2xl font-bold mb-2">{td(f, 'title')}</h3>
              <div className="flex items-baseline gap-1 mb-4"><span className="font-display text-5xl font-bold">{f.price}</span><span className="text-sm opacity-60">$</span></div>
              <p className={`text-sm mb-6 leading-relaxed ${f.popular ? 'text-white/80' : 'text-white/50'}`}>{td(f, 'desc')}</p>
              <ul className="space-y-3 mb-8">
                {(td(f, 'features') || f.features).map((feat, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm">
                    <span className={`material-symbols-rounded text-sm ${f.popular ? 'text-gold' : 'text-crimson'}`}>check</span>{feat}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/reservation')} data-hover className={`w-full py-3.5 rounded-lg font-semibold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${f.popular ? 'bg-white text-crimson hover:bg-gold hover:text-black' : 'bg-white/10 text-white border border-white/20 hover:bg-crimson hover:border-crimson'}`}>{t('forfaits.reserver')}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
