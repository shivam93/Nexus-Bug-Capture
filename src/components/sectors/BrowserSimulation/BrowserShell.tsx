import React from 'react'

interface BrowserShellProps {
    url?: string
    children: React.ReactNode
    onReset?: () => void
}

export function BrowserShell({ url = 'https://nykaafashion.com', children, onReset }: BrowserShellProps) {
    return (
        <div className="flex flex-col h-full bg-[#0F172A] overflow-hidden border-b border-[var(--nx-border)]">
            {/* Chrome Top Bar (Deep Space) */}
            <div className="flex items-center px-4 py-3 bg-[#0F172A] border-b border-[#1E293B] space-x-4">
                {/* Traffic Lights */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center space-x-3 text-slate-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-slate-300 transition-colors cursor-pointer" onClick={onReset}><title>Reset Simulation</title><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-slate-300 transition-colors opacity-50"><path d="m15 18-6-6 6-6" /></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-slate-300 transition-colors opacity-50"><path d="m9 18 6-6-6-6" /></svg>
                </div>

                {/* Address Bar */}
                <div className="flex-1 bg-[#1E293B] rounded-lg px-4 py-1.5 text-sm text-slate-300 flex items-center shadow-inner mx-2 font-ui group focus-within:ring-1 focus-within:ring-[var(--nx-cyan)] transition-all">
                    <svg className="w-4 h-4 mr-3 text-slate-500 group-focus-within:text-[var(--nx-cyan)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="selection:bg-[var(--nx-cyan)] selection:text-black">{url}</span>

                    {/* Reset Action (Alternative location inside bar, or keep in nav) */}
                    {onReset && (
                        <button onClick={onReset} className="ml-2 p-1 hover:bg-slate-700 rounded-full transition-colors group-hover:text-white text-slate-500" title="Reset Session">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                        </button>
                    )}
                </div>

                {/* Extensions / Menu */}
                <div className="flex items-center space-x-4 text-slate-500">
                    <div className="w-7 h-7 rounded bg-[var(--nx-cyan)] flex items-center justify-center text-xs font-bold text-black cursor-pointer hover:bg-[#00b8d4] shadow-[0_0_10px_rgba(0,217,255,0.3)] transition-all">N</div>
                    <div className="flex space-x-1">
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                    </div>
                </div>
            </div>

            {/* Viewport content */}
            <div className="flex-1 relative bg-white overflow-hidden scrollbar-hide">
                {children}
            </div>
        </div>
    )
}
