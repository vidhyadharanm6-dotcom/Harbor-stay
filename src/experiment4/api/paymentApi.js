import { api } from '@exp1/api/client.js'

// EXPERIMENT 4 (d): protected payment endpoint (needs a valid token)
export const payForBooking = (body) => api.post('/payments', body).then((r) => r.data)
