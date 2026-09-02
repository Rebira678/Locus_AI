import { sources } from '@/lib/mock-data'
import { SourceBadge } from '@/components/primitives'

export function IntegrationStrip() {
  // Triplicate the arrays for a completely seamless infinite scroll
  const row1 = [...sources, ...sources, ...sources]
  // Reverse the second row for variety
  const row2 = [...sources].reverse()
  const infiniteRow2 = [...row2, ...row2, ...row2]

  return (
    <section id="sources" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Inline CSS for the infinite marquee animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 45s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 45s linear infinite;
        }
        .animate-scroll-left:hover, .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="mx-auto max-w-3xl px-5 md:px-8 text-center mb-20 relative z-10">
        <div className="mb-6 inline-flex items-center rounded-full border border-citation/20 bg-citation/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-citation">
          <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-citation" />
          Native Integrations
        </div>
        
        <h2 className="text-balance text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[3rem]">
          Your entire stack, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-citation to-blue-500 bg-clip-text text-transparent">
            instantly unified.
          </span>
        </h2>
        
        <p className="mt-6 max-w-2xl mx-auto text-balance text-[1.1rem] leading-relaxed text-muted-foreground">
          Locus plugs directly into the tools your team already relies on. No manual data entry, no complex configuration.
        </p>
      </div>

      {/* Marquee Tracks with soft linear mask */}
      <div 
        className="relative mx-auto flex max-w-[1500px] flex-col gap-5 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Row 1 - Scrolling Left */}
        <div className="flex w-max animate-scroll-left items-center gap-5 py-2">
          {row1.map((s, idx) => (
            <IntegrationCard key={`r1-${s.id}-${idx}`} source={s} />
          ))}
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="flex w-max animate-scroll-right items-center gap-5 py-2">
          {infiniteRow2.map((s, idx) => (
            <IntegrationCard key={`r2-${s.id}-${idx}`} source={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function IntegrationCard({ source }: { source: typeof sources[0] }) {
  return (
    <div 
      className="group relative flex w-[230px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.12)] cursor-pointer dark:bg-card/40 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] dark:hover:bg-card/80"
    >
      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm transition-transform duration-500 group-hover:scale-110">
        <SourceBadge id={source.id} size="md" className="border-none ring-0 bg-transparent shadow-none" showRing={false} />
      </div>
      <div className="flex flex-col">
        <span className="text-[14.5px] font-semibold tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
          {source.name}
        </span>
        <span className="text-[12.5px] text-muted-foreground/80">
          Native sync
        </span>
      </div>
      
      {/* Physical sheen sweep effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:translate-x-full group-hover:opacity-100" />
    </div>
  )
}
