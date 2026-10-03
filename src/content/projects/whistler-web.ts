import type { DeviceView, Figure, Project } from '../types';

const mobileHome: Figure = {
  src: '/work/whistler-web/mobile-home-safari.png',
  alt: 'Whistler Web home at phone width: an “Email Not Verified” banner with a verify link, a greeting, community filters (All communities, Hot & Trending, For You, Public), a Hot & Trending Communities carousel, a bottom tab bar, and Safari’s address bar below. The email address, community photos and URL are replaced with grey blocks.',
  width: 808,
  height: 1572,
  caption:
    'Mobile: a bottom tab bar and a horizontal community carousel, matching the native app — running in Safari. Email address, user photos and URL redacted.',
};

const tabletHome: Figure = {
  src: '/work/whistler-web/tablet-home.png',
  alt: 'Whistler Web home on a tablet in portrait: a left sidebar (Communities, Moments, Newsfeed, Messages, Notifications, Create, Your space) beside a single column of Hot & Trending community cards with community filters above. The address bar and community photos are replaced with grey blocks.',
  width: 1154,
  height: 1562,
  caption:
    'Tablet: the sidebar stays, the discovery column drops away, and community cards stack in a single column. Address bar and user photos redacted.',
};

const desktopHome: Figure = {
  src: '/work/whistler-web/desktop-home.png',
  alt: 'Whistler Web home on a laptop: a left sidebar (Communities, Moments, Newsfeed, Messages, Notifications, Create, Your space), community filters across the top, Hot & Trending community cards in the centre, and suggested communities, people to follow and upcoming events on the right. The address bar and community photos are replaced with grey blocks.',
  width: 2040,
  height: 1366,
  caption:
    'Desktop: a three-column layout — navigation, the communities feed, and discovery — rather than the phone layout stretched wide. Address bar and user photos redacted.',
};

/** The home screen at each device size. */
const homeShowcase: DeviceView[] = [
  { device: 'mobile', title: 'Home', figure: mobileHome },
  { device: 'tablet', title: 'Home', figure: tabletHome },
  { device: 'desktop', title: 'Home', figure: desktopHome },
];

