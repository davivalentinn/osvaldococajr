/**
 * Fonte única de dados do escritório.
 * Tudo entre [COLCHETES] é placeholder e deve ser substituído antes da publicação.
 * Nunca preencha com dados que não possam ser comprovados (Provimento OAB 205/2021).
 */

export const siteConfig = {
  name: '[NOME DO ESCRITÓRIO]',
  shortName: '[NOME]',
  // Troque pelo domínio real (precisa ser uma URL válida, sem colchetes).
  url: 'https://www.seudominio.com.br',
  city: '[Cidade]',
  state: '[UF]',
  region: '[Cidade] e região',

  responsible: {
    name: '[Nome do(a) Advogado(a) Responsável]',
    oab: 'OAB/[UF] nº [000.000]',
    role: 'Advogado(a) responsável',
    bio: [
      '[Minicurrículo — parágrafo 1: formação acadêmica (instituição, ano) e especializações comprováveis.]',
      '[Minicurrículo — parágrafo 2: trajetória profissional e foco de atuação, em linguagem simples e sem autopromoção.]',
    ],
    education: [
      '[Graduação em Direito — Instituição, ano]',
      '[Pós-graduação / Especialização — Instituição, ano]',
      '[Membro de comissão / associação, se houver]',
    ],
  },

  contact: {
    /** Somente dígitos, com DDI e DDD. Ex.: 5511999999999 */
    whatsapp: '5500000000000',
    whatsappDisplay: '([00]) [00000-0000]',
    whatsappMessage:
      'Olá! Vim pelo site e gostaria de agendar uma conversa para entender minha situação.',
    phone: '+550000000000',
    phoneDisplay: '([00]) [0000-0000]',
    email: '[contato@seudominio.com.br]',
    address: {
      street: '[Rua, número, sala]',
      district: '[Bairro]',
      city: '[Cidade]',
      state: '[UF]',
      zip: '[00000-000]',
    },
    /** Termo usado no embed do Google Maps (endereço completo ou nome no Google Meu Negócio). */
    mapQuery: '[Endereço completo do escritório]',
    hours: [
      { days: 'Segunda a sexta', time: '[9h às 18h]' },
      { days: 'Sábados', time: '[Somente com agendamento]' },
    ],
  },

  social: [
    { label: 'Instagram', href: 'https://instagram.com/[perfil]' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/[perfil]' },
  ],
} as const

export const whatsappHref = (message: string = siteConfig.contact.whatsappMessage) =>
  `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const fullAddress = () => {
  const a = siteConfig.contact.address
  return `${a.street}, ${a.district} — ${a.city}/${a.state}, CEP ${a.zip}`
}

export const practiceAreas = [
  {
    id: 'familia',
    title: 'Família e Sucessões',
    description:
      'Divórcio, guarda, pensão alimentícia, inventário e planejamento sucessório, com escuta cuidadosa em momentos delicados.',
    topics: ['Divórcio e partilha', 'Guarda e convivência', 'Inventário e testamento'],
  },
  {
    id: 'previdenciario',
    title: 'Previdenciário',
    description:
      'Análise de tempo de contribuição, aposentadorias, benefícios por incapacidade e revisões junto ao INSS.',
    topics: ['Aposentadorias', 'Auxílio e BPC/LOAS', 'Revisão de benefício'],
  },
  {
    id: 'trabalhista',
    title: 'Trabalhista',
    description:
      'Orientação sobre rescisões, verbas, jornada e direitos no ambiente de trabalho, para empregados e empregadores.',
    topics: ['Rescisão e verbas', 'Horas extras', 'Assédio no trabalho'],
  },
  {
    id: 'consumidor',
    title: 'Consumidor e Cível',
    description:
      'Contratos, cobranças indevidas, problemas com bancos, planos de saúde e relações de consumo em geral.',
    topics: ['Cobranças indevidas', 'Planos de saúde', 'Revisão de contratos'],
  },
] as const

export const faqItems = [
  {
    q: 'Como funciona a primeira conversa?',
    a: 'Você nos conta o que está acontecendo, por WhatsApp, telefone ou formulário. Em seguida, agendamos uma conversa — presencial ou online — para entender os detalhes e explicar, com clareza, os caminhos possíveis no seu caso.',
  },
  {
    q: 'O atendimento pode ser feito totalmente online?',
    a: 'Sim. Reuniões por videochamada, envio de documentos digitalizados e assinatura eletrônica permitem acompanhar todo o processo à distância, quando isso for adequado ao caso.',
  },
  {
    q: 'Quais documentos devo levar ou enviar?',
    a: 'Documento de identificação, comprovante de endereço e tudo o que estiver relacionado à situação (contratos, mensagens, extratos, carta do INSS, termo de rescisão etc.). Se tiver dúvida, traga o que tiver — orientamos sobre o restante.',
  },
  {
    q: 'Como são definidos os honorários?',
    a: 'Os honorários são definidos de forma transparente após a análise do caso, considerando sua complexidade e seguindo a Tabela de Honorários da OAB/[UF]. Tudo é formalizado em contrato antes do início do trabalho.',
  },
  {
    q: 'Vocês garantem que vou ganhar a causa?',
    a: 'Nenhum advogado pode garantir resultado — e o Código de Ética da OAB proíbe essa promessa. O que oferecemos é uma análise honesta das chances, dos riscos e das alternativas, para que você decida com segurança.',
  },
  {
    q: 'Quanto tempo leva um processo?',
    a: 'Depende do tipo de demanda, do tribunal e da possibilidade de acordo. Na conversa inicial explicamos as etapas e uma estimativa realista, sempre lembrando que os prazos do Judiciário não dependem apenas do advogado.',
  },
  {
    q: 'Vou conseguir acompanhar o andamento do meu caso?',
    a: 'Sim. Você recebe atualizações a cada movimentação relevante e tem um canal direto para tirar dúvidas, em linguagem clara, sem juridiquês.',
  },
  {
    q: 'Minhas informações ficam em sigilo?',
    a: 'Sim. O sigilo profissional é um dever do advogado previsto no Estatuto da OAB, e seus dados são tratados de acordo com a LGPD, apenas para fins do atendimento.',
  },
  {
    q: 'Vocês atendem fora de [Cidade]?',
    a: 'Sim. Com o processo eletrônico, é possível atuar em diversas comarcas. Na conversa inicial verificamos a viabilidade de atuação no local onde o seu caso tramita.',
  },
] as const

export const articles = [
  {
    slug: 'o-que-fazer-ao-receber-negativa-do-inss',
    category: 'Previdenciário',
    title: 'Recebi uma negativa do INSS. E agora?',
    excerpt:
      'Entenda os motivos mais comuns de indeferimento, os prazos para recorrer e quais documentos fazem diferença na nova análise.',
    readingTime: '6 min',
  },
  {
    slug: 'divorcio-consensual-ou-litigioso',
    category: 'Família',
    title: 'Divórcio consensual ou litigioso: qual a diferença?',
    excerpt:
      'Como cada modalidade funciona, quando é possível fazer em cartório e o que considerar sobre filhos e bens.',
    readingTime: '5 min',
  },
  {
    slug: 'direitos-na-rescisao-do-contrato-de-trabalho',
    category: 'Trabalhista',
    title: 'Quais são seus direitos na rescisão do contrato?',
    excerpt:
      'Um guia em linguagem simples sobre verbas rescisórias, aviso prévio, FGTS e o que conferir antes de assinar.',
    readingTime: '7 min',
  },
] as const
