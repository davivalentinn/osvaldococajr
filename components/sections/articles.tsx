import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { articles } from '@/lib/site-config'

export function Articles() {
  return (
    <section id="conteudo-informativo" aria-labelledby="artigos-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="artigos-title"
          eyebrow="Conteúdo informativo"
          title="Para entender antes de decidir"
          description="Textos curtos e objetivos sobre dúvidas frequentes. Informação não substitui a análise do seu caso, mas ajuda a fazer as perguntas certas."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug} data-reveal className="bg-background">
              <article className="group relative flex h-full flex-col p-7 transition-colors hover:bg-card md:p-8">
                <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{article.category}</p>
                <h3 className="mt-5 font-serif text-2xl leading-snug text-foreground">
                  <Link href={`/artigos/${article.slug}`} className="after:absolute after:inset-0">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <p className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Leitura de {article.readingTime}</span>
                  <ArrowRight
                    className="size-4 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
