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
