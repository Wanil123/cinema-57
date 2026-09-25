import bcrypt from 'bcryptjs'
import db from './db.js'
import { validateAccount } from './security.js'

const account = validateAccount({
  name: process.env.ADMIN_NAME || 'Administrateur',
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
}, true)

if (!account) {
  console.error('Definir ADMIN_EMAIL et ADMIN_PASSWORD (12 a 72 octets) dans les variables d environnement.')
  process.exit(1)
}

const hash = bcrypt.hashSync(account.password, 12)
const legacy = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@fdf.ca')
const existing = db.prepare('SELECT id, role FROM users WHERE email = ?').get(account.email)
if (legacy && existing && legacy.id !== existing.id) {
  console.error('Email deja utilise par un autre compte. Aucune modification.')
  process.exit(1)
}
if (!legacy && existing?.role !== 'admin' && existing) {
  console.error('Email deja utilise par un compte non administrateur. Aucune modification.')
  process.exit(1)
}
if (legacy || existing) {
  db.prepare('UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?').run(account.name, account.email, hash, 'admin', (legacy || existing).id)
} else {
  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(account.name, account.email, hash, 'admin')
}
console.log('Compte administrateur configure; aucun identifiant affiche.')
