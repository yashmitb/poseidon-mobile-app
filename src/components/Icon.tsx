import {
  Rocket,
  Scale,
  Megaphone,
  DollarSign,
  SlidersVertical,
  Sparkles,
  Circle,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

// Explicit registry of category icons. Keeping this a named map (instead of
// `import * as Lucide`) lets the bundler tree-shake the icon library — the
// barrel import pulled in ~700kB of unused icons.
const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Rocket,
  Scale,
  Megaphone,
  DollarSign,
  SlidersVertical,
  Sparkles,
}

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = ICONS[name] ?? Circle
  return <C {...props} />
}
