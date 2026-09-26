import * as Sentry from '@sentry/react'

export function initMonitoring() {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn) {
    return
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  })
}

export function captureError(error, context = {}) {
  Sentry.withScope((scope) => {
    Object.entries(context).forEach(([key, value]) => {
      scope.setContext(key, value)
    })
    Sentry.captureException(error)
  })
}

export { Sentry }
