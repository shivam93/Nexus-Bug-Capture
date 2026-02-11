import type { ReactNode } from 'react'
import { TopNav } from './TopNav'

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="h-screen w-full bg-[var(--nx-canvas)] bg-grid-pattern overflow-y-auto">
      <TopNav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--nx-canvas)]/80 border-b border-[var(--nx-border)]" />
      <main className="flex-1 flex flex-col gap-8 px-10 py-8">
        {children}
      </main>
    </div>
  )
}
