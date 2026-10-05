import express from 'express'
import cors from 'cors'
import { randomUUID, scryptSync } from 'crypto'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { ALL_HOTELS } from '../src/experiment1/data/hotels.js'

const app = express()
app.use(cors(), express.json())
app.use((req, res, next) => setTimeout(next, 500)) // fake latency so loading states are visible

const TTL = 5 * 60 * 1000 // token life. Use 20 * 1000 to demo "session expired"
const FILE = new URL('./db.json', import.meta.url) // users + reservations saved here
const db = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : { users: {}, reservations: [], nextId: 1 }
const save = () => writeFileSync(FILE, JSON.stringify(db, null, 2))
const sessions = {} // token -> { email, exp }
const hash = (pw, email) => scryptSync(pw, email, 32).toString('hex')
const find = (id) => ALL_HOTELS.find((h) => h.id === +id)

const available = (id, inD, outD) => {
  if (!inD || !outD) return true
  let h = 0
  for (const c of `${id}-${inD}-${outD}`) h = (h * 31 + c.charCodeAt(0)) % 1000
  return h % 10 !== 0
}
const alias = { bangalore: 'bengaluru', bengaluru: 'bangalore' }
const matches = (h, q) =>
  q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => {
    const text = `${h.name} ${h.location}`.toLowerCase()
    return text.includes(w) || text.includes(alias[w])
  })

// ---------- hotels (Experiment 1) ----------
app.get('/api/hotels', (req, res) => {
  const { location = '', checkIn, checkOut, minRating = 0, maxPrice = 99999, amenities = '' } = req.query
  const need = amenities ? amenities.split(',') : []
  res.json(ALL_HOTELS.filter((h) =>
    matches(h, location) && h.rating >= +minRating && h.pricePerNight <= +maxPrice &&
    need.every((a) => h.amenities.includes(a)) && available(h.id, checkIn, checkOut)))
})
app.get('/api/hotels/:id', (req, res) => {
  const h = find(req.params.id)
  h ? res.json(h) : res.status(404).json({ message: 'Hotel not found' })
})
app.get('/api/hotels/:id/rooms', (req, res) => {
  const h = find(req.params.id)
  h ? res.json(h.rooms) : res.status(404).json({ message: 'Hotel not found' })
})

// ---------- signup + login (Experiment 4a) ----------
const startSession = (res, u) => {
  const token = randomUUID()
  sessions[token] = { email: u.email, exp: Date.now() + TTL }
  res.json({ token, user: { email: u.email, firstName: u.firstName, lastName: u.lastName } })
}
app.post('/api/signup', (req, res) => {
  const { firstName = '', lastName = '', email = '', password = '' } = req.body
  const key = email.trim().toLowerCase()
  if (!key || password.length < 6) return res.status(400).json({ message: 'Invalid email or password' })
  if (db.users[key]) return res.status(409).json({ message: 'An account with this email already exists' })
  db.users[key] = { email: key, firstName, lastName, password: hash(password, key) }
  save()
  startSession(res, db.users[key])
})
app.post('/api/login', (req, res) => {
  const { email = '', password = '' } = req.body
  const u = db.users[email.trim().toLowerCase()]
  if (!u) return res.status(401).json({ message: 'No account found with this email. Please sign up.' })
  if (u.password !== hash(password, u.email)) return res.status(401).json({ message: 'Incorrect password for this email' })
  startSession(res, u)
})

// ---------- token check (Experiment 4d, 4f) ----------
app.use(['/api/reservations', '/api/payments'], (req, res, next) => {
  const s = sessions[(req.headers.authorization || '').replace('Bearer ', '')]
  if (!s) return res.status(401).json({ message: 'Unauthorized' })
  if (s.exp < Date.now()) return res.status(401).json({ message: 'Token expired' })
  req.user = s
  next()
})

// ---------- protected: payment + reservations CRUD (Experiment 3 + 4) ----------
app.post('/api/payments', (req, res) => res.json({ status: 'PAID' }))

const mine = (req) => db.reservations.find((r) => r.id === +req.params.id && r.owner === req.user.email)

app.get('/api/reservations', (req, res) =>
  res.json(db.reservations.filter((r) => r.owner === req.user.email).reverse()))

app.post('/api/reservations', (req, res) => {
  const r = {
    ...req.body, // owner / id below always win, so the client cannot fake them
    id: db.nextId++,
    owner: req.user.email,
    status: 'CONFIRMED',
    ref: `HS-${Math.floor(100000 + Math.random() * 900000)}`,
    bookedOn: new Date().toISOString(),
  }
  db.reservations.push(r)
  save()
  res.status(201).json(r)
})

app.put('/api/reservations/:id', (req, res) => {
  const r = mine(req)
  if (!r) return res.status(404).json({ message: 'Reservation not found' })
  const { guests, customer } = req.body
  if (guests !== undefined) {
    if (!(guests >= 1 && guests <= 4)) return res.status(400).json({ message: 'Guests must be between 1 and 4' })
    r.guests = guests
  }
  if (customer) r.customer = { ...r.customer, ...customer }
  save()
  res.json(r)
})

app.delete('/api/reservations/:id', (req, res) => {
  const r = mine(req)
  if (!r) return res.status(404).json({ message: 'Reservation not found' })
  db.reservations = db.reservations.filter((x) => x !== r)
  save()
  res.status(204).end()
})

app.listen(5000, () => console.log('API running on http://localhost:5000'))
