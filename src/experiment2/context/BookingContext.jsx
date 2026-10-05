import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotels } from '../hooks/useHotels.js'
import { useBookingStore } from '../store/bookingStore.js'
import { calculatePricing } from '../store/pricing.js'
import { createReservation } from '@exp3/api/reservationApi.js'
import { payForBooking } from '@exp4/api/paymentApi.js'

const BookingContext = createContext(null)

// EXPERIMENT 2: thin wrapper over the Zustand store so pages keep using
// useBookingContext(). Booking state lives in the store, not in React state.
export function BookingProvider({ children }) {
  const navigate = useNavigate()
  const hotelsApi = useHotels()
  const s = useBookingStore()

  const pricing = useMemo(
    () => calculatePricing(s.room, s.search.checkIn, s.search.checkOut, s.roomCount),
    [s.room, s.search.checkIn, s.search.checkOut, s.roomCount]
  )
  const availableRooms = s.hotel?.rooms || []

  const confirmBooking = async (method) => {
    await payForBooking({ amount: pricing.total, method }) // Exp 4 (protected)
    const saved = await createReservation({ // Exp 3 (POST)
      hotel: {
        id: s.hotel.id,
        name: s.hotel.name,
        location: s.hotel.location,
        image: s.hotel.image,
        rating: s.hotel.rating,
        amenities: s.hotel.amenities,
      },
      roomType: s.room.type,
      roomCount: s.roomCount,
      checkIn: s.search.checkIn,
      checkOut: s.search.checkOut,
      nights: pricing.nights,
      guests: s.guests,
      totalCost: pricing.total,
      customer: { ...s.customer },
    })
    s.setConfirmed(saved)
    navigate('/confirmation')
  }

  const value = {
    ...hotelsApi,
    selectedHotel: s.hotel,
    selectedRoomType: s.room?.type,
    guests: s.guests,
    roomCount: s.roomCount,
    customer: s.customer,
    confirmedBooking: s.confirmed,
    availableRooms,
    pricing,
    totalBookingCost: pricing.total,
    setHotel: s.setHotel,
    setStayDuration: s.setStayDuration,
    selectRoom: (type) => s.setRoom(s.hotel.rooms.find((r) => r.type === type)),
    updateGuests: s.setGuests,
    updateRoomCount: s.setRoomCount,
    updateCustomerField: s.updateCustomer,
    selectHotel: (id) => navigate(`/hotel/${id}`),
    confirmBooking,
    startOver: () => {
      s.reset()
      navigate('/stays')
    },
  }
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBookingContext() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookingContext must be used inside <BookingProvider>')
  return ctx
}
