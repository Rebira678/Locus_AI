'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { memory, people, type MemoryItem } from '@/lib/mock-data'
import { Avatar, SourceBadge, TypeTag } from '@/components/primitives'

const byRecent = [...memory].sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
)

// Extra "incoming" captures that stream in to give the feed a live feel.
const incomingPool: { source: MemoryItem['source']; type: MemoryItem['type']; title: string; ownerId: string }[] = [
  { source: 'slack', type: 'decision', title: 'Adopt trunk-based development for the ingest repo', ownerId: 'dana' },
  { source: 'github', type: 'action', title: 'Backfill OpenTelemetry spans on the query path', ownerId: 'leo' },
  { source: 'jira', type: 'blocker', title: 'Staging seed job flaky since the queue rewrite', ownerId: 'jonah' },
  { source: 'notion', type: 'decision', title: 'Docs move to versioned MDX in the app repo', ownerId: 'ava' },
  { source: 'gmail', type: 'action', title: 'Send design-partner migration calculator by Friday', ownerId: 'sam' },
]

function FeedRow({ item, isNew }: { item: FeedItem; isNew?: boolean }) {
  const owner = people[item.ownerId]
  return (
    <motion.li
      layout
      initial={isNew ? { opacity: 0, height: 0, y: -8 } : false}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="mx-2 mb-1 flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-muted/50">
        <SourceBadge id={item.source} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] text-card-foreground">{item.title}</p>
          <div className="mt-1 flex items-center gap-2.5">
            <TypeTag type={item.type} />
            <span className="font-mono text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        </div>
        {isNew && (
          <span className="hidden shrink-0 rounded-full bg-citation-soft px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-citation sm:inline-block">
            new
          </span>
        )}
        <Avatar initials={owner.initials} name={owner.name} className="hidden sm:inline-flex" />
      </div>
    </motion.li>
  )
}

interface FeedItem {
  id: string
  source: MemoryItem['source']
  type: MemoryItem['type']
  title: string
  ownerId: string
  label: string
  isNew?: boolean
}

const seed: FeedItem[] = byRecent.slice(0, 6).map((m) => ({
  id: m.id,
  source: m.source,
  type: m.type,
  title: m.title,
  ownerId: m.ownerId,
  label: new Date(m.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
}))

export function RecentFeed() {
  const [items, setItems] = useState<FeedItem[]>(seed)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      const src = incomingPool[i % incomingPool.length]
      i += 1
      setItems((prev) =>
        [
          {
            id: `live-${Date.now()}`,
            source: src.source,
            type: src.type,
            title: src.title,
            ownerId: src.ownerId,
            label: 'just now',
            isNew: true,
          },
          ...prev.map((p) => ({ ...p, isNew: false })),
        ].slice(0, 8),
      )
    }, 5200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-2 animate-ping rounded-full bg-citation opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-citation" />
        </span>
        <h2 className="text-[13px] font-medium text-foreground">Captured just now</h2>
        <Link
          href="/memory"
          className="ml-auto font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          view all →
        </Link>
      </div>
      <ul>
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <FeedRow key={item.id} item={item} isNew={item.isNew} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
