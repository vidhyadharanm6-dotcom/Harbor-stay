import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@exp4/context/AuthContext.jsx'

// EXPERIMENT 3 (b): Link/NavLink for client-side navigation.
export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `cursor-pointer hover:text-brass-300 ${isActive ? 'text-brass-300' : ''}`

  const handleLogout = () => {
    logout()
    navigate('/') // back to the landing page
  }

  return (
    <header className="bg-harbor-800 text-sand">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <NavLink to={isAuthenticated ? '/stays' : '/'} className="font-display text-2xl tracking-tight">
          Harbor Stay
        </NavLink>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-harbor-100 font-body">
          {isAuthenticated && (
            <>
              <NavLink to="/stays" className={linkClass}>Stays</NavLink>
              <NavLink to="/bookings" className={linkClass}>My Bookings</NavLink>
              <button onClick={handleLogout} className="hover:text-brass-300">
                Log out ({user?.firstName || user?.email})
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={linkClass}>Log in</NavLink>
              <NavLink to="/signup" className={linkClass}>Sign up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
