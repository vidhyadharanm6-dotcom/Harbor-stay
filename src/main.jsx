import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@exp3/App.jsx'
import ErrorBoundary from '@exp4/components/ErrorBoundary.jsx'
import { AuthProvider } from '@exp4/context/AuthContext.jsx'
import '@exp4/api/setupInterceptors.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
