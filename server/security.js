export function jwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret || Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('JWT_SECRET doit etre une valeur aleatoire privee d au moins 32 octets')
  }
  return secret
}

export function validateAccount(input, registration = false) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const password = input.password
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || typeof password !== 'string' || password.length > 128) return null
  if (!registration) return { email, password }
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  if (name.length < 2 || name.length > 100 || password.length < 12 || Buffer.byteLength(password, 'utf8') > 72) return null
  return { name, email, password }
}

export function validateReservation(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const phone = typeof input.phone === 'string' ? input.phone.trim() : ''
  const filmId = input.filmId === null || input.filmId === undefined ? null : Number(input.filmId)
  const forfaitId = Number(input.forfaitId)
  const quantity = Number(input.quantity)
  const prices = { 1: 45, 2: 120, 3: 250 }
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 30 ||
    (filmId !== null && (!Number.isSafeInteger(filmId) || filmId < 1)) || !Object.hasOwn(prices, forfaitId) ||
    !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 6) return null
  return { name, email, phone: phone || null, filmId, forfaitId, quantity, total: `${prices[forfaitId] * quantity}$` }
}
