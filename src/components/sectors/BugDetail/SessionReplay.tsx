import { useState } from 'react'
import { Rewind, Pause, Play, FastForward, Video, ShieldCheck, TriangleAlert } from 'lucide-react'

interface SessionReplayProps {
  duration: string
}

export function SessionReplay({ duration }: SessionReplayProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="flex flex-col rounded-lg border border-[var(--nx-border)] bg-[var(--nx-surface)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--nx-border)]">
        <div className="flex items-center gap-2">
          <Video className="w-3.5 h-3.5 text-[var(--nx-text-secondary)]" />
          <span className="font-ui text-[13px] font-semibold text-[var(--nx-text-primary)]">
            Session Replay ({duration})
          </span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--nx-success)]/15">
          <ShieldCheck className="w-3 h-3 text-[var(--nx-success)]" />
          <span className="font-mono-nx text-[10px] font-semibold text-[var(--nx-success)]">
            Verified by Agent
          </span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative h-[280px] bg-[var(--nx-terminal-bg)] flex items-center justify-center">
        {/* Play button overlay */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full border border-[var(--nx-cyan)] bg-[var(--nx-cyan)]/8 flex items-center justify-center hover:bg-[var(--nx-cyan)]/15 transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-[var(--nx-cyan)]" />
            ) : (
              <Play className="w-5 h-5 text-[var(--nx-cyan)] ml-0.5" />
            )}
          </button>
          <span className="font-mono-nx text-[10px] text-[var(--nx-text-muted)]">
            Click to replay
          </span>
        </div>

        {/* Error toast overlay */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-2 rounded-md border border-dashed border-[var(--nx-danger)] bg-[var(--nx-danger)]/10">
          <TriangleAlert className="w-3.5 h-3.5 text-[var(--nx-danger)]" />
          <span className="font-mono-nx text-[11px] text-[var(--nx-danger)]">
            Error toast appears here
          </span>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0D1F38]">
        <Rewind className="w-3.5 h-3.5 text-[var(--nx-text-muted)] cursor-pointer hover:text-[var(--nx-text-secondary)] transition-colors" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-[var(--nx-text-primary)]" />
          ) : (
            <Play className="w-4 h-4 text-[var(--nx-text-primary)]" />
          )}
        </button>
        <div className="flex-1 h-1 rounded-full bg-[#1A2A45] relative group">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="47"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="h-full w-[47%] bg-[var(--nx-cyan)] rounded-full group-hover:bg-[var(--nx-cyan)]/80 transition-colors" />
        </div>
        <span className="font-mono-nx text-[10px] text-[var(--nx-text-muted)]">
          00:15 / 00:32
        </span>
        <FastForward className="w-3.5 h-3.5 text-[var(--nx-text-muted)] cursor-pointer hover:text-[var(--nx-text-secondary)] transition-colors" />
      </div>
    </div>
  )
}
