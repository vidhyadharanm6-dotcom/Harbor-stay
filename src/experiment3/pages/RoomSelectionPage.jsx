import { useParams, useNavigate } from 'react-router-dom'
import RoomSelection from '@exp1/components/RoomSelection.jsx'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'

export default function RoomSelectionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    selectedHotel, availableRooms, selectedRoomType,
    guests, selectRoom, updateGuests,
    roomCount, updateRoomCount,
    nights, setStayDuration, searchCriteria,
  } = useBookingContext()

  if (!selectedHotel || selectedHotel.id !== Number(id)) {
    return <div className="max-w-6xl mx-auto px-6 py-16 text-center text-harbor-600">Please select a hotel first.</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <RoomSelection
        availableRooms={availableRooms}
        selectedRoomType={selectedRoomType}
        guests={guests}
        roomCount={roomCount}
        nights={nights}
        checkIn={searchCriteria?.checkIn}
        checkOut={searchCriteria?.checkOut}
        onSelectRoom={selectRoom}
        onUpdateGuests={updateGuests}
        onUpdateRoomCount={updateRoomCount}
        onUpdateNights={(count) => setStayDuration(count, searchCriteria?.checkIn)}
        onBack={() => navigate(`/hotel/${id}`)}
        onProceed={() => navigate(`/hotel/${id}/guest`)}
      />
    </div>
  )
}
