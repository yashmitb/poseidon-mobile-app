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
- [x] Placeholder content: 6 categories, 12 lessons, 22 glossary terms
- [x] Bundle-size optimization (explicit Lucide icon registry)
- [x] Docs: README, CLAUDE.md, CONTENT_GUIDE.md, this file

---

## V1.1 — Ship-ready (NEXT)

Things needed before this is in front of users or in a store.

- [ ] **Push to GitHub** and add Johnytiger as collaborator (Yashmit does the invite).
- [ ] **Real content** — replace placeholder lessons/glossary with the team's curated
      material (see [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)).
- [ ] **Confirm app name** — "Poseidon Academy" is a working name.
- [ ] **App icon + splash screen** — design assets for iOS/Android.
- [ ] **Generate native projects** — `cap add ios` / `cap add android`, test on device.
- [ ] **Basic tests** — Vitest + React Testing Library, or Playwright against the dev server.

---

## V2 — Polish & reach (LATER, not committed)

Ideas, not decisions. Discuss before building.

- [ ] **PWA** — web manifest + service worker so it's installable from a browser too.
- [ ] **Content updates without a store release** — hosted JSON the app fetches and caches,
      or Capacitor Live Updates. Trades offline-purity for faster content iteration.
- [ ] **Progress / streaks** — mark lessons read, show "continue learning."
- [ ] **Port website tools** — adapt the website's interactive wizards (Copyright, Sample
      Clearance, PRO Registration, Release Planning, Royalty Collection) into native
      mobile flows. Translate to this repo's content shapes; do not share code.
- [ ] **Search ranking** — current search is simple substring match; could rank by relevance.
- [ ] **Share / deep links** — share a lesson, open the app to a specific lesson.

---

## Explicit non-goals (for now)

- No backend, accounts, or login — the app is offline by design in V1.
- Not a clone of the website. Different surface, different content, mobile-first.
- Not coupled to the website repo in any way.
