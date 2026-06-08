import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// Bookmarked lesson IDs, persisted to localStorage so saves survive app restarts.
// On a Capacitor native shell localStorage maps to the WKWebView/Android WebView store.

const STORAGE_KEY = 'poseidon.saved.v1'

interface SavedContextValue {
  saved: string[]
  isSaved: (id: string) => boolean
  toggle: (id: string) => void
}

const SavedContext = createContext<SavedContextValue | null>(null)

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function SavedProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // storage full or unavailable — saves are best-effort
    }
  }, [saved])

  const toggle = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev],
    )
  }, [])

  const isSaved = useCallback((id: string) => saved.includes(id), [saved])

  const value = useMemo(
    () => ({ saved, isSaved, toggle }),
    [saved, isSaved, toggle],
  )

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSaved() {
  const ctx = useContext(SavedContext)
  if (!ctx) throw new Error('useSaved must be used within SavedProvider')
  return ctx
}
