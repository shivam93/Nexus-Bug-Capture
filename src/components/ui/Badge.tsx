interface BadgeProps {
  label: string
  variant?: 'cyan' | 'muted'
}

export function Badge({ label, variant = 'cyan' }: BadgeProps) {
  const styles = variant === 'cyan'
    ? 'text-[var(--nx-cyan)]'
    : 'text-[var(--nx-text-secondary)]'

  return (
    <span
      className={`
        inline-flex items-center px-2 py-[3px]
        bg-[#1E3A5F] rounded-[var(--nx-radius-sm)]
        font-mono-nx text-[9px] font-semibold
        ${styles}
      `}
    >
      {label}
    </span>
  )
}
