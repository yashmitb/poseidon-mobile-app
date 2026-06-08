import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { categories, lessons } from '@/data/content'
import { Icon } from '@/components/Icon'
import { LessonCard } from '@/components/LessonCard'
import { useNav } from '@/context/NavContext'

export function CategoryDetail({ id }: { id: string }) {
  const { back } = useNav()
  const category = categories.find((c) => c.id === id)
  const items = lessons.filter((l) => l.categoryId === id)

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-full bg-bg"
    >
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-bg/95 px-3 py-3 backdrop-blur pt-safe">
        <button onClick={back} className="p-1 text-muted active:text-text">
          <ArrowLeft size={20} />
        </button>
        {category && (
          <div className="flex items-center gap-2">
            <Icon name={category.icon} size={18} className="text-gold" />
            <h1 className="font-semibold text-text">{category.name}</h1>
          </div>
        )}
      </header>

      <div className="space-y-3 px-4 pb-28 pt-4">
        {category && <p className="text-sm text-muted">{category.blurb}</p>}
        {items.map((l) => (
          <LessonCard key={l.id} lesson={l} />
        ))}
      </div>
    </motion.div>
  )
}
