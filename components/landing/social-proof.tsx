import { Avatar } from '@/components/primitives'

const quotes = [
  {
    quote:
      'Onboarding used to mean re-litigating every decision for the new hire. Now they just ask Locus and read the actual thread it came from.',
    name: 'Priya Nair',
    role: 'CTO, Meridian',
    initials: 'PN',
  },
  {
    quote:
      'The reversal history is the killer feature. “We decided X, then changed to Y because Z” — with receipts. That context used to evaporate.',
    name: 'Marcus Feld',
    role: 'Staff Engineer',
    initials: 'MF',
  },
  {
    quote:
      'I trust it because I can click through to the source every time. It’s the first internal AI tool that doesn’t make me double-check its work.',
    name: 'Dana Okafor',
    role: 'Founding Engineer',
    initials: 'DO',
  },
]

const metrics = [
  { value: '2,400+', label: 'threads no one has to scroll through' },
  { value: '1.4s', label: 'median time to a cited answer' },
  { value: '6', label: 'tools read, zero migrated' },
]

export function SocialProof() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background py-24 md:py-32">
      {/* Deep ambient radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1200px] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(ellipse_at_center,rgba(91,82,232,0.15),transparent_70%)]" />
      
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        
        {/* Testimonials - Staggered Layout */}
        <div className="grid gap-8 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={q.name}
              className={`group relative flex flex-col p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 ${
                i === 1 ? 'md:mt-16' : '' // Stagger the middle quote down
              }`}
            >
              {/* Soft, non-square bounding effect that reveals on hover */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/0 bg-gradient-to-b from-card/30 to-transparent transition-all duration-500 group-hover:border-citation/20 group-hover:bg-citation/5 group-hover:shadow-[0_8px_40px_-12px_rgba(91,82,232,0.15)]" />
              
              {/* Massive watermark quote icon */}
              <div className="absolute -left-2 -top-6 -z-10 select-none font-serif text-[10rem] leading-none text-citation/[0.03] transition-colors duration-500 group-hover:text-citation/10">
                “
              </div>

              <blockquote className="relative z-10 text-[1.15rem] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                {q.quote}
              </blockquote>
              
              <figcaption className="relative z-10 mt-auto pt-8 flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-citation/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Avatar initials={q.initials} name={q.name} className="relative size-12 shadow-md ring-1 ring-border group-hover:ring-citation/50" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-foreground tracking-tight">{q.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-citation">{q.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Metrics - Massive Glowing Pill */}
        <div className="mt-32 relative mx-auto max-w-5xl">
          {/* Glowing backlight */}
          <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-citation/0 via-citation/10 to-citation/0 blur-2xl" />
          
          <div className="relative flex flex-col items-center justify-between gap-12 rounded-[2.5rem] border border-white/10 bg-card/60 px-8 py-14 shadow-lg backdrop-blur-xl sm:flex-row sm:rounded-full sm:px-20">
            {metrics.map((m, i) => (
              <div key={m.label} className="relative flex flex-col items-center text-center w-full">
                <div className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-[3rem] sm:text-[3.5rem] font-bold tracking-tighter text-transparent">
                  {m.value}
                </div>
                <div className="mt-2 max-w-[150px] text-[13px] leading-relaxed text-muted-foreground">{m.label}</div>
                {/* Subtle vertical dividers between metrics */}
                {i < metrics.length - 1 && (
                  <div className="absolute -right-6 sm:-right-10 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
