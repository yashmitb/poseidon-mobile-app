import { Bookmark, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Lesson } from '@/data/content'
import { useNav } from '@/context/NavContext'
import { useSaved } from '@/context/SavedContext'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { openLesson } = useNav()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(lesson.id)

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => openLesson(lesson.id)}
      className="w-full text-left rounded-2xl border border-border bg-surface p-4 active:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-text leading-snug">{lesson.title}</h3>
          <p className="mt-1 text-sm text-muted line-clamp-2">{lesson.summary}</p>
        </div>
        <span
          role="button"
          aria-label={saved ? 'Remove bookmark' : 'Save lesson'}
          onClick={(e) => {
            e.stopPropagation()
            toggle(lesson.id)
          }}
          className="shrink-0 -m-1 p-1"
        >
          <Bookmark
            size={20}
            className={saved ? 'fill-gold text-gold' : 'text-muted'}
          />
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <Clock size={13} /> {lesson.readMins} min
        </span>
        <span className="rounded-full border border-border px-2 py-0.5">
          {lesson.level}
        </span>
      </div>
    </motion.button>
  )
}
