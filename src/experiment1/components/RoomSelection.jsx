import { useState } from 'react'
import RoomCard from '@exp4/components/RoomCard.jsx'
import Button from '@exp4/components/Button.jsx'
import { validateGuests, validateRoomSelected } from '@exp4/utils/validation.js'

// Props: rooms[], selectedRoomType, guests, availableRooms[] (memoised),
// nights, checkIn, checkOut, onUpdateNights(count),
// onSelectRoom(type), onUpdateGuests(count), onBack(), onProceed()
export default function RoomSelection({
  availableRooms,
  selectedRoomType,
  guests,
  roomCount = 1,
  nights = 0,
  checkIn = '',
  checkOut = '',
  onSelectRoom,
  onUpdateGuests,
  onUpdateRoomCount,
  onUpdateNights,
  onBack,
  onProceed,
}) {
  const [errors, setErrors] = useState({})

  // EXPERIMENT 4 (f): guest count + room selection + duration validation
  const handleProceed = () => {
    const next = {
      guests: validateGuests(guests),
      room: validateRoomSelected(selectedRoomType),
      days: nights > 0 ? '' : 'Please enter or select at least 1 day for your stay',
    }
    setErrors(next)
    if (Object.values(next).every((v) => !v)) onProceed()
  }

  if (availableRooms.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-harbor-100 p-8 text-center text-harbor-600">
        No rooms available.
        <div className="mt-4">
          <Button variant="ghost" onClick={onBack}>← Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-harbor-100 p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 px-0">← Back to hotel</Button>
      <h2 className="font-display text-xl text-harbor-800 mb-4">Select a room</h2>

      <div className="flex flex-wrap items-center gap-6 mb-4 p-4 bg-sand/50 rounded-lg border border-harbor-100">
        <div className="flex items-center gap-3">
          <label className="text-sm text-harbor-700 font-medium">Guests</label>
          <button
            type="button"
            disabled={guests <= 1}
            onClick={() => onUpdateGuests(Math.max(1, guests - 1))}
            className="w-8 h-8 rounded-full border border-harbor-200 text-harbor-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-harbor-800">{guests}</span>
          <button
            type="button"
            disabled={guests >= 4}
            onClick={() => onUpdateGuests(Math.min(4, guests + 1))}
            className="w-8 h-8 rounded-full border border-harbor-200 text-harbor-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            +
          </button>
          <span className="text-xs text-harbor-500">(1–4 guests)</span>
        </div>

        <div className="h-6 w-px bg-harbor-200 hidden sm:block" />

        <div className="flex items-center gap-3">
          <label className="text-sm text-harbor-700 font-medium">Rooms</label>
          <button
            type="button"
            disabled={roomCount <= 1}
            onClick={() => onUpdateRoomCount && onUpdateRoomCount(Math.max(1, roomCount - 1))}
            className="w-8 h-8 rounded-full border border-harbor-200 text-harbor-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-harbor-800">{roomCount}</span>
          <button
            type="button"
            disabled={roomCount >= 3}
            onClick={() => onUpdateRoomCount && onUpdateRoomCount(Math.min(3, roomCount + 1))}
            className="w-8 h-8 rounded-full border border-harbor-200 text-harbor-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            +
          </button>
          <span className="text-xs text-harbor-500">(1–3 rooms)</span>
        </div>

        <div className="h-6 w-px bg-harbor-200 hidden sm:block" />

        <div className="flex items-center gap-3">
          <label className="text-sm text-harbor-700 font-medium">Duration</label>
          <button
            type="button"
            disabled={nights <= 1}
            onClick={() => onUpdateNights && onUpdateNights(Math.max(1, nights - 1))}
            className="w-8 h-8 rounded-full border border-harbor-200 text-harbor-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-harbor-800">{nights || 0}</span>
          <button
            type="button"
            disabled={nights >= 90}
            onClick={() => onUpdateNights && onUpdateNights(Math.max(1, (nights || 0) + 1))}
            className="w-8 h-8 rounded-full border border-harbor-200 text-harbor-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
          >
            +
          </button>
          <span className="text-xs text-harbor-500">
            ({nights || 0} {nights === 1 ? 'day' : 'days'})
          </span>
        </div>
      </div>
      {errors.guests && <p className="text-xs text-red-500 mb-2">{errors.guests}</p>}
      {errors.days && <p className="text-xs text-red-500 mb-4">{errors.days}</p>}

      <div className="space-y-3 mt-5">
        {availableRooms.map((room) => (
          <RoomCard
            key={room.type}
            room={room}
            selected={selectedRoomType === room.type}
            onSelect={() => onSelectRoom(room.type)}
          />
        ))}
      </div>
      {errors.room && <p className="text-xs text-red-500 mt-2">{errors.room}</p>}

      <Button onClick={handleProceed} className="mt-6 w-full">
        Continue to booking summary
      </Button>
    </div>
  )
}
