# gharo-ui-prototype

[![Version](https://img.shields.io/badge/version-v0.1.0-blue)](./VERSION)
[![Last Commit](https://img.shields.io/github/last-commit/gah-code/gharo-ui-prototype)](https://github.com/gah-code/gharo-ui-prototype/commits/main)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-orange?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

Single-page personal landing page  prototype built with a **UI-first, CMS-second** approach for jump starting with Contentful.

This repo focuses on **Bucket 1**: a single-page landing that tells my professional story and demonstrates how I think about **web interfaces, content systems, and deployment** as one coherent system.

Structure version: `v0.1.0`  
See [`VERSION`](./VERSION) and [`CHANGELOG.md`](./CHANGELOG.md) for history.
![Lighthouse Performance](https://img.shields.io/badge/Performance-99-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-96-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-brightgreen?logo=lighthouse&logoColor=white)
![Lighthouse PWA](https://img.shields.io/badge/PWA-30-lightgrey?logo=lighthouse&logoColor=white)

---

## Table of Contents

1. [Project Goals](#1-project-goals)  
2. [Status & Tracking](#2-status--tracking)  
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

- Build a **single-page** personal landing site that:
  - Shows my path as a web engineer.
  - Is easy to scan for hiring managers and collaborators.
- Keep implementation **clean, typed, and maintainable**:
  - Strong TypeScript types between UI and data.
  - Layout and content concerns separated.
- Treat the project as a small **web system**, not just a page:
  - UI prototype → Contentful model → CMS integration → deploy.
- Use an explicit **Agent Checkpoint** loop:
  - Capture relevant code for each phase.
  - Ask targeted questions.
  - Log decisions in `agent/CHECKPOINT_LOG.md`.

---

## 2. Status & Tracking

- **Structure version:** `v0.1.0` (see `VERSION`)
- **Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)
- **Phases completed:** 0–7  
  - Setup, static data shape, UI, tokens, UX/a11y, Contentful model, CMS integration.
- **Phase in progress:** 8 (SEO, Lighthouse, and deployment polish)
- **Phase planned:** 9 (hardening & roadmap)

---

## 3. Tech Stack

### Core

- **Vite + React** (SPA)
- **TypeScript**
- **CSS** with design tokens:
  - `tokens.css` – colors, typography, spacing, radii.
  - `layout.css` – base layout, sections, header, responsive behavior.

### Content & Data

- **Contentful** (dev/master environment)
  - Content model lives in a sibling repo: `gharo-content-models`.
  - This app reads a single `pagePersonalLanding` entry with:
    - `slug: "/"`,
    - ordered `sections[]` referencing `sectionHero`, `sectionTimeline`, `sectionSkills`, `sectionProjects`, `sectionLearning`, `sectionContact`.

- **Static TS fallback**
  - `personalLandingPage` object implements the same TS types as the CMS data.
  - Used as a **typed fallback** when CMS fetch fails or while debugging.

### AgentOps

- Manual AI checkpoints per phase:
  - Checkpoint payloads under `agent/checkpoints/`.
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
- **Lighthouse (CI)**
  - `@netlify/plugin-lighthouse` configured via `netlify.toml`.
  - Reports used in Phase 8 “SEO & Lighthouse Review”.

> Gatsby is **not** used. This is a Vite + React SPA with a custom Contentful integration.

---

## 4. Architecture & Folder Structure

```text
gharo-ui-prototype/
  VERSION
  README.md
  CHANGELOG.md
  package.json
  tsconfig.json
  .eslintrc.cjs
  .prettierrc
  .gitignore
  .env.example              # template for Contentful env vars (no secrets)
  netlify.toml              # Netlify build + Lighthouse plugin config
  .nvmrc                    # Node version hint for CI/Netlify

  agent/
    CHECKPOINT_LOG.md       # log of agent checkpoints + decisions
    checkpoints/            # markdown payloads/prompts per phase (cp1, cp2, ..., cp8)
    scripts/
      buildCheckpointPayload.mjs
                            # helper to bundle code into a checkpoint payload

  src/
    main.tsx                # Vite entrypoint, mounts <App />
    App.tsx                 # wraps the Page component

    data/
      page-personal-landing.ts
                            # TS types for page + sections + static fallback data

    services/
      contentfulClient.ts   # Contentful CDA client using VITE_* env vars
      fetchPersonalLandingPage.ts
                            # Fetches pagePersonalLanding from Contentful and
                            # maps it into the existing TS types

    components/
      layout/
        Page.tsx            # top-level layout (header, skip link, main, sections)

      sections/
        SectionRenderer.tsx # routes a PageSection to the right section view
        HeroSection.tsx
        TimelineSection.tsx
        SkillsSection.tsx
        ProjectsSection.tsx
        LearningSection.tsx
        ContactSection.tsx

      Seo.tsx               # sets document.title + meta description (SPA-friendly SEO)

    styles/
      tokens.css            # design tokens
      layout.css            # global + layout styles

  public/
    # static assets served as-is (favicons, etc.) – optional
````

---

## 5. Data Flow

### 5.1 CMS → Typed data

- `services/contentfulClient.ts`

  - Creates a Contentful CDA client using:

    - `VITE_CONTENTFUL_SPACE_ID`
    - `VITE_CONTENTFUL_ENVIRONMENT`
    - `VITE_CONTENTFUL_DELIVERY_TOKEN`

- `services/fetchPersonalLandingPage.ts`

  - Calls Contentful for:

    - `content_type: "pagePersonalLanding"`
    - `fields.slug: "/"`,
    - with `include` depth to bring in sections and supporting entries.
  - Maps entries into the TS types from `data/page-personal-landing.ts`:

    - `PersonalLandingPage`
    - Section types (`HeroSection`, `TimelineSection`, `SkillsSection`, `ProjectsSection`, `LearningSection`, `ContactSection`).
  - Uses:

    - Section mapper registry (content type ID → mapper),
    - Safe array helpers,
    - Defensive defaults so optional fields and unknown sections don’t break the UI.

### 5.2 Typed data → UI

- `components/layout/Page.tsx`

  - On mount:

    - Calls `fetchPersonalLandingPage()`.
    - If successful:

      - Stores the `PersonalLandingPage` in state and renders via `SectionRenderer`.
    - If CMS fetch fails:

      - Logs a warning and falls back to the static `personalLandingPage` object.
  - Renders:

    - Skip link
    - Sticky header + nav
    - `<main>` with all sections

- `components/sections/SectionRenderer.tsx`

  - Receives a `PageSection` union.
  - Switches on `section.sectionType` to render the correct section view.
  - Keeps UI insulated from raw CMS shapes.

- `components/Seo.tsx`

  - Sets `document.title` and `<meta name="description">` using `page.meta`.

---

## 6. Getting Started

### Prerequisites

- Node **18+** or **20+** (matching `.nvmrc`)
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a local env file:

```bash
cp .env.example .env.local
```

Then fill it in (do **not** commit `.env.local`):

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ENVIRONMENT=dev_or_master
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

Open the preview URL (usually `http://localhost:4173`) and run Lighthouse in Chrome.

---

## 7. Development Scripts

Common npm scripts:

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
- `npm run build` – production build (used by Netlify).
- `npm run preview` – serve the production build locally.
- `npm run lint` – TypeScript/JS linting via ESLint.
- `npm run format` – apply Prettier formatting.
- `npm run agent:build` – generate a checkpoint payload with selected files.

---

## 8. AgentOps Workflow

Each meaningful change goes through a **Checkpoint**:

1. Use `agent:build` (or a saved checkpoint file) to collect relevant code/config.
2. Paste payload into ChatGPT/Codex/Netlify AI.
3. Ask 3–4 tight questions about design, structure, or correctness.
4. Apply changes and log the outcome in `agent/CHECKPOINT_LOG.md`.

Key checkpoints:

- CP1 – Static data shape
- CP2 – SectionRenderer + components
- CP3 – Tokens + layout CSS
- CP4 – UX & a11y
- CP5 – Contentful model JSON
- CP6 – Narrative & content
- CP7 – Integration & mapping
- CP8 – SEO & Lighthouse (Netlify plugin)

The checkpoints effectively turn the repo into a small, traceable **system design exercise**.

---

## 9. Deployment (Netlify)

### Link site

```bash
netlify login
netlify link        # choose the correct site (e.g. my-landing-page-2026)
```

### Set environment variables

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

Netlify picks up `netlify.toml` automatically and runs the Lighthouse plugin.

---

## 10. Phases & Roadmap

- **Phase 0 – Setup** ✅
- **Phase 1 – Static Data Shape** ✅
- **Phase 2 – Layout & Structure** ✅
- **Phase 3 – Visual Design & Tokens** ✅
- **Phase 4 – UX & Accessibility Polish** ✅
- **Phase 5 – Contentful Model** ✅
- **Phase 6 – Seed Content** ✅
- **Phase 7 – CMS Integration & Mapping** ✅
- **Phase 8 – Go Live + SEO/Lighthouse** 🔄 (in progress)
- **Phase 9 – Hardening & Roadmap** ⏳ (planned)

---

## 11. Best Practices & To-Dos

**Best practices already in place**

- Typed boundary between CMS data and UI.
- No secrets committed to the repo (`.env.local` and CI env vars only).
- Linting + formatting configured.
- Explicit agent checkpoints and a decision log.
- Lighthouse plugin integrated into Netlify builds.

**Nice next steps (to-do list)**

- [ ] Tune design tokens for even better contrast and readability based on Lighthouse a11y results.
- [ ] Add structured data (JSON-LD Person / WebSite) for SEO.
- [ ] Add lightweight tests for mappers in `fetchPersonalLandingPage.ts`.
- [ ] Consider a small “Projects” or “Blog” route reusing the same Contentful + AgentOps patterns.
- [ ] Document content modeling decisions in more depth in `gharo-content-models`.

This README is meant to be both a **map of the system** and a **working checklist** as the project evolves.
