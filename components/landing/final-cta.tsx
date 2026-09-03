import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-b border-border py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-citation/5 blur-[120px]" />
      
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-[2rem] border border-white/10 bg-card/40 px-6 py-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-12 sm:py-24">
          <h2 className="mb-6 text-balance text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.8rem]">
            Stop asking “didn’t we <span className="inline-block bg-gradient-to-r from-citation to-citation/70 bg-clip-text text-transparent">decide this already?</span>”
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-muted-foreground">
            Connect your first tool in under two minutes. Locus starts building your team’s cited memory from the conversations you’ve already had. No manual data entry required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: 'lg' }), 'group h-12 rounded-full bg-citation px-8 text-[15px] font-medium text-white shadow-[0_0_24px_rgba(124,116,237,0.4)] hover:bg-citation/90 hover:shadow-[0_0_32px_rgba(124,116,237,0.6)] transition-all')}
            >
              Connect your tools
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/memory"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-12 rounded-full border-white/10 bg-background/50 px-8 text-[15px] backdrop-blur-md hover:bg-white/5 transition-all',
              )}
            >
              Explore a live memory
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="dark relative overflow-hidden bg-[#030406] border-t border-white/5">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="col-span-1 flex flex-col gap-5 md:col-span-2">
            <Logo />
            <p className="max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Organizational memory, cited. A fictional product built for demonstration to show high-end SaaS design patterns.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-foreground">Product</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/dashboard" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
              <Link href="/memory" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Memory Explorer</Link>
              <Link href="#how" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">How it works</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-foreground">Legal</h4>
            <nav className="flex flex-col gap-3">
              <Link href="#" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="text-[14px] text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Locus AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><span className="sr-only">Twitter</span><svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"><span className="sr-only">GitHub</span><svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
