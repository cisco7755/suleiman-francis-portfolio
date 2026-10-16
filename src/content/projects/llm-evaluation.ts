import type { Project } from '../types';

/**
 * SeamHealth LLM evaluation and RLHF: prompt design, rubric-based review,
 * data annotation, and human feedback that flags hallucinations and
 * inconsistencies. No volume or agreement rate was recorded.
 */
export const llmEvaluation: Project = {
  slug: 'llm-evaluation',
  name: 'LLM Evaluation',
  featured: false,
  headline: 'LLM evaluation and RLHF: reviewing model output before it reaches users.',
  summary:
    'Prompt design, rubric-based review, data annotation and RLHF on LLM responses at SeamHealth, with flags for hallucinations and inconsistencies.',
  metaDescription:
    'Case study: Suleiman Francis’s LLM evaluation and RLHF work at SeamHealth — prompt design, rubric-based review, data annotation, and hallucination flags.',
  role: 'Engineer · LLM evaluation and RLHF',
  timeline: '2023 — Present',
  team: 'SeamHealth Group. Team size not listed.',
  platform: 'LLM APIs · internal review',
  category: 'AI · Evaluation and annotation',
  organisation: 'SeamHealth Group',
  stack: ['OpenAI API', 'Anthropic API', 'Prompt engineering', 'Rubrics'],
  tags: ['LLM Evaluation', 'RLHF', 'Data Annotation', 'Prompt Engineering'],
  disciplines: ['ai'],
  outcome:
    'Model responses were reviewed against a written rubric. The labels are the human feedback (RLHF), including flags for hallucinations and inconsistencies.',
  confidentiality:
    'This was internal SeamHealth work on model output. No prompts, responses, screenshots or datasets are shown, and the review flow is simplified.',
  cover: { kind: 'diagram' },
  caseStudy: {
    context: [
      'SeamHealth used LLM APIs for generative tasks. A fluent answer can still miss the instruction, contradict the source, or invent a fact, so responses were reviewed before they were used.',
    ],
    responsibility: {
      owned: [
        'Prompt design for the tasks under review',
        'Rubric-based review of model responses',
        'Annotation of failures: hallucination, inconsistency, and missed instructions',
        'RLHF: the human feedback recorded on those labels',
      ],
      collaborated: [
        'The product and engineering teammates who decided what a passing response had to do',
      ],
    },
    challenge: [
      'Reading a response and deciding whether it “seems fine” does not travel. Two reviewers describe the same failure differently, and a fluent wrong answer gets through. The review needed a written rubric and a small set of labels so the same mistake was marked the same way each time.',
    ],
    constraints: [
      {
        title: 'Written guidelines',
        body: 'A response passes or fails against the rubric, not against how polished it sounds.',
      },
      {
        title: 'Source of truth',
        body: 'Claims were checked against the material the prompt was given. A detail that was not in that material was a hallucination, even if it was plausible.',
      },
      {
        title: 'No published counts',
        body: 'How many responses were reviewed, and how often reviewers agreed, was not recorded. Those figures are left unstated.',
      },
    ],
    architecture: {
      title: 'Review before use',
      layers: [
        { label: 'Task', nodes: ['Prompt', 'Source material'] },
        { label: 'Model', nodes: ['OpenAI API', 'Anthropic API'] },
        { label: 'Review', nodes: ['Written rubric', 'Annotation labels'] },
        { label: 'Feedback', nodes: ['RLHF labels', 'Hallucination flag', 'Inconsistency flag'] },
      ],
      caption: 'Simplified. Only the shape of the review is shown — no prompts or responses.',
      notes: [
        'Labels sit on the response before it is used. A miss is named (hallucination, inconsistency, missed instruction) instead of being waved through because the prose reads well.',
      ],
    },
    decisions: [
      {
        title: 'Annotate against a rubric instead of a free-text impression',
        problem:
          'Free-text review does not tell the next person what failed, and it treats fluent prose as evidence of correctness.',
        options: [
          'Accept a response when it reads well',
          'Score it against a written rubric and label the failure',
        ],
        tradeoffs:
          'A rubric takes time to write and to apply, and it misses failures nobody thought to name. An impression is faster and is not repeatable.',
        decision:
          'Review each response against the rubric and annotate the specific failure.',
        reason:
          'The label is what makes the same mistake findable the next time, and it keeps a fluent wrong answer from passing.',
        result:
          'Failures were recorded as hallucination, inconsistency, or a missed instruction, and flagged before the response was used.',
      },
    ],
    implementation: [
      {
        title: 'Prompts',
        body: 'Wrote and revised the prompts for the tasks under review, then checked the output against what the prompt actually asked for.',
      },
      {
        title: 'Rubric',
        body: 'Graded responses on instruction following, consistency with the source, and whether a fact had been invented.',
      },
      {
        title: 'Annotation',
        body: 'Marked each failure with a fixed label so later reviews used the same words for the same kind of miss.',
      },
      {
        title: 'RLHF',
        body: 'Those labels are the human feedback: a response is accepted or sent back from the rubric, not from how fluent it sounds.',
      },
    ],
    production: [
      {
        title: 'Gate',
        body: 'Hallucination and inconsistency flags were applied before a response was treated as usable.',
      },
    ],
    outcome: {
      summary: [
        'The review turned “does this sound right?” into a rubric check with named failure labels. How many responses that covered, and how often two reviewers agreed, was not recorded.',
      ],
      metrics: [
        {
          label: 'Responses reviewed',
          basis: 'unavailable',
          value: null,
          note: 'Unavailable. The review volume was not recorded.',
        },
      ],
    },
    lessons: [
      'A rubric is the annotation guideline. Without it, review notes describe tone instead of the failure.',
    ],
    next: [
      'Record the review volume and how often two people apply the same label, so the rubric itself can be checked.',
    ],
  },
};
