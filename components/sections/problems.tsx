import { SectionHeading } from '@/components/section-heading'

const situations = [
  'Você recebeu uma carta, notificação ou intimação e não sabe o que ela significa.',
  'O INSS negou seu benefício e ninguém explicou o motivo de forma clara.',
  'Um relacionamento terminou e há filhos, bens ou dívidas para resolver.',
  'Você foi desligado do trabalho e tem dúvidas sobre o que deveria receber.',
  'Uma cobrança, contrato ou plano de saúde parece injusto, mas você não sabe por onde começar.',
  'Você quer se planejar agora para evitar um problema maior no futuro.',
]

export function Problems() {
  return (
    <section aria-labelledby="problemas-title" className="border-y border-border bg-card py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="problemas-title"
            eyebrow="Você não está sozinho"
            title="Algumas situações chegam sem aviso."
            description="Insegurança, dúvida e a sensação de não saber a quem perguntar são comuns. O primeiro passo é entender o que está acontecendo."
          />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:col-span-7">
          {situations.map((text, i) => (
            <li key={text} data-reveal className="flex gap-5 bg-card p-6 md:p-7">
              <span aria-hidden="true" className="font-serif text-lg text-accent italic tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-base leading-relaxed text-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
