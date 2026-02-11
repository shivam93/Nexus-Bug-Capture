import { NexusLogo } from '../ui/Logo'
import { Settings, Bell } from 'lucide-react'

interface TopNavProps {
  className?: string
}

export function TopNav({ className = '' }: TopNavProps) {
  return (
    <header className={`flex items-center justify-between w-full h-16 px-8 ${className}`}>
      {/* Brand */}
      <div className="flex items-center gap-3">
        <NexusLogo className="w-6 h-6 text-[var(--nx-cyan)]" />
        <div className="flex items-center gap-3">
          <span className="font-ui text-[15px] font-bold tracking-[1px] leading-none text-white">
            NEXUS
          </span>
          <span className="w-px h-3 bg-slate-800" />
          <span className="font-mono-nx text-[10px] font-medium tracking-[0.5px] leading-none text-slate-500">
            AGENCY COMMAND
          </span>
        </div>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-5">
        {/* Systems Online indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--nx-success)] animate-pulse-glow" />
          <span className="font-mono-nx text-[10px] font-semibold tracking-[1px] text-[var(--nx-success)]">
            SYSTEMS ONLINE
          </span>
        </div>

        <Settings className="w-5 h-5 text-[var(--nx-text-secondary)] hover:text-[var(--nx-text-primary)] transition-colors cursor-pointer" />
        <Bell className="w-5 h-5 text-[var(--nx-text-secondary)] hover:text-[var(--nx-text-primary)] transition-colors cursor-pointer" />

        {/* User */}
        <div className="flex items-center gap-2">
          <span className="font-ui text-[13px] font-medium text-[var(--nx-text-primary)]">
            Sarah (QA)
          </span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[var(--nx-cyan)] to-[#0066AA]" />
        </div>
      </div>
    </header>
  )
}
