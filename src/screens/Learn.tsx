import { ChevronRight } from 'lucide-react'
import { categories, lessons } from '@/data/content'
import { Icon } from '@/components/Icon'
import { useNav } from '@/context/NavContext'

export function Learn() {
  const { openCategory } = useNav()

  return (
    <div className="px-4 pb-28 pt-safe">
      <header className="pt-5">
        <h1 className="text-2xl font-bold text-text">Learn</h1>
        <p className="mt-1 text-sm text-muted">
          {lessons.length} lessons across {categories.length} topics.
        </p>
      </header>

      <div className="mt-5 space-y-3">
        {categories.map((c) => {
          const count = lessons.filter((l) => l.categoryId === c.id).length
          return (
            <button
              key={c.id}
              onClick={() => openCategory(c.id)}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left active:bg-surface-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-dim">
                <Icon name={c.icon} size={20} className="text-gold" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-text">{c.name}</span>
                <span className="block text-sm text-muted">{c.blurb}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                {count}
                <ChevronRight size={16} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
