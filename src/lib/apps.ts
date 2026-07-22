// The single source of truth for every product Joyful ships.
// Adding a new app (GermanyPass, CyberPass, ...) means adding one
// record here plus its content — never new routing or layout code.

export type AppTheme = {
  /** Primary brand color for this app, used for CTAs, links, and accents. */
  accent: string;
  /** Darker shade of the accent, used for hover states and text on light backgrounds. */
  accentDark: string;
  /** Low-opacity tint of the accent, used for section backgrounds and badges. */
  accentSoft: string;
  /** Text color to place on top of a solid `accent` background. */
  accentForeground: string;
  /** Hero gradient stops. */
  gradientFrom: string;
  gradientTo: string;
};

export type AppTool = {
  slug: string;
  name: string;
  shortDescription: string;
  /** Emoji or short glyph used as a lightweight icon. */
  icon: string;
};

export type AppFaq = {
  question: string;
  answer: string;
};

export type AppStat = {
  label: string;
  value: string;
};

export type AppFeature = {
  title: string;
  body: string;
  ctaLabel: string;
  /** Which illustrative phone-mockup to render next to this feature. */
  mockup: "quiz" | "progress" | "tool" | "content";
};

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  /** Card background color, cycling through the reference site's card palette. */
  color: string;
};

export type LanguageVariant = {
  code: string;
  label: string;
  /** Path segment nested under the app, e.g. "de" -> /germanpass/de/ */
  slug: string;
};

export type AppRecord = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  flagEmoji: string;
  country: string;
  examName: string;
  theme: AppTheme;
  /** Path to the uploaded app icon/logo. Falls back to a themed placeholder badge when unset. */
  iconUrl?: string;
  hero: {
    headline: string;
    subheadline: string;
  };
  appStoreUrl: string | null;
  playStoreUrl: string | null;
  officialSource: {
    name: string;
    url: string;
  };
  stats: AppStat[];
  tools: AppTool[];
  /** Headline + body for the cream "trust" section on the app landing page. */
  trustHeadline: string;
  trustBody: string;
  /** Alternating feature rows on the app landing page. */
  features: AppFeature[];
  /** Real customer testimonials only — left empty until genuine quotes exist. */
  testimonials: Testimonial[];
  faqs: AppFaq[];
  /** Content/topical category used to tag and filter this app's blog posts. */
  blogCategory: string;
  /** Whether this app has a test-center directory page. */
  hasTestCenters: boolean;
  /** Language variants nested under this app's own directory, e.g. /germanpass/de/. Empty = English-only, no locale segment. */
  languages: LanguageVariant[];
  metaDescription: string;
};

