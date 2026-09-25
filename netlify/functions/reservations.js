import db from './lib/turso.js'
import { validateReservation } from '../../server/security.js'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const reservation = validateReservation(await req.json())
    if (!reservation) {
      return new Response(JSON.stringify({ error: 'Reservation invalide' }), { status: 400 })
    }
    const { name, email, phone, filmId, forfaitId, quantity, total } = reservation

    const result = await db.execute({
      sql: 'INSERT INTO reservations (name, email, phone, film_id, forfait_id, quantity, total) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [name, email, phone, filmId, forfaitId, quantity, total]
    })

    return new Response(JSON.stringify({ id: Number(result.lastInsertRowid), total }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}

export const config = { path: '/api/reservations' }
