'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  GitBranch,
  LayoutList,
  Loader2,
  Network,
  Search,
  SlidersHorizontal,
  X,
  Hash,
} from 'lucide-react'
import {
  memory,
  people,
  sources,
  threads,
  type MemoryItem,
  type MemoryStatus,
  type MemoryType,
  type SourceId,
} from '@/lib/mock-data'
import { Avatar, SourceBadge, StatusTag, TypeTag, typeMeta, sourceIcons, statusColors } from '@/components/primitives'
import { MemoryDrawer } from '@/components/app/memory-drawer'
import { MemoryGraph } from '@/components/app/memory-graph'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 8

const typeOptions: MemoryType[] = ['decision', 'action', 'blocker']
const statusOptions: MemoryStatus[] = ['open', 'resolved', 'stale']

function FacetChip({
  active,
  onClick,
  children,
  dotColor,
  icon,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  dotColor?: string
  icon?: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all',
        active ? 'shadow-sm' : 'hover:bg-muted/50',
      )}
      style={
        active && dotColor
          ? { backgroundColor: dotColor, borderColor: dotColor, color: '#fff' }
          : active && !dotColor
          ? { backgroundColor: 'var(--foreground)', borderColor: 'var(--foreground)', color: 'var(--background)' }
          : !active && dotColor
          ? { 
              color: dotColor, 
              borderColor: `color-mix(in srgb, ${dotColor} 40%, transparent)`, 
              backgroundColor: `color-mix(in srgb, ${dotColor} 15%, transparent)` 
            }
          : { color: 'var(--muted-foreground)', borderColor: 'var(--border)', backgroundColor: 'var(--card)' }
      }
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  )
}

