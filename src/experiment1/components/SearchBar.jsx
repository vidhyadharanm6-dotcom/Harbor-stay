import { useEffect, useRef, useState } from 'react'
import Input from '@exp4/components/Input.jsx'
import DatePicker from '@exp4/components/DatePicker.jsx'
import Button from '@exp4/components/Button.jsx'
import { required, validateDates } from '@exp4/utils/validation.js'

// Props: criteria { location, checkIn, checkOut }, onChange(field, value), onSearch()
export default function SearchBar({ criteria, onChange, onSearch }) {
  // EXPERIMENT 1 (d): useRef — direct DOM reference to the location field.
  const locationInputRef = useRef(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    locationInputRef.current?.focus()
  }, [])

  const focusLocationField = () => {
    locationInputRef.current?.focus()
    locationInputRef.current?.select()
  }

  // EXPERIMENT 4 (f): required field + check-in/check-out date validation
  const handleSearch = () => {
    const hasDates = Boolean(criteria.checkIn || criteria.checkOut)
    const next = {
      location: required(criteria.location),
      dates: hasDates ? validateDates(criteria.checkIn, criteria.checkOut) : '',
    }
    setErrors(next)
    if (!next.location && !next.dates) onSearch()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-harbor-100 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="sm:col-span-2">
        <Input
          ref={locationInputRef}
          label="Destination"
          value={criteria.location}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="City or hotel name"
          error={errors.location}
        />
      </div>
      <DatePicker label="Check-in" value={criteria.checkIn} onChange={(v) => onChange('checkIn', v)} />
      <DatePicker label="Check-out" value={criteria.checkOut} onChange={(v) => onChange('checkOut', v)} min={criteria.checkIn} />

      {errors.dates && <p className="sm:col-span-4 text-xs text-red-500 -mt-2">{errors.dates}</p>}

      <div className="sm:col-span-4 flex gap-3 pt-1">
        <Button onClick={handleSearch}>Search hotels</Button>
        <Button variant="ghost" type="button" onClick={focusLocationField}>
          Jump to destination field
        </Button>
      </div>
    </div>
  )
}
