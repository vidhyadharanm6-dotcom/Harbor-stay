import { useState, useEffect, useMemo } from 'react'
import { fetchHotels } from '@exp1/api/hotelApi.js'
import { useBookingStore } from '../store/bookingStore.js'
import { getNights } from '../store/pricing.js'

// EXPERIMENT 1 (b, c, e, f) + EXPERIMENT 2 (a): hotels come from the REST API;
// location / dates live in the Zustand store, price / rating / amenity filters are local UI state.
export function useHotels() {
  const searchCriteria = useBookingStore((s) => s.search)
  const updateSearchField = useBookingStore((s) => s.setSearch)
  const [filters, setFilters] = useState({ minRating: 0, maxPrice: 16000, amenities: [] })
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')
    const t = setTimeout(() => {
      // typing debounce
      fetchHotels({
        ...searchCriteria,
        minRating: filters.minRating,
        maxPrice: filters.maxPrice,
        amenities: filters.amenities.join(','),
      })
        .then((data) => !ignore && setHotels(data))
        .catch((e) => !ignore && setError(e.response?.data?.message || 'Could not load hotels'))
        .finally(() => !ignore && setLoading(false))
    }, 400)
    return () => {
      ignore = true
      clearTimeout(t)
    }
  }, [searchCriteria, filters])

  const nights = useMemo(
    () => getNights(searchCriteria.checkIn, searchCriteria.checkOut),
    [searchCriteria.checkIn, searchCriteria.checkOut]
  )

  const updateFilterField = (field, value) => setFilters((p) => ({ ...p, [field]: value }))

  return {
    hotels, filteredHotels: hotels, loading, error, searchCriteria, updateSearchField,
    filters, updateFilterField, nights,
  }
}
