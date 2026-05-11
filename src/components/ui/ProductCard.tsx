import { useRef, useCallback } from 'react'
import type { ReactNode, PointerEvent } from 'react'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  icon: string
  title: string
  description: string
  items: string[]
  href: string
  external?: boolean
  iconVariant: 'icon-1' | 'icon-2' | 'icon-3' | 'icon-4'
}

const iconVariants = {
  'icon-1': { color: '#f05215', glow: 'rgba(240,82,21,0.25)' },
  'icon-2': { color: '#049ea0', glow: 'rgba(4,158,160,0.25)' },
  'icon-3': { color: '#06c4c7', glow: 'rgba(6,196,199,0.25)' },
  'icon-4': { color: '#ff7a45', glow: 'rgba(255,122,69,0.25)' },
}

const icons: Record<string, ReactNode> = {
  'card': (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
      <rect x="3" y="7" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 12h26" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 19h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'globe': (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 16h24M16 4c4 4 4 20 0 24M16 4c-4 4-4 20 0 24" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'code': (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
      <path d="M10 8L4 16l6 8M22 8l6 8-6 8M19 6l-6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'shield': (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
      <path d="M16 3l11 4v9c0 7-5 11-11 13-6-2-11-6-11-13V7l11-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M11 16l4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

export default function ProductCard({ icon, title, description, items, href, external, iconVariant }: ProductCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = useCallback((e: React.PointerEvent) => {
    const card = ref.current
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)

    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`
  }, [])

  const handleLeave = useCallback(() => {
    const card = ref.current
    if (!card) return
    card.style.transform = ''
  }, [])

  const vars = iconVariants[iconVariant]

  const content = (
    <>
      <div
        className="w-14 h-14 rounded-[14px] grid place-items-center mb-6 bg-white/8 border border-white/16"
        style={{ color: vars?.color, boxShadow: `inset 0 0 30px ${vars?.glow}`, transform: 'translateZ(20px)' }}
      >
        {icons[icon] || null}
      </div>
      <h3 className="text-[22px] font-semibold tracking-tight mb-2.5">{title}</h3>
      <p className="text-brand-text-muted text-[15px] mb-[18px]">{description}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-brand-text-muted pl-[22px] relative before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded before:bg-gradient-to-br before:from-brand-orange before:to-brand-teal">
            {item}
          </li>
        ))}
      </ul>
      <span className="inline-block mt-[18px] text-sm font-semibold text-brand-orange-light transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-teal-light">
        {external ? 'Ver documentación →' : 'Saber más →'}
      </span>
    </>
  )

  const className = "group relative p-8 card-glass rounded-[20px] block cursor-pointer"

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className} ref={ref} onPointerMove={handleMove} onPointerLeave={handleLeave}>
        {content}
      </a>
    )
  }

  return (
    <Link to={href} className={className} ref={ref} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {content}
    </Link>
  )
}