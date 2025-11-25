# gharo-ui-prototype

Single-page personal Web site prototype built with a **UI-first, CMS-second** approach.

Web engineering - Interface, Content Managment, and Publish Operations.

This repo is for **Bucket 1**: a single-page landing that tells my professional story.  
The flow is:

1. Prototype the UI with static data.
2. Lock in the data shape.
3. Wire the page to Contentful.
4. Use a simple “agent checkpoint” loop (ChatGPT) to review key steps.

Structure version: `v0.1.0`  
See `CHANGELOG.md` for changes over time.

---

## 1. Project Goals

- Build a **single-page** personal landing site that:
  - Shows my journey as a web engineer.
  - Is easy to read for hiring managers and collaborators.
- Keep the implementation **clean and maintainable**:
  - TypeScript, linting, and clear layout components.
  - Section-based architecture that maps cleanly to Contentful later.
- Use a lightweight **Agent Checkpoint Loop**:
  - Small scripts help gather relevant code.
  - I paste that into ChatGPT for reviews at defined milestones.

---

## 2. Tech Stack

- Framework: **Gatsby** (or Vite + React, if I switch later)
- Language: **TypeScript**
- Styling: **CSS** with design tokens (`tokens.css`, `layout.css`)
- CMS (later phase): **Contentful**
- AgentOps: manual ChatGPT checkpoints, supported by small Node/TS scripts in `agent/`

---

## 3. Folder Structure (High Level)

```text
gharo-ui-prototype/
  VERSION                  # current structure version (v0.1.0)
  README.md
  CHANGELOG.md
  package.json
  tsconfig.json
  .eslintrc.cjs
  .prettierrc
  .gitignore
  .env.example             # template for env vars (no secrets)

  agent/
    CHECKPOINT_LOG.md      # log of what was reviewed by the agent and what changed
    checkpoints/           # markdown templates for different checkpoints
    scripts/               # small Node/TS helpers to build checkpoint payloads

  docs/
    architecture-ui.md     # overview of SPA architecture and data flow
    agent-usage.md         # how and when to use checkpoints
    checklist-migration-ui-first.md  # detailed task list for this approach

  src/
    pages/
      index.tsx            # main page, renders the single-page layout

    data/
      page-personal-landing.ts  # static page/sections data (before Contentful)
      types.ts                  # TypeScript types for page + sections

    components/
      layout/
        Page.tsx           # top-level layout (container, header, main)
        Header.tsx         # sticky header with navigation and skip link
        Footer.tsx         # optional footer (credits, extra links)

      sections/
        SectionRenderer.tsx # chooses which section component to render
        HeroSection.tsx
        TimelineSection.tsx
        SkillsSection.tsx
        ProjectsSection.tsx
        LearningSection.tsx
        ContactSection.tsx

    styles/
      tokens.css           # design tokens: colors, fonts, spacing
      layout.css           # base layout styles (body, page, sections)
      sections/            # optional section-specific styles

This structure will evolve, but this is the v0.1.0 baseline.

```

---
Here’s an updated README that matches where the repo is *now* (Vite + React, wired to Contentful with the AgentOps loop through Phase 7).

You can replace your current `README.md` with this:

````md
# gharo-ui-prototype

Single-page personal Web site prototype built with a **UI-first, CMS-second** approach.

Web engineering across **interface, content management, and publish operations**.

This repo is for **Bucket 1**: a single-page landing that tells my professional story.  
The flow is:

1. Prototype the UI with static data.
2. Lock in the data shape.
3. Wire the page to Contentful.
4. Use a simple “agent checkpoint” loop to review key steps.

Structure version: `v0.1.0`  
See `CHANGELOG.md` for changes over time.

---

## 1. Project Goals

- Build a **single-page** personal landing site that:
  - Shows my journey as a web engineer.
  - Is easy to scan for hiring managers and collaborators.
- Keep the implementation **clean and maintainable**:
  - TypeScript, linting, and clear layout/data boundaries.
  - Section-based architecture that maps cleanly to Contentful.
- Use a lightweight **Agent Checkpoint Loop**:
  - Small scripts gather relevant code for each phase.
  - I paste those payloads into ChatGPT / Codex for targeted reviews.
  - Decisions and changes are logged in `agent/CHECKPOINT_LOG.md`.

---

## 2. Tech Stack

**Current implementation**

- Build tool / runtime: **Vite + React** (SPA)
- Language: **TypeScript**
- Styling: **CSS** with design tokens
  - `tokens.css` – colors, typography, spacing
  - `layout.css` – base layout, sections, header, etc.
- Data & CMS:
  - **Contentful** (dev environment)
  - `pagePersonalLanding` entry with ordered section references
  - Static TS data used as a **typed fallback** while wiring / debugging
- AgentOps:
  - Manual ChatGPT/Codex checkpoints
  - Helper script: `agent/scripts/buildCheckpointPayload.mjs`
  - Checkpoints tracked in `agent/CHECKPOINT_LOG.md`

> Gatsby is *not* used here anymore – this repo is a Vite + React SPA.

---

## 3. Folder Structure (High Level)

