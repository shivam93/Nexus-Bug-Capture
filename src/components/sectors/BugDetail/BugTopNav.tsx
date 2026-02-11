import { Settings, Bell, Hexagon } from 'lucide-react'

interface BugTopNavProps {
  projectName: string
  bugId: string
}

export function BugTopNav({ projectName }: BugTopNavProps) {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-[#0D1F38] border-b border-[var(--nx-border)] shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-[var(--nx-cyan)]" />
          <span className="font-ui text-[15px] font-bold text-[var(--nx-text-primary)]">
            Nexus
          </span>
          <span className="font-ui text-sm text-[var(--nx-text-muted)]">/</span>
          <span className="font-ui text-sm font-medium text-[var(--nx-text-secondary)]">
            Agentic Bug Capture — {projectName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Settings className="w-5 h-5 text-[var(--nx-text-muted)] hover:text-[var(--nx-text-secondary)] transition-colors cursor-pointer" />
        <Bell className="w-5 h-5 text-[var(--nx-text-muted)] hover:text-[var(--nx-text-secondary)] transition-colors cursor-pointer" />
        <div className="flex items-center gap-2">
          <span className="font-ui text-[13px] font-medium text-[var(--nx-text-secondary)]">
            Sarah (QA)
          </span>
          <div className="w-7 h-7 rounded-full bg-[var(--nx-surface-hover)]" />
        </div>
      </div>
    </header>
  )
}
