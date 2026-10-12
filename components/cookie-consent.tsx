'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { captureUtms } from '@/lib/tracking'

type Consent = { analytics: boolean; marketing: boolean; decidedAt: string }

const STORAGE_KEY = 'lp_cookie_consent_v1'
export const OPEN_COOKIE_PREFS_EVENT = 'open-cookie-preferences'

// IDs públicos (não são segredos). Defina em Vars: NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    captureUtms()
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Consent
        setConsent(parsed)
        setAnalytics(parsed.analytics)
        setMarketing(parsed.marketing)
      } else {
        setOpen(true)
      }
    } catch {
      setOpen(true)
    }
    const reopen = () => {
      setShowDetails(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_COOKIE_PREFS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_COOKIE_PREFS_EVENT, reopen)
  }, [])

  const save = (next: Omit<Consent, 'decidedAt'>) => {
    const value = { ...next, decidedAt: new Date().toISOString() }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível: consentimento vale só nesta sessão */
    }
    setConsent(value)
    setAnalytics(value.analytics)
    setMarketing(value.marketing)
    setOpen(false)
    // Revogar consentimento exige recarregar para descarregar scripts já executados.
    if (consent && ((consent.analytics && !value.analytics) || (consent.marketing && !value.marketing))) {
      window.location.reload()
    }
  }

  return (
    <>
      {consent?.analytics && GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {consent?.analytics && GA_ID && !GTM_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent?.marketing && PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}

      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-lg border border-border bg-card p-5 shadow-xl shadow-primary/10 sm:inset-x-auto sm:right-6 sm:bottom-6"
        >
          <h2 id="cookie-title" className="font-serif text-xl text-foreground">
            Sua privacidade
          </h2>
          <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Usamos cookies necessários para o site funcionar. Com sua permissão, também usamos cookies de análise e
            marketing para entender como o site é usado. Saiba mais na{' '}
            <Link href="/politica-de-privacidade" className="text-accent underline underline-offset-2">
              Política de Privacidade
            </Link>
            .
          </p>

          {showDetails && (
            <fieldset className="mt-4 space-y-3 border-t border-border pt-4">
              <legend className="sr-only">Categorias de cookies</legend>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked disabled className="mt-1 size-4 accent-primary" />
                <span>
                  <span className="font-medium text-foreground">Necessários</span>
                  <span className="block text-muted-foreground">Essenciais para o funcionamento. Sempre ativos.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  <span className="font-medium text-foreground">Análise</span>
                  <span className="block text-muted-foreground">Google Analytics / Tag Manager, de forma agregada.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  <span className="font-medium text-foreground">Marketing</span>
                  <span className="block text-muted-foreground">Meta Pixel, para medir anúncios.</span>
                </span>
              </label>
            </fieldset>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {showDetails ? (
              <button
                type="button"
                onClick={() => save({ analytics, marketing })}
                className="min-h-11 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Salvar preferências
              </button>
            ) : (
              <button
                type="button"
                onClick={() => save({ analytics: true, marketing: true })}
                className="min-h-11 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Aceitar todos
              </button>
            )}
            <button
              type="button"
              onClick={() => save({ analytics: false, marketing: false })}
              className="min-h-11 rounded-md border border-input px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Apenas necessários
            </button>
            {!showDetails && (
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="min-h-11 px-2 text-sm font-medium text-foreground underline underline-offset-4"
              >
                Personalizar
              </button>
            )}
          </div>
        </section>
      )}
    </>
  )
}
