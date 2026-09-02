import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, href = '/' }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="Locus AI home"
    >
      <span className="relative inline-flex size-6 items-center justify-center overflow-hidden rounded-md">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
          {/* Blue Background */}
          <rect width="100" height="100" fill="#3B38D6" />
          
          <g transform="translate(50, 53)">
            {/* White Triangles */}
            <polygon points="0,-12 -28,-42 28,-42" fill="#ffffff" />
            <polygon points="0,-12 -28,-42 28,-42" fill="#ffffff" transform="rotate(120)" />
            <polygon points="0,-12 -28,-42 28,-42" fill="#ffffff" transform="rotate(240)" />
            
            {/* Center Green Triangle */}
            <polygon points="0,-12 10.39,6 -10.39,6" fill="#A2E022" />
          </g>
        </svg>
      </span>
      <span className="text-[16px] font-semibold tracking-tight">
        <span className="text-black dark:text-white">Locus</span>
        <span className="text-[#3B38D6] ml-1">AI</span>
      </span>
    </Link>
  )
}
