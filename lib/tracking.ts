'use client'

type TrackParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export type TrackEvent = 'whatsapp_click' | 'phone_click' | 'email_click' | 'form_submit' | 'form_error'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const
const UTM_STORAGE_KEY = 'lp_utms'

/**
 * Envia o evento para o dataLayer (GTM) sempre — o GTM só existe após consentimento.
 * GA4 e Meta Pixel só recebem se os respectivos scripts foram carregados (também após consentimento).
 */
export function track(event: TrackEvent, params: TrackParams = {}) {
  if (typeof window === 'undefined') return
  const payload = { ...params, ...getUtms() }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
  window.gtag?.('event', event, payload)
  if (event === 'form_submit') window.fbq?.('track', 'Lead')
  if (event === 'whatsapp_click') window.fbq?.('track', 'Contact')
}

export function captureUtms() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const found: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 200)
  }
  if (Object.keys(found).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found))
    } catch {
      /* sessionStorage indisponível (modo privado restrito) */
    }
  }
}

export function getUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}
