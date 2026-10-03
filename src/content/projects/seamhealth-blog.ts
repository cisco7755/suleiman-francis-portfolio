import type { Project } from '../types';

/** Verified against SeamHealth's seam-blog repository: 19 of 32 commits, including the initial implementation (Jul 2026). */
export const seamhealthBlog: Project = {
  slug: 'seamhealth-blog',
  name: 'SeamHealth Blog',
  featured: false,
  headline: 'Shipping a `CMS` driven blog with production hardening from the first commit.',
  summary:
    'Next.js 16 and Sanity blog for SeamHealth: editorial content, a newsletter with deliverability checks, rate limiting, CSP and CI.',
  metaDescription:
    'Case study: the SeamHealth blog built by Suleiman Francis with Next.js 16, Sanity CMS and GROQ — a repository/service data layer, newsletter verification, rate limiting, CSP and CI.',
  role: 'Lead engineer',
  timeline: 'Jul 2026',
  team: 'Small team; I wrote the initial implementation and most of the commits.',
  platform: 'Web · content site',
  category: 'Content platform · Next.js',
  organisation: 'SeamHealth Group',
  stack: [
    'Next.js 16',
    'TypeScript',
    'Tailwind CSS',
    'Sanity',
    'GROQ',
    'React Hook Form',
    'Zod',
    'TanStack Query',
    'GitHub Actions',
  ],
  tags: ['Next.js', 'Sanity', 'TypeScript', 'Security', 'CI'],
  disciplines: ['frontend', 'backend'],
  outcome:
    'Initial implementation through production readiness: rate limiting, CSP, structured logging, CVE patches and CI.',
  confidentiality: 'A SeamHealth Group site. The architecture is simplified.',
  cover: { kind: 'diagram' },
  caseStudy: {
    context: [
      'SeamHealth needed a blog for healthcare insights that editors could run without engineers: posts managed in a CMS, a newsletter, and good search and social previews.',
    ],
    responsibility: {
      owned: [
        'The initial implementation: Next.js app, Sanity schemas, GROQ queries and the blog feature',
        'The newsletter: subscription API with checks that an email address is real and deliverable',
        'Production readiness: rate limiting, a Content-Security-Policy and structured logging',
        'CI: a dedicated Sanity development project for builds, and retries for transient registry failures in the dependency audit',
        'Security upgrades, such as moving Next.js to a version that fixed four high-severity CVEs',
      ],
      collaborated: ['Navigation, footer and design work with a second engineer'],
    },
    challenge: [
      'A marketing blog is easy to build and easy to leave insecure: a public subscribe endpoint invites abuse, CMS content is untrusted input, and CI that depends on production content is fragile.',
    ],
    constraints: [
      { title: 'Editors, not engineers', body: 'Content has to be managed entirely in the CMS.' },
      { title: 'Public endpoints', body: 'The newsletter API is reachable by anyone.' },
      { title: 'CI isolation', body: 'Builds shouldn’t depend on, or touch, production content.' },
    ],
    architecture: {
      title: 'SeamHealth Blog',
      layers: [
        {
          label: 'Routes',
          nodes: ['Blog listing', 'Post pages', 'Embedded Sanity Studio', 'OG image route'],
        },
        { label: 'Features', nodes: ['blog', 'newsletter'] },
        { label: 'Data access', nodes: ['GROQ queries → repositories → services'] },
        {
          label: 'API',
          nodes: ['Newsletter endpoint: validation, deliverability check, rate limit'],
        },
        { label: 'CMS', nodes: ['Sanity'] },
      ],
      caption: 'Simplified.',
      notes: [
        'Pages never talk to the CMS directly: GROQ queries sit behind repositories, and business rules live in services.',
        'Skeleton loaders match each page’s structure, so loading doesn’t shift the layout.',
      ],
    },
    decisions: [
      {
        title: 'Verify email addresses before subscribing them',
        problem:
          'A public subscribe form collects typos, disposable addresses and junk that harm sender reputation.',
        options: [
          'Accept anything that passes a regex',
          'Check that the address is real and deliverable first',
        ],
        tradeoffs:
          'Verification adds a step and a dependency; skipping it degrades the list and email deliverability over time.',
        decision: 'Validate with Zod, then check deliverability before adding the subscriber.',
        reason: 'A smaller, real list is worth more than a large one that bounces.',
        result: 'Only deliverable addresses reach the newsletter list.',
      },
      {
        title: 'Harden before launch, not after',
        problem:
          'The newsletter endpoint and CMS-rendered pages were exposed to the internet from day one.',
        options: ['Launch, then harden', 'Add rate limiting, CSP and logging before launch'],
        tradeoffs:
          'Hardening first delays launch slightly; hardening later means running unprotected in public.',
        decision:
          'Rate limiting on the API, a Content-Security-Policy, and structured logging before production.',
        reason:
          'The cheapest time to add security controls is before anyone depends on the system’s current behaviour.',
        result: 'Abuse protection and searchable logs were in place before production.',
      },
    ],
    implementation: [
      {
        title: 'Content',
        body: 'Sanity schemas, Portable Text rendering and an embedded Studio at /studio.',
      },
      {
        title: 'SEO',
        body: 'Dynamic sitemap, robots.txt and an edge-rendered social preview image per post.',
      },
      { title: 'Tests', body: 'Six test files, all written by me.' },
    ],
    production: [
      {
        title: 'CI',
        body: 'GitHub Actions against a dedicated Sanity development project, with a dependency audit that retries transient registry failures.',
      },
      { title: 'Patching', body: 'Next.js upgraded to fix four high-severity CVEs.' },
    ],
    outcome: {
      summary: [
        'Built from the first commit to a hardened, `CMS` driven site that editors run without engineers.',
      ],
      metrics: [
        {
          label: 'Commits authored',
          basis: 'measured',
          value: '19 of 32',
          note: 'Including the initial implementation, from git history.',
        },
        {
          label: 'Readership',
          basis: 'unavailable',
          value: null,
          note: 'Impact metric unavailable.',
        },
      ],
    },
    lessons: [
      'Small public sites need the same basics as big ones  rate limits, CSP, logs and patched dependencies. They’re cheapest when added at the start.',
    ],
    next: [
      'Double opt-in confirmation for newsletter sign-ups.',
      'Preview deployments wired to Sanity drafts so editors can see posts before publishing.',
    ],
  },
};
