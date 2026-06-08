import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookA, ChevronRight, ListChecks } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { Glossary } from './tools/Glossary'
import { ReleaseChecklist } from './tools/ReleaseChecklist'
import { screenStagger, fadeUp } from '@/lib/animations'

type ToolId = 'glossary' | 'checklist' | null

const TOOLS: {
  id: Exclude<ToolId, null>
  name: string
  blurb: string
  icon: React.ComponentType<LucideProps>
}[] = [
  {
    id: 'checklist',
    name: 'Release Checklist',
    blurb: 'An 8-week prep list you can tick off as you go.',
    icon: ListChecks,
  },
  {
    id: 'glossary',
    name: 'Glossary',
    blurb: 'Plain-English definitions for music business terms.',
    icon: BookA,
  },
]

// Shared spring transition used for both sub-view enter and exit
const pushEnter = {
  opacity: 1,
  x: 0,
  transition: { type: 'spring', stiffness: 380, damping: 32 },
} as const

const pushExit = {
  opacity: 0,
  x: 32,
  transition: { duration: 0.15, ease: 'easeIn' },
} as const

export function Tools() {
  const [active, setActive] = useState<ToolId>(null)

  return (
    // AnimatePresence with mode="wait" ensures the hub fades out before a
    // sub-view slides in, and the sub-view exits before the hub re-appears.
    <AnimatePresence mode="wait">
      {active === 'glossary' ? (
        <motion.div
          key="glossary"
          className="min-h-dvh"
          initial={{ opacity: 0, x: 48 }}
          animate={pushEnter}
          exit={pushExit}
        >
          <Glossary onBack={() => setActive(null)} />
        </motion.div>
      ) : active === 'checklist' ? (
        <motion.div
          key="checklist"
          className="min-h-dvh"
          initial={{ opacity: 0, x: 48 }}
          animate={pushEnter}
          exit={pushExit}
        >
          <ReleaseChecklist onBack={() => setActive(null)} />
        </motion.div>
      ) : (
        // Hub fades in/out; its children stagger in independently
        <motion.div
          key="hub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.12 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <motion.div
            className="px-4 pb-28 pt-safe"
            variants={screenStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.header variants={fadeUp} className="pt-5">
              <h1 className="text-2xl font-bold text-text">Tools</h1>
              <p className="mt-1 text-sm text-muted">
                Interactive helpers for getting your music out.
              </p>
            </motion.header>

            <div className="mt-5 space-y-3">
              {TOOLS.map((t) => (
                <motion.button
                  key={t.id}
                  variants={fadeUp}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActive(t.id)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left active:bg-surface-2"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-dim">
                    <t.icon size={20} className="text-gold" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-text">{t.name}</span>
                    <span className="block text-sm text-muted">{t.blurb}</span>
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-muted" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
