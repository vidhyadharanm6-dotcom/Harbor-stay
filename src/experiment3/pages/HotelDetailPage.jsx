import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HotelDetail from '@exp1/components/HotelDetail.jsx'
import Loading from '@exp4/components/Loading.jsx'
import { useBookingContext } from '@exp2/context/BookingContext.jsx'
import { useHotelDetail } from '@exp1/hooks/useHotelDetail.js'

export default function HotelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { nights, setHotel, setStayDuration, searchCriteria } = useBookingContext()
  const { hotel, loading, error } = useHotelDetail(id) // Exp 1 (d): GET hotel + rooms

  useEffect(() => {
    if (hotel) setHotel(hotel) // save into the Zustand store (Exp 2)
  }, [hotel]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <Loading text="Loading hotel…" />
  if (error) return <Loading text={error} />

  const handleProceed = (stayData) => {
    if (stayData?.days) setStayDuration(stayData.days, stayData.checkIn)
    navigate(`/hotel/${id}/rooms`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <HotelDetail
        hotel={hotel}
        nights={nights}
        checkIn={searchCriteria?.checkIn}
        onBack={() => navigate('/stays')}
        onProceed={handleProceed}
      />
    </div>
  )
}
