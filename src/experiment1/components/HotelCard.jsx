// Props: hotel object, onSelect(hotelId)
export default function HotelCard({ hotel, onSelect }) {
  return (
    <div className="bg-white rounded-xl border border-harbor-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full sm:w-48 h-40 sm:h-auto object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-harbor-800">{hotel.name}</h3>
            <span className="text-xs bg-harbor-50 text-harbor-600 px-2 py-1 rounded-full">
              ★ {hotel.rating}
            </span>
          </div>
          <p className="text-sm text-harbor-600 mt-1">{hotel.location}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span key={a} className="text-[11px] text-harbor-600 bg-harbor-50 px-2 py-0.5 rounded">
                {a}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-harbor-800 font-semibold">
            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
            <span className="text-xs text-harbor-600 font-normal"> / night</span>
          </span>
          <button
            onClick={() => onSelect(hotel.id)}
            className="bg-harbor-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-harbor-800 transition-colors"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  )
}
