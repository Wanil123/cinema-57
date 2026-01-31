import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../contexts/LanguageContext'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate(data.user.role === 'admin' ? '/admin' : '/')
      } else {
        setError(data.error || t('login.error'))
      }
    } catch {
      setError(t('login.serverError'))
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
            {t('login.back')}
          </button>
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold tracking-tight mb-2">{t('login.title')}</h1>
            <p className="text-slate text-sm">{t('login.subtitle')}</p>
          </div>

          {error && (
            <div className="bg-crimson/10 border border-crimson/20 text-crimson text-sm rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('login.email')}</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="ton@courriel.com"
                className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-slate block mb-2">{t('login.password')}</label>
              <input name="password" type="password" required value={form.password} onChange={handleChange}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                className="w-full border border-charcoal/15 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-crimson focus:shadow-lg focus:shadow-crimson/5 transition-all" />
            </div>
            <button type="submit"
              className="w-full py-3.5 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors">
              {t('login.submit')}
            </button>
          </form>

          <p className="text-center text-sm text-slate mt-8">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-crimson font-semibold hover:underline">{t('login.register')}</Link>
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
