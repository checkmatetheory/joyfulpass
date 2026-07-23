// Homepage marketing content, structured so copy lives in one place.
// The tone is deliberately welcoming, plain-spoken, and trustworthy —
// the psychology the reference exam-prep sites use to reassure nervous
// test-takers: reduce anxiety, emphasise official sources, show a clear
// path, and let real outcomes do the persuading.

export type Feature = {
  mockup: "quiz" | "progress" | "content";
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
  countryCode: "gb" | "ca";
  /** Placeholder portrait (mockup service). Replace with a real, permissioned photo. */
  photo: string;
  rating: number;
};

// "Your success starts here" — outcome-focused app experiences.
export const features: Feature[] = [
  {
    mockup: "quiz",
    title: "Study only what's on the test",
    body: "Every question is built from the official government handbook — so you spend your time on what actually comes up, not trivia you'll never be asked.",
  },
  {
    mockup: "progress",
    title: "See your progress in real time",
    body: "Track your score chapter by chapter and know exactly when you're ready to book. No guesswork, no cramming the night before.",
  },
  {
    mockup: "content",
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

// PLACEHOLDER testimonials — illustrative mockup content only. The names are
// invented and the photos come from a placeholder-portrait service
// (randomuser.me), NOT real customers. Replace every entry with a genuine,
// permission-granted review + photo (or delete the section) before launch.
// Do not ship invented quotes as real social proof.
export const testimonials: HomeTestimonial[] = [
  {
    quote:
      "I'd put off booking my Life in the UK Test for months because I was so nervous. Two weeks with BritPass and I passed first time. I actually teared up in the car afterwards.",
    name: "Amara Okafor",
    detail: "Passed the Life in the UK Test · London",
    countryCode: "gb",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    quote:
      "The practice tests felt exactly like the real thing. By test day there were genuinely no surprises — I knew every answer before I'd finished reading the question.",
    name: "David Chen",
    detail: "Passed the Canadian Citizenship Test · Toronto",
    countryCode: "ca",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    quote:
      "Studying in five-minute bursts around a full-time job and two kids made all the difference. I actually looked forward to opening the app on the bus home.",
    name: "Priya Sharma",
    detail: "Passed the Life in the UK Test · Manchester",
    countryCode: "gb",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    quote:
      "English isn't my first language and I was terrified of the wording. The clear explanations after each question built my confidence more than any textbook did.",
    name: "Luca Rossi",
    detail: "Passed the Canadian Citizenship Test · Vancouver",
    countryCode: "ca",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
  },
  {
    quote:
      "Worth every penny. I'd failed once using free quizzes online — with this I walked back in and passed comfortably. Thank you for making it feel doable.",
    name: "Fatima Al-Sayed",
    detail: "Passed the Life in the UK Test · Birmingham",
    countryCode: "gb",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
  },
];

export const commitment = {
  heading: "We're with you, every step of the way",
  body: "Passing a citizenship or settlement test is a life-changing milestone, and we don't take that lightly. Every question is sourced from official material, reviewed by people who know the process, and kept up to date — so you can prepare with total confidence.",
  ctaLabel: "Find your exam",
  ctaHref: "#apps",
};
