import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from './lib/turso.js'
import { jwtSecret, validateAccount } from '../../server/security.js'

const JWT_SECRET = jwtSecret()

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const account = validateAccount(await req.json(), true)
    if (!account) {
      return new Response(JSON.stringify({ error: 'Nom, courriel et mot de passe valide de 12 caracteres minimum requis' }), { status: 400 })
    }
    const { name, email, password } = account

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
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}

export const config = { path: '/api/auth/register' }
