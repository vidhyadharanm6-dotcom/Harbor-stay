import { useState } from 'react'

function getTodayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDaysToStr(dateStr, days) {
  if (!dateStr) return ''
  const parts = dateStr.split('-').map(Number)
  if (parts.length !== 3) return ''
  const [y, m, d] = parts
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + Number(days))
  const resY = date.getFullYear()
  const resM = String(date.getMonth() + 1).padStart(2, '0')
  const resD = String(date.getDate()).padStart(2, '0')
  return `${resY}-${resM}-${resD}`
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('-').map(Number)
  if (parts.length !== 3) return ''
  const [y, m, d] = parts
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Props: hotel object, nights (number), checkIn (string), onBack(), onProceed(stayData)
export default function HotelDetail({ hotel, nights = 0, checkIn = '', onBack, onProceed }) {
  const [showDaysModal, setShowDaysModal] = useState(false)
  const [days, setDays] = useState(nights > 0 ? nights : '')
  const [checkInDate, setCheckInDate] = useState(checkIn || getTodayStr())
  const [error, setError] = useState('')

  if (!hotel) return null

  const handleOpenModal = () => {
    // If nights was already set, prefill; otherwise keep blank or 1 so user enters it
    setDays(nights > 0 ? nights : '')
    setCheckInDate(checkIn || getTodayStr())
    setError('')
    setShowDaysModal(true)
  }

  const handleCloseModal = () => {
    setShowDaysModal(false)
    setError('')
  }

  const handleConfirmDays = (e) => {
    if (e) e.preventDefault()
    const numDays = parseInt(days, 10)
    if (!days || isNaN(numDays) || numDays <= 0) {
      setError('Please enter a valid number of days (at least 1 day) to proceed.')
      return
    }
    if (numDays > 90) {
      setError('Maximum stay duration is 90 days.')
      return
    }
    setError('')
    setShowDaysModal(false)
    if (onProceed) {
      onProceed({ days: numDays, checkIn: checkInDate })
    }
  }

  const handleDaysChange = (val) => {
    setError('')
    setDays(val)
  }

  const handleStepper = (delta) => {
    const current = parseInt(days, 10) || 0
    const next = Math.max(1, current + delta)
    setError('')
    setDays(next)
  }

  const checkOutDate = days && Number(days) > 0 ? addDaysToStr(checkInDate, days) : ''
  const estimatedCost = days && Number(days) > 0 ? hotel.pricePerNight * Number(days) : 0

  return (
    <div className="bg-white rounded-xl border border-harbor-100 overflow-hidden shadow-sm">
      <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <button onClick={onBack} className="text-sm text-harbor-600 hover:underline mb-3 inline-block">
          ← Back to results
        </button>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-harbor-800">{hotel.name}</h2>
          <span className="text-sm bg-harbor-50 text-harbor-600 px-3 py-1 rounded-full font-medium">
            ★ {hotel.rating}
          </span>
        </div>
        <p className="text-harbor-600 mt-1">{hotel.location}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {hotel.amenities.map((a) => (
            <span key={a} className="text-xs bg-harbor-50 text-harbor-600 px-2.5 py-1 rounded-full">
              {a}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-harbor-50 pt-4 gap-4">
          <div>
            <p className="text-sm text-harbor-600">
              {nights > 0 ? `${nights} night${nights > 1 ? 's' : ''} planned` : 'Stay duration not selected yet'}
            </p>
            <p className="text-harbor-800 font-semibold text-lg">
              From ₹{hotel.pricePerNight.toLocaleString('en-IN')} / night
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-brass-400 text-harbor-900 font-medium px-6 py-2.5 rounded-lg hover:bg-brass-500 transition-colors shadow-sm text-center"
          >
            Choose a room
          </button>
        </div>
      </div>

      {/* Days Selection Modal */}
      {showDaysModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-harbor-900/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-harbor-100 relative"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-harbor-400 hover:text-harbor-800 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-harbor-50 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass-500 bg-brass-400/10 px-2.5 py-1 rounded-full">
                Booking Step 1
              </span>
              <h3 className="font-display text-2xl text-harbor-800 mt-2">How many days will you stay?</h3>
              <p className="text-sm text-harbor-600 mt-1">
                Please enter the number of days for your stay at <span className="font-medium text-harbor-800">{hotel.name}</span> to choose your room.
              </p>
            </div>

            <form onSubmit={handleConfirmDays} className="space-y-5">
              {/* Check-in Date */}
              <div>
                <label className="block text-xs font-medium text-harbor-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  min={getTodayStr()}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full border border-harbor-100 rounded-lg px-3 py-2 text-sm text-harbor-800 focus:outline-none focus:ring-2 focus:ring-harbor-400"
                />
              </div>

              {/* Number of days input with stepper */}
              <div>
                <label className="block text-xs font-medium text-harbor-700 mb-1">
                  Number of Days / Nights <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStepper(-1)}
                    disabled={!days || Number(days) <= 1}
                    className="w-10 h-10 rounded-lg border border-harbor-200 text-harbor-800 hover:bg-harbor-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    placeholder="Enter days (e.g. 3)"
                    value={days}
                    onChange={(e) => handleDaysChange(e.target.value)}
                    className="flex-1 border border-harbor-200 rounded-lg px-3 py-2 text-center text-lg font-semibold text-harbor-800 focus:outline-none focus:ring-2 focus:ring-harbor-400"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleStepper(1)}
                    disabled={Number(days) >= 90}
                    className="w-10 h-10 rounded-lg border border-harbor-200 text-harbor-800 hover:bg-harbor-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Quick selection chips */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  <span className="text-xs text-harbor-500 self-center mr-1">Quick pick:</span>
                  {[1, 2, 3, 5, 7, 10].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleDaysChange(d)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        Number(days) === d
                          ? 'border-harbor-600 bg-harbor-600 text-white font-medium'
                          : 'border-harbor-200 text-harbor-700 bg-white hover:border-harbor-400'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Live Stay Summary */}
              {days && Number(days) > 0 && checkOutDate && (
                <div className="bg-sand/60 border border-harbor-100 rounded-xl p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-harbor-600">
                    <span>Check-in:</span>
                    <span className="font-medium text-harbor-800">{formatDisplayDate(checkInDate)}</span>
                  </div>
                  <div className="flex justify-between text-harbor-600">
                    <span>Check-out:</span>
                    <span className="font-medium text-harbor-800">{formatDisplayDate(checkOutDate)}</span>
                  </div>
                  <div className="flex justify-between text-harbor-600">
                    <span>Duration:</span>
                    <span className="font-semibold text-harbor-800">
                      {days} {Number(days) === 1 ? 'day / 1 night' : `days / ${days} nights`}
                    </span>
                  </div>
                  <div className="border-t border-harbor-100 pt-1.5 flex justify-between font-medium">
                    <span className="text-harbor-600">Est. Base Price:</span>
                    <span className="font-semibold text-harbor-800">
                      ₹{estimatedCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-harbor-200 text-harbor-700 hover:bg-harbor-50 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-brass-400 hover:bg-brass-500 text-harbor-900 font-semibold text-sm transition-colors shadow-sm"
                >
                  Confirm & Choose Room →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
