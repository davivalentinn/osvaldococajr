import { SectionHeading } from '@/components/section-heading'

const steps = [
  {
    title: 'Primeiro contato',
    text: 'Você conta, em poucas palavras, o que está acontecendo — por WhatsApp, telefone ou formulário.',
  },
  {
    title: 'Conversa de análise',
    text: 'Agendamos um horário, presencial ou online, para ouvir com calma e examinar seus documentos.',
  },
  {
    title: 'Orientação clara',
    text: 'Explicamos os caminhos possíveis, riscos, prazos e custos envolvidos, para você decidir com segurança.',
  },
  {
    title: 'Acompanhamento',
    text: 'Se seguirmos juntos, você recebe atualizações a cada etapa relevante e tem um canal direto para dúvidas.',
  },
]

export function Process() {
  return (
    <section
      id="atendimento"
      aria-labelledby="atendimento-title"
      className="bg-primary py-20 text-primary-foreground md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="atendimento-title"
          eyebrow="Como funciona"
          title="Um atendimento em quatro etapas, sem surpresas."
          inverted
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal className="border-t border-primary-foreground/25 pt-6">
              <span aria-hidden="true" className="font-serif text-5xl text-primary-foreground/45 italic">
                {i + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
