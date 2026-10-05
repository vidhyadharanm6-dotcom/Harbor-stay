import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '@exp1/api/client.js'
import { tokenStorage } from '../auth/tokenStorage.js'
import { useBookingStore } from '@exp2/store/bookingStore.js'

const AuthContext = createContext(null)

// EXPERIMENT 4 (a, b, e, f): login / signup via API, token storage, logout,
// and automatic logout when the API answers 401 / "Token expired".
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('harborstay-user') || 'null'))
  const [sessionMessage, setSessionMessage] = useState('')

  // shared by login + signup: save token + user, return { ok } | { ok: false, error }
  const authCall = useCallback(async (path, body) => {
    try {
      const { data } = await api.post(path, body)
      tokenStorage.set(data.token)
      sessionStorage.setItem('harborstay-user', JSON.stringify(data.user))
      setUser(data.user)
      setSessionMessage('')
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.response?.data?.message || 'Could not reach the server' }
    }
  }, [])

  // (a) login API
  const login = useCallback((email, password) => authCall('/login', { email, password }), [authCall])
  const signup = useCallback(
    (firstName, lastName, email, password) => authCall('/signup', { firstName, lastName, email, password }),
    [authCall]
  )

  // (e) logout
  const logout = useCallback(() => {
    tokenStorage.clear()
    sessionStorage.removeItem('harborstay-user')
    setUser(null)
    useBookingStore.getState().resetAll()
  }, [])

  // (f) on 401: auto logout + show a message on the login page
  useEffect(() => {
    const onUnauthorized = (e) => {
      logout()
      setSessionMessage(
        e.detail === 'Token expired'
          ? 'Your session expired. Please log in again.'
          : 'Please log in to continue.'
      )
    }
    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [logout])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout, sessionMessage }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
