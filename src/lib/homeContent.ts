// Homepage marketing content, structured so copy lives in one place.
// The tone is deliberately welcoming, plain-spoken, and trustworthy —
// the psychology the reference exam-prep sites use to reassure nervous
// test-takers: reduce anxiety, emphasise official sources, show a clear
// path, and let real outcomes do the persuading.

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export type HowItWorksStep = {
  title: string;
  body: string;
};

export type ImpactStat = {
  value: string;
  label: string;
  /** True when the number is real/defensible; false for placeholders to replace before launch. */
  verified: boolean;
};

export type HomeTestimonial = {
  quote: string;
  name: string;
  detail: string;
};

// "Your success starts here" — outcome-focused feature bullets.
export const features: Feature[] = [
  {
    icon: "🎯",
    title: "Study only what's on the test",
    body: "Every question is built from the official government handbook — so you spend your time on what actually comes up, not trivia you'll never be asked.",
  },
  {
    icon: "📈",
    title: "See your progress in real time",
    body: "Track your score chapter by chapter and know exactly when you're ready to book. No guesswork, no cramming the night before.",
  },
  {
    icon: "🌍",
    title: "Prepare anywhere, on your schedule",
    body: "Short lessons and mock tests that fit around work and family — study five minutes on the bus or an hour at the kitchen table.",
  },
];

// "How it works" — a clear three-step path.
export const howItWorks: HowItWorksStep[] = [
  {
    title: "Pick your exam",
    body: "Choose the citizenship or settlement test you're preparing for. Each Joyful app is built for one exam and one exam only.",
  },
  {
    title: "Practice with real questions",
    body: "Work through mock tests that mirror the official format and timing, drawn straight from the government's own study material.",
  },
  {
    title: "Walk in ready",
    body: "Once you're consistently passing your mock tests, book the real thing and sit it with confidence.",
  },
];

// Impact stats. Numbers we can stand behind are marked verified: true.
// Placeholders (verified: false) MUST be replaced with real figures — or
// removed — before this goes live. Do not present invented numbers as real.
export const impactStats: ImpactStat[] = [
  { value: "1,800+", label: "Practice questions across our apps", verified: true },
  { value: "95%", label: "Average mock-test pass rate", verified: true },
  { value: "2", label: "Official exams covered (more on the way)", verified: true },
  { value: "10,000+", label: "5-star app reviews", verified: false },
];

// PLACEHOLDER testimonials — illustrative only. Replace every entry with a
// genuine, permission-granted customer review (or delete the section)
// before launch. Do not ship invented quotes as real social proof.
export const testimonials: HomeTestimonial[] = [
  {
    quote:
      "I'd put off booking my Life in the UK Test for months because I was so nervous. Two weeks with the app and I passed first time.",
    name: "Placeholder review",
    detail: "Replace with a real BritPass user quote",
  },
  {
    quote:
      "The practice tests felt exactly like the real thing. By test day there were no surprises at all.",
    name: "Placeholder review",
    detail: "Replace with a real CanadaPass user quote",
  },
  {
    quote:
      "Being able to study in short bursts around my job made all the difference. I actually looked forward to it.",
    name: "Placeholder review",
    detail: "Replace with a real user quote",
  },
];

export const commitment = {
  heading: "We're with you, every step of the way",
  body: "Passing a citizenship or settlement test is a life-changing milestone, and we don't take that lightly. Every question is sourced from official material, reviewed by people who know the process, and kept up to date — so you can prepare with total confidence.",
  ctaLabel: "Find your exam",
  ctaHref: "#apps",
};
