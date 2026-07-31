// Per-app testimonials shown below the download CTA on each exam hub.
//
// PLACEHOLDER content — illustrative only. The names are invented and the
// photos come from a placeholder-portrait service (randomuser.me), NOT real
// customers. Replace every entry with a genuine, permission-granted review +
// photo (or delete the app's list) before launch. Do not ship invented quotes
// as real social proof.

export type AppReview = {
  /** Short-to-mid quote focused on passing, with the app as the clear reason. */
  quote: string;
  name: string;
  location: string;
  /** Placeholder portrait — replace with a real, permissioned photo. */
  photo: string;
  countryCode: "gb" | "ca" | "de";
  rating: number;
};

// Keyed by AppRecord.slug.
export const appReviews: Record<string, AppReview[]> = {
  britpass: [
    {
      quote:
        "I failed twice using free online quizzes. Two weeks on BritPass and I passed 22 out of 24 — it was the only thing that actually made it stick.",
      name: "Hannah Whitfield",
      location: "Leeds",
      photo: "https://randomuser.me/api/portraits/women/33.jpg",
      countryCode: "gb",
      rating: 5,
    },
    {
      quote:
        "Every question on the day felt familiar. BritPass was hands-down the reason I walked out of the test centre smiling.",
      name: "Tomasz Nowak",
      location: "Glasgow",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
      countryCode: "gb",
      rating: 5,
    },
    {
      quote:
        "The chapter-by-chapter mock tests showed me exactly where I was weak. I honestly wouldn't have passed first time without it.",
      name: "Aisha Rahman",
      location: "Bristol",
      photo: "https://randomuser.me/api/portraits/women/50.jpg",
      countryCode: "gb",
      rating: 5,
    },
  ],
  canadapass: [
    {
      quote:
        "I was dreading the history questions. CanadaPass drilled them until they were second nature — passed 19 out of 20 on my first try.",
      name: "Marc Tremblay",
      location: "Montreal",
      photo: "https://randomuser.me/api/portraits/men/41.jpg",
      countryCode: "ca",
      rating: 5,
    },
    {
      quote:
        "I studied on my commute for three weeks. When the real test came there were zero surprises — CanadaPass made the whole difference.",
      name: "Grace Adeyemi",
      location: "Calgary",
      photo: "https://randomuser.me/api/portraits/women/28.jpg",
      countryCode: "ca",
      rating: 5,
    },
    {
      quote:
        "The explanation after each question taught me more than the entire study guide. The clear reason I passed with room to spare.",
      name: "Wei Zhang",
      location: "Vancouver",
      photo: "https://randomuser.me/api/portraits/men/60.jpg",
      countryCode: "ca",
      rating: 5,
    },
  ],
  germanpass: [
    {
      quote:
        "The Bundesland-specific questions scared me most. GermanPass had every one of them — I passed without a single nervous moment.",
      name: "Sofia Marchetti",
      location: "Munich",
      photo: "https://randomuser.me/api/portraits/women/40.jpg",
      countryCode: "de",
      rating: 5,
    },
    {
      quote:
        "German isn't my first language and the wording worried me. GermanPass's clear explanations were the reason it finally clicked.",
      name: "Ahmed Hassan",
      location: "Berlin",
      photo: "https://randomuser.me/api/portraits/men/36.jpg",
      countryCode: "de",
      rating: 5,
    },
    {
      quote:
        "I booked the test the day I hit 30 out of 33 on GermanPass. Walked in, recognised every question, done.",
      name: "Katarzyna Lewandowska",
      location: "Hamburg",
      photo: "https://randomuser.me/api/portraits/women/58.jpg",
      countryCode: "de",
      rating: 5,
    },
  ],
};
