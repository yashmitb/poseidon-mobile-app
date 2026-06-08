import { useEffect, useState } from 'react'
import { ArrowLeft, Check, RotateCcw } from 'lucide-react'

// A self-contained release-prep checklist. Progress persists to localStorage
// so an artist can tick items off across sessions while prepping a release.

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
  const pct = Math.round((done / ALL.length) * 100)

  return (
    <div className="min-h-full bg-bg">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-bg/95 px-3 py-3 backdrop-blur pt-safe">
        <button onClick={onBack} className="p-1 text-muted active:text-text">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-text">Release Checklist</h1>
        <button
          onClick={() => setChecked({})}
          className="ml-auto flex items-center gap-1 text-xs text-muted active:text-text"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </header>

      <div className="px-4 pb-28 pt-4">
        {/* Progress */}
        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Progress</span>
            <span className="text-sm font-semibold text-gold">
              {done}/{ALL.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {SECTIONS.map((section) => (
          <section key={section.title} className="mt-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              {section.title}
            </h2>
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
              {section.items.map((item) => {
                const on = !!checked[item]
                return (
                  <button
                    key={item}
                    onClick={() =>
                      setChecked((prev) => ({ ...prev, [item]: !prev[item] }))
                    }
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-surface-2"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        on ? 'border-gold bg-gold' : 'border-border'
                      }`}
                    >
                      {on && <Check size={14} className="text-bg" strokeWidth={3} />}
                    </span>
                    <span
                      className={`text-[15px] ${on ? 'text-muted line-through' : 'text-text'}`}
                    >
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
