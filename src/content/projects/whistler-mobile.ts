import type { Metric, Project } from '../types';

/**
 * Classifier evaluation, reproduced from the Whistler training scripts in
 * October 2026. Shared by the spotlight and the case-study outcome.
 */
const classifierEvaluation: { summary: string[]; metrics: Metric[] } = {
  summary: [
    'The training script reported 99.0% precision@1 on held-out data. Re-running it showed why: each hand-written sentence was augmented into three near-copies before a random 85/15 split, so 2,199 of the 2,238 validation lines had a twin in training.',
    'Splitting by sentence first gives 60–64% precision@1 across three random splits, against a 3.3% chance baseline. The data is 4,962 unique hand-written sentences across 30 categories. No real user posts have been evaluated yet.',
  ],
  metrics: [
    {
      label: 'Precision@1 on sentences never seen in training',
      basis: 'measured',
      value: '60–64%',
      note: 'Three random splits grouped by sentence. Chance is 3.3%.',
    },
    {
      label: 'Precision@1 as originally reported',
      basis: 'superseded',
      value: '99.0%',
      note: 'Inflated: near-copies of 98% of validation lines were in training.',
    },
    {
      label: 'Shipped model size',
      basis: 'measured',
      value: '768 KB',
      note: 'int8 weights, down from ~5.5 MB in the first export format.',
    },
  ],
};

