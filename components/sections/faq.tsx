import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { faqItems } from '@/lib/site-config'

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="border-t border-border bg-card py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="Dúvidas frequentes"
            title="Perguntas que costumamos ouvir"
            description="Não encontrou a sua? Pergunte diretamente — respondemos sem compromisso."
          />
        </div>
        <div className="divide-y divide-border border-y border-border lg:col-span-8">
          {faqItems.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
