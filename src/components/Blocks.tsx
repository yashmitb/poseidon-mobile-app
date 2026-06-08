import { Info } from 'lucide-react'
import type { Block } from '@/data/content'

// Renders the structured lesson body. Each block type maps to one layout.
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return (
              <h2 key={i} className="text-lg font-semibold text-text pt-2">
                {b.text}
              </h2>
            )
          case 'paragraph':
            return (
              <p key={i} className="text-[15px] leading-relaxed text-text/90">
                {b.text}
              </p>
            )
          case 'list':
            return (
              <ul key={i} className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-[15px] text-text/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'steps':
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-text/90">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-dim text-xs font-semibold text-gold">
                      {j + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'callout':
            return (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-gold/30 bg-gold-dim p-3.5"
              >
                <Info size={18} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-[14px] leading-relaxed text-gold-soft">{b.text}</p>
              </div>
            )
        }
      })}
    </div>
  )
}
