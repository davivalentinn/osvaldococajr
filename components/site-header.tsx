'use client'

import { Menu, MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TrackedLink } from '@/components/tracked-link'
import { siteConfig, whatsappHref } from '@/lib/site-config'

const navItems = [
  { href: '#areas', label: 'Áreas' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#conteudo-informativo', label: 'Artigos' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`flex size-9 items-center justify-center rounded-full border font-serif text-lg italic ${
          inverted ? 'border-primary-foreground/40 text-primary-foreground' : 'border-primary/30 text-primary'
        }`}
      >
        {siteConfig.shortName.replace(/[\[\]]/g, '').charAt(0) || 'A'}
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-lg ${inverted ? 'text-primary-foreground' : 'text-foreground'}`}>
          {siteConfig.shortName}
        </span>
        <span
          className={`mt-1 text-[0.65rem] font-medium tracking-[0.2em] uppercase ${
            inverted ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}
        >
          Advocacia
        </span>
      </span>
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <a href="#topo" aria-label={`${siteConfig.name} — início`} className="rounded-sm">
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            href={whatsappHref()}
            event="whatsapp_click"
            location="header"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </TrackedLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navegação principal (mobile)" className="border-t border-border lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-border/60 font-serif text-xl text-foreground last:border-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
