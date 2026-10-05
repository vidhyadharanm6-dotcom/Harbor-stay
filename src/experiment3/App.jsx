import { Routes, Route } from 'react-router-dom'
import Header from '@exp1/components/Header.jsx'
import Footer from '@exp1/components/Footer.jsx'
import ProtectedRoute from '@exp4/components/ProtectedRoute.jsx'
import { BookingProvider } from '@exp2/context/BookingContext.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HotelSearchPage from './pages/HotelSearchPage.jsx'
import HotelDetailPage from './pages/HotelDetailPage.jsx'
import RoomSelectionPage from './pages/RoomSelectionPage.jsx'
import GuestDetailsPage from './pages/GuestDetailsPage.jsx'
import BookingSummaryPage from './pages/BookingSummaryPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import LoginPage from '@exp4/pages/LoginPage.jsx'
import SignUpPage from '@exp4/pages/SignUpPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'

// EXPERIMENT 3: full route table.
// "/" is the public themed landing page; "/login" and "/signup" are public.
// EXPERIMENT 4: everything else (stays, hotel details, booking, checkout,
// confirmation, bookings) sits behind <ProtectedRoute>.
export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-sand text-harbor-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/stays" element={<HotelSearchPage />} />
              <Route path="/hotel/:id" element={<HotelDetailPage />} />
              <Route path="/hotel/:id/rooms" element={<RoomSelectionPage />} />
              <Route path="/hotel/:id/guest" element={<GuestDetailsPage />} />
              <Route path="/hotel/:id/summary" element={<BookingSummaryPage />} />
              <Route path="/hotel/:id/payment" element={<PaymentPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/bookings" element={<MyBookingsPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BookingProvider>
  )
}
