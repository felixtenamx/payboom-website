import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/4 border border-white/16 text-[13px] text-brand-text-muted backdrop-blur-[8px] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_12px_var(--color-brand-orange)] animate-pulse-dot" />
      {children}
    </span>
  )
}