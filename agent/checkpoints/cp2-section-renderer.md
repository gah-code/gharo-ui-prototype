
> gharo-ui-prototype@0.0.0 agent:build
> node agent/scripts/buildCheckpointPayload.mjs SectionRenderer + Components Review SectionRenderer consumes the typed static page model and renders one component per section. src/components/sections/SectionRenderer.tsx src/components/sections/HeroSection.tsx src/components/sections/TimelineSection.tsx src/components/sections/SkillsSection.tsx src/components/sections/ProjectsSection.tsx src/components/sections/LearningSection.tsx src/components/sections/ContactSection.tsx

# Agent Checkpoint: SectionRenderer + Components Review

## Context

SectionRenderer consumes the typed static page model and renders one component per section.

## Artifacts

### File: src/components/sections/SectionRenderer.tsx

```ts
import type {
  PageSection,
  HeroSection,
  TimelineSection,
  SkillsSection,
  ProjectsSection,
  LearningSection,
  ContactSection,
} from '../../data/page-personal-landing';
import { HeroSectionView } from './HeroSection';
import { TimelineSectionView } from './TimelineSection';
import { SkillsSectionView } from './SkillsSection';
import { ProjectsSectionView } from './ProjectsSection';
import { LearningSectionView } from './LearningSection';
import { ContactSectionView } from './ContactSection';

interface SectionRendererProps {
  section: PageSection;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.sectionType) {
    case 'hero':
      return (
        <section id={section.anchorId} className="section section-hero">
          <HeroSectionView section={section as HeroSection} />
        </section>
      );
    case 'timeline':
      return (
        <section id={section.anchorId} className="section section-timeline">
          <TimelineSectionView section={section as TimelineSection} />
        </section>
      );
    case 'skills':
      return (
        <section id={section.anchorId} className="section section-skills">
          <SkillsSectionView section={section as SkillsSection} />
        </section>
      );
    case 'projects':
      return (
        <section id={section.anchorId} className="section section-projects">
          <ProjectsSectionView section={section as ProjectsSection} />
        </section>
      );
    case 'learning':
      return (
        <section id={section.anchorId} className="section section-learning">
          <LearningSectionView section={section as LearningSection} />
        </section>
      );
    case 'contact':
      return (
        <section id={section.anchorId} className="section section-contact">
          <ContactSectionView section={section as ContactSection} />
        </section>
      );
    default:
      return null;
  }
}

```

### File: src/components/sections/HeroSection.tsx

```ts
import type { HeroSection } from '../../data/page-personal-landing';

interface Props {
  section: HeroSection;
}

export function HeroSectionView({ section }: Props) {
  return (
    <div className="hero">
      {section.eyebrow && <p className="hero-eyebrow">{section.eyebrow}</p>}
      <h1 className="hero-title">{section.title}</h1>
      <p className="hero-tagline">{section.tagline}</p>
      <p className="hero-intro">{section.intro}</p>

      <div className="hero-actions">
        {section.primaryAction && (
          <a href={section.primaryAction.href} className="button button-primary">
            {section.primaryAction.label}
          </a>
        )}
        {section.secondaryAction && (
          <a href={section.secondaryAction.href} className="button button-secondary">
            {section.secondaryAction.label}
          </a>
        )}
      </div>

      {section.highlights && section.highlights.length > 0 && (
        <ul className="hero-highlights">
          {section.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

```

### File: src/components/sections/TimelineSection.tsx

```ts
import type { TimelineSection } from '../../data/page-personal-landing';

interface Props {
  section: TimelineSection;
}

export function TimelineSectionView({ section }: Props) {
  return (
    <div className="timeline">
      <h2>{section.title}</h2>
      <ol className="timeline-list">
        {section.items.map((item) => (
          <li key={item.id} className="timeline-item">
            <div className="timeline-item-header">
              <h3>{item.title}</h3>
              {item.organization && <span className="timeline-org">{item.organization}</span>}
            </div>
            <div className="timeline-meta">
              <span>
                {item.startDate} – {item.endDate ?? 'present'}
              </span>
              {item.location && <span className="timeline-location">{item.location}</span>}
            </div>
            {item.summary && <p className="timeline-summary">{item.summary}</p>}
            {item.highlights && (
              <ul className="timeline-highlights">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

```

### File: src/components/sections/SkillsSection.tsx

```ts
import type { SkillsSection } from '../../data/page-personal-landing';

interface Props {
  section: SkillsSection;
}

export function SkillsSectionView({ section }: Props) {
  return (
    <div className="skills">
      <h2>{section.title}</h2>
      <div className="skills-groups">
        {section.groups.map((group) => (
          <div key={group.id} className="skills-group">
            <h3>{group.label}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill.id}>
                  <span className="skill-name">{skill.name}</span>
                  {skill.level && <span className="skill-level"> · {skill.level}</span>}
                  {skill.keywords && (
                    <span className="skill-keywords"> — {skill.keywords.join(', ')}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

```

### File: src/components/sections/ProjectsSection.tsx

```ts
import type { ProjectsSection } from '../../data/page-personal-landing';

interface Props {
  section: ProjectsSection;
}

export function ProjectsSectionView({ section }: Props) {
  return (
    <div className="projects">
      <div className="section-heading">
        <h2>{section.title}</h2>
        {section.featured && <span className="pill">Featured</span>}
      </div>
      <div className="projects-grid">
        {section.projects.map((project) => (
          <article key={project.id} className="project-card">
            <h3>{project.name}</h3>
            {project.tagline && <p className="project-tagline">{project.tagline}</p>}
            <p className="project-summary">{project.summary}</p>
            <div className="project-meta">
              {project.role && <span>{project.role}</span>}
              {project.period && <span>{project.period}</span>}
            </div>
            {project.techStack && (
              <p className="project-tech">Tech: {project.techStack.join(', ')}</p>
            )}
            {project.links && (
              <div className="project-links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} className="project-link">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

```

### File: src/components/sections/LearningSection.tsx

```ts
import type { LearningSection } from '../../data/page-personal-landing';

interface Props {
  section: LearningSection;
}

export function LearningSectionView({ section }: Props) {
  return (
    <div className="learning">
      <h2>{section.title}</h2>
      <ul className="learning-list">
        {section.items.map((item) => (
          <li key={item.id} className="learning-item">
            <div className="learning-item-header">
              <h3>{item.topic}</h3>
              {item.status && <span className="pill">{item.status}</span>}
            </div>
            {item.description && <p className="learning-description">{item.description}</p>}
            {item.linkHref && item.linkLabel && (
              <a href={item.linkHref} className="learning-link">
                {item.linkLabel}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

```

### File: src/components/sections/ContactSection.tsx

```ts
import type { ContactSection } from '../../data/page-personal-landing';

interface Props {
  section: ContactSection;
}

export function ContactSectionView({ section }: Props) {
  return (
    <div className="contact">
      <h2>{section.title}</h2>
      <p className="contact-intro">{section.intro}</p>
      <div className="contact-links">
        <a href={`mailto:${section.email}`} className="button button-primary">
          Email me
        </a>
        {section.links.map((link) => (
          <a key={link.id} href={link.href} className="button button-secondary">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

```

## Questions

- [ ] Fill in specific questions here before sending to ChatGPT
- [ ] Are the boundaries between data (page-personal-landing) and layout (components) clean, or is anything too tightly coupled?
- [ ] Is this SectionRenderer pattern a good foundation for later swapping in Contentful data without blowing up the components?
