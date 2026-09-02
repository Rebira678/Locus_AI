import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ['How it works', '#how'],
              ['Citations', '#citations'],
              ['Sources', '#sources'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden h-4 w-px bg-border sm:block" />
          <Link
            href="/dashboard"
            className="hidden rounded-full px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground sm:block"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  )
}
