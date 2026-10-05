import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@exp4/components/Button.jsx'
import Loading from '@exp4/components/Loading.jsx'
import { getReservations, updateReservation, cancelReservation } from '../api/reservationApi.js'

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

// EXPERIMENT 3 (a, d, e, f): reservation history (GET), update guests (PUT), cancel (DELETE).
// Data comes from the API, not from the browser. Protected in Experiment 4.
export default function MyBookingsPage() {
  const [items, setItems] = useState([])
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  // one place for loading + error handling of every API call
  const run = async (fn) => {
    setBusy(true)
    setError('')
    try {
      await fn()
    } catch (e) {
      setError(e.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const load = () => run(async () => setItems(await getReservations()))
  useEffect(() => {
    load()
  }, [])

  const cancel = (b) => {
    if (!window.confirm(`Cancel booking ${b.ref}? This cannot be undone.`)) return
    run(async () => {
      await cancelReservation(b.id) // DELETE
      setItems((p) => p.filter((x) => x.id !== b.id))
      setSelectedId(null)
    })
  }

  const changeGuests = (b, guests) =>
    run(async () => {
      const updated = await updateReservation(b.id, { guests }) // PUT
      setItems((p) => p.map((x) => (x.id === updated.id ? updated : x)))
    })

  if (busy && items.length === 0 && !error) return <Loading text="Loading your bookings…" />

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white border border-harbor-100 rounded-xl p-8 shadow-sm">
          {error ? (
            <>
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <Button onClick={load}>Try again</Button>
            </>
          ) : (
            <>
              <p className="text-4xl mb-3">🏨</p>
              <h2 className="font-display text-2xl text-harbor-800 mb-2">No bookings yet</h2>
              <p className="text-sm text-harbor-600 mb-6">
                You haven&apos;t booked any stays yet. Explore our handpicked destinations and plan your next trip!
              </p>
              <Link to="/stays">
                <Button>Explore stays</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  const selected = items.find((x) => x.id === selectedId)

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl text-harbor-800">My Bookings</h2>
          <p className="text-xs text-harbor-600 mt-1">
            You have {items.length} confirmed {items.length === 1 ? 'reservation' : 'reservations'}. Click on any card to view, edit or cancel.
          </p>
        </div>
        <Link to="/stays">
          <Button variant="ghost" className="text-xs">
            + Book another stay
          </Button>
        </Link>
      </div>

      {busy && <p className="text-sm text-harbor-600 mb-2">Working…</p>}
      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <div className="space-y-4">
        {items.map((b) => {
          const roomDisplay = b.roomCount > 1 ? `${b.roomCount} rooms · ${b.roomType}` : b.roomType
          return (
            <div
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className="bg-white border border-harbor-100 rounded-xl p-4 sm:p-5 hover:border-harbor-400 hover:shadow-md cursor-pointer transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {b.hotel?.image && (
                  <img
                    src={b.hotel.image}
                    alt={b.hotel.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-medium text-brass-700 bg-brass-50 px-2 py-0.5 rounded">
                      {b.ref}
                    </span>
                    <span className="text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium">
                      Confirmed
                    </span>
                    <span className="text-[11px] text-harbor-400 hidden sm:inline">• {fmtDate(b.bookedOn)}</span>
                  </div>
                  <h3 className="font-display text-lg text-harbor-800 font-semibold">{b.hotel?.name}</h3>
                  <p className="text-xs text-harbor-600 mt-0.5">{b.hotel?.location}</p>
                  <p className="text-xs text-harbor-700 font-medium mt-1">
                    {roomDisplay} · {b.nights} night(s) · {b.guests} guest(s)
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-harbor-50">
                <div>
                  <span className="text-xs text-harbor-500 block text-left sm:text-right">Total Paid</span>
                  <span className="text-lg font-display text-harbor-800 font-bold">
                    ₹{b.totalCost?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={(e) => {
                      e.stopPropagation()
                      cancel(b)
                    }}
                    className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-40"
                  >
                    Cancel booking
                  </button>
                  <span className="text-xs font-semibold text-brass-600">View Details →</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <BookingDetailsModal
          key={selected.id}
          booking={selected}
          busy={busy}
          onClose={() => setSelectedId(null)}
          onSaveGuests={changeGuests}
          onCancel={cancel}
        />
      )}
    </div>
  )
}

function BookingDetailsModal({ booking, busy, onClose, onSaveGuests, onCancel }) {
  const { hotel, roomType, roomCount = 1, nights, guests, checkIn, checkOut, customer, totalCost, ref, bookedOn } = booking
  const [newGuests, setNewGuests] = useState(guests)

  return (
    <div className="fixed inset-0 z-50 bg-harbor-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8">
        <div className="bg-harbor-800 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl text-white">Booking Details</h3>
              <span className="text-xs bg-brass-400 text-harbor-900 font-bold px-2 py-0.5 rounded">Confirmed</span>
            </div>
            <p className="text-xs text-harbor-200 font-mono mt-0.5">
              Booking ID: {ref} {bookedOn ? `• Booked on ${fmtDate(bookedOn)}` : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-harbor-700 text-white hover:bg-harbor-600 flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Hotel Information */}
          <div>
            <h4 className="text-xs font-bold text-harbor-500 uppercase tracking-wider mb-2">Hotel Information</h4>
            <div className="flex gap-4 items-center bg-sand/40 border border-harbor-100 p-3 rounded-xl">
              {hotel?.image && (
                <img src={hotel.image} alt={hotel.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
              )}
              <div>
                <h5 className="font-display text-lg text-harbor-900 font-bold">{hotel?.name}</h5>
                <p className="text-xs text-harbor-600">📍 {hotel?.location}</p>
                {hotel?.rating && (
                  <span className="inline-block text-xs bg-harbor-100 text-harbor-700 px-2 py-0.5 rounded-full mt-1">
                    ★ {hotel.rating} / 5.0
                  </span>
                )}
                {hotel?.amenities && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-[10px] bg-white border border-harbor-200 text-harbor-600 px-1.5 py-0.5 rounded">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stay & Room Details */}
          <div>
            <h4 className="text-xs font-bold text-harbor-500 uppercase tracking-wider mb-2">Room & Stay Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm bg-harbor-50/50 p-4 rounded-xl border border-harbor-100">
              <div>
                <span className="text-xs text-harbor-500 block">Room Type</span>
                <span className="font-semibold text-harbor-800">{roomType}</span>
              </div>
              <div>
                <span className="text-xs text-harbor-500 block">Number of Rooms</span>
                <span className="font-semibold text-harbor-800">{roomCount} {roomCount > 1 ? 'rooms' : 'room'}</span>
              </div>
              <div>
                <span className="text-xs text-harbor-500 block">Duration</span>
                <span className="font-semibold text-harbor-800">{nights} night{nights !== 1 ? 's' : ''}</span>
              </div>
              <div>
                <span className="text-xs text-harbor-500 block">Guests</span>
                {/* EXPERIMENT 3 (c): update reservation (PUT) */}
                <div className="flex items-center gap-2 mt-0.5">
                  <select
                    value={newGuests}
                    disabled={busy}
                    onChange={(e) => setNewGuests(+e.target.value)}
                    className="border border-harbor-200 rounded px-1 py-0.5 text-sm font-semibold text-harbor-800"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  {newGuests !== guests && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onSaveGuests(booking, newGuests)}
                      className="text-xs font-semibold text-brass-600 hover:underline disabled:opacity-40"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
              {checkIn && (
                <div>
                  <span className="text-xs text-harbor-500 block">Check-in</span>
                  <span className="font-medium text-harbor-800">{checkIn}</span>
                </div>
              )}
              {checkOut && (
                <div>
                  <span className="text-xs text-harbor-500 block">Check-out</span>
                  <span className="font-medium text-harbor-800">{checkOut}</span>
                </div>
              )}
            </div>
          </div>

          {/* Guest Information */}
          <div>
            <h4 className="text-xs font-bold text-harbor-500 uppercase tracking-wider mb-2">Guest Details</h4>
            <div className="bg-harbor-50/50 p-4 rounded-xl border border-harbor-100 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-harbor-500 text-xs">Primary Guest:</span>
                <span className="font-medium text-harbor-800">{customer?.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-harbor-500 text-xs">Email:</span>
                <span className="font-medium text-harbor-800">{customer?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-harbor-500 text-xs">Phone:</span>
                <span className="font-medium text-harbor-800">{customer?.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border-t border-harbor-100 pt-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-harbor-500 block">Total Amount Paid</span>
              <span className="text-xs text-green-600 font-medium">✓ Inclusive of all taxes & fees</span>
            </div>
            <span className="text-2xl font-display text-harbor-800 font-bold">
              ₹{totalCost?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="bg-sand/30 border-t border-harbor-100 px-6 py-3 flex justify-between items-center">
          <button
            type="button"
            disabled={busy}
            onClick={() => onCancel(booking)}
            className="text-sm font-semibold text-red-500 hover:underline disabled:opacity-40"
          >
            Cancel booking
          </button>
          <Button onClick={onClose} className="px-6">Close</Button>
        </div>
      </div>
    </div>
  )
}
