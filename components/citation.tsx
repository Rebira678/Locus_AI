'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Citation as CitationType } from '@/lib/mock-data'
import { SourceBadge } from '@/components/primitives'
import { cn } from '@/lib/utils'

/**
 * The signature interaction. Amber = "this links back to a real source".
 * Hover highlights the marker; click expands a source card.
 */
export function Citation({
  citation,
  index,
  align = 'start',
}: {
  citation: CitationType
  index: number
  align?: 'start' | 'end'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={ref} className="relative inline-block align-baseline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Citation ${index}: ${citation.ref} in ${citation.source}`}
        className={cn(
          'group/cite mx-0.5 inline-flex translate-y-[-1px] items-center gap-1 rounded-[4px] px-1 py-0 align-middle',
          'font-mono text-[11px] leading-none transition-colors duration-150',
          'text-citation ring-1 ring-inset ring-[color:var(--citation-line)]',
          'hover:bg-citation-soft',
          open && 'bg-citation-soft',
        )}
      >
        <span className="tabular-nums">{index}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute top-[calc(100%+8px)] z-50 block w-[min(320px,80vw)]',
              align === 'end' ? 'right-0' : 'left-0',
            )}
          >
            <span className="block overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
              <span className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
                <SourceBadge id={citation.source} size="sm" />
                <span className="font-mono text-[11px] text-foreground">{citation.ref}</span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {citation.timestamp}
                </span>
              </span>
              <span className="block px-3 py-2.5">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {citation.author}
                </span>
                <span className="block text-[13px] leading-relaxed text-card-foreground">
                  “{citation.snippet}”
                </span>
              </span>
              <a
                href={citation.url}
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1 border-t border-border px-3 py-2 font-mono text-[11px] text-citation transition-colors hover:bg-citation-soft"
              >
                view in {citation.source}
                <ArrowUpRight className="size-3" />
              </a>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
