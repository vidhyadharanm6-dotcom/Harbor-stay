const AMENITY_OPTIONS = ['Free WiFi', 'Pool', 'Breakfast', 'Spa', 'Parking', 'Beach Access']

// Props: filters { minRating, maxPrice, amenities[] }, onChange(field, value)
export default function FilterPanel({ filters, onChange }) {
  const toggleAmenity = (amenity) => {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    onChange('amenities', next)
  }

  return (
    <aside className="bg-white rounded-xl border border-harbor-100 p-5 space-y-5 h-fit">
      <h3 className="font-display text-lg text-harbor-800">Filters</h3>

      <div>
        <label className="text-xs text-harbor-600 font-medium">
          Minimum rating: {filters.minRating.toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={filters.minRating}
          onChange={(e) => onChange('minRating', Number(e.target.value))}
          className="w-full accent-harbor-600"
        />
      </div>

      <div>
        <label className="text-xs text-harbor-600 font-medium">
          Max price / night: ₹{filters.maxPrice}
        </label>
        <input
          type="range"
          min="2000"
          max="16000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => onChange('maxPrice', Number(e.target.value))}
          className="w-full accent-harbor-600"
        />
      </div>

      <div>
        <p className="text-xs text-harbor-600 font-medium mb-2">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filters.amenities.includes(amenity)
                  ? 'bg-harbor-600 text-white border-harbor-600'
                  : 'border-harbor-100 text-harbor-600 hover:border-harbor-400'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
