import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'

const TURSO_DATABASE_URL = process.argv[2]
const TURSO_AUTH_TOKEN = process.argv[3]

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.log('Usage: node setup-turso.js <TURSO_DATABASE_URL> <TURSO_AUTH_TOKEN>')
  console.log('Example: node setup-turso.js libsql://festival57-xxx.turso.io eyJhbGci...')
  process.exit(1)
}

const db = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN })

async function setup() {
  console.log('Connexion a Turso...')

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('Table users creee.')

  await db.execute(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      film_id INTEGER,
      forfait_id INTEGER,
      quantity INTEGER DEFAULT 1,
      total TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('Table reservations creee.')

  const existing = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: ['admin@fdf.ca'] })
  if (existing.rows.length === 0) {
    const hash = bcrypt.hashSync('admin123', 10)
    await db.execute({
      sql: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      args: ['Admin', 'admin@fdf.ca', hash, 'admin']
    })
    console.log('Admin cree: admin@fdf.ca / admin123')
  } else {
    console.log('Admin existe deja.')
  }

  console.log('\nSetup termine! Ajoute ces variables dans Netlify:')
  console.log(`  TURSO_DATABASE_URL = ${TURSO_DATABASE_URL}`)
  console.log(`  TURSO_AUTH_TOKEN = ${TURSO_AUTH_TOKEN}`)
  console.log('  JWT_SECRET = festival57_secret_key_2025')
}

setup().catch(err => {
  console.error('Erreur:', err.message)
  process.exit(1)
})
