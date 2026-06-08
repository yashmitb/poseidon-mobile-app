import { AnimatePresence, motion } from 'framer-motion'
import { NavProvider, useNav } from '@/context/NavContext'
import { SavedProvider } from '@/context/SavedContext'
import { BottomNav } from '@/components/BottomNav'
import { Home } from '@/screens/Home'
import { Learn } from '@/screens/Learn'
import { Tools } from '@/screens/Tools'
import { Search } from '@/screens/Search'
import { Saved } from '@/screens/Saved'
import { LessonDetail } from '@/screens/LessonDetail'
import { CategoryDetail } from '@/screens/CategoryDetail'

function Shell() {
  const { tab, detail } = useNav()

  return (
    <div className="mx-auto max-w-md bg-bg text-text">
      {/* overflow-x-hidden only on content — applying it to the outer shell breaks
          position:fixed on iOS Safari (fixed becomes relative to the overflow container) */}
      <div className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          {detail ? (
            detail.kind === 'lesson' ? (
              <LessonDetail key={`lesson-${detail.id}`} id={detail.id} />
            ) : (
              <CategoryDetail key={`cat-${detail.id}`} id={detail.id} />
            )
          ) : (
            <motion.main
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.14, ease: 'easeOut' } }}
              exit={{ opacity: 0, transition: { duration: 0.1, ease: 'easeIn' } }}
            >
              {tab === 'home' && <Home />}
              {tab === 'learn' && <Learn />}
              {tab === 'tools' && <Tools />}
              {tab === 'search' && <Search />}
              {tab === 'saved' && <Saved />}
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <SavedProvider>
      <NavProvider>
        <Shell />
      </NavProvider>
    </SavedProvider>
  )
}
