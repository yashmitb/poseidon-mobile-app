import {
  TrendingUp,
  Megaphone,
  ListMusic,
  AudioLines,
  MonitorPlay,
  Music2,
  Sparkles,
  Copyright,
  Scissors,
  Send,
  Film,
  Coins,
  BadgeCheck,
  Scale,
  Signature,
  Building2,
  Mic,
  ShoppingBag,
  Users,
  Newspaper,
  Bot,
  SlidersVertical,
  AudioWaveform,
  HeartPulse,
  HandCoins,
  Shield,
  Circle,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

// Explicit registry of category icons. Keeping this a named map (instead of
// `import * as Lucide`) lets the bundler tree-shake the icon library — the
// barrel import pulled in ~700kB of unused icons.
const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  TrendingUp,
  Megaphone,
  ListMusic,
  AudioLines,
  MonitorPlay,
  Music2,
  Sparkles,
  Copyright,
  Scissors,
  Send,
  Film,
  Coins,
  BadgeCheck,
  Scale,
  Signature,
  Building2,
  Mic,
  ShoppingBag,
  Users,
  Newspaper,
  Bot,
  SlidersVertical,
  AudioWaveform,
  HeartPulse,
  HandCoins,
  Shield,
}

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = ICONS[name] ?? Circle
  return <C {...props} />
}
