import { MessageCircle, Phone } from 'lucide-react'
import { TrackedLink } from '@/components/tracked-link'
import { siteConfig, whatsappHref } from '@/lib/site-config'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-final-title" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div data-reveal className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <h2 id="cta-final-title" className="font-serif text-4xl leading-[1.1] text-balance md:text-6xl">
          Uma conversa pode trazer a clareza que você precisa.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          Conte o que está acontecendo. Retornamos para agendar um horário, presencial ou online.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedLink
            href={whatsappHref()}
            event="whatsapp_click"
            location="cta_final"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-primary-foreground px-6 text-base font-medium text-primary transition-colors hover:bg-primary-foreground/90"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Agendar conversa pelo WhatsApp
          </TrackedLink>
          <TrackedLink
            href={`tel:${siteConfig.contact.phone}`}
            event="phone_click"
            location="cta_final"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md border border-primary-foreground/35 px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            <Phone className="size-4" aria-hidden="true" />
            Ligar {siteConfig.contact.phoneDisplay}
          </TrackedLink>
        </div>
      </div>
    </section>
  )
}
