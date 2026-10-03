import type { DisciplinePage } from './types';

/**
 * One page per discipline, each with an essay grounded in shipped work.
 * Order here is the order on /engineering.
 */
export const disciplines: DisciplinePage[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    title: 'Designing resilient frontend architecture',
    description:
      'How Suleiman Francis structures frontend applications: component boundaries, server versus client state, validation at the edges, and reusable abstractions that earn their place.',
    essay: {
      title: 'Designing resilient frontend architecture',
      summary:
        'Most frontend bugs I’ve fixed trace back to one of three things: unclear ownership of state, validation in the wrong place, or an abstraction that was shared too early. The architecture work is mostly about preventing those.',
      sections: [
        {
          heading: 'State has an owner',
          paragraphs: [
            'The first question I ask about any piece of state is who owns it. If the server owns it — a member list, a moderation queue, a feed — it is a cache, and it needs a cache’s tools: deduplication, refetching and invalidation. If the client owns it — a selected tab, a draft, the session — it belongs in client state.',
            'In Whistler Mobile, TanStack Query owns server state and Redux Toolkit holds session and UI state. In Whistler Admin, nearly everything is server state, so the client store shrank to two small Zustand slices: the auth session and the search term. In both, after an action changes data, the affected queries are invalidated rather than patched by hand in several places.',
          ],
        },
        {
          heading: 'Components are boundaries, not just reuse',
          paragraphs: [
            'A component boundary decides what a piece of UI is allowed to know. Presentational components take data and callbacks. Containers own data fetching and orchestration. That split makes the presentational layer reusable — and makes it obvious where a bug lives.',
          ],
          points: [
            'Shared components need a stable, small API. Every prop is a promise to every product that uses it.',
            'Duplication is cheaper than the wrong abstraction. I extract a component when the third use appears, not the first.',
            'Headless libraries such as TanStack Table keep behaviour shared while markup and accessibility stay under my control.',
          ],
        },
        {
          heading: 'Validate at the edges',
          paragraphs: [
            'Data should be checked where it crosses a boundary: when a user submits it and when an API returns it. In Whistler Web, nine forms each have a Zod schema that defines the payload, the rules and the messages in one place; Whistler Admin validates its environment configuration with Zod at startup, so a missing variable fails immediately. On Clientshot, data consistency was checked where frontend features met backend services, so a mismatch showed up as an error instead of a quietly wrong dashboard.',
            'Client-side validation is a usability feature. The backend stays the source of truth for anything that matters — permissions, prices, identity.',
          ],
        },
        {
          heading: 'Design every state, not just the happy path',
          paragraphs: [
            'Loading, empty, error, partial and stale are normal states. On Clientshot, the user list used to flash “no users” before the request had finished; the fix was to tell “still loading” apart from “loaded and empty”, with local skeletons instead of a global loader. In Whistler Web, Playwright runs against a mock API so those states are exercised on every pull request.',
          ],
        },
      ],
    },
  },
  {
    id: 'backend',
    label: 'Backend',
    title: 'Building reliable realtime experiences',
    description:
      'How Suleiman Francis approaches realtime systems and API boundaries: connection lifecycle, reconnection, state synchronisation, failure handling and centralised auth.',
    essay: {
      title: 'Building reliable realtime experiences',
      summary:
        'Realtime features are easy to demo and hard to keep correct. The work is in what happens when the connection isn’t there — which, on mobile, is often.',
      sections: [
        {
          heading: 'The connection follows the app lifecycle',
          paragraphs: [
            'In Whistler, the Socket.IO connection is tied to the app’s state. It disconnects when the app goes to the background and reconnects when it returns. Holding a socket open in the background wastes battery, and the operating system will close it anyway — better to make that transition explicit than to discover it in a bug report.',
            'All of this lives in one socket context rather than in individual screens, so there is exactly one place that decides when the app is connected.',
          ],
        },
        {
          heading: 'Reconnection is bounded',
          paragraphs: [
            'Automatic reconnection uses backoff: five attempts, starting at one second and growing to ten. Unbounded, aggressive retries turn a server incident into a self-inflicted load spike.',
          ],
        },
        {
          heading: 'Decide what survives a disconnect',
          paragraphs: [
            'Some events matter enough to keep. View events are written to an on-device queue before they are sent, so they survive the app being killed while backgrounded. The queue is capped at 50 entries, flushes only when the socket reports connected, and only one flush runs at a time.',
            'Just as important is what doesn’t get queued. Every buffered event is a decision about consistency and storage, and that decision belongs in code review, not in an accident.',
          ],
        },
        {
          heading: 'Treat inbound data as untrusted',
          paragraphs: [
            'Socket payloads are checked for required fields before they enter state; malformed messages are logged and dropped rather than rendered. The same principle applies to REST: validate at the boundary and keep the server as the source of truth.',
          ],
        },
        {
          heading: 'Centralise auth at the API client',
          paragraphs: [
            'Auth headers and 401 handling live in the Axios client’s interceptors, not in screens. The interceptor only signals session expiry when a token was actually set, so an unauthenticated request can’t log someone out. At SeamHealth I designed and consumed REST APIs with JWT authentication and role-based access, and the rule there was the same: the client can hide what a user can’t do, but only the server can enforce it.',
          ],
        },
        {
          heading: 'Make a service’s limits explicit',
          paragraphs: [
            'The Device Intelligence service I built in FastAPI runs its background jobs — similarity recalculation, duplicate merging, risk updates, session expiry — inside the API process. That keeps local setup to a pip install, but it means every replica would run every job. So the worker count is pinned to one and the README says, in bold, not to scale it out until the scheduler moves out of process.',
            'The same service fails closed: it refuses to start in production with the development secret key, and it trusts X-Forwarded-For only from configured proxy addresses. In a security service, defaults are decisions.',
          ],
          points: [
            'A written limit is safer than a clever workaround nobody understands.',
            'A failed deploy is cheaper than a running service with forgeable tokens.',
          ],
        },
      ],
    },
  },
  {
    id: 'mobile',
    label: 'Mobile',
    title: 'Shipping cross-platform mobile software',
    description:
      'How Suleiman Francis ships React Native and Expo apps: native integrations, the OTA-versus-store boundary, staged release channels, crash reporting and load testing.',
    essay: {
      title: 'Shipping cross-platform mobile software',
      summary:
        'Writing the screens is the smaller part of mobile work. The larger part is integrations, releases and knowing what happened after a release went out.',
      sections: [
        {
          heading: 'One codebase, two platforms, real differences',
          paragraphs: [
            'Whistler runs on iOS and Android from one React Native + Expo codebase. The shared code is the UI and logic; the differences sit in native integrations: Firebase Cloud Messaging and Notifee for notifications, deep links that route to specific screens, and Google, Apple and Facebook sign-in. Apple’s rule that apps offering social login must also offer Sign in with Apple is an example of a platform constraint that shapes the product, not just the code.',
          ],
        },
        {
          heading: 'Know which side of the OTA boundary a change is on',
          paragraphs: [
            'EAS Update can ship JavaScript and assets without store review. Anything touching native code needs a new binary — a Gradle app bundle for Google Play. Knowing which side a change falls on decides how fast it can reach users, so it is a design question, not just a release question.',
            'Keeping the classifier in pure JavaScript was partly a release decision: a retrained model is an over-the-air update, not a store submission.',
          ],
        },
        {
          heading: 'Stage every release',
          paragraphs: [
            'Whistler has a development channel and a production channel. Updates reach development-client builds first and production only after they have been exercised. Native builds use EAS-managed version auto-increment so versioning isn’t a manual step to forget.',
          ],
        },
        {
          heading: 'Observe what shipped',
          paragraphs: [
            'Sentry reports crashes and errors from production builds. Mixpanel and Firebase Analytics show how features are used. Without both, the only feedback loop is app-store reviews.',
          ],
        },
        {
          heading: 'Test the backend paths the app depends on',
          paragraphs: [
            'Onboarding is the first impression, and it is a burst of API calls. I built a load-test harness that replays the full onboarding sequence — registration, username checks, profile updates, image uploads, interest selection — for up to 1,000 accounts at once, with k6 scenarios for feed and moments traffic.',
          ],
        },
      ],
    },
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    title: 'Building practical AI features',
    description:
      'How Suleiman Francis builds AI features: choosing between LLMs and small models, latency, cost, privacy, fallback behaviour, and evaluating honestly — including a classifier whose 99% score didn’t hold up.',
    essay: {
      title: 'Building practical AI features',
      summary:
        'The useful question is rarely “which model is best?” It is “what is the smallest, cheapest, most predictable thing that solves this task — and how will I know if it works?”',
      sections: [
        {
          heading: 'Match the model to the task',
          paragraphs: [
            'Mapping a post to one of 30 fixed categories is classification, not generation. A hosted LLM would handle nuance well, but it costs money per post, adds latency and a network dependency, and sends user text to a third party. For Whistler I trained a fastText model and run it on the device in plain JavaScript: offline, private, and cheap enough to run on every post.',
            'Generative tasks — drafting, summarising, open-ended answers — are where LLM APIs earn their cost. At SeamHealth I worked on that side: prompt design, and evaluating responses against rubrics.',
          ],
        },
        {
          heading: 'Prefer deterministic logic where it works',
          paragraphs: [
            'Anything with a precise rule — validation, permissions, arithmetic — should be code, not a model. Models belong where the rules are fuzzy, and their output should feed deterministic code that decides what to do with it.',
          ],
        },
        {
          heading: 'Design the fallback',
          paragraphs: [
            'The Whistler classifier returns “uncategorised” when the input has fewer than two tokens, when no words are recognised, or when the top probability is below 0.35. A missing category is a minor inconvenience; a confidently wrong one puts a post in front of the wrong community.',
            'With LLMs, the equivalent is detecting hallucinations and inconsistencies before they reach users — part of the rubric-based evaluation work I did at SeamHealth.',
          ],
        },
        {
          heading: 'Evaluate as if you were trying to break it',
          paragraphs: [
            'The classifier originally reported 99% precision on held-out data. When I re-ran the pipeline for this portfolio, I found why. Each training sentence had been expanded into three near-copies — original, lowercased, punctuation stripped — before the random 85/15 split. After normalisation, 2,199 of the 2,238 validation lines also appeared in training. The model was being tested on sentences it had already seen.',
            'Splitting by source sentence first, and then evaluating, gives 60–64% precision@1 across three random splits. Chance is 3.3%, so the model has learned something real — but 99% was the wrong claim. The fix is procedural: split before augmenting, group near-duplicates, and evaluate on real user text before quoting a number.',
          ],
          points: [
            'Every reported metric names its split, its sample and its basis.',
            'Quantisation changes a model. The shipped int8 model should be evaluated directly, not inferred from the float model.',
            'Synthetic data is fine for bootstrapping. It is not evidence of real-world accuracy.',
          ],
        },
      ],
    },
  },
];
