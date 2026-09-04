import { ArrowRight, ArrowUpRight, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import { LessonCard } from '@/components/LessonCard'
import { useAuth } from '@/context/AuthContext'
import { useContent } from '@/context/ContentContext'
import { useNav } from '@/context/NavContext'
import { screenStagger, sectionStagger, fadeUp, springs } from '@/lib/animations'

const FEATURED_ID = 'release-timeline'

export function Home() {
  const { openLesson, openCategory, setTab } = useNav()
  const { logout } = useAuth()
  const { categories, lessons } = useContent()
  const featured = lessons.find((l) => l.id === FEATURED_ID) ?? lessons[0]
  const fresh = lessons.filter((l) => l.id !== featured.id).slice(0, 3)

  return (
    // Outer stagger: header → featured card → categories section → fresh picks section
    <motion.div
      className="px-4 pb-28 pt-safe"
      variants={screenStagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={fadeUp} className="flex items-start justify-between pt-5">
        <div>
          <p className="text-sm text-muted">Poseidon Academy</p>
          <h1 className="mt-1 text-2xl font-bold text-text">Learn the music business.</h1>
        </div>
        <div className="mt-1 flex shrink-0 items-center gap-2">
          {/* Only shown when the Academy is mounted inside the platform (/learn);
              links back to the shared hub at the domain root. */}
          {import.meta.env.BASE_URL !== '/' && (
            <a
              href="/platform"
              className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-muted active:bg-surface-2 active:text-text"
            >
              Platform <ArrowUpRight size={14} />
            </a>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            aria-label="Sign out"
            className="rounded-full border border-border bg-surface p-2 text-muted active:bg-surface-2 active:text-text"
          >
            <LogOut size={17} />
          </motion.button>
        </div>
      </motion.header>

      {/* Featured lesson — receives the stagger delay from the outer container */}
      <motion.button
        variants={fadeUp}
        whileTap={{ scale: 0.97 }}
        transition={springs.bouncy}
        onClick={() => openLesson(featured.id)}
        className="mt-5 w-full overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-dim to-surface p-5 text-left"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-gold">Featured</p>
        <h2 className="mt-2 text-xl font-bold leading-tight text-text">{featured.title}</h2>
        <p className="mt-2 text-sm text-muted">{featured.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
          Start reading <ArrowRight size={15} />
        </span>
      </motion.button>

      {/* Categories — inner sectionStagger cascades the label row then each tile */}
      <motion.section variants={sectionStagger} className="mt-7">
        <motion.div variants={fadeUp} className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-text">Browse by topic</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setTab('learn')}
            className="text-sm text-muted active:text-gold"
          >
            See all
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <motion.button
              key={c.id}
              variants={fadeUp}
              whileTap={{ scale: 0.94 }}
              transition={springs.bouncy}
              onClick={() => openCategory(c.id)}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 text-left active:bg-surface-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-dim">
                <Icon name={c.icon} size={18} className="text-gold" />
              </span>
              <span className="text-sm font-semibold leading-tight text-text">{c.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Fresh picks — own inner stagger so items cascade after the heading */}
      <motion.section variants={sectionStagger} className="mt-7">
        <motion.h2 variants={fadeUp} className="mb-3 font-semibold text-text">
          Fresh picks
        </motion.h2>
        <div className="space-y-3">
          {fresh.map((l) => (
            <motion.div key={l.id} variants={fadeUp}>
              <LessonCard lesson={l} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
