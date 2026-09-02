'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('locus-theme')
    const isDark = stored ? stored === 'dark' : true
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('locus-theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground',
        className,
      )}
    >
      <Sun className="absolute size-[1.1rem] transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0 scale-100 rotate-0 opacity-100" />
      <Moon className="absolute size-[1.1rem] transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100 scale-90 rotate-90 opacity-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
