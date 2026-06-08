import { useMemo, useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { glossary, lessons } from '@/data/content'
import { LessonCard } from '@/components/LessonCard'

export function Search() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()

  const lessonHits = useMemo(() => {
    if (!query) return []
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(query) ||
        l.summary.toLowerCase().includes(query),
    )
  }, [query])

  const termHits = useMemo(() => {
    if (!query) return []
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query),
    )
  }, [query])

  const empty = query && lessonHits.length === 0 && termHits.length === 0

  return (
    <div className="px-4 pb-28 pt-safe">
      <header className="pt-5">
        <h1 className="text-2xl font-bold text-text">Search</h1>
      </header>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5">
        <SearchIcon size={18} className="shrink-0 text-muted" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Lessons, terms, topics…"
          className="w-full bg-transparent text-[15px] text-text outline-none placeholder:text-muted"
        />
        {q && (
          <button onClick={() => setQ('')} aria-label="Clear" className="p-0.5">
            <X size={16} className="text-muted" />
          </button>
        )}
      </div>

      {!query && (
        <p className="mt-8 text-center text-sm text-muted">
          Search across every lesson and the glossary.
        </p>
      )}

      {empty && (
        <p className="mt-8 text-center text-sm text-muted">
          No results for “{q}”.
        </p>
      )}

      {lessonHits.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
            Lessons
          </h2>
          <div className="space-y-3">
            {lessonHits.map((l) => (
              <LessonCard key={l.id} lesson={l} />
            ))}
          </div>
        </section>
      )}

      {termHits.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
            Glossary
          </h2>
          <div className="space-y-2">
            {termHits.map((t) => (
              <div
                key={t.term}
                className="rounded-xl border border-border bg-surface p-3.5"
              >
                <p className="font-semibold text-text">{t.term}</p>
                <p className="mt-1 text-sm text-muted">{t.definition}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
