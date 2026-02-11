import { GlassCard, Badge, StatusDot } from '../../ui'
import type { Project } from '../../../types'

interface ProjectCardProps {
  project: Project
  onEnter?: () => void
}

const healthColorMap = {
  healthy: 'text-[var(--nx-success)]',
  attention: 'text-[var(--nx-amber)]',
  critical: 'text-[var(--nx-danger)]',
}

const glowMap = {
  healthy: 'success' as const,
  attention: 'warning' as const,
  critical: 'danger' as const,
}

export function ProjectCard({ project, onEnter }: ProjectCardProps) {
  return (
    <div onClick={onEnter} className="flex-1 flex flex-col">
      <GlassCard
        className="overflow-hidden bg-slate-900 border-slate-800 hover:border-[rgba(0,217,255,0.5)] transition-colors cursor-pointer group h-full"
        glow={glowMap[project.health]}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex flex-col gap-2">
            <span className="font-ui text-[15px] font-semibold text-slate-200 group-hover:text-white transition-colors">
              {project.rank}. {project.name}
            </span>
            <div className="flex gap-1.5">
              <Badge label={project.tier} variant="cyan" />
              <Badge label={project.releaseIn} variant="muted" />
            </div>
          </div>
          {/* Subtle arrow instead of button */}
          <span className="font-mono-nx text-[10px] text-slate-600 group-hover:text-cyan-400 transition-colors">
            ENTER_PROJECT &rarr;
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2.5 px-5 py-3">
          <div className="flex items-center gap-1.5">
            <StatusDot status={project.health} />
            <span className={`font-ui text-[13px] font-semibold ${healthColorMap[project.health]}`}>
              {project.healthLabel}
            </span>
          </div>
          <span className="font-mono-nx text-[10px] text-slate-500">
            {project.statusDescription}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800" />

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900/50">
          <div className="flex flex-col gap-1">
            <span className="font-ui text-xs font-medium text-slate-500">
              Test Results
            </span>
            <span className="font-mono-nx text-[10px] text-slate-400">
              Pass: {project.testResults.pass}, Fail {project.testResults.fail}, Flaky: {project.testResults.flaky}
            </span>
          </div>
          <span className="font-mono-nx text-[10px] font-medium text-slate-500">
            Agents Assigned: {project.agentsAssigned}
          </span>
        </div>
      </GlassCard>
    </div>
  )
}
