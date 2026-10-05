import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import { required, validateEmail, validatePassword } from '../utils/validation.js'

export default function SignUpPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {
      firstName: required(form.firstName),
      lastName: required(form.lastName),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }
    setErrors(next)
    if (!Object.values(next).every((v) => !v)) return

    const result = await signup(form.firstName, form.lastName, form.email, form.password)
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    navigate(location.state?.from || '/stays', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-white border border-harbor-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <h2 className="font-display text-2xl text-harbor-800 mb-2">Create an account</h2>
        <p className="text-xs text-harbor-600 mb-5">
          Sign up to search and book handpicked stays across India.
        </p>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="First name"
              type="text"
              placeholder="e.g. John"
              value={form.firstName}
              onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
              error={errors.firstName}
            />
            <Input
              label="Last name"
              type="text"
              placeholder="e.g. Doe"
              value={form.lastName}
              onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
              error={errors.lastName}
            />
          </div>

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
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            error={errors.password}
          />

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <p className="text-xs text-center text-harbor-600 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-harbor-800 font-semibold underline hover:text-harbor-900">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
