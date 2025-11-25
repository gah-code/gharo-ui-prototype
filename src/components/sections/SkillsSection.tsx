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