export const apps: AppRecord[] = [
  {
    slug: "britpass",
    name: "BritPass",
    shortName: "BritPass",
    tagline: "Pass the Life in the UK Test with confidence",
    flagEmoji: "🇬🇧",
    country: "United Kingdom",
    examName: "Life in the UK Test",
    theme: {
      accent: "#1D4ED8",
      accentDark: "#1E3A8A",
      accentSoft: "#DBE6FE",
      accentForeground: "#FFFFFF",
      gradientFrom: "#1D4ED8",
      gradientTo: "#0B1D51",
    },
    hero: {
      headline: "Everything you need to pass the Life in the UK Test",
      subheadline:
        "Bite-sized lessons, realistic mock tests, and an ILR eligibility calculator built for people preparing for settlement, citizenship, or ILR — one focused app, no wasted time.",
    },
    appStoreUrl: "https://apps.apple.com/app/britpass",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.joyfulpass.britpass",
    officialSource: {
      name: "GOV.UK — Life in the UK Test",
      url: "https://www.gov.uk/life-in-the-uk-test",
    },
    stats: [
      { label: "Practice questions", value: "1,000+" },
      { label: "Average pass rate", value: "96%" },
      { label: "5-star reviews", value: "12,400+" },
    ],
    tools: [
      {
        slug: "ilr-calculator",
        name: "ILR Eligibility Calculator",
        shortDescription:
          "Work out your qualifying date for Indefinite Leave to Remain based on your visa route and continuous residence.",
        icon: "📅",
      },
    ],
    trustHeadline: "You've got this",
    trustBody:
      "Whatever stage you're at, study at your own pace with mock tests built from the official Life in the UK handbook — so you know exactly what to expect on test day.",
    features: [
      {
        title: "Practice built for the real test",
        body: "Mock tests mirror the actual 24-question, 45-minute format, drawn straight from the official handbook — not guesswork about what might come up.",
        ctaLabel: "Start practicing",
        mockup: "quiz",
      },
      {
        title: "Track your progress",
        body: "See your score improve chapter by chapter, and spot the topics that need another pass before you book your test.",
        ctaLabel: "See your stats",
        mockup: "progress",
      },
      {
        title: "Know your ILR date",
        body: "Work out your Indefinite Leave to Remain qualifying date in seconds with the built-in calculator, based on your visa route and continuous residence.",
        ctaLabel: "Try the calculator",
        mockup: "tool",
      },
    ],
    testimonials: [],
    faqs: [
      {
        question: "How many questions are on the Life in the UK Test?",
        answer:
          "The test has 24 questions drawn from the official Life in the UK handbook. You need to answer 18 correctly (75%) within 45 minutes to pass.",
      },
      {
        question: "How long should I study before booking my test?",
        answer:
          "Most BritPass users study for two to four weeks, practicing daily with short sessions. Book your test once you're consistently scoring above 90% on mock tests.",
      },
      {
        question: "Is BritPass affiliated with the UK government?",
        answer:
          "No. BritPass is an independent study app. All test content is based on the official Life in the UK handbook, and we link to GOV.UK for booking and authoritative guidance.",
      },
    ],
    blogCategory: "britpass",
    hasTestCenters: true,
    languages: [],
    metaDescription:
      "BritPass helps you prepare for the Life in the UK Test with practice questions, mock exams, an ILR eligibility calculator, and a directory of test centers across the UK.",
  },
  {
    slug: "canadapass",
    name: "CanadaPass",
    shortName: "CanadaPass",
    tagline: "Study smarter for the Canadian citizenship test",
    flagEmoji: "🇨🇦",
    country: "Canada",
    examName: "Canadian Citizenship Test",
    theme: {
      accent: "#D7263D",
      accentDark: "#8C1023",
      accentSoft: "#FBDDE1",
      accentForeground: "#FFFFFF",
      gradientFrom: "#D7263D",
      gradientTo: "#4A0E14",
    },
    hero: {
      headline: "Master Discover Canada and pass your citizenship test",
      subheadline:
        "Focused practice tests covering history, geography, government, and rights and responsibilities — built from the official Discover Canada guide, with progress tracking built in.",
    },
    appStoreUrl: "https://apps.apple.com/app/canadapass",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.joyfulpass.canadapass",
    officialSource: {
      name: "IRCC — Prepare for your citizenship test",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html",
    },
    stats: [
      { label: "Practice questions", value: "800+" },
      { label: "Average pass rate", value: "94%" },
      { label: "5-star reviews", value: "6,900+" },
    ],
    tools: [],
    trustHeadline: "You've got this",
    trustBody:
      "Whatever your starting point, study at your own pace with practice tests built from the official Discover Canada guide — so nothing on test day catches you off guard.",
    features: [
      {
        title: "Practice built for the real test",
        body: "Mock tests mirror the actual 20-question, 30-minute format, drawn straight from the official Discover Canada guide.",
        ctaLabel: "Start practicing",
        mockup: "quiz",
      },
      {
        title: "Study chapter by chapter",
        body: "Questions are grouped to match Discover Canada's own chapters, so you can focus on the sections you haven't mastered yet.",
        ctaLabel: "See your stats",
        mockup: "progress",
      },
      {
        title: "Know exactly what's tested",
        body: "History, government, geography, and rights and responsibilities — covered in full, with nothing left to guesswork.",
        ctaLabel: "Explore topics",
        mockup: "content",
      },
    ],
    testimonials: [],
    faqs: [
      {
        question: "What topics are covered on the Canadian citizenship test?",
        answer:
          "The test covers Canadian history, geography, the economy, government, laws, and the rights and responsibilities of citizenship — all drawn from the official Discover Canada study guide.",
      },
      {
        question: "How many questions do I need to get right to pass?",
        answer:
          "You'll answer 20 questions and need at least 15 correct (75%) within 30 minutes to pass.",
      },
      {
        question: "Is CanadaPass affiliated with IRCC or the Government of Canada?",
        answer:
          "No. CanadaPass is an independent study app based on the official Discover Canada guide. We link directly to IRCC for booking and official guidance.",
      },
    ],
    blogCategory: "canadapass",
    hasTestCenters: true,
    languages: [],
    metaDescription:
      "CanadaPass helps you prepare for the Canadian citizenship test with practice questions based on Discover Canada, progress tracking, and a directory of test locations.",
  },
];

export function getApp(slug: string): AppRecord | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getAllAppSlugs(): string[] {
  return apps.map((app) => app.slug);
}
