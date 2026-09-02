import { cn } from '@/lib/utils'
import {
  type MemoryType,
  type MemoryStatus,
  type SourceId,
  sourceById,
} from '@/lib/mock-data'

export const sourceIcons: Record<SourceId, string> = {
  slack: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128',
  jira: 'https://www.google.com/s2/favicons?domain=jira.atlassian.com&sz=128',
  github: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
  notion: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
  gmail: 'https://www.google.com/s2/favicons?domain=mail.google.com&sz=128',
  discord: 'https://www.google.com/s2/favicons?domain=discord.com&sz=128',
  monday: 'https://www.google.com/s2/favicons?domain=monday.com&sz=128',
  clickup: 'https://www.google.com/s2/favicons?domain=clickup.com&sz=128',
}

/* --------------------------------------------------- monochrome source badge */

const sizeMap = {
  sm: 'size-5 text-[9px]',
  md: 'size-6 text-[10px]',
  lg: 'size-8 text-xs',
}

export function SourceBadge({
  id,
  size = 'md',
  className,
  showRing = true,
}: {
  id: SourceId
  size?: keyof typeof sizeMap
  className?: string
  showRing?: boolean
}) {
  const src = sourceById(id)
  const Icon = sourceIcons[id]
  return (
    <span
      title={src.name}
      className={cn(
        'inline-flex items-center justify-center rounded-[5px] font-mono font-medium uppercase tracking-tight text-muted-foreground',
        'bg-muted',
        showRing && 'ring-1 ring-inset ring-border',
        sizeMap[size],
        className,
      )}
      aria-label={src.name}
    >
      {sourceIcons[id] ? (
        <img
          src={sourceIcons[id]}
          alt={src.name}
          className="size-[70%] object-contain"
        />
      ) : (
        src.short
      )}
    </span>
  )
}

/* ---------------------------------------------------------------- avatar */

export function Avatar({
  initials,
  name,
  className,
}: {
  initials: string
  name?: string
  className?: string
}) {
  return (
    <span
      title={name}
      aria-label={name}
      className={cn(
        'inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-secondary-foreground ring-1 ring-inset ring-border',
        className,
      )}
    >
      {initials}
    </span>
  )
}

/* ----------------------------------------------------------- type / status */

export const typeMeta: Record<MemoryType, { label: string; color: string }> = {
  decision: { label: 'Decision', color: 'var(--status-decision)' },
  action: { label: 'Action item', color: 'var(--status-action)' },
  blocker: { label: 'Blocker', color: 'var(--status-blocker)' },
}

export function TypeTag({ type, className }: { type: MemoryType; className?: string }) {
  const meta = typeMeta[type]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-wider',
        className,
      )}
      style={{ color: meta.color }}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {meta.label}
    </span>
  )
}

const statusMeta: Record<MemoryStatus, string> = {
  open: 'Open',
  resolved: 'Resolved',
  stale: 'Stale',
}

export const statusColors: Record<MemoryStatus, string> = {
  open: 'var(--status-open)',
  resolved: 'var(--status-resolved)',
  stale: 'var(--status-stale)',
}

export function StatusTag({ status, className }: { status: MemoryStatus; className?: string }) {
  const color = statusColors[status]
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
        className,
      )}
      style={{ 
        color, 
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`, 
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` 
      }}
    >
      {status === 'stale' && <span className="mr-1 opacity-60">·</span>}
      {statusMeta[status]}
    </span>
  )
}

/* ------------------------------------------------------------- mono label */

export function Mono({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('font-mono text-xs text-muted-foreground', className)}>{children}</span>
  )
}
