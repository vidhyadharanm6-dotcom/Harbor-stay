import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import { validateEmail, validatePassword } from '../utils/validation.js'

export default function LoginPage() {
  const { login, sessionMessage } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }
    setErrors(next)
    if (!Object.values(next).every((v) => !v)) return

    const result = await login(form.email, form.password)
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    navigate(location.state?.from || '/stays', { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <div className="bg-white border border-harbor-100 rounded-xl p-6 shadow-sm">
        <h2 className="font-display text-2xl text-harbor-800 mb-2">Log in</h2>
        <p className="text-xs text-harbor-600 mb-5">
          Welcome back! Please enter your details to access your account.
        </p>

        {sessionMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {sessionMessage}
          </div>
        )}

        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            error={errors.password}
          />
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>

        <p className="text-xs text-center text-harbor-600 mt-5">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-harbor-800 font-semibold underline hover:text-harbor-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
