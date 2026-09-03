'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Library, Plug, Settings, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar } from '@/components/primitives'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Memory', href: '/memory', icon: Library },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-svh bg-background">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-svh w-56 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
        <div className="flex h-14 items-center border-b border-border px-4">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          <span className="px-2 pb-2 pt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Workspace
          </span>
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] transition-colors',
                  active
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}

          <span className="px-2 pb-2 pt-5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Meridian
          </span>
          <Link href="/sources" className="group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-[13.5px] font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
            <div className="flex items-center gap-2.5">
              <Plug className="size-4 transition-transform group-hover:rotate-12 group-hover:text-foreground" />
              Sources
            </div>
            <div className="flex items-center justify-center rounded-full bg-[var(--status-blocker)]/15 px-1.5 py-0.5 text-[9px] font-bold text-[var(--status-blocker)]">
              1 ISSUE
            </div>
          </Link>
          <Link href="/settings" className="group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-[13.5px] font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
            <div className="flex items-center gap-2.5">
              <Settings className="size-4 transition-transform duration-500 group-hover:rotate-90 group-hover:text-foreground" />
              Settings
            </div>
            <div className="flex items-center rounded border border-border/60 bg-background/50 px-1.5 py-0.5 font-mono text-[9px] font-medium text-muted-foreground opacity-60 shadow-sm transition-opacity group-hover:opacity-100">
              ⌘,
            </div>
          </Link>
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
            <Avatar initials="PN" name="Priya Nair" />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[12.5px] font-medium text-foreground">Priya Nair</span>
              <span className="truncate font-mono text-[10px] text-muted-foreground">
                priya@meridian.dev
              </span>
            </span>
          </div>
        </div>
      </aside>

      {/* main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:hidden">
          <Logo />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </header>

        {/* mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-14 z-20 flex flex-col bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px]', pathname === '/dashboard' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground')}
              >
                <LayoutDashboard className="size-4" /> Dashboard
              </Link>
              <Link
                href="/memory"
                onClick={() => setMobileMenuOpen(false)}
                className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px]', pathname === '/memory' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground')}
              >
                <Library className="size-4" /> Memory
              </Link>
              <div className="my-2 h-px bg-border" />
              <Link
                href="/sources"
                onClick={() => setMobileMenuOpen(false)}
                className={cn('flex items-center justify-between rounded-md px-3 py-2.5 text-[14px]', pathname === '/sources' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground')}
              >
                <div className="flex items-center gap-3">
                  <Plug className="size-4" /> Sources
                </div>
                <div className="flex items-center justify-center rounded-full bg-[var(--status-blocker)]/15 px-1.5 py-0.5 text-[9px] font-bold text-[var(--status-blocker)]">
                  1 ISSUE
                </div>
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px]', pathname === '/settings' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground')}
              >
                <Settings className="size-4" /> Settings
              </Link>
            </nav>
            <div className="mt-auto border-t border-border pt-4">
              <div className="flex items-center gap-3 px-2">
                <Avatar initials="PN" name="Priya Nair" />
                <span className="flex flex-col">
                  <span className="text-[13px] font-medium text-foreground">Priya Nair</span>
                  <span className="font-mono text-[11px] text-muted-foreground">priya@meridian.dev</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* desktop header actions */}
        <div className="hidden items-center gap-2 border-b border-border px-6 py-2.5 md:flex">
          <span className="font-mono text-[11px] text-muted-foreground">meridian.dev</span>
          <span className="ml-auto">
            <ThemeToggle />
          </span>
        </div>

        {children}
      </div>
    </div>
  )
}
