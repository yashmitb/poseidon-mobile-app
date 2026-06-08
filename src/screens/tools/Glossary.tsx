import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronDown, Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { glossary } from '@/data/content'

export function Glossary({ onBack }: { onBack: () => void }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const query = q.trim().toLowerCase()

  const sorted = useMemo(
    () => [...glossary].sort((a, b) => a.term.localeCompare(b.term)),
    [],
  )
  const filtered = useMemo(
    () =>
      query
        ? sorted.filter(
            (t) =>
              t.term.toLowerCase().includes(query) ||
              t.definition.toLowerCase().includes(query),
          )
        : sorted,
    [sorted, query],
  )

  return (
    <div className="min-h-full bg-bg">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-bg/95 px-3 py-3 backdrop-blur pt-safe">
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.88 }}
          className="p-1 text-muted active:text-text"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <h1 className="font-semibold text-text">Glossary</h1>
      </header>

      <div className="px-4 pb-28 pt-4">
        {/* Search bar with gold focus ring */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 340, damping: 28 } }}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 transition-colors duration-200 focus-within:border-gold/40"
        >
          <Search size={18} className="shrink-0 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms…"
            className="w-full bg-transparent text-[15px] text-text outline-none placeholder:text-muted"
          />
          <AnimatePresence>
            {q && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.12 }}
                onClick={() => setQ('')}
                aria-label="Clear"
              >
                <X size={16} className="text-muted" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.18 } }}
          className="mt-4 text-xs text-muted"
        >
          {filtered.length} of {glossary.length} terms
        </motion.p>

        {/* Terms list fades in as a whole */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28, delay: 0.08 } }}
          className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface"
        >
          {filtered.map((t) => {
            const isOpen = open === t.term
            return (
              <div key={t.term}>
                <motion.button
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setOpen(isOpen ? null : t.term)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-surface-2"
                >
                  <span className="font-medium text-text">{t.term}</span>
                  {/* Chevron rotates via CSS since it's a simple class toggle */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    <ChevronDown size={18} className="shrink-0 text-muted" />
                  </motion.span>
                </motion.button>

                {/* Accordion panel: height 0 → auto via Framer Motion.
                    overflow-hidden clips the content during the animation. */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { type: 'spring', stiffness: 300, damping: 30 },
                          opacity: { duration: 0.18 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { type: 'spring', stiffness: 300, damping: 30 },
                          opacity: { duration: 0.12 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-sm leading-relaxed text-muted">{t.definition}</p>
                        <span className="mt-2 inline-block rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                          {t.category}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
