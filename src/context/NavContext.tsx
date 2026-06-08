import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// Minimal navigation: a bottom-tab selection plus an optional detail view
// stacked on top of it (lesson reader or category listing). No router needed
// for V1 — keeps the native bundle tiny and the back behavior obvious.

export type TabId = 'home' | 'learn' | 'tools' | 'search' | 'saved'

export type Detail =
  | { kind: 'lesson'; id: string }
  | { kind: 'category'; id: string }
  | null

interface NavContextValue {
  tab: TabId
  detail: Detail
  setTab: (tab: TabId) => void
  openLesson: (id: string) => void
  openCategory: (id: string) => void
  back: () => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [tab, setTabState] = useState<TabId>('home')
  const [detail, setDetail] = useState<Detail>(null)

  const setTab = useCallback((next: TabId) => {
    setDetail(null) // switching tabs drops any open detail view
    setTabState(next)
  }, [])

  const openLesson = useCallback((id: string) => setDetail({ kind: 'lesson', id }), [])
  const openCategory = useCallback(
    (id: string) => setDetail({ kind: 'category', id }),
    [],
  )
  const back = useCallback(() => setDetail(null), [])

  const value = useMemo(
    () => ({ tab, detail, setTab, openLesson, openCategory, back }),
    [tab, detail, setTab, openLesson, openCategory, back],
  )

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within NavProvider')
  return ctx
}
