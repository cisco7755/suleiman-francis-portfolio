import { disciplines } from '@/content/engineering';
import { projects } from '@/content/projects';
import type { DisciplineId, Project } from '@/content/types';

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsBySlugs(slugs: readonly string[]): Project[] {
  return slugs.map(getProject).filter((project): project is Project => project !== undefined);
}

export function getProjectsForDiscipline(id: DisciplineId): Project[] {
  return projects.filter((project) => project.disciplines.includes(id));
}

export function getDiscipline(id: string) {
  return disciplines.find((discipline) => discipline.id === id);
}

/** The project after `slug`, wrapping to the first — used for "Next case study". */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