export const whistlerMobile: Project = {
  slug: 'whistler-mobile',
  name: 'Whistler Mobile',
  featured: true,
  headline:
    'Building a production community platform across mobile, realtime systems, and on-device AI.',
  summary:
    'Cross-platform community app on Google Play: feeds, moments, realtime chat, events, leaderboards, and an offline interest classifier.',
  metaDescription:
    'Case study: how Suleiman Francis led the Whistler React Native app — Socket.IO realtime chat, push notifications, OTA release channels, and an on-device fastText classifier with an honest evaluation.',
  role: 'Lead mobile engineer',
  timeline: '2025 — Present',
  team: 'Lead on the mobile client, working alongside another mobile engineer.',
  platform: 'iOS and Android from one codebase · published on Google Play',
  category: 'Mobile · Realtime · On-device AI',
  organisation: 'Whistler',
  stack: [
    'React Native',
    'Expo',
    'TypeScript',
    'Redux Toolkit',
    'TanStack Query',
    'Socket.IO',
    'Firebase Cloud Messaging',
    'Notifee',
    'Sentry',
    'Mixpanel',
    'EAS Update',
    'Jest',
  ],
  tags: ['React Native', 'Expo', 'TypeScript', 'Realtime', 'AI'],
  disciplines: ['mobile', 'frontend', 'backend', 'ai'],
  outcome:
    'Published on Google Play, with JavaScript-only fixes shipped over the air through separate production and development channels.',
  cover: { kind: 'showcase' },
  caseStudy: {
    context: [
      'Whistler is a community social platform. People join communities around shared interests, post to community feeds, share short “moments”, chat in real time, RSVP to events, and move up community leaderboards and tiers. Community owners get insight dashboards on growth, retention and engagement.',
      'The mobile app is the main product surface. It runs on iOS and Android from one React Native codebase and is published on the Google Play Store.',
    ],
    responsibility: {
      owned: [
        'Mobile client architecture and day-to-day engineering as lead engineer',
        'Realtime chat client: Socket.IO connection lifecycle, reconnection and app-state handling',
        'Push notifications (FCM delivery, Notifee display), deep linking, theming and dark mode',
        'Social sign-in with Google, Apple and Facebook',
        'The on-device interest classifier: training data, the training and export pipeline, and pure-JavaScript inference',
        'Sentry crash reporting and Mixpanel / Firebase Analytics instrumentation',
        'Android release builds (Gradle) and EAS over-the-air update channels',
        'A load-test harness (Node and k6) that replays the onboarding API sequence for up to 1,000 simultaneous accounts',
      ],
      collaborated: [
        'Screens and features built alongside another mobile engineer',
        'API contracts with the backend, which is maintained outside the mobile codebase',
        'Feature scope and priorities with the people running the product',
      ],
    },
    challenge: [
      'A community app is judged on whether it feels alive: messages arrive immediately, a notification opens the right screen, and the feed reflects what just happened. On a phone, all of that has to survive dropped connections, the app being backgrounded mid-session, and operating-system limits on background work.',
      'The product also needed to understand what people post about — mapping free text to the platform’s 30 interest categories — without sending every post to a third-party AI service.',
    ],
    constraints: [
      {
        title: 'Unreliable networks',
        body: 'Mobile connections drop and resume constantly. The client can’t assume the socket is connected, and anything emitted while it isn’t can be lost.',
      },
      {
        title: 'Two platforms, three identity providers',
        body: 'iOS and Android differ on notifications, background execution and sign-in rules. Apple requires Sign in with Apple when other social logins are offered.',
      },
      {
        title: 'No native ML runtime',
        body: 'The classifier had to run in plain JavaScript. That rules out native inference libraries, but means a retrained model ships in an EAS update instead of a store release.',
      },
      {
        title: 'Bundle size',
        body: 'The model ships inside the JavaScript bundle, so every user pays for its size on install and on every update that changes it.',
      },
      {
        title: 'OTA boundary',
        body: 'Over-the-air updates can change JavaScript and assets only. Anything that touches native code needs a full Gradle build and store review.',
      },
    ],
    architecture: {
      title: 'Whistler mobile client',
      layers: [
        {
          label: 'Screens',
          nodes: ['Community', 'Chats', 'Moments', 'Events', 'Profile', 'Insights'],
        },
        {
          label: 'State',
          nodes: [
            'TanStack Query — server state',
            'Redux Toolkit — session & UI state',
            'Socket context — realtime',
          ],
        },
        {
          label: 'Services',
          nodes: [
            'Axios API client + interceptors',
            'Socket.IO client',
            'Intent classifier (on-device)',
            'Pending-event queue (AsyncStorage)',
          ],
        },
        {
          label: 'Platform',
          nodes: [
            'FCM + Notifee',
            'Deep links',
            'Google / Apple / Facebook sign-in',
            'Sentry',
            'Mixpanel + Firebase Analytics',
          ],
        },
        { label: 'Backend', nodes: ['REST API', 'Socket.IO server'] },
      ],
      caption:
        'Simplified. The backend is maintained separately; the classifier runs entirely on the device.',
      notes: [
        'Server state and client state are kept apart. TanStack Query owns anything fetched from the API — caching, refetching and invalidation. Redux Toolkit holds session and UI state that the server doesn’t own.',
        'Realtime lives in a single Socket context, so the connection lifecycle is managed in one place rather than per screen.',
        'The API client centralises auth headers and response handling, including 401s, so individual screens don’t each re-implement session expiry.',
      ],
    },
    exploration: [
      {
        title: 'Where should classification run?',
        body: 'A hosted LLM call per post would handle nuance best, but adds per-request cost, latency, a network dependency, and sends user text to a third party. Keyword rules are free and transparent but break on implicit language — “Gate 47, three-hour delay, I don’t care, I’m going” is about travel without using the word. A small supervised model sits between the two: it learns from examples and runs offline.',
      },
      {
        title: 'How big can the model be?',
        body: 'The first export stored each word vector as its own base64 string at 100 dimensions — about 5.5 MB. Repacking to one int8 blob at 50 dimensions with a single global scale brought the shipped module to about 768 KB.',
      },
    ],
    decisions: [
      {
        title: 'On-device fastText classifier instead of an LLM API',
        problem: 'Map free-text posts to one of 30 interest categories.',
        options: [
          'Call a hosted LLM for every post',
          'Keyword and rule matching',
          'Train a small supervised model and run it on the device',
        ],
        tradeoffs:
          'The LLM handles nuance but costs money per post, adds latency and a network dependency, and sends user text off-device. Rules are cheap but brittle. An on-device model is private and offline, but its quality is bounded by its training data and it needs a retraining pipeline.',
        decision:
          'Train a fastText classifier, export the weights, and run inference in pure JavaScript with no native modules.',
        reason:
          'This is a narrow, fixed-label task. It doesn’t need a generative model, and keeping user text on the device matters for a social app.',
        result:
          'Inference runs offline. The model ships in the JS bundle (~768 KB) and can be replaced with an over-the-air update. Accuracy is covered in the evaluation below.',
      },
      {
        title: 'Disconnect the socket in the background; queue what would be lost',
        problem:
          'A background socket wastes battery and gets killed by the OS anyway, and view events emitted while disconnected silently disappear.',
        options: [
          'Keep the socket open and let the OS decide',
          'Disconnect on background and drop pending events',
          'Disconnect on background and persist pending events to disk',
        ],
        tradeoffs:
          'Holding the socket open is unpredictable across platforms. Dropping events loses analytics. Persisting events costs storage and needs a bound, because an unbounded on-device queue is its own liability.',
        decision:
          'Tie the socket to AppState: disconnect on background, reconnect on foreground, with Socket.IO reconnection (5 attempts, 1 s backoff growing to 10 s). View events are written to an AsyncStorage queue capped at 50 and flushed once the socket reports connected.',
        reason:
          'Connection state follows what the user is actually doing, and the events most likely to be lost — those fired as the app is backgrounded — survive the app being killed.',
        result:
          'Reconnection and flushing happen in one place. Only one flush runs at a time, and it is a no-op while disconnected. Both paths have unit tests.',
      },
      {
        title: 'Two over-the-air channels for staged releases',
        problem:
          'JavaScript fixes shouldn’t wait for store review, but an untested update shouldn’t reach production users either.',
        options: [
          'Ship every change through the Play Store',
          'One OTA channel for everything',
          'Separate development and production OTA channels',
        ],
        tradeoffs:
          'Store-only releases are slow. A single channel means testing on production. Two channels add process, and changes that touch native code still need a store build.',
        decision:
          'EAS Update with a development channel (on development-client builds) and a production channel, plus Gradle app-bundle builds for native changes.',
        reason:
          'Changes reach a development build first. Production gets the same update only after it has been exercised there.',
        result:
          'JavaScript-only fixes, including classifier retrains, reach production without a store release. Native changes still go through Gradle and Play Store review.',
      },
    ],
    spotlight: {
      id: 'classifier',
      title: 'An AI classifier that runs entirely on-device',
      intro:
        'The classifier maps a post to one of 30 interest categories without a network request. Training happens offline in Python; the app ships only the exported weights and about 350 lines of TypeScript inference code.',
      rationale: [
        'Offline: classification works with no connection.',
        'Private: post text never leaves the device for this feature.',
        'Cheap: no per-request API cost. Inference is a lookup, an average and a 30 × 50 matrix product.',
        'Updatable: pure JavaScript, so a retrained model ships over the air.',
      ],
      evaluation: classifierEvaluation,
      flow: {
        title: 'Inference pipeline',
        steps: [
          { label: 'User text', detail: 'A post or bio as typed' },
          {
            label: 'Preprocessing',
            detail: 'Lowercase, strip punctuation, keep tokens of 2+ characters',
          },
          { label: 'FastText embeddings', detail: '9,989-word vocabulary × 50 dimensions, int8' },
          { label: 'Feature vector', detail: 'Average of matched word vectors' },
          { label: 'Softmax classifier', detail: '30 × 50 output layer' },
          {
            label: '30 interest categories',
            detail: 'Top class if p ≥ 0.35, otherwise uncategorised',
          },
        ],
        caption:
          'Fewer than two tokens, or no known words, returns “uncategorised” instead of guessing.',
      },
      code: {
        title: 'Inference, simplified',
        language: 'ts',
        code: `function classify(text: string): Result {
const tokens = tokenise(text);              // lowercase, strip, length ≥ 2
if (tokens.length < 2) return UNCATEGORISED;

const sentence = averageEmbeddings(tokens); // int8 rows × global scale
if (!sentence) return UNCATEGORISED;        // no known words

const probs = softmax(CLASSES.map((c) => dot(c.vector, sentence)));
const top = argmax(probs);

return probs[top] >= 0.35
  ? { category: CLASSES[top].name, confidence: probs[top] }
  : { category: null, confidence: probs[top] };
}`,
        caption:
          'Written for this page to show the shape of the algorithm. Not the production source.',
      },
    },
    implementation: [
      {
        title: 'Authentication',
        body: 'Google, Apple and Facebook sign-in feed one session. The Axios client attaches the token and handles 401 responses centrally — and only signals session expiry when a token was actually set, so unauthenticated calls don’t trigger a false logout.',
      },
      {
        title: 'Notifications and deep links',
        body: 'Firebase Cloud Messaging delivers pushes and Notifee handles on-device display. Deep links route a tap to the specific screen it refers to.',
      },
      {
        title: 'Realtime messages',
        body: 'Incoming socket payloads are checked for required fields before they enter state. Malformed messages are logged and dropped rather than rendered.',
      },
      {
        title: 'Theming',
        body: 'An app-wide theme provider supplies colour tokens, so dark mode is a token swap rather than per-screen overrides.',
      },
      {
        title: 'Tests',
        body: 'Jest covers the pending-event queue, socket analytics, view tracking, and the community-insight dashboards and their tabs — 14 test files at the time of writing.',
      },
    ],
    production: [
      {
        title: 'Crash reporting',
        body: 'Sentry captures crashes and errors from production builds.',
      },
      {
        title: 'Analytics',
        body: 'Mixpanel and Firebase Analytics track product usage. Socket-level view events go through the persisted queue described above.',
      },
      {
        title: 'Releases',
        body: 'Gradle app bundles for the Play Store, with EAS-managed version auto-increment. JavaScript changes go through the development channel, then the production channel.',
      },
      {
        title: 'Load testing',
        body: 'A Node harness replays the full onboarding sequence — register, username check, profile update, image upload, interest selection — for up to 1,000 accounts at once. k6 scenarios cover feed and moments traffic.',
      },
    ],
    outcome: {
      summary: [
        'Whistler is live on the Google Play Store. The app runs realtime chat, push notifications, social sign-in and on-device classification in production, with crash reporting and analytics in place.',
        'Usage figures are not published here: they belong to the product, and I won’t quote numbers I can’t show the source for.',
      ],
      metrics: [
        ...classifierEvaluation.metrics,
        {
          label: 'Active users',
          basis: 'unavailable',
          value: null,
          note: 'Impact metric unavailable.',
        },
      ],
    },
    lessons: [
      'A validation score is only as good as the split behind it. I augmented each sentence into three near-copies before splitting, so 2,199 of 2,238 validation lines had a twin in training. The 99% measured memorisation. Splitting by source sentence first gives 60–64%: useful, but a different claim. I now split before augmenting, and report the method next to the number.',
      'Most realtime work on mobile is lifecycle work. The hard part wasn’t sending messages — it was deciding what the connection should do when the app is backgrounded, killed or offline, and making sure nothing important disappears in between.',
      'A confidence threshold is a product decision. Returning “uncategorised” below 0.35 is better than confidently putting a post in the wrong community.',
    ],
    next: [
      'Build an evaluation set from real, anonymised posts and report per-class precision, recall and a confusion matrix — the current numbers come from hand-written sentences.',
      'Evaluate the quantised JavaScript model directly. Today’s scores are from the float model before int8 export.',
      'Tune the 0.35 threshold against a precision target on real data instead of choosing it by hand.',
      'Extend automated tests to reconnection and notification routing, where failures are hardest to reproduce by hand.',
    ],
    showcase: [
      {
        device: 'mobile',
        title: 'Chats',
        figure: {
          src: '/work/whistler-mobile/chats.png',
          alt: 'Chats screen with All and Unread filters and a list of conversations. Names, avatars and previews are redacted.',
          width: 499,
          height: 866,
          caption: 'Realtime chat list. Personal data redacted.',
        },
      },
      {
        device: 'mobile',
        title: 'Home',
        figure: {
          src: '/work/whistler-web/mobile-home-safari.png',
          alt: 'Whistler home screen, captured from the web app at phone width: an “Email Not Verified” banner with a verify link, a greeting, community filters (All communities, Hot & Trending, For You, Public), a Hot & Trending Communities carousel, the bottom tab bar, and Safari’s address bar below. The email address, community photos and URL are replaced with grey blocks.',
          width: 808,
          height: 1572,
          caption:
            'Home, captured from the web app’s mobile view, which mirrors the native app’s home screen. Unverified accounts get a persistent prompt to verify their email. Email address, user photos and URL redacted.',
        },
      },
      {
        device: 'mobile',
        title: 'Moments',
        figure: {
          src: '/work/whistler-mobile/moments-categories.png',
          alt: 'Moments screen header with a search field and category filters: All, Faith & Spirituality, Fitness & Health.',
          width: 522,
          height: 200,
          caption: 'Moments are filterable by the same interest taxonomy the classifier predicts.',
        },
      },
      {
        device: 'mobile',
        title: 'Community',
        figure: {
          src: '/work/whistler-mobile/community.png',
          alt: 'A public community header titled World Cup 2026 Atlanta, with a description and Feed, Connection and Events tabs.',
          width: 514,
          height: 283,
          caption: 'Each community has its own feed, connections and events.',
        },
      },
      {
        device: 'mobile',
        title: 'Composer',
        figure: {
          src: '/work/whistler-mobile/composer.png',
          alt: 'Create Discussion screen with a profile visibility selector, an empty text area reading “What is happening?”, and an Attach Media button. The author is redacted.',
          width: 522,
          height: 1155,
          caption: 'Composer. Post stays inactive while the composer is empty.',
        },
      },
    ],
  },
};
