import { MessageCircle } from 'lucide-react'
import { TrackedLink } from '@/components/tracked-link'
import { whatsappHref } from '@/lib/site-config'

export function WhatsappFloat() {
  return (
    <TrackedLink
      href={whatsappHref()}
      event="whatsapp_click"
      location="botao_flutuante"
      aria-label="Conversar pelo WhatsApp (abre em nova aba)"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 md:right-6 md:bottom-6"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </TrackedLink>
  )
}
