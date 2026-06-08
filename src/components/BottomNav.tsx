import { Home, GraduationCap, Wrench, Search, Bookmark } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { useNav, type TabId } from '@/context/NavContext'

const TABS: { id: TabId; label: string; icon: React.ComponentType<LucideProps> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'learn', label: 'Learn', icon: GraduationCap },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'saved', label: 'Saved', icon: Bookmark },
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
                className="flex w-full flex-col items-center gap-1 py-2.5"
              >
                <IconCmp
                  size={22}
                  className={active ? 'text-gold' : 'text-muted'}
                  strokeWidth={active ? 2.4 : 2}
                />
                <span
                  className={`text-[11px] ${active ? 'text-gold font-medium' : 'text-muted'}`}
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
