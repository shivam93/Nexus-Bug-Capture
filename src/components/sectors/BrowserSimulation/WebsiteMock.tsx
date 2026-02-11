import { type SimulationHotspot, type RecordedEvent } from '../../../types'

interface WebsiteMockProps {
    hotspots: SimulationHotspot[]
    isRecording: boolean
    recordedEvents: RecordedEvent[]
    onHotspotClick: (description: string, type: 'click' | 'navigation' | 'input', selector: string) => void
}

export function WebsiteMock({ hotspots, isRecording, recordedEvents, onHotspotClick }: WebsiteMockProps) {
    // Helper to check if a hotspot has been interacted with
    const isInteracted = (selector: string) => recordedEvents.some(e => e.selector === selector)

    // Calculate duration for the floating badge (mocked or passed prop? The prop isn't here yet, let's use a standard one or ignore for now if not passed)
    // Wait, the parent passes `isRecording`, but `elapsedTime` is in `BrowserSimulationView` but not passed to `WebsiteMock`.
    // I will just add the badge statically or ignoring time for now, OR I can add elapsedTime to props if I want it to be real.
    // The instructions said "Add a small floating badge 'REC ● 00:12'". The parent has `elapsedTime`.
    // I should probably update the interface to accept `elapsedTime`.

    return (
        <div className={`
            w-full h-full relative bg-gray-50 overflow-y-auto cursor-default transition-all duration-300
            ${isRecording ? 'shadow-[inset_0_0_0_4px_#ef4444]' : ''}
        `}>
            {/* ── REC Badge ────────────────────────────────── */}
            <div className={`
                absolute top-6 right-8 z-50 pointer-events-none transition-opacity duration-300
                ${isRecording ? 'opacity-100' : 'opacity-0'}
            `}>
                <div className="bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono-nx text-xs font-bold tracking-widest">REC</span>
                </div>
            </div>

            {/* ── Mock Website Content ──────────────────────── */}
            <div className="w-full min-h-[1400px] bg-white relative select-none">

                {/* Header */}
                <div className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-10 border-b border-gray-100">
                    <div className="text-[#fc2779] font-bold text-xl tracking-tight">NYKAA FASHION</div>
                    <div className="flex space-x-8 text-[13px] font-medium text-gray-800">
                        <span className="cursor-pointer hover:text-[#fc2779]">Women</span>
                        <span className="cursor-pointer hover:text-[#fc2779]">Men</span>
                        <span className="cursor-pointer hover:text-[#fc2779]">Kids</span>
                        <span className="cursor-pointer hover:text-[#fc2779]">Home</span>
                        <span className="cursor-pointer hover:text-[#fc2779]">Gadgets</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-64 h-9 bg-gray-100 rounded-md flex items-center px-3 text-gray-400 text-sm">Search for products...</div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="h-[480px] w-full bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden">
                    {/* Website Screenshot (Responsive Scaling) */}
                    <img
                        src="https://cdn.dribbble.com/users/1615584/screenshots/15710288/media/6c7a695e5d4f0a94792cf99736dc5297.jpg"
                        alt="Nykaa Fashion Mockup"
                        className={`
                            w-full h-full object-contain object-top origin-top transition-all duration-300
                            ${isRecording ? 'ring-4 ring-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : ''}
                        `}
                    />
                </div>

                {/* ── Hotspot Overlay Layer ─────────────────── */}
                {/* Only interactive when recording is active */}

                {hotspots.map((hotspot) => {
                    const interacted = isInteracted(hotspot.selector)

                    if (!isRecording && !interacted) return null

                    return (
                        <div
                            key={hotspot.id}
                            className={`
                                group absolute z-20 transition-all duration-300
                                ${interacted
                                    ? 'border-2 border-[var(--nx-success)] bg-[var(--nx-success)]/10'
                                    : 'cursor-pointer border-2 border-[var(--nx-cyan)]/40 bg-[var(--nx-cyan)]/5 hover:bg-[var(--nx-cyan)]/15 hover:border-[var(--nx-cyan)]/60'
                                }
                                ${isRecording && !interacted ? 'animate-pulse' : ''}
                            `}
                            style={{
                                top: hotspot.position.top,
                                left: hotspot.position.left,
                                width: hotspot.position.width,
                                height: hotspot.position.height,
                            }}
                            onClick={() => {
                                if (isRecording && !interacted) {
                                    onHotspotClick(hotspot.label, hotspot.type, hotspot.selector)
                                }
                            }}
                            title={isRecording ? hotspot.label : ''}
                        >
                            {/* Hotspot Label Badge */}
                            <div className={`
                                absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-bold font-mono-nx whitespace-nowrap transition-all duration-200
                                ${interacted
                                    ? 'bg-[var(--nx-success)] text-black opacity-100'
                                    : isRecording
                                        ? 'bg-[var(--nx-cyan)] text-black opacity-100 group-hover:opacity-100'
                                        : 'bg-[var(--nx-cyan)] text-black opacity-0'
                                }
                            `}>
                                {interacted ? '✓ RECORDED' : hotspot.type.toUpperCase()}
                            </div>
                        </div>
                    )
                })}

                {/* Recording Overlay removed to keep "live" feel, relying on Red Border */}
            </div>
        </div>
    )
}
