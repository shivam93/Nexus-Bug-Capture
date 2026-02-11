import { ShieldCheck } from 'lucide-react'
import type { BugDetail } from '../../../types'

interface BugHudRibbonProps {
  bug: BugDetail
}

export function BugHudRibbon({ bug }: BugHudRibbonProps) {
  return (
    <div className="flex items-center justify-between h-11 px-6 bg-[#0B1A2E] border-b border-[var(--nx-border)] shrink-0">
      <span className="font-mono-nx text-[11px] font-semibold tracking-wide text-[var(--nx-text-secondary)]">
        // BUG_STATUS
      </span>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1.5">
          <span className="font-mono-nx text-[10px] tracking-wide text-[var(--nx-text-muted)]">Severity</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--nx-danger)]" />
          <span className="font-mono-nx text-[11px] font-semibold text-[var(--nx-danger)]">Critical</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono-nx text-[10px] tracking-wide text-[var(--nx-text-muted)]">Device</span>
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-primary)]">{bug.device} / {bug.browser}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono-nx text-[10px] tracking-wide text-[var(--nx-text-muted)]">Agent</span>
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-cyan)]">{bug.assignee}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono-nx text-[10px] tracking-wide text-[var(--nx-text-muted)]">Duration</span>
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-primary)]">{bug.sessionDuration}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono-nx text-[10px] tracking-wide text-[var(--nx-text-muted)]">Verified</span>
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--nx-success)]" />
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-success)]">By Agent</span>
        </div>
      </div>
    </div>
  )
}
