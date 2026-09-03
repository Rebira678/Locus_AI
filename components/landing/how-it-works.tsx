'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SourceBadge, TypeTag } from '@/components/primitives'
import { cn } from '@/lib/utils'
import { CheckCircle2, ChevronRight } from 'lucide-react'

function StepVisualCapture() {
  const rows = [
    { source: 'slack' as const, type: 'decision' as const, text: 'Standardize on Better Auth' },
    { source: 'jira' as const, type: 'action' as const, text: 'MER-812 · session cutover plan' },
    { source: 'gmail' as const, type: 'blocker' as const, text: 'Invite emails landing in spam' },
  ]
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center gap-2.5 rounded-lg border border-white/5 bg-background/50 px-3 py-2.5 shadow-sm backdrop-blur-sm',
            i === 0 && 'ring-1 ring-inset ring-citation/30',
          )}
        >
          <SourceBadge id={r.source} size="sm" />
          <span className="truncate text-[12.5px] text-foreground/90">{r.text}</span>
          <TypeTag type={r.type} className="ml-auto hidden sm:inline-flex" />
        </div>
      ))}
      <div className="pt-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
        captured automatically
      </div>
    </div>
  )
}

function StepVisualCite() {
  return (
    <div className="rounded-lg border border-white/5 bg-background/50 p-4 shadow-sm backdrop-blur-sm">
      <p className="text-[13px] leading-relaxed text-foreground/90">
        Moved to{' '}
        <span className="rounded-[5px] bg-citation/10 px-1.5 py-0.5 font-medium text-foreground ring-1 ring-inset ring-citation/40">
          Better Auth
          <span className="ml-1.5 font-mono text-[10px] text-citation">1</span>
        </span>{' '}
        after the cost review.
      </p>
      <div className="mt-4 overflow-hidden rounded-md border border-citation/20 shadow-inner">
        <div className="flex items-center gap-2 bg-citation/10 px-3 py-2">
          <SourceBadge id="notion" size="sm" />
          <span className="font-mono text-[10.5px] font-medium text-foreground">Auth RFC v2</span>
          <span className="ml-auto font-mono text-[10px] text-citation">source 1</span>
        </div>
        <p className="bg-background/40 px-3 py-2.5 text-[12px] italic leading-relaxed text-muted-foreground">
          “At 40k MAU the seat pricing is ~4× our infra cost…”
        </p>
      </div>
    </div>
  )
}

function StepVisualAsk() {
  return (
    <div className="space-y-3">
      {['Are we on Clerk or Better Auth?', 'What did we decide about pricing?', 'Which blockers are open?'].map(
        (q, i) => (
          <motion.div
            whileHover={i === 0 ? { scale: 1.02 } : {}}
            key={i}
            className={cn(
              'flex items-center gap-3 rounded-full border px-4 py-3 shadow-sm backdrop-blur-md',
              i === 0
                ? 'border-citation/30 bg-citation/15 text-foreground ring-1 ring-inset ring-citation/20'
                : 'border-white/5 bg-background/50 text-muted-foreground',
            )}
          >
            <span className={cn("font-mono text-[12px]", i === 0 ? "text-citation" : "text-muted-foreground/50")}>?</span>
            <span className={cn("truncate text-[13px]", i === 0 && "font-medium")}>{q}</span>
          </motion.div>
        ),
      )}
    </div>
  )
}

