import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { genres, films } from '../data/genres'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../contexts/LanguageContext'

export default function GenrePage() {
  const { genreId } = useParams()
  const navigate = useNavigate()
  const { t, td } = useTranslation()
  const genre = genres.find(g => g.id === Number(genreId))
  const genreFilms = films.filter(f => f.genre === genre?.title)

  useEffect(() => { window.scrollTo(0, 0) }, [genreId])

  if (!genre) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-charcoal flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-white mb-4">{t('genrePage.notFound')}</h1>
            <Link to="/" className="text-crimson hover:underline">{t('genrePage.backHome')}</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="bg-charcoal min-h-screen pt-24">
        <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
          <img src={genre.image} alt={td(genre, 'title')} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-black/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto w-full px-6 pb-12">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <button onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-white/70 font-semibold text-sm tracking-wider uppercase hover:text-white hover:gap-3 transition-all mb-6 cursor-pointer">
                  <span className="material-symbols-rounded text-lg">arrow_back</span>
                  {t('genrePage.back')}
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase text-white rounded-full"
                    style={{ background: genre.color }}>
                    {td(genre, 'date')}
                  </span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
                  {td(genre, 'title')}
                </h1>
                <p className="text-white/60 text-lg max-w-lg">{td(genre, 'description')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-10">
            <div className="w-10 h-[1px]" style={{ background: genre.color }} />
            <span className="text-[11px] tracking-[0.3em] uppercase font-medium" style={{ color: genre.color }}>
              {genreFilms.length} {t('genrePage.films')}
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {genreFilms.map((film, i) => (
              <motion.div key={film.id}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}>
                <Link to={`/film/${film.id}`} className="group block">
                  <div className="img-zoom rounded-lg aspect-[2/3] relative mb-3">
                    <img src={film.image} alt={film.title} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3 bg-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {film.rating}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="material-symbols-rounded text-white text-2xl">play_arrow</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                        <span className="material-symbols-rounded text-xs">schedule</span>
                        {film.horaire}
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <span className="material-symbols-rounded text-xs">timer</span>
                        {film.duration}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white text-sm font-semibold leading-tight group-hover:text-gold transition-colors">{film.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/40 text-xs">{film.director}</span>
                    <span className="text-white/20 text-xs">&bull;</span>
                    <span className="text-white/40 text-xs">{film.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
