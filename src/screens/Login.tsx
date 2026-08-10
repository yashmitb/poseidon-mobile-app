import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { passwordError } from '@/lib/password'

type Mode = 'login' | 'register'

const RULES = '8+ characters, one uppercase letter, one symbol.'

export function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    // Client-side password policy on sign-up (server enforces it too).
    if (mode === 'register') {
      const pwErr = passwordError(password)
      if (pwErr) {
        setError(pwErr)
        return
      }
    }

    setBusy(true)
    try {
      if (mode === 'register') await register(email.trim(), password)
      else await login(email.trim(), password)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    setError(null)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center bg-bg px-6 pb-safe pt-safe text-text">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
      >
        <div className="mb-8">
          <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-dim">
            <Lock size={20} className="text-gold" />
          </span>
          <p className="text-sm text-muted">Poseidon Academy</p>
          <h1 className="mt-1 text-2xl font-bold text-text">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {mode === 'login'
              ? 'Sign in to continue.'
              : 'Sign up to start learning the music business.'}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Email</label>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none placeholder:text-muted/60 focus:border-gold/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-11 text-sm text-text outline-none placeholder:text-muted/60 focus:border-gold/50"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted active:text-text"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {mode === 'register' && (
              <p className="mt-1.5 text-xs text-muted">{RULES}</p>
            )}
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={busy}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-bg disabled:opacity-60"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={switchMode} className="font-medium text-gold active:opacity-80">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
