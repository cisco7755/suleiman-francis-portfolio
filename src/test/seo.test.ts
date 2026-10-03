import { describe, expect, it } from 'vitest';
import { pageMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/site';
import { caseStudySchema, personSchema, serializeJsonLd } from '@/lib/structured-data';
import { projects } from '@/content/projects';

describe('seo helpers', () => {
  it('builds canonical and social metadata from one input', () => {
    const meta = pageMetadata({ title: 'Work', description: 'd', path: '/work' });
    expect(meta.alternates?.canonical).toBe('/work');
    expect(meta.openGraph).toMatchObject({ title: 'Work', url: '/work' });
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('resolves absolute URLs without double slashes', () => {
    expect(absoluteUrl('/work/elsrt')).toMatch(/^https?:\/\/[^/]+\/work\/elsrt$/);
  });

  it('describes the person with verified profile links', () => {
    const person = personSchema();
    expect(person['@type']).toBe('Person');
    expect(person.sameAs).toHaveLength(2);
  });

  it('links each case study to the person', () => {
    const schema = caseStudySchema(projects[0]);
    expect(schema.author['@id']).toBe(personSchema()['@id']);
  });

  it('escapes < so JSON-LD cannot close its script tag', () => {
    expect(serializeJsonLd({ x: '</script><script>' })).not.toContain('</script>');
  });
});
