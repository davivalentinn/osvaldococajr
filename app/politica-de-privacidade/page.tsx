import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CookiePreferencesButton } from '@/components/cookie-preferences-button'
import { fullAddress, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Política de Privacidade | ${siteConfig.shortName} Advocacia`,
  description: `Como o escritório ${siteConfig.name} coleta, usa e protege seus dados pessoais, conforme a LGPD.`,
  alternates: { canonical: '/politica-de-privacidade' },
}

const sections = [
  {
    title: '1. Quem somos',
    body: [
      `${siteConfig.name}, inscrito no CNPJ [00.000.000/0000-00], com endereço em ${fullAddress()}, é o controlador dos dados pessoais tratados por meio deste site.`,
      `Encarregado(a) pelo tratamento de dados (DPO): [Nome] — ${siteConfig.contact.email}.`,
    ],
  },
  {
    title: '2. Quais dados coletamos',
    body: [
      'Dados fornecidos por você no formulário de contato: nome, número de WhatsApp, área de interesse e a descrição que você escrever.',
      'Dados de navegação, somente com seu consentimento: páginas visitadas, origem do acesso (parâmetros UTM), tipo de dispositivo e navegador, coletados por ferramentas de análise e marketing.',
    ],
  },
  {
    title: '3. Para que usamos',
    body: [
      'Para retornar seu contato e agendar o atendimento solicitado (base legal: consentimento e procedimentos preliminares a contrato — art. 7º, I e V, da LGPD).',
      'Para entender, de forma agregada, como o site é utilizado e melhorar a comunicação (base legal: consentimento — art. 7º, I).',
      'Não vendemos, alugamos ou cedemos seus dados para fins comerciais.',
    ],
  },
  {
    title: '4. Com quem compartilhamos',
    body: [
      'Com prestadores de serviço que viabilizam o funcionamento do site e o recebimento de mensagens (ex.: hospedagem, ferramenta de formulários [Formspree/Make/n8n], Google Analytics, Meta), sempre limitados ao necessário.',
      'Com autoridades, quando houver obrigação legal ou ordem judicial.',
    ],
  },
  {
    title: '5. Cookies',
    body: [
      'Usamos cookies necessários ao funcionamento do site. Cookies de análise e de marketing só são ativados após sua autorização no banner de cookies, e você pode alterar essa escolha a qualquer momento.',
    ],
  },
  {
    title: '6. Por quanto tempo guardamos',
    body: [
      'Dados de contato que não resultarem em contratação são mantidos por até [12 meses] e depois excluídos. Dados de clientes seguem os prazos legais e éticos aplicáveis à advocacia.',
    ],
  },
  {
    title: '7. Seus direitos',
    body: [
      'Você pode, a qualquer momento, solicitar confirmação, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar o consentimento (art. 18 da LGPD).',
      `Para exercer seus direitos, escreva para ${siteConfig.contact.email}. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).`,
    ],
  },
  {
    title: '8. Segurança e sigilo',
    body: [
      'Adotamos medidas técnicas e organizacionais para proteger seus dados. Além da LGPD, todas as informações compartilhadas com o escritório estão protegidas pelo sigilo profissional previsto no Estatuto da Advocacia (Lei nº 8.906/1994).',
    ],
  },
  {
    title: '9. Atualizações',
    body: ['Esta política pode ser atualizada. Última atualização: [dd/mm/aaaa].'],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main id="conteudo" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar ao site
      </Link>
      <h1 className="mt-8 font-serif text-4xl leading-tight text-foreground md:text-5xl">Política de Privacidade</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Modelo de referência. Revise com atenção e adapte à realidade do escritório antes de publicar.
      </p>
      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-2xl text-foreground">{s.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-12 border-t border-border pt-6 text-sm text-foreground">
        <CookiePreferencesButton />
      </div>
    </main>
  )
}
