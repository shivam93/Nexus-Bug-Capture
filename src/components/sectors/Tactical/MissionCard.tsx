import { Smartphone, Monitor } from 'lucide-react'
import type { MissionTask } from '../../../types'

interface MissionCardProps {
  task: MissionTask
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const deviceIcons = {
  smartphone: Smartphone,
  monitor: Monitor,
}

const priorityColorMap = {
  danger: 'text-[var(--nx-danger)]',
  amber: 'text-[var(--nx-amber)]',
  cyan: 'text-[var(--nx-cyan)]',
}


function QueueCard({ task }: { task: MissionTask }) {
  return (
    <div className="flex flex-col gap-2.5 p-3 rounded-[var(--nx-radius-sm)] bg-[var(--nx-surface)] border border-dashed border-white/10 opacity-60 hover:opacity-100 transition-opacity">
      {/* Devices planned */}
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <span className="font-mono-nx text-[10px] text-slate-500">
          {task.devicesPlanned} Devices planned
        </span>
      </div>

      {/* Title */}
      <span className="font-ui text-[14px] font-semibold text-slate-400">
        {task.title}
      </span>

      {/* Priority + Scope */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono-nx text-[9px] text-slate-600">Priority</span>
          <span className={`font-mono-nx text-[11px] font-semibold ${task.priorityColor ? priorityColorMap[task.priorityColor] : ''} opacity-80`}>
            {task.priority}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono-nx text-[9px] text-slate-600">Scope</span>
          <span className="font-mono-nx text-[11px] font-medium text-slate-400">
            {task.scope}
          </span>
        </div>
      </div>
    </div>
  )
}

function ActiveCard({ task, onMouseEnter, onMouseLeave }: { task: MissionTask, onMouseEnter?: () => void, onMouseLeave?: () => void }) {
  const DeviceIcon = task.deviceIcon ? deviceIcons[task.deviceIcon] : null

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col gap-2 p-3 rounded-[var(--nx-radius-sm)] bg-[var(--nx-surface)] border border-l-2 border-white/5 border-l-[var(--nx-cyan)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-default"
    >
      {/* Device + Assignee */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {DeviceIcon && <DeviceIcon className="w-3 h-3 text-[var(--nx-cyan)]" />}
          <span className="font-mono-nx text-[10px] text-[var(--nx-text-secondary)]">
            {task.device}
          </span>
        </div>
        <span className={`font-mono-nx text-[10px] font-medium ${task.assignee === 'Sarah' ? 'text-[var(--nx-cyan)]' : 'text-slate-500'}`}>
          {task.assignee}
        </span>
      </div>

      {/* Agent name */}
      <span className="font-ui text-[13px] font-semibold text-white">
        {task.title}
      </span>

      {/* Status + progress */}
      <div className="flex items-center justify-between">
        <span className={`font-mono-nx text-[10px] ${task.status === 'Loading URL' ? 'text-slate-500' : 'text-[var(--nx-amber)]'}`}>
          Status: {task.status}
        </span>
        <span className="font-mono-nx text-[11px] font-bold text-[var(--nx-cyan)]">
          {task.progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] rounded-sm bg-slate-800/50">
        <div
          className="h-full rounded-sm bg-gradient-to-r from-[var(--nx-cyan)] to-[var(--nx-success)] animate-progress-creep"
          style={{ width: `${task.progress}%` }}
        />
      </div>
    </div>
  )
}

function ReviewCard({ task, onClick }: { task: MissionTask; onClick?: () => void }) {
  // Much simpler border logic - solid slate-800 unless specific failure
  const borderColor = 'border-white/5'

  return (
    <div onClick={task.bugId ? onClick : undefined} className={`flex flex-col gap-2 p-3 rounded-[var(--nx-radius-sm)] bg-[var(--nx-surface)] border ${borderColor} ${task.passed ? 'opacity-50' : 'opacity-80'} ${task.bugId && onClick ? 'cursor-pointer hover:bg-[var(--nx-surface-hover)] transition-colors' : ''}`}>
      {/* Top: type badge or latency + status dot */}
      <div className="flex items-center justify-between">
        {task.bugType && task.bugTypeColor && (
          <span className={`px-2 py-0.5 rounded-[3px] font-mono-nx text-[9px] font-bold text-slate-300 bg-slate-800`}>
            {task.bugType}
          </span>
        )}
        {task.latency && (
          <span className="px-2 py-0.5 rounded-[3px] font-mono-nx text-[9px] font-bold text-slate-400 bg-slate-800">
            {task.latency}
          </span>
        )}
        {task.bugType && (
          <span className={`w-2 h-2 rounded-full ${task.bugTypeColor === 'danger' ? 'bg-[var(--nx-danger)]' : 'bg-[var(--nx-amber)]'}`} />
        )}
        {task.passed !== undefined && !task.bugType && (
          <span className="font-mono-nx text-[9px] font-semibold text-slate-500 cursor-pointer hover:underline">
            View Log
          </span>
        )}
      </div>

      {/* Bug ID or Title */}
      <span className={`font-ui text-[14px] font-bold ${task.bugId ? 'text-white' : 'text-slate-400'}`}>
        {task.bugId ?? task.title}
      </span>

      {/* Description or passed status */}
      {task.bugId && (
        <span className="font-mono-nx text-[11px] text-slate-500">
          {task.title}
        </span>
      )}
      {task.passed && (
        <span className="font-mono-nx text-[11px] font-bold text-[var(--nx-success)]">
          PASSED
        </span>
      )}
    </div>
  )
}

export function MissionCard({ task, onClick, onMouseEnter, onMouseLeave }: MissionCardProps) {
  switch (task.stage) {
    case 'queue':
      return <QueueCard task={task} />
    case 'active':
      return <ActiveCard task={task} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    case 'review':
      return <ReviewCard task={task} onClick={onClick} />
  }
}
