import { LogStream, type LogStreamEntry } from '../../ui/LogStream'
import type { LogEntry } from '../../../types'

interface IntelFeedProps {
  entries: LogEntry[]
}

export function IntelFeed({ entries }: IntelFeedProps) {
  // Map domain LogEntry to UI LogStreamEntry
  const streamEntries: LogStreamEntry[] = entries.map(entry => {
    let messageColor = 'text-slate-400'
    if (entry.severity === 'error') messageColor = 'text-[var(--nx-danger)]'
    if (entry.severity === 'success') messageColor = 'text-[var(--nx-success)]'

    return {
      id: entry.id,
      timestamp: entry.timestamp,
      label: entry.agentId,
      labelColor: 'text-slate-600',
      message: entry.message,
      messageColor
    }
  })

  return (
    <LogStream
      title="// LIVE_INTEL_FEED"
      status="live"
      entries={streamEntries}
    />
  )
}
