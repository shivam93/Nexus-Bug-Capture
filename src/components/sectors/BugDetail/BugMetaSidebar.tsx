import { Smartphone } from 'lucide-react'
import type { BugDetail, BugTimelineEntry } from '../../../types'
import { SectionLabel } from '../../ui'

interface BugMetaSidebarProps {
  bug: BugDetail
  timeline: BugTimelineEntry[]
}

const severityColorMap: Record<string, string> = {
  critical: 'var(--nx-danger)',
  high: 'var(--nx-amber)',
  medium: 'var(--nx-cyan)',
  low: 'var(--nx-text-secondary)',
}

const bugTypeColorMap: Record<string, string> = {
  danger: 'var(--nx-danger)',
  amber: 'var(--nx-amber)',
  cyan: 'var(--nx-cyan)',
}

const timelineColorMap: Record<string, string> = {
  danger: 'var(--nx-danger)',
  cyan: 'var(--nx-cyan)',
  success: 'var(--nx-success)',
  muted: 'var(--nx-text-muted)',
}

const timelineDimColorMap: Record<string, string> = {
  danger: 'rgba(255, 68, 68, 0.2)',
  cyan: 'rgba(0, 217, 255, 0.12)',
  success: 'rgba(0, 255, 157, 0.2)',
  muted: 'transparent',
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#1A2A45]">
      <span className="font-mono-nx text-[11px] text-[var(--nx-text-muted)]">{label}</span>
      {children}
    </div>
  )
}

export function BugMetaSidebar({ bug, timeline }: BugMetaSidebarProps) {
  return (
    <aside className="w-[280px] shrink-0 bg-[#0E1E35] border-r border-[var(--nx-border)] flex flex-col overflow-y-auto">
      {/* Section header */}
      <div className="px-5 pt-5 pb-3">
        <SectionLabel label="BUG_METADATA" />
      </div>

      {/* Metadata fields */}
      <div className="flex flex-col">
        <MetaRow label="Status">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: severityColorMap[bug.severity] }}
            />
            <span
              className="font-mono-nx text-[11px] font-semibold capitalize"
              style={{ color: severityColorMap[bug.severity] }}
            >
              {bug.status}
            </span>
          </div>
        </MetaRow>

        <MetaRow label="Priority">
          <span
            className="px-2 py-0.5 rounded font-mono-nx text-[10px] font-semibold capitalize"
            style={{
              color: severityColorMap[bug.priority],
              backgroundColor: `color-mix(in srgb, ${severityColorMap[bug.priority]} 15%, transparent)`,
            }}
          >
            {bug.priority}
          </span>
        </MetaRow>

        <MetaRow label="Assignee">
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-cyan)]">
            {bug.assignee}
          </span>
        </MetaRow>

        <MetaRow label="Type">
          <span
            className="px-2 py-0.5 rounded font-mono-nx text-[10px] font-semibold"
            style={{
              color: bugTypeColorMap[bug.bugTypeColor],
              backgroundColor: `color-mix(in srgb, ${bugTypeColorMap[bug.bugTypeColor]} 15%, transparent)`,
            }}
          >
            {bug.bugType}
          </span>
        </MetaRow>

        <MetaRow label="Device">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3 h-3 text-[var(--nx-text-secondary)]" />
            <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-primary)]">
              {bug.device}
            </span>
          </div>
        </MetaRow>

        <MetaRow label="Browser">
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-primary)]">
            {bug.browser}
          </span>
        </MetaRow>

        <MetaRow label="Found">
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-primary)]">
            {bug.foundAt}
          </span>
        </MetaRow>

        <MetaRow label="Sprint">
          <span className="font-mono-nx text-[11px] font-medium text-[var(--nx-text-primary)]">
            {bug.sprint}
          </span>
        </MetaRow>
      </div>

      {/* Timeline section */}
      <div className="mt-5">
        <div className="px-5 pb-3">
          <SectionLabel label="TIMELINE" />
        </div>

        <div className="flex flex-col">
          {timeline.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 px-5 py-2">
              <span
                className="mt-1 w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: timelineColorMap[entry.color],
                  boxShadow: `0 0 6px ${timelineDimColorMap[entry.color]}`,
                }}
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-mono-nx text-[10px] text-[var(--nx-text-muted)]">
                  {entry.timestamp}
                </span>
                <span className="font-ui text-[11px] text-[var(--nx-text-primary)] leading-snug">
                  {entry.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
