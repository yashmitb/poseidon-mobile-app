import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// Login gate for the Academy app. Auth is a stateless bearer token minted by
// the backend (POST /api/academy/auth/login|register) and stored on-device.
// The token is sent as `Authorization: Bearer` on any authenticated call.
//
// This gate controls access to the app UI. Content itself is still served from
// the public content endpoint — this is an access wall, not per-user data.

const STORAGE_KEY = 'poseidon.auth.v1'

interface StoredAuth {
  token: string
  email: string
}

interface AuthContextValue {
  authed: boolean
  email: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function load(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredAuth) : null
  } catch {
    return null
  }
}

function save(auth: StoredAuth | null) {
  try {
    if (auth) localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // best-effort
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(() => load())

  const base = import.meta.env.VITE_API_BASE_URL

  async function post(path: string, body: unknown): Promise<StoredAuth> {
    if (!base) throw new Error('The app is not configured to reach the server.')
    let res: Response
    try {
      res = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch {
      throw new Error('Could not reach the server. Check your connection.')
    }
    const data = (await res.json().catch(() => null)) as
      | { token?: string; user?: { email?: string }; error?: string }
      | null
    if (!res.ok || !data?.token) {
      throw new Error(data?.error || 'Something went wrong. Please try again.')
    }
    return { token: data.token, email: data.user?.email ?? '' }
  }

  // Validate a stored token on launch; drop it if the server rejects it.
  useEffect(() => {
    if (!auth || !base) return
    let cancelled = false
    fetch(`${base}/api/academy/auth/me`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => {
        if (!cancelled && res.status === 401) {
          save(null)
          setAuth(null)
        }
      })
      .catch(() => {
        // offline — keep the token, let the user in
      })
    return () => {
      cancelled = true
    }
    // Only run when the token identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token])

  const value = useMemo<AuthContextValue>(
    () => ({
      authed: Boolean(auth),
      email: auth?.email ?? null,
      login: async (email, password) => {
        const next = await post('/api/academy/auth/login', { email, password })
        save(next)
        setAuth(next)
      },
      register: async (email, password) => {
        const next = await post('/api/academy/auth/register', { email, password })
        save(next)
        setAuth(next)
      },
      logout: () => {
        save(null)
        setAuth(null)
      },
    }),
    // `base` is a build-time constant; `post` closes over it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
