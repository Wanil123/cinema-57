import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '../contexts/LanguageContext'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [focused, setFocused] = useState(null)

  return (
    <section id="contact" className="bg-charcoal text-white py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />
      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[1px] bg-gold" />
                <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-gold">{t('contact.label')}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
                {t('contact.title_line1')}<br /><span className="text-crimson">{t('contact.title_line2')}</span>
              </h2>
            </motion.div>
            <motion.form initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }} className="space-y-5" onSubmit={e => e.preventDefault()}>
              {[{ n: 'name', t: 'text', p: t('contact.nom') }, { n: 'email', t: 'email', p: t('contact.courriel') }].map((f, i) => (
                <motion.input key={f.n} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }} name={f.n} type={f.t} placeholder={f.p}
                  onFocus={() => setFocused(f.n)} onBlur={() => setFocused(null)}
                  className={`w-full bg-white/5 border rounded-lg px-5 py-4 text-white placeholder-white/30 font-medium outline-none transition-all duration-300 ${focused === f.n ? 'border-crimson shadow-lg shadow-crimson/10' : 'border-white/10'}`} />
              ))}
              <motion.textarea initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }} name="message" placeholder={t('contact.message')} rows={5}
                onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                className={`w-full bg-white/5 border rounded-lg px-5 py-4 text-white placeholder-white/30 font-medium outline-none resize-none transition-all duration-300 ${focused === 'msg' ? 'border-crimson shadow-lg shadow-crimson/10' : 'border-white/10'}`} />
              <motion.button initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 }} type="submit" data-hover whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors duration-300">
                {t('contact.envoyer')}
              </motion.button>
            </motion.form>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }} className="hidden lg:flex justify-between mt-12 text-sm">
              <div><h4 className="font-semibold mb-1">{t('contact.billetterie')}</h4><p className="text-white/40">2800 Ave du Cosmodome, Laval</p></div>
              <div><h4 className="font-semibold mb-1">{t('contact.informations')}</h4><p className="text-white/40">1-855-800-2114</p><p className="text-white/40">infofestival@fdf.ca</p></div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 1 }}>
            <div className="rounded-2xl overflow-hidden h-full min-h-[400px] shadow-2xl">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.3370150356477!2d-73.74487212372057!3d45.56366097107567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc923c5e3589ec1%3A0x8a14f3982c7c6084!2sCin%C3%A9plex%20Laval!5e0!3m2!1sfr!2sca!4v1727965252978!5m2!1sfr!2sca"
                className="w-full h-full border-0 min-h-[400px]" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
