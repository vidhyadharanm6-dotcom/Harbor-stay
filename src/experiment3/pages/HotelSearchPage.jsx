import SearchBar from '@exp1/components/SearchBar.jsx'
import FilterPanel from '@exp1/components/FilterPanel.jsx'
import HotelList from '@exp1/components/HotelList.jsx'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'

export default function HotelSearchPage() {
  const {
    searchCriteria, updateSearchField, filters, updateFilterField,
    filteredHotels, loading, error, selectHotel,
  } = useBookingContext()

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <SearchBar criteria={searchCriteria} onChange={updateSearchField} onSearch={() => {}} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-6">
        <FilterPanel filters={filters} onChange={updateFilterField} />
        <HotelList hotels={filteredHotels} loading={loading} error={error} onSelectHotel={selectHotel} />
      </div>
    </div>
  )
}
