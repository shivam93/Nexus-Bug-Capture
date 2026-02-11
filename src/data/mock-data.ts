import type {
  Agent,
  Project,
  LogEntry,
  FleetMetrics,
  DefectMetrics,
  ROIMetrics,
  TacticalAgent,
  MissionTask,
  TelemetryEntry,
  ProjectGlobalStats,
  BugDetail,
  ConsoleLogEntry,
  BugTimelineEntry,
  AgentAnalysis,
  VerificationLoop,
  RelatedBug,
} from '../types'

// ─── Fleet Metrics ──────────────────────────────────────────
export const fleetMetrics: FleetMetrics = {
  totalAgents: 15,
  activeAgents: 13, // Increased active count
  idleAgents: 2,
  utilizationPercent: 86,
}

// ─── Defect Velocity ────────────────────────────────────────
export const defectMetrics: DefectMetrics = {
  found: 43, // +1 found
  idle: 2,
  sprintDelta: '14% vs last sprint',
}

// ─── ROI ────────────────────────────────────────────────────
export const roiMetrics: ROIMetrics = {
  saved: '$2,850',
  rate: 'Based on $50/hr rate',
}

// ─── Active Projects ────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'proj-nykaa',
    rank: 1,
    name: 'Nykaa Fashion',
    tier: 'Enterprise',
    releaseIn: 'Release: 2 days',
    health: 'healthy',
    healthLabel: 'Healthy',
    statusDescription: 'Status: Full regression suite (Overnight)',
    testResults: { pass: 1420, fail: 8, flaky: 2 },
    agentsAssigned: 10,
  },
  {
    id: 'proj-bagman',
    rank: 2,
    name: 'The Bagman',
    tier: 'Enterprise',
    releaseIn: 'Release: 2 days',
    health: 'attention',
    healthLabel: 'Attention needed',
    statusDescription: 'Status: Exploratory/New feature',
    testResults: { pass: 1420, fail: 8, flaky: 2 },
    agentsAssigned: 10,
  },
  {
    id: 'proj-urban',
    rank: 3,
    name: 'Urban Company',
    tier: 'Enterprise',
    releaseIn: 'Release: 2 days',
    health: 'healthy',
    healthLabel: 'Healthy',
    statusDescription: 'Status: API Penetration Test',
    testResults: { pass: 1420, fail: 8, flaky: 2 },
    agentsAssigned: 10,
  },
]

// ─── Unassigned Agents ──────────────────────────────────────
export const unassignedAgents: Agent[] = [
  // Removed Agent-09/Capture-09 as it is now ACTIVE in Screen 2
  { id: 'agent-04', name: 'Verify-04', platform: 'Web', status: 'idle' },
  { id: 'agent-02', name: 'Triage-02', platform: 'Data', status: 'idle' },
  { id: 'agent-07', name: 'Capture-07', platform: 'Android', status: 'idle' },
]

// ═══════════════════════════════════════════════════════════
// TACTICAL VIEW (SCREEN 2) — Nykaa Fashion War Room
// ═══════════════════════════════════════════════════════════

export const projectGlobalStats: ProjectGlobalStats = {
  activeAgents: 13,
  testsPerHour: 890,
  bugsFound: 8,
  passRate: '98.1%',
}

export const tacticalAgents: TacticalAgent[] = [
  { id: 'ta-09', name: 'Capture-09', status: 'running', deviceType: 'iOS', task: 'Checkout Regression', progress: 45 }, // Agent-09 is here!
  { id: 'ta-01', name: 'Capture-01', status: 'running', deviceType: 'iOS', task: 'Regression', progress: 80 },
  { id: 'ta-02', name: 'Capture-02', status: 'running', deviceType: 'Android', task: 'Smoke', progress: 20 },
  { id: 'ta-04', name: 'Capture-04', status: 'triage', task: 'Sorting', progress: 100 },
  { id: 'ta-05', name: 'Capture-05', status: 'running', deviceType: 'iOS', task: 'Regression', progress: 80 },
  { id: 'ta-06', name: 'Capture-06', status: 'running', deviceType: 'Android', task: 'Smoke', progress: 20 },
]

