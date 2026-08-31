import { Bookmark, Clock, ExternalLink } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Lesson } from '@/data/content'
import { useNav } from '@/context/NavContext'
import { useSaved } from '@/context/SavedContext'
import { springs } from '@/lib/animations'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { openLesson } = useNav()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(lesson.id)

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={springs.bouncy}
      onClick={() => openLesson(lesson.id)}
      className="w-full text-left rounded-2xl border border-border bg-surface p-4 active:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-text leading-snug">{lesson.title}</h3>
          <p className="mt-1 text-sm text-muted line-clamp-2">{lesson.summary}</p>
        </div>

        {/* Bookmark toggles with a spring pop. key-swap forces AnimatePresence
            to treat saved/unsaved as distinct elements, giving a fresh spring
            each time the state flips. */}
        <motion.span
          role="button"
          aria-label={saved ? 'Remove bookmark' : 'Save lesson'}
          onClick={(e) => { e.stopPropagation(); toggle(lesson.id) }}
          whileTap={{ scale: 0.65 }}
          className="shrink-0 -m-1 p-1"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={saved ? 'saved' : 'unsaved'}
              initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 560, damping: 22 }}
            >
              <Bookmark
                size={20}
                className={saved ? 'fill-gold text-gold' : 'text-muted'}
              />
            </motion.div>
          </AnimatePresence>
        </motion.span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        {lesson.link ? (
          <span className="flex items-center gap-1 text-gold">
            <ExternalLink size={13} /> Resource
          </span>
        ) : (
          <>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {lesson.readMins} min
            </span>
            <span className="rounded-full border border-border px-2 py-0.5">
              {lesson.level}
            </span>
          </>
        )}
      </div>
    </motion.button>
  )
}
