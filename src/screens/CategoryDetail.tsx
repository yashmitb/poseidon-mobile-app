import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { categories, lessons } from '@/data/content'
import { Icon } from '@/components/Icon'
import { LessonCard } from '@/components/LessonCard'
import { useNav } from '@/context/NavContext'
import { screenStagger, fadeUp } from '@/lib/animations'

export function CategoryDetail({ id }: { id: string }) {
  const { back } = useNav()
  const category = categories.find((c) => c.id === id)
  const items = lessons.filter((l) => l.categoryId === id)

  return (
    // Same push animation as LessonDetail for consistent navigation feel
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 380, damping: 32 },
      }}
      exit={{
        opacity: 0,
        x: 32,
        transition: { duration: 0.15, ease: 'easeIn' },
      }}
      className="min-h-dvh bg-bg"
    >
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-bg/95 px-3 py-3 backdrop-blur pt-safe">
        <motion.button
          onClick={back}
          whileTap={{ scale: 0.88 }}
          className="p-1 text-muted active:text-text"
        >
          <ArrowLeft size={20} />
        </motion.button>
        {category && (
          <div className="flex items-center gap-2">
            <Icon name={category.icon} size={18} className="text-gold" />
            <h1 className="font-semibold text-text">{category.name}</h1>
          </div>
        )}
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
