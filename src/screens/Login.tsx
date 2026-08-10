import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Check, Eye, EyeOff, Loader2, Lock, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { passwordError } from '@/lib/password'

type Mode = 'login' | 'register'

// Live password requirements shown under the field on sign-up.
const CHECKS: { label: string; test: (pw: string) => boolean }[] = [
  { label: '8+ characters', test: (pw) => pw.length >= 8 },
  { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One symbol', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
]

// Staggered entrance for the whole card.
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 30 } },
}

export function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const isRegister = mode === 'register'

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (isRegister) {
      const pwErr = passwordError(password)
      if (pwErr) {
        setError(pwErr)
        return
      }
    }
    setBusy(true)
    try {
      if (isRegister) await register(email.trim(), password)
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
    <div className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-bg px-6 pb-safe pt-safe text-text">
      {/* ── Ambient aurora background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-blob aurora-a -left-24 -top-16 h-80 w-80"
          style={{ background: 'radial-gradient(circle, rgba(201,169,78,0.30), transparent 70%)' }}
        />
        <div
          className="aurora-blob aurora-b -right-28 top-24 h-96 w-96"
          style={{ background: 'radial-gradient(circle, rgba(230,205,134,0.18), transparent 70%)' }}
        />
        <div
          className="aurora-blob aurora-c bottom-[-6rem] left-10 h-80 w-80"
          style={{ background: 'radial-gradient(circle, rgba(201,169,78,0.16), transparent 70%)' }}
        />
        {/* Vignette so the glow falls off toward the edges. */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(10,10,10,0.85) 100%)' }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-sm"
      >
        {/* Lock badge — pops in, then breathes gently. */}
        <motion.div variants={item} className="mb-7">
          <motion.span
            initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 460, damping: 18, delay: 0.1 }}
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gold-dim"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: '0 0 40px rgba(201,169,78,0.35)' }}
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Lock size={24} className="relative text-gold" />
          </motion.span>
        </motion.div>

        {/* Heading — crossfades between the two modes. */}
        <motion.div variants={item} className="mb-8">
          <p className="text-sm font-medium tracking-wide text-gold/80">Poseidon Academy</p>
          <div className="relative mt-1 min-h-[2.25rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="text-[1.7rem] font-bold leading-tight text-text"
              >
                {isRegister ? 'Create your account' : 'Welcome back'}
              </motion.h1>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-1.5 text-sm text-muted"
            >
              {isRegister ? 'Sign up to start learning the music business.' : 'Sign in to continue.'}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.form variants={item} onSubmit={submit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Email</label>
            <div className="group rounded-xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-200 focus-within:border-gold/50 focus-within:shadow-[0_0_0_3px_rgba(201,169,78,0.12)]">
              <input
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent px-4 py-3 text-sm text-text outline-none placeholder:text-muted/50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Password</label>
            <div className="group relative rounded-xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-200 focus-within:border-gold/50 focus-within:shadow-[0_0_0_3px_rgba(201,169,78,0.12)]">
              <input
                type={show ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent px-4 py-3 pr-11 text-sm text-text outline-none placeholder:text-muted/50"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted transition-colors active:text-text"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Live requirement checklist — only on sign-up. */}
            <AnimatePresence initial={false}>
              {isRegister && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
                  className="mt-2.5 space-y-1 overflow-hidden"
                >
                  {CHECKS.map((c) => {
                    const ok = c.test(password)
                    return (
                      <li key={c.label} className="flex items-center gap-2 text-xs">
                        <motion.span
                          animate={{
                            backgroundColor: ok ? 'rgba(201,169,78,0.18)' : 'rgba(255,255,255,0.05)',
                            color: ok ? '#e6cd86' : '#888888',
                          }}
                          className="flex h-4 w-4 items-center justify-center rounded-full"
                        >
                          {ok ? <Check size={11} /> : <X size={10} />}
                        </motion.span>
                        <span className={ok ? 'text-gold-soft' : 'text-muted'}>{c.label}</span>
                      </li>
                    )
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Error — shakes in. */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit — gold, sheen sweep, press + loading states. */}
          <motion.button
            type="submit"
            disabled={busy}
            whileTap={{ scale: 0.98 }}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-gold-soft to-gold px-4 py-3.5 text-sm font-semibold text-bg shadow-[0_8px_24px_-8px_rgba(201,169,78,0.6)] disabled:opacity-70"
          >
            {!busy && (
              <span
                aria-hidden
                className="sheen absolute inset-y-0 left-0 w-1/3"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
              />
            )}
            {busy && <Loader2 size={16} className="animate-spin" />}
            <span className="relative">{isRegister ? 'Create account' : 'Sign in'}</span>
          </motion.button>
        </motion.form>

        {/* Mode toggle */}
        <motion.p variants={item} className="mt-6 text-center text-sm text-muted">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={switchMode} className="font-semibold text-gold transition-opacity active:opacity-70">
            {isRegister ? 'Sign in' : 'Sign up'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  )
}
