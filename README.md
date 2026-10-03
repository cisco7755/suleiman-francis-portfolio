# Suleiman Francis — portfolio

Personal portfolio for Suleiman Francis, Software Engineer (frontend, backend, mobile, AI).
Next.js 16 App Router, TypeScript, Tailwind CSS v4. Every route is statically generated; there is no
backend and no animation or UI library.

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + tests — run before every push
npm run build        # production build (all routes prerendered)
npm start            # serve the production build
npm run format       # Prettier (with Tailwind class sorting)
npm run resume:pdf   # after a build: regenerate public/resume PDF from /resume
```

`npm run typecheck` runs `next typegen` first so the global `PageProps` / `LayoutProps` route types exist
on a clean checkout.

## Editing content

All copy lives in typed data under `src/content/`. Pages never hardcode project, experience or skill text.

| File              | What it holds                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `profile.ts`      | Name, contact details, links, bio, principles, résumé file                                 |
| `projects/`       | One file per case study; `projects/index.ts` sets order and which four are featured        |
| `experience.ts`   | Roles, most recent first                                                                   |
| `capabilities.ts` | Skills by discipline, the credibility strip, the approach loop and the production pipeline |
| `engineering.ts`  | One write-up per discipline (`/engineering/[discipline]`)                                  |
| `types.ts`        | The content model                                                                          |

**Adding a case study:** add a file to `src/content/projects/` and list it in `projects/index.ts`. The card, case-study page, Open Graph image,
sitemap entry and JSON-LD all follow automatically. The tests check it fills every template section.

**Updating the résumé:** edit the content files, then `npm run build && npm run resume:pdf`. The PDF is rendered from `/resume` with the site’s print styles, so the web résumé and the PDF always match. Pass a path to also copy it, e.g. `npm run resume:pdf -- ../cv/originals/Suleiman_Francis_CV.pdf`.

### Evidence rules (enforced by `src/test/content.test.ts`)

- Every metric declares a `basis`: `measured`, `estimate`, `superseded` or `unavailable`. The UI always
  shows it next to the value.
- Estimates must say “estimate” in their note. Unavailable metrics have a `null` value and say
  “Impact metric unavailable” — never invent a number.
- Banned marketing words (“passionate”, “seamless”, “cutting-edge”, …) fail `npm run check`.
- Employer-owned products (SeamHealth) show no screenshots, only sanitised diagrams.
- Screenshots must exist and have descriptive alt text. The Whistler screenshots in `public/work/` have
  other people’s names, avatars and messages redacted — keep it that way for any new capture.

## Architecture

```
src/
  app/                 routes, metadata, sitemap, robots, OG images, 404, error boundary
  components/
    layout/            header, mobile nav, footer, page intro, skip link
    sections/          homepage and shared page sections
    work/              project card, case-study renderer, diagrams, decision records, timeline
    ui/                primitives: Button(Link), Tag, Metric, Prose, CodeBlock, SafeImage, …
    analytics/         one delegated click listener
  content/             typed content (see above)
  lib/                 site config, metadata + JSON-LD builders, analytics, content lookups
  test/                Vitest suites
```

- **Design tokens** are CSS custom properties in `src/app/globals.css`, mapped into Tailwind with
  `@theme`. Components use semantic roles (`bg-surface`, `text-fg-muted`, `border-line`, `text-accent`),
  never raw colours. Each colour is defined once with `light-dark()`. Themes follow the OS by default; the
  header toggle saves an explicit choice to `localStorage`, and an inline script in `<head>` applies it
  before first paint (no flash). Every text role passes WCAG AA on every surface in both themes.
- **Client JavaScript** is limited to the theme toggle, the mobile menu, active nav state, the copy-email button, the
  image fallback and the analytics listener. Everything else is server-rendered HTML.
- **Diagrams** are semantic HTML lists rather than images, so they reflow on small screens and read in
  order with a screen reader.

## Analytics

Off by default. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable [Plausible](https://plausible.io) (cookieless,
no personal data). Events: `portfolio_view`, `project_open`, `case_study_view`, `resume_download`,
`contact_click`, `github_click`, `linkedin_click`, `email_click`. Server components opt in with
`trackingAttributes(event, props)`; props carry only slugs and link sources. To switch provider, change
`src/lib/analytics/client.ts`.

## Deployment (Vercel)

The GitHub repository is connected to Vercel. Pushes to `main` deploy to production. Pull requests get
preview deployments. Node 22 is pinned in `.node-version`.

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, tests and a production build on every
pull request and on `main`.

Set `NEXT_PUBLIC_SITE_URL` in the Vercel project to the production origin (e.g. `https://suleimanfrancis.com`).
Without it, canonical URLs fall back to `VERCEL_PROJECT_PRODUCTION_URL`. Optionally set
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

Security headers (`nosniff`, `DENY` framing, referrer and permissions policies) are set in `next.config.ts`.

## Verified at handoff (October 2026)

- `npm run check` and `npm run build` pass with no warnings; 33 routes prerendered (25 at the first handoff).
- Lighthouse (mobile, simulated throttling): home 96 / 100 / 100 / 100; Whistler case study
  97 / 100 / 100 / 100 (performance / accessibility / best practices / SEO). CLS 0.
- No horizontal overflow at 375–1440 px; keyboard order, skip link, visible focus, one `h1` per page and no
  skipped heading levels checked with Playwright.
