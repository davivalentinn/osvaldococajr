'use client'

import { OPEN_COOKIE_PREFS_EVENT } from '@/components/cookie-consent'

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFS_EVENT))}
      className="inline-flex min-h-11 items-center text-left hover:underline"
    >
      Preferências de cookies
    </button>
  )
}
