import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { capabilities, approach, productionPipeline, signals } from '@/content/capabilities';
import { disciplines } from '@/content/engineering';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import type { Figure } from '@/content/types';

const PUBLIC_DIR = join(process.cwd(), 'public');

/** Words the copywriting rules forbid unless backed by evidence — so: never. */
const BANNED = [
  'passionate',
  'innovative',
  'cutting-edge',
  'revolutionary',
  'next-generation',
  'seamless',
  'seamlessly',
  'powerful',
  'world-class',
  'ninja',
  'enthusiast',
  'craftsman',
  'problem solver',
  'lorem',
  'ipsum',
];

/** Every user-facing string in a content tree. Code samples are not prose, so they are skipped. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) if (key !== 'code') collectStrings(item, out);
  }
  return out;
}

const allCopy = collectStrings({
  profile,
  projects,
  experience,
  capabilities,
  approach,
  productionPipeline,
  signals,
  disciplines,
});

describe('copy', () => {
  it.each(BANNED)('never uses “%s”', (word) => {
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    const offenders = allCopy.filter((text) => pattern.test(text));
    expect(offenders).toEqual([]);
  });

  it('contains no placeholder markers', () => {
    const offenders = allCopy.filter((text) => /\b(TODO|TBD|FIXME)\b|\[[A-Za-z ]+\]/.test(text));
    expect(offenders).toEqual([]);
  });
});

describe('projects', () => {
  it('have unique slugs and unique meta descriptions', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.metaDescription)).size).toBe(projects.length);
  });

  it('feature exactly four projects on the homepage', () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(4);
  });

  it.each(projects.map((p) => [p.slug, p] as const))(
    '%s follows the case-study template',
    (_slug, project) => {
      const study = project.caseStudy;
      expect(study.context.length).toBeGreaterThan(0);
      expect(study.responsibility.owned.length).toBeGreaterThan(0);
      expect(study.responsibility.collaborated.length).toBeGreaterThan(0);
      expect(study.challenge.length).toBeGreaterThan(0);
      expect(study.constraints.length).toBeGreaterThan(0);
      expect(study.architecture.layers.length).toBeGreaterThan(1);
      expect(study.decisions.length).toBeGreaterThan(0);
      expect(study.implementation.length).toBeGreaterThan(0);
      expect(study.production.length).toBeGreaterThan(0);
      expect(study.outcome.metrics.length).toBeGreaterThan(0);
      expect(study.lessons.length).toBeGreaterThan(0);
      expect(study.next.length).toBeGreaterThan(0);
      for (const decision of study.decisions) {
        expect(decision.options.length).toBeGreaterThan(1);
      }
    },
  );

  it('keep meta descriptions within search-snippet length', () => {
    for (const project of projects) {
      expect(project.metaDescription.length).toBeLessThanOrEqual(230);
    }
  });

  it('label employer-owned products, and only show their screens from test environments', () => {
    for (const project of projects.filter((p) => p.organisation === 'SeamHealth Group')) {
      expect(project.confidentiality).toBeTruthy();
      const showsScreens =
        project.cover.kind !== 'diagram' || project.caseStudy.gallery || project.caseStudy.showcase;
      if (showsScreens)
        expect(project.confidentiality).toMatch(/development environment with test data/);
    }
  });
});

describe('metrics', () => {
  const metrics = projects.flatMap((p) => [
    ...p.caseStudy.outcome.metrics,
    ...(p.caseStudy.spotlight?.evaluation.metrics ?? []),
  ]);

  it('label every estimate as an estimate', () => {
    for (const metric of metrics.filter((m) => m.basis === 'estimate')) {
      expect(metric.note.toLowerCase()).toContain('estimate');
    }
  });

  it('say “unavailable” instead of inventing a number', () => {
    for (const metric of metrics.filter((m) => m.basis === 'unavailable')) {
      expect(metric.value).toBeNull();
      expect(metric.note).toMatch(/unavailable/i);
    }
  });

  it('never present the inflated classifier score without its caveat', () => {
    const inflated = metrics.filter((m) => m.value === '99.0%');
    expect(inflated.length).toBeGreaterThan(0);
    for (const metric of inflated) expect(metric.note).toMatch(/inflated/i);
  });
});

describe('assets', () => {
  const figures: Figure[] = projects.flatMap((p) => [
    ...(p.caseStudy.gallery ?? []),
    ...(p.caseStudy.showcase ?? []).map((view) => view.figure),
  ]);

  it.each(figures.map((f) => [f.src, f] as const))('%s exists and has alt text', (src, figure) => {
    expect(existsSync(join(PUBLIC_DIR, src))).toBe(true);
    expect(figure.alt.length).toBeGreaterThan(20);
  });

  it('only uses a showcase cover when there are at least two views to cycle', () => {
    for (const project of projects.filter((p) => p.cover.kind === 'showcase')) {
      expect(project.caseStudy.showcase?.length ?? 0).toBeGreaterThan(1);
    }
  });

  it('gives every carousel screen a short title for the footer', () => {
    for (const view of projects.flatMap((p) => p.caseStudy.showcase ?? [])) {
      expect(view.title.length).toBeGreaterThan(0);
      expect(view.title.length).toBeLessThanOrEqual(24);
    }
  });

  it('ships the résumé PDF', () => {
    expect(existsSync(join(PUBLIC_DIR, profile.resume.href))).toBe(true);
  });
});

describe('cross-references', () => {
  const slugs = new Set(projects.map((p) => p.slug));

  it('experience links only to existing case studies', () => {
    for (const role of experience)
      for (const slug of role.projects) expect(slugs.has(slug)).toBe(true);
  });

  it('every discipline has a capability group and at least one evidence project', () => {
    for (const discipline of disciplines) {
      expect(capabilities.some((c) => c.id === discipline.id)).toBe(true);
      expect(projects.some((p) => p.disciplines.includes(discipline.id))).toBe(true);
    }
  });
});
