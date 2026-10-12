import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site-config'

export const alt = `${siteConfig.name} — Advocacia em ${siteConfig.city}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#1f3a34',
        color: '#f6f3ee',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          letterSpacing: 6,
          textTransform: 'uppercase',
          opacity: 0.75,
        }}
      >
        {siteConfig.shortName} Advocacia
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 72,
          lineHeight: 1.05,
          maxWidth: 950,
        }}
      >
        Entenda seus direitos antes de tomar qualquer decisão.
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 28,
          opacity: 0.75,
        }}
      >
        {siteConfig.responsible.oab} · {siteConfig.city}/{siteConfig.state}
      </div>
    </div>,
    size,
  )
}
