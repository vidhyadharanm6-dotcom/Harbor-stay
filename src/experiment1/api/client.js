import axios from 'axios'

// EXPERIMENT 1 (a): one shared Axios instance. Vite proxies /api -> :5000
// adapter: 'fetch' makes Axios use the browser Fetch API under the hood,
// so requests show as "fetch" (not "xhr") in the Network tab.
export const api = axios.create({ baseURL: '/api', timeout: 8000, adapter: 'fetch' })
