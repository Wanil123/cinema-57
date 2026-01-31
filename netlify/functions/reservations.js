import db from './lib/turso.js'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const { name, email, phone, filmId, forfaitId, quantity } = await req.json()
    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Nom et courriel requis' }), { status: 400 })
    }

    const forfaitPrices = { 1: 45, 2: 120, 3: 250 }
    const price = forfaitPrices[forfaitId] || 0
    const total = `${price * (quantity || 1)}$`

    const result = await db.execute({
      sql: 'INSERT INTO reservations (name, email, phone, film_id, forfait_id, quantity, total) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [name, email, phone || null, filmId || null, forfaitId || null, quantity || 1, total]
    })

    return new Response(JSON.stringify({ id: Number(result.lastInsertRowid), total }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  }
}

export const config = { path: '/api/reservations' }
