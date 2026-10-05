import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, ...props }, ref) {
  return (
    <div>
      {label && <label className="text-xs text-harbor-600 font-medium">{label}</label>}
      <input
        ref={ref}
        {...props}
        className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error ? 'border-red-400 focus:ring-red-300' : 'border-harbor-100 focus:ring-harbor-400'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
})

export default Input
