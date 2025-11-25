import { personalLandingPage } from '../../data/page-personal-landing';
import { SectionRenderer } from '../sections/SectionRenderer';

export function Page() {
  const { sections } = personalLandingPage;

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header-inner">
          <a href="#top" className="logo">
            GH
          </a>
          <nav className="page-nav" aria-label="Primary">
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#learning">Learning</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}
