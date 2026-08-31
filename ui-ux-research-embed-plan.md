# UI/UX Redesign Plan — Research & Embed Models Pages

## Top-Level Overview

**Goal:** Redesign `/research` and `/embed-models` to match the UX standards of
world-class AI/ML company documentation pages (Hugging Face, OpenAI, Anthropic,
Cohere, Together AI). Both pages share the same design language but serve
different audiences:

- `/embed-models` — product/model card page for developers who want to know
  _what the model does and how to use it quickly_ (like an HF model card or
  OpenAI API reference card).
- `/research` — technical report page for researchers who want to read the
  _full paper inline_ (like an Anthropic/DeepMind/Google research post with
  a persistent table-of-contents sidebar).

**Core UX problems with the current pages:**

1. **Research page** forces users through a paginated step-by-step wizard with
   no overview. Visitors can't scan the document — they must click through 13
   steps sequentially. Giants like Anthropic, Google DeepMind, and Cohere
   publish technical blog posts that scroll continuously with a sticky TOC.

2. **Embed-models page** looks like plain prose. It lacks the "model card"
   format that Hugging Face, OpenAI, and Cohere use: a hero badge line with key
   stats visible immediately, tabbed/sectioned quick navigation, highlighted
   capability pills, and a prominent CTA to try the model or download weights.

3. **Both pages** lack visual hierarchy cues used by big players:
   - No sticky in-page navigation (TOC on desktop, drawer on mobile)
   - No progress indicator on the research page
   - No "at a glance" capability section above the fold
   - No differentiated layout between long-form content sections
   - Tables are unstyled relative to the rest of the page

**Approach:** Keep all existing data and Tailwind conventions intact. Replace the
SPA step-wizard on the research page with a continuous-scroll long-form layout
with sticky TOC. Upgrade the embed-models page to a model-card layout modeled
on Hugging Face + Anthropic patterns.

---

## Sub-Tasks

---

### Sub-Task 1 — Research Page: Convert step-wizard to continuous-scroll with sticky TOC

**Status:** [ ] pending

**Intent:**
Replace the 13-step SPA wizard with a single continuously scrolling document
organized into clearly delineated sections. Add a sticky left-side Table of
Contents that highlights the active section as the user scrolls (IntersectionObserver).
This mirrors how Anthropic, DeepMind, OpenAI, and academic blog platforms
present long technical reports.

**Expected Outcomes:**
- The full research report is readable top-to-bottom by scrolling — no more
  mandatory step-by-step clicks.
- Desktop shows a sticky left TOC that highlights the current section title.
- Mobile shows a "Contents" floating button or collapsible TOC at the top.
- Section anchors work (deep-linkable URLs like `/research#v3-benchmarks`).
- All existing benchmark tables, charts, and text content are preserved with
  improved visual treatment.
- `StepNav` and `StepArrows` components are removed from this page (but can
  remain in the file for other use).
- The page becomes a Server Component (no `"use client"` needed for the page —
  the sticky TOC component will be a client component).

**Todo List:**
1. Remove `"use client"` from `src/app/research/page.tsx`; remove `useState`,
   `useRef`, `useEffect`, `step` state and all step-conditional rendering.
2. Create `src/components/ResearchTOC.tsx` — a `"use client"` component that:
   - Accepts a `sections` prop (array of `{ id, label, group }`)
   - Uses `IntersectionObserver` to track which section is in view
   - Renders a sticky `<nav>` with grouped links, matching the existing
     `StepNav` visual style (group headers in `tracking-widest text-neutral-400`,
     active item `bg-neutral-900 text-white rounded-lg`).
   - On mobile: collapsed by default, toggled by a "Contents" button pinned
     to the top of the sidebar area.
3. Re-structure the page JSX as one continuous `<main>` with each of the 13
   original "steps" becoming `<section id="...">` elements, all visible at once
   and separated by `<hr className="border-neutral-100 my-10" />` dividers.
4. Wrap each section heading in `<Reveal>` as before. Keep all existing cards,
   tables, and image blocks exactly as they are.
5. Add the two-column layout: `<aside>` (TOC, `sticky top-24`, `w-56`) +
   `<div className="min-w-0 flex-1">` for content, reusing the same layout
   structure the step-wizard already had.
6. Add a "Reading progress" thin bar at the very top of the viewport
   (`position: fixed; top: 0; height: 2px; bg-neutral-900; z-50`) that fills
   as the user scrolls — a pattern used by Substack, Medium, and Anthropic.
7. At the very top of the content column, add a compact `<nav>` "jump to"
   version selector: two pill buttons `[v1 sections]` `[v3 sections]` that
   smooth-scroll to the first section of each group (replaces the group header
   UX the old step-wizard had).

**Relevant Context:**
- Current page: `src/app/research/page.tsx` (1,091 lines, "use client")
- Sticky layout shell already exists: `flex gap-10`, `aside w-60 sticky top-24`
- `StepDef` type lives in `src/components/StepNav.tsx` — new `ResearchTOC` can
  define its own `TocSection` type instead of reusing `StepDef`
