import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'
import { validateEmail, validatePassword } from '../utils/validation.js'

// EXPERIMENT 4 (a, e): controlled auth form with validation; calls the login API.
// (The app's routes use LoginPage / SignUpPage; this is the compact shared version.)
export default function AuthForm({ mode }) {
  const { login, sessionMessage } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const isSignup = mode === 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = { email: validateEmail(form.email), password: validatePassword(form.password) }
    setErrors(next)
    if (!Object.values(next).every((v) => !v)) return

    const result = await login(form.email, form.password)
    if (!result.ok) {
      setErrors({ password: result.error })
      return
    }
    navigate(location.state?.from || '/stays', { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <div className="bg-white border border-harbor-100 rounded-xl p-6">
        <h2 className="font-display text-xl text-harbor-800 mb-4">
          {isSignup ? 'Create an account' : 'Log in'}
        </h2>
        {sessionMessage && <p className="text-xs text-red-500 mb-3">{sessionMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            error={errors.password}
          />
          <Button type="submit" className="w-full">{isSignup ? 'Sign up' : 'Log in'}</Button>
        </form>
        <p className="text-xs text-harbor-600 mt-3">
          Password must be at least 6 characters.
        </p>
      </div>
    </div>
  )
}
