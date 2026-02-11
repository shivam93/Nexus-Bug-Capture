import type { Agent } from '../../../types'

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border border-slate-800 rounded flex-shrink-0">
      <div className="flex flex-col gap-0.5">
        <span className="font-ui text-[13px] font-semibold text-slate-300">
          {agent.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono-nx text-[10px] text-slate-500 uppercase">{agent.platform}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="font-mono-nx text-[10px] text-slate-500">Idle</span>
        </div>
      </div>
      <button className="px-3 py-1 rounded border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 text-[10px] font-mono-nx text-slate-400 transition-colors uppercase tracking-wider">
        Assign
      </button>
    </div>
  )
}
