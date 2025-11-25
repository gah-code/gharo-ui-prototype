// src/components/PersonSchema.tsx
export function PersonSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gilberto Haro',
    jobTitle: 'Web Engineer & Creative Technologist',
    description:
      'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.',
    url: 'https://gilbertoharo.com',
    sameAs: ['https://www.linkedin.com/in/your-handle', 'https://github.com/your-user'],
  };

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
