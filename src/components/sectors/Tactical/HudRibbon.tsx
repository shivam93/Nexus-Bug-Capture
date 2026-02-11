import type { ProjectGlobalStats } from '../../../types'

interface HudRibbonProps {
  stats: ProjectGlobalStats
}

const statItems = [
  { key: 'activeAgents' as const, label: 'Agents Active', color: 'bg-[var(--nx-success)]' },
  { key: 'testsPerHour' as const, label: 'Tests/hr', color: 'bg-[var(--nx-cyan)]' },
  { key: 'bugsFound' as const, label: 'New bugs found', color: 'bg-[var(--nx-danger)]' },
  { key: 'passRate' as const, label: 'Pass', color: 'bg-[var(--nx-success)]' },
]

export function HudRibbon({ stats }: HudRibbonProps) {
  return (
    <div className="flex items-center justify-between h-11 px-6 shrink-0 bg-[#0B1A2E] border-b border-[var(--nx-border)]">
      <span className="font-mono-nx text-[11px] font-semibold tracking-[0.5px] text-[var(--nx-text-secondary)]">
        // GLOBAL_STATUS
      </span>

      <div className="flex items-center gap-8">
        {statItems.map(({ key, label, color }) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            <span className="font-mono-nx text-[12px] font-medium text-[var(--nx-text-primary)]">
              {stats[key]} {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