function StepConnect() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-10 overflow-hidden rounded-2xl border border-white/5 bg-card/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-citation/15 blur-[80px]" />
      
      <div className="relative z-10">
        <h3 className="mb-4 text-[1.7rem] font-semibold tracking-tight text-foreground">Connect your tools.</h3>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Authorize Locus AI to read from the tools your team already lives in. No exports, no copy-paste, no new workflows. Locus AI sits quietly in the background and starts building organizational memory from day one.
        </p>
      </div>

      <ul className="relative z-10 space-y-4 text-[14.5px] text-muted-foreground">
        {[
          'One-click OAuth authorization',
          'Read-only access. We never post on your behalf',
          'Works alongside your existing tools with zero friction',
        ].map((text, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span className="text-foreground/80">{text}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 grid gap-4 sm:grid-cols-3">
        {[
          { id: 'slack', label: 'Threads, channels, DMs' },
          { id: 'notion', label: 'Docs, wikis, databases' },
          { id: 'gmail', label: 'Threads & replies' },
        ].map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-background/50 p-5 shadow-lg backdrop-blur-md transition-colors hover:border-citation/30 hover:bg-card/80"
          >
            <SourceBadge id={tool.id as any} size="sm" className="ring-1 ring-white/10" />
            <span className="text-[12px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {tool.label}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="relative z-10 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/60">
        + Linear, GitHub, Google Docs coming soon
      </p>
    </div>
  )
}

function StepBuild() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-10 overflow-hidden rounded-2xl border border-white/5 bg-card/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-12">
      <div className="pointer-events-none absolute -left-20 top-20 size-64 rounded-full bg-citation/10 blur-[80px]" />
      
      <div className="relative z-10">
        <h3 className="mb-4 text-[1.7rem] font-semibold tracking-tight text-foreground">Build organizational memory.</h3>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Locus reads across your connected tools and recognizes real decisions, action items, and blockers as they happen. Every captured item keeps a link home — the exact message, ticket, or doc it came from. The citation is the record.
        </p>
      </div>
      <div className="relative z-10 grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-citation/20 text-citation">
              <span className="font-mono text-[10px]">01</span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">Capture</span>
          </div>
          <StepVisualCapture />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-citation/20 text-citation">
              <span className="font-mono text-[10px]">02</span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">Cite</span>
          </div>
          <StepVisualCite />
        </div>
      </div>
    </div>
  )
}

function StepAsk() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-10 overflow-hidden rounded-2xl border border-white/5 bg-card/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-citation/15 blur-[100px]" />
      
      <div className="relative z-10 text-center">
        <h3 className="mb-4 text-[1.7rem] font-semibold tracking-tight text-foreground">Ask in plain language.</h3>
        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Anyone asks in plain language and gets a direct answer — with the sources attached, not buried.
        </p>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-lg">
        <StepVisualAsk />
      </div>
    </div>
  )
}

const steps = [
  { title: 'Connect tools', content: <StepConnect /> },
  { title: 'Build memory', content: <StepBuild /> },
  { title: 'Ask anything', content: <StepAsk /> },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="how" className="relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-4 text-balance text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[2.6rem]">
            See how Locus AI turns your team's activity into <span className="bg-gradient-to-r from-citation to-citation/70 bg-clip-text text-transparent">shared memory.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted-foreground">
            Locus AI connects to Slack, Notion, and your other tools, continuously building organizational memory, surfacing context, and giving your whole team a searchable understanding of what the organization already knows.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          <div className="flex justify-start overflow-x-auto pb-4 sm:justify-center md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="inline-flex min-w-max items-center gap-2 rounded-full border border-white/5 bg-background/50 p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-xl">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300',
                    activeStep === i
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground/90',
                  )}
                >
                  {activeStep === i && (
                    <motion.div
                      layoutId="active-tab-glow"
                      className="absolute inset-0 rounded-full border border-citation/30 bg-citation/10 shadow-[0_0_32px_rgba(124,116,237,0.25)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    >
                      {/* Premium glowing blue trace lines at top and bottom */}
                      <div className="absolute -top-[1px] left-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-citation to-transparent opacity-80 shadow-[0_0_8px_var(--citation)]" />
                      <div className="absolute -bottom-[1px] left-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-citation to-transparent opacity-80 shadow-[0_0_8px_var(--citation)]" />
                    </motion.div>
                  )}
                  <span
                    className={cn(
                      'relative z-10 flex size-6 items-center justify-center rounded-full font-mono text-[11px] transition-colors',
                      activeStep === i
                        ? 'bg-citation text-white shadow-[0_0_12px_rgba(124,116,237,0.5)]'
                        : 'bg-muted/50 text-muted-foreground',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="relative z-10 text-[15px] font-semibold tracking-tight">
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {steps[activeStep].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