```text
gharo-ui-prototype/
  VERSION                  # current structure version (v0.1.0)
  README.md
  CHANGELOG.md
  package.json
  tsconfig.json
  .eslintrc.cjs
  .prettierrc
  .gitignore
  .env.example             # template for Contentful env vars (no secrets)

  agent/
    CHECKPOINT_LOG.md      # log of what was reviewed by the agent and what changed
    checkpoints/           # markdown payloads/prompts for different checkpoints
    scripts/
      buildCheckpointPayload.mjs  # helper to bundle code into a checkpoint

  src/
    main.tsx               # Vite entrypoint, mounts <App />
    App.tsx                # wraps the Page component

    data/
      page-personal-landing.ts  # TS types for page + sections + static fallback data

    services/
      contentfulClient.ts       # Contentful CDA client (VITE_* env vars)
      fetchPersonalLandingPage.ts
                               # Fetches pagePersonalLanding from Contentful and
                               # maps it into the existing TS page/section types

    components/
      layout/
        Page.tsx           # top-level layout (header, skip link, main, sections)

      sections/
        SectionRenderer.tsx # chooses which section component to render based on sectionType
        HeroSection.tsx
        TimelineSection.tsx
        SkillsSection.tsx
        ProjectsSection.tsx
        LearningSection.tsx
        ContactSection.tsx

    styles/
      tokens.css           # design tokens: colors, fonts, spacing, radii
      layout.css           # base layout styles (body, page, sections, header)

  public/
    # assets served as-is (favicons, etc.) – optional
````

**Data flow (current)**

- `fetchPersonalLandingPage.ts`

  - Calls Contentful CDA for `content_type: "pagePersonalLanding"`, `fields.slug: "/"`.
  - Uses `include` depth to resolve linked sections and supporting entries.
  - Maps entries into the TS shape from `page-personal-landing.ts`:

    - `PersonalLandingPage`
    - `HeroSection`, `TimelineSection`, `SkillsSection`, `ProjectsSection`, `LearningSection`, `ContactSection`
  - Uses a section mapper registry + safe helpers so optional fields and unknown section types don’t break the UI.

- `Page.tsx`

  - On mount, calls `fetchPersonalLandingPage()`.
  - If successful: renders CMS-driven page via `SectionRenderer`.
  - If CMS fetch fails: logs a warning and falls back to the static `personalLandingPage` object.
  - Layout and UI stay **ignorant of CMS details** and consume only typed data.

---

## 4. Agent-Aware Checklist – UI Prototype First, CMS Second

The project is organized into phases, each with an Agent Checkpoint.

**Phase 0 – Setup (Repo + Agent Skeleton)** ✅

- Initialize Vite + React + TypeScript.
- Add ESLint + Prettier.
- Create `agent/` folder, `CHECKPOINT_LOG.md`, and checkpoint payload helper.

**Phase 1 – Static Data Shape** ✅

- Define TS types for `PersonalLandingPage` and section union.
- Create `personalLandingPage` static object in `src/data/page-personal-landing.ts`.
- Checkpoint: static data shape review.

**Phase 2 – Layout & Structure (Local Only)** ✅

- Implement `Page.tsx` layout (header, main).
- Build one component per section (Hero, Timeline, Skills, Projects, Learning, Contact).
- Implement `SectionRenderer` to switch on `section.sectionType`.
- Checkpoint: SectionRenderer + section components.

**Phase 3 – Visual Design & Tokens** ✅

- Introduce design tokens in `tokens.css`.
- Define base layout rules in `layout.css`.
- Apply tokens to key sections (hero, timeline, etc.).
- Checkpoint: tokens + layout CSS review.

**Phase 4 – UX & Accessibility Polish (Still Static)** ✅

- Add sticky header, anchor links, and smooth scrolling.
- Add skip link + focus-visible styles.
- Ensure reasonable mobile behavior (no horizontal scroll, nav wraps).
- Checkpoint: static UX + accessibility review.

**Phase 5 – Translate UI Shape into Contentful Model** ✅

- In `gharo-content-models` repo:

  - Define IA (`ia-personal-landing.md`).
  - Create `models.personal-landing.json` content model.
  - Import types into Contentful dev environment.
- Checkpoint: Contentful model JSON review.

**Phase 6 – Seed Content in Contentful** ✅

- Create entries for:

  - `personProfile`, `socialLink`.
  - Each section type (`sectionHero`, `sectionTimeline`, etc.) and supporting items (`timelineItem`, `skill`, `project`, `learningItem`).
  - One `pagePersonalLanding` entry with ordered `sections[]`.
- Optional checkpoint: content narrative + coherence review.

**Phase 7 – Swap Static Data for Contentful** ✅

- Add `contentfulClient.ts` and `fetchPersonalLandingPage.ts`.
- Wire `Page.tsx` to CMS data with static fallback.
- Harden mapping with:

  - section mapper registry,
  - safe array helpers,
  - unknown-section handling.
- Checkpoint: integration & mapping review.

**Phase 8 – Go Live (Deploy + SEO)** ⏳

- Add minimal SEO component and metadata.
- Deploy to Netlify / Vercel with Contentful env vars.
- Checkpoint: pre-deploy SPA + SEO review.

**Phase 9 – Hardening & Roadmap** ⏳

- Performance & resilience passes.
- Additional pages/sections if needed.
- Agent-assisted roadmap for future iterations.

---

This README reflects the **current** state of `gharo-ui-prototype`: a Vite + React SPA, strongly typed, wired to Contentful, and driven by an explicit AgentOps loop through Phase 7.
