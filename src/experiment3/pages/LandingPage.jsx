import { Link } from 'react-router-dom'
import Button from '@exp4/components/Button.jsx'

export default function LandingPage() {
  return (
    <div
      className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,36,34,0.65), rgba(10,36,34,0.8)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400')",
      }}
    >
      <div className="text-center px-6 max-w-xl">
        <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">Harbor Stay</h1>
        <p className="text-harbor-100 text-base sm:text-lg mb-8">
          Handpicked hotels across India — from city business inns to beachfront resorts.
          Sign up to start browsing and booking your next stay.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/signup">
            <Button variant="accent" className="px-6 py-3 text-base">Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="px-6 py-3 text-base">Log In</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
