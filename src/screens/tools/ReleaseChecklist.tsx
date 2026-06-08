import { useEffect, useState } from 'react'
import { ArrowLeft, Check, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { screenStagger, fadeUp } from '@/lib/animations'

const STORAGE_KEY = 'poseidon.checklist.release.v1'

const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: '8 weeks out',
    items: [
      'Final master approved and exported',
      'Cover artwork finalized (3000×3000, no logos)',
      'Metadata locked: title, features, credits, genre',
    ],
  },
  {
    title: '6 weeks out',
    items: [
      'Uploaded to distributor',
      'Release date set',
      'Splits agreed and documented with collaborators',
    ],
  },
  {
    title: '4 weeks out',
    items: [
      'Submitted to Spotify editorial via Spotify for Artists',
      'Registered the song with your PRO',
      'Started teasing on socials',
    ],
  },
  {
    title: '2 weeks out',
    items: [
      'Pre-save campaign live',
      'Curators and press pitched',
      'Content scheduled for release week',
    ],
  },
  {
    title: 'Release week',
    items: [
      'Final reminders posted',
      'Thanked early supporters and pre-savers',
      'Watching first-day data on Spotify for Artists',
    ],
  },
]

const ALL = SECTIONS.flatMap((s) => s.items)

function load(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

export function ReleaseChecklist({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      // best-effort persistence
    }
  }, [checked])

  const done = ALL.filter((i) => checked[i]).length
  const pct = done / ALL.length

  return (
    <div className="min-h-full bg-bg">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-bg/95 px-3 py-3 backdrop-blur pt-safe">
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.88 }}
          className="p-1 text-muted active:text-text"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <h1 className="font-semibold text-text">Release Checklist</h1>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setChecked({})}
          className="ml-auto flex items-center gap-1 text-xs text-muted active:text-text"
        >
          <RotateCcw size={14} /> Reset
        </motion.button>
      </header>

      <motion.div
        className="px-4 pb-28 pt-4"
        variants={screenStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Progress card */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-border bg-surface p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Progress</span>
            <span className="text-sm font-semibold text-gold">
              {done}/{ALL.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            {/* GPU-safe: animate scaleX from left instead of width */}
            <motion.div
              className="h-full origin-left rounded-full bg-gold"
              animate={{ scaleX: pct }}
              initial={{ scaleX: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 22 }}
            />
          </div>
        </motion.div>

        {/* Checklist sections stagger in */}
        {SECTIONS.map((section) => (
          <motion.section key={section.title} variants={fadeUp} className="mt-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              {section.title}
            </h2>
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
              {section.items.map((item) => {
                const on = !!checked[item]
                return (
                  <motion.button
                    key={item}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setChecked((prev) => ({ ...prev, [item]: !prev[item] }))
                    }
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-surface-2"
                  >
                    {/* Checkbox: color transitions via CSS; checkmark springs in */}
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ${
                        on ? 'border-gold bg-gold' : 'border-border'
                      }`}
                    >
                      <AnimatePresence>
                        {on && (
                          <motion.span
                            initial={{ scale: 0, rotate: -15 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 560,
                              damping: 20,
                            }}
                          >
                            <Check size={14} className="text-bg" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    <span
                      className={`text-[15px] transition-colors duration-150 ${
                        on ? 'text-muted line-through' : 'text-text'
                      }`}
                    >
                      {item}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  )
}
