import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from './lib/turso.js'

const JWT_SECRET = process.env.JWT_SECRET || 'festival57_secret_key_2025'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 })
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Mot de passe trop court (min 6 caracteres)' }), { status: 400 })
    }

    const exists = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: [email] })
    if (exists.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Ce courriel est deja utilise' }), { status: 400 })
    }

    const hash = bcrypt.hashSync(password, 10)
    const result = await db.execute({
      sql: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      args: [name, email, hash]
    })

    const user = { id: Number(result.lastInsertRowid), name, email, role: 'user' }
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' })

    return new Response(JSON.stringify({ user, token }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}

export const config = { path: '/api/auth/register' }
