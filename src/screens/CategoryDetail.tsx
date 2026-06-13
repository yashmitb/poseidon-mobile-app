import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import { LessonCard } from '@/components/LessonCard'
import { useContent } from '@/context/ContentContext'
import { useNav } from '@/context/NavContext'
import { screenStagger, fadeUp } from '@/lib/animations'

export function CategoryDetail({ id }: { id: string }) {
  const { back } = useNav()
  const { categories, lessons } = useContent()
  const category = categories.find((c) => c.id === id)
  const items = lessons.filter((l) => l.categoryId === id)

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
        <div className="glass relative mx-3 my-2 flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
          <motion.button
            onClick={back}
            whileTap={{ scale: 0.86 }}
            className="rounded-full p-1.5 text-muted active:bg-white/10 active:text-text"
          >
            <ArrowLeft size={20} />
          </motion.button>
          {category && (
            <div className="flex items-center gap-2">
              <Icon name={category.icon} size={18} className="text-gold" />
              <h1 className="font-semibold text-text">{category.name}</h1>
            </div>
          )}
        </div>
      </header>

      {/* Lesson list staggers in after the push animation settles */}
      <motion.div
        className="space-y-3 px-4 pb-28 pt-4"
        variants={screenStagger}
        initial="hidden"
        animate="visible"
      >
        {category && (
          <motion.p variants={fadeUp} className="text-sm text-muted">
            {category.blurb}
          </motion.p>
        )}
        {items.map((l) => (
          <motion.div key={l.id} variants={fadeUp}>
            <LessonCard lesson={l} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
