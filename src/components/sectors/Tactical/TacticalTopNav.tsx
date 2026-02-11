import { ChevronDown, Settings, Bell } from 'lucide-react'
import { NexusLogo } from '../../ui/Logo'

interface TacticalTopNavProps {
  projectName: string
  projectUrl: string
  sprint: string
  onBack?: () => void
}

export function TacticalTopNav({ projectName, projectUrl, sprint, onBack }: TacticalTopNavProps) {
  return (
    <div className="flex flex-col shrink-0">
      {/* Top bar */}
      <header className="flex items-center justify-between h-14 px-6 bg-[#0D1F38] border-b border-[var(--nx-border)]">
        {/* Left: logo + breadcrumbs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <NexusLogo className="w-7 h-7 text-[var(--nx-cyan)]" />
            <div className="flex flex-col">
              <span className="font-ui text-[15px] font-bold leading-none text-[var(--nx-text-primary)]">
                Nexus
              </span>
              <span className="font-mono-nx text-[9px] leading-none text-[var(--nx-text-secondary)]">
                Agentic Bug Capture
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 font-mono-nx text-[12px]">
            <button
              onClick={onBack}
              className="text-[var(--nx-text-muted)] hover:text-[var(--nx-cyan)] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-[var(--nx-text-muted)]">/</span>
            <span className="text-[var(--nx-text-muted)]">Project</span>
            <span className="text-[var(--nx-text-muted)]">/</span>
            <span className="font-semibold text-[var(--nx-text-primary)]">{projectName}</span>
          </nav>
        </div>

        {/* Right: swift selector aligns with close project (far right) */}
        <div className="flex items-center gap-4">
          <Settings className="w-[18px] h-[18px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
          <Bell className="w-[18px] h-[18px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
          <div className="flex items-center gap-2 mr-2">
            <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600" />
            <span className="font-ui text-[12px] font-medium text-slate-400">
              Sarah (QA)
            </span>
          </div>

          {/* Sprint Selector - Moves to far right for alignment */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--nx-radius-sm)] border border-slate-700 bg-[var(--nx-surface)] hover:border-slate-500 transition-colors cursor-pointer">
            <span className="font-mono-nx text-[11px] text-[var(--nx-text-secondary)]">
              {sprint}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--nx-text-secondary)]" />
          </div>
        </div>
      </header>

      {/* Project header row */}
      <div className="flex items-center justify-between h-20 px-6 bg-[#0D1F38]">
        {/* Left: project info */}
        <div className="flex flex-col gap-0.5">
          <span className="font-mono-nx text-[10px] font-medium tracking-[1px] text-[var(--nx-text-secondary)]">
            Project
          </span>
          <div className="flex items-center gap-2">
            <span className="font-ui text-[24px] font-bold text-[var(--nx-text-primary)]">
              {projectName}
            </span>
            <ChevronDown className="w-5 h-5 text-[var(--nx-text-secondary)]" />
          </div>
          <span className="font-mono-nx text-[10px] text-[var(--nx-text-muted)]">
            {projectUrl}
          </span>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-[6px] border border-[var(--nx-border)] font-ui text-[13px] font-semibold text-[var(--nx-text-primary)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-pointer">
            Test
          </button>
          <button className="px-5 py-2 rounded-[6px] border border-[var(--nx-border)] font-ui text-[13px] font-semibold text-[var(--nx-text-primary)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-pointer">
            New Sprint
          </button>
          <button className="px-5 py-2 rounded-[6px] bg-[var(--nx-cyan)] font-ui text-[13px] font-semibold text-[var(--nx-canvas)] hover:brightness-110 transition-all cursor-pointer">
            Close Project
          </button>
        </div>
      </div>
    </div>
  )
}
