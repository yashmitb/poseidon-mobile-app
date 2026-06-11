import { useEffect, useRef, useState } from 'react'
import { House, GraduationCap, Wrench, Search, Bookmark } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { motion, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useNav, type TabId } from '@/context/NavContext'

const TABS: { id: TabId; label: string; icon: React.ComponentType<LucideProps> }[] = [
  { id: 'home',   label: 'Home',   icon: House },
  { id: 'learn',  label: 'Learn',  icon: GraduationCap },
  { id: 'tools',  label: 'Tools',  icon: Wrench },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'saved',  label: 'Saved',  icon: Bookmark },
]

export function BottomNav() {
  const { tab, setTab } = useNav()
  const listRef = useRef<HTMLUListElement>(null)
  const [dragging, setDragging] = useState(false)

  const activeIndex = Math.max(0, TABS.findIndex((t) => t.id === tab))

  // The highlight is driven by a spring on the active index (not layoutId), so
  // we can derive a velocity-based stretch as it travels — the liquid-glass
  // squash/stretch. At rest velocity is 0, so it settles back to a clean pill.
  const index = useSpring(activeIndex, { stiffness: 320, damping: 26, mass: 0.9 })
  useEffect(() => {
    index.set(activeIndex)
  }, [activeIndex, index])

  const x = useTransform(index, (v) => `${v * 100}%`)
  const velocity = useVelocity(index)
  const scaleX = useTransform(velocity, (v) => 1 + Math.min(Math.abs(v) * 0.18, 0.42))
  const scaleY = useTransform(velocity, (v) => 1 - Math.min(Math.abs(v) * 0.06, 0.14))

  function tabFromClientX(clientX: number): TabId | null {
    const el = listRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    const rel = (clientX - rect.left) / rect.width
    const i = Math.max(0, Math.min(TABS.length - 1, Math.floor(rel * TABS.length)))
    return TABS[i].id
  }

  function handlePointerDown(e: React.PointerEvent<HTMLUListElement>) {
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    const id = tabFromClientX(e.clientX)
    if (id) setTab(id)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLUListElement>) {
    if (!dragging) return
    const id = tabFromClientX(e.clientX)
    if (id && id !== tab) setTab(id)
  }

  function endDrag(e: React.PointerEvent<HTMLUListElement>) {
    setDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 pb-safe">
      <div className="mx-auto max-w-md px-6 pb-5">
        {/* Liquid glass: floating, frosted, translucent pill. Drag across it to
            scrub between tabs. */}
        <ul
          ref={listRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="relative flex touch-none select-none items-stretch overflow-hidden rounded-full border border-white/10 bg-surface/20 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150"
        >
          {/* Travelling liquid highlight — one tab wide, slides via `x`,
              stretches via velocity-driven scaleX/scaleY. */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-0"
            style={{ width: `${100 / TABS.length}%`, x }}
          >
            <motion.span
              style={{ scaleX, scaleY }}
              className="absolute inset-x-1.5 inset-y-1.5 origin-center rounded-full border border-white/10 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
            />
          </motion.span>

          {/* Top specular highlight */}
          <div className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {TABS.map(({ id, label, icon: IconCmp }) => {
            const active = tab === id
            return (
              <li key={id} className="relative z-10 flex-1">
                <button
                  onClick={() => setTab(id)}
                  aria-current={active ? 'page' : undefined}
                  aria-label={label}
                  className="flex w-full items-center justify-center py-5"
                >
                  <motion.span
                    animate={{ scale: active ? 1.12 : 1, y: active ? -1 : 0 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  >
                    <IconCmp
                      size={31}
                      className={active ? 'text-gold' : 'text-muted'}
                      strokeWidth={active ? 2.2 : 1.9}
                    />
                  </motion.span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
