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
