# gharo-ui-prototype

Single-page personal Web engineering site prototype built with a **UI-first, CMS-second** approach.

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
