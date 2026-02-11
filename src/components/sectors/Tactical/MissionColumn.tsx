import type { MissionTask } from '../../../types'
import { MissionCard } from './MissionCard'

interface MissionColumnProps {
  title: string
  subtitle?: string
  titleColor?: string
  tasks: MissionTask[]
  onCardClick?: () => void
  onTaskHover?: (agentName: string | null) => void
}

export function MissionColumn({ title, subtitle, titleColor = 'text-[var(--nx-text-primary)]', tasks, className, onCardClick, onTaskHover }: MissionColumnProps & { className?: string }) {
  return (
    <div className={`flex-1 flex flex-col gap-3 min-w-0 h-full p-2 ${className}`}>
      {/* Column header - Fixed height for alignment */}
      <div className="flex flex-col gap-0.5 py-2 min-h-[52px] justify-center">
        <span className={`font-ui text-[15px] font-bold ${titleColor}`}>
          {title}
        </span>
        {subtitle && (
          <span className="font-mono-nx text-[10px] text-[var(--nx-text-secondary)]">
            {subtitle}
          </span>
        )}
      </div>

      {/* Card list */}
      <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <MissionCard
            key={task.id}
            task={task}
            onClick={onCardClick}
            onMouseEnter={() => onTaskHover?.(task.title)}
            onMouseLeave={() => onTaskHover?.(null)}
          />
        ))}
      </div>
    </div>
  )
}
