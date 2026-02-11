import { Plus } from 'lucide-react'
import { SectionLabel, GlowButton } from '../ui'
import { FleetStatusCard, DefectVelocityCard, ROICard } from '../sectors/HUD'
import { ProjectCard } from '../sectors/MissionControl'
import { IntelFeed } from '../sectors/LiveFeed'
import { AgentCard } from '../sectors/AgentPool'
import {
  fleetMetrics,
  defectMetrics,
  roiMetrics,
  projects,
  unassignedAgents,
  logEntries,
} from '../../data/mock-data'

interface CommandCenterProps {
  onEnterProject?: () => void
}

export function CommandCenter({ onEnterProject }: CommandCenterProps) {
  return (
    <div className="flex flex-col gap-8 px-10 py-8 min-h-full">
      {/* ── Greeting ──────────────────────────────── */}
      <section className="flex flex-col gap-1.5">
        <h1 className="font-ui text-[32px] font-bold tracking-tight text-[var(--nx-text-primary)]">
          Good morning, Sarah
        </h1>
        <p className="font-ui text-sm text-[var(--nx-text-secondary)]">
          Your fleet of 15 agents saved you 12 hours of manual testing yesterday.
        </p>
      </section>

      {/* ── Sector A: Heads-Up Display ────────────── */}
      <section className="flex gap-4">
        <FleetStatusCard metrics={fleetMetrics} />
        <DefectVelocityCard metrics={defectMetrics} />
        <ROICard metrics={roiMetrics} />
      </section>

      {/* ── Sector B: Mission Control ─────────────── */}
      <section className="flex flex-col gap-6 flex-1 min-h-0">
        <div className="flex items-center justify-between">
          <h2 className="font-ui text-[20px] font-bold text-[var(--nx-text-primary)]">
            Active Projects ({projects.length})
          </h2>
          <GlowButton variant="outline">
            <Plus className="w-3.5 h-3.5 text-[var(--nx-cyan)]" />
            New Project
          </GlowButton>
        </div>

        <div className="flex gap-4 h-full">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onEnter={onEnterProject} />
          ))}
        </div>
      </section>

      {/* ── Bottom Console: Agent Pool + Live Feed ── */}
      <section className="flex flex-col gap-4 mt-auto pt-6 border-t border-white/5">
        <h3 className="font-mono-nx text-[10px] font-bold text-slate-500 tracking-[1px]">
          // SYSTEM_CONSOLE
        </h3>
        <div className="flex gap-5 h-[240px]">
          {/* Agent Pool */}
          <div className="w-[380px] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-ui text-[13px] font-semibold text-slate-300">
                Agent Pool (Unassigned)
              </span>
              <SectionLabel label="IDLE_AGENTS" />
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto pr-2">
              {unassignedAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-full bg-slate-800" />

          {/* Sector C: Live Intel Feed */}
          <div className="flex-1 min-w-0">
            <IntelFeed entries={logEntries} />
          </div>
        </div>
      </section>
    </div>
  )
}
