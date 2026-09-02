import type { CitedAnswer } from '@/lib/mock-data'
import { Citation } from '@/components/citation'
import { SourceBadge } from '@/components/primitives'
import { cn } from '@/lib/utils'

/**
 * Renders an answer with inline amber citation markers.
 * Citation numbering follows the order of the answer's citations array.
 */
export function CitedAnswerBody({
  answer,
  className,
  showSources = true,
}: {
  answer: CitedAnswer
  className?: string
  showSources?: boolean
}) {
  const indexOf = (id?: string) =>
    id ? answer.citations.findIndex((c) => c.id === id) + 1 : 0

  return (
    <div className={className}>
      <p className={cn('text-pretty text-[15px] leading-[1.75] text-card-foreground')}>
        {answer.segments.map((seg, i) => {
          if (!seg.citationId) return <span key={i}>{seg.text}</span>
          const citation = answer.citations.find((c) => c.id === seg.citationId)!
          return (
            <span key={i} className="text-foreground">
              {seg.text}
              <Citation citation={citation} index={indexOf(seg.citationId)} />
            </span>
          )
        })}
      </p>

      {showSources && (
        <div className="mt-5 border-t border-border pt-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {answer.citations.length} sources
          </div>
          <div className="flex flex-wrap gap-1.5">
            {answer.citations.map((c, i) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 py-1 pl-1.5 pr-2"
              >
                <SourceBadge id={c.source} size="sm" />
                <span className="font-mono text-[10px] text-citation">{i + 1}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{c.ref}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
