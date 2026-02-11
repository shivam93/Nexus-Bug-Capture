# Nexus Command Center — Project Guide

## What This Is

A "Glass Cockpit" supervisor dashboard for managing a fleet of autonomous AI testing agents. Built for **Sarah, a QA Lead** who monitors 15 agents running thousands of tests. The aesthetic is **"Deep Space Industrial"** — dark, dense, data-forward, inspired by Linear App and SpaceX mission control.

This is a **BrowserStack design assignment** — portfolio piece demonstrating high-density data interface design.

## Stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | React | 19.2 |
| Language | TypeScript (strict) | ~5.9 |
| Styling | Tailwind CSS v4 | 4.1 |
| Bundler | Vite | 7.3 |
| Icons | lucide-react | 0.563 |
| Fonts | Inter Tight (UI), JetBrains Mono (data) | Google Fonts CDN |

**No path aliases configured.** All imports use relative paths.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc + vite build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Architecture

```
src/
├── App.tsx                        ← View router (state-based: command-center | tactical | bug-detail)
├── styles/index.css               ← CSS variables (single source of truth for tokens)
├── config/design-tokens.ts        ← JS mirror of CSS vars (for programmatic access)
├── types/index.ts                 ← All domain types (Screen 1 + Screen 2 + Screen 3)
├── data/mock-data.ts              ← Static data (swap for API later)
├── components/
│   ├── ui/                        ← Reusable primitives (Badge, GlassCard, GlowButton, StatusDot, SectionLabel, Logo)
│   ├── layout/                    ← Shell (page wrapper), TopNav
│   ├── sectors/                   ← Domain-specific composites
│   │   ├── HUD/                   ← FleetStatusCard, DefectVelocityCard, ROICard
│   │   ├── MissionControl/        ← ProjectCard (accepts onEnter callback)
│   │   ├── LiveFeed/              ← IntelFeed (terminal-style log)
│   │   ├── AgentPool/             ← AgentCard
│   │   ├── Tactical/              ← Screen 2 components (see below)
│   │   └── BugDetail/             ← Screen 3 components (see below)
│   └── dashboard/                 ← Page compositions
│       ├── CommandCenter.tsx       ← Screen 1: Fleet overview
│       ├── ProjectTacticalView.tsx ← Screen 2: Project war room
│       ├── BugDetailView.tsx      ← Screen 3: Bug deep-dive
│       └── BrowserSimulationView.tsx ← Screen 4: Plugin Simulator
```

Every folder has an `index.ts` barrel export. Import from folders, not files:
```ts
import { GlassCard, Badge } from '../ui'
import { Shell } from '../layout'
```

## Design System — The Rules

### Color Palette (CSS Variables)

All colors live in `src/styles/index.css` under `:root`. **Never hardcode hex values in components.**

| Token | Hex | Usage |
|-------|-----|-------|
| `--nx-canvas` | `#0A1929` | Page background |
| `--nx-surface` | `#112240` | Card/panel backgrounds |
| `--nx-surface-hover` | `#1A3358` | Hover states |
| `--nx-terminal-bg` | `#0A1420` | Terminal/code backgrounds |
| `--nx-cyan` | `#00D9FF` | Primary accent, active states |
| `--nx-success` | `#00FF9D` | Success, healthy, pass |
| `--nx-danger` | `#FF4444` | Error, critical, fail |
| `--nx-amber` | `#F59E0B` | Warning, attention |
| `--nx-text-primary` | `#E2E8F0` | Headings, primary content |
| `--nx-text-secondary` | `#64748B` | Labels, secondary content |
| `--nx-text-muted` | `#475569` | Disabled, tertiary content |
| `--nx-border` | `#1E3A5F` | Card/panel borders |
| `--nx-border-glow` | `#00D9FF33` | Cyan glow with alpha |

Usage in Tailwind:
```tsx
<div className="bg-[var(--nx-surface)] text-[var(--nx-cyan)] border-[var(--nx-border)]" />
```

### Typography

Two font families, loaded via Google Fonts CDN in `index.html`:

