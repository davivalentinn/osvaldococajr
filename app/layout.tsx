import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import { CookieConsent } from '@/components/cookie-consent'
import { RevealObserver } from '@/components/reveal-observer'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
})

// title: 52 caracteres | description: 148 caracteres (com placeholders preenchidos, revise os limites).
const title = `Advogado em ${siteConfig.city} | ${siteConfig.shortName} Advocacia`
const description = `Escritório de advocacia em ${siteConfig.city}/${siteConfig.state}. Orientação jurídica clara em Família, Previdenciário, Trabalhista e Consumidor.`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: siteConfig.name,
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1f3a34',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${newsreader.variable} bg-background`}>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        {children}
        <RevealObserver />
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
