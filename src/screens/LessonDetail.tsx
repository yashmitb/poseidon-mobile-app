import { ArrowLeft, Bookmark, Clock, ExternalLink } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Blocks } from '@/components/Blocks'
import { useContent } from '@/context/ContentContext'
import { useNav } from '@/context/NavContext'
import { useSaved } from '@/context/SavedContext'

export function LessonDetail({ id }: { id: string }) {
  const { back } = useNav()
  const { isSaved, toggle } = useSaved()
  const { lessons, categories } = useContent()
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) {
    return (
      <div className="p-6">
        <button onClick={back} className="text-gold">Back</button>
        <p className="mt-4 text-muted">Lesson not found.</p>
      </div>
    )
  }

  const category = categories.find((c) => c.id === lesson.categoryId)
  const saved = isSaved(lesson.id)

  return (
    // iOS-style push: a fully opaque panel slides in from the right over the
    // outgoing screen (no opacity fade — that caused a black flash in the
    // header). The cubic-bezier mirrors the iOS navigation ease.
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0, transition: { duration: 0.34, ease: [0.32, 0.72, 0, 1] } }}
      exit={{ x: '100%', transition: { duration: 0.26, ease: [0.32, 0.72, 0, 1] } }}
      className="min-h-dvh bg-bg"
    >
      <header className="sticky top-0 z-20 pt-safe">
        {/* Soft scrim: content fades out under the floating bar instead of
            hitting a hard edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+1.75rem)] bg-gradient-to-b from-bg via-bg/85 to-transparent"
        />
        {/* Floating liquid-glass bar — matches the bottom nav material. */}
        <div className="glass relative mx-3 my-2 flex items-center justify-between rounded-full border border-white/10 px-2.5 py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
          <motion.button
            onClick={back}
            whileTap={{ scale: 0.86 }}
            className="rounded-full p-1.5 text-muted active:bg-white/10 active:text-text"
          >
            <ArrowLeft size={20} />
          </motion.button>

          {/* Bookmark in the detail header also gets the spring pop */}
          <motion.button
            onClick={() => toggle(lesson.id)}
            whileTap={{ scale: 0.75 }}
            aria-label={saved ? 'Remove bookmark' : 'Save lesson'}
            className="rounded-full p-1.5 active:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={saved ? 'saved' : 'unsaved'}
                initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 560, damping: 22 }}
              >
                <Bookmark size={20} className={saved ? 'fill-gold text-gold' : 'text-muted'} />
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      <article className="px-5 pb-28 pt-4">
        {category && (
          <p className="text-xs font-medium uppercase tracking-wide text-gold">
            {category.name}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-bold leading-tight text-text">{lesson.title}</h1>

        {/* Description / summary — the lead line, shown for every lesson. */}
        {lesson.summary && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{lesson.summary}</p>
        )}

        {/* Read-time + level only make sense for written lessons, not link-out
            resources — hide them when this is an external resource. */}
        {!lesson.link && (
          <div className="mt-3 flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock size={13} /> {lesson.readMins} min read
            </span>
            <span className="rounded-full border border-border px-2 py-0.5">
              {lesson.level}
            </span>
          </div>
        )}

        {/* External resource — a prominent tap target that opens the link. */}
        {lesson.link && (
          <motion.a
            href={lesson.link}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-soft to-gold px-4 py-3.5 text-sm font-semibold text-bg shadow-[0_8px_24px_-8px_rgba(201,169,78,0.6)]"
          >
            Open resource <ExternalLink size={16} />
          </motion.a>
        )}

        {/* Blocks handles its own internal stagger */}
        <div className="mt-6">
          <Blocks blocks={lesson.body} />
        </div>
      </article>
    </motion.div>
  )
}
