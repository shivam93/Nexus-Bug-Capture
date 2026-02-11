import { GlassCard, SectionLabel, StatusDot } from '../../ui'
import type { FleetMetrics } from '../../../types'

interface FleetStatusCardProps {
  metrics: FleetMetrics
}

export function FleetStatusCard({ metrics }: FleetStatusCardProps) {
  const dots = Array.from({ length: metrics.totalAgents }, (_, i) => (
    <StatusDot
      key={i}
      status={i < metrics.activeAgents ? 'active' : 'idle'}
      size="md"
      pulse={i < metrics.activeAgents}
    />
  ))

  return (
    <GlassCard className="flex-1 flex flex-col gap-4 p-6">
      <SectionLabel label="AGENT_FLEET_STATUS" />

      <div className="flex items-center gap-4">
        <div className="flex flex-wrap gap-1.5 flex-1">
          {dots}
        </div>
        <span className="font-mono-nx text-[28px] font-bold text-[var(--nx-cyan)]">
          {metrics.utilizationPercent}%
        </span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <StatusDot status="active" />
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-secondary)]">
            {String(metrics.activeAgents).padStart(2, '0')} Active
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusDot status="idle" />
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-secondary)]">
            {String(metrics.idleAgents).padStart(2, '0')} Idle
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-sm bg-[#1E3A5F]">
        <div
          className="h-full rounded-sm bg-gradient-to-r from-[var(--nx-cyan)] to-[var(--nx-success)]"
          style={{ width: `${metrics.utilizationPercent}%` }}
        />
      </div>
    </GlassCard>
  )
}
