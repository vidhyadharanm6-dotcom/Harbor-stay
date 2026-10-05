// EXPERIMENT 4 (f): shared validation functions.
export const required = (value) => (value?.toString().trim() ? '' : 'This field is required')

export const validateEmail = (value) =>
  !value ? 'Email is required' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email'

export const validatePhone = (value) =>
  !value ? 'Phone number is required' : /^\d{10}$/.test(value) ? '' : 'Enter a valid 10-digit number'

export const validatePassword = (value) =>
  !value ? 'Password is required' : value.length >= 6 ? '' : 'Password must be at least 6 characters'

export const validateDates = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 'Select both check-in and check-out dates'
  return new Date(checkOut) > new Date(checkIn) ? '' : 'Check-out must be after check-in'
}

export const validateGuests = (count) => (count >= 1 ? '' : 'At least 1 guest is required')

export const validateRoomSelected = (roomType) => (roomType ? '' : 'Please select a room')

export const validatePaymentMethod = (method) => (method ? '' : 'Select a payment method')

export const validateDays = (days) => {
  const num = Number(days)
  if (!days || isNaN(num) || num <= 0) return 'Please enter a valid number of days (at least 1 day)'
  if (!Number.isInteger(num)) return 'Number of days must be a whole number'
  if (num > 90) return 'Maximum stay duration is 90 days'
  return ''
}