- Section IDs to use: `v1-approach`, `v1-protocol-a`, `v1-protocol-b`,
  `v1-efficiency`, `v1-strengths`, `v1-limitations`, `v3-approach`,
  `v3-benchmarks`, `v3-key-finding`, `v3-strengths`, `v3-limitations`,
  `roadmap`, `reproduction`
- The `PublicationCard` at the top of the page should remain above the TOC area
- Reading progress bar should be a tiny standalone client component
  `src/components/ReadingProgress.tsx`

---

### Sub-Task 2 — Research Page: Visual and hierarchy upgrades to section content

**Status:** [ ] pending

**Intent:**
Once the scroll layout is in place, upgrade the visual treatment of each section
to match technical report standards used by Hugging Face model cards and Anthropic
research posts:
- Version group entry sections get a full-width banner divider (like a "chapter
  header") to clearly separate v1 and v3 content.
- Strengths and Limitations get color-coded left-border cards
  (green for strengths, amber for limitations) instead of plain white cards.
- Roadmap items get a visual timeline treatment (vertical line connector).
- Stats cards at top of each version group use a `bg-neutral-900 text-white`
  accent style for the primary metric.
- Tables get sticky header rows (`<thead>` with `sticky top-0 bg-white z-10`)
  for tall tables.
- "Key finding" and callout boxes use a pattern consistent with the existing
  `border-l-4` callouts already present.

**Expected Outcomes:**
- v1 and v3 sections have a clear visual "chapter start" separator.
- Strengths cards have `border-l-4 border-green-500 bg-green-50`.
- Limitations cards have `border-l-4 border-amber-400 bg-amber-50`.
- Roadmap renders as a vertical timeline (dot + connector line).
- Stats at the top of v1/v3 approach sections are consistent with embed-models
  page stats treatment.

**Todo List:**
1. In the v1 and v3 "Approach" sections, add a chapter-header div:
   a wide, slightly padded strip with the version badge and a subtitle.
2. In all "Strengths" sections, change card class from plain `bg-white` to
   `border-l-4 border-green-400 bg-green-50/50`.
3. In all "Limitations" sections, change card class to
   `border-l-4 border-amber-400 bg-amber-50/50`.
4. In the Roadmap section, replace `border-l-2 border-neutral-200 pl-4` items
   with a `<ol>` where each `<li>` has a visible circle dot and vertical
   connector line using `before:` pseudo-elements (or a `<div>` stack).
5. In benchmark tables, add `sticky top-0 z-10 bg-white` to `<thead>` rows.
6. Ensure `<StepArrows>` is fully removed and not rendered anywhere on the page.

**Relevant Context:**
- Current strengths cards: `src/app/research/page.tsx` lines 474-481, 943-950
- Current limitations cards: lines 501-510, 970-978
- Current roadmap: lines 992-1001
- StepArrows usage: every section, removed in Sub-Task 1

---

### Sub-Task 3 — Embed Models Page: Model card layout redesign

**Status:** [ ] pending

**Intent:**
Redesign `/embed-models` into a proper ML model card, following the visual
conventions of Hugging Face model pages, OpenAI API reference, and Cohere
product pages. The pattern these companies use:
- **Top of page:** Model name + one-liner + badge row (task type, languages,
  license, parameter count) as pill tags.
- **Above-the-fold primary CTA:** Two buttons: primary (Download / Use on HF)
  and secondary (View on GitHub).
- **Tab navigation or anchor links** below the hero to jump between: Overview,
  Versions, Quick Start, Cite.
- **Overview section:** "At a glance" stat grid + prose explanation.
- **Versions section:** The existing comparison table, but with a highlighted
  "recommended" badge on v3, and an inline link per row to the HF model page.
- **Quick Start section:** Tabbed code blocks — one tab for v1 (sentence-
  transformers), one tab for v3 (raw PyTorch) — with a language selector pill
  and copy button per block.
- **Citation section:** The existing PublicationCard.

**Expected Outcomes:**
- The hero section shows model name, task type (Sentence Embeddings), language
  tags (EN / AR / UR), license (Apache 2.0), and size (41M params) as styled
  badge chips — exactly like an HF model card header.
- A sticky or top-of-content "page anchor nav" (`<nav>` with `Overview`,
  `Versions`, `Quick Start`, `Cite` links) appears just below the hero.
- The code section has tab buttons (v1 | v3) that swap the shown code block —
  implemented with simple `useState` in a `"use client"` sub-component called
  `CodeTabs.tsx`.
- Each code block has a "Copy" button that copies to clipboard.
- The version table has a `Recommended` chip on the v3 row.
- The page becomes cleaner: remove the duplicated "Source & weights" link block
  (those links are surfaced in the hero CTA and inside Versions table rows).

**Todo List:**
1. Convert `src/app/embed-models/page.tsx` hero to the model-card header:
   - Add badge row: `task`, `languages`, `license`, `size` chips using
     `rounded-full border px-2.5 py-0.5 text-xs font-medium` style.
   - Add primary CTA button row: "Use on Hugging Face →" (primary, black fill)
     + "Source on GitHub" (secondary, outline).
2. Add a sticky anchor nav bar below the hero with 4 links:
   `#overview`, `#versions`, `#quick-start`, `#cite` — rendered as pill tabs,
   with the active one highlighted via `IntersectionObserver` (reuse the
   `ResearchTOC` logic but as a simpler horizontal nav).
3. Create `src/components/CodeTabs.tsx` — a `"use client"` component:
   - Props: `tabs: { label: string; code: string }[]`
   - Renders tab pill buttons (v1 / v3) + a `<pre>` code block + a copy button.
   - Copy button shows "Copied ✓" for 2 seconds (matches `PublicationCard`
     pattern already in the codebase).
4. Replace the two separate `Quick start — v1` and `Quick start — v3` sections
   with a single `<section id="quick-start">` that renders `<CodeTabs>`.
5. In the Versions table, add a `Recommended` badge on the v3 row and inline
   HF links in the version column.
6. Rename "Source & weights" section and convert it to a clean "Links" section
   with icon-adjacent links (GitHub icon placeholder via text emoji or simple
   SVG inline) rather than a long button row.
7. Add `id` attributes to each section (`overview`, `versions`, `quick-start`,
   `cite`) for the anchor nav to work.

**Relevant Context:**
- Current page: `src/app/embed-models/page.tsx` (289 lines, Server Component)
- `PublicationCard` copy-button pattern: `src/components/PublicationCard.tsx`
  shows the useState clipboard pattern to follow in `CodeTabs.tsx`
- The `stats` array (lines 13-18) feeds the stat grid — keep it, just upgrade
  the visual from plain cards to a badge-style row + expanded card grid
- HF-style badge colors: language tags use `bg-blue-50 text-blue-700`,
  task uses `bg-purple-50 text-purple-700`, license uses
  `bg-green-50 text-green-700`, size uses `bg-neutral-100 text-neutral-700`

---

### Sub-Task 4 — Cross-cutting: Shared components and mobile polish

**Status:** [ ] pending

**Intent:**
Ensure both redesigned pages are fully responsive and consistent, and that any
new shared components (`ResearchTOC`, `ReadingProgress`, `CodeTabs`) follow the
project's code conventions.

**Expected Outcomes:**
- `ResearchTOC` hides on mobile (<md) and shows on desktop, with a collapsible
  "Contents" button at the top of the content area for mobile.
- `ReadingProgress` is thin (2px), fixed to the top, and uses
  `bg-neutral-900` to match the design system.
- `CodeTabs` copy button visually matches `PublicationCard`'s copy button.
- Both pages pass a basic visual QA check (no horizontal overflow, no broken
  spacing on mobile 375px and desktop 1440px breakpoints).
- All `<a>` tags linking to external URLs have `target="_blank"` and
  `rel="noopener noreferrer"`.
- The research page layout file `src/app/research/layout.tsx` metadata
  description is updated to reflect the new long-form format.

**Todo List:**
1. Add mobile "Contents" toggle button at the top of the research content area
   (only visible on `<md`): an `<details>/<summary>` or a `useState` toggle
   that shows the full TOC inline above the first section.
2. Verify `ResearchTOC` groups match the data in the `sections` array passed
   from the page.
3. Verify `ReadingProgress` doesn't interfere with the Navbar which is also
   sticky (`top-0`). The progress bar should be `top-0 z-[60]` (above
   Navbar's `z-50` if it has one, otherwise just `z-50`).
4. Test that the embed-models page anchor nav (`#overview`, `#versions`, etc.)
   scrolls correctly with the `scroll-mt-20` utility to account for the Navbar
   height.
5. Update `src/app/research/layout.tsx` metadata description to something
   that reflects the long-form scroll layout and content.

**Relevant Context:**
- `src/app/research/layout.tsx` — metadata description still says "v1 model"
- Navbar: `src/components/Navbar.tsx` — sticky, check its z-index value
- `scroll-mt-20` / `scroll-mt-24` pattern already used in the current
  research page (`scroll-mt-20` on `stepAreaRef`)

---

## Design Reference Notes

These are the patterns observed from big AI companies being replicated here:

| Pattern | Source inspiration |
|---|---|
| Continuous-scroll technical report + sticky TOC | Anthropic research posts, Google DeepMind |
| Reading progress bar | Substack, Medium, The Verge |
| Model card badge header (task/lang/license/size) | Hugging Face model hub |
| Tabbed code blocks with copy | OpenAI API docs, Cohere docs |
| "Recommended" badge on latest version | HF Spaces, Replicate model pages |
| Green/amber left-border callout cards | GitHub docs, Stripe docs, Vercel docs |
| Version timeline / chapter separators | OpenAI research blog, Mistral posts |
| Anchor nav pill row below hero | Cohere product pages, Together AI |

---

## Implementation Order

```
Sub-Task 1 → Sub-Task 2 → Sub-Task 3 → Sub-Task 4
```

Sub-Tasks 1 and 2 are on the research page; 3 and 4 cover the embed-models
page plus polish. Each sub-task can be reviewed independently before proceeding.
