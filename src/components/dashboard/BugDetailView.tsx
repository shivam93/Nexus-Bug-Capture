import { useState } from 'react'
import {
  BugHeader,
  BugHudRibbon,
  BugMetaSidebar,
  SessionReplay,
  TechnicalContext,
  AgentIntelSidebar,
} from '../sectors/BugDetail'
import {
  bugDetail,
  consoleLogs,
  bugTimeline,
  agentAnalysis,
  verificationLoop as initialVerification,
  relatedBugs,
} from '../../data/mock-data'
import type { VerificationLoop } from '../../types'

interface BugDetailViewProps {
  onBack?: () => void
  onBackToTactical?: () => void
}

export function BugDetailView({ }: BugDetailViewProps) {
  const [verification, setVerification] = useState<VerificationLoop>(initialVerification)

  const handleVerify = () => {
    // 1. Set to running
    setVerification(prev => ({
      ...prev,
      status: 'running',
      statusLabel: 'Agent running regression...',
    }))

    // 2. Simulate delay then success
    setTimeout(() => {
      setVerification(prev => ({
        ...prev,
        status: 'passed',
        statusLabel: 'Verification passed (v2.1.0)',
      }))
    }, 2000)
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--nx-canvas)] overflow-hidden">
      {/* Bug header with title + actions (Breadcrumbs via GlobalHeader) */}
      <BugHeader
        bug={bugDetail}
      />

      {/* HUD status ribbon */}
      <BugHudRibbon bug={bugDetail} />

      {/* Body: 3-column grid layout */}
      <div className="flex-1 flex min-h-0">
        {/* Zone A: Bug Metadata (280px fixed) */}
        <BugMetaSidebar bug={bugDetail} timeline={bugTimeline} />

        {/* Zone B: Evidence Stage (fills remaining space) */}
        <main className="flex-1 flex flex-col gap-4 p-5 min-h-0 overflow-hidden">
          <SessionReplay duration={bugDetail.sessionDuration} />
          <TechnicalContext logs={consoleLogs} />
        </main>

        {/* Zone C: Agent Intel (320px fixed) */}
        <AgentIntelSidebar
          analysis={agentAnalysis}
          verification={verification}
          relatedBugs={relatedBugs}
          onVerify={handleVerify}
        />
      </div>
    </div>
  )
}
