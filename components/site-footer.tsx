import Link from 'next/link'
import { CookiePreferencesButton } from '@/components/cookie-preferences-button'
import { Logo } from '@/components/site-header'
import { fullAddress, siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-foreground pt-16 pb-28 text-primary-foreground md:pb-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo inverted />
            <p className="mt-6 text-sm leading-relaxed text-primary-foreground/75">
              {siteConfig.name}
              <br />
              Responsável técnico(a): {siteConfig.responsible.name} — {siteConfig.responsible.oab}
              <br />
              {fullAddress()}
            </p>
          </div>

          <nav aria-label="Links institucionais" className="md:col-span-3">
            <h2 className="text-xs font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">Institucional</h2>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <CookiePreferencesButton />
              </li>
              <li>
                <a href="#duvidas" className="inline-flex min-h-11 items-center hover:underline">
                  Dúvidas frequentes
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Redes sociais" className="md:col-span-4">
            <h2 className="text-xs font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">Redes</h2>
            <ul className="mt-4 space-y-1 text-sm">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center hover:underline"
                  >
                    {s.label}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-8 text-xs leading-relaxed text-primary-foreground/70">
          <p>
            <strong className="font-medium text-primary-foreground/90">Aviso legal:</strong> o conteúdo deste site tem
            caráter exclusivamente informativo, em conformidade com o Código de Ética e Disciplina da OAB e o Provimento
            nº 205/2021, e não constitui aconselhamento jurídico. Cada situação exige análise individual por advogado(a).
            O envio de mensagens por este site não estabelece relação cliente-advogado.
          </p>
          <p className="mt-4">
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
