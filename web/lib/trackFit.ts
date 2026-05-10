// Implementation of the track-fit rubric from
// skills/idea/base-batches-copilot/references/track-fit-rubric.md.

export type TrackId = "startup" | "student" | "robotics";

export interface QuestionDef {
  id: string;
  question: string;
  options: { value: number | "DQ"; label: string }[];
  appliesTo: TrackId | "all";
}

// Each question scores 0/1/2 per option, OR triggers DQ for the relevant track.
// Some questions apply to a single track (eligibility gate), others to all.

export const QUESTIONS: QuestionDef[] = [
  // Universal: stage of product
  {
    id: "stage",
    appliesTo: "all",
    question: "What's the stage of your project?",
    options: [
      { value: 0, label: "Just an idea, no demo" },
      { value: 1, label: "Designs / mockups" },
      { value: 1, label: "Prototype, not yet usable end-to-end" },
      { value: 2, label: "Working demo (sepolia or mainnet)" },
      { value: 2, label: "Live with real users" },
    ],
  },
  // Startup-specific
  {
    id: "funding",
    appliesTo: "startup",
    question: "How much have you raised so far?",
    options: [
      { value: 2, label: "Nothing / < $50k" },
      { value: 1, label: "$50k – $200k" },
      { value: 1, label: "$200k – $250k" },
      { value: "DQ", label: "More than ~$250k" },
    ],
  },
  // Universal: team
  {
    id: "team",
    appliesTo: "all",
    question: "What does the team look like?",
    options: [
      { value: 0, label: "Solo, first project" },
      { value: 1, label: "Solo, prior shipped projects" },
      { value: 1, label: "Two people, met recently" },
      { value: 2, label: "Two or more, shipped together before" },
    ],
  },
  // Universal: Why Base
  {
    id: "why_base",
    appliesTo: "all",
    question: "Your 'Why Base' — pick the closest match.",
    options: [
      { value: 0, label: "Base is fast and cheap (only)" },
      { value: 1, label: "We mention a primitive but don't depend on it" },
      { value: 2, label: "We name a primitive and our product depends on it" },
      {
        value: 2,
        label: "Primitive named + we can show the code integration point",
      },
    ],
  },
  // Universal: Demo
  {
    id: "demo",
    appliesTo: "all",
    question: "Demo readiness?",
    options: [
      { value: 0, label: "No demo planned in time" },
      { value: 1, label: "Designs / mockups only" },
      { value: 1, label: "Prototype, not stable" },
      { value: 2, label: "Live demo URL, judge can try it" },
    ],
  },
  // Startup-specific: investability
  {
    id: "investability",
    appliesTo: "startup",
    question: "Investor readiness — pick the closest match.",
    options: [
      { value: 0, label: "No clear ask, no traction signal" },
      { value: 1, label: "Generic ask, some early traction" },
      {
        value: 2,
        label: "Specific ask + real traction (users, design partners, GTV)",
      },
    ],
  },
  // Student-specific: composition
  {
    id: "all_undergrads",
    appliesTo: "student",
    question: "Are all team members undergraduates?",
    options: [
      { value: "DQ", label: "No — at least one non-undergrad" },
      { value: 1, label: "Mixed — most undergrads" },
      { value: 2, label: "Yes — all undergrads" },
    ],
  },
  // Student-specific: technical
  {
    id: "student_technical",
    appliesTo: "student",
    question: "Technical depth of the team?",
    options: [
      { value: 0, label: "Beginners" },
      { value: 1, label: "One coder" },
      { value: 2, label: "Multiple shipped projects" },
    ],
  },
  // Student-specific: originality
  {
    id: "originality",
    appliesTo: "student",
    question: "How original is the idea?",
    options: [
      { value: 0, label: "Common / clone of existing" },
      { value: 1, label: "Twist on a common idea" },
      { value: 2, label: "Genuinely novel" },
    ],
  },
  // Robotics-specific: expertise
  {
    id: "robotics_expertise",
    appliesTo: "robotics",
    question: "Robotics background?",
    options: [
      { value: "DQ", label: "None / not interested" },
      { value: 0, label: "Hobbyist" },
      { value: 1, label: "One member with robotics work experience" },
      { value: 2, label: "Multiple members with shipped robotics" },
    ],
  },
  // Robotics-specific: onchain hook
  {
    id: "robotics_onchain",
    appliesTo: "robotics",
    question: "How does Base / onchain fit your robotics product?",
    options: [
      { value: "DQ", label: "It doesn't, really" },
      { value: 0, label: "Forced fit" },
      { value: 1, label: "Plausible integration" },
      { value: 2, label: "Tightly integrated, central to the product" },
    ],
  },
  // Robotics-specific: feasibility
  {
    id: "robotics_feasibility",
    appliesTo: "robotics",
    question: "Can you ship in the 4-week robotics program?",
    options: [
      { value: "DQ", label: "No, plan needs > 6 months" },
      { value: 0, label: "Ambitious — at the edge" },
      { value: 1, label: "Tight but possible" },
      { value: 2, label: "Realistic, milestones planned" },
    ],
  },
  // Robotics-specific: physical demo
  {
    id: "robotics_demo",
    appliesTo: "robotics",
    question: "Physical demo plan?",
    options: [
      { value: 0, label: "Simulation only" },
      { value: 1, label: "Hardware demo planned" },
      { value: 2, label: "Working hardware now" },
    ],
  },
];

export interface TrackResult {
  track: TrackId;
  label: string;
  score: number;
  maxScore: number;
  dq: boolean;
  dqReasons: string[];
}

export function scoreTrack(
  track: TrackId,
  answers: Record<string, number | "DQ" | undefined>,
): TrackResult {
  const relevant = QUESTIONS.filter(
    (q) => q.appliesTo === "all" || q.appliesTo === track,
  );
  let score = 0;
  let max = 0;
  let dq = false;
  const dqReasons: string[] = [];
  for (const q of relevant) {
    max += 2;
    const a = answers[q.id];
    if (a === undefined) continue;
    if (a === "DQ") {
      dq = true;
      dqReasons.push(q.question);
      continue;
    }
    score += a;
  }
  const labels: Record<TrackId, string> = {
    startup: "Startup",
    student: "Student",
    robotics: "Robotics",
  };
  return { track, label: labels[track], score, maxScore: max, dq, dqReasons };
}

export function recommendTrack(
  answers: Record<string, number | "DQ" | undefined>,
): TrackResult[] {
  return (["startup", "student", "robotics"] as TrackId[])
    .map((t) => scoreTrack(t, answers))
    .sort((a, b) => {
      if (a.dq !== b.dq) return a.dq ? 1 : -1;
      const aPct = a.score / a.maxScore;
      const bPct = b.score / b.maxScore;
      return bPct - aPct;
    });
}
