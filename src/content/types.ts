/**
 * Content model. Every page renders from these shapes; no page hardcodes
 * project, experience or capability copy.
 */

export type DisciplineId = 'frontend' | 'backend' | 'mobile' | 'ai';

/**
 * How a number was obtained. The UI always shows this next to the value so a
 * reader can tell a measurement from an estimate, sees when a number has been
 * replaced by a better measurement (superseded), and gets an explicit
 * "not measured" rather than an invented figure.
 */
export type EvidenceBasis = 'measured' | 'estimate' | 'superseded' | 'unavailable';

export type Metric =
  | { label: string; basis: 'measured' | 'estimate' | 'superseded'; value: string; note: string }
  | { label: string; basis: 'unavailable'; value: null; note: string };

export interface Figure {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export type Device = 'mobile' | 'tablet' | 'desktop';

/** One screenshot in a project's carousel: what it shows, and at which device size. */
export interface DeviceView {
  device: Device;
  /** Short screen name shown in the carousel footer, e.g. “Analytics”. */
  title: string;
  figure: Figure;
}

export interface ArchitectureLayer {
  label: string;
  nodes: string[];
}

export interface Architecture {
  title: string;
  layers: ArchitectureLayer[];
  caption: string;
}

export interface Flow {
  title: string;
  steps: { label: string; detail?: string }[];
  caption?: string;
}

export interface Decision {
  title: string;
  problem: string;
  options: string[];
  tradeoffs: string;
  decision: string;
  reason: string;
  result: string;
}

export interface Note {
  title: string;
  body: string;
}

export interface CodeExcerpt {
  title: string;
  language: string;
  code: string;
  caption: string;
}

export interface Spotlight {
  id: string;
  title: string;
  intro: string;
  rationale: string[];
  flow: Flow;
  evaluation: { summary: string[]; metrics: Metric[] };
  code?: CodeExcerpt;
}

export interface CaseStudy {
  context: string[];
  responsibility: { owned: string[]; collaborated: string[] };
  challenge: string[];
  constraints: Note[];
  architecture: Architecture & { notes: string[] };
  /** Optional: only included when there were alternatives worth showing. */
  exploration?: Note[];
  decisions: Decision[];
  implementation: Note[];
  production: Note[];
  outcome: { summary: string[]; metrics: Metric[] };
  lessons: string[];
  next: string[];
  gallery?: Figure[];
  /** Screenshots shown in the card and case-study carousels, in display order. */
  showcase?: DeviceView[];
  /** Optional deep-dive block rendered after Key decisions (used for the classifier). */
  spotlight?: Spotlight;
}

export interface Project {
  slug: string;
  name: string;
  /** Featured projects appear on the homepage; the rest under “More work”. */
  featured: boolean;
  /** The case-study title: what was built, framed as the engineering problem. */
  headline: string;
  /** One line used on cards. */
  summary: string;
  /** Unique meta description for the case-study route. */
  metaDescription: string;
  role: string;
  timeline: string;
  team: string;
  platform: string;
  category: string;
  organisation: string;
  stack: string[];
  tags: string[];
  disciplines: DisciplineId[];
  /** One-line verified outcome for the card. */
  outcome: string;
  /** Present for employer-owned products: explains what is withheld and why. */
  confidentiality?: string;
  /** Card visual: the architecture diagram, or a carousel of caseStudy.showcase ending on it. */
  cover: { kind: 'diagram' } | { kind: 'showcase' };
  caseStudy: CaseStudy;
}

export interface Role {
  organisation: string;
  role: string;
  period: string;
  start: number;
  location: string;
  summary: string;
  highlights: string[];
  projects: string[];
}

export interface Capability {
  id: DisciplineId | 'practice';
  label: string;
  evidence: string;
  skills: string[];
}

export interface Essay {
  title: string;
  summary: string;
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
}

export interface DisciplinePage {
  id: DisciplineId;
  label: string;
  title: string;
  description: string;
  essay: Essay;
}

export interface ProcessStep {
  label: string;
  description: string;
  tools?: string[];
}
