interface SectionLabelProps {
  label: string
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <span className="font-mono-nx text-[10px] font-semibold tracking-[1px] text-[var(--nx-text-muted)]">
      // {label}
    </span>
  )
}
