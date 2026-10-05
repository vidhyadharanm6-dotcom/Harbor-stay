import { useState } from 'react'
import Button from '@exp4/components/Button.jsx'
import { validatePaymentMethod } from '@exp4/utils/validation.js'

const PAYMENT_METHODS = ['Card', 'UPI', 'Net Banking']

// Props: customer { name, email, phone } (read-only recap), onBack(), onConfirm(method)
export default function Payment({ customer, onBack, onConfirm }) {
  const [method, setMethod] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleConfirm = async () => {
    // EXPERIMENT 4 (f): payment method validation
    const err = validatePaymentMethod(method)
    setError(err)
    if (err) return
    // EXPERIMENT 3 (f): loading + error handling for the POST calls
    setBusy(true)
    setApiError('')
    try {
      await onConfirm(method)
    } catch (e) {
      setApiError(e.response?.data?.message || 'Booking failed. Try again.')
      setBusy(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-harbor-100 p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 px-0">← Back to summary</Button>
      <h2 className="font-display text-xl text-harbor-800 mb-4">Payment</h2>

      <div className="bg-harbor-50 rounded-lg p-3 text-sm text-harbor-600 mb-4">
        Booking for <span className="font-medium text-harbor-800">{customer.name}</span> · {customer.email}
      </div>

      <div>
        <p className="text-xs text-harbor-600 font-medium mb-1">Payment method</p>
        <div className="flex gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`text-xs px-3 py-1.5 rounded-full border ${
                method === m ? 'bg-harbor-600 text-white border-harbor-600' : 'border-harbor-100 text-harbor-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      {apiError && <p className="text-xs text-red-500 mt-3">{apiError}</p>}
      <Button onClick={handleConfirm} disabled={busy} className="mt-6 w-full">
        {busy ? 'Booking…' : 'Confirm booking'}
      </Button>
    </div>
  )
}
