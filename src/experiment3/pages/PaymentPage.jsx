import { useNavigate } from 'react-router-dom'
import Payment from '@exp1/components/Payment.jsx'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { selectedHotel, selectedRoomType, customer, confirmBooking } = useBookingContext()

  if (!selectedHotel) return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Your booking is empty.</div>
  if (!selectedRoomType) return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Please select a room.</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Payment
        customer={customer}
        onBack={() => navigate(`/hotel/${selectedHotel.id}/summary`)}
        onConfirm={confirmBooking}
      />
    </div>
  )
}
