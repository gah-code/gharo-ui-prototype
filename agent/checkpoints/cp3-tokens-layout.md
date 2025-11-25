
> gharo-ui-prototype@0.0.0 agent:build
> node agent/scripts/buildCheckpointPayload.mjs Tokens + Layout CSS Review Global design tokens and base layout/styles for the personal single-page app, including header, hero, timeline, and section spacing. src/styles/tokens.css src/styles/layout.css

# Agent Checkpoint: Tokens + Layout CSS Review

## Context

Global design tokens and base layout/styles for the personal single-page app, including header, hero, timeline, and section spacing.

## Artifacts

### File: src/styles/tokens.css

```css
:root {
  /* Colors */
  --color-bg: #050816;
  --color-surface: #0b1020;
  --color-accent: #3dd6b8;
  --color-accent-soft: #1d3640;
  --color-text: #f5f5f7;
  --color-muted: #a0a3b1;
  --color-border: #23263a;

  /* Typography */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.5rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-pill: 999px;

  /* Shadow */
  --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.35);
}

```

### File: src/styles/layout.css

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: var(--font-sans);
  background: radial-gradient(circle at top, #10152c 0, var(--color-bg) 45%);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

.page {
  min-height: 100vh;
}

/* Header */

.page-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(18px);
  background: linear-gradient(to bottom, rgba(5, 8, 22, 0.95), rgba(5, 8, 22, 0.8), transparent);
  border-bottom: 1px solid var(--color-border);
}

.page-header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  text-decoration: none;
  color: var(--color-text);
}

.page-nav {
  display: flex;
  gap: var(--space-4);
  font-size: var(--font-size-sm);
}

.page-nav a {
  color: var(--color-muted);
  text-decoration: none;
}

.page-nav a:hover {
  color: var(--color-text);
}

/* Sections */

.section {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-4);
}

.section + .section {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

/* Hero */

.section-hero {
  padding-top: var(--space-16);
}

.hero-eyebrow {
  font-size: var(--font-size-sm);
  color: var(--color-accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.hero-title {
  font-size: var(--font-size-3xl);
  margin: 0 0 var(--space-2);
}

.hero-tagline {
  font-size: var(--font-size-lg);
  color: var(--color-muted);
  margin: 0 0 var(--space-4);
}

.hero-intro {
  max-width: 40rem;
  font-size: var(--font-size-base);
  line-height: 1.6;
  margin: 0 0 var(--space-6);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  text-decoration: none;
  border: 1px solid transparent;
}

.button-primary {
  background: var(--color-accent);
  color: #050816;
}

.button-secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.hero-highlights {
  list-style: none;
  padding: 0;
  margin: var(--space-4) 0 0;
  display: grid;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

/* Timeline */

.timeline h2 {
  margin: 0 0 var(--space-4);
}

.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-4);
}

.timeline-item {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-border);
}

.timeline-item-header {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: baseline;
  margin-bottom: var(--space-1);
}

.timeline-item-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
}

.timeline-org {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

.timeline-meta {
  font-size: var(--font-size-xs);
  color: var(--color-muted);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.timeline-summary {
  font-size: var(--font-size-sm);
  margin: 0 0 var(--space-2);
}

.timeline-highlights {
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

/* Projects */

.section-heading {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-2);
  height: 1.5rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.projects-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-top: var(--space-4);
}

.project-card {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.project-tagline {
  margin: 0 0 var(--space-2);
  color: var(--color-muted);
}

.project-summary {
  margin: 0 0 var(--space-2);
  line-height: 1.5;
}

.project-meta {
  display: flex;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-muted);
  margin-bottom: var(--space-2);
}

.project-tech {
  margin: 0 0 var(--space-2);
  color: var(--color-muted);
}

.project-links {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.project-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
}

/* Skills */

.skills-groups {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.skills-group h3 {
  margin-bottom: var(--space-2);
}

.skills-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-2);
}

.skill-name {
  font-weight: 600;
}

.skill-level,
.skill-keywords {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
}

/* Learning */

.learning-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-3);
}

.learning-item {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.learning-item-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.learning-description {
  margin: 0 0 var(--space-2);
  color: var(--color-muted);
}

.learning-link {
  color: var(--color-accent);
  text-decoration: none;
}

/* Contact */

.contact-intro {
  max-width: 38rem;
  line-height: 1.6;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

/* Basic responsiveness */

@media (max-width: 640px) {
  .page-header-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-nav {
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .section {
    padding: var(--space-8) var(--space-4);
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .hero-tagline {
    font-size: var(--font-size-base);
  }
}

```

## Questions

- [ ]1. Are these tokens (colors, type scale, spacing) structured so I can extend or theme later without a full rewrite?
- [ ]2. Does the section spacing and typography scale make sense for a content-heavy, scrollable single page?
- [ ] 3. Any obvious a11y issues (contrast, font sizes) or layout pitfalls on small screens that I should fix early?
- [ ]4. Would you reorganize any of the CSS to better separate “tokens”, “layout primitives”, and “component styles”?
