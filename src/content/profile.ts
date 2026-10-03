/**
 * Identity and contact facts. Source of truth: cv/profile/resume.md.
 * Everything here is public — never put private values in this file.
 */
export const profile = {
  name: 'Suleiman Francis',
  title: 'Software Engineer',
  specializations: ['Frontend', 'Backend', 'Mobile', 'AI'],
  location: 'Abuja, Nigeria',
  timezone: 'West Africa Time (UTC+1)',
  availability: 'Available for opportunities',
  yearsExperience: '4+',
  email: 'Francis.suleiman31@gmail.com',
  phone: { display: '+234 903 610 1623', href: 'tel:+2349036101623' },
  positioning: 'Software Engineer building production web, mobile, and AI-powered products.',
  headline: 'Building production web, mobile, and AI-powered products.',
  summary:
    'I build reliable software across frontend, backend, mobile, and AI systems—from architecture and APIs to polished interfaces and production deployment.',
  links: {
    linkedin: 'https://www.linkedin.com/in/francis-suleiman-259a77221',
    github: 'https://github.com/cisco7755',
  },
  resume: {
    href: '/resume/Suleiman-Francis-Resume.pdf',
    format: 'PDF, 3 pages',
  },
  education: [
    {
      institution: 'Nasarawa State University, Keffi',
      qualification: 'B.Sc. Computer Science',
      year: '2023',
    },
  ],
  resumeSummary:
    'Software Engineer with 4+ years of experience designing, building and shipping production web, mobile and backend software: Angular, React, Next.js and TypeScript on the frontend; REST services on Node.js and Python (FastAPI); cross-platform mobile with React Native and Flutter; and practical work integrating and evaluating AI/LLM features. Lead engineer on Whistler’s mobile app, web client and admin dashboard; frontend engineer on SeamHealth’s Clientshot platform.',
  bio: [
    'I’m a Software Engineer focused on building production web, mobile, and AI-powered products.',
    'My work spans frontend, backend, mobile development, and AI integration, with a focus on turning complex requirements into reliable, maintainable software.',
    'I’ve worked across SaaS, customer feedback, healthcare, community platforms, and internal enterprise systems, collaborating with product and engineering teams from requirements through implementation and production delivery.',
    'I care about more than getting a feature to work. I care about architecture, maintainability, performance, testing, observability, and the experience people have when using the software.',
  ],
  interests: [
    'How ML features behave on real user input, and how to evaluate them honestly',
    'Offline-first and realtime behaviour on unreliable mobile networks',
    'Technical writing: decision records, acceptance criteria, documentation',
    'Open source collaboration',
  ],
  principles: [
    {
      title: 'Know who owns each piece of state',
      body: 'Data the server owns is cached and invalidated; data the client owns lives in the client. Most stale-data bugs come from blurring the two.',
    },
    {
      title: 'Report how a number was measured',
      body: 'A metric without its methodology is a claim. I state the split, the sample and the basis — including when the honest answer is “not measured yet”.',
    },
    {
      title: 'Design the failure path first',
      body: 'Dropped sockets, 401s, empty lists, slow networks and low-confidence predictions are normal operating conditions, not edge cases.',
    },
    {
      title: 'Ship small, observable changes',
      body: 'Staged release channels, crash reporting and analytics make it possible to see what a change did in production instead of guessing.',
    },
    {
      title: 'Write it down',
      body: 'Acceptance criteria and documentation are part of the feature. They are how the next engineer — often me — understands why the code looks the way it does.',
    },
  ],
} as const;

export type Profile = typeof profile;
