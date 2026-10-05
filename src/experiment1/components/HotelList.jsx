import HotelCard from './HotelCard.jsx'
import Loading from '@exp4/components/Loading.jsx'

// Props: hotels[] (already filtered by the API), loading, error, onSelectHotel(id)
export default function HotelList({ hotels, loading, error, onSelectHotel }) {
  if (loading) return <Loading text="Loading available hotels…" />
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>

  if (hotels.length === 0) {
    return <div className="text-center py-16 text-harbor-600">No hotels available for these dates/filters.</div>
  }

  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} onSelect={onSelectHotel} />
      ))}
    </div>
  )
}
