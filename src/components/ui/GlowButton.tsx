import type { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  variant?: 'cyan' | 'success' | 'outline'
  onClick?: () => void
  className?: string
}

const variantStyles = {
  cyan: `
    bg-gradient-to-b from-[#00D9FF22] to-[#00D9FF08]
    border border-[#00D9FF44]
    text-[var(--nx-cyan)]
  `,
  success: `
    bg-gradient-to-b from-[#00FF9D18] to-[#00FF9D08]
    border border-[#00FF9D44]
    text-[var(--nx-success)]
  `,
  outline: `
    border border-[var(--nx-border)]
    text-[var(--nx-text-primary)]
  `,
}

export function GlowButton({
  children,
  variant = 'cyan',
  onClick,
  className = '',
}: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5
        px-4 py-1.5 rounded-[6px]
        font-ui text-xs font-semibold
        transition-all duration-200
        hover:brightness-125 active:scale-[0.97]
        cursor-pointer
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
