import { Link } from 'react-router-dom'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'
import Button from '@exp4/components/Button.jsx'

export default function ConfirmationPage() {
  const { confirmedBooking, startOver } = useBookingContext()

  if (!confirmedBooking) {
    return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">No booking found.</div>
  }

  const { ref, hotel, roomType, roomCount, nights, totalCost, customer } = confirmedBooking
  const roomDisplay = roomCount && roomCount > 1 ? `${roomCount} rooms · ${roomType}` : roomType

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl border border-harbor-100 p-10 text-center">
        <h2 className="font-display text-2xl text-harbor-800">Booking confirmed 🎉</h2>
        {ref && <p className="text-xs text-brass-600 font-mono mt-1 font-semibold">Booking ID: {ref}</p>}
        <p className="text-harbor-600 mt-2">
          {hotel.name} · {roomDisplay} · {nights} night(s) · ₹{totalCost.toLocaleString('en-IN')}
        </p>
        <p className="text-harbor-600 mt-1 text-sm">Confirmation sent to {customer?.email}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Button onClick={startOver}>Book another stay</Button>
          <Link to="/bookings">
            <Button variant="ghost">View My Bookings →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
