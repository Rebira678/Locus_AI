'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, GitBranch, X } from 'lucide-react'
import {
  memoryById,
  people,
  type Citation,
  type MemoryItem,
} from '@/lib/mock-data'
import { Avatar, SourceBadge, StatusTag, TypeTag } from '@/components/primitives'

/* Source-native excerpt — styled to feel like where it came from. */
function ExcerptCard({ c }: { c: Citation }) {
  const isChat = c.source === 'slack' || c.source === 'discord'
  const isTicket = c.source === 'jira' || c.source === 'monday' || c.source === 'clickup'

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <SourceBadge id={c.source} size="sm" />
        <span className="font-mono text-[11px] text-foreground">{c.ref}</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{c.timestamp}</span>
      </div>

      <div className="px-3 py-3">
        {isChat ? (
          <div className="flex gap-2.5">
            <Avatar
              initials={c.author.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              name={c.author}
              className="mt-0.5"
            />
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-foreground">
                {c.author}{' '}
                <span className="font-mono text-[10px] font-normal text-muted-foreground">
                  {c.timestamp}
                </span>
              </p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-card-foreground">{c.snippet}</p>
            </div>
          </div>
        ) : isTicket ? (
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {c.author}
            </p>
            <p className="text-[13px] leading-relaxed text-card-foreground">{c.snippet}</p>
          </div>
        ) : (
          <blockquote className="border-l-2 border-border pl-3">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {c.author}
            </p>
            <p className="text-[13px] leading-relaxed text-card-foreground">{c.snippet}</p>
          </blockquote>
        )}
      </div>

      <a
        href={c.url}
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-1 border-t border-border px-3 py-2 font-mono text-[11px] text-citation transition-colors hover:bg-citation-soft"
      >
        view in {c.source}
        <ArrowUpRight className="size-3" />
      </a>
    </div>
  )
}

export function MemoryDrawer({
  item,
  onClose,
  onOpen,
}: {
  item: MemoryItem | null
  onClose: () => void
  onOpen: (id: string) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const conflict = item?.conflictWith ? memoryById(item.conflictWith) : undefined
  const owner = item ? people[item.ownerId] : undefined

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-card"
            role="dialog"
            aria-label={item.title}
          >
            {/* header */}
            <div className="flex items-start gap-3 border-b border-border px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2.5">
                  <TypeTag type={item.type} />
                  <StatusTag status={item.status} />
                </div>
                <h2 className="text-[1.3rem] font-semibold leading-tight tracking-[-0.02em] text-foreground text-balance">
                  {item.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* meta row */}
              <dl className="mb-5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Thread
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-card-foreground">{item.thread}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Owner
                  </dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 text-[13px] text-card-foreground">
                    <Avatar initials={owner!.initials} name={owner!.name} className="size-5 text-[9px]" />
                    {owner!.name}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Captured
                  </dt>
                  <dd className="mt-0.5 font-mono text-[12px] text-card-foreground">
                    {new Date(item.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Primary source
                  </dt>
                  <dd className="mt-0.5 flex items-center gap-1.5">
                    <SourceBadge id={item.source} size="sm" />
                    <span className="text-[13px] capitalize text-card-foreground">{item.source}</span>
                  </dd>
                </div>
              </dl>

              {/* summary */}
              <p className="mb-5 text-[14px] leading-relaxed text-card-foreground">{item.detail}</p>

              {/* conflict callout */}
              {conflict && (
                <button
                  onClick={() => onOpen(conflict.id)}
                  className="mb-5 flex w-full items-start gap-2.5 rounded-lg border border-blocker/30 bg-blocker/5 px-3.5 py-3 text-left transition-colors hover:bg-blocker/10"
                >
                  <GitBranch className="mt-0.5 size-4 shrink-0 text-blocker" />
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium text-foreground">
                      This decision conflicts with an earlier one
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">
                      {conflict.title}
                    </span>
                    <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-wider text-blocker">
                      view the reversal →
                    </span>
                  </span>
                </button>
              )}

              {/* provenance */}
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Provenance · {item.citations.length} source
                  {item.citations.length > 1 ? 's' : ''}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-col gap-2.5">
                {item.citations.map((c) => (
                  <ExcerptCard key={c.id} c={c} />
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
