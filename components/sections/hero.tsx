import { ArrowRight, MapPin, MessageCircle, ShieldCheck, Video } from 'lucide-react'
import { TrackedLink } from '@/components/tracked-link'
import { siteConfig, whatsappHref } from '@/lib/site-config'

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Advocacia em {siteConfig.region}
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-serif text-[2.6rem] leading-[1.02] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl"
          >
            Entenda seus direitos antes de <em className="text-primary italic">tomar qualquer decisão</em>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Orientação jurídica em linguagem clara, com análise honesta do seu caso e acompanhamento próximo em cada
            etapa — do primeiro contato à solução.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href={whatsappHref()}
              event="whatsapp_click"
              location="hero"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar com um advogado
            </TrackedLink>
            <a
              href="#contato"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-md border border-input px-6 text-base font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-card"
            >
              Agendar uma conversa
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <aside
          aria-label="Informações de confiança"
          className="flex flex-col justify-end lg:col-span-4 lg:border-l lg:border-border lg:pl-10"
        >
          <ul className="grid gap-6 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-1 lg:border-0 lg:pt-0">
            <li className="flex gap-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-foreground">Inscrição ativa na OAB</p>
                <p className="mt-1 text-sm text-muted-foreground">{siteConfig.responsible.oab}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-foreground">Atendimento presencial</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {siteConfig.contact.address.district}, {siteConfig.city}/{siteConfig.state}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Video className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-foreground">Atendimento online</p>
                <p className="mt-1 text-sm text-muted-foreground">Por videochamada, onde você estiver</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
