import { About } from '@/components/sections/about'
import { Articles } from '@/components/sections/articles'
import { Contact } from '@/components/sections/contact'
import { Differentials } from '@/components/sections/differentials'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { PracticeAreas } from '@/components/sections/practice-areas'
import { Problems } from '@/components/sections/problems'
import { Process } from '@/components/sections/process'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { WhatsappFloat } from '@/components/whatsapp-float'
import { faqItems, practiceAreas, siteConfig } from '@/lib/site-config'

function StructuredData() {
  const { contact, responsible } = siteConfig
  const address = {
    '@type': 'PostalAddress',
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.zip,
    addressCountry: 'BR',
  }
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LegalService', 'LocalBusiness'],
        '@id': `${siteConfig.url}/#escritorio`,
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: contact.phone,
        email: contact.email,
        address,
        areaServed: siteConfig.region,
        knowsAbout: practiceAreas.map((a) => a.title),
        // Ajuste conforme o horário real (formato schema.org).
        openingHours: 'Mo-Fr 09:00-18:00',
        sameAs: siteConfig.social.map((s) => s.href),
        employee: { '@id': `${siteConfig.url}/#advogado` },
      },
      {
        '@type': ['Attorney', 'Person'],
        '@id': `${siteConfig.url}/#advogado`,
        name: responsible.name,
        jobTitle: responsible.role,
        identifier: responsible.oab,
        worksFor: { '@id': `${siteConfig.url}/#escritorio` },
        address,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapa o conteúdo; "<" é escapado para evitar fechamento prematuro da tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  )
}

export default function Page() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Problems />
        <PracticeAreas />
        <Process />
        <About />
        <Differentials />
        <Articles />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <SiteFooter />
      <WhatsappFloat />
    </>
  )
}
