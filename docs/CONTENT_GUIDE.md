# Content Guide — Poseidon Academy

The app's content (lessons, categories, glossary, checklist) is fetched from the Academy
content API on the Poseidon Music Platform backend and cached on-device by
[`src/context/ContentContext.tsx`](../src/context/ContentContext.tsx). Real content is
entered by an admin via the Academy admin page on that backend — **not** by editing files
in this repo.

[`src/data/content.ts`](../src/data/content.ts) holds only the TypeScript types — the
shapes below — which both this app's UI and the backend API response must match.
[`src/data/seedContent.ts`](../src/data/seedContent.ts) holds a small bundled fallback
used only on first launch with no connectivity and no cache yet.

> If you're adding content for local development/testing without a live backend, edit
> `seedContent.ts`. It is **not** the source of truth for production content.

---

## The four lists

`useContent()` (from `ContentContext`) returns:

- `categories` — the topics shown on Home and Learn.
- `lessons` — the articles. Each belongs to one category.
- `glossary` — the dictionary terms shown in the Glossary tool and Search.
- `checklist` — the Release Checklist sections and items.

---

## Lesson shape

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

A lesson with this shape automatically appears in Learn, in its category, in Search, and
can be bookmarked — no UI changes needed.

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
> If you need a new layout, the `Block` union and `Blocks.tsx` (this repo) AND the
> backend response shape both need to be extended together — ask an engineer.

---

## Category shape

```ts
{
  id: 'touring',
  name: 'Touring & Live',
  blurb: 'Booking, advancing, and getting paid on the road.',
  icon: 'Mic',                       // a Lucide icon NAME — see the icon note below
}
```

**Icon note (important):** `icon` is the name of a [Lucide](https://lucide.dev/icons)
icon, and must be registered in this repo's [`src/components/Icon.tsx`](../src/components/Icon.tsx)
or it falls back to a plain circle. An engineer adds it in one line:

```ts
import { Mic } from 'lucide-react'   // add the import
const ICONS = { ...existing, Mic }   // add to the registry
```

(We register icons explicitly instead of importing all of Lucide, to keep the app small.)
This applies to icon names coming from the backend too — adding a new category icon on
the backend requires a small app update to register it here.

---

## Glossary term shape

```ts
{
  term: 'Cross-Collateralization',
  definition: 'When a label recoups the costs of one project from the earnings of another.',
  category: 'Business',              // free-text grouping label, shown as a chip
}
```

Terms appear in the Glossary tool (A–Z, searchable) and in global Search automatically.

---

## Checklist shape

```ts
{
  id: 1,
  title: '8 weeks out',
  items: [
    { id: 1, text: 'Final master approved and exported' },
    { id: 2, text: 'Cover artwork finalized (3000×3000, no logos)' },
  ],
}
```

`checklist` is an array of these sections. Item completion is persisted in `localStorage`
keyed by `item.id`, so ids must be **stable** — don't reuse or renumber an existing item's
id, or users will lose their checked state for it.

---

## A few specifics

- **Home featured lesson:** the big card on Home is controlled by `FEATURED_ID` near the
  top of [`src/screens/Home.tsx`](../src/screens/Home.tsx). Point it at any lesson `id`
  that exists on the backend.
- **Order:** lessons show in array order within a category. Glossary is auto-sorted A–Z.
  Checklist sections/items render in array order.

---

## After editing seedContent.ts

```bash
npm run build      # confirms there are no typos/type errors
npm run dev        # preview at localhost:5173 (resize to phone width)
```

If `build` passes, the content is valid and the app will render it as the offline
fallback.
