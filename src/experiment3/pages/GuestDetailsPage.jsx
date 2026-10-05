import { useNavigate } from 'react-router-dom'
import GuestDetails from '@exp1/components/GuestDetails.jsx'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'

export default function GuestDetailsPage() {
  const navigate = useNavigate()
  const { selectedHotel, selectedRoomType, customer, updateCustomerField } = useBookingContext()

  if (!selectedHotel) return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Your booking is empty.</div>
  if (!selectedRoomType) return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Please select a room.</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <GuestDetails
        customer={customer}
        onChange={updateCustomerField}
        onBack={() => navigate(`/hotel/${selectedHotel.id}/rooms`)}
        onProceed={() => navigate(`/hotel/${selectedHotel.id}/summary`)}
      />
    </div>
  )
}