/** Verified against the wistler-web-version repository (all 29 human-authored commits are mine, Sep – Oct 2026). */
export const whistlerWeb: Project = {
  slug: 'whistler-web',
  name: 'Whistler Web',
  featured: true,
  headline: 'Bringing a mobile-first community platform to the web without forking its behaviour.',
  summary:
    'Next.js web client for Whistler: 52 routes across feed, communities, moments, messages and settings, sharing the mobile app’s API, tokens and error handling.',
  metaDescription:
    'Case study: Whistler Web, a Next.js 16 client built by Suleiman Francis — server-side route protection, a static public surface, Playwright e2e against a mock API, and signed Docker images.',
  role: 'Sole engineer',
  timeline: 'Sep 2026 — Present · in active development',
  team: 'Sole engineer; the backend API is shared with the mobile app.',
  platform: 'Web · Next.js App Router',
  category: 'Web application · Production infrastructure',
  organisation: 'Whistler',
  stack: [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'TanStack Query',
    'React Hook Form',
    'Zod',
    'Vitest',
    'Playwright',
    'Docker',
    'GitHub Actions',
    'Cloudflare Workers',
  ],
  tags: ['Next.js', 'TypeScript', 'Playwright', 'Docker', 'CI/CD'],
  disciplines: ['frontend', 'backend'],
  outcome:
    'Every change passes format, lint, types, unit tests, a dependency audit, Playwright e2e and a Docker smoke test before an image is published.',
  cover: { kind: 'showcase' },
  caseStudy: {
    showcase: homeShowcase,
    context: [
      'Whistler started as a mobile app. The web client brings the same communities, feed, moments, messages and settings to the browser, against the same backend.',
      'It is in active development: the core shell, auth, feed, communities, moments, messages and notifications are built; social login, real-time message delivery and some settings pages are still on the roadmap.',
    ],
    responsibility: {
      owned: [
        'The whole web client — every human-authored commit in the repository is mine',
        'Architecture: route groups, server-side session guards, the API layer and the theme system',
        'Feature modules: core shell, communities, moments, news feed, messages and notifications',
        'Testing: 23 Vitest unit test files and a Playwright suite that runs against a local mock API',
        'CI/CD: GitHub Actions, the Docker image, GitHub Container Registry publishing, Cloudflare Workers deploys and Dependabot',
      ],
      collaborated: [
        'The backend API, shared with the mobile app and maintained separately',
        'Figma designs for each screen',
      ],
    },
    challenge: [
      'Two clients for one product drift apart quietly: a 401 produces a different message, a colour is slightly off, a validation rule differs. The web client had to behave like the mobile app without sharing its code.',
      'It also had to be a good web citizen — a fast, indexable public surface — while everything behind sign-in stays private and protected on the server, not just hidden in the UI.',
    ],
    constraints: [
      {
        title: 'Same backend, different runtime',
        body: 'The browser calls the external API directly (no proxy in this phase), so auth has to work cross-origin.',
      },
      {
        title: 'Public pages must stay static',
        body: 'The landing page is the SEO surface. Anything that forces dynamic rendering — like reading cookies in the root layout — costs performance on every page.',
      },
      {
        title: 'Parity with mobile',
        body: 'Theme tokens, API error messages and request helpers need to match the mobile app exactly.',
      },
    ],
    architecture: {
      title: 'Whistler Web',
      layers: [
        { label: 'Public', nodes: ['Landing page (static, indexed)', 'sitemap.ts'] },
        {
          label: '(auth)',
          nodes: [
            'Login, register, OTP, password reset, onboarding',
            'One shared AuthHeader',
            'noindex',
          ],
        },
        {
          label: '(app)',
          nodes: ['Server-side requireSession() guard', 'One SidebarNav + TopHeader', 'noindex'],
        },
        {
          label: 'Features',
          nodes: ['features/*/hooks — TanStack Query wrappers'],
        },
        {
          label: 'API layer',
          nodes: ['lib/api client mirroring mobile’s interceptors and error messages'],
        },
        { label: 'Backend', nodes: ['Whistler REST API (shared with mobile)'] },
      ],
      caption: 'Components never call endpoints directly; they go through a feature hook.',
      notes: [
        'Route groups split the app into a public surface, logged-out forms and the authenticated app — each with exactly one header implementation.',
        'Protected pages are checked on the server with requireSession(), so access control is real, not just hidden UI.',
        'Theme tokens are ported one-to-one from the mobile app and rendered as CSS custom properties, so both clients share names and values.',
      ],
    },
    decisions: [
      {
        title: 'A JS-readable session cookie, deliberately',
        problem:
          'The browser calls the API directly and has to attach a bearer token, while server components also need to see the session.',
        options: [
          'httpOnly cookie behind a backend-for-frontend proxy',
          'localStorage only',
          'Secure, SameSite=Lax, non-httpOnly cookie',
        ],
        tradeoffs:
          'An httpOnly cookie can’t be read by the code that sets the Authorization header unless every request goes through a proxy — a whole new service. localStorage is invisible to server components, so routes couldn’t be protected on the server.',
        decision:
          'Store the JWT in a Secure, SameSite=Lax cookie readable by both client code and server components.',
        reason:
          'It enables real server-side route protection, and it is no weaker than the mobile app’s plain token storage. Moving to a proxy is a documented later step.',
        result: 'Protected routes are enforced on the server from the first request.',
      },
      {
        title: 'Keep the public page static instead of reading the theme cookie',
        problem: 'A saved dark-mode preference should apply on first paint.',
        options: [
          'Read the cookie in the root layout',
          'Use CSS prefers-color-scheme and correct before paint on the client',
        ],
        tradeoffs:
          'Reading cookies in the root layout makes the entire app — including the landing page — dynamically rendered. The CSS approach leaves a brief flash only for users whose saved choice contradicts their OS.',
        decision:
          'Use prefers-color-scheme for the first paint and apply a stored preference in a layout effect.',
        reason:
          'The project’s priority order puts SEO and performance ahead of a rare visual edge case.',
        result:
          'The landing page stays statically rendered; most users get the right theme with zero JavaScript.',
      },
      {
        title: 'End-to-end tests against a mock backend',
        problem:
          'E2E tests that need a real account and network are slow, flaky and leak test data into production.',
        options: ['Test against staging', 'Skip E2E', 'Run Playwright against a local mock API'],
        tradeoffs: 'A mock can drift from the real API. Staging is realistic but slow and shared.',
        decision:
          'Playwright builds the app against e2e/mock-api.mjs; CI uploads the HTML report and traces.',
        reason: 'Tests need no credentials or network, so they run on every pull request.',
        result:
          'Login validation, guest mode, notifications, moments, messages, polls and comments are covered on every PR.',
      },
    ],
    implementation: [
      {
        title: 'Routes',
        body: '52 pages: feed, discover, communities (members, insights, polls, leader hub, admin assignment), moments, messages, notifications, profile, settings and onboarding.',
      },
      {
        title: 'Forms',
        body: 'React Hook Form with Zod across nine forms: sign-in, registration, OTP, password reset and change, onboarding, profile, and support.',
      },
      {
        title: 'Messages',
        body: 'Currently a polling fallback. Moving to the mobile app’s socket layer is the next step.',
      },
      {
        title: 'Tooling',
        body: 'ESLint with warnings as errors, Prettier, the React Compiler, and pre-commit hooks that run CI’s own checks.',
      },
    ],
    production: [
      {
        title: 'CI',
        body: 'Format, lint, types, unit tests and an npm audit of production dependencies; Playwright e2e; a Docker build that is run and probed for /api/health, /login and a non-root user. A single “CI passed” check gates main.',
      },
      {
        title: 'Images',
        body: 'On main, a standalone Next.js image (Node 22, Alpine, non-root) is pushed to GitHub Container Registry with a signed build-provenance attestation. Deploys are by commit SHA, so rollback is redeploying the previous tag.',
      },
      {
        title: 'Environments',
        body: 'Development and staging deploy to Cloudflare Workers through OpenNext.',
      },
      {
        title: 'Maintenance',
        body: 'Dependabot opens weekly PRs for npm, GitHub Actions and the Docker base image. The health check never calls the backend, so an API outage doesn’t restart healthy web containers.',
      },
    ],
    outcome: {
      summary: [
        'The web client covers the core of the product and ships through a pipeline that checks quality, behaviour, security advisories and the container itself before anything is published.',
      ],
      metrics: [
        {
          label: 'Routes built',
          basis: 'measured',
          value: '52',
          note: 'Pages under the App Router at the time of writing.',
        },
        {
          label: 'Unit test files',
          basis: 'measured',
          value: '23',
          note: 'Plus a Playwright e2e suite.',
        },
        {
          label: 'Active users',
          basis: 'unavailable',
          value: null,
          note: 'Impact metric unavailable — not yet launched publicly.',
        },
      ],
    },
    lessons: [
      'Parity between clients is a design decision, not an accident. Porting the mobile app’s tokens, interceptors and error messages one-to-one removed a whole class of “why does web say something different?” bugs before they existed.',
      'Writing down deliberate deviations — the cookie choice, the theme trade-off — next to the code saves the next reviewer from “fixing” them.',
    ],
    next: [
      'Replace message polling with the socket layer the mobile app already uses.',
      'Add Google and Apple sign-in once the web OAuth clients are set up.',
      'Test a Content-Security-Policy against Google sign-in, Giphy and the socket server.',
      'Cover sign-up, OTP and a successful login in the e2e suite.',
    ],
  },
};
