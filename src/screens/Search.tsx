import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon, X } from 'lucide-react'
import { LessonCard } from '@/components/LessonCard'
import { useContent } from '@/context/ContentContext'
import { screenStagger, fadeUp } from '@/lib/animations'

export function Search() {
  const [q, setQ] = useState('')
  const { glossary, lessons } = useContent()
  const query = q.trim().toLowerCase()

  const lessonHits = useMemo(() => {
    if (!query) return []
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(query) ||
        l.summary.toLowerCase().includes(query),
    )
  }, [query, lessons])

  const termHits = useMemo(() => {
    if (!query) return []
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query),
    )
  }, [query, glossary])

  const empty = query && lessonHits.length === 0 && termHits.length === 0

  return (
    <motion.div
      className="px-4 pb-28 pt-safe"
      variants={screenStagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={fadeUp} className="pt-5">
        <h1 className="text-2xl font-bold text-text">Search</h1>
      </motion.header>

      {/* Search bar — gold border glow on focus via focus-within */}
      <motion.div
        variants={fadeUp}
        className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 transition-colors duration-200 focus-within:border-gold/40"
      >
        <SearchIcon size={18} className="shrink-0 text-muted" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Lessons, terms, topics…"
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
              className="p-0.5"
            >
              <X size={16} className="text-muted" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hint text — only when idle */}
      <AnimatePresence>
        {!query && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="mt-8 text-center text-sm text-muted"
          >
            Search across every lesson and the glossary.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {empty && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-8 text-center text-sm text-muted"
          >
            No results for &ldquo;{q}&rdquo;.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Lesson results — fade in as a section when first appearing */}
      <AnimatePresence>
        {lessonHits.length > 0 && (
          <motion.section
            key="lessons"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="mt-6"
          >
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
              Lessons
            </h2>
            <div className="space-y-3">
              {lessonHits.map((l) => (
                <LessonCard key={l.id} lesson={l} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Glossary results */}
      <AnimatePresence>
        {termHits.length > 0 && (
          <motion.section
            key="terms"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="mt-6"
          >
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
              Glossary
            </h2>
            <div className="space-y-2">
              {termHits.map((t) => (
                <motion.div
                  key={t.term}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border border-border bg-surface p-3.5"
                >
                  <p className="font-semibold text-text">{t.term}</p>
                  <p className="mt-1 text-sm text-muted">{t.definition}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
