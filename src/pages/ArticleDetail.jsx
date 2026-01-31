import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { news } from '../data/genres'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../contexts/LanguageContext'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, td } = useTranslation()
  const article = news.find(a => a.id === Number(id))

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!article) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-ivory flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold mb-4">{t('articleDetail.notFound')}</h1>
            <Link to="/" className="text-crimson hover:underline">{t('articleDetail.backHome')}</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const otherNews = news.filter(n => n.id !== article.id)

  return (
    <>
      <Header />
      <main className="bg-ivory min-h-screen pt-24">
        {/* Hero */}
        <section className="relative h-[50vh] overflow-hidden">
          <img src={article.image} alt={td(article, 'title')} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-black/30 to-transparent" />
        </section>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-6 -mt-20 relative z-10 pb-20">
          <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg">
              <span className="text-xs font-semibold text-black">{td(article, 'date')}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {td(article, 'title')}
            </h1>
            <p className="text-lg text-slate leading-relaxed mb-8 font-medium">
              {td(article, 'text')}
            </p>
            <div className="w-16 h-[2px] bg-crimson mb-8" />
            <div className="prose-custom">
              {td(article, 'content').split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-slate text-base leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-8 border-t border-light-grey">
              <button onClick={() => navigate(-1)} data-hover
                className="inline-flex items-center gap-2 text-crimson font-semibold text-sm tracking-wider uppercase hover:gap-3 transition-all cursor-pointer">
                <span className="material-symbols-rounded text-lg">arrow_back</span>
                {t('articleDetail.back')}
              </button>
              <div className="flex items-center gap-3">
                <span className="text-slate text-xs uppercase tracking-wider">{t('articleDetail.share')}</span>
                {['share', 'mail', 'link'].map(icon => (
                  <button key={icon}
                    className="w-9 h-9 rounded-full bg-charcoal/5 flex items-center justify-center hover:bg-crimson hover:text-white text-slate transition-all duration-300">
                    <span className="material-symbols-rounded text-sm">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.article>

          {otherNews.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }} className="mt-20">
              <h3 className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson mb-8">{t('articleDetail.otherNews')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherNews.map(n => (
                  <Link to={`/article/${n.id}`} key={n.id} className="group">
                    <div className="img-zoom rounded-xl aspect-[16/10] relative mb-4">
                      <img src={n.image} alt={td(n, 'title')} className="w-full h-full object-cover rounded-xl" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-[11px] font-semibold text-black">{td(n, 'date')}</span>
                      </div>
                    </div>
                    <h4 className="font-display text-lg font-bold group-hover:text-crimson transition-colors">{td(n, 'title')}</h4>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
