'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CornerDownLeft, Search } from 'lucide-react'
import { answers } from '@/lib/mock-data'
import { Citation } from '@/components/citation'
import { SourceBadge } from '@/components/primitives'
import { cn } from '@/lib/utils'

export function HeroDemo() {
  const [answerIdx, setAnswerIdx] = useState(0)
  const [phase, setPhase] = useState<'asking' | 'answering'>('asking')
  const [revealed, setRevealed] = useState(0)

  const answer = answers[answerIdx]

  useEffect(() => {
    setPhase('asking')
    setRevealed(0)
    const startTimer = setTimeout(() => setPhase('answering'), 750)
    return () => clearTimeout(startTimer)
  }, [answerIdx])

  useEffect(() => {
    if (phase !== 'answering') return
    if (revealed >= answer.segments.length) return
    const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 250 : 170)
    return () => clearTimeout(t)
  }, [phase, revealed, answer.segments.length])

  const indexOf = (id?: string) => (id ? answer.citations.findIndex((c) => c.id === id) + 1 : 0)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-citation" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            live · locus memory
          </span>
        </span>
        <span className="ml-auto flex items-center gap-1">
          {(['slack', 'jira', 'notion', 'gmail'] as const).map((s) => (
            <SourceBadge key={s} id={s} size="sm" />
          ))}
        </span>
      </div>

      {/* ask bar */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-[14px] text-foreground">
          {answer.question}
          {phase === 'asking' && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-citation align-middle"
            />
          )}
        </span>
        <kbd className="hidden shrink-0 items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
          <CornerDownLeft className="size-3" /> ask
        </kbd>
      </div>

      {/* answer */}
      <div className="min-h-[220px] px-4 py-4">
        <AnimatePresence mode="wait">
          {phase === 'asking' ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
            >
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                searching 6 connected sources…
              </motion.span>
            </motion.div>
          ) : (
            <motion.div key={answer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-pretty text-[14.5px] leading-[1.8] text-card-foreground">
                {answer.segments.slice(0, revealed).map((seg, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className={seg.citationId ? 'text-foreground' : undefined}
                  >
                    {seg.text}
                    {seg.citationId && (
                      <Citation
                        citation={answer.citations.find((c) => c.id === seg.citationId)!}
                        index={indexOf(seg.citationId)}
                      />
                    )}
                  </motion.span>
                ))}
              </p>

              {revealed >= answer.segments.length && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border pt-3"
                >
                  <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    cited from
                  </span>
                  {answer.citations.map((c, i) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 py-0.5 pl-1.5 pr-2"
                    >
                      <SourceBadge id={c.source} size="sm" />
                      <span className="font-mono text-[10px] text-citation">{i + 1}</span>
                      <span className="font-mono text-[10.5px] text-muted-foreground">{c.ref}</span>
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* question switcher */}
      <div className="flex flex-wrap gap-1.5 border-t border-border bg-muted/20 px-4 py-3">
        {answers.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAnswerIdx(i)}
            className={cn(
              'rounded-full border px-2.5 py-1 text-left text-[11.5px] transition-colors',
              i === answerIdx
                ? 'border-citation/40 bg-citation-soft text-foreground'
                : 'border-border text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground',
            )}
          >
            {a.question.length > 42 ? a.question.slice(0, 40) + '…' : a.question}
          </button>
        ))}
      </div>
    </div>
  )
}
