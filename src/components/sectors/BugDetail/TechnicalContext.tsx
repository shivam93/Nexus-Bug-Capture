import { useState } from 'react'
import { Terminal, Wifi, Code, Sparkles } from 'lucide-react'
import { LogStream, type LogStreamEntry } from '../../ui/LogStream'
import type { ConsoleLogEntry } from '../../../types'

interface TechnicalContextProps {
  logs: ConsoleLogEntry[]
}

const tabs = [
  { id: 'console', label: 'Console', icon: Terminal },
  { id: 'network', label: 'Network', icon: Wifi },
  { id: 'dom', label: 'DOM', icon: Code },
  { id: 'ai-fix', label: 'AI Fix', icon: Sparkles },
] as const

type TabId = (typeof tabs)[number]['id']

const severityColorMap: Record<string, string> = {
  error: 'text-[var(--nx-danger)]',
  warning: 'text-[var(--nx-amber)]',
  info: 'text-[var(--nx-text-secondary)]',
}

export function TechnicalContext({ logs }: TechnicalContextProps) {
  const [activeTab, setActiveTab] = useState<TabId>('console')

  // Map only if console is active, or pre-map
  const streamEntries: LogStreamEntry[] = logs.map(log => ({
    id: log.id,
    timestamp: log.timestamp,
    label: log.source,
    labelColor: 'text-slate-500',
    message: log.message,
    messageColor: severityColorMap[log.severity]
  }))

  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-lg border border-white/10 bg-[var(--nx-surface)] overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center px-4 border-b border-white/10 shrink-0 bg-[#0A1420]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-4 py-2.5 cursor-pointer transition-colors
                ${isActive
                  ? 'border-b-2 border-[var(--nx-cyan)] text-[var(--nx-cyan)] bg-white/[0.02]'
                  : 'text-[var(--nx-text-muted)] hover:text-[var(--nx-text-secondary)] hover:bg-white/[0.01]'
                }
              `}
            >
              <Icon className="w-[13px] h-[13px]" />
              <span className={`font-ui text-xs ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-[#0A1420]">
        {activeTab === 'console' ? (
          <LogStream
            title="// SYSTEM_OUTPUT"
            status="live"
            entries={streamEntries}
            className="rounded-none border-none h-full bg-transparent"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 font-mono-nx text-xs">
            // {activeTab.toUpperCase()}_FEED_PENDING...
          </div>
        )}
      </div>
    </div>
  )
}