| Class | Font | Usage |
|-------|------|-------|
| `font-ui` | Inter Tight | All UI text — headings, labels, buttons |
| `font-mono-nx` | JetBrains Mono | All data — metrics, logs, timestamps, badges |

**Non-negotiable**: Data and logs MUST use `font-mono-nx`. UI chrome uses `font-ui`.

### Section Labels

Use the code-comment convention for section headers:
```tsx
<SectionLabel label="AGENT_FLEET_STATUS" />
// Renders: "// AGENT_FLEET_STATUS" in monospace
```

### Component Patterns

**GlassCard** — Base container for all panels. Supports `glow` prop for status indication:
```tsx
<GlassCard glow="success">...</GlassCard>  // Green ambient glow
<GlassCard glow="warning">...</GlassCard>  // Amber ambient glow
<GlassCard glow="danger">...</GlassCard>   // Red ambient glow
```

**GlowButton** — Three variants for action hierarchy:
```tsx
<GlowButton variant="cyan">Enter</GlowButton>       // Primary action
<GlowButton variant="success">Assign</GlowButton>    // Positive action
<GlowButton variant="outline">New Project</GlowButton> // Secondary action
```

**StatusDot** — Color-coded indicator, maps status strings to colors:
- `healthy` / `active` → green
- `attention` → amber
- `critical` / `error` → red
- `idle` → muted gray

### Custom CSS Utilities

Defined in `src/styles/index.css`:

| Class | Effect |
|-------|--------|
| `bg-grid-pattern` | Subtle cyan engineering grid overlay |
| `text-gradient-cyan` | Gradient text from cyan → success green |
| `animate-pulse-glow` | Pulsing opacity (2s loop) |
| `animate-fade-in-up` | Enter from below (0.4s) |
| `animate-slide-in-left` | Enter from left (0.3s) |

## Types

All domain types in `src/types/index.ts`:

### Screen 1 (Command Center)
- `AgentStatus`: `'active' | 'idle' | 'error'`
- `ProjectHealth`: `'healthy' | 'attention' | 'critical'`
- `LogSeverity`: `'info' | 'warning' | 'error' | 'success'`
- `Agent`, `Project`, `LogEntry`, `FleetMetrics`, `DefectMetrics`, `ROIMetrics`

### Screen 2 (Tactical View)
- `TacticalAgentStatus`: `'running' | 'idle' | 'triage'`
- `TacticalAgent` — extends agent concept with `progress`, `deviceType`, `task`
- `MissionStage`: `'queue' | 'active' | 'review'`
- `MissionTask` — Kanban card with stage-specific fields (priority/scope for queue, device/progress for active, bugType/passed for review)
- `TelemetryEntry` — log entry with color-coded agent, tag, and message
- `ProjectGlobalStats` — HUD ribbon stats (activeAgents, testsPerHour, bugsFound, passRate)

### Screen 3 (Bug Detail View)
- `BugSeverity`: `'critical' | 'high' | 'medium' | 'low'`
- `BugStatus`: `'open' | 'in-progress' | 'resolved' | 'closed'`
- `BugDetail` — Full bug record (id, title, url, severity, status, priority, bugType, assignee, device, browser, foundAt, sprint, sessionDuration, projectName)
- `ConsoleLogEntry` — Log with timestamp, source (Console/Network/DOM), severity, message
- `BugTimelineEntry` — Timeline event with color (danger/cyan/success/muted)
- `AgentAnalysis` — AI analysis summary with agentName and confidence %
- `VerificationLoop` — Verification status (pending/running/passed/failed)
- `RelatedBug` — Linked bug with severity color

### Screen 4 (Browser Simulation)
- `SimulationHotspot` — Interactive zone on the mock website
- `RecordedEvent` — Captured user interaction (click/input/nav)

## Data Layer

Currently static (`src/data/mock-data.ts`). Exports:

### Screen 1 data
- `fleetMetrics` — 15 agents, 80% utilization
- `defectMetrics` — 42 found, 3 idle
- `roiMetrics` — $2,789 saved
- `projects` — 3 projects (Nykaa Fashion, The Bagman, Urban Company)
- `unassignedAgents` — 3 idle agents
- `logEntries` — 6 terminal log entries with mixed severity

