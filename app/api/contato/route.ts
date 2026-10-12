import { NextResponse } from 'next/server'

/**
 * Recebe o formulário de contato e encaminha para um webhook (Formspree, Make, n8n, Zapier...).
 * Configure em Vars: CONTACT_WEBHOOK_URL (fica só no servidor, nunca exposta no front-end).
 *
 * Exemplos de URL:
 *  - Formspree: https://formspree.io/f/SEU_ID          (aceita JSON com header Accept: application/json)
 *  - Make:      https://hook.us1.make.com/SEU_HOOK
 *  - n8n:       https://seu-n8n.com/webhook/contato
 */

const MAX = { nome: 120, whatsapp: 20, area: 80, mensagem: 600, pagina: 500 }

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot preenchido = bot. Responde sucesso para não dar pistas.
  if (clean(body.empresa, 200)) return NextResponse.json({ ok: true })

  const data = {
    nome: clean(body.nome, MAX.nome),
    whatsapp: clean(body.whatsapp, MAX.whatsapp),
    area: clean(body.area, MAX.area),
    mensagem: clean(body.mensagem, MAX.mensagem),
    consentimento: body.consentimento === true,
    pagina: clean(body.pagina, MAX.pagina),
    utms:
      body.utms && typeof body.utms === 'object'
        ? Object.fromEntries(
            Object.entries(body.utms as Record<string, unknown>)
              .slice(0, 10)
              .map(([k, v]) => [k.slice(0, 30), clean(v, 200)]),
          )
        : {},
    recebidoEm: new Date().toISOString(),
  }

  const digits = data.whatsapp.replace(/\D/g, '')
  if (data.nome.length < 2 || digits.length < 10 || digits.length > 11 || !data.area || data.mensagem.length < 10) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 })
  }
  if (!data.consentimento) {
    return NextResponse.json({ ok: false, error: 'consent_required' }, { status: 422 })
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contato] CONTACT_WEBHOOK_URL não definida — envio simulado em desenvolvimento.')
      return NextResponse.json({ ok: true, simulated: true })
    }
    // Em produção, falhar é melhor do que perder o contato silenciosamente: o usuário vê a opção de WhatsApp.
    console.error('[contato] CONTACT_WEBHOOK_URL não configurada em produção.')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contato] Falha ao encaminhar:', error instanceof Error ? error.message : error)
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 })
  }
}
