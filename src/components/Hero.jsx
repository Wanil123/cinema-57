import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { useTranslation } from '../contexts/LanguageContext'
export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 250])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1])
  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = titleRef.current
      if (!el) return
      const text = el.textContent
      el.innerHTML = ''
      text.split('').forEach(char => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(100px) rotateX(-60deg)'
        el.appendChild(span)
      })
      gsap.to(el.children, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1.2, stagger: 0.025,
        ease: 'power4.out', delay: 0.6
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop&q=80"
          alt="Cinema"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      </motion.div>
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-[1400px] mx-auto w-full px-6 pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-[1px] bg-gold" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">{t('hero.date')}</span>
        </motion.div>
        <h1 ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-bold text-white leading-[0.9] tracking-tight mb-6 max-w-4xl"
        >
          {t('hero.title')}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-lg sm:text-xl text-white/60 max-w-lg mb-10 font-light leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <button onClick={() => document.getElementById('programmation')?.scrollIntoView({ behavior: 'smooth' })} data-hover
            className="btn-fill inline-flex items-center gap-3 px-8 py-4 bg-crimson text-white font-medium text-sm tracking-wider uppercase transition-colors duration-500 hover:text-white cursor-pointer">
            <span className="relative z-10">{t('hero.cta1')}</span>
            <span className="material-symbols-rounded text-lg relative z-10">arrow_forward</span>
          </button>
          <button onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })} data-hover
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium text-sm tracking-wider uppercase hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <span>{t('hero.cta2')}</span>
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap gap-3 mt-16"
        >
          {[
            { name: t('hero.action'), color: '#B91C3A' },
            { name: t('hero.drame'), color: '#D4A853' },
            { name: t('hero.scifi'), color: '#2A7B6F' },
            { name: t('hero.horreur'), color: '#6B2D3E' },
            { name: t('hero.comedie'), color: '#E8C97A' },
          ].map((g, i) => (
            <motion.span key={g.name}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1 + i * 0.08 }}
              className="px-4 py-2 text-[11px] font-semibold text-white tracking-[0.15em] uppercase rounded-full border border-white/15"
              style={{ background: g.color + '30', borderColor: g.color + '50' }}
            >
              {g.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent to-gold" />
      </motion.div>
    </section>
  )
}
