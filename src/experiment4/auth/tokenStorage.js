const KEY = 'harborstay-token'

// EXPERIMENT 4 (b): token lives in sessionStorage (cleared when the tab closes,
// safer than localStorage). In production prefer an httpOnly cookie set by the backend.
export const tokenStorage = {
  get: () => sessionStorage.getItem(KEY),
  set: (t) => sessionStorage.setItem(KEY, t),
  clear: () => sessionStorage.removeItem(KEY),
}
