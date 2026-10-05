# Harbor Stay v3 — Scenario 4, Experiments 1–4

React + Vite + Tailwind front end, Express backend, Axios, Zustand.

## Run it

```bash
cd hotel-booking-app-v3      # the folder that contains package.json
npm install
npm start                    # backend (:5000) + frontend (:5173) together
```

Or in two terminals: `npm run server` and `npm run dev`. Open http://localhost:5173

First time: **Sign up** (any email, password 6+ characters), then log in with it.

## What each experiment contains

| Exp | Topic | Files |
|---|---|---|
| 1 | REST API, Axios, async data | `experiment1/api/client.js`, `api/hotelApi.js`, `hooks/useHotelDetail.js`, `experiment2/hooks/useHotels.js` (search + filters via API), `HotelList.jsx` (loading + error) |
| 2 | Zustand store, middleware, persist | `experiment2/store/bookingStore.js`, `middleware.js` (logger), `pricing.js` (nights, room cost x rooms, 12% tax, total), `context/BookingContext.jsx` |
| 3 | Reservation CRUD | `experiment3/api/reservationApi.js` (GET/POST/PUT/DELETE), `pages/MyBookingsPage.jsx`, `Payment.jsx` (loading/error on POST) |
| 4 | Auth + token management | `experiment4/auth/tokenStorage.js`, `api/setupInterceptors.js`, `api/paymentApi.js`, `context/AuthContext.jsx`, `ProtectedRoute.jsx`, `server/server.js` (`auth` middleware) |

## Where data is saved

| Data | Where | Survives |
|---|---|---|
| Bookings, user accounts | `server/db.json` (created automatically; passwords hashed) | page refresh, server restart |
| Selected hotel / room / dates / guest details | browser `localStorage` (`harborstay-booking`) | page refresh |
| Login token + user | browser `sessionStorage` | page refresh (lost when the tab closes) |

Delete `server/db.json` to reset all accounts and bookings.

## Demo / viva checklist

1. **Exp 1** – Stays page shows loading, then hotels. Typing a location filters through the API. Stop the server and refresh to see the error message.
2. **Exp 2** – Pick hotel/room/guests, refresh: data is still there. Console shows `[booking action]` logs. Summary shows room cost + tax + total.
3. **Exp 3** – Book a stay, open My Bookings: change guests and Save (PUT), Cancel booking (DELETE).
4. **Exp 4** – Network tab shows `Authorization: Bearer …`. Log out, open `/bookings` -> redirected to login. Set `TOKEN_TTL_MS = 20 * 1000` in `server/server.js`, restart the server, wait, then book -> "session expired" message.
