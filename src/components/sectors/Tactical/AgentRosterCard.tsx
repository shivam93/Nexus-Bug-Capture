import type { TacticalAgent, TacticalAgentStatus } from '../../../types'

interface AgentRosterCardProps {
  agent: TacticalAgent
  isHighlighted?: boolean
}

const statusConfig: Record<TacticalAgentStatus, {
  label: string
  textColor: string
  bgColor: string
  barColor: string
}> = {
  running: {
    label: 'Running',
    textColor: 'text-[var(--nx-success)]',
    bgColor: 'bg-[var(--nx-success)]/10',
    barColor: 'bg-[var(--nx-success)]',
  },
  idle: {
    label: 'Idle',
    textColor: 'text-slate-400',
    bgColor: 'bg-slate-800/50',
    barColor: 'bg-slate-700',
  },
  triage: {
    label: 'Triage',
    textColor: 'text-[var(--nx-amber)]',
    bgColor: 'bg-[var(--nx-amber)]/10',
    barColor: 'bg-[var(--nx-amber)]',
  },
}

export function AgentRosterCard({ agent, isHighlighted }: AgentRosterCardProps) {
  const config = statusConfig[agent.status]
  const isRunning = agent.status === 'running'

  return (
    <div
      className={`
        flex flex-col gap-2 p-3 rounded-[var(--nx-radius-sm)] border transition-all duration-300
        ${isHighlighted
          ? 'border-[var(--nx-cyan)]/50 shadow-[0_0_20px_rgba(0,217,255,0.2)] bg-[var(--nx-surface-hover)] opacity-100'
          : 'border-white/5 bg-[var(--nx-surface)] opacity-80 hover:opacity-100 hover:bg-[var(--nx-surface-hover)]'
        }
      `}
    >
      {/* Top row: name + status badge */}
      <div className="flex items-center justify-between">
        <span className={`font-mono-nx text-[13px] font-semibold ${isHighlighted ? 'text-[var(--nx-cyan)]' : 'text-[var(--nx-text-primary)]'}`}>
          {agent.name}
        </span>
        <span
          className={`
            px-2 py-0.5 rounded-[3px] font-mono-nx text-[9px] font-bold
            ${config.textColor} ${config.bgColor}
            ${isRunning ? 'animate-pulse-slow' : ''}
          `}
        >
          {config.label}
        </span>
      </div>

      {/* Meta: type | task */}
      <div className="flex items-center gap-2 font-mono-nx text-[10px] text-slate-500">
        {agent.deviceType && (
          <>
            <span>Type: <span className="text-[var(--nx-text-secondary)]">{agent.deviceType}</span></span>
            <span className="text-slate-700">|</span>
          </>
        )}
        {agent.task && <span>Task: <span className="text-[var(--nx-text-secondary)]">{agent.task}</span></span>}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-sm bg-slate-800/50">
          {agent.progress > 0 && (
            <div
              className={`h-full rounded-sm ${config.barColor} ${isRunning ? 'animate-progress-creep' : ''}`}
              style={{ width: `${agent.progress}%` }}
            />
          )}
        </div>
        <span className={`font-mono-nx text-[10px] font-semibold ${config.textColor}`}>
          {agent.progress}%
        </span>
      </div>
    </div>
  )
}
