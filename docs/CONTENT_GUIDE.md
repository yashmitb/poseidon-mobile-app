# Content Guide — Poseidon Academy

Everything the app shows comes from one file: [`src/data/content.ts`](../src/data/content.ts).
You do not need to touch any UI code to add or change lessons, categories, or glossary
terms. This guide shows exactly how, with copy-paste examples.

> The content shipping today is **placeholder** — written to look right and demo the app.
> Replace it with the team's curated material.

---

## The three lists

`content.ts` exports three arrays:

- `categories` — the topics shown on Home and Learn.
- `lessons` — the articles. Each belongs to one category.
- `glossary` — the dictionary terms shown in the Glossary tool and Search.

---

## Add a lesson

Add an object to the `lessons` array:

```ts
{
  id: 'royalty-collection',          // unique, lowercase-with-dashes, never reused
  categoryId: 'money',               // must match an existing category id
  title: 'Where Your Royalties Hide',
  summary: 'The four pots of money your music earns.',  // one line, shows on cards
  readMins: 5,
  level: 'Beginner',                 // 'Beginner' | 'Intermediate' | 'Advanced'
  body: [
    { type: 'paragraph', text: 'Your song earns money in more than one place...' },
    { type: 'heading', text: 'The four sources' },
    { type: 'list', items: [
      'Streaming (sound recording)',
      'Performance (composition)',
      'Mechanical (composition)',
      'Sync (placements in film/TV/ads)',
    ]},
    { type: 'callout', text: 'You need both a distributor AND a PRO to collect all four.' },
  ],
}
```

That's it. The lesson now appears in Learn, in its category, in Search, and can be
bookmarked — no other changes needed.

### Body block types

A lesson `body` is a list of blocks. Use these five:

| Block | Looks like | Shape |
|---|---|---|
| `paragraph` | normal text | `{ type: 'paragraph', text: '...' }` |
| `heading` | bold section title | `{ type: 'heading', text: '...' }` |
| `list` | bulleted points (gold dots) | `{ type: 'list', items: ['...', '...'] }` |
| `steps` | numbered steps (gold circles) | `{ type: 'steps', items: ['...', '...'] }` |
| `callout` | gold highlight box (key takeaway) | `{ type: 'callout', text: '...' }` |

Use `steps` for ordered "do this, then this." Use `list` for unordered points. Use
`callout` for the single most important takeaway — one per lesson reads best.

> Do not put raw HTML in text. It renders as plain text on purpose (safer, consistent).
> If you need a new layout, ask an engineer to add a block type.

---

## Add a category

Add an object to the `categories` array:

```ts
{
  id: 'touring',
  name: 'Touring & Live',
  blurb: 'Booking, advancing, and getting paid on the road.',
  icon: 'Mic',                       // a Lucide icon NAME — see the icon note below
}
```

**Icon note (important):** the `icon` is the name of a [Lucide](https://lucide.dev/icons)
icon. Icons must also be registered, or you'll get a fallback circle. An engineer adds it
in one line in [`src/components/Icon.tsx`](../src/components/Icon.tsx):

```ts
import { Mic } from 'lucide-react'   // add the import
const ICONS = { ...existing, Mic }   // add to the registry
```

(We register icons explicitly instead of importing all of Lucide, to keep the app small.)

---

## Add a glossary term

Add an object to the `glossary` array:

```ts
{
  term: 'Cross-Collateralization',
  definition: 'When a label recoups the costs of one project from the earnings of another.',
  category: 'Business',              // free-text grouping label, shown as a chip
}
```

Terms appear in the Glossary tool (A–Z, searchable) and in global Search automatically.

---

## A few specifics

- **Home featured lesson:** the big card on Home is controlled by `FEATURED_ID` near the
  top of [`src/screens/Home.tsx`](../src/screens/Home.tsx). Point it at any lesson `id`.
- **Release Checklist items** are NOT in `content.ts`. They live in `SECTIONS` inside
  [`src/screens/tools/ReleaseChecklist.tsx`](../src/screens/tools/ReleaseChecklist.tsx).
  Edit them there.
- **Order:** lessons show in array order within a category. Glossary is auto-sorted A–Z.

---

## After editing

```bash
npm run build      # confirms there are no typos/type errors
npm run dev        # preview at localhost:5173 (resize to phone width)
```

If `build` passes, the content is valid and the app will render it.
