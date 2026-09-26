import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initMonitoring, Sentry } from './lib/monitoring.js'

initMonitoring()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div className="px-6 py-10 text-center">Something went wrong. Please refresh and try again.</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>,
)
