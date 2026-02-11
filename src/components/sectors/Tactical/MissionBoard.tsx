import type { MissionTask } from '../../../types'
import { MissionColumn } from './MissionColumn'

interface MissionBoardProps {
  tasks: MissionTask[]
  onViewBug?: () => void
  onTaskHover?: (agentName: string | null) => void
}

export function MissionBoard({ tasks, onViewBug, onTaskHover }: MissionBoardProps) {
  const queue = tasks.filter(t => t.stage === 'queue')
  const active = tasks.filter(t => t.stage === 'active')
  const review = tasks.filter(t => t.stage === 'review')

  return (
    <main className="flex-1 flex gap-4 p-5 min-w-0 overflow-hidden bg-[#0A1019]">
      <MissionColumn
        title="Test Goals"
        subtitle="Queue"
        tasks={queue}
        className="bg-slate-900/40 rounded-lg border border-white/5"
      />
      <MissionColumn
        title="In Progress"
        subtitle="Testing"
        titleColor="text-[var(--nx-cyan)]"
        tasks={active}
        className="bg-slate-900/40 rounded-lg border border-white/5"
        onTaskHover={onTaskHover}
      />
      <MissionColumn
        title="Need Review"
        tasks={review}
        className="bg-slate-900/40 rounded-lg border border-white/5"
        onCardClick={onViewBug}
      />
    </main>
  )
}
