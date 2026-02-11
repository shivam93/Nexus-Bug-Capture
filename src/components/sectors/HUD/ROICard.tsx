import { GlassCard, SectionLabel } from '../../ui'
import type { ROIMetrics } from '../../../types'

interface ROICardProps {
  metrics: ROIMetrics
}

export function ROICard({ metrics }: ROICardProps) {
  return (
    <GlassCard className="flex-1 flex flex-col gap-3.5 p-6">
      <SectionLabel label="ESTIMATED_ROI" />

      <span className="font-ui text-[13px] font-medium text-[var(--nx-text-secondary)]">
        Estimated ROI (This week)
      </span>

      <span className="font-mono-nx text-4xl font-bold tracking-tight text-gradient-cyan">
        {metrics.saved}
      </span>

      <span className="font-mono-nx text-[11px] text-[var(--nx-text-muted)]">
        Saved &nbsp;&bull;&nbsp; {metrics.rate}
      </span>
    </GlassCard>
  )
}
