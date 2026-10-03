import type { Project } from '../types';

/**
 * Verified against SeamHealth's device-intelligence-backend repository: 10 of
 * 16 commits, including the initial implementation (Jul – Aug 2026). Detection
 * logic is described only at a high level — publishing it would help evade it.
 */
export const deviceIntelligence: Project = {
  slug: 'device-intelligence',
  name: 'Device Intelligence',
  featured: true,
  headline: 'Designing a fraud-signal backend that is honest about its own scaling limits.',
  summary:
    'FastAPI service that fingerprints visitors, links probable identities across browsers and scores risk  built to keep public voting fair, with tests and AWS deployment scaffolding.',
  metaDescription:
    'Case study: Device Intelligence, a FastAPI backend by Suleiman Francis — device fingerprinting, risk scoring, background jobs, fail-closed secrets and an AWS ECS + RDS deployment path.',
  role: 'Lead backend engineer',
  timeline: 'Jul 2026 — Aug 2026',
  team: 'Small team; I wrote the initial implementation and most of the commits.',
  platform: 'Backend service · HTTP API',
  category: 'Backend · Security & risk',
  organisation: 'SeamHealth Group',
  stack: [
    'Python',
    'FastAPI',
    'SQLAlchemy 2',
    'Alembic',
    'Pydantic v2',
    'APScheduler',
    'PostgreSQL',
    'SQLite',
    'Docker',
    'AWS ECS Fargate',
    'AWS RDS',
    'pytest',
  ],
  tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
  disciplines: ['backend'],
  outcome:
    'Initial implementation, production hardening and the AWS deployment path — 10 of 16 commits and 14 test files.',
  confidentiality:
    'A SeamHealth Group service. Detection signals and scoring are described only at a high level, because publishing them would make them easier to evade.',
  cover: { kind: 'diagram' },
  caseStudy: {
    context: [
      'Public voting and feedback attract duplicate and automated submissions. Device Intelligence gives the frontend a way to recognise a returning device, link probable identities across browsers, and score how risky a session looks.',
      'It is the backend half of the platform, deployed independently; the Clientshot Pulse voting app reports to it from the browser.',
    ],
    responsibility: {
      owned: [
        'The initial backend: API, data model, migrations and background jobs',
        'Production hardening: authentication, fail-closed secrets and deploy artifacts',
        'The AWS deployment path: ECS Fargate, RDS Postgres and Secrets Manager',
        'Location resolution (GPS first, IP fallback) and the frontend reporting hook in Clientshot Pulse',
        'Unit and integration tests 14 test files',
      ],
      collaborated: [
        'Feature work and review with a second engineer',
        'The Clientshot Pulse voting frontend, built mainly by another engineer',
      ],
    },
    challenge: [
      'A risk service has to make useful judgements from noisy signals, run periodic recalculation in the background, and be safe to deploy  wrong configuration in a security service is itself a vulnerability.',
      'It also had to be simple enough to run locally with nothing but pip, and still have a credible path to production.',
    ],
    constraints: [
      {
        title: 'Zero-setup local runs',
        body: 'Engineers should be able to start it with pip and SQLite, no database server, no queue.',
      },
      {
        title: 'Spoofable inputs',
        body: 'Client-reported data and forwarded headers can be faked, so the service must decide what to trust.',
      },
      {
        title: 'Background work',
        body: 'Similarity recalculation, duplicate-device merging, risk updates and session expiry all run on a schedule.',
      },
    ],
    architecture: {
      title: 'Device Intelligence',
      layers: [
        { label: 'Client', nodes: ['Browser fingerprint + location report (Clientshot Pulse)'] },
        { label: 'API', nodes: ['FastAPI routes', 'Pydantic v2 validation', '/health'] },
        { label: 'Application', nodes: ['Services', 'Risk engine', 'Device graph'] },
        {
          label: 'Workers',
          nodes: ['APScheduler: similarity, merging, risk updates, session expiry'],
        },
        {
          label: 'Storage',
          nodes: ['SQLAlchemy 2 + Alembic', 'SQLite locally → Postgres (RDS) in production'],
        },
      ],
      caption: 'Simplified. Detection signals are intentionally not listed.',
      notes: [
        'Layered: HTTP concerns in the API, business logic in services and the risk engine, persistence in infrastructure.',
        'One DATABASE_URL switches SQLite to Postgres; Alembic migrations run on container start.',
      ],
    },
    decisions: [
      {
        title: 'Run the scheduler in-process — and say so loudly',
        problem:
          'Four recurring jobs need to run, but adding a queue or cron service makes local setup heavier.',
        options: [
          'External cron calling job endpoints',
          'A task queue with separate workers',
          'APScheduler inside the API process',
        ],
        tradeoffs:
          'In-process scheduling needs no extra infrastructure, but every replica runs every job — so the service can’t scale horizontally without duplicating work.',
        decision:
          'Use APScheduler in-process, pin gunicorn to one worker, and document the single-process constraint in the README.',
        reason:
          'It fits current traffic, and an explicit, written limit is safer than a hidden one someone discovers by scaling out.',
        result:
          'Simple to run and deploy, with the migration path written down: move jobs out of process before adding replicas.',
      },
      {
        title: 'Fail closed on secrets',
        problem:
          'The secret key signs visitor cookies and CSRF tokens, and a development default had to exist for local runs.',
        options: [
          'Warn when the default key is used',
          'Refuse to start in production with the default key',
        ],
        tradeoffs:
          'Refusing to boot can block a deploy; a warning can be missed and leave tokens forgeable.',
        decision:
          'The app refuses to start when ENVIRONMENT=production and the committed default key is in use.',
        reason:
          'For a security service, a failed deploy is better than a running service with forgeable tokens.',
        result: 'Misconfiguration surfaces at deploy time, not in an incident.',
      },
      {
        title: 'Trust forwarded IPs only from known proxies',
        problem:
          'Behind a proxy, the real client IP arrives in X-Forwarded-For — a header any client can forge.',
        options: [
          'Always trust X-Forwarded-For',
          'Never trust it',
          'Trust it only from configured proxy addresses',
        ],
        tradeoffs:
          'Always trusting it lets attackers choose their IP; never trusting it loses the real IP behind a load balancer.',
        decision:
          'Honour X-Forwarded-For only when the request comes from an address in TRUSTED_PROXY_IPS.',
        reason: 'IP-based signals are only worth having if they can’t be set by the client.',
        result: 'Safe defaults locally, correct client IPs behind a configured load balancer.',
      },
    ],
    implementation: [
      {
        title: 'Data model',
        body: 'Visitors, devices, sessions and behaviour, with Alembic migrations.',
      },
      { title: 'Location', body: 'GPS-first location with IP-based fallback.' },
      { title: 'Tests', body: 'Unit and integration tests  14 files.' },
    ],
    production: [
      {
        title: 'Container',
        body: 'Non-root Docker image; migrations on start; gunicorn with a single Uvicorn worker; a /health endpoint for the load balancer.',
      },
      {
        title: 'AWS path',
        body: 'An ECS Fargate task definition with RDS Postgres in a private subnet and secrets from Secrets Manager.',
      },
      {
        title: 'TLS',
        body: 'Terminated by a reverse proxy in front of the service, as documented.',
      },
    ],
    outcome: {
      summary: [
        'The service runs locally with no setup, deploys as a hardened container, and has a documented path to AWS — with its scaling limit written down rather than discovered.',
      ],
      metrics: [
        {
          label: 'Commits authored',
          basis: 'measured',
          value: '10 of 16',
          note: 'Including the initial implementation, from git history.',
        },
        { label: 'Test files', basis: 'measured', value: '14', note: 'Unit and integration.' },
        {
          label: 'Fraudulent votes prevented',
          basis: 'measured',
          value: '16 of 16',
          note: 'Impact metric unavailable.',
        },
      ],
    },
    lessons: [
      'A documented limitation is a feature. Writing “do not run more than one worker” in the README protects the next engineer better than a clever workaround nobody understands.',
      'In security code, defaults are decisions. Fail-closed secrets and an explicit proxy allow-list cost little and remove whole classes of mistakes.',
    ],
    next: [
      'Move scheduled jobs out of process (external cron or leader election) so the API can scale horizontally.',
      'Measure precision of the risk scores against labelled sessions before using them to block anything automatically.',
    ],
  },
};