### Screen 2 data
- `projectGlobalStats` — 12 active, 845 tests/hr, 7 bugs, 98.2% pass
- `tacticalAgents` — 6 agents (4 running, 1 idle, 1 triage)
- `missionTasks` — 8 tasks across 3 Kanban stages (2 queue, 3 active, 3 review)
- `telemetryEntries` — 9 color-coded terminal log entries

### Screen 3 data
- `bugDetail` — BUG-402, Promo Code "Save20" Validation Failure, critical, iPhone 15 Pro / Safari 17.4
- `consoleLogs` — 5 entries (2 errors, 2 warnings, 1 info) with timestamps and source tags
- `bugTimeline` — 4 entries (captured → replay → verified → awaiting triage)
- `agentAnalysis` — Capture-01, 94% confidence, JS error + NULL input analysis
- `verificationLoop` — Pending next commit status
- `relatedBugs` — 3 bugs (BUG-409 danger, BUG-398 amber, BUG-399 success)

### Screen 4 data
- `simulationHotspots` — 3 interactive zones (Navigation, Product Click, Add to Cart) for the "Nykaa Fashion" mock.

**To connect to a real API**: Replace mock imports with fetch/SWR/React Query calls. The `.env` has placeholder `VITE_API_BASE_URL` and `VITE_WS_URL` ready.

## Environment Variables

Defined in `.env` / `.env.example`. Currently used as documentation only — all design tokens are statically defined in CSS. The `VITE_API_BASE_URL` and `VITE_WS_URL` vars are for future API integration.

## Screen 2: Project Tactical View

The "War Room" for a selected project. User navigates here by clicking "Enter" on a `ProjectCard` in Screen 1.

### Layout: Holy Grail (No Layout Shift)
```
┌──────────────────────────────────────────────────────────────┐
│ TacticalTopNav (logo + breadcrumbs + sprint + user)     56px │
│ Project Header (title + URL + action buttons)           80px │
├──────────────────────────────────────────────────────────────┤
│ HudRibbon (// GLOBAL_STATUS + 4 metrics)                44px │
├────────────┬──────────────────────────┬─────────────────────┤
│ AgentRoster│     MissionBoard         │   TelemetryFeed     │
│  280px     │     flex-1 (fill)        │   320px             │
│  fixed     │  Queue | Active | Review │   fixed             │
│  scrollable│  (3 kanban columns)      │   scrollable        │
└────────────┴──────────────────────────┴─────────────────────┘
```

CSS: `h-screen w-full flex flex-col overflow-hidden` → sidebars fixed, center fills.

### Tactical Components (`src/components/sectors/Tactical/`)

| Component | Props | Purpose |
|-----------|-------|---------|
| `TacticalTopNav` | projectName, projectUrl, sprint, onBack | Nav bar + project header with action buttons |
| `HudRibbon` | stats: ProjectGlobalStats | Stats ribbon (agents, tests/hr, bugs, pass%) |
| `AgentRoster` | agents: TacticalAgent[] | Left 280px panel, scrollable agent list |
| `AgentRosterCard` | agent: TacticalAgent | Individual agent with status badge + health bar |
| `MissionBoard` | tasks: MissionTask[] | Center flex-1 area, splits tasks into 3 columns |
| `MissionColumn` | title, subtitle, titleColor, tasks | Single Kanban column with card list |
| `MissionCard` | task: MissionTask | Smart card — renders Queue/Active/Review variant by `task.stage` |
| `TelemetryFeed` | entries: TelemetryEntry[] | Right 320px terminal, staggered entry animations |

### Card Variants (MissionCard renders by stage)
- **Queue**: dashed border, 80% opacity, shows devices planned + priority + scope
- **Active**: cyan glow border + shadow, shows device icon + progress bar + assignee
- **Review**: solid border (red for bugs, green for passed), shows bug type badge or pass status

