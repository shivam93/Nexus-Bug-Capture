

export function NexusLogo({ className = '' }: { className?: string }) {
    // Aesthetic: "Deep Space Industrial" + "AI-Native"
    // Concept: The "Nexus" Node. A central geometric core (hexagon) representing the AI brain,
    // connected to external inputs (human/data).
    // Implementation: precise SVG paths with a "scanline" or "circuit" feel.

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Nexus Logo"
        >
            <defs>
                <linearGradient id="nexus-gradient" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--nx-cyan)" />
                    <stop offset="1" stopColor="#0088AA" />
                </linearGradient>
                <filter id="glow" x="-4" y="-4" width="40" height="40" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main Structure: A stylized hexagon constructed from two interlocking "C" shapes or brackets */}

            {/* Outer Bracket (Left/Top) */}
            <path
                d="M8 10L16 4L24 10V14"
                stroke="url(#nexus-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
            />

            {/* Outer Bracket (Right/Bottom) - Inverted to form the nexus */}
            <path
                d="M24 22L16 28L8 22V18"
                stroke="url(#nexus-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
            />

            {/* Central Core: The 'Eye' or 'Node' */}
            <rect
                x="13.5"
                y="13.5"
                width="5"
                height="5"
                rx="1"
                fill="var(--nx-cyan)"
                className="animate-pulse-glow"
            />

            {/* Connection Lines (Data Streams) */}
            <path
                d="M4 16H8"
                stroke="var(--nx-text-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
            />
            <path
                d="M24 16H28"
                stroke="var(--nx-text-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
            />
        </svg>
    )
}
