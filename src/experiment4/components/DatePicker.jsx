import Input from './Input.jsx'

export default function DatePicker({ label, value, onChange, error, min }) {
  return (
    <Input
      label={label}
      type="date"
      value={value}
      min={min}
      onChange={(e) => onChange(e.target.value)}
      error={error}
    />
  )
}
