import { Home, GraduationCap, Wrench, Search, Bookmark } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNav, type TabId } from '@/context/NavContext'
import { springs } from '@/lib/animations'

const TABS: { id: TabId; label: string; icon: React.ComponentType<LucideProps> }[] = [
  { id: 'home',   label: 'Home',   icon: Home },
  { id: 'learn',  label: 'Learn',  icon: GraduationCap },
  { id: 'tools',  label: 'Tools',  icon: Wrench },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'saved',  label: 'Saved',  icon: Bookmark },
]

export function BottomNav() {
  const { tab, setTab } = useNav()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur pb-safe">
      <ul className="flex items-stretch">
        {TABS.map(({ id, label, icon: IconCmp }) => {
          const active = tab === id
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => setTab(id)}
                aria-current={active ? 'page' : undefined}
                className="relative flex w-full flex-col items-center gap-1 py-2.5"
              >
                {/* Sliding gold pill — layoutId lets Framer Motion FLIP-animate
                    this single element between tab positions automatically */}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1 inset-y-0.5 rounded-xl bg-gold-dim"
                    transition={springs.snappy}
                  />
                )}

                {/* Icon scales up when tab becomes active */}
                <motion.span
                  animate={{ scale: active ? 1.1 : 1 }}
                  transition={springs.snappy}
                  className="relative"
                >
                  <IconCmp
                    size={22}
                    className={active ? 'text-gold' : 'text-muted'}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </motion.span>

                <span
                  className={`relative text-[11px] transition-colors duration-150 ${
                    active ? 'font-medium text-gold' : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
