import { Bookmark } from 'lucide-react'
import { lessons } from '@/data/content'
import { LessonCard } from '@/components/LessonCard'
import { useSaved } from '@/context/SavedContext'
import { useNav } from '@/context/NavContext'

export function Saved() {
  const { saved } = useSaved()
  const { setTab } = useNav()
  // Preserve save order (most recent first), drop any stale IDs.
  const items = saved
    .map((id) => lessons.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))

  return (
    <div className="px-4 pb-28 pt-safe">
      <header className="pt-5">
        <h1 className="text-2xl font-bold text-text">Saved</h1>
        <p className="mt-1 text-sm text-muted">
          {items.length === 0
            ? 'Bookmark lessons to read them later.'
            : `${items.length} saved lesson${items.length === 1 ? '' : 's'}.`}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface">
            <Bookmark size={24} className="text-muted" />
          </span>
          <p className="mt-4 text-sm text-muted">Nothing saved yet.</p>
          <button
            onClick={() => setTab('learn')}
            className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-bg active:opacity-90"
          >
            Browse lessons
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {items.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      )}
    </div>
  )
}
