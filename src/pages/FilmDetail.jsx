import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { films, genres } from '../data/genres'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../contexts/LanguageContext'

export default function FilmDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, td } = useTranslation()
  const film = films.find(f => f.id === Number(id))
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!film) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-charcoal flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-white mb-4">{t('filmDetail.notFound')}</h1>
            <Link to="/" className="text-crimson hover:underline">{t('filmDetail.backHome')}</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const genre = genres.find(g => g.title === film.genre)
  const relatedFilms = films.filter(f => f.genre === film.genre && f.id !== film.id).slice(0, 4)

  const getYouTubeId = (url) => {
    if (!url) return null
    const match = url.match(/(?:youtu\.be\/|watch\?v=)([^&]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYouTubeId(film.trailer)

  return (
    <>
      <Header />
      <main className="bg-charcoal min-h-screen pt-24">
        {/* Hero */}
        <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
          <img src={film.image} alt={film.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto w-full px-6 pb-12">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <button onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-white/70 font-semibold text-sm tracking-wider uppercase hover:text-white hover:gap-3 transition-all mb-6 cursor-pointer">
                  <span className="material-symbols-rounded text-lg">arrow_back</span>
                  {t('filmDetail.back')}
                </button>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {genre && (
                    <Link to={`/genre/${genre.id}`}
                      className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase text-white rounded-full hover:opacity-80 transition-opacity"
                      style={{ background: genre.color }}>
                      {td(film, 'genre')}
                    </Link>
                  )}
                  <span className="text-white/40 text-sm">{film.year}</span>
                  <span className="text-white/20">&bull;</span>
                  <span className="text-white/40 text-sm">{film.duration}</span>
                  <span className="text-white/20">&bull;</span>
                  <span className="text-white/40 text-sm">{film.rating} / 10</span>
                </div>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
                  {film.title}
                </h1>
                <p className="text-white/50 text-base sm:text-lg">{t('filmDetail.directedBy')} {film.director}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: synopsis + trailer */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson mb-6">{t('filmDetail.synopsis')}</h2>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10">{td(film, 'synopsis')}</p>
              </motion.div>

              {/* Trailer */}
              {youtubeId && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson mb-6">{t('filmDetail.trailer')}</h2>
                  {!showTrailer ? (
                    <button onClick={() => setShowTrailer(true)}
                      className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer">
                      <img src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt="Trailer" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-crimson rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="material-symbols-rounded text-white text-3xl sm:text-4xl ml-1">play_arrow</span>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <iframe src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right: info card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
                <h3 className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson mb-6">{t('filmDetail.details')}</h3>
                <div className="space-y-5">
                  {[
                    { icon: 'person', label: t('filmDetail.director'), value: film.director },
                    { icon: 'calendar_month', label: t('filmDetail.year'), value: film.year },
                    { icon: 'timer', label: t('filmDetail.duration'), value: film.duration },
                    { icon: 'star', label: t('filmDetail.rating'), value: film.rating + ' / 10' },
                    { icon: 'schedule', label: t('filmDetail.showtime'), value: film.horaire },
                    { icon: 'public', label: t('filmDetail.country'), value: td(film, 'country') },
                    { icon: 'translate', label: t('filmDetail.language'), value: td(film, 'language') },
                    { icon: 'subtitles', label: t('filmDetail.subtitles'), value: td(film, 'subtitle') },
                  ].map(info => (
                    <div key={info.label} className="flex items-start gap-3">
                      <span className="material-symbols-rounded text-white/30 text-lg mt-0.5">{info.icon}</span>
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider">{info.label}</div>
                        <div className="text-white text-sm font-medium">{info.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to={`/reservation/${film.id}`}
                  className="btn-fill mt-8 w-full flex items-center justify-center gap-3 px-6 py-4 bg-crimson text-white font-medium text-sm tracking-wider uppercase hover:text-white">
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-rounded text-lg">confirmation_number</span>
                    {t('filmDetail.reserve')}
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Related films */}
          {relatedFilms.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="mt-16 sm:mt-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-crimson" />
                <span className="text-[11px] tracking-[0.3em] uppercase font-medium text-crimson">{t('filmDetail.related')}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {relatedFilms.map(f => (
                  <Link to={`/film/${f.id}`} key={f.id} className="group">
                    <div className="img-zoom rounded-lg aspect-[2/3] relative mb-3">
                      <img src={f.image} alt={f.title} className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 right-3 bg-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded">{f.rating}</div>
                    </div>
                    <h4 className="text-white text-sm font-semibold group-hover:text-gold transition-colors">{f.title}</h4>
                    <span className="text-white/40 text-xs">{f.director} &bull; {f.year}</span>
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
