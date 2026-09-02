'use client'

import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { threads, type MemoryItem } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const typeColor: Record<MemoryItem['type'], string> = {
  decision: 'var(--color-decision)',
  action: 'var(--color-action)',
  blocker: 'var(--color-blocker)',
}

/**
 * Optional relationship view. Groups memories by thread into vertical
 * timelines, draws a copper (citation) link across the reversed-decision pair.
 * Deliberately restrained — a diagram, not a fireworks display.
 */
export function MemoryGraph({
  items,
  onOpen,
}: {
  items: MemoryItem[]
  onOpen: (id: string) => void
}) {
  const [hover, setHover] = useState<string | null>(null)

  const grouped = useMemo(() => {
    const map = new Map<string, MemoryItem[]>()
    for (const m of items) {
      const arr = map.get(m.threadId) ?? []
      arr.push(m)
      map.set(m.threadId, arr)
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    }
    return [...map.entries()]
  }, [items])

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center font-mono text-[12px] text-muted-foreground">
        nothing to plot — adjust your filters
      </div>
    )
  }

  const conflictIds = new Set(
    items.filter((m) => m.conflictWith && items.some((x) => x.id === m.conflictWith)).map((m) => m.id),
  )

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {(['decision', 'action', 'blocker'] as const).map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: typeColor[t] }} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t}
            </span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="h-px w-4" style={{ backgroundColor: 'var(--citation)' }} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-citation">
            reversal / conflict
          </span>
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {grouped.map(([threadId, list]) => (
          <div key={threadId} className="min-w-0">
            <h3 className="mb-3 truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {threads[threadId]}
            </h3>
            <div className="relative pl-4">
              {/* thread spine */}
              <span className="absolute inset-y-1 left-[3px] w-px bg-border" aria-hidden />
              <ul className="flex flex-col gap-2.5">
                {list.map((m) => {
                  const isConflict = conflictIds.has(m.id) || (m.conflictWith && conflictIds.has(m.conflictWith))
                  return (
                    <li key={m.id} className="relative">
                      <span
                        className="absolute -left-[13px] top-2 size-2 rounded-full ring-2 ring-card"
                        style={{ backgroundColor: typeColor[m.type] }}
                        aria-hidden
                      />
                      <button
                        onMouseEnter={() => setHover(m.id)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => onOpen(m.id)}
                        className={cn(
                          'block w-full rounded-md border px-2.5 py-1.5 text-left transition-colors',
                          isConflict
                            ? 'border-citation/40 bg-citation-soft/40 hover:bg-citation-soft'
                            : 'border-border hover:bg-muted/50',
                          hover === m.id && 'border-foreground/30',
                        )}
                      >
                        <span className="line-clamp-2 text-[12.5px] leading-snug text-card-foreground">
                          {m.title}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] text-muted-foreground">
                          {new Date(m.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                          {isConflict && <span className="ml-1.5 text-citation">· linked</span>}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 border-t border-border pt-4 font-mono text-[10.5px] leading-relaxed text-muted-foreground"
      >
        Each column is a thread; dots are captured memories in chronological order. Copper-linked
        nodes are where a later decision reversed an earlier one — the trail Locus preserves so the
        &ldquo;why&rdquo; never gets lost.
      </motion.p>
    </div>
  )
}
