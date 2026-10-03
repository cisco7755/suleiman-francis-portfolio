import type { Role } from './types';

/** Most recent first. Estimates are labelled as estimates in the copy itself. */
export const experience: Role[] = [
  {
    organisation: 'Whistler',
    role: 'Mobile & Frontend Engineer',
    period: '2025 — Present',
    start: 2025,
    location: 'Remote',
    summary:
      'Lead engineer on the Whistler mobile app; built the Whistler Admin dashboard and the Whistler Web client.',
    highlights: [
      'Lead engineer on the React Native + Expo app on Google Play: feeds, moments, realtime chat over Socket.IO, events, leaderboards and tiers, and community insight dashboards.',
      'Built an on-device fastText interest classifier in pure JavaScript — 30 categories, offline, no native modules.',
      'Push notifications (FCM + Notifee), deep linking, Google / Apple / Facebook sign-in, theming and dark mode; Sentry, Mixpanel and Firebase Analytics.',
      'Built Whistler Web: a Next.js 16 client with 52 routes, server-side route protection, 23 unit test files, Playwright e2e and signed Docker images.',
      'Built Whistler Admin: React 19, TypeScript, TanStack Query and Table, Zustand and Recharts, with GitHub Actions CI and a signed Vercel webhook.',
      'Release management: Gradle Android builds and EAS over-the-air channels for development and production.',
    ],
    projects: ['whistler-mobile', 'whistler-web', 'whistler-admin'],
  },
  {
    organisation: 'SeamHealth Group',
    role: 'Frontend / Full-Stack Engineer',
    period: '2023 — Present',
    start: 2023,
    location: 'Abuja, Nigeria · Hybrid',
    summary:
      'Frontend engineer on the Clientshot platform; lead contributor on Clientshot Public, the Device Intelligence backend and the SeamHealth blog.',
    highlights: [
      'Clientshot: 416 commits across the customer app, admin console and v3 — form flows, complaint workflows, billing, notifications and operator tooling (Angular, TypeScript, RxJS).',
      'Clientshot Public: largest contributor (36 of 71 commits) — React 19 and TypeScript, real API integration, and all 88 test files.',
      'Device Intelligence: wrote the initial FastAPI backend for device fingerprinting and risk scoring, hardened it for production and scaffolded the AWS ECS + RDS deployment.',
      'SeamHealth blog: initial Next.js 16 + Sanity implementation with rate limiting, CSP, structured logging and CI.',
      'ELSRT: real-time validation and error handling for lab data entry — manual verification time down by an estimated 30%.',
      'Reusable component libraries adopted across 3+ internal products; weekly PR review across Angular and React — post-release defects down by an estimated 25%.',
      'Integrated and evaluated LLM features: prompt design, rubric-based review, and hallucination and inconsistency flags.',
    ],
    projects: [
      'clientshot',
      'clientshot-public',
      'device-intelligence',
      'seamhealth-blog',
      'elsrt',
    ],
  },
  {
    organisation: 'Nigeria Civil Defence Corps HQ',
    role: 'Software Developer',
    period: '2022 — 2023',
    start: 2022,
    location: 'Abuja, Nigeria · Hybrid',
    summary: 'Built and maintained internal web applications.',
    highlights: [
      'Developed and maintained internal web applications in Angular and React.',
      'Built reusable UI component libraries — new-feature development time down by an estimated 15%.',
      'Reviewed peer code against internal engineering standards before deployment.',
      'Turned stakeholder requirements into technical specifications and acceptance criteria.',
    ],
    projects: [],
  },
];
