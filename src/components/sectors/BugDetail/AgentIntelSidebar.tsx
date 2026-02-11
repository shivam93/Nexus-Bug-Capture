import { Brain, RefreshCw, Link2, Bot } from 'lucide-react'
import type { AgentAnalysis, VerificationLoop, RelatedBug } from '../../../types'
import { SectionLabel } from '../../ui'

interface AgentIntelSidebarProps {
  analysis: AgentAnalysis
  verification: VerificationLoop
  relatedBugs: RelatedBug[]
  onVerify?: () => void
}

const severityColorMap: Record<string, string> = {
  danger: 'var(--nx-danger)',
  amber: 'var(--nx-amber)',
  success: 'var(--nx-success)',
}

const verifyStatusColorMap: Record<string, string> = {
  pending: 'var(--nx-amber)',
  running: 'var(--nx-cyan)',
  passed: 'var(--nx-success)',
  failed: 'var(--nx-danger)',
}

export function AgentIntelSidebar({ analysis, verification, relatedBugs, onVerify }: AgentIntelSidebarProps) {
  return (
    <aside className="w-[320px] shrink-0 bg-[#070D15] border-l border-[var(--nx-border)] flex flex-col overflow-y-auto">
      {/* Section header */}
      <div className="px-5 pt-5 pb-3">
        <SectionLabel label="AGENT_INTEL" />
      </div>

      {/* Agent Analysis */}
      <div className="flex flex-col gap-2.5 px-5">
        <div className="flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-[var(--nx-cyan)]" />
          <span className="font-ui text-[13px] font-semibold text-[var(--nx-text-primary)]">
            Agent Analysis
          </span>
        </div>
        <div className="flex flex-col gap-2 p-3.5 rounded-md border border-[var(--nx-border)] bg-[var(--nx-surface)]">
          <p className="font-ui text-xs text-[var(--nx-text-primary)] leading-relaxed">
            {analysis.summary}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Bot className="w-3 h-3 text-[var(--nx-cyan)]" />
              <span className="font-mono-nx text-[10px] text-[var(--nx-cyan)]">
                {analysis.agentName}
              </span>
            </div>
            <span className="font-mono-nx text-[10px] text-[var(--nx-success)]">
              Confidence: {analysis.confidence}%
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 my-4 h-px bg-[#1A2A45]" />

      {/* Verification Loop */}
      <div className="flex flex-col gap-2.5 px-5">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-[var(--nx-success)]" />
          <span className="font-ui text-[13px] font-semibold text-[var(--nx-text-primary)]">
            Verification Loop
          </span>
        </div>
        <div className="flex flex-col gap-2 p-3.5 rounded-md border border-[var(--nx-border)] bg-[var(--nx-surface)]">
          <p className="font-ui text-xs text-[var(--nx-text-primary)] leading-relaxed">
            {verification.description}
          </p>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${verification.status === 'running' ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: verifyStatusColorMap[verification.status] }}
              />
              <span
                className="font-mono-nx text-[10px]"
                style={{ color: verifyStatusColorMap[verification.status] }}
              >
                {verification.statusLabel}
              </span>
            </div>

            {/* "Verify Fix" Action Button */}
            {verification.status !== 'passed' && (
              <button
                onClick={onVerify}
                disabled={verification.status === 'running'}
                className={`
                  px-2 py-1 rounded-[4px] border border-[var(--nx-border)] bg-slate-800/50 
                  hover:bg-[var(--nx-cyan)]/10 hover:border-[var(--nx-cyan)]/30 
                  text-[10px] font-mono-nx text-[var(--nx-cyan)] transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {verification.status === 'running' ? 'RUNNING...' : 'RUN_TEST'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 my-4 h-px bg-[#1A2A45]" />

      {/* Related Bugs */}
      <div className="flex flex-col gap-2.5 px-5 pb-5">
        <div className="flex items-center gap-2">
          <Link2 className="w-3.5 h-3.5 text-[var(--nx-text-secondary)]" />
          <span className="font-ui text-[13px] font-semibold text-[var(--nx-text-primary)]">
            Related Bugs
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {relatedBugs.map((bug) => (
            <div
              key={bug.id}
              className="flex items-center gap-2.5 p-3 rounded-md border border-[var(--nx-border)] bg-[var(--nx-surface)] hover:bg-[var(--nx-surface-hover)] transition-colors cursor-pointer"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: severityColorMap[bug.severity] }}
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-mono-nx text-[10px] font-semibold text-[var(--nx-text-primary)]">
                  {bug.bugId}
                </span>
                <span className="font-ui text-[11px] text-[var(--nx-text-secondary)] truncate">
                  {bug.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
