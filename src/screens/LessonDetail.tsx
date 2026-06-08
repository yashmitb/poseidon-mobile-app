import { ArrowLeft, Bookmark, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { lessons, categories } from '@/data/content'
import { Blocks } from '@/components/Blocks'
import { useNav } from '@/context/NavContext'
import { useSaved } from '@/context/SavedContext'

export function LessonDetail({ id }: { id: string }) {
  const { back } = useNav()
  const { isSaved, toggle } = useSaved()
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) {
    return (
      <div className="p-6">
        <button onClick={back} className="text-gold">
          Back
        </button>
        <p className="mt-4 text-muted">Lesson not found.</p>
      </div>
    )
  }

  const category = categories.find((c) => c.id === lesson.categoryId)
  const saved = isSaved(lesson.id)

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-full bg-bg"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg/95 px-3 py-3 backdrop-blur pt-safe">
        <button
          onClick={back}
          className="flex items-center gap-1 text-sm text-muted active:text-text"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => toggle(lesson.id)}
          aria-label={saved ? 'Remove bookmark' : 'Save lesson'}
          className="p-1"
        >
          <Bookmark size={20} className={saved ? 'fill-gold text-gold' : 'text-muted'} />
        </button>
      </header>

      <article className="px-5 pb-28 pt-4">
        {category && (
          <p className="text-xs font-medium uppercase tracking-wide text-gold">
            {category.name}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-bold leading-tight text-text">
          {lesson.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {lesson.readMins} min read
          </span>
          <span className="rounded-full border border-border px-2 py-0.5">
            {lesson.level}
          </span>
        </div>

        <div className="mt-6">
          <Blocks blocks={lesson.body} />
        </div>
      </article>
    </motion.div>
  )
}
