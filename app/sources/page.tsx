import type { Metadata } from 'next'
import { AppShell } from '@/components/app/app-shell'
import { sources } from '@/lib/mock-data'
import { SourceBadge } from '@/components/primitives'
import { cn } from '@/lib/utils'
import { Search, Plus, ArrowUpRight, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrations — Locus',
}

export default function SourcesPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-4 py-8 md:px-8 md:py-12">
        <header className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Integrations
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Manage data streams and authentication for your workspace.
            </p>
          </div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                placeholder="Search integrations..."
                className="h-9 w-full rounded-full border border-border/60 bg-muted/30 pl-9 pr-4 text-[13px] outline-none transition-all focus:border-citation focus:bg-background focus:ring-4 focus:ring-citation/10"
              />
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-transform hover:scale-105 active:scale-95">
              <Plus className="size-3.5" /> Add
            </button>
          </div>
        </header>

        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-sm backdrop-blur-xl">
          <div className="divide-y divide-border/50">
            {sources.map((s) => (
              <div key={s.id} className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Left: Identity */}
                <div className="flex items-center gap-4">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/50 bg-background shadow-sm">
                    <SourceBadge id={s.id} size="lg" />
                    {s.status === 'attention' && (
                      <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[var(--status-blocker)] text-background ring-2 ring-background">
                        <span className="size-1 rounded-full bg-white" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-foreground">{s.name}</h3>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">
                      {s.itemCount.toLocaleString()} items · Last sync {s.lastSync}
                    </p>
                  </div>
                </div>

                {/* Right: Status & Actions */}
                <div className="flex items-center gap-6 sm:ml-auto">
                  {/* Status Indicator */}
                  <div className="hidden items-center gap-2 sm:flex">
                    <Activity className={cn("size-4", 
                      s.status === 'connected' ? 'text-[var(--status-open)]' :
                      s.status === 'syncing' ? 'text-[var(--status-decision)] animate-pulse' :
                      'text-[var(--status-blocker)]'
                    )} />
                    <span className={cn("font-mono text-[11px] font-medium uppercase tracking-wider",
                      s.status === 'connected' ? 'text-[var(--status-open)]' :
                      s.status === 'syncing' ? 'text-[var(--status-decision)]' :
                      'text-[var(--status-blocker)]'
                    )}>
                      {s.status === 'attention' ? 'Auth Expired' : s.status}
                    </span>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center gap-3">
                    <button className={cn("relative h-6 w-10 rounded-full transition-colors duration-300", 
                      s.status !== 'attention' ? 'bg-foreground' : 'bg-muted-foreground/30'
                    )}>
                      <span className={cn("absolute top-1 size-4 rounded-full bg-background transition-all duration-300", 
                        s.status !== 'attention' ? 'left-5' : 'left-1'
                      )} />
                    </button>
                    <button className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-border/60 hover:text-foreground">
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  )
}
