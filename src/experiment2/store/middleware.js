// EXPERIMENT 2 (e): custom Zustand middleware.
// Logs the state before/after every booking action.
export const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      const before = get()
      set(...args)
      console.log('[booking action]', { before, after: get() })
    },
    get,
    api
  )
