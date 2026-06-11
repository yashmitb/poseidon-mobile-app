# Roadmap — Poseidon Academy

Where the app is and what's next. See [CLAUDE.md](../CLAUDE.md) for full context.

---

## V1 — Shell + offline content (DONE)

The working app, built and committed.

- [x] Capacitor-ready React + Vite + TS project
- [x] Poseidon dark/gold theme, mobile viewport, iOS safe areas
- [x] 5-tab bottom navigation (Home / Learn / Tools / Search / Saved)
- [x] No-router navigation store (tab + detail stack)
- [x] Home, Learn, Lesson reader, Category detail
- [x] Tools: Glossary (search + A–Z) and Release Checklist (checkable, persisted)
- [x] Global Search across lessons + glossary
- [x] Bookmarks (localStorage)
- [x] Placeholder content: 6 categories, 12 lessons, 22 glossary terms, 5-section checklist
- [x] Bundle-size optimization (explicit Lucide icon registry)
- [x] Docs: README, CLAUDE.md, CONTENT_GUIDE.md, this file

---

## V1.1 — Backend-driven content (DONE)

Content moved from bundled arrays to the Academy content API, with offline caching.

- [x] `ContentContext` — fetches `GET /api/academy/content`, caches to `localStorage`
      (`poseidon.content.v1`), falls back to `seedContent.ts` offline
- [x] `src/data/content.ts` trimmed to types only; `seedContent.ts` holds the bundled
      fallback (offline-first-launch only)
- [x] `ChecklistSection`/`ChecklistItem` types — Release Checklist content + progress now
      keyed on stable item ids from the backend
- [x] `.env.example` + `vite-env.d.ts` for `VITE_API_BASE_URL`

---

## V1.2 — Ship-ready (NEXT)

Things needed before this is in front of users or in a store.

- [ ] **Push to GitHub** and add Johnytiger as collaborator (Yashmit does the invite).
- [ ] **Connect to live backend** — set `VITE_API_BASE_URL` once the Academy API is live;
      verify fetch/cache/offline-fallback end to end.
- [ ] **Real content** — the team/admin enters curated lessons/glossary/checklist via the
      Academy admin on poseidon-music-platform (see [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)).
- [ ] **Confirm app name** — "Poseidon Academy" is a working name.
- [ ] **App icon + splash screen** — design assets for iOS/Android.
- [ ] **Generate native projects** — `cap add ios` / `cap add android`, test on device.
- [ ] **Basic tests** — Vitest + React Testing Library, or Playwright against the dev server.

---

## V2 — Polish & reach (LATER, not committed)

Ideas, not decisions. Discuss before building.

- [ ] **PWA** — web manifest + service worker so it's installable from a browser too.
- [ ] **Progress / streaks** — mark lessons read, show "continue learning."
- [ ] **Port website tools** — adapt the website's interactive wizards (Copyright, Sample
      Clearance, PRO Registration, Release Planning, Royalty Collection) into native
      mobile flows. Translate to this repo's content shapes; do not share code.
- [ ] **Search ranking** — current search is simple substring match; could rank by relevance.
- [ ] **Share / deep links** — share a lesson, open the app to a specific lesson.

---

## Explicit non-goals (for now)

- No accounts or login in this app — Academy content management has its own single
  admin login on the website backend; this app has no admin UI of its own.
- Not a clone of the website. Different surface, different content, mobile-first.
- Not coupled to the website repo's code or database — only the Academy content API.
