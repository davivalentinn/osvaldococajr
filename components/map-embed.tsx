'use client'

import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '@/lib/site-config'

// O Google Maps define cookies de terceiros; por isso só carrega quando o visitante pede.
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  const query = encodeURIComponent(siteConfig.contact.mapQuery)

  if (loaded) {
    return (
      <iframe
        title={`Mapa com a localização do escritório ${siteConfig.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width={600}
        height={320}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[16/9] h-auto w-full rounded-lg border border-border"
      />
    )
  }

  return (
    <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-input bg-muted p-6 text-center">
      <MapPin className="size-6 text-accent" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="min-h-11 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-card"
      >
        Carregar mapa
      </button>
      <p className="max-w-xs text-xs text-muted-foreground">
        Ao carregar, o Google pode definir cookies.{' '}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Abrir no Google Maps
        </a>
      </p>
    </div>
  )
}
