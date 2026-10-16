import type { Role } from './types';

/** Most recent first. Estimates are labelled as estimates in the copy itself. */
export const experience: Role[] = [
  {
    organisation: 'Whistler',
    role: 'Mobile & Frontend Engineer',
    period: '2025 — Present',
    start: 2025,
    location: 'Remote · Freelance',
    summary:
      'Lead engineer on the Whistler mobile app, web client and admin dashboard; sole engineer on the web client.',
    highlights: [
      'Lead engineer on the React Native + Expo app on Google Play (TypeScript, Redux Toolkit, React Query): feeds, moments, realtime chat over Socket.IO, events and attendance, leaderboards and tiers, and community insight dashboards.',
      'Built an on-device fastText interest classifier in pure JavaScript — 30 categories, offline, no native modules. Training reported 99% precision; re-evaluated without train/test overlap it scores 60–64% precision@1 (chance: 3.3%).',
      'Push notifications (FCM + Notifee), deep linking, Google / Apple / Facebook sign-in, theming and dark mode; Sentry, Mixpanel and Firebase Analytics.',
      'Built Whistler Admin: React 19, Vite, Tailwind CSS, TanStack Query and Table, React Hook Form + Zod and Recharts — user management, moderation, moments review, activity logs and a six-tab analytics suite; serverless API routes, a signed Vercel deploy webhook, CI, pre-commit hooks and MSW / Vitest tests.',
      'Release management: Gradle Android builds and EAS over-the-air channels for staged development and production rollouts.',
      'Sole engineer on Whistler Web (Next.js 16, React 19, TypeScript, TanStack Query, Socket.IO): 52 routes, Google sign-in, guest access, live username checks, load-on-scroll paging and 43 unit test files.',
      'Added an in-browser post classifier to Whistler Web: all-MiniLM-L6-v2 sentence embeddings on ONNX Runtime Web, matched to community categories and cached on the device after the first download.',
      'CI/CD for Whistler Web: format, lint, type and unit checks, Playwright e2e, Docker smoke tests and dependency audits, with an enforced dev → staging → prod flow to Cloudflare Workers and a VPS over SSH; a public landing page and link previews for shared posts and profiles.',
      'Prototyped an AI community engine on elizaOS (TypeScript): four AI personas that reply to posts, start discussions and summarise threads, with rate limiting, per-user memory in PostgreSQL, Prometheus metrics, Docker and 28 test files.',
      'Built the app download landing page: a single CSP-safe file deployed through GitHub Actions, served for share links opened without the app installed.',
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
      'Frontend engineer on the Clientshot platform; lead engineer on Clientshot Public; first author of the Device Intelligence backend and the SeamHealth blog.',
    highlights: [
      'Responsive web applications in Angular, React, TypeScript and CSS, and reusable component libraries adopted across 3+ internal products.',
      'Designed and consumed REST APIs, validating data consistency so malformed responses were caught before reaching production dashboards.',
      'Clientshot: 416 commits across the customer app, admin console and v3 — form flows, complaint workflows, billing, notifications and operator tooling (Angular, TypeScript, RxJS).',
      'Redesigned the Clientshot v3 complaint workflow to match Figma: the Update Status modal, an assignee picker with member roles, and tag changes held until the update is applied.',
      'Lead engineer on Clientshot Public (React 19, TypeScript, TanStack Query, Zustand): organisation and industry directories, a 4-step review flow, sign-up and password reset, member and organiser modules — 47 of 118 commits and 95 of its 108 test files.',
      'Device Intelligence: wrote the first FastAPI backend for device fingerprinting and risk scoring (SQLAlchemy, Alembic, Docker, an AWS ECS Fargate + RDS deployment path), and added live GPS location to its reporting in Clientshot Pulse.',
      'SeamHealth blog: first version in Next.js 16 + Sanity, with newsletter deliverability checks, rate limiting, CSP, structured logging and CI.',
      'ELSRT: real-time validation and error handling for lab data entry, and high-volume processing work — manual verification time down by an estimated 30%.',
      'LLM evaluation and RLHF: prompt design, rubric-based review of model output, and flags for hallucinated or inconsistent responses.',
      'Agile / Scrum: sprint planning, weekly code reviews and daily stand-ups; technical documentation and acceptance criteria for 15+ feature releases.',
    ],
    projects: [
      'clientshot',
      'clientshot-public',
      'device-intelligence',
      'seamhealth-blog',
      'elsrt',
      'llm-evaluation',
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
      'Developed and maintained internal web applications in Angular and React, improving reliability through root-cause analysis and regression testing.',
      'Built reusable UI component libraries — new-feature development time down by an estimated 15%.',
      'Reviewed peer code against internal engineering standards before deployment, with structured, actionable feedback.',
      'Turned stakeholder requirements into technical specifications and acceptance criteria, reducing miscommunication between design and engineering.',
    ],
    projects: [],
  },
];
