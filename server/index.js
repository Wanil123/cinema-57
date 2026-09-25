import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from './db.js'
import { jwtSecret, validateAccount, validateReservation } from './security.js'

const app = express()
const PORT = process.env.PORT || 3005
const JWT_SECRET = jwtSecret()

app.use(express.json({ limit: '16kb' }))
app.use('/api', (_req, res, next) => { res.set('Cache-Control', 'no-store'); next() })

// ============ AUTH MIDDLEWARE ============
function auth(req, res, next) {
  const token = /^Bearer (\S+)$/i.exec(req.headers.authorization || '')?.[1]
  if (!token) return res.status(401).json({ error: 'Token requis' })
  try {
    const claims = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] })
    const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(claims.id)
    if (!user) return res.status(401).json({ error: 'Compte introuvable' })
    req.user = user
    next()
  } catch {
    res.status(401).json({ error: 'Token invalide' })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Acces admin requis' })
  next()
}

// ============ AUTH ROUTES ============
app.post('/api/auth/register', (req, res) => {
  const account = validateAccount(req.body, true)
  if (!account) return res.status(400).json({ error: 'Nom, courriel et mot de passe valide de 12 caracteres minimum requis' })
  const { name, email, password } = account

  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (exists) return res.status(400).json({ error: 'Ce courriel est deja utilise' })

  const hash = bcrypt.hashSync(password, 10)
  const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hash)
  const user = { id: result.lastInsertRowid, name, email, role: 'user' }
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' })
  res.json({ user, token })
})

app.post('/api/auth/login', (req, res) => {
  const account = validateAccount(req.body)
  if (!account) return res.status(400).json({ error: 'Courriel et mot de passe invalides' })
  const { email, password } = account

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) return res.status(401).json({ error: 'Courriel ou mot de passe invalide' })

  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Courriel ou mot de passe invalide' })

  const payload = { id: user.id, name: user.name, email: user.email, role: user.role }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  res.json({ user: payload, token })
})

app.get('/api/auth/me', auth, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id)
  res.json(user)
})

// ============ FILMS ROUTES ============
app.get('/api/films', (req, res) => {
  const films = db.prepare('SELECT * FROM films ORDER BY id DESC').all()
  res.json(films)
})

app.get('/api/films/:id', (req, res) => {
  const film = db.prepare('SELECT * FROM films WHERE id = ?').get(req.params.id)
  if (!film) return res.status(404).json({ error: 'Film introuvable' })
  res.json(film)
})

app.post('/api/films', auth, adminOnly, (req, res) => {
  const { title, genre, year, rating, director, duration, synopsis, horaire, country, language, subtitle, trailer, image } = req.body
  const result = db.prepare(
    'INSERT INTO films (title, genre, year, rating, director, duration, synopsis, horaire, country, language, subtitle, trailer, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(title, genre, year, rating, director, duration, synopsis, horaire, country || 'Etats-Unis', language || 'Anglais', subtitle || 'Francais', trailer, image)
  res.json({ id: result.lastInsertRowid, ...req.body })
})

app.put('/api/films/:id', auth, adminOnly, (req, res) => {
  const { title, genre, year, rating, director, duration, synopsis, horaire, country, language, subtitle, trailer, image } = req.body
  db.prepare(
    'UPDATE films SET title=?, genre=?, year=?, rating=?, director=?, duration=?, synopsis=?, horaire=?, country=?, language=?, subtitle=?, trailer=?, image=? WHERE id=?'
  ).run(title, genre, year, rating, director, duration, synopsis, horaire, country, language, subtitle, trailer, image, req.params.id)
  res.json({ id: Number(req.params.id), ...req.body })
})

app.delete('/api/films/:id', auth, adminOnly, (req, res) => {
  db.prepare('DELETE FROM films WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

// ============ NEWS ROUTES ============
app.get('/api/news', (req, res) => {
  const articles = db.prepare('SELECT * FROM news ORDER BY id DESC').all()
  res.json(articles)
})

app.get('/api/news/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id)
  if (!article) return res.status(404).json({ error: 'Article introuvable' })
  res.json(article)
})

app.post('/api/news', auth, adminOnly, (req, res) => {
  const { title, text, content, date, image } = req.body
  const result = db.prepare('INSERT INTO news (title, text, content, date, image) VALUES (?, ?, ?, ?, ?)').run(title, text, content, date, image)
  res.json({ id: result.lastInsertRowid, ...req.body })
})

app.put('/api/news/:id', auth, adminOnly, (req, res) => {
  const { title, text, content, date, image } = req.body
  db.prepare('UPDATE news SET title=?, text=?, content=?, date=?, image=? WHERE id=?').run(title, text, content, date, image, req.params.id)
  res.json({ id: Number(req.params.id), ...req.body })
})

app.delete('/api/news/:id', auth, adminOnly, (req, res) => {
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

// ============ MEMBERS ROUTES ============
app.get('/api/members', auth, adminOnly, (req, res) => {
  const members = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC').all()
  res.json(members)
})

app.delete('/api/members/:id', auth, adminOnly, (req, res) => {
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.params.id)
  if (user?.role === 'admin') return res.status(400).json({ error: 'Impossible de supprimer un admin' })
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

// ============ RESERVATIONS ROUTES ============
app.get('/api/reservations', auth, adminOnly, (req, res) => {
  const reservations = db.prepare(`
    SELECT r.*, f.title as film_title
    FROM reservations r
    LEFT JOIN films f ON r.film_id = f.id
    ORDER BY r.id DESC
  `).all()
  res.json(reservations)
})

app.post('/api/reservations', (req, res) => {
  const reservation = validateReservation(req.body)
  if (!reservation) return res.status(400).json({ error: 'Reservation invalide' })
  const { name, email, phone, filmId, forfaitId, quantity, total } = reservation

  const result = db.prepare(
    'INSERT INTO reservations (name, email, phone, film_id, forfait_id, quantity, total) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(name, email, phone, filmId, forfaitId, quantity, total)
  res.json({ id: result.lastInsertRowid, total })
})

// ============ START ============
app.listen(PORT, () => {
  console.log(`5:7 Festival API running on http://localhost:${PORT}`)
})
