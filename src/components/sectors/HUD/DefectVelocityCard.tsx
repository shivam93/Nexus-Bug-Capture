import { Bug, Check } from 'lucide-react'
import { GlassCard, SectionLabel } from '../../ui'
import type { DefectMetrics } from '../../../types'

interface DefectVelocityCardProps {
  metrics: DefectMetrics
}

export function DefectVelocityCard({ metrics }: DefectVelocityCardProps) {
  return (
    <GlassCard className="flex-1 flex flex-col gap-3.5 p-6">
      <SectionLabel label="DEFECT_VELOCITY" />

      <span className="font-ui text-[13px] font-medium text-[var(--nx-text-secondary)]">
        Total defect velocity
      </span>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Bug className="w-4 h-4 text-[var(--nx-danger)]" />
          <span className="font-mono-nx text-sm font-semibold text-[var(--nx-text-primary)]">
            {metrics.found} found
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-[var(--nx-success)]" />
          <span className="font-mono-nx text-sm font-semibold text-[var(--nx-text-primary)]">
            {String(metrics.idle).padStart(2, '0')} Idle
          </span>
        </div>
      </div>

      <span className="font-mono-nx text-[11px] text-[var(--nx-text-muted)]">
        {metrics.sprintDelta}
      </span>
    </GlassCard>
  )
}
