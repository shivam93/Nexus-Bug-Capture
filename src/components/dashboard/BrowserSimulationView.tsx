import { BrowserShell, WebsiteMock, PluginSidebar } from '../sectors/BrowserSimulation'
import { useSimulationSequence } from '../../hooks/useSimulationSequence'
import { simulationHotspots } from '../../data/mock-data'

interface BrowserSimulationViewProps {
    onBack: () => void
    onSaveBug: () => void
}

export function BrowserSimulationView({ onSaveBug }: Omit<BrowserSimulationViewProps, 'onBack'>) {
    const {
        events,
        isRecording,
        elapsedTime,
        addEvent,
        toggleRecording,
        resetSimulation,
        updateEvent,
    } = useSimulationSequence()

    const handleSave = () => {
        onSaveBug()
    }

    return (
        <div className="flex w-full h-full bg-[#020617] overflow-hidden">
            {/* ── Left Pane: Browser Viewport (Responsive Scaling) ── */}
            {/* flex-1 to take available space. relative for positioning. overflow-hidden to crop. */}
            <div className="flex-1 relative overflow-hidden bg-[#0F172A] flex flex-col">
                <BrowserShell url="https://nykaafashion.com/men/shirts" onReset={resetSimulation}>
                    {/* 
                        Wrapper to ensure 100% height of parent for resizing. 
                        We use a container query approach effectively by just letting it fill.
                     */}
                    <div className="w-full h-full flex items-start justify-center bg-gray-100/5">
                        <WebsiteMock
                            hotspots={simulationHotspots}
                            isRecording={isRecording}
                            recordedEvents={events}
                            onHotspotClick={addEvent}
                        />
                    </div>
                </BrowserShell>
            </div>

            {/* ── Right Pane: Sidebar (Fixed Width) ────────────────── */}
            {/* flex-shrink-0 to never squash. border-l for separation. */}
            <div className="w-[380px] flex-shrink-0 border-l border-[var(--nx-border)] bg-[var(--nx-surface)] z-10 relative shadow-2xl">
                <PluginSidebar
                    events={events}
                    isRecording={isRecording}
                    elapsedTime={elapsedTime}
                    onToggleRecording={toggleRecording}
                    onSave={handleSave}
                    onReset={resetSimulation}
                    onUpdateEvent={updateEvent}
                />
            </div>
        </div>
    )
}
