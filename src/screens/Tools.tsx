import { useState } from 'react'
import { BookA, ChevronRight, ListChecks } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { Glossary } from './tools/Glossary'
import { ReleaseChecklist } from './tools/ReleaseChecklist'

type ToolId = 'glossary' | 'checklist' | null

const TOOLS: {
  id: Exclude<ToolId, null>
  name: string
  blurb: string
  icon: React.ComponentType<LucideProps>
}[] = [
  {
    id: 'checklist',
    name: 'Release Checklist',
    blurb: 'An 8-week prep list you can tick off as you go.',
    icon: ListChecks,
  },
  {
    id: 'glossary',
    name: 'Glossary',
    blurb: 'Plain-English definitions for music business terms.',
    icon: BookA,
  },
]

export function Tools() {
  const [active, setActive] = useState<ToolId>(null)

  if (active === 'glossary') return <Glossary onBack={() => setActive(null)} />
  if (active === 'checklist')
    return <ReleaseChecklist onBack={() => setActive(null)} />

  return (
    <div className="px-4 pb-28 pt-safe">
      <header className="pt-5">
        <h1 className="text-2xl font-bold text-text">Tools</h1>
        <p className="mt-1 text-sm text-muted">
          Interactive helpers for getting your music out.
        </p>
      </header>

      <div className="mt-5 space-y-3">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left active:bg-surface-2"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-dim">
              <t.icon size={20} className="text-gold" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-text">{t.name}</span>
              <span className="block text-sm text-muted">{t.blurb}</span>
            </span>
            <ChevronRight size={18} className="shrink-0 text-muted" />
          </button>
        ))}
      </div>
    </div>
  )
}
