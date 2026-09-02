import { memory, sources } from '@/lib/mock-data'

const totalItems = sources.reduce((n, s) => n + s.itemCount, 0)

const stats = [
  { value: totalItems.toLocaleString(), label: 'Items captured', sub: 'across 8 sources' },
  { value: String(memory.filter((m) => m.type === 'decision').length * 47), label: 'Decisions tracked', sub: 'with full provenance' },
  { value: '100%', label: 'Answers cited', sub: 'zero uncited claims' },
  { value: '3.2s', label: 'Median time to answer', sub: 'vs. ~15 min of digging' },
]

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-2 shadow-sm lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg bg-muted/30 px-4 py-4 transition-colors hover:bg-muted/50">
          <p className="font-mono text-2xl tabular-nums tracking-tight text-foreground">{s.value}</p>
          <p className="mt-1 text-[12.5px] font-medium text-card-foreground">{s.label}</p>
          <p className="font-mono text-[10.5px] text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </div>
  )
}
