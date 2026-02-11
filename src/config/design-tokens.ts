/**
 * Nexus Command Center — Design Tokens
 *
 * Single source of truth for all design values.
 * These map 1:1 with the CSS custom properties in index.css
 * and the .env VITE_COLOR_* / VITE_FONT_* variables.
 *
 * Usage in components:
 *   import { colors, fonts, radii, spacing } from '@/config/design-tokens'
 *
 * Usage in Tailwind classes:
 *   bg-[var(--nx-canvas)]   text-[var(--nx-text-primary)]
 */

// ─── Canvas & Surfaces ──────────────────────────────────────
export const colors = {
  canvas:       'var(--nx-canvas)',
  surface:      'var(--nx-surface)',
  surfaceHover: 'var(--nx-surface-hover)',
  terminalBg:   'var(--nx-terminal-bg)',

  // Accents
  cyan:    'var(--nx-cyan)',
  success: 'var(--nx-success)',
  danger:  'var(--nx-danger)',
  amber:   'var(--nx-amber)',

  // Text hierarchy
  textPrimary:   'var(--nx-text-primary)',
  textSecondary: 'var(--nx-text-secondary)',
  textMuted:     'var(--nx-text-muted)',

  // Borders
  border:     'var(--nx-border)',
  borderGlow: 'var(--nx-border-glow)',
} as const

// ─── Typography ─────────────────────────────────────────────
export const fonts = {
  ui:   'font-ui',      // Tailwind utility class → Inter Tight
  mono: 'font-mono-nx', // Tailwind utility class → JetBrains Mono
} as const

// ─── Radii ──────────────────────────────────────────────────
export const radii = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  pill: '999px',
} as const

// ─── Spacing scale (px) ────────────────────────────────────
export const spacing = {
  xs:  '4px',
  sm:  '8px',
  md:  '16px',
  lg:  '24px',
  xl:  '32px',
  '2xl': '40px',
} as const

// ─── Shadows & Glows ───────────────────────────────────────
export const shadows = {
  card:    '0 4px 24px rgba(0, 217, 255, 0.03)',
  glow:    '0 0 20px rgba(0, 255, 157, 0.06)',
  danger:  '0 0 20px rgba(255, 68, 68, 0.08)',
  warning: '0 2px 20px rgba(245, 158, 11, 0.08)',
} as const
