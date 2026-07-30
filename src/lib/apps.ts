// The single source of truth for every product Joyful ships.
// Adding a new app (GermanyPass, CyberPass, ...) means adding one
// record here plus its content — never new routing or layout code.

export type AppTheme = {
  /** Primary brand color for this app, used for CTAs, links, and accents. Flag-primary. */
  accent: string;
  /** Darker shade of the accent, used for hover states and text on light backgrounds. */
  accentDark: string;
  /** Low-opacity tint of the accent, used for section backgrounds and badges. */
  accentSoft: string;
  /** Text color to place on top of a solid `accent` background. */
  accentForeground: string;
  /** Secondary flag color, used sparingly for national cues (e.g. UK red on blue). */
  accentSecondary: string;
  /**
   * Colour for the sidebar active-row highlight (and dark-mode toggle). Defaults
   * to `accent` when unset, so most apps highlight in their primary colour. Set
   * it only when the primary is a colour that would vanish as a highlight — e.g.
   * GermanPass uses a black primary but a red highlight so the active row still
   * reads in dark mode.
   */
  accentHighlight?: string;
  /**
   * The country's flag colors, left-to-right, for the subtle FlagAccentBar under
   * titles. Gives each silo a national feel without recoloring the whole UI.
   * e.g. UK ["#012169","#FFFFFF","#C8102E"], Canada ["#FF0000","#FFFFFF","#FF0000"].
   */
  flagColors: string[];
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

export type HeroMedia = {
  type: "image" | "video";
  /** Path to the city-specific hero background (e.g. /media/britpass/hero.jpg). */
  url: string;
};

export type AppRecord = {
  /** Brand/product slug (britpass). Used only for the noindex dashboard: /app/[slug]/. */
  slug: string;
  /**
   * The public, keyword-first silo segment — the real test name people search.
   * This is the URL root for every indexed page: /life-in-the-uk-test/... .
   * Never the brand ("britpass" isn't a search term).
   */
  examSlug: string;
  name: string;
  shortName: string;
  tagline: string;
  flagEmoji: string;
  country: string;
  examName: string;
  theme: AppTheme;
  /** Path to the uploaded app icon/logo. Falls back to a themed placeholder badge when unset. */
  iconUrl?: string;
  /** City-specific hero background (photo or video). Falls back to the gradient when unset. */
  heroMedia?: HeroMedia;
  /**
   * Dedicated background image for CTA banners across this app's templates.
   * Gives each silo a distinct branded banner look. Falls back to `heroMedia`,
   * then to the accent gradient, when unset.
   */
  ctaBannerImage?: string;
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
    examSlug: "life-in-the-uk-test",
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
      accentSecondary: "#C8102E", // Union Jack red
      flagColors: ["#012169", "#FFFFFF", "#C8102E"], // Union Jack: blue, white, red
      gradientFrom: "#1D4ED8",
      gradientTo: "#0B1D51",
    },
    iconUrl: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1BUBTO8ufXcr6Fdb7TYlAaW1GvmhjOS0uxE42",
    heroMedia: {
      type: "image",
      url: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1sGNvWb02trGJvOKdcpQuA8fbURnZis5gjV7C",
    },
    hero: {
      headline: "Everything you need to pass the Life in the UK Test",
      subheadline:
        "Bite-sized lessons, realistic mock tests, and an ILR eligibility calculator built for people preparing for settlement, citizenship, or ILR — one focused app, no wasted time.",
    },
    appStoreUrl: "https://apps.apple.com/gb/app/britpass-life-in-the-uk-test/id6754894750",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.createinc.lifeinuktest&hl=en",
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
    examSlug: "canadian-citizenship-test",
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
      accentSecondary: "#D7263D", // Canadian red (flag is red/white/red)
      flagColors: ["#FF0000", "#FFFFFF", "#FF0000"], // Maple Leaf: red, white, red
      gradientFrom: "#D7263D",
      gradientTo: "#4A0E14",
    },
    iconUrl: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1RxP2dC7BhAYrLo1uIdltUiTFOMzbnvqC20HP",
    heroMedia: {
      type: "image",
      url: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1TZg3P8DwG9rjJDoM5lNspAIZEfFeOVRmaQ0v",
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
  {
    slug: "germanpass",
    examSlug: "einbuergerungstest",
    name: "GermanPass",
    shortName: "GermanPass",
    tagline: "Pass the Einbürgerungstest with confidence",
    flagEmoji: "🇩🇪",
    country: "Germany",
    examName: "Einbürgerungstest",
    theme: {
      accent: "#1A1A1A", // German flag black — primary buttons + CTA
      accentDark: "#C40000", // flag red — CTA gradient end + icon glyphs on gold
      accentSoft: "#FFE9A8", // flag gold tint — icon tiles (secondary)
      accentForeground: "#FFFFFF",
      accentSecondary: "#FFCE00", // flag gold
      accentHighlight: "#DD0000", // flag red — sidebar active row + toggle (stays vivid in dark)
      flagColors: ["#000000", "#DD0000", "#FFCE00"], // black, red, gold
      gradientFrom: "#1A1A1A",
      gradientTo: "#C40000",
    },
    iconUrl: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1UJrMy7ZY5I687eQlTBtkWrgEyU9CuznpoxVA",
    hero: {
      headline: "Everything you need to pass the Einbürgerungstest",
      subheadline:
        "Free practice questions and mock tests for the German naturalisation test, built from the official 300-question catalogue — so you learn exactly what comes up and walk in ready.",
    },
    appStoreUrl: null,
    playStoreUrl: null,
    officialSource: {
      name: "BAMF — Einbürgerungstest",
      url: "https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html",
    },
    stats: [
      { label: "Questions in the catalogue", value: "300+" },
      { label: "To pass", value: "17 / 33" },
      { label: "Time allowed", value: "60 min" },
    ],
    tools: [],
    trustHeadline: "You've got this",
    trustBody:
      "Whatever your German level, study at your own pace with practice questions built from the official Einbürgerungstest catalogue — so nothing on test day catches you off guard.",
    features: [
      {
        title: "Practice built for the real test",
        body: "Mock tests mirror the actual 33-question, 60-minute format, drawn straight from the official catalogue of 300 questions.",
        ctaLabel: "Start practicing",
        mockup: "quiz",
      },
      {
        title: "Learn by theme",
        body: "Politics and democracy, history and responsibility, people and society, and your federal state — grouped so you can focus on what you find hardest.",
        ctaLabel: "See your stats",
        mockup: "progress",
      },
      {
        title: "Know exactly what's tested",
        body: "Every question is based on the official catalogue, with a clear explanation for each answer, so there are no surprises.",
        ctaLabel: "Explore topics",
        mockup: "content",
      },
    ],
    testimonials: [],
    faqs: [
      {
        question: "How many questions are on the Einbürgerungstest?",
        answer:
          "The Einbürgerungstest has 33 multiple-choice questions — 30 general questions plus 3 about your federal state (Bundesland). You need 17 correct within 60 minutes to pass.",
      },
      {
        question: "Where do the questions come from?",
        answer:
          "Every question is drawn from the official catalogue of 300 general questions, plus 10 questions for each federal state, published by the BAMF. GermanPass practice questions are based on this catalogue.",
      },
      {
        question: "Is GermanPass affiliated with the German government or BAMF?",
        answer:
          "No. GermanPass is an independent study app. Our practice is based on the official public question catalogue, and we link to the BAMF for authoritative guidance and booking.",
      },
    ],
    blogCategory: "germanpass",
    hasTestCenters: false,
    languages: [],
    metaDescription:
      "GermanPass helps you prepare for the Einbürgerungstest (German naturalisation test) with free practice questions and mock tests based on the official 300-question catalogue.",
  },
];

export function getApp(slug: string): AppRecord | undefined {
  return apps.find((app) => app.slug === slug);
}

/** Resolve an app by its public keyword silo segment (e.g. "life-in-the-uk-test"). */
export function getAppByExamSlug(examSlug: string): AppRecord | undefined {
  return apps.find((app) => app.examSlug === examSlug);
}

export function getAllAppSlugs(): string[] {
  return apps.map((app) => app.slug);
}

/** Every public exam-silo segment, for routing + sitemap generation. */
export function getAllExamSlugs(): string[] {
  return apps.map((app) => app.examSlug);
}

/**
 * Static params for the two-segment silo root /[brand]/[test]/, e.g.
 * { brand: "britpass", test: "life-in-the-uk-test" }. dynamicParams=false plus
 * this list means only real brand+test pairs render — a mismatched pair 404s.
 */
export function examPathParams(): { brand: string; test: string }[] {
  return apps.map((app) => ({ brand: app.slug, test: app.examSlug }));
}
