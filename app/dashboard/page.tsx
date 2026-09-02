import type { Metadata } from 'next'
import { AppShell } from '@/components/app/app-shell'
import { AskPanel } from '@/components/app/ask-panel'
import { RecentFeed } from '@/components/app/recent-feed'
import { SourcesPanel } from '@/components/app/sources-panel'
import { StatsStrip } from '@/components/app/stats-strip'

export const metadata: Metadata = {
  title: 'Dashboard — Locus',
  description: 'Ask your team’s memory anything and get a cited answer.',
}

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="w-full flex-1 px-4 py-6 md:px-10 md:py-8">
        <header className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Good morning, Priya
          </p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight text-foreground text-balance">
            What does the team already know?
          </h1>
        </header>

        <div className="mb-6">
          <AskPanel />
        </div>

        <div className="mb-6">
          <StatsStrip />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 h-full">
            <RecentFeed />
          </div>
          <div className="lg:col-span-2 h-full">
            <SourcesPanel />
          </div>
        </div>
      </main>
    </AppShell>
  )
}