### Navigation
- **Screen 1 → Screen 2**: `ProjectCard.onEnter` → `CommandCenter.onEnterProject` → `App.setView('tactical')`
- **Screen 2 → Screen 1**: `TacticalTopNav.onBack` → `App.setView('command-center')` (breadcrumb "Home" click)
- **Screen 2 → Screen 3**: `ReviewCard.onClick` (bug cards only) → `MissionBoard.onViewBug` → `App.setView('bug-detail')`

## Screen 3: Bug Detail View

The "Agentic Bug Capture" deep-dive for an individual bug. User navigates here by clicking a bug card in the "Need Review" column on Screen 2.

### Layout: 3-Column Holy Grail
```
┌──────────────────────────────────────────────────────────────┐
│ BugTopNav (logo + "Agentic Bug Capture" + user)         56px │
│ BugHeader (breadcrumbs + BUG badge + title + actions)   64px │
├──────────────────────────────────────────────────────────────┤
│ BugHudRibbon (severity + device + agent + duration)     44px │
├────────────┬──────────────────────────┬─────────────────────┤
│ BugMeta    │   Evidence Stage         │  Agent Intel        │
│ Sidebar    │   (flex-1)              │  Sidebar            │
│  280px     │  SessionReplay          │   320px             │
│  fixed     │  TechnicalContext       │   fixed             │
│  scrollable│  (tabbed console)       │   scrollable        │
└────────────┴──────────────────────────┴─────────────────────┘
```

CSS: Same pattern as Screen 2 — `h-screen w-full flex flex-col overflow-hidden`.

### Bug Detail Components (`src/components/sectors/BugDetail/`)

| Component | Props | Purpose |
|-----------|-------|---------|
| `BugTopNav` | projectName, bugId | Nav bar with Nexus logo + project context |
| `BugHeader` | bug: BugDetail, onBack, onBackToTactical | Breadcrumbs + title + action buttons (Test/Retest/Resolve) |
| `BugHudRibbon` | bug: BugDetail | Status chips (severity, device, agent, duration, verified) |
| `BugMetaSidebar` | bug: BugDetail, timeline: BugTimelineEntry[] | Left 280px — metadata rows + color-coded timeline |
| `SessionReplay` | duration: string | Center — video viewport with play/pause + progress bar |
| `TechnicalContext` | logs: ConsoleLogEntry[] | Center — tabbed console (Console/Network/DOM/AI Fix) |
| `AgentIntelSidebar` | analysis, verification, relatedBugs | Right 320px — AI analysis + verification loop + related bugs |

### Navigation
- **Screen 2 → Screen 3**: `ReviewCard.onClick` (only cards with `bugId`) → `MissionCard` → `MissionColumn` → `MissionBoard.onViewBug` → `ProjectTacticalView.onViewBug` → `App.setView('bug-detail')`
- **Screen 3 → Screen 1**: Breadcrumb "Home" → `onBack` → `App.setView('command-center')`
- **Screen 3 → Screen 2**: Breadcrumb "Nykaa Fashion" → `onBackToTactical` → `App.setView('tactical')`

### Clickable Bug Cards
Only `MissionCard` review cards with a `bugId` field are clickable (cursor-pointer + hover state). Cards without `bugId` (e.g., passed tests) are not interactive.

## Adding a New Screen

1. Create a new file in `src/components/dashboard/` (e.g., `AgentDetail.tsx`)
2. For scrollable pages: Wrap content in `<Shell>` for the TopNav + grid background
3. For fixed layouts (like Tactical): Use `h-screen flex flex-col overflow-hidden` and compose zones directly
4. Use `GlassCard` for panels, `SectionLabel` for headers, `Badge`/`StatusDot` for indicators
5. Use CSS variables via Tailwind: `bg-[var(--nx-surface)]`, `text-[var(--nx-cyan)]`
6. Use `font-ui` for chrome, `font-mono-nx` for data
7. Add to the barrel export in `dashboard/index.ts`
8. Wire navigation in `App.tsx` (add new `View` union member + conditional render)

## Adding a New Reusable Component

