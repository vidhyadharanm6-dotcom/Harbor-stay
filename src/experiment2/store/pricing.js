export const TAX_RATE = 0.12

// EXPERIMENT 2 (d): stay duration (nights) from check-in / check-out dates.
export function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const diff = Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)
  return diff > 0 ? diff : 0
}

// EXPERIMENT 2 (d): stay duration, room cost, taxes and total amount.
export function calculatePricing(room, checkIn, checkOut, roomCount = 1) {
  const nights = getNights(checkIn, checkOut)
  const roomCost = room ? room.price * nights * roomCount : 0
  const taxes = Math.round(roomCost * TAX_RATE)
  return { nights, roomCost, taxes, total: roomCost + taxes }
}
