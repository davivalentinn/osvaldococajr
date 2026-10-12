type Props = {
  id: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  inverted?: boolean
}

export function SectionHeading({ id, eyebrow, title, description, inverted = false }: Props) {
  return (
    <div data-reveal className="max-w-2xl">
      <p
        className={`flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase ${
          inverted ? 'text-primary-foreground/75' : 'text-accent'
        }`}
      >
        <span aria-hidden="true" className={`h-px w-8 ${inverted ? 'bg-primary-foreground/40' : 'bg-accent'}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-5 font-serif text-3xl leading-[1.1] text-balance md:text-5xl ${
          inverted ? 'text-primary-foreground' : 'text-foreground'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed text-pretty md:text-lg ${
            inverted ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