export const missionTasks: MissionTask[] = [
  // Queue
  {
    id: 'mt-q1', stage: 'queue', title: 'Guest Checkout',
    devicesPlanned: 48, priority: 'Critical', priorityColor: 'danger', scope: 'End-to-End',
  },
  {
    id: 'mt-q2', stage: 'queue', title: 'Apple Pay Flow',
    devicesPlanned: 12, priority: 'High', priorityColor: 'amber', scope: 'Payment Only',
  },
  // Active
  {
    id: 'mt-a1', stage: 'active', title: 'Capture-09',
    device: 'iPhone 15/ Saf 17', deviceIcon: 'smartphone', assignee: 'Sarah',
    status: 'Running', progress: 45, // Links to Agent-09
  },
  {
    id: 'mt-a2', stage: 'active', title: 'Capture-03',
    device: 'Win 11/Chrome', deviceIcon: 'monitor', assignee: 'Agent',
    status: 'API Waiting', progress: 90,
  },
  {
    id: 'mt-a3', stage: 'active', title: 'Capture-04',
    device: 'Galaxy S24 / Chrome', deviceIcon: 'smartphone', assignee: 'Agent',
    status: 'Loading URL', progress: 10,
  },
  // Review
  {
    id: 'mt-r1', stage: 'review', bugId: 'Bug #402', bugType: 'Visual', bugTypeColor: 'danger',
    title: 'Layout Shift on Checkout', // Updated Title
  },
  {
    id: 'mt-r2', stage: 'review', bugId: 'Bug #409', bugType: 'Network', bugTypeColor: 'amber',
    title: 'API Timeout/Checkout',
  },
  {
    id: 'mt-r3', stage: 'review', title: 'Guest flow',
    latency: '42ms Latency', passed: true,
  },
]

export const telemetryEntries: TelemetryEntry[] = [
  { id: 'te-0', agent: 'Capture-09', tag: '[Capture]', tagColor: 'cyan', message: 'Detected large layout shift (CLS 0.45) on /checkout/payment', messageColor: 'danger', timestamp: '13:47:01' },
  { id: 'te-1', agent: 'Capture-01', tag: '[Capture]', tagColor: 'cyan', message: 'Verifying cart items persistence', messageColor: 'secondary', timestamp: '13:46:55' },
  { id: 'te-2', agent: 'Triage-01', tag: '[Sys]', tagColor: 'cyan', message: 'Linked bug #410 to Jira-81991', messageColor: 'secondary', timestamp: '13:45:09' },
  { id: 'te-3', agent: 'Verify-03', tag: '[Ver]', tagColor: 'success', message: 'Verified fix for Bug #399, Closing ticket', messageColor: 'success', timestamp: '12:45:09' },
  { id: 'te-6', agent: 'Verify-03', tag: '[Ver]', tagColor: 'success', message: 'Verified fix for Bug #399, Closing ticket', messageColor: 'success', timestamp: '12:45:09' },
]

// ═══════════════════════════════════════════════════════════
// BUG DETAIL VIEW (SCREEN 3) — Agentic Bug Capture
// ═══════════════════════════════════════════════════════════

export const bugDetail: BugDetail = {
  id: 'bug-402',
  title: 'Layout Shift on Checkout (CLS > 0.25)', // Updated Title
  url: 'https://www.nykaafashion.com/checkout/payment',
  severity: 'critical',
  status: 'open',
  priority: 'critical',
  bugType: 'Visual',
  bugTypeColor: 'amber',
  assignee: 'Capture-09', // Updated Assignee
  device: 'iPhone 15 Pro',
  browser: 'Safari 17.4',
  foundAt: '13:47:01 UTC',
  sprint: 'Q1 2026',
  sessionDuration: '00:32s',
  projectName: 'Nykaa Fashion',
}

