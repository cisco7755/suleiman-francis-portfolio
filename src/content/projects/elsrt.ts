import type { Project } from '../types';

export const elsrt: Project = {
  slug: 'elsrt',
  name: 'ELSRT',
  featured: false,
  headline: 'Improving reliability and throughput in a high-volume laboratory reporting system.',
  summary:
    'Electronic lab sample reporting tool: real-time validation and error handling for high-volume lab data entry.',
  metaDescription:
    'Case study: Suleiman Francis’s work on ELSRT, an electronic lab sample reporting tool — real-time validation and error handling for high-volume data entry, cutting manual verification by an estimated 30%.',
  role: 'Frontend engineer · module delivery',
  timeline: '2023 — 2025',
  team: 'SeamHealth Group product engineering. Team size not listed.',
  platform: 'Web · enterprise healthcare',
  category: 'Enterprise · Healthcare data',
  organisation: 'SeamHealth Group',
  stack: ['Angular', 'TypeScript', 'REST APIs'],
  tags: ['Angular', 'Data Validation', 'Performance', 'Enterprise'],
  disciplines: ['frontend'],
  outcome: 'Manual verification time cut by an estimated 30% (team estimate, not instrumented).',
  confidentiality:
    'ELSRT is a SeamHealth Group product handling laboratory data. No screenshots, code or data are shown, and the architecture is simplified.',
  cover: { kind: 'diagram' },
  caseStudy: {
    context: [
      'ELSRT (Electronic Lab Sample Reporting Tool) is used to record and report laboratory sample results. Staff enter results in volume, and errors carry consequences downstream.',
    ],
    responsibility: {
      owned: [
        'ELSRT modules for real-time validation and error handling during lab data entry',
        'Optimisation of the high-volume processing path',
      ],
      collaborated: [
        'Requirements and acceptance criteria with stakeholders',
        'Backend services the modules submit to',
      ],
    },
    challenge: [
      'When errors are only caught after submission, or in a manual review step, staff find them late, in batches, after the context is gone. The goal was to catch errors while the person is still on the field — without slowing down people who enter records all day.',
    ],
    constraints: [
      {
        title: 'Accuracy',
        body: 'This is healthcare data. A wrong value that passes validation is worse than a slow form.',
      },
      {
        title: 'Throughput',
        body: 'Validation can’t add noticeable lag or friction to a high-volume workflow.',
      },
      {
        title: 'Existing system',
        body: 'The work shipped as modules inside an existing Angular application.',
      },
    ],
    architecture: {
      title: 'Validated data entry',
      layers: [
        { label: 'Entry', nodes: ['Data-entry form'] },
        { label: 'Validation', nodes: ['Real-time field validation'] },
        { label: 'Feedback', nodes: ['Inline error handling'] },
        { label: 'Submission', nodes: ['REST API', 'Reporting'] },
      ],
      caption: 'Simplified and sanitised. Only the shape of the flow is shown.',
      notes: [
        'Errors are reported where they happen — on the field — instead of after a batch has been submitted.',
      ],
    },
    decisions: [
      {
        title: 'Validate at entry time instead of relying on later manual verification',
        problem:
          'Errors were being found after submission, which made verification slow and manual.',
        options: ['Keep post-submission manual verification', 'Validate in real time during entry'],
        tradeoffs:
          'Real-time validation adds rules to maintain in the frontend and has to stay fast. Manual verification costs staff time and catches errors late.',
        decision: 'Real-time validation and error handling in the data-entry modules.',
        reason:
          'The cheapest moment to fix a value is while the person entering it still has the sample in front of them.',
        result: 'Manual verification time fell by an estimated 30%.',
      },
    ],
    implementation: [
      {
        title: 'Validation',
        body: 'Real-time, field-level validation with specific error messages on lab data entry.',
      },
      {
        title: 'Error handling',
        body: 'Errors are reported inside the entry workflow, where they can be fixed immediately.',
      },
      {
        title: 'Performance',
        body: 'Optimised the high-volume processing path so validation didn’t slow down bulk work.',
      },
    ],
    production: [
      {
        title: 'Delivery',
        body: 'Shipped through the team’s Agile process, with code review and acceptance criteria for each module.',
      },
    ],
    outcome: {
      summary: [
        'Real-time validation moved error detection to the moment of entry. The team estimated that manual verification time dropped by about 30%.',
      ],
      metrics: [
        {
          label: 'Manual verification time',
          basis: 'estimate',
          value: '−30%',
          note: 'Team estimate, not instrumented.',
        },
      ],
    },
    lessons: [
      'Validation is a usability feature, not just a data-quality one. A good error message at the right moment saves more time than any later check.',
    ],
    next: [
      'Instrument it. The 30% is an estimate; I’d add timing events around the verification step to measure the change properly.',
      'Track which validation rules fire most often — they point to confusing fields or upstream data problems.',
    ],
  },
};
