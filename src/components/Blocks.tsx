import { Info } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { Block } from '@/data/content'

// Each block fades up sequentially as the lesson article mounts.
const blockVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 340, damping: 28 },
  },
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.075, delayChildren: 0.1 } },
      }}
    >
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return (
              <motion.h2 key={i} variants={blockVariant} className="pt-2 text-lg font-semibold text-text">
                {b.text}
              </motion.h2>
            )
          case 'paragraph':
            return (
              <motion.p key={i} variants={blockVariant} className="text-[15px] leading-relaxed text-text/90">
                {b.text}
              </motion.p>
            )
          case 'list':
            return (
              <motion.ul key={i} variants={blockVariant} className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-[15px] text-text/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </motion.ul>
            )
          case 'steps':
            return (
              <motion.ol key={i} variants={blockVariant} className="space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[15px] text-text/90">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-dim text-xs font-semibold text-gold">
                      {j + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{item}</span>
                  </li>
                ))}
              </motion.ol>
            )
          case 'callout':
            return (
              <motion.div
                key={i}
                variants={blockVariant}
                className="flex gap-3 rounded-xl border border-gold/30 bg-gold-dim p-3.5"
              >
                <Info size={18} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-[14px] leading-relaxed text-gold-soft">{b.text}</p>
              </motion.div>
            )
        }
      })}
    </motion.div>
  )
}
