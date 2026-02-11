import { ChevronDown, MousePointerClick, RotateCcw, CircleCheck, Link } from 'lucide-react'
import type { BugDetail } from '../../../types'

interface BugHeaderProps {
  bug: BugDetail
}

export function BugHeader({ bug }: BugHeaderProps) {
  return (
    <div className="flex flex-col gap-3 px-6 py-4 pb-5 bg-[#0D1F38] shrink-0 border-b border-white/5">


      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-[var(--nx-danger)]/20 rounded text-[10px] font-mono-nx font-bold tracking-wider text-[var(--nx-danger)]">
            BUG
          </span>
          <h1 className="font-ui text-xl font-semibold text-[var(--nx-text-primary)]">
            {bug.title}
          </h1>
          <ChevronDown className="w-[18px] h-[18px] text-[var(--nx-text-muted)]" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-[var(--nx-border)] bg-[var(--nx-surface)] font-ui text-xs font-medium text-[var(--nx-text-primary)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-pointer">
            <MousePointerClick className="w-3.5 h-3.5 text-[var(--nx-text-secondary)]" />
            Test Manually
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-[var(--nx-cyan)] bg-[var(--nx-cyan)]/10 font-ui text-xs font-semibold text-[var(--nx-cyan)] hover:bg-[var(--nx-cyan)]/20 transition-colors cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
            Retest
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-[var(--nx-success)] bg-[var(--nx-success)]/10 font-ui text-xs font-semibold text-[var(--nx-success)] hover:bg-[var(--nx-success)]/20 transition-colors cursor-pointer">
            <CircleCheck className="w-3.5 h-3.5" />
            Resolve
          </button>
        </div>
      </div>

      {/* URL */}
      <div className="flex items-center gap-2">
        <Link className="w-3 h-3 text-[var(--nx-text-muted)]" />
        <span className="font-mono-nx text-[11px] text-[var(--nx-text-muted)]">{bug.url}</span>
      </div>
    </div>
  )
}
