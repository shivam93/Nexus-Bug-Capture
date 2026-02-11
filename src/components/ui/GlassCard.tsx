import type { ReactNode } from 'react'

export interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: 'none' | 'success' | 'warning' | 'danger'
  onClick?: () => void
}

const glowStyles = {
  none: '',
  success: 'shadow-[0_0_20px_rgba(0,255,157,0.06)]',
  warning: 'shadow-[0_2px_20px_rgba(245,158,11,0.08)]',
  danger: 'shadow-[0_0_20px_rgba(255,68,68,0.08)]',
}

export function GlassCard({ children, className = '', glow = 'none', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[var(--nx-surface)] rounded-[var(--nx-radius-md)]
        border border-white/10
        shadow-[var(--nx-shadow-card)]
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
