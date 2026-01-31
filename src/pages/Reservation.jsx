import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { films, forfaits } from '../data/genres'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../contexts/LanguageContext'

export default function Reservation() {
  const { filmId } = useParams()
  const navigate = useNavigate()
  const { t, td, lang } = useTranslation()

  useEffect(() => { window.scrollTo(0, 0) }, [])
  const film = filmId ? films.find(f => f.id === Number(filmId)) : null
  const [step, setStep] = useState(1)
  const [selectedForfait, setSelectedForfait] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', quantity: 1 })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          filmId: film?.id || null,
          forfaitId: selectedForfait,
        })
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true)
    }
  }

  const ticketLabel = (n) => {
    if (lang === 'en') return n === 1 ? '1 ticket' : n + ' tickets'
    return n === 1 ? '1 billet' : n + ' billets'
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="bg-ivory min-h-screen pt-32 pb-20 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-[600px] mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-rounded text-green-600 text-4xl">check_circle</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">{t('reservation.confirmed')}</h1>
            <p className="text-slate text-lg mb-2">{t('reservation.thanks')} <strong>{form.name}</strong>, {t('reservation.registered')}</p>
            {film && <p className="text-slate mb-8">{t('reservation.filmLabel')} : <strong>{film.title}</strong> — {film.horaire}</p>}
            <p className="text-slate text-sm mb-8">{t('reservation.emailConfirm')} <strong>{form.email}</strong></p>
            <Link to="/" className="btn-fill inline-flex items-center gap-3 px-8 py-4 bg-crimson text-white font-medium text-sm tracking-wider uppercase hover:text-white">
              <span className="relative z-10">{t('reservation.backHome')}</span>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  const steps = [t('reservation.stepForfait'), t('reservation.stepInfo'), t('reservation.stepConfirm')]

  return (
    <>
      <Header />
      <main className="bg-ivory min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-crimson font-semibold text-sm tracking-wider uppercase hover:gap-3 transition-all mb-8 cursor-pointer">
              <span className="material-symbols-rounded text-lg">arrow_back</span>
              {t('reservation.back')}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-crimson" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson">{t('reservation.title')}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {film ? `${t('reservation.reserveFor')} — ${film.title}` : t('reservation.reserveTickets')}
            </h1>
            {film && (
              <p className="text-slate mb-10">{td(film, 'genre')} — {film.duration} — {t('reservation.showtime')} {film.horaire}</p>
            )}
          </motion.div>

          {/* Steps */}
          <div className="flex items-center gap-4 mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-crimson text-white' : 'bg-charcoal/10 text-slate'
                }`}>
                  {step > i + 1 ? <span className="material-symbols-rounded text-sm">check</span> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-black' : 'text-slate'}`}>{s}</span>
                {i < 2 && <div className="w-8 h-[1px] bg-charcoal/15" />}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {forfaits.map(f => (
                <button key={f.id} onClick={() => { setSelectedForfait(f.id); setStep(2) }}
                  className={`text-left p-6 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                    f.popular ? 'border-crimson bg-crimson/5' : 'border-charcoal/10 hover:border-gold'
                  }`}>
                  {f.popular && (
                    <span className="inline-block px-3 py-0.5 bg-crimson text-white text-[10px] font-bold tracking-wider uppercase rounded-full mb-3">{t('reservation.popular')}</span>
                  )}
                  <h3 className="font-display text-xl font-bold mb-1">{td(f, 'title')}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-display text-3xl font-bold">{f.price}</span>
                    <span className="text-slate text-sm">$</span>
                  </div>
                  <p className="text-slate text-sm mb-4">{td(f, 'desc')}</p>
                  <ul className="space-y-2">
                    {(lang === 'en' && f.features_en ? f.features_en : f.features).map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-slate">
                        <span className="material-symbols-rounded text-crimson text-sm">check</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              onSubmit={(e) => { e.preventDefault(); setStep(3) }}
              className="max-w-[500px] space-y-5">
              {[
                { name: 'name', type: 'text', label: t('reservation.fullName'), placeholder: 'Jean Tremblay' },
                { name: 'email', type: 'email', label: t('reservation.emailLabel'), placeholder: 'jean@exemple.com' },
                { name: 'phone', type: 'tel', label: t('reservation.phone'), placeholder: '514-555-0123' },
              ].map(f => (
                <div key={f.name}>
                  <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} required
                    value={form[f.name]} onChange={handleChange}
                    className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
                </div>
              ))}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('reservation.nbTickets')}</label>
                <select name="quantity" value={form.quantity} onChange={handleChange}
                  className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson transition-all">
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{ticketLabel(n)}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-charcoal/20 rounded-lg text-sm font-semibold hover:bg-charcoal/5 transition-colors">
                  {t('reservation.back')}
                </button>
                <button type="submit"
                  className="flex-1 py-3.5 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors">
                  {t('reservation.continue')}
                </button>
              </div>
            </motion.form>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="max-w-[500px]">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-charcoal/10 mb-8">
                <h3 className="font-display text-xl font-bold mb-6">{t('reservation.summary')}</h3>
                <div className="space-y-4 text-sm">
                  {film && (
                    <div className="flex justify-between py-2 border-b border-charcoal/10">
                      <span className="text-slate">{t('reservation.filmLabel')}</span>
                      <span className="font-semibold">{film.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-slate">{t('reservation.stepForfait')}</span>
                    <span className="font-semibold">{td(forfaits.find(f => f.id === selectedForfait) || {}, 'title')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-slate">{t('reservation.nameLabel')}</span>
                    <span className="font-semibold">{form.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-slate">{t('reservation.emailLabel')}</span>
                    <span className="font-semibold">{form.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-slate">{t('reservation.tickets')}</span>
                    <span className="font-semibold">{form.quantity}</span>
                  </div>
                  <div className="flex justify-between py-3 text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-display font-bold text-crimson">
                      {(forfaits.find(f => f.id === selectedForfait)?.price || 0) * form.quantity}$
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(2)}
                  className="px-6 py-3.5 border border-charcoal/20 rounded-lg text-sm font-semibold hover:bg-charcoal/5 transition-colors">
                  {t('reservation.modify')}
                </button>
                <button onClick={handleSubmit}
                  className="flex-1 py-3.5 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors">
                  {t('reservation.confirm')}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
