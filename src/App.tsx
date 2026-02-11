import { useState } from 'react'
import { CommandCenter, ProjectTacticalView, BugDetailView } from './components/dashboard'
import { GlobalHeader } from './components/layout'

type View = 'command-center' | 'tactical' | 'bug-detail'

export default function App() {
  const [view, setView] = useState<View>('command-center')

  // Dynamic Breadcrumb Logic
  const getBreadcrumbs = () => {
    const home = { label: 'Home', onClick: () => setView('command-center') }
    const project = { label: 'Nykaa Fashion', onClick: () => setView('tactical') }

    switch (view) {
      case 'command-center':
        return [{ label: 'Command Center', active: true }]
      case 'tactical':
        return [home, { label: 'Sprint Q1', active: true }] // Plan says "Sprint Q1" or "Nykaa Fashion"? 
      // User request: "State 2: Home / Nykaa Fashion / Sprint Q1". 
      // Let's do: Home / Nykaa Fashion (active) or contextually correct.
      // Actually, let's follow the user's specific example: "Home / Nykaa Fashion / Sprint Q1"
      // But let's verify visual space.
      // Let's stick to a simpler 2-level for functionality or 3-level if needed.
      // User said: "Center: Dynamic Breadcrumbs... State 2: Home / Nykaa Fashion / Sprint Q1"
      // Okay, I'll add that.
      // return [home, { label: 'Nykaa Fashion', active: false }, { label: 'Sprint Q1', active: true }]
      case 'bug-detail':
        return [home, project, { label: 'Bug #402', active: true }]
    }
  }

  // Correction for 'tactical' based on user request "Home / Nykaa Fashion / Sprint Q1"
  const breadcrumbs = view === 'tactical'
    ? [{ label: 'Home', onClick: () => setView('command-center') }, { label: 'Nykaa Fashion' }, { label: 'Sprint Q1', active: true }]
    : getBreadcrumbs()

  return (
    <div className="h-screen w-full flex flex-col bg-[var(--nx-canvas)] bg-grid-pattern text-[var(--nx-text-primary)] font-ui overflow-hidden">
      <GlobalHeader breadcrumbs={breadcrumbs} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {view === 'command-center' && (
          <div className="flex-1 overflow-y-auto">
            <CommandCenter onEnterProject={() => setView('tactical')} />
          </div>
        )}

        {view === 'tactical' && (
          <ProjectTacticalView
            onBack={() => setView('command-center')}
            onViewBug={() => setView('bug-detail')}
          />
        )}

        {view === 'bug-detail' && (
          <BugDetailView
            onBack={() => setView('command-center')}
            onBackToTactical={() => setView('tactical')}
          />
        )}
      </main>
    </div>
  )
}
