import { ChevronDown } from 'lucide-react'

interface ProjectHeaderProps {
    projectName: string
    projectUrl: string
    sprint: string
}

export function ProjectHeader({ projectName, projectUrl, sprint }: ProjectHeaderProps) {
    return (
        <div className="flex items-center justify-between h-20 px-6 shrink-0 bg-[#0D1F38] border-b border-white/5">
            {/* Left: project info */}
            <div className="flex flex-col gap-0.5">
                <span className="font-mono-nx text-[10px] font-medium tracking-[1px] text-[var(--nx-text-secondary)] uppercase">
                    Project
                </span>
                <div className="flex items-center gap-2">
                    <span className="font-ui text-[24px] font-bold text-[var(--nx-text-primary)]">
                        {projectName}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[var(--nx-text-secondary)] opacity-50" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-mono-nx text-[10px] text-[var(--nx-text-muted)]">
                        {projectUrl}
                    </span>
                </div>
            </div>

            {/* Right: action buttons & Sprint Selector */}
            <div className="flex items-center gap-3">
                {/* Sprint Selector - Moved here from TopNav */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--nx-radius-sm)] border border-white/10 bg-[var(--nx-surface)] hover:border-white/20 transition-colors cursor-pointer mr-2">
                    <span className="font-mono-nx text-[11px] text-[var(--nx-text-secondary)]">
                        {sprint}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--nx-text-secondary)]" />
                </div>

                <button className="px-5 py-2 rounded-[6px] border border-white/10 font-ui text-[13px] font-semibold text-[var(--nx-text-primary)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-pointer">
                    Test
                </button>
                <button className="px-5 py-2 rounded-[6px] border border-white/10 font-ui text-[13px] font-semibold text-[var(--nx-text-primary)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-pointer">
                    New Sprint
                </button>
                <button className="px-5 py-2 rounded-[6px] bg-[var(--nx-cyan)] font-ui text-[13px] font-semibold text-[#003344] hover:brightness-110 transition-all cursor-pointer">
                    Close Project
                </button>
            </div>
        </div>
    )
}
