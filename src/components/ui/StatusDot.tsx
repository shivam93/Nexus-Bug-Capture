import type { ProjectHealth, AgentStatus } from '../../types'

interface StatusDotProps {
  status: ProjectHealth | AgentStatus | 'active' | 'idle'
  size?: 'sm' | 'md'
  pulse?: boolean
}

const colorMap: Record<string, string> = {
  healthy: 'bg-[var(--nx-success)]',
  active:  'bg-[var(--nx-success)]',
  attention: 'bg-[var(--nx-amber)]',
  critical: 'bg-[var(--nx-danger)]',
  error:   'bg-[var(--nx-danger)]',
  idle:    'bg-[var(--nx-text-muted)]',
}

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-[10px] h-[10px]',
}

export function StatusDot({ status, size = 'sm', pulse = false }: StatusDotProps) {
  return (
    <span
      className={`
        inline-block rounded-full
        ${sizeMap[size]}
        ${colorMap[status] ?? colorMap.idle}
        ${pulse ? 'animate-pulse-glow' : ''}
      `}
    />
  )
}
