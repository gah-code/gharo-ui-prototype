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
