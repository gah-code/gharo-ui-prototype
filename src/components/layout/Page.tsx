// import { personalLandingPage } from '../../data/page-personal-landing';
// import { SectionRenderer } from '../sections/SectionRenderer';

// export function Page() {
//   const { sections } = personalLandingPage;

//   return (
//     <div className="page" id="top">
//       <a href="#main-content" className="skip-link">
//         Skip to main content
//       </a>
//       <header className="page-header">
//         <div className="page-header-inner">
//           <a href="#top" className="logo" aria-label="Back to top">
//             GH
//           </a>
//           <nav className="page-nav" aria-label="Primary navigation">
//             <a href="#experience">Experience</a>
//             <a href="#skills">Skills</a>
//             <a href="#projects">Projects</a>
//             <a href="#learning">Learning</a>
//             <a href="#contact">Contact</a>
//           </nav>
//         </div>
//       </header>

//       <main id="main-content" tabIndex={-1}>
//         {sections.map((section) => (
//           <SectionRenderer key={section.id} section={section} />
//         ))}
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import type { PersonalLandingPage } from '../../data/page-personal-landing';
import { personalLandingPage as fallbackPage } from '../../data/page-personal-landing';
import { SectionRenderer } from '../sections/SectionRenderer';
import { PersonSchema } from '../PersonSchema';

import { Seo } from '../Seo';

import { fetchPersonalLandingPage } from '../../services/fetchPersonalLandingPage';

export function Page() {
  const [page, setPage] = useState<PersonalLandingPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchPersonalLandingPage()
      .then((cmsPage) => {
        if (isMounted) {
          setPage(cmsPage);
        }
      })
      .catch((err) => {
        console.error('[Page] Failed to fetch CMS page, falling back to static data.', err);
        if (isMounted) {
          setError('cms');
          setPage(fallbackPage);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!page) {
    return (
      <div className="page" id="top">
        <main id="main-content">
          <p style={{ padding: '2rem' }}>Loading…</p>
        </main>
      </div>
    );
  }

  const { sections } = page;

  return (
    <div className="page" id="top">
      <Seo title={page.meta.title} description={page.meta.description} />
      <PersonSchema />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="page-header">
        <div className="page-header-inner">
          <a href="#top" className="logo" aria-label="Back to top">
            GH
          </a>
          <nav className="page-nav" aria-label="Primary navigation">
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#learning">Learning</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        {error === 'cms' && (
          <p style={{ padding: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
            Showing static fallback content while CMS is unavailable.
          </p>
        )}

        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}
