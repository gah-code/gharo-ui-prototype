import { describe, expect, it } from 'vitest';
import type { HeroSection } from '../data/page-personal-landing';
import type { AnyEntry } from './fetchPersonalLandingPage';
import { mapSectionFromEntry } from './fetchPersonalLandingPage';

function makeEntry(typeId: string, fields: Record<string, unknown>) {
  return {
    sys: {
      id: 'test-id',
      contentType: { sys: { id: typeId } },
    },
    fields,
  };
}

describe('mapSectionFromEntry', () => {
  it('maps a sectionHero entry into a HeroSection', () => {
    const entry = makeEntry('sectionHero', {
      anchorId: 'top',
      title: 'Gilberto Haro',
      eyebrow: 'Web Engineer',
      tagline: 'I build web platforms.',
      intro: 'Short intro.',
      primaryActionLabel: 'View projects',
      primaryActionHref: '#projects',
      highlights: ['Highlight one', 'Highlight two'],
    });

    const mapped = mapSectionFromEntry(entry) as HeroSection;

    expect(mapped?.sectionType).toBe('hero');
    expect(mapped?.anchorId).toBe('top');
    expect(mapped?.title).toBe('Gilberto Haro');
    expect(mapped?.primaryAction).toEqual({
      label: 'View projects',
      href: '#projects',
      kind: 'primary',
    });
    expect(mapped?.highlights).toEqual(['Highlight one', 'Highlight two']);
  });

  it('returns null for unsupported content types', () => {
    const badEntry = makeEntry('unknownType', {}) as AnyEntry;

    const result = mapSectionFromEntry(badEntry);

    expect(result).toBeNull();
  });
});
