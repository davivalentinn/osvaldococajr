import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TrackedLink } from '@/components/tracked-link'
import { practiceAreas, whatsappHref } from '@/lib/site-config'

export function PracticeAreas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="areas-title"
          eyebrow="Áreas de atuação"
          title="Onde podemos ajudar"
          description="Atuação consultiva e contenciosa, com foco em orientar antes de agir — muitas vezes, um bom acordo evita um processo."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {practiceAreas.map((area) => (
            <li
              key={area.id}
              data-reveal
              className="group flex flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-primary/40 md:p-9"
            >
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">{area.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{area.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Temas de ${area.title}`}>
                {area.topics.map((topic) => (
                  <li key={topic} className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
                    {topic}
                  </li>
                ))}
              </ul>
              <TrackedLink
                href={whatsappHref(`Olá! Vim pelo site e gostaria de conversar sobre ${area.title}.`)}
                event="whatsapp_click"
                location={`area_${area.id}`}
                className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Conversar sobre {area.title.toLowerCase()}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
