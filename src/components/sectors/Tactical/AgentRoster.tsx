import type { TacticalAgent } from '../../../types'
import { AgentRosterCard } from './AgentRosterCard'

interface AgentRosterProps {
  agents: TacticalAgent[]
  highlightedAgentName?: string | null
}

export function AgentRoster({ agents, highlightedAgentName }: AgentRosterProps) {
  const activeCount = agents.filter(a => a.status === 'running').length

  return (
    <aside className="flex flex-col w-[280px] shrink-0 bg-[#0E1E35] border-r border-white/5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between h-11 px-4 shrink-0 border-b border-white/5 bg-[#0E1E35]/90">
        <span className="font-mono-nx text-[11px] font-semibold tracking-[0.5px] text-[var(--nx-text-secondary)]">
          // AGENT_FLEET
        </span>
        <span className="font-mono-nx text-[10px] font-semibold text-[var(--nx-success)]">
          [{activeCount} ACTIVE]
        </span>
      </div>

      {/* Scrollable agent list */}
      <div className="flex-1 flex flex-col gap-2 px-3 py-3 overflow-y-auto">
        {agents.map((agent) => (
          <AgentRosterCard
            key={agent.id}
            agent={agent}
            isHighlighted={highlightedAgentName === agent.name}
          />
        ))}
      </div>
    </aside>
  )
}
