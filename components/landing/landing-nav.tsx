'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingNav() {
  const [isOpen, setIsOpen] = useState(false)

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
          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <div className="h-4 w-px bg-border" />
            <Link
              href="/dashboard"
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground"
            >
              Log in
            </Link>
          </div>
          
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden absolute w-full shadow-lg">
          <nav className="flex flex-col px-5 py-4 space-y-4">
            {[
              ['How it works', '#how'],
              ['Citations', '#citations'],
              ['Sources', '#sources'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {label}
              </a>
            ))}
            <div className="h-px w-full bg-border/50" />
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Log in
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
