import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Category, ChecklistSection, GlossaryTerm, Lesson, QAItem } from '@/data/content'
import {
  categories as seedCategories,
  lessons as seedLessons,
  glossary as seedGlossary,
  checklist as seedChecklist,
  qa as seedQA,
} from '@/data/seedContent'

// Academy content is fetched from the backend and cached on-device so the
// app keeps working offline. On launch we render cached (or seed) content
// immediately, then refresh from the network in the background.

const STORAGE_KEY = 'poseidon.content.v1'

interface ContentPayload {
  categories: Category[]
  lessons: Lesson[]
  glossary: GlossaryTerm[]
  checklist: ChecklistSection[]
  qa: QAItem[]
  updatedAt: string
}

interface ContentContextValue extends ContentPayload {
  loading: boolean
}

const ContentContext = createContext<ContentContextValue | null>(null)

const seedPayload: ContentPayload = {
  categories: seedCategories,
  lessons: seedLessons,
  glossary: seedGlossary,
  checklist: seedChecklist,
  qa: seedQA,
  updatedAt: '',
}

// Older caches (and a backend that predates Q&A) may omit `qa` — default it
// to an empty array so consumers can always filter over it safely.
function normalize(payload: ContentPayload): ContentPayload {
  return { ...payload, qa: payload.qa ?? [] }
}

function load(): ContentPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? normalize(JSON.parse(raw) as ContentPayload) : null
  } catch {
    return null
  }
}

function save(payload: ContentPayload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // storage full or unavailable — caching is best-effort
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ContentPayload>(() => load() ?? seedPayload)
  const [loading, setLoading] = useState(() => Boolean(import.meta.env.VITE_API_BASE_URL))

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL
    if (!base) return

    let cancelled = false

    fetch(`${base}/api/academy/content`)
      .then((res) => (res.ok ? (res.json() as Promise<ContentPayload>) : null))
      .then((raw) => {
        if (cancelled || !raw) return
        const payload = normalize(raw)
        setData((prev) => {
          if (payload.updatedAt === prev.updatedAt) return prev
          save(payload)
          return payload
        })
      })
      .catch(() => {
        // offline or unreachable — keep cached/seed content
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({ ...data, loading }), [data, loading])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
