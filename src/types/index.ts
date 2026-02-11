// ══════════════════════════════════════════════════════
// NEXUS COMMAND CENTER — Type Definitions
// ══════════════════════════════════════════════════════

export type AgentStatus = 'active' | 'idle' | 'error'
export type ProjectHealth = 'healthy' | 'attention' | 'critical'
export type LogSeverity = 'info' | 'warning' | 'error' | 'success'

export interface Agent {
  id: string
  name: string
  platform: 'iOS' | 'Web' | 'Data' | 'API' | 'Android'
  status: AgentStatus
  assignedTo?: string
}

export interface Project {
  id: string
  rank: number
  name: string
  tier: string
  releaseIn: string
  health: ProjectHealth
  healthLabel: string
  statusDescription: string
  testResults: {
    pass: number
    fail: number
    flaky: number
  }
  agentsAssigned: number
}

export interface LogEntry {
  id: string
  timestamp: string
  agentId: string
  message: string
  severity: LogSeverity
}

export interface FleetMetrics {
  totalAgents: number
  activeAgents: number
  idleAgents: number
  utilizationPercent: number
}

export interface DefectMetrics {
  found: number
  idle: number
  sprintDelta: string
}

export interface ROIMetrics {
  saved: string
  rate: string
}

// ── Tactical View (Screen 2) ─────────────────────────────

export type TacticalAgentStatus = 'running' | 'idle' | 'triage'

export interface TacticalAgent {
  id: string
  name: string
  status: TacticalAgentStatus
  deviceType?: string
  task?: string
  progress: number
}

export type MissionStage = 'queue' | 'active' | 'review'

export interface MissionTask {
  id: string
  stage: MissionStage
  title: string
  device?: string
  deviceIcon?: 'smartphone' | 'monitor'
  agent?: string
  assignee?: string
  status?: string
  progress?: number
  priority?: string
  priorityColor?: 'danger' | 'amber' | 'cyan'
  scope?: string
  devicesPlanned?: number
  bugId?: string
  bugType?: string
  bugTypeColor?: 'danger' | 'amber' | 'cyan'
  latency?: string
  passed?: boolean
}

export interface TelemetryEntry {
  id: string
  agent: string
  tag: string
  tagColor: 'cyan' | 'success' | 'danger'
  message: string
  messageColor: 'amber' | 'secondary' | 'success' | 'danger' | 'cyan'
  timestamp: string
}

export interface ProjectGlobalStats {
  activeAgents: number
  testsPerHour: number
  bugsFound: number
  passRate: string
}

// ── Bug Detail View (Screen 3) ────────────────────────────

export type BugSeverity = 'critical' | 'high' | 'medium' | 'low'
export type BugStatus = 'open' | 'in-progress' | 'resolved' | 'closed'

export interface BugDetail {
  id: string
  title: string
  url: string
  severity: BugSeverity
  status: BugStatus
  priority: BugSeverity
  bugType: string
  bugTypeColor: 'danger' | 'amber' | 'cyan'
  assignee: string
  device: string
  browser: string
  foundAt: string
  sprint: string
  sessionDuration: string
  projectName: string
}

export interface ConsoleLogEntry {
  id: string
  timestamp: string
  source: 'Console' | 'Network' | 'DOM'
  severity: 'error' | 'warning' | 'info'
  message: string
}

export interface BugTimelineEntry {
  id: string
  timestamp: string
  message: string
  color: 'danger' | 'cyan' | 'success' | 'muted'
}

export interface AgentAnalysis {
  summary: string
  agentName: string
  confidence: number
}

export interface VerificationLoop {
  description: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  statusLabel: string
}

export interface RelatedBug {
  id: string
  bugId: string
  title: string
  severity: 'danger' | 'amber' | 'success'
}
