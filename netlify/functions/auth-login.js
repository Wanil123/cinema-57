import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from './lib/turso.js'

const JWT_SECRET = process.env.JWT_SECRET || 'festival57_secret_key_2025'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Courriel et mot de passe requis' }), { status: 400 })
    }

    const result = await db.execute({ sql: 'SELECT * FROM users WHERE email = ?', args: [email] })
    const user = result.rows[0]
    if (!user) {
      return new Response(JSON.stringify({ error: 'Courriel ou mot de passe invalide' }), { status: 401 })
    }

    const valid = bcrypt.compareSync(password, user.password)
    if (!valid) {
      return new Response(JSON.stringify({ error: 'Courriel ou mot de passe invalide' }), { status: 401 })
    }

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    return new Response(JSON.stringify({ user: payload, token }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}

export const config = { path: '/api/auth/login' }
