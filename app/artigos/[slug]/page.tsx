import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { TrackedLink } from '@/components/tracked-link'
import { articles, siteConfig, whatsappHref } from '@/lib/site-config'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} | ${siteConfig.shortName} Advocacia`,
    description: article.excerpt,
    alternates: { canonical: `/artigos/${article.slug}` },
    openGraph: { type: 'article', title: article.title, description: article.excerpt },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <main id="conteudo" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link
        href="/#conteudo-informativo"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar aos artigos
      </Link>
      <article className="mt-8">
        <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{article.category}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-balance text-foreground md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <p className="mt-6 text-sm text-muted-foreground">
          Por {siteConfig.responsible.name} — {siteConfig.responsible.oab} · Leitura de {article.readingTime}
        </p>
        <div className="mt-12 rounded-lg border border-dashed border-input bg-muted p-8 text-muted-foreground">
          [Texto completo do artigo, escrito e revisado pelo(a) advogado(a) responsável. Sugestão: 800–1.500 palavras,
          subtítulos em H2, linguagem simples, sem promessa de resultado e com data de publicação.]
        </div>
      </article>
      <aside className="mt-12 rounded-lg bg-primary p-8 text-primary-foreground">
        <p className="font-serif text-2xl">Ficou com dúvidas sobre o seu caso?</p>
        <p className="mt-2 text-primary-foreground/80">
          Este conteúdo é informativo e não substitui a análise individual.
        </p>
        <TrackedLink
          href={whatsappHref(`Olá! Li o artigo "${article.title}" e gostaria de conversar.`)}
          event="whatsapp_click"
          location={`artigo_${article.slug}`}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-md bg-primary-foreground px-5 font-medium text-primary"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          Falar com um advogado
        </TrackedLink>
      </aside>
    </main>
  )
}
