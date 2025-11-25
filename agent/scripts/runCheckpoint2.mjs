import { buildCheckpointPayload } from './buildCheckpointPayload.mjs';

const payload = buildCheckpointPayload({
  name: 'SectionRenderer + Components Review',
  description: [
    'SectionRenderer consumes static data and renders one of several section components.',
    'Goal: keep this future-proof for Contentful and avoid tight coupling between layout and data.',
  ].join(' '),
  files: [
    'src/components/sections/SectionRenderer.tsx',
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/TimelineSection.tsx',
  ],
});

console.log(payload);
