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
