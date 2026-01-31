import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FilmDetail from './pages/FilmDetail'
import ArticleDetail from './pages/ArticleDetail'
import Reservation from './pages/Reservation'
import Login from './pages/Login'
import Register from './pages/Register'
import GenrePage from './pages/GenrePage'
import Admin from './pages/Admin'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/:filmId" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
