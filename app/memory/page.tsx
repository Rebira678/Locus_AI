import type { Metadata } from 'next'
import { AppShell } from '@/components/app/app-shell'
import { MemoryExplorer } from '@/components/app/memory-explorer'

export const metadata: Metadata = {
  title: 'Memory Explorer — Locus',
  description: 'Search and filter every captured decision, action, and blocker — each traceable to its source.',
}

export default function MemoryPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6 md:py-8">
        <header className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Meridian · Team memory
          </p>
          <h1 className="mt-1 text-[1.8rem] font-semibold tracking-[-0.02em] text-foreground text-balance">
            Memory Explorer
          </h1>
          <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            Every decision, action item, and blocker captured across your tools. Filter, search, and
            open any item to see the exact source it came from.
          </p>
        </header>

        <MemoryExplorer />
      </main>
    </AppShell>
  )
}
