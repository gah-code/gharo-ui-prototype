import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const metaDesc =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
        return m;
      })();

    if (description) {
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);

  return null;
}
