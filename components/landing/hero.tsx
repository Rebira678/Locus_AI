import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroDemo } from '@/components/landing/hero-demo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* copy */}
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 py-1 pl-1.5 pr-3">
              <span className="rounded-full bg-citation-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-citation">
                cited
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                every answer traces to a real source
              </span>
            </div>

            <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[3.2rem] lg:text-[3.6rem]">
              Didn’t we already <span className="bg-gradient-to-r from-citation to-citation/70 bg-clip-text text-transparent">decide this</span> three weeks ago?
            </h1>

            <p className="mt-6 text-pretty text-[16px] leading-relaxed text-muted-foreground">
              Locus AI turns your team’s Slack, Jira, Notion, GitHub and inbox into searchable
              organizational memory. Ask in plain language — get an answer cited back to the exact
              message, ticket, or doc where the decision was actually made.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ size: 'lg' }), 'group h-10 px-4 text-[14px] w-full sm:w-auto')}
              >
                Connect your tools
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#citations"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-10 px-4 text-[14px] w-full sm:w-auto',
                )}
              >
                See a cited answer
              </a>
            </div>

            <p className="mt-6 font-mono text-[11px] text-muted-foreground">
              No rip-and-replace. It reads the tools your team already lives in.
            </p>
          </div>

          {/* demo widget */}
          <div className="lg:pl-4">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
