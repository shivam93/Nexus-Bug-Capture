import { useState } from 'react'
import {
  ProjectHeader,
  HudRibbon,
  AgentRoster,
  MissionBoard,
  TelemetryFeed,
} from '../sectors/Tactical'
import {
  projectGlobalStats,
  tacticalAgents,
  missionTasks,
  telemetryEntries,
} from '../../data/mock-data'

interface ProjectTacticalViewProps {
  onBack?: () => void
  onViewBug?: () => void
}

export function ProjectTacticalView({ onViewBug }: ProjectTacticalViewProps) {
  const [highlightedAgent, setHighlightedAgent] = useState<string | null>(null)

  return (
    <div className="flex-1 flex flex-col bg-[var(--nx-canvas)] overflow-hidden">
      {/* ── Top: Project Header ────────────── */}
      <ProjectHeader
        projectName="Nykaa Fashion"
        projectUrl="https://www.nykaafashion.com/"
        sprint="Sprint : Q1 2026 checkout redesign"
      />

      {/* ── HUD Stats Ribbon ─────────────────────── */}
      <HudRibbon stats={projectGlobalStats} />

      {/* ── Body: Holy Grail 3-Column Layout ─────── */}
      <div className="flex-1 flex min-h-0">
        {/* Zone A: Agent Roster (Highlighter) */}
        <AgentRoster
          agents={tacticalAgents}
          highlightedAgentName={highlightedAgent}
        />

        {/* Zone B: Mission Board (Trigger) */}
        <MissionBoard
          tasks={missionTasks}
          onViewBug={onViewBug}
          onTaskHover={setHighlightedAgent}
        />

        {/* Zone C: Telemetry Feed */}
        <TelemetryFeed entries={telemetryEntries} />
      </div>
    </div>
  )
}
