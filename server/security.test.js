import test from 'node:test'
import assert from 'node:assert/strict'
import { jwtSecret, validateAccount, validateReservation } from './security.js'

test('JWT secret absent ou ancien est refuse', () => {
  const original = process.env.JWT_SECRET
  try {
    delete process.env.JWT_SECRET
    assert.throws(jwtSecret)
    process.env.JWT_SECRET = 'ancien-secret-de-demonstration'
    assert.throws(jwtSecret)
    process.env.JWT_SECRET = 'a'.repeat(32)
    assert.equal(jwtSecret(), 'a'.repeat(32))
  } finally {
    if (original === undefined) delete process.env.JWT_SECRET
    else process.env.JWT_SECRET = original
  }
})

test('comptes: normalisation et limites bcrypt', () => {
  assert.equal(validateAccount({ email: ' A@B.C ', password: 'ok' }).email, 'a@b.c')
  assert.equal(validateAccount({ name: 'A', email: 'a@b.c', password: 'long-enough-password' }, true), null)
  assert.equal(validateAccount({ name: 'Admin', email: 'a@b.c', password: 'short' }, true), null)
  assert.equal(validateAccount({ name: 'Admin', email: 'a@b.c', password: 'é'.repeat(40) }, true), null)
})

test('reservation: aucun forfait gratuit ni quantite negative', () => {
  const input = { name: 'Client Exemple', email: 'CLIENT@example.com', filmId: null, forfaitId: 2, quantity: 3 }
  assert.equal(validateReservation(input).total, '360$')
  assert.equal(validateReservation(input).email, 'client@example.com')
  assert.equal(validateReservation({ ...input, forfaitId: 99 }), null)
  assert.equal(validateReservation({ ...input, quantity: -1 }), null)
  assert.equal(validateReservation({ ...input, quantity: 100 }), null)
  assert.equal(validateReservation({ ...input, filmId: 'not-a-film' }), null)
})
