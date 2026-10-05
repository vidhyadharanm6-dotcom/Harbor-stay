import { api } from '@exp1/api/client.js'

// EXPERIMENT 3 (b, c, d, e): reservation CRUD. (a) GET hotels/rooms is in experiment1/api/hotelApi.js
export const getReservations = () => api.get('/reservations').then((r) => r.data) // GET (history)
export const createReservation = (body) => api.post('/reservations', body).then((r) => r.data) // POST
export const updateReservation = (id, body) => api.put(`/reservations/${id}`, body).then((r) => r.data) // PUT
export const cancelReservation = (id) => api.delete(`/reservations/${id}`) // DELETE
