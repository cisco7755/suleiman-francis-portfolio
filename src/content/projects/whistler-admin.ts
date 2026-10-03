import type { Project } from '../types';

/** Verified against the whistler-admin repository (35 of 38 commits are mine; the rest came from a shared team account. Dec 2025 – Aug 2026). */
export const whistlerAdmin: Project = {
  slug: 'whistler-admin',
  name: 'Whistler Admin',
  featured: false,
  headline: 'Building the operational control plane for a community platform.',
  summary:
    'Internal dashboard for user management, moderation, moments review, activity logs and a six-tab analytics suite.',
  metaDescription:
    'Case study: Whistler Admin, built solo by Suleiman Francis with React 19, Vite, TypeScript, TanStack Query and Table, Zustand and Recharts — route guards, a signed Vercel webhook and CI.',
  role: 'Sole engineer · built and shipped',
  timeline: 'Dec 2025 — Present',
  team: 'Sole engineer on the dashboard; the backend API is shared with the mobile app.',
  platform: 'Web · internal tool',
  category: 'Data-heavy web application',
  organisation: 'Whistler',
  stack: [
    'React 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'TanStack Query',
    'TanStack Table',
    'React Hook Form',
    'Zustand',
    'Zod',
    'Recharts',
    'React Router',
    'Vercel',
    'GitHub Actions',
  ],
  tags: ['React 19', 'TypeScript', 'TanStack', 'Zustand', 'Analytics'],
  disciplines: ['frontend', 'backend'],
  outcome:
    'Shipped as the platform’s operations tool: nine feature areas, a six-tab analytics suite, and CI that gates every change.',
  confidentiality:
    'Screenshots are not shown because the dashboard displays real member data. The architecture below is simplified.',
  cover: { kind: 'diagram' },
  caseStudy: {
    context: [
      'Running a community platform takes an operational surface: finding and managing members, moderating communities, reviewing moments, auditing activity, and understanding growth.',
      'The mobile app serves members. Whistler Admin serves the people who run the platform.',
    ],
    responsibility: {
      owned: [
        'The whole dashboard — 35 of the repository’s 38 commits; the other three came from a shared team account',
        'Feature areas: dashboard, users, communities, moderation, moments, activity logs, notifications, auth and analytics',
        'The six-tab analytics suite: overview, user behaviour, growth and retention, content, communities, and moments',
        'A Vercel serverless function that verifies signed deploy webhooks and posts build status to the team’s WhatsApp group',
        'GitHub Actions CI and Husky + lint-staged pre-commit hooks',
      ],
      collaborated: [
        'The backend API, shared with the mobile app and maintained separately',
        'Requirements from the people operating the platform',
      ],
    },
    challenge: [
      'Admin tools are where dense data and consequential actions meet: tables that need filtering, moderation actions that are hard to reverse, and charts people use to make decisions.',
      'The interface has to be quick to scan and hard to misuse, and it has to stay correct while the data underneath it changes.',
    ],
    constraints: [
      {
        title: 'Real accounts',
        body: 'Every moderation action changes live member data, so mutations have to refresh every view they affect.',
      },
      {
        title: 'Shared backend',
        body: 'The dashboard consumes the same API as the mobile app. Server-side logic the browser shouldn’t run lives in a serverless function deployed with it.',
      },
      {
        title: 'One engineer',
        body: 'With nobody else reviewing, automated checks — types, lint, tests, build — are the review.',
      },
    ],
    architecture: {
      title: 'Whistler Admin',
      layers: [
        {
          label: 'Routes',
          nodes: ['Guest routes', 'Private routes', 'Protected routes (token + auth state)'],
        },
        {
          label: 'Features',
          nodes: ['Users', 'Communities', 'Moderation', 'Moments', 'Activity logs', 'Analytics'],
        },
        {
          label: 'State',
          nodes: ['TanStack Query — server state', 'Zustand — auth session & search'],
        },
        {
          label: 'UI',
          nodes: ['TanStack Table', 'React Hook Form', 'Recharts', 'Shared components'],
        },
        { label: 'Edge', nodes: ['Vercel function: signed deploy webhook → WhatsApp'] },
        { label: 'Backend', nodes: ['Whistler REST API'] },
      ],
      caption: 'Simplified. The backend is shared with the mobile app.',
      notes: [
        'Server data lives in TanStack Query. Mutations invalidate the queries they affect (there are 20 invalidation points), so lists refresh after an action instead of being patched by hand.',
        'Zustand holds only what the server doesn’t own: the persisted auth session and the global search term.',
        'Configuration is validated with a Zod schema at startup, so a missing environment variable fails immediately instead of surfacing as a broken request later.',
      ],
    },
    decisions: [
      {
        title: 'TanStack Query for server state; Zustand only for client state',
        problem: 'Nearly everything the dashboard shows is remote data that changes underneath it.',
        options: [
          'One global store for everything',
          'Fetch in each component with local state',
          'TanStack Query for server data, a small store for the rest',
        ],
        tradeoffs:
          'A single store needs hand-written caching and invalidation. Per-component fetching duplicates loading and error handling. Splitting the two adds a library but gives each kind of state the right tool.',
        decision:
          'TanStack Query owns server data; Zustand holds the auth session (persisted) and the search term.',
        reason:
          'After a moderation action, the affected lists should refresh by invalidating their queries — not by manually patching several stores.',
        result:
          'Mutations across 11 files refresh their views through query invalidation; the client store stays two small slices.',
      },
      {
        title: 'Verify webhook signatures before acting on them',
        problem:
          'The team wanted build notifications in WhatsApp, which means a public endpoint that anyone could call.',
        options: [
          'Trust any request to the endpoint',
          'Poll Vercel for deployment status',
          'Accept Vercel’s signed webhooks and verify the HMAC',
        ],
        tradeoffs:
          'An unverified endpoint can be used to spam the group. Polling is slow and wasteful. Verification needs a shared secret managed as an environment variable.',
        decision:
          'A Vercel serverless function checks the HMAC-SHA1 signature against the webhook secret, then posts build started / succeeded / failed / cancelled messages via CallMeBot.',
        reason:
          'A notification endpoint is still an endpoint; it should only act on requests it can verify.',
        result:
          'The team sees build status — branch, author, commit message — without watching Vercel.',
      },
      {
        title: 'CI as the reviewer',
        problem: 'As the only engineer on the dashboard, nobody else was reviewing changes.',
        options: [
          'Rely on manual testing',
          'Pre-commit hooks only',
          'Pre-commit hooks plus CI on every push and PR',
        ],
        tradeoffs:
          'Manual testing doesn’t scale. Hooks can be skipped. CI adds a few minutes per change.',
        decision:
          'Husky + lint-staged locally; GitHub Actions runs lint, a full type check, tests, and then the production build.',
        reason:
          'The build only runs once quality checks pass, so a broken change never reaches deploy.',
        result:
          'Every push and pull request to main is gated on lint, types, tests and a successful build.',
      },
    ],
    implementation: [
      {
        title: 'Routing and access',
        body: 'Three route guards: guest-only pages, private pages, and protected pages that require both a stored token and authenticated state.',
      },
      {
        title: 'Analytics',
        body: 'Six tabs — overview, user behaviour, growth and retention, content performance, community performance and moments — built on shared Recharts area and bar chart cards.',
      },
      {
        title: 'Feedback',
        body: 'Toasts confirm mutations and surface API errors; a modal provider keeps dialogs consistent across features.',
      },
      {
        title: 'Testing',
        body: 'Vitest, Testing Library and jsdom are set up and wired into CI. Coverage is thin so far — one component test.',
      },
    ],
    production: [
      { title: 'Hosting', body: 'Deployed on Vercel together with the webhook function.' },
      {
        title: 'Build notifications',
        body: 'Signed Vercel deploy events are turned into WhatsApp messages for the team.',
      },
      {
        title: 'Quality gates',
        body: 'GitHub Actions: lint → type check → tests → build. Husky + lint-staged before every commit.',
      },
    ],
    outcome: {
      summary: [
        'Whistler Admin is the tool the team uses to run the platform: user management, moderation, moments review, activity logs and analytics in one place.',
      ],
      metrics: [
        {
          label: 'Commits authored',
          basis: 'measured',
          value: '35 of 38',
          note: 'From git history, Dec 2025 – Aug 2026; the rest are from a shared team account.',
        },
        {
          label: 'Analytics tabs',
          basis: 'measured',
          value: '6',
          note: 'Overview, behaviour, growth, content, communities, moments.',
        },
        {
          label: 'Operator time saved',
          basis: 'unavailable',
          value: null,
          note: 'Impact metric unavailable.',
        },
      ],
    },
    lessons: [
      'Most state management in a dashboard is cache management. Once server data lived in TanStack Query with explicit invalidation, the only client state left was small enough to fit in two Zustand slices.',
      'Test infrastructure isn’t test coverage. CI runs the suite on every change, but with one test it mostly proves the pipeline works, the next investment is tests for the destructive flows.',
    ],
    next: [
      'Tests for moderation and user-management mutations, with the network mocked at the HTTP layer (MSW is already installed).',
      'Zod schemas for the forms themselves, not just environment configuration.',
      'Mirror backend role permissions in the UI so actions an operator can’t perform are never offered.',
    ],
  },
};
