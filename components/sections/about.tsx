import { SectionHeading } from '@/components/section-heading'
import { siteConfig } from '@/lib/site-config'

const values = [
  { title: 'Honestidade', text: 'Dizer com clareza o que é possível — inclusive quando a resposta é "não vale a pena".' },
  { title: 'Proximidade', text: 'Você sabe quem cuida do seu caso e consegue falar com essa pessoa.' },
  { title: 'Clareza', text: 'Explicar o direito em linguagem simples, sem esconder nada atrás do juridiquês.' },
]

export function About() {
  const { responsible } = siteConfig
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <figure data-reveal className="lg:col-span-5">
          {/*
            Substitua este bloco por uma foto profissional real (retrato, luz natural, fundo neutro):
            <Image src="/images/advogado.webp" alt="Retrato de [Nome], advogado(a)" width={800} height={1000}
              sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full rounded-lg object-cover" />
          */}
          <div
            role="img"
            aria-label="Espaço reservado para a foto profissional do(a) advogado(a)"
            className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-border bg-muted p-8 text-center"
          >
            <span aria-hidden="true" className="font-serif text-[9rem] leading-none text-primary/15 italic">
              {responsible.name.replace(/[\[\]]/g, '').charAt(0) || 'A'}
            </span>
            <span className="mt-4 max-w-56 text-xs leading-relaxed tracking-wide text-muted-foreground">
              [Foto profissional — 800×1000px, WebP, luz natural e fundo neutro]
            </span>
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <span className="font-serif text-xl text-foreground">{responsible.name}</span>
            <span className="text-sm whitespace-nowrap text-muted-foreground">{responsible.oab}</span>
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading id="sobre-title" eyebrow="Sobre o escritório" title="Quem vai cuidar do seu caso" />
          <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {responsible.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div data-reveal className="mt-10">
            <h3 className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Formação</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {responsible.education.map((item) => (
                <li key={item} className="py-3 text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <dl data-reveal className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <dt className="font-serif text-xl text-foreground">{v.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
