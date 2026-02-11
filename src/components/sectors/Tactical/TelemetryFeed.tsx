import { LogStream, type LogStreamEntry } from '../../ui/LogStream'
import type { TelemetryEntry } from '../../../types'

interface TelemetryFeedProps {
  entries: TelemetryEntry[]
}



const msgColorMap = {
  amber: 'text-[var(--nx-amber)]',
  secondary: 'text-[var(--nx-text-secondary)]',
  success: 'text-[var(--nx-success)]',
  danger: 'text-[var(--nx-danger)]',
  cyan: 'text-[var(--nx-cyan)]',
}

const agentColorMap: Record<string, string> = {
  'Capture': 'text-[var(--nx-text-primary)]',
  'Triage': 'text-[var(--nx-danger)]',
  'Verify': 'text-[var(--nx-success)]',
}

function getAgentColor(name: string): string {
  const prefix = name.split('-')[0]
  return agentColorMap[prefix] ?? 'text-[var(--nx-text-primary)]'
}

export function TelemetryFeed({ entries }: TelemetryFeedProps) {
  const streamEntries: LogStreamEntry[] = entries.map(entry => ({
    id: entry.id,
    timestamp: entry.timestamp,
    label: entry.agent, // Using Agent Name as label
    labelColor: getAgentColor(entry.agent),
    message: `[${entry.tag}] ${entry.message}`, // Combining Tag and Message
    messageColor: msgColorMap[entry.messageColor]
  }))

  return (
    <aside className="w-[320px] shrink-0 h-full flex flex-col border-l border-white/5 bg-[#0A1019]">
      <LogStream
        title="// TELEMETRY_FEED"
        status="connected"
        entries={streamEntries}
        className="rounded-none border-none bg-transparent"
      />
    </aside>
  )
}
