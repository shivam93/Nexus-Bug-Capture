
import { Terminal } from 'lucide-react'

export interface LogStreamEntry {
    id: string
    timestamp: string
    label: string
    labelColor?: string
    message: string
    messageColor?: string
}

interface LogStreamProps {
    title?: string
    status?: 'live' | 'connected'
    entries: LogStreamEntry[]
    className?: string
    height?: string
}

export function LogStream({
    title = '// LIVE_INTEL_FEED',
    status = 'live',
    entries,
    className = '',
    height = 'h-full'
}: LogStreamProps) {

    const statusColor = 'bg-[var(--nx-success)]'
    const statusText = status === 'live' ? 'LIVE' : 'CONNECTED'

    return (
        <div className={`flex flex-col bg-[#0A1420] rounded-[var(--nx-radius-md)] border border-white/5 overflow-hidden ${height} ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0A1420]">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--nx-cyan)]" />
                    <span className="font-mono-nx text-[10px] font-bold tracking-[1px] text-[var(--nx-cyan)] opacity-90">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor} animate-pulse-glow`} />
                    <span className="font-mono-nx text-[9px] font-bold text-[var(--nx-success)] opacity-90 tracking-wider">
                        {statusText}
                    </span>
                </div>
            </div>

            {/* Log Body */}
            <div className="flex flex-col gap-1 p-3 overflow-y-auto flex-1 bg-[#0A1420] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {entries.map((entry, i) => (
                    <div
                        key={entry.id}
                        className="flex gap-3 items-baseline animate-slide-in-left group hover:bg-white/[0.02] rounded px-2 py-0.5 transition-colors"
                        style={{ animationDelay: `${i * 40}ms` }}
                    >
                        {/* Timestamp */}
                        <span className="font-mono-nx text-[10px] font-medium text-slate-600 shrink-0 select-none w-[45px] opacity-60">
                            {entry.timestamp}
                        </span>

                        {/* Content Container */}
                        <div className="flex gap-2 min-w-0 items-baseline flex-1">
                            {/* Label (Agent/Source) */}
                            <span className={`font-mono-nx text-[10px] font-semibold shrink-0 opacity-80 ${entry.labelColor || 'text-slate-500'}`}>
                                [{entry.label}]
                            </span>

                            {/* Message */}
                            <span className={`font-mono-nx text-[10px] truncate opacity-90 flex-1 ${entry.messageColor || 'text-slate-300'}`}>
                                {entry.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
