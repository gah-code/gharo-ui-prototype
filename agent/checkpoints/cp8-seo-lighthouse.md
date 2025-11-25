# Agent Checkpoint: Phase 8 – SPA SEO & Lighthouse Review

## Context

The personal landing page (`gharo-ui-prototype`) is now:

- Served via Netlify (Vite build).
- Powered by Contentful for content.
- Using:
  - `src/components/layout/Page.tsx` for main layout.
  - `src/components/Seo.tsx` (or equivalent) for document title/meta description.
  - `src/styles/tokens.css` and `src/styles/layout.css` for design and typography.
- Integrated with the **Netlify Lighthouse plugin** via `netlify.toml`, which runs Lighthouse on each production build.

Goal for this checkpoint:

- Use Lighthouse results + current markup to identify **high-impact SEO / accessibility / UX fixes**.
- Ensure the SPA is "good enough" for:
  - Recruiters / hiring managers (clear message, good headings).
  - Basic search engine visibility (name searches, portfolio queries).
  - Accessibility baselines.

## Artifacts

Key files (assume they are open in the workspace):

- `netlify.toml`
  - Lighthouse plugin config and build setup.
- `src/components/layout/Page.tsx`
  - Main layout, header/nav, sections, skip link.
- `src/components/Seo.tsx`
  - SEO component that sets `<title>` and meta description.
- `src/styles/tokens.css`
  - Design tokens for colors, typography, spacing.
- `src/styles/layout.css`
  - Layout, section spacing, responsive behavior.

Additional context (to be pasted inline when running this checkpoint):

- Summary of the latest Lighthouse scores (Desktop and/or Mobile), e.g.:
  - Performance: X
  - Accessibility: Y
  - Best Practices: Z
  - SEO: W
- Top 3–5 Lighthouse issues reported (copy/paste from the Netlify plugin report or local Lighthouse run).

## Tasks for the Agent

### Task 1 – Head, Title & Meta

- [ ] Review how `Seo.tsx` sets `document.title` and meta description.
- [ ] Confirm that:
  - The page has a clear, descriptive `<title>` including my name.
  - There is exactly one meta description and it’s not empty.
- [ ] Suggest any improvements to:
  - Title format (e.g. “Name – Role | Portfolio”).
  - Description wording for scan-ability and search.

### Task 2 – Headings & Structure

- [ ] Examine the heading hierarchy implied by `Page.tsx` and section components:
  - Ensure the hero uses a single `<h1>`.
  - Ensure main sections use `<h2>` consistently.
- [ ] Identify any heading-level jumps (e.g. `h1` → `h3`) and suggest concrete markup changes to fix them.

### Task 3 – Accessibility & Lighthouse A11y Issues

- [ ] Use the provided Lighthouse Accessibility report summary to:
  - Confirm or refute issues like low contrast, missing labels, or bad landmark usage.
- [ ] Propose small, targeted changes in:
  - `tokens.css` (contrast, font sizes).
  - `layout.css` (focus states, link styles).
  - Component markup (e.g. adding `aria-label`s, improving link text).

### Task 4 – SEO & SPA Realities

- [ ] Given this is a Vite SPA (no SSR/SSG), review:
  - Whether current SEO basics are covered (title, description, headings, content depth, link text).
  - Any low-hanging fruit that improves how this page looks in search results (e.g. adding structured data later, consistent naming).
- [ ] Suggest concrete improvements that are **realistic in this SPA setup**, not requiring a full move to Next/Gatsby.

### Task 5 – Lighthouse Plugin Integration

- [ ] Review the `netlify.toml` plugin config:
  - Verify thresholds are either appropriate or not yet needed.
  - Suggest default thresholds that make sense for this kind of portfolio (e.g. aim for >= 0.9 on Accessibility/SEO).
- [ ] Recommend how to use Lighthouse output as a lightweight “quality gate” without blocking deploys unnecessarily.

## Output Format

Please respond with:

1. A short **summary** of current SEO/a11y strengths and weaknesses.
2. A prioritized list (top 5) of **concrete, high-impact changes**, grouped by file:
   - `netlify.toml`
   - `src/components/Seo.tsx`
   - `src/components/layout/Page.tsx`
   - `src/styles/tokens.css`
   - `src/styles/layout.css`
3. Code-level suggestions:
   - Snippets or diff-style patches for changing headings, meta tags, tokens, or CSS rules.

## Questions

1. Given the current Lighthouse scores and setup, what are the top 3 changes that will most improve Accessibility and SEO without changing the overall architecture?
2. Is the current heading and landmark structure appropriate for a single-page personal site aimed at recruiters and collaborators?
3. Are there any small tweaks to tokens or layout that would noticeably improve readability and scan-ability (on both desktop and mobile)?
4. What Lighthouse thresholds would you recommend baking into `netlify.toml` for this project so that future changes don’t quietly regress the UX/SEO quality?
