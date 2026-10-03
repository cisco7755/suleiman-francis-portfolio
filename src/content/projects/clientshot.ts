import type { Project } from '../types';

/**
 * Verified against SeamHealth's clientshot, clientshot-admin and clientshot-v3
 * repositories: 416 of my commits between Sep 2024 and Jul 2026. Decisions are
 * taken from specific commits; no proprietary code, screens or data are shown.
 */
export const clientshot: Project = {
  slug: 'clientshot',
  name: 'Clientshot',
  featured: true,
  headline: 'Building a customer feedback platform from data capture to actionable analytics.',
  summary:
    'SeamHealth’s customer feedback platform: multi-step feedback flows, complaint handling, billing and an operator admin — 400+ of my commits across three Angular codebases.',
  metaDescription:
    'Case study: Suleiman Francis’s work on Clientshot, SeamHealth’s customer feedback platform — form flows, complaint workflows, billing, the admin console and the v3 library architecture.',
  role: 'Frontend engineer',
  timeline: '2024 — Present',
  team: 'SeamHealth product engineering team, with several frontend engineers.',
  platform: 'Web · SaaS · server-side rendered',
  category: 'SaaS · Feedback & analytics',
  organisation: 'SeamHealth Group',
  stack: [
    'Angular',
    'TypeScript',
    'RxJS',
    'Angular SSR',
    'Socket.IO',
    'Chart.js',
    'Sentry',
    'Paystack',
    'REST APIs',
  ],
  tags: ['Angular', 'TypeScript', 'RxJS', 'SaaS', 'Analytics'],
  disciplines: ['frontend', 'backend'],
  outcome:
    '416 commits across the customer app, the admin console and the v3 rebuild: form flows, complaints, billing, notifications and operator tooling.',
  confidentiality:
    'Clientshot is a SeamHealth Group product. Screens are from its development environment with test data; customer names are removed, no code is shown, and the architecture is simplified.',
  cover: { kind: 'showcase' },
  caseStudy: {
    showcase: [
      {
        device: 'mobile',
        title: 'Analytics',
        figure: {
          src: '/work/clientshot/analytics-mobile.png',
          alt: 'Clientshot Analytics at phone width: a menu button and notification bell in the top bar, a workspace selector, a full-width Filters button, then stacked cards for Total Complaints (35, all open), Average Rating (3.4 stars) and Commendations (57). The profile picture is replaced with a grey circle.',
          width: 890,
          height: 1588,
          caption:
            'Mobile: the sidebar collapses behind a menu button and every metric card stacks full width. Test data from the development environment; profile picture removed.',
        },
      },
      {
        device: 'tablet',
        title: 'Analytics',
        figure: {
          src: '/work/clientshot/analytics-tablet.png',
          alt: 'Clientshot Analytics on a tablet: a dark sidebar beside a two-column grid of metric cards (Total Complaints, Average Rating, Commendations, Resolution Rate), an AI executive-briefing panel, Net Promoter Score and Feedback Channels charts, and a Feedback Trend chart. The profile picture is replaced with a grey circle.',
          width: 1322,
          height: 1618,
          caption:
            'Tablet: the sidebar stays and the metric cards fall into two columns above the trend chart. Test data from the development environment; profile picture removed.',
        },
      },
      {
        device: 'desktop',
        title: 'Analytics',
        figure: {
          src: '/work/clientshot/analytics-desktop.png',
          alt: 'Clientshot Analytics on a laptop: a dark sidebar, then metric cards for Total Complaints, Average Rating, Commendations and Resolution Rate, a purple “No Executive Briefing Yet” panel with a Generate Briefing button, and Net Promoter Score and Feedback Channels charts. The profile picture is replaced with a grey circle.',
          width: 2528,
          height: 1474,
          caption:
            'Desktop: complaints, ratings, commendations, NPS and channel mix on one screen, with an AI-generated executive briefing. Test data from the development environment; profile picture removed.',
        },
      },
      {
        device: 'mobile',
        title: 'Sign-up',
        figure: {
          src: '/work/clientshot/signup-mobile.png',
          alt: 'Clientshot sign-up form at phone width: name fields, email, a country selector set to Nigeria, password and confirm password, the Create Account button and Sign up with Google. The marketing panel is not shown.',
          width: 780,
          height: 1688,
          caption:
            'Mobile: the marketing panel drops away and the sign-up form takes the full screen.',
        },
      },
      {
        device: 'tablet',
        title: 'Sign-up',
        figure: {
          src: '/work/clientshot/signup-tablet.png',
          alt: 'Clientshot sign-up at tablet width: the form on the left and a purple marketing panel with a quote and a product preview on the right. A workspace name in the preview is replaced with a grey block.',
          width: 1668,
          height: 2224,
          caption:
            'Tablet: form and marketing panel side by side, with the form kept to a readable width.',
        },
      },
      {
        device: 'desktop',
        title: 'Sign-up',
        figure: {
          src: '/work/clientshot/signup-desktop.png',
          alt: 'Clientshot sign-up at desktop width: the “Get Started Now” form beside a purple marketing panel with a quote and a product preview. A workspace name in the preview is replaced with a grey block.',
          width: 1440,
          height: 900,
          caption:
            'Desktop: the full split layout. Captured from the public sign-up page without submitting anything.',
        },
      },
    ],
    gallery: [
      {
        src: '/work/clientshot/signup-validation.png',
        alt: 'Clientshot “Get Started Now” sign-up form after submitting it empty: first name, last name, password and confirm password are outlined in red with messages such as “Please enter first name”, beside a purple marketing panel with a quote and a product preview. A workspace name in the preview is replaced with a grey block.',
        width: 1440,
        height: 900,
        caption:
          'Sign-up, which I worked on: submitting an empty form marks each required field with its own message rather than one generic error. Captured without sending any data.',
      },
    ],
    context: [
      'Clientshot collects customer feedback for organisations — through web forms, QR codes and messaging channels — and turns it into dashboards, complaint workflows and reports.',
      'It runs as three frontends on a shared microservice backend: the customer-facing app, an admin console for SeamHealth operators, and v3, a rebuild of the app as a set of feature libraries.',
    ],
    responsibility: {
      owned: [
        'Customer app (218 commits): form responses, linked and instant form flows, service-point flows, complaints, notification settings, user lists, sign-up, and billing — subscription plans, SMS top-up and seats',
        'Admin console (94 commits): auth pages, the feature control panel, activity logging with module-toggle tracking, the responses list with bulk actions and trash/restore, and facility management',
        'v3 (104 commits): the UI, forms and feedback libraries, complaint status workflows, notification filtering, and contacts',
        'Bug fixes with regression tests, such as “last login” showing 1 Jan 1970 for users who had never signed in',
      ],
      collaborated: [
        'The backend microservices and real-time service, built by backend engineers',
        'Designs from Figma, and acceptance criteria with product',
        'Code review across the frontend team',
      ],
    },
    challenge: [
      'Feedback collection looks simple from outside, but a single submission can chain several flows: a form can link to another form, run “instantly” or from a queue, and pass through a service-point step before it completes. Every combination has to finish exactly once.',
      'Behind it, operators need to triage complaints, manage billing and configure what each organisation can use — without the interface lying about whether data is still loading, empty or wrong.',
    ],
    constraints: [
      {
        title: 'Several codebases',
        body: 'The same product lives in the customer app, the admin console and the v3 libraries, so a fix often has to land in more than one place.',
      },
      {
        title: 'Shared, evolving backend',
        body: 'Microservices owned by other engineers. The frontend has to cope with response shapes and states it doesn’t control.',
      },
      {
        title: 'Organisation variety',
        body: 'Some companies have branches and some don’t; some use every module and some only a few. Features have to work in all of those configurations.',
      },
    ],
    architecture: {
      title: 'Clientshot',
      layers: [
        { label: 'Capture', nodes: ['Web forms', 'QR codes', 'Messaging channels'] },
        {
          label: 'Flows',
          nodes: ['Linked forms', 'Instant & queued forms', 'Service-point flows'],
        },
        {
          label: 'Frontends',
          nodes: ['Customer app (Angular SSR)', 'Admin console', 'v3 feature libraries'],
        },
        { label: 'Real-time', nodes: ['Socket.IO updates'] },
        { label: 'Backend', nodes: ['Microservices (other teams)', 'Billing via Paystack'] },
      ],
      caption: 'Simplified and sanitised. Only the shape of the system is shown.',
      notes: [
        'Feedback can chain through several flow types before it completes; the order of completion matters.',
        'v3 splits the app into feature libraries — UI, forms, feedback, contacts, channels, real-time — so shared pieces have one home.',
      ],
    },
    decisions: [
      {
        title: 'Run the linked form only after the service-point flow completes',
        problem:
          'An instant linked form that contained a service-point flow could trigger itself again — an infinite loop.',
        options: [
          'Guard against re-entry case by case',
          'Make completion explicit and sequence the flows',
        ],
        tradeoffs:
          'Case-by-case guards are quick but leave the ordering implicit, so the next flow type can loop again. Sequencing means touching the shared flow logic.',
        decision:
          'Trigger the linked form when the service-point flow reports completion, not alongside it.',
        reason: 'Making the order explicit removes the condition that let a flow re-enter itself.',
        result: 'The loop was fixed in both the customer app and v3, where the same flow lives.',
      },
      {
        title: 'Stage tag changes until the user clicks Apply',
        problem: 'In the complaint Update Status modal, every tag click was applied immediately.',
        options: ['Save each click', 'Stage changes locally and apply them together'],
        tradeoffs:
          'Saving per click is simple but creates half-finished states and extra requests. Staging needs a clear Apply/Cancel model.',
        decision:
          'Batch tag selections and apply them on Update, with the modal redesigned to match Figma.',
        reason: 'A status update is one decision; it should be saved as one.',
        result: 'One request per update, and Cancel genuinely cancels.',
      },
      {
        title: 'Tell “still loading” apart from “empty”',
        problem:
          'The user list flashed its empty state before users had been fetched, and a global loader hid data that was still arriving.',
        options: ['Keep one global loader', 'Local skeletons and an explicit loaded state'],
        tradeoffs:
          'A global loader is one switch to manage but blocks the whole screen and can switch off before data renders. Local states need more care per view.',
        decision:
          'Remove the global loader from display functions; show local skeletons until the request settles.',
        reason:
          'An empty state is a claim — “there is nothing here” — and it should only appear when it’s true.',
        result: 'No false empty states, and loaders that match when data actually appears.',
      },
    ],
    implementation: [
      {
        title: 'Billing',
        body: 'Subscription plan changes, SMS top-ups, adding seats and the billing modal, with billing-cycle rules such as the free plan never being selectable.',
      },
      {
        title: 'Admin console',
        body: 'A feature control panel for turning modules on and off per organisation, an activity log that records those toggles and updates in real time, and a responses list with detail modals, bulk delete and trash/restore.',
      },
      {
        title: 'Data correctness',
        body: 'Consistent active/inactive counts, a safe-number pipe so dashboard totals never render NaN, and phone-number fields that no longer overwrite themselves with a country prefix.',
      },
      {
        title: 'Organisations without branches',
        body: 'Feedback management re-enabled for companies with no branches — a configuration the original screens assumed couldn’t exist.',
      },
    ],
    production: [
      {
        title: 'Delivery',
        body: 'Ticketed pull requests with code review, worked through review comments before merge.',
      },
      {
        title: 'Monitoring',
        body: 'The app reports errors to Sentry and is server-side rendered with Angular SSR.',
      },
    ],
    outcome: {
      summary: [
        'Across three codebases I shipped form-flow fixes, complaint workflows, billing features, admin tooling and v3 library work, many of them fixes for states that only appear in real organisations’ configurations.',
      ],
      metrics: [
        {
          label: 'Commits authored',
          basis: 'measured',
          value: '416',
          note: 'Customer app 218, admin 94, v3 104 — from git history, Sep 2024 to Jul 2026.',
        },
        {
          label: 'Customer adoption',
          basis: 'unavailable',
          value: null,
          note: 'Impact metric unavailable — product data belongs to SeamHealth.',
        },
      ],
    },
    lessons: [
      'Most of the hard bugs lived between features, not inside them: a flow inside a flow, a company without branches, a user who has never logged in. I now test the combinations and the “impossible” configurations first.',
      'When the same feature lives in several codebases, a fix isn’t done until it’s in all of them.',
    ],
    next: [
      'Model the form-flow sequence as an explicit state machine, so new flow types can’t reintroduce ordering bugs.',
      'Share one schema between form definitions and analytics, so a form change that would break a report fails at build time.',
    ],
  },
};
