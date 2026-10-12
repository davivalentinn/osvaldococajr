'use client'

import Link from 'next/link'
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { TrackedLink } from '@/components/tracked-link'
import { practiceAreas, whatsappHref } from '@/lib/site-config'
import { getUtms, track } from '@/lib/tracking'

type Fields = { nome: string; whatsapp: string; area: string; mensagem: string; consentimento: boolean }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const MAX_MESSAGE = 600

export function maskPhoneBR(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (f.nome.trim().length < 2) errors.nome = 'Informe seu nome.'
  const digits = f.whatsapp.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) errors.whatsapp = 'Informe um número com DDD, ex.: (11) 91234-5678.'
  if (!f.area) errors.area = 'Selecione o assunto.'
  if (f.mensagem.trim().length < 10) errors.mensagem = 'Conte em poucas palavras o que está acontecendo.'
  if (!f.consentimento) errors.consentimento = 'É necessário autorizar o uso dos dados para retornarmos o contato.'
  return errors
}

const inputBase =
  'mt-2 block w-full min-h-12 rounded-md border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-destructive'

export function ContactForm() {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<Fields>({ nome: '', whatsapp: '', area: '', mensagem: '', consentimento: false })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...fields, [key]: value }
    setFields(next)
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
  }

  const blur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validate(fields)[key] }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    setTouched({ nome: true, whatsapp: true, area: true, mensagem: true, consentimento: true })
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    const honeypot = (formRef.current?.elements.namedItem('empresa') as HTMLInputElement | null)?.value ?? ''
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, empresa: honeypot, utms: getUtms(), pagina: window.location.href }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      track('form_submit', { area: fields.area })
      setStatus('success')
    } catch {
      track('form_error', { area: fields.area })
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-border bg-background p-8 md:p-10">
        <CircleCheck className="size-8 text-primary" aria-hidden="true" />
        <h3 className="mt-5 font-serif text-3xl text-foreground">Mensagem recebida.</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Obrigado, {fields.nome.split(' ')[0]}. Vamos retornar pelo WhatsApp informado em até [24h úteis] para agendar
          a conversa. Se for urgente, fale conosco diretamente.
        </p>
        <TrackedLink
          href={whatsappHref()}
          event="whatsapp_click"
          location="form_sucesso"
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4"
        >
          Abrir o WhatsApp
        </TrackedLink>
      </div>
    )
  }

  const describe = (key: keyof Fields, extra?: string) =>
    [errors[key] ? `${uid}-${key}-erro` : '', extra].filter(Boolean).join(' ') || undefined

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="contato-form-title"
      className="relative overflow-hidden rounded-lg border border-border bg-background p-6 md:p-10"
    >
      <h3 id="contato-form-title" className="font-serif text-2xl text-foreground md:text-3xl">
        Envie uma mensagem
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">Leva menos de um minuto. Campos com * são obrigatórios.</p>

      <div className="mt-8 grid gap-6">
        <div>
          <label htmlFor={`${uid}-nome`} className="text-sm font-medium text-foreground">
            Nome *
          </label>
          <input
            id={`${uid}-nome`}
            name="nome"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            value={fields.nome}
            maxLength={120}
            onChange={(e) => update('nome', e.target.value)}
            onBlur={() => blur('nome')}
            aria-invalid={!!errors.nome}
            aria-describedby={describe('nome')}
            className={inputBase}
          />
          <FieldError id={`${uid}-nome-erro`} message={errors.nome} />
        </div>

        <div>
          <label htmlFor={`${uid}-whatsapp`} className="text-sm font-medium text-foreground">
            WhatsApp *
          </label>
          <input
            id={`${uid}-whatsapp`}
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(00) 00000-0000"
            value={fields.whatsapp}
            onChange={(e) => update('whatsapp', maskPhoneBR(e.target.value))}
            onBlur={() => blur('whatsapp')}
            aria-invalid={!!errors.whatsapp}
            aria-describedby={describe('whatsapp')}
            className={inputBase}
          />
          <FieldError id={`${uid}-whatsapp-erro`} message={errors.whatsapp} />
        </div>

        <div>
          <label htmlFor={`${uid}-area`} className="text-sm font-medium text-foreground">
            Assunto *
          </label>
          <select
            id={`${uid}-area`}
            name="area"
            value={fields.area}
            onChange={(e) => update('area', e.target.value)}
            onBlur={() => blur('area')}
            aria-invalid={!!errors.area}
            aria-describedby={describe('area')}
            className={inputBase}
          >
            <option value="" disabled>
              Selecione a área
            </option>
            {practiceAreas.map((a) => (
              <option key={a.id} value={a.title}>
                {a.title}
              </option>
            ))}
            <option value="Outro / não sei">Outro / não sei dizer</option>
          </select>
          <FieldError id={`${uid}-area-erro`} message={errors.area} />
        </div>

        <div>
          <label htmlFor={`${uid}-mensagem`} className="text-sm font-medium text-foreground">
            Breve descrição *
          </label>
          <textarea
            id={`${uid}-mensagem`}
            name="mensagem"
            rows={4}
            maxLength={MAX_MESSAGE}
            placeholder="Ex.: Meu benefício foi negado em março e gostaria de entender se cabe recurso."
            value={fields.mensagem}
            onChange={(e) => update('mensagem', e.target.value)}
            onBlur={() => blur('mensagem')}
            aria-invalid={!!errors.mensagem}
            aria-describedby={describe('mensagem', `${uid}-mensagem-dica`)}
            className={`${inputBase} py-3`}
          />
          <p id={`${uid}-mensagem-dica`} className="mt-2 flex justify-between gap-4 text-xs text-muted-foreground">
            <span>Não inclua dados sensíveis (como documentos ou laudos) nesta etapa.</span>
            <span aria-hidden="true" className="tabular-nums">
              {fields.mensagem.length}/{MAX_MESSAGE}
            </span>
          </p>
          <FieldError id={`${uid}-mensagem-erro`} message={errors.mensagem} />
        </div>

        {/* Honeypot: invisível para pessoas, preenchido por bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-empresa`}>Empresa</label>
          <input id={`${uid}-empresa`} name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground">
            <input
              type="checkbox"
              name="consentimento"
              checked={fields.consentimento}
              onChange={(e) => update('consentimento', e.target.checked)}
              onBlur={() => blur('consentimento')}
              aria-invalid={!!errors.consentimento}
              aria-describedby={describe('consentimento')}
              className="mt-0.5 size-5 shrink-0 accent-primary"
            />
            <span>
              Autorizo o uso dos meus dados para que o escritório entre em contato sobre esta solicitação, conforme a{' '}
              <Link href="/politica-de-privacidade" className="text-accent underline underline-offset-2">
                Política de Privacidade
              </Link>
              . *
            </span>
          </label>
          <FieldError id={`${uid}-consentimento-erro`} message={errors.consentimento} />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              Enviando...
            </>
          ) : (
            'Enviar e agendar conversa'
          )}
        </button>

        <div aria-live="polite" className="empty:hidden">
          {status === 'error' && (
            <p className="flex gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                Não foi possível enviar agora. Tente novamente em instantes ou{' '}
                <TrackedLink
                  href={whatsappHref()}
                  event="whatsapp_click"
                  location="form_erro"
                  className="font-medium underline underline-offset-2"
                >
                  fale pelo WhatsApp
                </TrackedLink>
                .
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
      <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}
