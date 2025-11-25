
# gharo-ui-prototype

Next : Interface & Narrative Toolkit
Bucket 1 – Personal Landing

[![Version](https://img.shields.io/badge/version-v0.1.0-blue)](./VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/gah-code/gharo-ui-prototype)](https://github.com/gah-code/gharo-ui-prototype/commits/main)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-orange?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

![Lighthouse Performance](https://img.shields.io/badge/Performance-99-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-96-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse PWA](https://img.shields.io/badge/PWA-30-lightgrey?logo=lighthouse&logoColor=white)

> Single-page personal landing page prototype built with a **UI-first, CMS-second** approach, designed to plug into Contentful and act as the core of gilbertoharo.com.

Structure version: `v0.1.0`  
See [`VERSION`](./VERSION) and [`CHANGELOG.md`](./CHANGELOG.md) for history.

---

## Table of Contents

1. [Project Goals](#1-project-goals)  
2. [Status & Phases](#2-status--phases)  
3. [Tech Stack](#3-tech-stack)  
4. [Architecture & Folder Structure](#4-architecture--folder-structure)  
5. [Data Flow](#5-data-flow)  
6. [Getting Started](#6-getting-started)  
7. [Development Scripts](#7-development-scripts)  
8. [AgentOps Workflow](#8-agentops-workflow)  
9. [Deployment (Netlify)](#9-deployment-netlify)  
10. [Phases & Roadmap](#10-phases--roadmap)  
11. [Best Practices & To-Dos](#11-best-practices--to-dos)

---

## 1. Project Goals

- Build a **single-page personal landing site** that:
  - Tells my story as a web engineer.
  - Is easy to scan for hiring managers and collaborators.
- Keep implementation **clean, typed, and maintainable**:
  - Strong TypeScript types between UI and data.
  - Clear separation between layout and content.
- Treat the project as a small **web system**, not just a page:
  - UI prototype → Contentful model → CMS integration → deploy.
- Use an explicit **Agent Checkpoint** loop:
  - Capture relevant code for each phase.
  - Ask targeted questions.
  - Log decisions in `agent/CHECKPOINT_LOG.md`.

---

## 2. Status & Phases

- **Structure version:** `v0.1.0`
- **Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)
- **Lighthouse (Netlify plugin, latest run):**
  - Performance: **99**
  - Accessibility: **96**
  - Best Practices: **100**
  - SEO: **100**
  - PWA: **30** (PWA not a goal… yet)
- **Phases completed:** 0–8  
- **Phase planned:** 9 – Hardening & roadmap (post-launch improvements)

---

## 3. Tech Stack

### Core

- **Vite + React** (SPA)
- **TypeScript**
- **Plain CSS** with design tokens:
  - `tokens.css` – colors, typography, spacing, radii.
  - `layout.css` – base layout, sections, header, responsive behavior.

### Content & Data

- **Contentful** (e.g. `master` environment)
  - Content model lives in sibling repo: `gharo-content-models`.
  - This app reads a single `pagePersonalLanding` entry with:
    - `slug: "/"`,
    - ordered `sections[]` referencing:
      - `sectionHero`
      - `sectionTimeline`
      - `sectionSkills`
      - `sectionProjects`
      - `sectionLearning`
      - `sectionContact`
- **Static TS fallback**
  - `personalLandingPage` object implements the same TS types as the CMS data.
  - Used as a **typed fallback** when CMS fetch fails or while iterating locally.

### AgentOps

- Manual AI checkpoints per phase:
  - Checkpoint payloads in `agent/checkpoints/`.
  - Helper script: `agent/scripts/buildCheckpointPayload.mjs`.
- Decisions logged in `agent/CHECKPOINT_LOG.md`.

### Deploy & Quality

- **Netlify**
  - Build: `npm run build`
  - Publish: `dist`
  - Linked via `netlify link`.
- **Env vars (build-time / client)**:
  - `VITE_CONTENTFUL_SPACE_ID`
  - `VITE_CONTENTFUL_ENVIRONMENT`
  - `VITE_CONTENTFUL_DELIVERY_TOKEN`
  - `SECRETS_SCAN_OMIT_KEYS` (to allow Netlify’s secret scanner to ignore non-sensitive keys like the space ID).
- **Lighthouse CI**
  - `@netlify/plugin-lighthouse` configured via `netlify.toml`.
  - Scores and reports used in Phase 8 “SEO & Lighthouse Review”.

> Gatsby is **not** used. This is a Vite + React SPA with a custom Contentful integration.

---

## 4. Architecture & Folder Structure

```text
gharo-ui-prototype/
├── VERSION
├── README.md
├── CHANGELOG.md
├── package.json
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .env.example             # template for Contentful env vars (no secrets)
├── .nvmrc                   # Node version hint for CI/Netlify
├── netlify.toml             # Netlify build + Lighthouse plugin config
├── agent/
│   ├── CHECKPOINT_LOG.md    # log of agent checkpoints + decisions
│   ├── checkpoints/         # markdown payloads/prompts per phase (cp1, cp2, ..., cp8)
│   └── scripts/
│       └── buildCheckpointPayload.mjs
│                            # helper to bundle code into a checkpoint payload
├── src/
│   ├── main.tsx             # Vite entrypoint, mounts <App />
│   ├── App.tsx              # wraps the Page component
│   ├── data/
│   │   └── page-personal-landing.ts
│   │                        # TS types for page + sections + static fallback data
│   ├── services/
│   │   ├── contentfulClient.ts
│   │   │                    # Contentful CDA client using VITE_* env vars
│   │   └── fetchPersonalLandingPage.ts
│   │                        # Fetches pagePersonalLanding and maps to TS types
│   ├── components/
│   │   ├── layout/
│   │   │   └── Page.tsx     # top-level layout (header, skip link, main, sections)
│   │   ├── sections/
│   │   │   ├── SectionRenderer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── LearningSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── Seo.tsx          # sets document.title + meta description
│   └── styles/
│       ├── tokens.css       # design tokens
│       └── layout.css       # global + layout styles
└── public/
    # static assets served as-is (favicons, etc.) – optional
````

---

## 5. Data Flow

### 5.1 CMS → Typed Data

- `src/services/contentfulClient.ts`
  Creates a Contentful client using:

  - `VITE_CONTENTFUL_SPACE_ID`
  - `VITE_CONTENTFUL_ENVIRONMENT`
  - `VITE_CONTENTFUL_DELIVERY_TOKEN`

- `src/services/fetchPersonalLandingPage.ts`

  - Fetches `pagePersonalLanding` where `fields.slug === "/"`.

  - Uses `include` depth to load sections + nested entries.

  - Maps Contentful entries into:

    - `PersonalLandingPage`
    - Section types (`HeroSection`, `TimelineSection`, `SkillsSection`, `ProjectsSection`, `LearningSection`, `ContactSection`).

  - Uses a **section mapper registry**, safe array helpers, and defensive defaults so optional fields and unknown section types don’t crash the page.

### 5.2 Typed Data → UI

- `src/components/layout/Page.tsx`

  - On mount:

    - Calls `fetchPersonalLandingPage()`.
    - On success: stores `PersonalLandingPage` in state.
    - On failure: logs and falls back to static `personalLandingPage`.
  - Renders:

    - Skip link.
    - Sticky header + nav.
    - `<main>` with all sections via `SectionRenderer`.

- `src/components/sections/SectionRenderer.tsx`

  - Receives a `PageSection` union.
  - Switches on `section.sectionType` to render the correct section component.
  - Keeps UI ignorant of raw CMS shapes.

- `src/components/Seo.tsx`

  - Sets `document.title` and `<meta name="description">` using `page.meta`.
  - SPA-friendly “good enough” SEO for a personal landing page.

---

## 6. Getting Started

### Prerequisites

- Node **18+** or **20+** (matches `.nvmrc`)
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a local env file (not committed):

```bash
cp .env.example .env.local
```

Fill in your Contentful values:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ENVIRONMENT=master
VITE_CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
```

### Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173`.

### Production build & preview

```bash
npm run build
npm run preview
```

Open the preview URL (usually `http://localhost:4173`) and optionally run Lighthouse in Chrome.

---

## 7. Development Scripts

```jsonc
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint \"src/**/*.{ts,tsx}\"",
  "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
  "agent:build": "node agent/scripts/buildCheckpointPayload.mjs"
}
```

- `npm run dev` – local dev server.
- `npm run build` – production build.
- `npm run preview` – serve the production build locally.
- `npm run lint` – lint TypeScript/JS via ESLint.
- `npm run format` – apply Prettier formatting.
- `npm run agent:build` – generate a checkpoint payload with selected files.

---

## 8. AgentOps Workflow

Every meaningful change goes through a **Checkpoint**:

1. Use `agent:build` (or a saved checkpoint `.md` file) to collect relevant code/config.
2. Paste payload into your AI agent (ChatGPT/Codex/Netlify AI).
3. Ask 3–4 specific questions about design, structure, or correctness.
4. Apply changes and log the outcome in `agent/CHECKPOINT_LOG.md`.

Current checkpoints:

- CP1 – Static data shape
- CP2 – SectionRenderer + section components
- CP3 – Tokens + layout CSS
- CP4 – Static UX & accessibility
- CP5 – Contentful model JSON
- CP6 – Narrative & content coherence
- CP7 – Contentful integration & mapping
- CP8 – SEO & Lighthouse (Netlify plugin)

---

## 9. Deployment (Netlify)

### Link site (CLI)

```bash
netlify login
netlify link    # choose your Netlify site (e.g. my-landing-page-2026)
```

### Set environment variables (CLI)

```bash
netlify env:set VITE_CONTENTFUL_SPACE_ID your_space_id
netlify env:set VITE_CONTENTFUL_ENVIRONMENT master
netlify env:set VITE_CONTENTFUL_DELIVERY_TOKEN your_delivery_token

# Ignore non-sensitive space ID in secrets scan
netlify env:set SECRETS_SCAN_OMIT_KEYS VITE_CONTENTFUL_SPACE_ID
```

### Deploy

```bash
netlify deploy --prod
# Build command: npm run build
# Publish directory: dist
```

Netlify automatically picks up `netlify.toml` and runs the Lighthouse plugin on `npm run build`.

---

## 10. Phases & Roadmap

**Phase 0 – Initial Setup**

- Project scope, requirements, Vite scaffold, ESLint/Prettier, Agent skeleton.

**Phase 1 – Static Data Shape** ✅

- TS types for page + sections, `personalLandingPage` static object.

**Phase 2 – Core UI Layout** ✅

- `Page.tsx`, `SectionRenderer`, core section components.

**Phase 3 – Visual Design & Tokens** ✅

- `tokens.css`, `layout.css`, base responsive layout and spacing.

**Phase 4 – UX & Accessibility Polish** ✅

- Skip link, focus states, heading structure, sticky header + anchors.

**Phase 5 – Contentful Model** ✅

- Contentful types & relationships in `gharo-content-models`.

**Phase 6 – Seed Content** ✅

- Real entries in Contentful (sections, profile, timeline, skills, projects, learning, contact).

**Phase 7 – Integration & Mapping** ✅

- `contentfulClient`, `fetchPersonalLandingPage`, mapping into TS types.

**Phase 8 – Go Live + SEO/Lighthouse** ✅

- Netlify deploy, Lighthouse plugin, SEO/UX review & refinements.

**Phase 9 – Hardening & Beyond (planned)** 🔄 (in progress)

- JSON-LD schema, tests for mappers, potential blog/notes route, analytics, CI refinements.

---

## 11. Best Practices & To-Dos

**Already in place**

- Typed boundary between CMS and UI.
- No secrets committed (`.env.local` and Netlify env vars only).
- Linting + formatting configured.
- Lighthouse plugin integrated (or ready to be tuned with thresholds).
- Agent checkpoints with a decision log.

**Next steps**

- [ ] Tune design tokens for even better contrast and readability (based on a11y checks). ⏳ (planned)
- [ ] Add structured data (JSON-LD Person / WebSite) for richer SEO. ⏳ (planned)
- [ ] Add lightweight tests for `fetchPersonalLandingPage` mappers (happy path + missing/optional fields).
- [ ] Keep `docs/post-launch-status.md` updated as the system evolves.

**Linking-related tasks for modeling**

- [ ] In `gharo-content-models`, clearly document **relationships** between types:
  - `pagePersonalLanding` → `section*` → nested item types (`timelineItem`, `skill`, `project`, etc.).
  - How sections are ordered and reused across potential future pages.
- [ ] Add a simple “link map” doc (e.g. `docs/relationships.md`) that:
  - Lists each content type.
  - Shows inbound/outbound references.
  - Notes any 1:many vs many:many relationships.
- [ ] Enforce consistent **naming conventions** and field shapes:
  - `anchorId`, `internalName`, `title`, `slug`, `summary`, etc.
  - Document these conventions so they’re reused across new buckets and pages.

**Contentful + AgentOps patterns / buckets**

- [ ] In `gharo-content-models`, introduce the idea of **Buckets** explicitly:
  - Bucket 1 – Personal Landing (this repo).
  - Bucket 2 – Blog / Notes (future).
  - Bucket 3 – Projects / Case Studies (future).
- [ ] For each bucket:
  - Add an IA doc (e.g. `docs/ia-bucket1-personal-landing.md`, `ia-bucket2-blog.md`).
  - Add or extend `content-modeling-decisions.md` to capture **why** certain types/fields/links exist.
- [ ] Reuse the **AgentOps pattern** inside `gharo-content-models`:
  - CP5-style checkpoints for new content types and relationship changes.
  - A small `agent/` folder in that repo for modeling-specific prompts (field shapes, reuse, buckets).

**Deeper documentation in `gharo-content-models` (phases 0–4 vs 5–8)**

- [ ] Use **phases 0–4** to document foundational modeling decisions:
  - 0 – Modeling setup (naming, buckets, environments).
  - 1 – Core entities and relationships (Person, Page, Section).
  - 2 – Reusable components (skills, projects, links).
  - 3 – IA for each bucket (what each page/section is for).
  - 4 – Initial content seeding strategy (what gets authored first, by whom).
- [ ] Use **phases 5–8** to capture refinement and scaling decisions:
  - 5 – Changes driven by content feedback (fields that were missing, over-modeled, or confusing).
  - 6 – Linking patterns across buckets (e.g. Projects referenced from both landing page and a dedicated projects bucket).
  - 7 – Performance and editorial UX (entry counts, reference depth, editor UI tweaks).
  - 8 – Cross-repo integration notes:
    - How UI code expects data.
    - How Agent checkpoints caught modeling issues early.
- [ ] Add concrete examples in `content-modeling-decisions.md` showing:
  - Before/after of a modeling decision (e.g. splitting `project` vs `caseStudy`).
  - How Agent feedback influenced the model (e.g. removing layout-specific fields, renaming ambiguous fields).

**Future-facing ideas**

- [ ] Design a second bucket (e.g. “Notes” or “Blog index”) that:
  - Reuses the AgentOps + Contentful pattern.
  - Shares common components (SEO, layout, SectionRenderer where it makes sense).
- [ ] Consider a small “System Overview” page or doc that:
  - Explains Buckets, phases, and modeling decisions as part of your portfolio story.
- [ ] Explore adding a minimal analytics layer later (GA4 or similar) with clear documentation on what’s tracked and why.

```

