// Content type contracts for Poseidon Academy.
// Live content is fetched from the Academy content API and cached on-device
// (see src/context/ContentContext.tsx). src/data/seedContent.ts holds a
// bundled fallback used only when no live or cached content is available.

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'steps'; items: string[] }

export interface Lesson {
  id: string
  categoryId: string
  title: string
  summary: string
  readMins: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  body: Block[]
}

export interface Category {
  id: string
  name: string
  blurb: string
  // lucide-react icon name, resolved in the UI
  icon: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  category: string
}

export interface ChecklistItem {
  id: number
  text: string
}

export interface ChecklistSection {
  id: number
  title: string
  items: ChecklistItem[]
}

export interface QAItem {
  id: number
  categoryId: string // matches Category.id
  question: string
  answer: string
}
