import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'
import { validateAccount } from './server/security.js'

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.error('Definir TURSO_DATABASE_URL et TURSO_AUTH_TOKEN dans les variables d environnement.')
  process.exit(1)
}

const db = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN })

async function setup() {
  await db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)
  await db.execute(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    film_id INTEGER,
    forfait_id INTEGER,
    quantity INTEGER DEFAULT 1,
    total TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  if (ADMIN_EMAIL || ADMIN_PASSWORD || ADMIN_NAME) {
    const account = validateAccount({ name: ADMIN_NAME || 'Administrateur', email: ADMIN_EMAIL, password: ADMIN_PASSWORD }, true)
    if (!account) throw new Error('ADMIN_EMAIL, ADMIN_NAME et ADMIN_PASSWORD valides requis; mot de passe >= 12 caracteres et <= 72 octets')
    const hash = bcrypt.hashSync(account.password, 12)
    const legacy = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: ['admin@fdf.ca'] })
    if (legacy.rows.length > 0) {
      const collision = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: [account.email] })
      if (collision.rows.length > 0 && Number(collision.rows[0].id) !== Number(legacy.rows[0].id)) {
        throw new Error('Le nouvel email administrateur est deja utilise par un autre compte')
      }
      await db.execute({ sql: 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?', args: [account.name, account.email, hash, 'admin', legacy.rows[0].id] })
      console.log('Ancien compte administrateur de demonstration remplace.')
    } else {
      const existing = await db.execute({ sql: 'SELECT id, role FROM users WHERE email = ?', args: [account.email] })
      if (existing.rows.length > 0 && existing.rows[0].role !== 'admin') throw new Error('Cet email appartient deja a un compte non administrateur')
      if (existing.rows.length > 0) {
        await db.execute({ sql: 'UPDATE users SET name = ?, password = ? WHERE id = ?', args: [account.name, hash, existing.rows[0].id] })
      } else {
        await db.execute({ sql: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', args: [account.name, account.email, hash, 'admin'] })
      }
      console.log('Compte administrateur configure.')
    }
  }
  console.log('Schema Turso pret. Aucun secret affiche.')
}

setup().catch(() => {
  console.error('Configuration echouee. Verifier les variables, la connexion et les droits Turso.')
  process.exit(1)
})
