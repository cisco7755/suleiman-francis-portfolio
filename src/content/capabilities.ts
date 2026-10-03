import type { Capability, ProcessStep } from './types';

/** Organised by discipline; each carries the evidence for where it was used. */
export const capabilities: Capability[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    evidence:
      'Whistler Web and the SeamHealth blog in Next.js; Whistler Admin and Clientshot Public in React 19; Clientshot in Angular; component libraries used across 3+ internal products.',
    skills: [
      'React',
      'Angular',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Redux Toolkit',
      'TanStack Query',
      'Component architecture',
      'Accessibility',
      'Responsive systems',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    evidence:
      'The Device Intelligence service in Python and FastAPI; REST API design and integration at SeamHealth; a signed webhook function for Whistler Admin; the Socket.IO realtime client in Whistler.',
    skills: [
      'Node.js',
      'Python',
      'FastAPI',
      'Express',
      'REST APIs',
      'JWT',
      'RBAC',
      'PostgreSQL',
      'MongoDB',
      'Caching',
      'Validation',
      'WebSockets',
      'SQLAlchemy + Alembic',
      'Docker',
      'AWS (ECS, RDS)',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    evidence:
      'Whistler: a React Native + Expo app on Google Play with push, deep links, social sign-in and over-the-air releases.',
    skills: [
      'React Native',
      'Expo',
      'Flutter',
      'Offline-first architecture',
      'Push notifications',
      'Deep linking',
      'Native integrations',
      'Play Store / App Store deployment',
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    evidence:
      'The on-device fastText classifier in Whistler; LLM prompt design and rubric-based response evaluation at SeamHealth.',
    skills: [
      'OpenAI and Anthropic APIs',
      'Prompt engineering',
      'Response evaluation',
      'RAG fundamentals',
      'Hallucination detection',
      'On-device classification',
      'Model behaviour analysis',
    ],
  },
  {
    id: 'practice',
    label: 'Engineering practice',
    evidence:
      'GitHub Actions CI, Docker images, Playwright e2e, Vitest, Jest and pytest suites, Sentry, Mixpanel, Firebase Analytics, k6 load tests.',
    skills: [
      'Git and GitHub',
      'CI/CD (GitHub Actions)',
      'Docker',
      'Testing (Vitest, Playwright, pytest)',
      'Code review',
      'Documentation',
      'Agile / Scrum',
      'Observability',
      'Product analytics',
    ],
  },
];

export const approach: ProcessStep[] = [
  {
    label: 'Understand',
    description:
      'Clarify requirements, constraints, users, data, and the business goal behind the request.',
  },
  {
    label: 'Architect',
    description:
      'Choose boundaries, state ownership, API contracts, data structures and dependencies deliberately.',
  },
  {
    label: 'Build',
    description: 'Write modular, typed code with abstractions that earn their place.',
  },
  {
    label: 'Test',
    description:
      'Check behaviour with unit, integration and regression tests — including realistic failure cases.',
  },
  {
    label: 'Ship',
    description:
      'Automate builds and releases, and stage them through environments before production.',
  },
  {
    label: 'Observe',
    description:
      'Use crash reporting, logs and analytics to see how the software behaves for real users.',
  },
  {
    label: 'Improve',
    description:
      'Iterate on evidence. Measure before claiming, and say so when something hasn’t been measured.',
  },
];

/** Only tools actually used in shipped work. */
export const productionPipeline: ProcessStep[] = [
  {
    label: 'Code',
    description: 'Typed code, with pre-commit hooks as the first gate.',
    tools: ['TypeScript', 'Husky + lint-staged'],
  },
  {
    label: 'Pull request',
    description: 'Every change reviewed before merge.',
    tools: ['GitHub', 'Bitbucket'],
  },
  {
    label: 'Tests',
    description: 'Unit and integration tests; end-to-end tests run against a mock API.',
    tools: ['Vitest', 'Jest', 'Playwright', 'pytest'],
  },
  {
    label: 'CI',
    description: 'Lint, types, tests, dependency audit and build gate every pull request.',
    tools: ['GitHub Actions', 'Dependabot'],
  },
  {
    label: 'Build',
    description: 'Reproducible web, container and native builds.',
    tools: ['Vite', 'Docker', 'Gradle', 'EAS'],
  },
  {
    label: 'Deploy',
    description: 'Staged release channels; JS-only fixes over the air.',
    tools: ['Vercel', 'Cloudflare Workers', 'EAS Update', 'Google Play'],
  },
  {
    label: 'Monitor',
    description: 'Crashes, errors and product usage in production.',
    tools: ['Sentry', 'Mixpanel', 'Firebase Analytics'],
  },
  {
    label: 'Iterate',
    description: 'Load-test risky paths and feed findings into the next change.',
    tools: ['k6'],
  },
];

/** The credibility strip under the hero. Each value is backed by the case studies. */
export const signals: { label: string; value: string; detail: string }[] = [
  { label: 'Experience', value: '4+ years', detail: 'Shipping production software since 2022' },
  { label: 'Web', value: 'React · Angular', detail: 'Dashboards, forms, component libraries' },
  { label: 'Mobile', value: 'React Native', detail: 'Live on Google Play' },
  { label: 'Backend', value: 'Node.js · Python', detail: 'APIs, auth, realtime, risk scoring' },
  { label: 'AI / LLM', value: 'On-device ML', detail: 'And LLM response evaluation' },
  { label: 'Production', value: 'Observed', detail: 'Sentry, analytics, staged releases' },
];
