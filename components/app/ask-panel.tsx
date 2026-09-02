'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CornerDownLeft, Loader2, Search, Sparkle } from 'lucide-react'
import { answers, type CitedAnswer } from '@/lib/mock-data'
import { CitedAnswerBody } from '@/components/cited-answer'
import { cn } from '@/lib/utils'

const keywordMap: { match: string[]; id: string }[] = [
  { match: ['auth', 'clerk', 'better', 'provider', 'login', 'session'], id: 'a-auth' },
  { match: ['price', 'pricing', 'seat', 'usage', 'billing', 'partner'], id: 'a-pricing' },
  { match: ['sso', 'saml', 'v1', 'enterprise', 'scim', 'security'], id: 'a-sso' },
]

function resolve(query: string): CitedAnswer | null {
  const q = query.toLowerCase()
  for (const { match, id } of keywordMap) {
    if (match.some((m) => q.includes(m))) return answers.find((a) => a.id === id)!
  }
  return null
}

export function AskPanel() {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState<CitedAnswer | null>(answers[0])
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const run = (q: string) => {
    if (!q.trim()) return
    setLoading(true)
    setNotFound(false)
    setAnswer(null)
    setTimeout(() => {
      const found = resolve(q)
      setLoading(false)
      if (found) setAnswer(found)
      else setNotFound(true)
    }, 750)
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm transition-all focus-within:border-citation/40 focus-within:ring-1 focus-within:ring-citation/10">
      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          run(query)
        }}
        className="flex items-center gap-3 bg-muted/10 px-5 py-4"
      >
        <Search className="size-4.5 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your team’s memory anything…"
          className="min-w-0 flex-1 bg-transparent text-[15.5px] font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          className="hidden shrink-0 items-center gap-1 rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
        >
          <CornerDownLeft className="size-3" /> ask
        </button>
      </form>

      {/* suggestions */}
      <div className="flex flex-wrap gap-2 bg-muted/10 px-5 pb-4">
        <span className="mr-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <Sparkle className="size-3 text-citation" /> try
        </span>
        {answers.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => {
              setQuery(a.question)
              run(a.question)
            }}
            className="rounded-full border border-border px-2.5 py-1 text-[11.5px] text-muted-foreground transition-colors hover:border-citation/40 hover:bg-citation-soft hover:text-foreground"
          >
            {a.question}
          </button>
        ))}
      </div>

      {/* result */}
      <div className="min-h-[200px] px-5 py-6 md:px-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground"
            >
              <Loader2 className="size-3.5 animate-spin" />
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
                searching 6 connected sources…
              </motion.span>
            </motion.div>
          ) : notFound ? (
            <motion.div
              key="notfound"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md"
            >
              <p className="text-[14px] text-foreground">No cited memory matched that yet.</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Locus only answers when it can point to a real source. Try a question about{' '}
                <button
                  className="text-citation underline-offset-2 hover:underline"
                  onClick={() => {
                    setQuery('auth provider')
                    run('auth provider')
                  }}
                >
                  the auth decision
                </button>
                , pricing, or SSO scope.
              </p>
            </motion.div>
          ) : answer ? (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  answer
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <CitedAnswerBody answer={answer} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
