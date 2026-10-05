import { useState } from 'react'
import Input from '@exp4/components/Input.jsx'
import Button from '@exp4/components/Button.jsx'
import { required, validateEmail, validatePhone } from '@exp4/utils/validation.js'

// Props: customer { name, email, phone }, onChange(field, value), onBack(), onProceed()
export default function GuestDetails({ customer, onChange, onBack, onProceed }) {
  const [errors, setErrors] = useState({})

  const handleProceed = () => {
    const next = {
      name: required(customer.name),
      email: validateEmail(customer.email),
      phone: validatePhone(customer.phone),
    }
    setErrors(next)
    if (Object.values(next).every((v) => !v)) onProceed()
  }

  return (
    <div className="bg-white rounded-xl border border-harbor-100 p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 px-0">← Back to rooms</Button>
      <h2 className="font-display text-xl text-harbor-800 mb-4">Guest details</h2>

      <div className="space-y-3">
        <Input
          label="Full name"
          value={customer.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="As per ID"
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          value={customer.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          label="Phone"
          value={customer.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="10-digit mobile number"
          error={errors.phone}
        />
      </div>

      <Button onClick={handleProceed} className="mt-6 w-full">Continue to booking summary</Button>
    </div>
  )
}
