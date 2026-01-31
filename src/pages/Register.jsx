import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../contexts/LanguageContext'

export default function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.password_confirmation) {
      setError(t('register.passwordMismatch'))
      return
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/')
      } else {
        setError(data.error || t('register.error'))
      }
    } catch {
      setError(t('register.serverError'))
    }
  }

  return (
    <>
      <Header />
      <main className="bg-ivory min-h-screen pt-32 pb-20 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-[420px] mx-auto">
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-crimson font-semibold text-sm tracking-wider uppercase hover:gap-3 transition-all mb-8 cursor-pointer">
            <span className="material-symbols-rounded text-lg">arrow_back</span>
            {t('register.back')}
          </button>
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold tracking-tight mb-2">{t('register.title')}</h1>
            <p className="text-slate text-sm">{t('register.subtitle')}</p>
          </div>

          {error && (
            <div className="bg-crimson/10 border border-crimson/20 text-crimson text-sm rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('register.name')}</label>
              <input name="name" type="text" required value={form.name} onChange={handleChange}
                placeholder="Jean Tremblay"
                className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('register.email')}</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="ton@courriel.com"
                className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('register.password')}</label>
              <input name="password" type="password" required value={form.password} onChange={handleChange}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" minLength={6}
                className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('register.confirmPassword')}</label>
              <input name="password_confirmation" type="password" required value={form.password_confirmation} onChange={handleChange}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" minLength={6}
                className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
            </div>
            <button type="submit"
              className="w-full py-3.5 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors">
              {t('register.submit')}
            </button>
          </form>

          <p className="text-center text-sm text-slate mt-8">
            {t('register.hasAccount')}{' '}
            <Link to="/login" className="text-crimson font-semibold hover:underline">{t('register.login')}</Link>
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