1. Create in `src/components/ui/`
2. Use CSS variables — never hardcode colors
3. Export from `ui/index.ts`
4. Accept `className` prop for composition flexibility

## Design File

The Pencil (.pen) design lives in the repo's `designs/` folder (managed via Pencil MCP). The design system uses a "lunaris" component kit with variables prefixed `--nx-*` for the Nexus theme.

## Known Gaps / Future Work

- No responsive breakpoints (desktop-only currently)
- No ARIA labels on icon buttons (Settings, Bell)
- `design-tokens.ts` exported but not imported by components (they use CSS vars directly)
- No error boundaries or loading states
- No URL-based routing (uses React state — could migrate to React Router)
- No state management beyond React (static data)
- No tests
- Screen 2 hover cross-highlighting (agent ↔ mission card ↔ log) not yet wired
- Screen 2 currently hardcoded to "Nykaa Fashion" — could accept dynamic project data

## Changelog

### [2026-02-11] Browser Simulation UX Refinements (v5)
- **Issue Resolution**: Fixed 6 critical UX issues identified in user testing.
- **Hotspot Visibility Enhancement**:
    - Made hotspots **immediately visible** when recording starts (no longer hidden until hover).
    - Added pulsing cyan borders (`border-[var(--nx-cyan)]/40`) and visible badges to all unclicked hotspots.
    - Added `animate-pulse` effect for active, clickable areas.
    - Visual states: Idle (invisible) → Recording (cyan border + badge) → Clicked (green border + "✓ RECORDED").
- **Recording Flow Redesign**:
    - **Removed** full-sidebar "Bug Capture" mode entirely.
    - Sidebar now **always displays the step list**, allowing natural sequential recording.
    - Users can record multiple steps, then annotate specific ones (no forced interruption).
- **Step-Level Bug Annotations**:
    - Implemented expandable detail view for each recorded step.
    - Click any step card to expand and see: Selector, Timestamp, "Flag as Bug" checkbox, Comment textarea.
    - Visual indicators: Red triangle icon (bug flagged), Cyan chat bubble (has comment).
    - Extended `RecordedEvent` type with `isFlaggedAsBug?: boolean` and `comment?: string`.
- **Recording Timer (Dual Placement)**:
    - **Header Badge**: `[● REC 00:24]` with pulsing red dot, displayed next to "Nexus Agent" during recording.
    - **Step List Header**: Secondary timer display in "RECORDED STEPS" section.
    - Always visible regardless of scroll position.
- **Retry/Reset Button**:
    - Added "RETRY" button to sidebar header (top-right, visible when `!isRecording && events.length > 0`).
    - Ghost button style with cyan hover, refresh icon.
    - Also available as "Clear All" text button in bottom actions.
- **Button Color Consistency**:
    - Changed "SAVE BUG CONTEXT" button from red (`var(--nx-danger)`) to **Cyan** (`var(--nx-cyan)`).
    - Design system compliance: Cyan for primary actions, Red only for errors/stop actions.
    - Button hierarchy: "STOP RECORDING" (red outline) → "SAVE SESSION" (cyan solid) → "Clear All" (muted text).
- **Component Changes**:
    - `types/index.ts`: Extended `RecordedEvent` with annotation fields.
    - `useSimulationSequence.ts`: Added `updateEvent()` function for modifying recorded events.
    - `WebsiteMock.tsx`: Added `group` class, immediate badge visibility, pulsing borders.
    - `PluginSidebar.tsx`: Complete refactor (removed bug capture mode, added timer badge, step detail view, annotations UI).
    - `BrowserSimulationView.tsx`: Passed `onReset` and `onUpdateEvent` props to sidebar.
- **New Props**: `PluginSidebar` now requires `onReset` and `onUpdateEvent` callbacks.
- **Testing Scenarios**: All 4 test scenarios validated (basic recording, step annotations, save/retry, color consistency).

