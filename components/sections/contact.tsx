import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { MapEmbed } from '@/components/map-embed'
import { SectionHeading } from '@/components/section-heading'
import { TrackedLink } from '@/components/tracked-link'
import { fullAddress, siteConfig, whatsappHref } from '@/lib/site-config'

export function Contact() {
  const { contact } = siteConfig
  return (
    <section id="contato" aria-labelledby="contato-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contato-title"
            eyebrow="Contato"
            title="Vamos conversar sobre o seu caso"
            description="Escolha o canal mais confortável para você. Retornamos para agendar um horário."
          />

          <address data-reveal className="mt-10 space-y-6 not-italic">
            <TrackedLink
              href={whatsappHref()}
              event="whatsapp_click"
              location="contato"
              className="flex min-h-11 items-start gap-4 text-foreground hover:text-primary"
            >
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">WhatsApp</span>
                {contact.whatsappDisplay}
              </span>
            </TrackedLink>
            <TrackedLink
              href={`tel:${contact.phone}`}
              event="phone_click"
              location="contato"
              className="flex min-h-11 items-start gap-4 text-foreground hover:text-primary"
            >
              <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">Telefone</span>
                {contact.phoneDisplay}
              </span>
            </TrackedLink>
            <TrackedLink
              href={`mailto:${contact.email}`}
              event="email_click"
              location="contato"
              className="flex min-h-11 items-start gap-4 break-all text-foreground hover:text-primary"
            >
              <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">E-mail</span>
                {contact.email}
              </span>
            </TrackedLink>
            <p className="flex items-start gap-4 text-foreground">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">Endereço</span>
                {fullAddress()}
              </span>
            </p>
            <div className="flex items-start gap-4 text-foreground">
              <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <span className="block text-sm text-muted-foreground">Horários</span>
                <ul>
                  {contact.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </address>

          <div data-reveal className="mt-10">
            <MapEmbed />
          </div>
        </div>

        <div data-reveal className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
