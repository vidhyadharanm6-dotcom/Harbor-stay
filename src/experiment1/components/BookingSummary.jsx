// Props: hotel, roomType, nights, guests, roomCount, customer, totalCost, pricing { roomCost, taxes }, onBack(), onProceed()
export default function BookingSummary({ hotel, roomType, nights, guests, roomCount = 1, customer, totalCost, pricing, onBack, onProceed }) {
  return (
    <div className="bg-white rounded-xl border border-harbor-100 p-6">
      <button onClick={onBack} className="text-sm text-harbor-600 hover:underline mb-4">
        ← Edit guest details
      </button>
      <h2 className="font-display text-xl text-harbor-800 mb-4">Booking summary</h2>

      <p className="text-xs text-harbor-600 font-medium uppercase tracking-wide mb-1">Stay details</p>
      <dl className="divide-y divide-harbor-50 text-sm mb-4">
        <Row label="Hotel" value={hotel.name} />
        <Row label="Room type" value={roomType} />
        <Row label="Rooms" value={`${roomCount} ${roomCount > 1 ? 'rooms' : 'room'}`} />
        <Row label="Guests" value={guests} />
        <Row label="Stay duration" value={`${nights} night${nights !== 1 ? 's' : ''}`} />
        <Row label="Room cost" value={`₹${pricing.roomCost.toLocaleString('en-IN')}`} />
        <Row label="Taxes (12%)" value={`₹${pricing.taxes.toLocaleString('en-IN')}`} />
      </dl>

      <p className="text-xs text-harbor-600 font-medium uppercase tracking-wide mb-1">Guest details</p>
      <dl className="divide-y divide-harbor-50 text-sm">
        <Row label="Name" value={customer.name} />
        <Row label="Email" value={customer.email} />
        <Row label="Phone" value={customer.phone} />
      </dl>

      <div className="mt-4 border-t border-harbor-100 pt-4 flex items-center justify-between">
        <span className="text-harbor-600">Total booking amount</span>
        <span className="text-xl font-display text-harbor-800">
          ₹{totalCost.toLocaleString('en-IN')}
        </span>
      </div>

      <button
        onClick={onProceed}
        className="mt-6 w-full bg-brass-400 text-harbor-900 font-medium py-2.5 rounded-lg hover:bg-brass-500 transition-colors"
      >
        Proceed to payment
      </button>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2">
      <dt className="text-harbor-600">{label}</dt>
      <dd className="text-harbor-800 font-medium">{value}</dd>
    </div>
  )
}
