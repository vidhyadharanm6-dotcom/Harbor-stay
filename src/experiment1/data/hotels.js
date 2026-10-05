// Simulated backend catalogue. In a real app this would come from an API;
// Home.jsx "fetches" this with a setTimeout inside useEffect (req. c).
export const ALL_HOTELS = [
  {
    id: 101,
    name: 'Harbor Point Suites',
    location: 'Chennai',
    rating: 4.6,
    pricePerNight: 6200,
    amenities: ['Free WiFi', 'Pool', 'Breakfast', 'Spa'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    rooms: [
      { type: 'Deluxe', price: 6200, capacity: 2 },
      { type: 'Executive Suite', price: 9800, capacity: 3 },
      { type: 'Family Room', price: 11500, capacity: 4 },
    ],
  },
  {
    id: 102,
    name: 'Lakeview Residency',
    location: 'Bengaluru',
    rating: 4.2,
    pricePerNight: 4300,
    amenities: ['Free WiFi', 'Parking', 'Breakfast'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
    rooms: [
      { type: 'Standard', price: 4300, capacity: 2 },
      { type: 'Deluxe', price: 5600, capacity: 2 },
    ],
  },
  {
    id: 103,
    name: 'The Coral Reef Resort',
    location: 'Goa',
    rating: 4.8,
    pricePerNight: 8900,
    amenities: ['Free WiFi', 'Pool', 'Beach Access', 'Spa', 'Bar'],
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600',
    rooms: [
      { type: 'Sea View', price: 8900, capacity: 2 },
      { type: 'Beach Villa', price: 15400, capacity: 4 },
    ],
  },
  {
    id: 104,
    name: 'Central Business Inn',
    location: 'Chennai',
    rating: 3.9,
    pricePerNight: 3100,
    amenities: ['Free WiFi', 'Parking'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
    rooms: [
      { type: 'Standard', price: 3100, capacity: 2 },
      { type: 'Business Suite', price: 4700, capacity: 2 },
    ],
  },
  {
    id: 105,
    name: 'Hillcrest Cottage Stay',
    location: 'Ooty',
    rating: 4.5,
    pricePerNight: 5400,
    amenities: ['Free WiFi', 'Breakfast', 'Bonfire', 'Parking'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
    rooms: [
      { type: 'Cottage Room', price: 5400, capacity: 2 },
      { type: 'Family Cottage', price: 8200, capacity: 5 },
    ],
  },
]
