# Working Instructions — Moath Portfolio

## Project Overview
- **Type:** Personal portfolio, single-page app
- **Stack:** Vite + Vue 3 (Composition API, `<script setup>`) + Tailwind CSS v4 + vue-router + vue-i18n
- **No Pinia** — state is minimal (language + current section); router + one composable is enough
- **Reference:** `BUILD-BRIEF.md` is the implementation reference. `hero-mockup.html` is the final visual and behavioral reference — when in doubt about spacing, motion, or interaction, that file is the source of truth, not memory of it.

---

## ⚠️ Golden Rule — Never Assume, Never Guess
Claude must never assume or "imagine" the content of any file that hasn't actually been read in the current conversation. This includes:
- The current content of `hero-mockup.html`, `BUILD-BRIEF.md`, or any `identity/*.md` file
- Component structure, prop names, or composable APIs not yet seen
- Design tokens, copy, or asset paths — read the actual file, don't recall from a summary

If Claude needs to know what a file currently contains, it must **read it first**, not guess based on what a similar project would look like.

## ⚠️ Project Rule — No `left` / `right` in CSS
**Any `left` or `right` property (or value) in CSS is a bug.** This project is bilingual (Arabic RTL / English LTR) and the entire layout must flip by changing `dir` on `<html>` alone — nothing else should need to change.

Use only logical properties:
- `inset-inline-start` / `inset-inline-end` — never `left` / `right`
- `margin-inline` / `margin-inline-start` / `margin-inline-end` — never `margin-left` / `margin-right`
- `padding-inline` / `padding-inline-start` / `padding-inline-end` — never `padding-left` / `padding-right`
- `border-inline-start` / `border-inline-end` — never `border-left` / `border-right`
- `text-align: start` / `end` — never `text-align: left` / `right`
- Tailwind utilities: `ps-*` / `pe-*` / `ms-*` / `me-*` / `start-*` / `end-*` — never `pl-*` / `pr-*` / `ml-*` / `mr-*` / `left-*` / `right-*`

The only exception: mirrored assets (e.g. `.field`, `.photo` in the mockup) use `transform: scaleX(-1)` under `[dir="rtl"]`, which is a separate, deliberate mechanism — not a `left`/`right` swap.

## ⚠️ Project Rule — No Silent Destructive Flags
Claude must never run a command carrying `--overwrite`, `--force`, `-f`, `--yes`/`-y`, or any other flag that can delete or replace existing files/directories, without first **showing the exact command to the user and getting explicit confirmation** — even when a tool (like scaffolding CLIs) seems to require it to proceed non-interactively. This applies everywhere, not just inside a git repo: this project has no `.git`, so there is no safety net to undo a bad overwrite.

This rule exists because `npm create vite@latest . -- --overwrite` was run once without asking, and it wiped the entire project directory (`BUILD-BRIEF.md`, `hero-mockup.html`, `assets/moath.png`, all of `identity/`) instead of only touching conflicting scaffold files. The files were recovered manually; it should not happen again.

If a scaffolding tool refuses to run in a non-empty directory, the correct move is to stop and ask the user how they want to proceed (e.g. scaffold in a temp folder and merge by hand, or confirm the overwrite explicitly first) — not to reach for the flag that suppresses the prompt.

## Solution Quality Standards
- No band-aid fixes — address the root cause.
- Follow the non-negotiable rules in `BUILD-BRIEF.md` § 2 (no page scroll, no `left`/`right`, delay on enter-state only, hidden sections are `inert` + `aria-hidden`, `prefers-reduced-motion` handling) on every relevant change, not just when first implemented.
- If there's more than one valid approach, state the options and explain the recommendation.

---

## Design Tokens
Defined in `src/style.css` — colors under `@theme` (so Tailwind utilities like `bg-primary-deep` work), motion tokens (`--dur`, `--ease`, etc.) as plain `:root` custom properties. Match `BUILD-BRIEF.md` § 3 exactly; don't introduce new colors or durations without updating the brief first.

## Project Structure
```
src/
├── views/          # one per section (Hero, About, Skills, Projects, Experience, Contact) — route targets
├── router/          # route table, § 4 of the brief
├── i18n/            # vue-i18n instance + locales/en.json, locales/ar.json
├── composables/      # shared state (language, current section) — not yet created
├── style.css         # @import "tailwindcss" + design tokens
└── App.vue           # root — just <router-view />
```

## Additional Notes (fill in as needed)
> Add here: carousel/wheel implementation notes once built, project screenshot pipeline, contact form backend once wired up.
