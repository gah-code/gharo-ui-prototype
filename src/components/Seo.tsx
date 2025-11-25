// src/components/Seo.tsx
import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
}

const DEFAULT_TITLE = 'Gilberto Haro – Web Engineer & Creative Technologist';
const DEFAULT_DESCRIPTION =
  'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.';

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title;
    const nextTitle = title || DEFAULT_TITLE;
    document.title = nextTitle;

    const metaDesc =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
        return m;
      })();

    metaDesc.setAttribute(
      'content',
      description && description.trim().length > 0 ? description : DEFAULT_DESCRIPTION
    );

    // Optional: ensure lang is set, in case index.html forgot
    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', 'en');
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);

  return null;
}

// import { useEffect } from 'react';

// interface SeoProps {
//   title: string;
//   description?: string;
// }

// const DEFAULT_TITLE = 'Gilberto Haro – Web Engineer & Creative Technologist';
// const DEFAULT_DESCRIPTION =
//   'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.';

// export function Seo({ title, description }: SeoProps) {
//   useEffect(() => {
//     const prevTitle = document.title;
//     document.title = title;

//     const metaDesc =
//       document.querySelector('meta[name="description"]') ??
//       (() => {
//         const m = document.createElement('meta');
//         m.name = 'description';
//         document.head.appendChild(m);
//         return m;
//       })();

//     if (description) {
//       metaDesc.setAttribute('content', description);
//     }

//     return () => {
//       document.title = prevTitle;
//     };
//   }, [title, description]);

//   return null;
// }