export function MemoryExplorer() {
  const [query, setQuery] = useState('')
  const [types, setTypes] = useState<Set<MemoryType>>(new Set())
  const [statuses, setStatuses] = useState<Set<MemoryStatus>>(new Set())
  const [srcFilter, setSrcFilter] = useState<Set<SourceId>>(new Set())
  const [threadFilter, setThreadFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [view, setView] = useState<'table' | 'graph'>('table')
  const [showFilters, setShowFilters] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set)
    next.has(val) ? next.delete(val) : next.add(val)
    setter(next)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return memory
      .filter((m) => {
        if (types.size && !types.has(m.type)) return false
        if (statuses.size && !statuses.has(m.status)) return false
        if (srcFilter.size && !srcFilter.has(m.source)) return false
        if (threadFilter && m.threadId !== threadFilter) return false
        if (q) {
          const hay = (
            m.title +
            m.detail +
            m.thread +
            m.citations.map((c) => c.snippet + c.author + c.ref).join(' ')
          ).toLowerCase()
          if (!hay.includes(q)) return false
        }
        return true
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [query, types, statuses, srcFilter, threadFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const activeFilterCount =
    types.size + statuses.size + srcFilter.size + (threadFilter ? 1 : 0)

  const clearAll = () => {
    setTypes(new Set())
    setStatuses(new Set())
    setSrcFilter(new Set())
    setThreadFilter(null)
    setQuery('')
    setPage(1)
  }

  const openItem = memory.find((m) => m.id === openId) ?? null

  return (
    <div>
      {/* search + view toggle */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 focus-within:border-foreground/30">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search decisions, snippets, people, ticket IDs…"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search">
              <X className="size-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-[13px] transition-colors',
              showFilters || activeFilterCount
                ? 'border-foreground/20 text-foreground'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            <SlidersHorizontal className="size-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-citation text-[9px] font-medium text-background">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center rounded-lg border border-border p-0.5">
            <button
              onClick={() => setView('table')}
              aria-label="Table view"
              className={cn(
                'rounded-md p-1.5 transition-colors',
                view === 'table' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <LayoutList className="size-4" />
            </button>
            <button
              onClick={() => setView('graph')}
              aria-label="Graph view"
              className={cn(
                'rounded-md p-1.5 transition-colors',
                view === 'graph' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Network className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* filter facets */}
      <AnimatePresence initial={false}>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card/50 p-3.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Type
                </span>
                {typeOptions.map((t) => (
                  <FacetChip key={t} active={types.has(t)} onClick={() => toggle(types, t, setTypes)} dotColor={typeMeta[t].color}>
                    {typeMeta[t].label}
                  </FacetChip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Status
                </span>
                {statusOptions.map((s) => {
                  return (
                  <FacetChip
                    key={s}
                    active={statuses.has(s)}
                    onClick={() => toggle(statuses, s, setStatuses)}
                    dotColor={statusColors[s]}
                  >
                    {s}
                  </FacetChip>
                )})}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Source
                </span>
                {sources
                  .filter((s) => s.itemCount > 0)
                  .map((s) => (
                    <FacetChip
                      key={s.id}
                      active={srcFilter.has(s.id)}
                      onClick={() => toggle(srcFilter, s.id, setSrcFilter)}
                      icon={
                        sourceIcons[s.id] ? (
                          <img src={sourceIcons[s.id]} alt="" className="size-3.5 rounded-[2px] object-contain" />
                        ) : null
                      }
                    >
                      {s.name}
                    </FacetChip>
                  ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Thread
                </span>
                {Object.entries(threads).map(([id, label]) => (
                  <FacetChip
                    key={id}
                    active={threadFilter === id}
                    onClick={() => {
                      setThreadFilter(threadFilter === id ? null : id)
                      setPage(1)
                    }}
                    icon={<Hash className="size-3 text-muted-foreground/70" />}
                  >
                    {label}
                  </FacetChip>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* result count */}
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-[11px] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'memory' : 'memories'}
          {activeFilterCount > 0 || query ? ' matched' : ' captured'}
        </span>
        {(activeFilterCount > 0 || query) && (
          <button
            onClick={clearAll}
            className="font-mono text-[11px] text-citation transition-colors hover:underline"
          >
            clear all
          </button>
        )}
      </div>

      {view === 'graph' ? (
        <MemoryGraph items={filtered} onOpen={setOpenId} />
      ) : filtered.length === 0 ? (
        <EmptyState onClear={clearAll} />
      ) : (
        <>
          {/* table */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* header (desktop) */}
            <div className="hidden grid-cols-[1fr_auto] items-center gap-4 border-b border-border bg-muted/30 px-4 py-2.5 md:grid md:grid-cols-[minmax(0,1fr)_140px_120px_100px]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Memory
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Thread
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Owner
              </span>
              <span className="text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Captured
              </span>
            </div>

            <ul>
              {paged.map((m) => (
                <MemoryRow key={m.id} item={m} onOpen={() => setOpenId(m.id)} />
              ))}
            </ul>
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-[11px] text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-md border border-border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors enabled:hover:text-foreground disabled:opacity-40"
                >
                  ← prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-md border border-border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors enabled:hover:text-foreground disabled:opacity-40"
                >
                  next →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <MemoryDrawer item={openItem} onClose={() => setOpenId(null)} onOpen={setOpenId} />
    </div>
  )
}

function MemoryRow({ item, onOpen }: { item: MemoryItem; onOpen: () => void }) {
  const owner = people[item.ownerId]
  return (
    <li className="border-b border-border last:border-b-0">
      <button
        onClick={onOpen}
        className="grid w-full grid-cols-1 items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/40 md:grid-cols-[minmax(0,1fr)_140px_120px_100px] md:gap-4"
      >
        <div className="flex items-start gap-3">
          <SourceBadge id={item.source} size="md" className="mt-0.5" />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] text-card-foreground">{item.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <TypeTag type={item.type} />
              <StatusTag status={item.status} />
              {item.conflictWith && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-blocker">
                  <GitBranch className="size-3" />
                  conflict
                </span>
              )}
            </div>
          </div>
        </div>

        <span className="hidden truncate font-mono text-[11px] text-muted-foreground md:block">
          {item.thread}
        </span>

        <span className="hidden items-center gap-1.5 md:flex">
          <Avatar initials={owner.initials} name={owner.name} className="size-5 text-[9px]" />
          <span className="truncate text-[12px] text-muted-foreground">{owner.name}</span>
        </span>

        <span className="hidden text-right font-mono text-[11px] text-muted-foreground md:block">
          {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </button>
    </li>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
      <div className="mb-4 flex size-11 items-center justify-center rounded-full border border-border bg-muted">
        <Search className="size-5 text-muted-foreground" />
      </div>
      <p className="text-[15px] font-medium text-foreground">No memories match those filters</p>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
        Locus only surfaces what it can trace to a real source. Try widening the filters or
        searching a different thread.
      </p>
      <button
        onClick={onClear}
        className="mt-4 rounded-md border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
      >
        clear filters
      </button>
    </div>
  )
}

/* Skeleton kept available for the loading state pattern. */
export function ExplorerSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-16 text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      <span className="font-mono text-[12px]">loading memory…</span>
    </div>
  )
}
