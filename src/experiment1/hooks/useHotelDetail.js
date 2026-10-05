import { useState, useEffect } from 'react'
import { fetchHotel, fetchRooms } from '../api/hotelApi.js'

// EXPERIMENT 1 (d, e, f): hotel + rooms fetched in parallel with loading / error state.
export function useHotelDetail(id) {
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')
    Promise.all([fetchHotel(id), fetchRooms(id)])
      .then(([h, rooms]) => !ignore && setHotel({ ...h, rooms }))
      .catch((e) => !ignore && setError(e.response?.data?.message || 'Could not load hotel'))
      .finally(() => !ignore && setLoading(false))
    return () => {
      ignore = true
    }
  }, [id])

  return { hotel, loading, error }
}
