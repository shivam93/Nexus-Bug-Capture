# Nexus Command Center (Prototype)

> **"One capture, two outputs, zero reproduction hell."**

Nexus is an **AI-Native Bug Capture & Supervision Tool** designed to bridge the gap between AI coding agents and manual QA verification.

This prototype was created as a design assignment for BrowserStack to demonstrate a "Glass Cockpit" interface for supervising autonomous testing agents.

## The Problem: The Verification Gap

AI coding agents (like Devin or Cursor) can write code fast, but they struggle to verify it on real devices. They operate in sandboxed environments and lack the "eyes" to see visual bugs on specific devices (like an iPhone 15 Pro running Safari).

Meanwhile, human QA engineers spend ~40% of their time just documenting bugs—recording videos, taking screenshots, and writing reproduction steps that developers often can't follow.

## The Solution: One Capture, Dual Output

Nexus changes the workflow by capturing bugs in two formats simultaneously:
1.  **For Humans**: A high-fidelity video recording of the user session.
2.  **For Machines**: A structured JSON artifact containing the DOM snapshot, network logs, and device metadata.

This ensures that whether the "fixer" is a human developer or an AI agent, they have exactly the data they need to reproduce and resolve the issue without back-and-forth communication.

## Key Features

### 1. Zero-Friction Capture
A browser extension concept that records video, logs, and DOM state in the background. When a bug is found, one click captures the last 30 seconds of context.

### 2. Tactical Command Center
A "Glass Cockpit" dashboard for supervising a fleet of AI testing agents. Monitor agent status, test velocity, and bug discovery rates in real-time with a "Deep Space Industrial" aesthetic.

### 3. Agentic Bug Detail
A deep-dive view for individual bugs where human-readable video and machine-readable code (console logs, network requests) live side-by-side.

### 4. Browser Simulation (Plugin)
A simulated browser environment demonstrating the "Zero-Friction Capture" workflow with:
- **Immediate Hotspot Visibility**: Interactive elements light up with pulsing cyan borders when recording starts
- **Step-Level Bug Annotations**: Click any recorded step to expand details, flag as bug, or add comments
- **Recording Timer**: Dual placement (header badge + step list) for at-a-glance status
- **Natural Workflow**: Record all steps first, then annotate specific ones—no forced interruptions
- **Smart Reset**: "Retry" button in header for quick session restart

## Tech Stack

-   **Framework**: React 19.2
-   **Styling**: Tailwind CSS v4.1
-   **Build Tool**: Vite 7.3
-   **Language**: TypeScript 5.9
-   **Icons**: Lucide React

## Quick Start

To run this prototype locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will launch at `http://localhost:5173`.

## Design Philosophy

The UI follows a **"Deep Space Industrial"** aesthetic:
-   **Dark Mode Only**: Reduces eye strain for long technical sessions.
-   **High Density**: 14px base font size to maximize data on screen.
-   **Silent Precision**: Colors are reserved for status indicators (Green/Red/Amber) and primary actions (Cyan). Decorative elements are subtle and monochromatic.

---

*Desgined by Shivam Bhatnagar for BrowserStack Assignment - Feb 2026*
