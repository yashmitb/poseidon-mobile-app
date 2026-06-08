import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronDown, Search, X } from 'lucide-react'
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
        <button onClick={onBack} className="p-1 text-muted active:text-text">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-text">Glossary</h1>
      </header>

      <div className="px-4 pb-28 pt-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5">
          <Search size={18} className="shrink-0 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms…"
            className="w-full bg-transparent text-[15px] text-text outline-none placeholder:text-muted"
          />
          {q && (
            <button onClick={() => setQ('')} aria-label="Clear">
              <X size={16} className="text-muted" />
            </button>
          )}
        </div>

        <p className="mt-4 text-xs text-muted">
          {filtered.length} of {glossary.length} terms
        </p>

        <div className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {filtered.map((t) => {
            const isOpen = open === t.term
            return (
              <div key={t.term}>
                <button
                  onClick={() => setOpen(isOpen ? null : t.term)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-surface-2"
                >
                  <span className="font-medium text-text">{t.term}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-sm leading-relaxed text-muted">
                      {t.definition}
                    </p>
                    <span className="mt-2 inline-block rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                      {t.category}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
