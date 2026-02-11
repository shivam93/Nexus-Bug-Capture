import { useState } from 'react'
import type { RecordedEvent } from '../../../types'

interface PluginSidebarProps {
    events: RecordedEvent[]
    onSave: () => void
    isRecording: boolean
    elapsedTime: number
    onToggleRecording: () => void
    onReset: () => void
    onUpdateEvent: (eventId: string, updates: Partial<RecordedEvent>) => void
}

export function PluginSidebar({
    events,
    onSave,
    isRecording,
    elapsedTime,
    onToggleRecording,
    onReset,
    onUpdateEvent
}: PluginSidebarProps) {
    const [expandedStepId, setExpandedStepId] = useState<string | null>(null)

    // Format mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Context UI Data
    const activeProject = "Nykaa Fashion"
    const sessionGoal = "Navigation Test"

    const handleToggleExpand = (eventId: string) => {
        setExpandedStepId(prev => prev === eventId ? null : eventId)
    }

    const handleToggleBugFlag = (event: RecordedEvent) => {
        onUpdateEvent(event.id, { isFlaggedAsBug: !event.isFlaggedAsBug })
    }

    const handleCommentChange = (event: RecordedEvent, comment: string) => {
        onUpdateEvent(event.id, { comment })
    }

    return (
        <div className="w-[360px] h-full bg-[var(--nx-surface)] border-l border-[var(--nx-border)] flex flex-col shadow-2xl z-50">
            {/* ── SECTION A: CONTEXT (Top) ───────────────────────────── */}
            <div className="shrink-0 border-b border-[var(--nx-border)] bg-[var(--nx-canvas)]">
                {/* Header */}
                <div className="h-14 flex items-center px-4 justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--nx-cyan)] shadow-[0_0_8px_var(--nx-cyan)]" />
                        <span className="font-ui font-bold text-[var(--nx-text-primary)] tracking-wide">Nexus Agent</span>

                        {/* Recording Timer Badge */}
                        {isRecording && (
                            <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 ml-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] text-red-400 font-mono-nx tracking-wide">REC {formatTime(elapsedTime)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Retry Button (show when not recording and has events) */}
                        {!isRecording && events.length > 0 && (
                            <button
                                onClick={onReset}
                                className="flex items-center space-x-1 px-2 py-1 rounded text-[10px] font-medium text-[var(--nx-text-secondary)] hover:text-[var(--nx-cyan)] hover:bg-[var(--nx-surface)] transition-colors"
                                title="Retry Test"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                </svg>
                                <span>RETRY</span>
                            </button>
                        )}

                        {/* Connected Badge */}
                        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-400 font-mono-nx tracking-wide">CONNECTED</span>
                        </div>
                    </div>
                </div>

                {/* Dropdowns */}
                <div className="px-4 pb-4 space-y-3">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--nx-text-secondary)] uppercase tracking-wider">Project</label>
                        <div className="w-full bg-[var(--nx-surface)] border border-[var(--nx-border)] rounded px-3 py-2 text-sm text-[var(--nx-text-primary)] font-medium flex justify-between items-center cursor-default">
                            <span>{activeProject}</span>
                            <svg className="w-4 h-4 text-[var(--nx-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[var(--nx-text-secondary)] uppercase tracking-wider">Testing Goal</label>
                        <div className="w-full bg-[var(--nx-surface)] border border-[var(--nx-border)] rounded px-3 py-2 text-sm text-[var(--nx-text-primary)] font-medium flex justify-between items-center cursor-default">
                            <span>{sessionGoal}</span>
                            <svg className="w-4 h-4 text-[var(--nx-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION B: RECORDER (Middle - Flex Grow) ───────────── */}
            <div className="flex-1 flex flex-col min-h-0 bg-[#020617]">
                <div className="px-4 py-2 border-b border-[var(--nx-border)] flex justify-between items-center bg-[var(--nx-surface)]/50">
                    <span className="text-[10px] font-bold text-[var(--nx-text-muted)] uppercase tracking-wider">Recorded Steps</span>
                    {isRecording && <div className="font-mono-nx text-xs text-[var(--nx-cyan)]">{formatTime(elapsedTime)}</div>}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {!isRecording && events.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-[var(--nx-text-muted)] space-y-2 opacity-60">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12" y2="16" /></svg>
                            <span className="text-xs">Waiting for action...</span>
                        </div>
                    )}

                    {events.map((event, index) => {
                        const isExpanded = expandedStepId === event.id
                        const hasBugFlag = event.isFlaggedAsBug
                        const hasComment = event.comment && event.comment.trim().length > 0

                        return (
                            <div key={event.id} className="animate-slide-in-left">
                                {/* Step Card */}
                                <div
                                    className={`
                                        group p-3 rounded border transition-all cursor-pointer
                                        ${isExpanded
                                            ? 'bg-[var(--nx-surface)] border-[var(--nx-cyan)]'
                                            : 'bg-[var(--nx-surface)]/30 border-[var(--nx-border)] hover:bg-[var(--nx-surface)]/50 hover:border-[var(--nx-border)]'
                                        }
                                    `}
                                    onClick={() => handleToggleExpand(event.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 flex-1">
                                            <span className="text-xs font-mono-nx text-[var(--nx-text-muted)] mt-0.5">{index + 1}.</span>
                                            <div className="space-y-0.5 flex-1">
                                                <div className="text-xs text-[var(--nx-text-primary)] font-mono-nx leading-tight">
                                                    <span className="text-[var(--nx-cyan)] mr-2">[{event.type.toUpperCase()}]</span>
                                                    {event.description}
                                                </div>
                                                <div className="text-[10px] text-[var(--nx-text-muted)] truncate opacity-40">
                                                    {event.selector}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1 ml-2">
                                            {/* Bug Flag Indicator */}
                                            {hasBugFlag && (
                                                <div className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center" title="Flagged as bug">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-500">
                                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                                        <path d="M12 9v4" />
                                                        <path d="M12 17h.01" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Comment Indicator */}
                                            {hasComment && !hasBugFlag && (
                                                <div className="w-5 h-5 rounded bg-[var(--nx-cyan)]/20 flex items-center justify-center" title="Has comment">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--nx-cyan)]">
                                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Expand Icon */}
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className={`text-[var(--nx-text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Step Detail View (Expanded) */}
                                {isExpanded && (
                                    <div className="mt-2 p-3 bg-[var(--nx-canvas)] border border-[var(--nx-border)] rounded space-y-3 animate-fade-in-up">
                                        {/* Meta Info */}
                                        <div className="space-y-1 text-[10px]">
                                            <div className="flex justify-between">
                                                <span className="text-[var(--nx-text-muted)]">Selector</span>
                                                <span className="text-[var(--nx-text-secondary)] font-mono-nx">{event.selector || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[var(--nx-text-muted)]">Timestamp</span>
                                                <span className="text-[var(--nx-text-secondary)] font-mono-nx">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-[var(--nx-border)] pt-3 space-y-2">
                                            {/* Flag as Bug Toggle */}
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={hasBugFlag || false}
                                                    onChange={(e) => {
                                                        e.stopPropagation()
                                                        handleToggleBugFlag(event)
                                                    }}
                                                    className="w-4 h-4 rounded border-[var(--nx-border)] bg-[var(--nx-surface)] checked:bg-red-500 checked:border-red-500 transition-colors"
                                                />
                                                <span className="text-xs text-[var(--nx-text-secondary)] group-hover:text-[var(--nx-text-primary)]">Flag as Bug</span>
                                            </label>

                                            {/* Comment Field */}
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-[var(--nx-text-secondary)] uppercase">Note / Comment</label>
                                                <textarea
                                                    value={event.comment || ''}
                                                    onChange={(e) => {
                                                        e.stopPropagation()
                                                        handleCommentChange(event, e.target.value)
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    placeholder="Add note or bug description..."
                                                    rows={3}
                                                    className="w-full bg-[var(--nx-surface)] border border-[var(--nx-border)] rounded p-2 text-xs text-[var(--nx-text-primary)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--nx-cyan)] placeholder:text-[var(--nx-text-muted)]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ── SECTION C: ACTIONS (Bottom - Sticky) ───────────────── */}
            <div className="p-4 border-t border-[var(--nx-border)] bg-[var(--nx-canvas)] space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-10">
                <button
                    className={`
                        w-full py-4 rounded font-bold text-sm shadow-lg transition-all transform flex items-center justify-center space-x-2
                        ${isRecording
                            ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20'
                            : 'bg-[var(--nx-cyan)] text-black hover:bg-[#00b8d4] hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] hover:-translate-y-0.5'
                        }
                    `}
                    onClick={onToggleRecording}
                >
                    {isRecording ? (
                        <>
                            <div className="w-2 h-2 rounded bg-red-500 animate-pulse" />
                            <span>STOP RECORDING</span>
                        </>
                    ) : (
                        <>
                            <div className="w-2 h-2 rounded-full bg-black" />
                            <span>START RECORDING</span>
                        </>
                    )}
                </button>

                {!isRecording && events.length > 0 && (
                    <button
                        onClick={onSave}
                        className="w-full py-3 rounded font-medium text-sm bg-[var(--nx-cyan)] text-black hover:bg-[#00b8d4] transition-all transform hover:-translate-y-0.5 shadow-md flex items-center justify-center space-x-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>SAVE SESSION</span>
                    </button>
                )}

                {events.length > 0 && (
                    <button
                        onClick={onReset}
                        className="w-full py-2 text-xs font-medium text-[var(--nx-text-muted)] hover:text-[var(--nx-text-primary)] transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>
        </div>
    )
}
