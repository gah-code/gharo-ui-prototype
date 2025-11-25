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
