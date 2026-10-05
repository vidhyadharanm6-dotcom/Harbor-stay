import { Navigate } from 'react-router-dom'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'

// EXPERIMENT 3 (a): standalone /checkout route from the route list.
// Routes the guest into the payment step of whichever hotel they picked.
export default function CheckoutPage() {
  const { selectedHotel } = useBookingContext()
  return <Navigate to={selectedHotel ? `/hotel/${selectedHotel.id}/payment` : '/stays'} replace />
}
