import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ContentProvider } from '@/context/ContentContext'
import { NavProvider, useNav } from '@/context/NavContext'
import { SavedProvider } from '@/context/SavedContext'
import { BottomNav } from '@/components/BottomNav'
import { Home } from '@/screens/Home'
import { Learn } from '@/screens/Learn'
import { Tools } from '@/screens/Tools'
import { Search } from '@/screens/Search'
import { Saved } from '@/screens/Saved'
import { Login } from '@/screens/Login'
import { LessonDetail } from '@/screens/LessonDetail'
import { CategoryDetail } from '@/screens/CategoryDetail'

function Shell() {
  const { tab, detail } = useNav()

  return (
    <div className="mx-auto max-w-md bg-bg text-text">
      {/* overflow-x:clip (not hidden) contains the horizontal slide-in animations
          without creating a scroll container — `hidden` forces overflow-y:auto,
          which breaks position:sticky headers and position:fixed on iOS Safari. */}
      <div className="relative overflow-x-clip">
        <AnimatePresence mode="popLayout">
          {detail ? (
            detail.kind === 'lesson' ? (
              <LessonDetail key={`lesson-${detail.id}`} id={detail.id} />
            ) : (
              <CategoryDetail key={`cat-${detail.id}`} id={detail.id} />
            )
          ) : (
            <motion.main
              key={tab}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: 'spring', stiffness: 320, damping: 30 },
              }}
              exit={{ opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.12, ease: 'easeIn' } }}
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

// Login gate: unauthenticated users see the Login screen; the rest of the app
// (and its providers) only mount once signed in.
function Gate() {
  const { authed } = useAuth()
  if (!authed) return <Login />
  return (
    <ContentProvider>
      <SavedProvider>
        <NavProvider>
          <Shell />
        </NavProvider>
      </SavedProvider>
    </ContentProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}
