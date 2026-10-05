import { api } from '@exp1/api/client.js'
import { tokenStorage } from '../auth/tokenStorage.js'

// EXPERIMENT 4 (c): attach the token to every request
api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// EXPERIMENT 4 (f): 401 / expired token -> tell AuthContext to log out
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthCall = /\/(login|signup)/.test(err.config?.url || '')
    if (err.response?.status === 401 && !isAuthCall) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized', { detail: err.response.data?.message }))
    }
    return Promise.reject(err)
  }
)
