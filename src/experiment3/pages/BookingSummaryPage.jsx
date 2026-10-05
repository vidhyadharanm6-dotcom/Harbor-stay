import { useNavigate } from 'react-router-dom'
import BookingSummary from '@exp1/components/BookingSummary.jsx'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'

export default function BookingSummaryPage() {
  const navigate = useNavigate()
  const { selectedHotel, selectedRoomType, nights, guests, roomCount, customer, totalBookingCost, pricing } = useBookingContext()

  if (!selectedHotel) return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Your booking is empty.</div>
  if (!selectedRoomType) return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Please select a room.</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <BookingSummary
        hotel={selectedHotel}
        roomType={selectedRoomType}
        nights={nights}
        guests={guests}
        roomCount={roomCount}
        customer={customer}
        totalCost={totalBookingCost}
        pricing={pricing}
        onBack={() => navigate(`/hotel/${selectedHotel.id}/guest`)}
        onProceed={() => navigate(`/hotel/${selectedHotel.id}/payment`)}
      />
    </div>
  )
}
