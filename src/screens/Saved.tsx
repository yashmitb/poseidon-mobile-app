import { Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { LessonCard } from '@/components/LessonCard'
import { useContent } from '@/context/ContentContext'
import { useSaved } from '@/context/SavedContext'
import { useNav } from '@/context/NavContext'
import { screenStagger, fadeUp, scaleIn } from '@/lib/animations'

export function Saved() {
  const { saved } = useSaved()
  const { setTab } = useNav()
  const { lessons } = useContent()
  const items = saved
    .map((id) => lessons.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))

  return (
    <motion.div
      className="px-4 pb-28 pt-safe"
      variants={screenStagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={fadeUp} className="pt-5">
        <h1 className="text-2xl font-bold text-text">Saved</h1>
        <p className="mt-1 text-sm text-muted">
          {items.length === 0
            ? 'Bookmark lessons to read them later.'
            : `${items.length} saved lesson${items.length === 1 ? '' : 's'}.`}
        </p>
      </motion.header>

      {items.length === 0 ? (
        // Empty state: icon scales in, then text + button fade up
        <motion.div
          className="mt-16 flex flex-col items-center text-center"
          variants={screenStagger}
        >
          <motion.span
            variants={scaleIn}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface"
          >
            <Bookmark size={24} className="text-muted" />
          </motion.span>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-muted">
            Nothing saved yet.
          </motion.p>
          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab('learn')}
            className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-bg active:opacity-90"
          >
            Browse lessons
          </motion.button>
        </motion.div>
      ) : (
        <div className="mt-5 space-y-3">
          {items.map((l) => (
            <motion.div key={l.id} variants={fadeUp}>
              <LessonCard lesson={l} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
