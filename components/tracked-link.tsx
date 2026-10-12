'use client'

import type { AnchorHTMLAttributes } from 'react'
import { track, type TrackEvent } from '@/lib/tracking'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: TrackEvent
  location: string
}

export function TrackedLink({ event, location, onClick, ...props }: Props) {
  const isExternal = props.href?.startsWith('http')
  return (
    <a
      {...props}
      target={isExternal ? '_blank' : props.target}
      rel={isExternal ? 'noopener noreferrer' : props.rel}
      onClick={(e) => {
        track(event, { location })
        onClick?.(e)
      }}
    />
  )
}
