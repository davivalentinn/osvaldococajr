'use client'

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const viewportHeight = window.innerHeight
    // Elementos já visíveis no carregamento não são escondidos (evita "piscar" acima da dobra).
    for (const el of elements) {
      if (el.getBoundingClientRect().top < viewportHeight) el.classList.add('is-visible')
    }
    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    for (const el of elements) if (!el.classList.contains('is-visible')) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return null
}
