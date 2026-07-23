import { useState } from 'react'
import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import { LessonCard } from '@/components/LessonCard'
import { useContent } from '@/context/ContentContext'
import { useNav } from '@/context/NavContext'
import { screenStagger, fadeUp } from '@/lib/animations'
import type { QAItem } from '@/data/content'

function QASection({ items }: { items: QAItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null)
  return (
    <motion.div variants={fadeUp} className="pt-4">
      <div className="mb-3 flex items-center gap-2">
        <HelpCircle size={16} className="text-gold" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Questions & Answers
        </h2>
      </div>
      <div className="space-y-2">
        {items.map((qaItem) => {
          const open = openId === qaItem.id
          return (
            <div
              key={qaItem.id}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <button
                onClick={() => setOpenId(open ? null : qaItem.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-surface-2"
              >
                <span className="flex-1 text-sm font-medium text-text">{qaItem.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{qaItem.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function CategoryDetail({ id }: { id: string }) {
  const { back } = useNav()
  const { categories, lessons, qa } = useContent()
  const category = categories.find((c) => c.id === id)
  const items = lessons.filter((l) => l.categoryId === id)
  const qaItems = qa.filter((q) => q.categoryId === id)

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
        {qaItems.length > 0 && <QASection items={qaItems} />}
      </motion.div>
    </motion.div>
  )
}
