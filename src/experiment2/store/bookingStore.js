import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logger } from './middleware.js'

const pad = (n) => String(n).padStart(2, '0')
const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const emptyCustomer = { name: '', email: '', phone: '' }
const emptySearch = { location: '', checkIn: '', checkOut: '' }

// EXPERIMENT 2 (a, b, c, e, f): global booking store.
// selected hotel / room / guests / customer / dates + actions,
// wrapped with custom logger middleware and persist (localStorage).
export const useBookingStore = create(
  logger(
    persist(
      (set) => ({
        hotel: null,
        room: null,
        guests: 1,
        roomCount: 1,
        customer: emptyCustomer,
        search: emptySearch,
        confirmed: null,

        setSearch: (field, value) => set((s) => ({ search: { ...s.search, [field]: value } })),

        // stay duration: choose a number of days (+ optional check-in) -> dates are derived
        setStayDuration: (days, checkInDate) =>
          set((s) => {
            const count = Math.max(1, parseInt(days, 10) || 1)
            const inStr = checkInDate || s.search.checkIn || toDateStr(new Date())
            const [y, m, d] = inStr.split('-').map(Number)
            const out = new Date(y, m - 1, d + count)
            return { search: { ...s.search, checkIn: inStr, checkOut: toDateStr(out) } }
          }),

        setHotel: (hotel) => set((s) => ({ hotel, room: s.hotel?.id === hotel.id ? s.room : null })),
        setRoom: (room) => set({ room }),
        setGuests: (n) => set({ guests: Math.max(1, Math.min(4, n)) }),
        setRoomCount: (n) => set({ roomCount: Math.max(1, Math.min(3, n)) }),
        updateCustomer: (field, value) => set((s) => ({ customer: { ...s.customer, [field]: value } })),
        setConfirmed: (confirmed) => set({ confirmed }),

        // "Book another stay"
        reset: () => set({ hotel: null, room: null, guests: 1, roomCount: 1, confirmed: null }),
        // logout: also forget guest details and search so the next user starts clean
        resetAll: () =>
          set({
            hotel: null, room: null, guests: 1, roomCount: 1, confirmed: null,
            customer: emptyCustomer, search: emptySearch,
          }),
      }),
      { name: 'harborstay-booking' } // (f) localStorage key
    )
  )
)