### [2026-02-11] Screen 3: Bug Detail View (Agentic Bug Capture)
- **New Screen**: `BugDetailView.tsx` — "Agentic Bug Capture" deep-dive for individual bugs.
- **3-Column Layout**: Fixed sidebars (280px + 320px) with flex-1 center evidence stage.
- **7 New Components**: `BugTopNav`, `BugHeader`, `BugHudRibbon`, `BugMetaSidebar`, `SessionReplay`, `TechnicalContext`, `AgentIntelSidebar`.
- **Navigation**: Click bug card in "Need Review" column → Bug Detail. Breadcrumb back-nav to Screen 1 or Screen 2.
- **New Types**: `BugDetail`, `ConsoleLogEntry`, `BugTimelineEntry`, `AgentAnalysis`, `VerificationLoop`, `RelatedBug`.
- **Mock Data**: BUG-402 (critical), 5 console logs, 4 timeline events, AI analysis at 94% confidence, 3 related bugs.
- **Design File**: Pencil .pen design created alongside React code.
- **GlassCard Enhancement**: Added `onClick` prop to support clickable cards across all screens.

### [2026-02-11] Screen 2: Project Tactical View
- **New Screen**: `ProjectTacticalView.tsx` — "War Room" for individual project deep-dive.
- **Holy Grail Layout**: Fixed sidebars (280px + 320px) with flex-1 center. No layout shifts.
- **8 New Components**: `TacticalTopNav`, `HudRibbon`, `AgentRoster`, `AgentRosterCard`, `MissionBoard`, `MissionColumn`, `MissionCard`, `TelemetryFeed`.
- **Navigation**: State-based view switching in `App.tsx`. ProjectCard "Enter" → Tactical, breadcrumb "Home" → back.
- **New Types**: `TacticalAgent`, `MissionTask`, `TelemetryEntry`, `ProjectGlobalStats`.
- **Mock Data**: 6 agents, 8 kanban tasks, 9 telemetry entries, global stats.
- **Design File**: Pencil .pen design created with full Nexus theme variables (`--nx-*`).

### [2026-02-11] UI Unification & "Silent Precision" Polish
- **Aesthetic Overhaul**: Implemented "Silent Precision" theme. Removed "Christmas Tree" colored borders from structural containers; reserved colors for status indicators only.
- **Global App Shell**:
    - **GlobalHeader**: Persistent top bar with Nexus logo, User Profile, and Dynamic Breadcrumbs (`Home` > `Project` > `Bug`).
    - **Navigation Logic**: Centralized view state and breadcrumb management in `App.tsx`.
- **Screen Refinements**:
    - **Command Center**: Added subtle cyan glow to Project Cards on hover.
    - **Tactical View**:
        - **"De-Noise"**: Cleaned up grid columns (dark backgrounds, no borders).
        - **Agent-Task Linkage**: Hovering a task now highlights the assigned agent in the roster.
    - **Bug Detail View**:
        - **Split Screen**: Implemented interactive `SessionReplay` (scrubbable timeline) and `TechnicalContext` (Console).
        - **Verification**: Added "Verify Fix" button simulation (Pending -> Running -> Passed).
- **Data Simulation**: Updated `mock-data.ts` to tell the comprehensive "Agent-09" story (Active -> Running Regression -> Found Bug #402).

### [2026-02-11] Screen 4: Browser Simulation (Nexus Plugin)
- **New Screen**: `BrowserSimulationView.tsx` — Simulates the "Zero-Friction Capture" workflow.
- **Components**:
    - `BrowserShell`: Chrome-like window frame.
    - `WebsiteMock`: Interactive "Nykaa Fashion" mock with data-driven hotspots.
    - `PluginSidebar`: The Nexus extension overlay with recording controls and event list.
- **Interactions**:
    - **Recording**: Toggle start/stop to capture events.
    - **Hotspots**: Pulsing interactive elements that register events when clicked.
    - **Timer**: Real-time duration tracking (`mm:ss`).
    - **Save Flow**: "Save Bug Context" transitions to Screen 3 (Bug Detail).
- **Architecture**:
    - **Hook**: `useSimulationSequence` manages recording state and event log.
    - **Entry Point**: New "Try Nexus Plugin" CTA on Command Center.