export const consoleLogs: ConsoleLogEntry[] = [
  {
    id: 'cl-1',
    timestamp: '13:47:01.220',
    source: 'Console',
    severity: 'error',
    message: 'PerformanceObserver: Layout Shift detected. Value: 0.452. Sources: div.payment-methods',
  },
  {
    id: 'cl-2',
    timestamp: '13:47:01.225',
    source: 'Network',
    severity: 'warning',
    message: 'Slow resource: hero-banner.jpg (1.2s). Prioritize LCP.',
  },
  {
    id: 'cl-3',
    timestamp: '13:47:01.300',
    source: 'DOM',
    severity: 'info',
    message: 'DOM mutation: div.promo-banner inserted before div.payment-methods',
  },
  {
    id: 'cl-4',
    timestamp: '13:47:01.310',
    source: 'Console',
    severity: 'warning',
    message: '[Deprecation] document.domain is deprecated.',
  },
]

export const bugTimeline: BugTimelineEntry[] = [
  { id: 'bt-1', timestamp: '13:47:01', message: 'Bug captured by Capture-09', color: 'danger' },
  { id: 'bt-2', timestamp: '13:47:04', message: 'Session replay recorded', color: 'cyan' },
  { id: 'bt-3', timestamp: '13:47:08', message: 'Auto-triage: Visual / CLS', color: 'muted' },
  { id: 'bt-4', timestamp: '13:47:15', message: 'Awaiting triage review', color: 'muted' },
]

export const agentAnalysis: AgentAnalysis = {
  summary: 'A late-loading promo banner is inserting itself above the payment methods, causing the content to jump down by 140px. This triggers a Cumulative Layout Shift (CLS) of 0.45, exceeding the 0.1 threshold.',
  agentName: 'Capture-09',
  confidence: 98,
}

export const verificationLoop: VerificationLoop = {
  description: 'Auto Verify: on next PR, Nexus will auto-run this test on iPhone 15 Pro + Safari to confirm CLS < 0.1.',
  status: 'pending',
  statusLabel: 'Pending next commit',
}

export const relatedBugs: RelatedBug[] = [
  { id: 'rb-1', bugId: 'BUG-409', title: 'API Timeout on /checkout', severity: 'danger' },
  { id: 'rb-2', bugId: 'BUG-398', title: 'Cart total NaN on empty promo', severity: 'amber' },
  { id: 'rb-3', bugId: 'BUG-399', title: 'Payment gateway null pointer (Resolved)', severity: 'success' },
]

// ─── Live Intel Feed ────────────────────────────────────────
export const logEntries: LogEntry[] = [
  {
    id: 'log-0',
    timestamp: '13:47:01',
    agentId: 'CAPTURE-09',
    message: 'Detected Layout Shift on /checkout (CLS: 0.45)', // Key Story Entry
    severity: 'error',
  },
  {
    id: 'log-1',
    timestamp: '13:46:45',
    agentId: 'AGENT-03',
    message: 'Navigating to /checkout/payment',
    severity: 'info',
  },
  {
    id: 'log-2',
    timestamp: '13:46:15',
    agentId: 'AGENT-07',
    message: 'API response 2340ms > threshold (500ms)',
    severity: 'warning',
  },
  {
    id: 'log-3',
    timestamp: '13:46:11',
    agentId: 'AGENT-12',
    message: 'Completed: Login flow regression — PASS',
    severity: 'success',
  },
  {
    id: 'log-4',
    timestamp: '13:45:08',
    agentId: 'AGENT-01',
    message: 'Visual diff detected: ProductCard.hero (8px drift)',
    severity: 'warning',
  },
  {
    id: 'log-5',
    timestamp: '13:44:03',
    agentId: 'CAPTURE-09',
    message: 'Starting session: Checkout Regression',
    severity: 'info',
  },
]
