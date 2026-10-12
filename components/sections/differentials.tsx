import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

// Mantenha apenas o que for verdadeiro e verificável no seu escritório.
const items = [
  {
    title: 'Atendimento direto com o(a) advogado(a)',
    text: 'A conversa inicial e o acompanhamento são feitos por quem efetivamente conduz o caso.',
  },
  {
    title: 'Contrato e honorários por escrito',
    text: 'Antes de começar, você recebe um contrato claro, com valores e escopo definidos conforme a tabela da OAB.',
  },
  {
    title: 'Atualizações a cada movimentação',
    text: 'Você é informado sempre que algo relevante acontece no processo, sem precisar perguntar.',
  },
  {
    title: 'Presencial ou 100% online',
    text: 'Reuniões no escritório ou por videochamada, com envio de documentos e assinatura digital.',
  },
  {
    title: 'Retorno em até [24h úteis]',
    text: 'Todo contato recebido pelo site ou WhatsApp é respondido dentro desse prazo.',
  },
  {
    title: 'Sigilo e proteção de dados',
    text: 'Seus dados e documentos são tratados com sigilo profissional e de acordo com a LGPD.',
  },
]

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="border-y border-border bg-card py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="diferenciais-title"
          eyebrow="Compromissos"
          title="O que você pode esperar de nós"
          description="Compromissos práticos, que você pode verificar desde o primeiro contato."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} data-reveal className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Check className="size-4" />
              </span>
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
