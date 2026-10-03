import type { Project } from '../types';

/** Verified against SeamHealth's Clientshot-public repository: 36 of 71 commits (largest contributor), Sep 2026. */
export const clientshotPublic: Project = {
  slug: 'clientshot-public',
  name: 'Clientshot Public',
  featured: false,
  headline:
    'Building the public side of a feedback platform: discovery, reviews and contributor rewards.',
  summary:
    'Public Clientshot site where people browse organisations by industry, write and track feedback, and earn points and badges  React 19, strict TypeScript and 88 test files.',
  metaDescription:
    'Case study: Clientshot Public, where Suleiman Francis was the largest contributor — a React 19 and TypeScript app with a modular architecture, real API integration and 88 test files.',
  role: 'Lead contributor · frontend',
  timeline: 'Sep 2026 — Present',
  team: 'Small frontend team; I authored about half the commits.',
  platform: 'Web · public site',
  category: 'Consumer web · Reviews & community',
  organisation: 'SeamHealth Group',
  stack: [
    'React 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'React Router',
    'TanStack Query',
    'Zustand',
    'React Hook Form',
    'Zod',
    'Vitest',
    'Testing Library',
  ],
  tags: ['React 19', 'TypeScript', 'Vitest', 'Zod', 'Design system'],
  disciplines: ['frontend'],
  outcome:
    'Largest contributor: 36 of 71 commits, every one of the 88 test files, and the real API and auth integration.',
  confidentiality:
    'Clientshot Public is a SeamHealth Group product. No screenshots, code or customer data are shown.',
  cover: { kind: 'diagram' },
  caseStudy: {
    context: [
      'Clientshot Public is the consumer side of Clientshot. People browse organisations by industry, read and write reviews, follow the resolution of feedback they’ve submitted, and earn points and badges for contributing.',
    ],
    responsibility: {
      owned: [
        'The app shell and configuration, and the move to a modular, domain-based structure',
        'Industries directory and organisation profiles: cards, filters, reviews and testimonials',
        'The member area: my reviews with conversation threads, leaderboard, points and badges, notifications and settings',
        'Auth: sign-in, sign-up, password reset and email verification',
        'The four-step write-feedback flow',
        'Integration with the backend API and real authentication',
        'The test suite — all 88 test files',
        'Shared UI: a self-contained data table and pagination, and normalised border and shadow tokens',
      ],
      collaborated: [
        'Other modules and fixes with the rest of the frontend team',
        'Designs from Figma; tickets and review through the team’s process',
      ],
    },
    challenge: [
      'A public review site has to be easy to browse while signed out, safe to use while signed in, and faithful to a detailed design across many screens  directories, profiles, a multi-step submission flow, a rewards system and account settings.',
      'The first version also ran on a mock backend, so the architecture had to make the switch to the real API a contained change rather than a rewrite.',
    ],
    constraints: [
      {
        title: 'Built ahead of the backend',
        body: 'Screens were built against a client-side mock before the API existed.',
      },
      {
        title: 'Design fidelity',
        body: 'Many screens with a detailed Figma spec, so shared components had to absorb the visual detail once.',
      },
      {
        title: 'Shared repository',
        body: 'Several engineers working in parallel, so structure and boundaries mattered.',
      },
    ],
    architecture: {
      title: 'Clientshot Public',
      layers: [
        {
          label: 'Routes',
          nodes: ['Public pages', 'Public-only auth pages', 'Protected member pages'],
        },
        {
          label: 'Modules',
          nodes: ['auth', 'industries', 'organization', 'feedback', 'member', 'home'],
        },
        {
          label: 'Shared',
          nodes: ['Design system (shared/ui)', 'API client', 'Zod validation', 'Stores'],
        },
        { label: 'State', nodes: ['TanStack Query — server data', 'Zustand — auth & toasts'] },
        { label: 'Backend', nodes: ['Clientshot API'] },
      ],
      caption: 'Simplified. Each module owns its pages, components and API services.',
      notes: [
        'Each domain is a module with its own components, pages and api/*.service.ts files; shared/ui is the only design system.',
        'Protected routes redirect to sign-in; sign-in pages redirect already-signed-in visitors to their reviews.',
      ],
    },
    decisions: [
      {
        title: 'Organise by domain module, not by file type',
        problem:
          'Auth, directories, feedback and member features were spread across shared folders, so changes touched many places.',
        options: [
          'Keep type-based folders (components, pages, services)',
          'One module per domain with a shared layer',
        ],
        tradeoffs:
          'Moving code is disruptive while others are working; type-based folders scale badly as features grow.',
        decision:
          'Move each domain into src/modules/* and shared UI, icons and assets into src/shared.',
        reason: 'A feature should be readable and changeable in one place.',
        result:
          'Auth, industries, organisations, feedback and the member area each live in one module.',
      },
      {
        title: 'Put every API call behind a service boundary',
        problem:
          'The UI had to be built before the backend existed, without baking the mock into components.',
        options: [
          'Call fetch from components',
          'Module services that start as mocks and become real clients',
        ],
        tradeoffs:
          'Direct calls are quicker at first; a service layer is extra structure that pays off at integration time.',
        decision:
          'Each module talks to the backend only through its api/*.service.ts files over one shared client.',
        reason: 'Replacing the mock should change services, not screens.',
        result:
          'The switch to the real API and real authentication landed as a focused integration change.',
      },
    ],
    implementation: [
      {
        title: 'Write feedback',
        body: 'A four-step review submission modal.',
      },
      {
        title: 'Forms',
        body: 'React Hook Form with Zod schemas; a shared FormField handles labels, errors and accessibility wiring.',
      },
      {
        title: 'Routing',
        body: 'React Router with lazy-loaded routes, protected and public-only guards, and separate layouts for public, auth and member pages.',
      },
      {
        title: 'Testing',
        body: 'Vitest and Testing Library across components, forms and modules — 88 test files.',
      },
    ],
    production: [
      {
        title: 'Quality',
        body: 'Strict TypeScript, ESLint and Prettier, with type-checking as part of the build.',
      },
      { title: 'Hosting', body: 'Built and deployed through AWS Amplify.' },
    ],
    outcome: {
      summary: [
        'I built most of the public site and all of its tests, then connected it to the real backend and authentication.',
      ],
      metrics: [
        {
          label: 'Commits authored',
          basis: 'measured',
          value: '36 of 71',
          note: 'Largest contributor, from git history.',
        },
        { label: 'Test files', basis: 'measured', value: '88', note: 'All authored by me.' },
        {
          label: 'Public usage',
          basis: 'unavailable',
          value: null,
          note: 'Impact metric unavailable.',
        },
      ],
    },
    lessons: [
      'Building against a mock is only cheap if the mock sits behind the same boundary the real API will use. Because it did, integration changed services rather than screens.',
    ],
    next: [
      'Contract tests between the service layer and the API, so backend changes are caught before they reach the UI.',
      'Pre-render the public directory pages for search engines.',
    ],
  },
};
