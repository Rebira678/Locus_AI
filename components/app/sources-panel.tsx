'use client'

import { sources, type SourceStatus } from '@/lib/mock-data'
import { SourceBadge } from '@/components/primitives'
import { cn } from '@/lib/utils'

const statusDot: Record<SourceStatus, string> = {
  connected: 'bg-[var(--status-open)]',
  syncing: 'bg-[var(--status-decision)]',
  attention: 'bg-[var(--status-blocker)]',
}

const statusTextColor: Record<SourceStatus, string> = {
  connected: 'text-[var(--status-open)]',
  syncing: 'text-[var(--status-decision)]',
  attention: 'text-[var(--status-blocker)]',
}

const statusLabel: Record<SourceStatus, string> = {
  connected: 'Connected',
  syncing: 'Syncing',
  attention: 'Needs attention',
}

export function SourcesPanel() {
  const connected = sources.filter((s) => s.status !== 'attention').length

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <h2 className="text-[13px] font-medium text-foreground">Connected sources</h2>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          {connected}/{sources.length}
        </span>
      </div>
      <ul>
        {sources.map((s) => (
          <li
            key={s.id}
            className="mx-2 mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/50"
          >
            <SourceBadge id={s.id} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] text-card-foreground">{s.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">
                {s.itemCount.toLocaleString()} items · {s.lastSync}
              </p>
            </div>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className={cn(
                  'size-1.5 rounded-full',
                  statusDot[s.status],
                  s.status === 'syncing' && 'animate-pulse',
                )}
              />
              <span className={cn("hidden font-mono text-[10.5px] font-semibold uppercase tracking-wider sm:inline", statusTextColor[s.status])}>
                {statusLabel[s.status]}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
