import { GitBranch } from 'lucide-react'
import { answerById, memoryById } from '@/lib/mock-data'
import { CitedAnswerBody } from '@/components/cited-answer'
import { Avatar, SourceBadge, TypeTag } from '@/components/primitives'
import { people } from '@/lib/mock-data'

export function CitationDeepDive() {
  const answer = answerById('a-auth')
  const original = memoryById('m-101')!
  const reversal = memoryById('m-104')!

  return (
    <section id="citations" className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Why citations matter
            </p>
            <h2 className="text-balance text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.6rem] lg:text-[2.8rem]">
              An answer you can’t verify is <span className="inline-block bg-gradient-to-r from-citation to-citation/70 bg-clip-text text-transparent">just a rumor.</span>
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Everything in indigo traces back to something real. Click any citation to read the
              original message in context — and follow the link home to Slack, Jira, or Notion.
              Locus even keeps the decisions that got{' '}
              <span className="text-foreground">reversed</span>, so you can see not just what was
              decided, but how the thinking changed.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
              <span className="size-2.5 rounded-full bg-citation" />
              <span className="font-mono text-[11px] text-muted-foreground">
                indigo = traceable to a real source
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {/* the cited answer */}
            <div className="rounded-xl border border-border bg-card p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <span className="font-mono text-[11px] text-muted-foreground">Q</span>
                <span className="text-[14px] font-medium text-foreground">{answer.question}</span>
              </div>
              <CitedAnswerBody answer={answer} />
            </div>

            {/* the reversal pair */}
            <div className="rounded-xl border border-border bg-card p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2">
                <GitBranch className="size-3.5 text-citation" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  decision history · this call was reversed
                </span>
              </div>

              <div className="relative space-y-3">
                {[original, reversal].map((m, i) => {
                  const owner = people[m.ownerId]
                  const reversed = i === 0
                  return (
                    <div
                      key={m.id}
                      className={
                        reversed
                          ? 'rounded-lg border border-border bg-muted/20 p-4'
                          : 'rounded-lg border border-citation/30 bg-citation-soft p-4'
                      }
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <SourceBadge id={m.source} size="sm" />
                        <TypeTag type={m.type} />
                        <span className="ml-auto font-mono text-[10.5px] text-muted-foreground">
                          {new Date(m.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p
                        className={
                          reversed
                            ? 'text-[14px] font-medium text-muted-foreground line-through decoration-border'
                            : 'text-[14px] font-medium text-foreground'
                        }
                      >
                        {m.title}
                      </p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                        {m.detail}
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <Avatar initials={owner.initials} name={owner.name} className="size-5 text-[9px]" />
                        <span className="font-mono text-[10.5px] text-muted-foreground">
                          {owner.name} · {owner.role}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div className="pointer-events-none absolute -left-px top-[68px] hidden font-mono text-[10px] text-citation sm:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
