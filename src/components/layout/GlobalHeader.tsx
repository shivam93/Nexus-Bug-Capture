import { NexusLogo } from '../ui/Logo'
import { Settings, Bell, ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    onClick?: () => void
    active?: boolean
}

interface GlobalHeaderProps {
    breadcrumbs: BreadcrumbItem[]
    user?: {
        name: string
        role: string
        avatarColor?: string
    }
}

export function GlobalHeader({ breadcrumbs, user = { name: 'Sarah', role: 'QA' } }: GlobalHeaderProps) {
    return (
        <header className="flex items-center justify-between w-full h-14 px-6 border-b border-white/10 bg-[#0A1420] sticky top-0 z-50 backdrop-blur-md">
            {/* Left: Logo + Breadcrumbs */}
            <div className="flex items-center gap-6">
                {/* Logo - Always goes Home */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={breadcrumbs[0]?.onClick}
                >
                    <NexusLogo className="w-6 h-6 text-[var(--nx-cyan)] group-hover:brightness-125 transition-all" />
                    <span className="font-ui text-[15px] font-bold tracking-[1px] leading-none text-white group-hover:text-[var(--nx-cyan)] transition-colors">
                        NEXUS
                    </span>
                </div>

                {/* Separator */}
                <div className="h-4 w-px bg-white/10" />

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1.5">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            {index > 0 && (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                            )}

                            <button
                                onClick={crumb.onClick}
                                disabled={crumb.active}
                                className={`
                  font-mono-nx text-[11px] font-medium transition-colors
                  ${crumb.active
                                        ? 'text-[var(--nx-text-primary)] cursor-default'
                                        : 'text-[var(--nx-text-muted)] hover:text-[var(--nx-cyan)]'
                                    }
                `}
                            >
                                {index === 0 && crumb.label === 'Home' ? <Home className="w-3.5 h-3.5" /> : crumb.label}
                            </button>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Right: Global Status + Profile */}
            <div className="flex items-center gap-5">
                {/* Systems Online indicator */}
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--nx-success)] animate-pulse-glow" />
                    <span className="font-mono-nx text-[10px] font-bold tracking-[1px] text-[var(--nx-success)] opacity-80">
                        SYSTEMS ONLINE
                    </span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-4">
                    <Settings className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
                    <Bell className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />

                    {/* User */}
                    <div className="flex items-center gap-2 pl-2">
                        <span className="font-ui text-[12px] font-medium text-slate-400">
                            {user.name} <span className="text-slate-600">({user.role})</span>
                        </span>
                        <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[var(--nx-cyan)] to-[#0066AA] opacity-90 shadow-[0_0_15px_rgba(0,217,255,0.2)]" />
                    </div>
                </div>
            </div>
        </header>
    )
}
