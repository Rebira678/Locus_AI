import { SourceBadge } from '@/components/primitives'

const timeline = [
  {
    when: 'Jun 18 · 3:12 PM',
    source: 'slack' as const,
    label: '#eng-auth',
    text: '“Let’s just go with Clerk for v1.” A real decision, made in the flow of a thread.',
    tone: 'made',
  },
  {
    when: '+ 3 weeks',
    source: 'slack' as const,
    label: '2,400 messages later',
    text: 'The thread scrolls into oblivion under standups, incidents, and memes. Nobody can find it.',
    tone: 'lost',
  },
  {
    when: 'Aug 21 · today',
    source: 'slack' as const,
    label: 'new hire asks in standup',
    text: '“Wait — are we on Clerk or Better Auth? And didn’t that change?”',
    tone: 'lost',
  },
  {
    when: '1.4 seconds',
    source: 'notion' as const,
    label: 'ask Locus',
    text: 'The full arc comes back — the original call, the reversal, and why — each line cited.',
    tone: 'found',
  },
]

export function Problem() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              The problem
            </p>
            <h2 className="mt-4 text-balance text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[2.3rem]">
              Decisions get made in the flow of work — and <span className="bg-gradient-to-r from-citation to-citation/70 bg-clip-text text-transparent">quietly lost.</span>
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              The institutional memory of a startup doesn’t live in a wiki. It lives in a Slack
              thread from a Tuesday, a Jira comment, an email reply. Locus watches for the decisions,
              action items, and blockers as they happen — so the record exists whether or not anyone
              remembered to write it down.
            </p>
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-3 left-[7px] top-3 w-px bg-border"
            />
            {timeline.map((t, i) => (
              <li key={i} className="relative grid grid-cols-[auto_1fr] gap-4 pb-8 last:pb-0">
                <span
                  aria-hidden
                  className="relative z-10 mt-1.5 size-3.5 rounded-full border-2"
                  style={{
                    borderColor:
                      t.tone === 'found' ? 'var(--citation)' : 'var(--border)',
                    backgroundColor:
                      t.tone === 'found' ? 'var(--citation)' : 'var(--background)',
                  }}
                />
                <div
                  className={
                    t.tone === 'found'
                      ? 'rounded-lg border border-citation/30 bg-citation-soft p-4'
                      : 'rounded-lg border border-border bg-card p-4'
                  }
                >
                  <div className="mb-2 flex items-center gap-2">
                    <SourceBadge id={t.source} size="sm" />
                    <span className="font-mono text-[11px] text-muted-foreground">{t.label}</span>
                    <span className="ml-auto font-mono text-[10.5px] text-muted-foreground">
                      {t.when}
                    </span>
                  </div>
                  <p
                    className={
                      t.tone === 'lost'
                        ? 'text-[14px] leading-relaxed text-muted-foreground'
                        : 'text-[14px] leading-relaxed text-card-foreground'
                    }
                  >
                    {t.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
