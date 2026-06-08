import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { categories, lessons } from '@/data/content'
import { Icon } from '@/components/Icon'
import { LessonCard } from '@/components/LessonCard'
import { useNav } from '@/context/NavContext'

const FEATURED_ID = 'release-timeline'

export function Home() {
  const { openLesson, openCategory, setTab } = useNav()
  const featured = lessons.find((l) => l.id === FEATURED_ID) ?? lessons[0]
  const fresh = lessons.filter((l) => l.id !== featured.id).slice(0, 3)

  return (
    <div className="px-4 pb-28 pt-safe">
      <header className="pt-5">
        <p className="text-sm text-muted">Poseidon Academy</p>
        <h1 className="mt-1 text-2xl font-bold text-text">
          Learn the music business.
        </h1>
      </header>

      {/* Featured lesson */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => openLesson(featured.id)}
        className="mt-5 w-full overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-dim to-surface p-5 text-left"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-gold">
          Featured
        </p>
        <h2 className="mt-2 text-xl font-bold leading-tight text-text">
          {featured.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{featured.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
          Start reading <ArrowRight size={15} />
        </span>
      </motion.button>

      {/* Categories */}
      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-text">Browse by topic</h2>
          <button
            onClick={() => setTab('learn')}
            className="text-sm text-muted active:text-gold"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => openCategory(c.id)}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 text-left active:bg-surface-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-dim">
                <Icon name={c.icon} size={18} className="text-gold" />
              </span>
              <span className="text-sm font-semibold leading-tight text-text">
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Fresh picks */}
      <section className="mt-7">
        <h2 className="mb-3 font-semibold text-text">Fresh picks</h2>
        <div className="space-y-3">
          {fresh.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </section>
    </div>
  )
}
