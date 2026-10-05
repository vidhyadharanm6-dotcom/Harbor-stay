import { api } from './client.js'

// EXPERIMENT 1 (a, d): hotel / room GET calls using Axios.
// (Fetch equivalent: fetch('/api/hotels/' + id).then((r) => r.json()))
export const fetchHotels = (params) => api.get('/hotels', { params }).then((r) => r.data)
export const fetchHotel = (id) => api.get(`/hotels/${id}`).then((r) => r.data)
export const fetchRooms = (id) => api.get(`/hotels/${id}/rooms`).then((r) => r.data)
