// The curriculum layer: the two-tier topic structure behind Templates A and B.
//
//   App hub (Template A)  →  /britpass/life-in-the-uk-test/
//   Chapter (Template B)  →  /britpass/uk-history-life-in-the-uk-test/
//
// Everything here is data, not code — a new app is a new Curriculum record,
// never a new route or component. Slugs deliberately embed the real test name
// people search for ("life in the uk test"), never the brand ("britpass").
//
// IMPORTANT — content integrity:
//   * The practice questions below are ORIGINAL, written from common-knowledge
//     civic/historical facts. They are NOT copied from the official Life in the
//     UK handbook or Discover Canada guide (which are Crown/Government
//     copyright). They are a small illustrative sample — the real product ships
//     a full, independently authored question bank keyed the same way.
//   * `locked: true` cores model the freemium boundary from the architecture
//     brief: the free web tier stays genuinely useful, deeper cores unlock in
//     the app / Pro tier.

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** Index (or indices, for "choose two") of the correct option(s). */
  answer: number | number[];
  explanation: string;
};

export type Core = {
  slug: string;
  name: string;
  /** Locked cores are visible (to encourage completion) but gated behind Pro/app. */
  locked?: boolean;
  questions: QuizQuestion[];
};

export type Chapter = {
  /** URL slug for the Template B page — embeds the test name. */
  slug: string;
  /** Full official chapter name. */
  name: string;
  /** Short label for the sidebar. */
  shortLabel: string;
  /** Emoji/glyph used on cards and in the sidebar. */
  icon: string;
  /** One-sentence intro shown on the Template A card and Template B header. */
  intro: string;
  /**
   * Original teaching summary (2-4 sentences) for the public study-guide page.
   * Written from common-knowledge facts — NOT copied from the official handbook.
   */
  summary: string;
  /**
   * Concise, original recall facts. Power the revision-notes bullets and the
   * cheat-sheet. Each is a standalone fact a candidate should know.
   */
  keyFacts: string[];
  cores: Core[];
};

export type Curriculum = {
  appSlug: string;
  /** Template A slug, e.g. "life-in-the-uk-test". */
  testSlug: string;
  /** Real test name for the H1. */
  testName: string;
  /** Keyword-rich intro paragraph for the Template A hub. */
  intro: string;
  /** Real exam facts, rendered as the "official record" stats strip. */
  facts: { questions: string; toPass: string; timeLimit: string };
  /** Full-length mock test config surfaced on Template A. */
  fullTest: { questionCount: number; passMark: number; minutes: number };
  chapters: Chapter[];
  /** Long-form "About the test" prose for Template A (rewritten per app, never templated). */
  about: string;
  /** Step-by-step preparation stack. */
  prep: { title: string; body: string }[];
};

// ---------------------------------------------------------------------------
// BritPass — Life in the UK Test (5 official handbook chapters)
// ---------------------------------------------------------------------------
const britpass: Curriculum = {
  appSlug: "britpass",
  testSlug: "life-in-the-uk-test",
  testName: "Life in the UK Test",
  intro:
    "Free Life in the UK Test practice, organised the way the official handbook is — five chapters, every topic that actually comes up, and a real quiz on each page. Work through a chapter, see your score, and know when you're ready to book.",
  facts: { questions: "24 questions", toPass: "18 to pass (75%)", timeLimit: "45 minutes" },
  fullTest: { questionCount: 24, passMark: 18, minutes: 45 },
  chapters: [
    {
      slug: "british-values",
      name: "The values and principles of the UK",
      shortLabel: "Values & principles",
      icon: "⚖️",
      intro:
        "The fundamental principles of British life and the responsibilities that come with settling in the UK.",
      summary:
        "This chapter sets out the shared values that underpin life in the UK and what is expected of people who settle here. It covers the principles that hold British society together and the everyday responsibilities that come with building a life in the country.",
      keyFacts: [
        "The fundamental British values are democracy, the rule of law, individual liberty, and mutual respect and tolerance of those with different faiths and beliefs.",
        "Residents are expected to respect and obey the law, treat others with fairness, and look after themselves and their family.",
        "Passing the Life in the UK Test is required for Indefinite Leave to Remain (ILR) and for British citizenship.",
        "At a citizenship ceremony you pledge to respect the rights, freedoms and laws of the UK.",
      ],
      cores: [
        {
          slug: "fundamental-values",
          name: "Fundamental British values",
          questions: [
            {
              id: "val-1",
              prompt: "Which of these is one of the fundamental principles of British life?",
              options: [
                "Everyone must support one football team",
                "Democracy and the rule of law",
                "Compulsory military service",
                "A single national newspaper",
              ],
              answer: 1,
              explanation:
                "British values include democracy, the rule of law, individual liberty, and tolerance of those with different faiths and beliefs.",
            },
            {
              id: "val-2",
              prompt: "As a permanent resident of the UK, you are expected to do which of the following?",
              options: [
                "Respect and obey the law",
                "Attend church every week",
                "Vote for a specific party",
                "Serve in the armed forces",
              ],
              answer: 0,
              explanation:
                "Responsibilities of residents include respecting and obeying the law, treating others with fairness, and looking after yourself and your family.",
            },
            {
              id: "val-3",
              prompt: "The Life in the UK Test is one of the requirements for which of these?",
              options: [
                "A UK driving licence",
                "Opening a bank account",
                "Settlement (ILR) or British citizenship",
                "Registering with a GP",
              ],
              answer: 2,
              explanation:
                "Passing the Life in the UK Test is a requirement for most people applying for Indefinite Leave to Remain or British citizenship.",
            },
          ],
        },
        {
          slug: "rights-and-responsibilities",
          name: "Rights and responsibilities",
          locked: true,
          questions: [
            {
              id: "val-4",
              prompt: "Which court deals with the most serious criminal cases in England and Wales?",
              options: ["Magistrates' Court", "Crown Court", "County Court", "Tribunal"],
              answer: 1,
              explanation:
                "Serious offences are tried in the Crown Court before a judge and jury; less serious cases are heard by magistrates.",
            },
          ],
        },
      ],
    },
    {
      slug: "what-is-the-uk",
      name: "What is the UK?",
      shortLabel: "What is the UK",
      icon: "🗺️",
      intro: "The nations, capitals and make-up of the United Kingdom.",
      summary:
        "The United Kingdom is made up of four nations, each with its own capital and character. This chapter explains what the UK is, how it differs from 'Great Britain', and the basic geography every candidate should be able to recognise.",
      keyFacts: [
        "The UK is made up of England, Scotland, Wales and Northern Ireland.",
        "'Great Britain' means England, Scotland and Wales only — it does not include Northern Ireland.",
        "The capital cities are London (England), Edinburgh (Scotland), Cardiff (Wales) and Belfast (Northern Ireland).",
        "The Isle of Man and the Channel Islands are Crown Dependencies, not part of the UK.",
      ],
      cores: [
        {
          slug: "nations-and-capitals",
          name: "Nations and capitals",
          questions: [
            {
              id: "uk-1",
              prompt: "Which of these countries is part of the United Kingdom?",
              options: ["Republic of Ireland", "Scotland", "Isle of Man", "France"],
              answer: 1,
              explanation:
                "The UK is made up of England, Scotland, Wales and Northern Ireland. The Isle of Man and Channel Islands are not part of the UK.",
            },
            {
              id: "uk-2",
              prompt: "What is the capital city of Scotland?",
              options: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee"],
              answer: 1,
              explanation: "Edinburgh is the capital of Scotland. Cardiff is Wales's capital and Belfast is Northern Ireland's.",
            },
            {
              id: "uk-3",
              prompt: "The capital city of Wales is:",
              options: ["Swansea", "Newport", "Cardiff", "Wrexham"],
              answer: 2,
              explanation: "Cardiff has been the capital of Wales since 1955.",
            },
          ],
        },
      ],
    },
    {
      slug: "history",
      name: "A long and illustrious history",
      shortLabel: "History",
      icon: "🏰",
      intro:
        "From the Norman Conquest to the modern era — the events, people and dates that shaped Britain.",
      summary:
        "British history runs from the Norman Conquest of 1066 through the Middle Ages, the Tudors and Stuarts, the Industrial Revolution and two World Wars. This chapter picks out the events, dates and figures most likely to come up on the test.",
      keyFacts: [
        "The Battle of Hastings (1066) began Norman rule under William the Conqueror.",
        "Magna Carta (1215) established the principle that the monarch was subject to the law.",
        "The Tudors ruled from 1485; Henry VIII broke with Rome and founded the Church of England.",
        "The first Union Flag was created in 1606, joining the crowns of England and Scotland.",
        "William Shakespeare (1564–1616) is the most celebrated English playwright and poet.",
      ],
      cores: [
        {
          slug: "early-britain",
          name: "Early Britain & the Middle Ages",
          questions: [
            {
              id: "hist-1",
              prompt: "In which year did the Battle of Hastings take place?",
              options: ["1066", "1215", "1415", "1666"],
              answer: 0,
              explanation:
                "William the Conqueror defeated King Harold at the Battle of Hastings in 1066, beginning Norman rule in England.",
            },
            {
              id: "hist-2",
              prompt: "The Magna Carta, agreed in 1215, is important because it:",
              options: [
                "Founded the Church of England",
                "Established that the king was subject to the law",
                "United England and Scotland",
                "Abolished Parliament",
              ],
              answer: 1,
              explanation:
                "Magna Carta established the principle that the monarch, too, was subject to the law and had to respect certain rights.",
            },
          ],
        },
        {
          slug: "tudors-to-modern",
          name: "The Tudors to the modern age",
          locked: true,
          questions: [
            {
              id: "hist-3",
              prompt: "Which famous playwright wrote Romeo and Juliet and Hamlet?",
              options: ["Charles Dickens", "William Shakespeare", "Geoffrey Chaucer", "Robert Burns"],
              answer: 1,
              explanation:
                "William Shakespeare (1564–1616) was a playwright and poet from Stratford-upon-Avon, widely regarded as the greatest writer in the English language.",
            },
          ],
        },
      ],
    },
    {
      slug: "modern-society",
      name: "A modern, thriving society",
      shortLabel: "Modern society",
      icon: "🎭",
      intro: "Culture, traditions, sport and the customs of everyday life across the UK.",
      summary:
        "Modern British society is diverse and shaped by its customs, sports, arts and traditions. This chapter covers the everyday culture of the UK — from patron saints and national days to the sports and institutions people care about.",
      keyFacts: [
        "The patron saints are St George (England), St Andrew (Scotland), St David (Wales) and St Patrick (Northern Ireland).",
        "Cricket, football, rugby and tennis are traditional British sports; Wimbledon is the world's oldest tennis tournament.",
        "The UK has a long tradition of poetry, theatre, music and film, from Shakespeare to the present day.",
        "Widely observed dates include Bonfire Night (5 November) and Remembrance Day (11 November).",
      ],
      cores: [
        {
          slug: "customs-and-culture",
          name: "Customs, sport and culture",
          questions: [
            {
              id: "soc-1",
              prompt: "Who is the patron saint of Scotland?",
              options: ["St George", "St David", "St Andrew", "St Patrick"],
              answer: 2,
              explanation:
                "St Andrew is the patron saint of Scotland (30 November). St George is England's, St David is Wales's, and St Patrick is Northern Ireland's.",
            },
            {
              id: "soc-2",
              prompt: "Which of these is a traditional sport strongly associated with the UK?",
              options: ["Baseball", "Cricket", "American football", "Sumo"],
              answer: 1,
              explanation:
                "Cricket originated in England and remains one of the country's traditional summer sports, alongside football, rugby and tennis.",
            },
          ],
        },
      ],
    },
    {
      slug: "government-and-law",
      name: "The UK government, the law and your role",
      shortLabel: "Government & law",
      icon: "🏛️",
      intro: "How the UK is governed, how laws are made, and the role you play as a resident.",
      summary:
        "The UK is a parliamentary democracy and a constitutional monarchy. This chapter explains how Parliament, government and the courts work, and the part residents play through voting, jury service and respecting the law.",
      keyFacts: [
        "The UK is a constitutional monarchy: the monarch is head of state, while Parliament makes the laws.",
        "MPs are elected to the House of Commons; the House of Lords is the second, unelected chamber.",
        "A general election is held at least every five years, and you must register in order to vote.",
        "The most serious criminal cases are tried in the Crown Court before a judge and jury.",
      ],
      cores: [
        {
          slug: "how-government-works",
          name: "How government works",
          questions: [
            {
              id: "gov-1",
              prompt: "Where do Members of Parliament (MPs) sit?",
              options: [
                "The House of Lords",
                "The House of Commons",
                "The Supreme Court",
                "The Cabinet Office",
              ],
              answer: 1,
              explanation:
                "MPs are elected to the House of Commons. The House of Lords is the second chamber and its members are not elected by the public.",
            },
            {
              id: "gov-2",
              prompt: "The UK is a:",
              options: [
                "Constitutional monarchy",
                "Absolute monarchy",
                "One-party state",
                "Federal republic",
              ],
              answer: 0,
              explanation:
                "The UK is a constitutional monarchy: the monarch is head of state but Parliament makes the laws and holds political power.",
            },
          ],
        },
      ],
    },
  ],
  about:
    "The Life in the UK Test is a computer-based test of 24 multiple-choice questions taken at an approved test centre. You need 18 correct answers — 75% — within 45 minutes to pass. Every question is drawn from the official handbook, which is organised into five chapters covering British values, the make-up of the UK, its history, modern society, and how the country is governed. There are no essays and no spoken element: it is entirely multiple choice on screen.",
  prep: [
    {
      title: "Learn one chapter at a time",
      body: "Work through the five chapters in order rather than skimming the whole handbook at once. Each chapter page here has a real quiz so you can check what's actually sticking.",
    },
    {
      title: "Practise under real conditions",
      body: "Once you're comfortable with the chapters, sit full 24-question mock tests against the clock. Aim to score above 90% consistently before you book.",
    },
    {
      title: "Book through the official source",
      body: "Confirm current fees and requirements on GOV.UK and book your appointment there — never through a third-party app.",
    },
  ],
};

// ---------------------------------------------------------------------------
// CanadaPass — Canadian Citizenship Test (Discover Canada themes)
// ---------------------------------------------------------------------------
const canadapass: Curriculum = {
  appSlug: "canadapass",
  testSlug: "canadian-citizenship-test",
  testName: "Canadian Citizenship Test",
  intro:
    "Free Canadian citizenship test practice, organised around the Discover Canada themes — rights and responsibilities, who we are, history, government and symbols. Every page has a real quiz, so you can see exactly where you stand before your appointment.",
  facts: { questions: "20 questions", toPass: "15 to pass (75%)", timeLimit: "30 minutes" },
  fullTest: { questionCount: 20, passMark: 15, minutes: 30 },
  chapters: [
    {
      slug: "rights-and-responsibilities",
      name: "Rights and responsibilities of citizenship",
      shortLabel: "Rights & responsibilities",
      icon: "🍁",
      intro: "The rights Canadian citizens enjoy and the responsibilities that come with them.",
      summary:
        "Canadian citizenship carries both rights and responsibilities. This chapter sets out the freedoms protected by the Charter of Rights and Freedoms and the duties — like obeying the law and serving on a jury — that citizens share.",
      keyFacts: [
        "The Canadian Charter of Rights and Freedoms (1982) is part of the Constitution.",
        "Responsibilities of citizenship include obeying the law, serving on a jury, voting, and helping others in the community.",
        "Fundamental freedoms include freedom of conscience and religion, thought and expression, and peaceful assembly.",
        "Canadian citizens have the right to enter, remain in, and leave Canada, and to live and work anywhere in the country.",
      ],
      cores: [
        {
          slug: "rights-and-duties",
          name: "Rights and duties",
          questions: [
            {
              id: "can-rights-1",
              prompt: "Which of these is a responsibility of Canadian citizenship?",
              options: [
                "Owning property",
                "Serving on a jury when called",
                "Learning a third language",
                "Joining a political party",
              ],
              answer: 1,
              explanation:
                "Responsibilities of citizenship include obeying the law, serving on a jury when called, voting in elections, and helping others in the community.",
            },
            {
              id: "can-rights-2",
              prompt: "The Canadian Charter of Rights and Freedoms is part of Canada's:",
              options: ["Constitution", "Criminal Code", "Tax law", "Immigration policy"],
              answer: 0,
              explanation:
                "The Charter, added to the Constitution in 1982, sets out the fundamental rights and freedoms Canadians are entitled to.",
            },
          ],
        },
      ],
    },
    {
      slug: "who-we-are",
      name: "Who we are",
      shortLabel: "Who we are",
      icon: "👥",
      intro: "Canada's peoples, languages and the make-up of the country today.",
      summary:
        "Canada is built on three founding peoples and two official languages, and is home to a highly diverse population. This chapter covers who Canadians are and the roots of the country's identity.",
      keyFacts: [
        "Canada's three founding peoples are Aboriginal, French and British.",
        "The two official languages are English and French, with equal status in the Government of Canada.",
        "Aboriginal peoples are grouped as First Nations, Inuit and Métis.",
        "Quebec is the mainly French-speaking province, where most French Canadians live.",
      ],
      cores: [
        {
          slug: "peoples-and-languages",
          name: "Peoples and languages",
          questions: [
            {
              id: "can-who-1",
              prompt: "What are the two official languages of Canada?",
              options: [
                "English and Spanish",
                "English and French",
                "French and Inuktitut",
                "English and Ojibwe",
              ],
              answer: 1,
              explanation:
                "English and French are the two official languages of Canada and have equal status in the government of Canada.",
            },
            {
              id: "can-who-2",
              prompt: "The three founding peoples of Canada are:",
              options: [
                "Aboriginal, French and British",
                "French, Spanish and British",
                "British, American and French",
                "Aboriginal, British and American",
              ],
              answer: 0,
              explanation:
                "Canada's founding peoples are Aboriginal, French and British — the basis of the country's history and identity.",
            },
          ],
        },
      ],
    },
    {
      slug: "history",
      name: "Canada's history",
      shortLabel: "History",
      icon: "📜",
      intro: "Confederation, the building of the nation, and the events that shaped modern Canada.",
      summary:
        "Canada's history runs from its Aboriginal peoples and early European settlement to Confederation in 1867 and the building of a modern nation. This chapter covers the milestones that shaped the country.",
      keyFacts: [
        "Confederation created the Dominion of Canada on 1 July 1867, now celebrated as Canada Day.",
        "Sir John A. Macdonald was Canada's first Prime Minister.",
        "The Canadian Pacific Railway, completed in 1885, linked the country from coast to coast.",
        "Canadians made major sacrifices in both World Wars; the Battle of Vimy Ridge (1917) is a defining moment.",
      ],
      cores: [
        {
          slug: "confederation",
          name: "Confederation & nation-building",
          questions: [
            {
              id: "can-hist-1",
              prompt: "In what year did Confederation create the Dominion of Canada?",
              options: ["1776", "1812", "1867", "1931"],
              answer: 2,
              explanation:
                "On 1 July 1867, the British North America Act united the colonies into the Dominion of Canada — celebrated today as Canada Day.",
            },
            {
              id: "can-hist-2",
              prompt: "Who was Canada's first Prime Minister?",
              options: [
                "Sir Wilfrid Laurier",
                "Sir John A. Macdonald",
                "William Lyon Mackenzie King",
                "Sir George-Étienne Cartier",
              ],
              answer: 1,
              explanation:
                "Sir John A. Macdonald became Canada's first Prime Minister in 1867 and his image appears on the ten-dollar bill.",
            },
          ],
        },
      ],
    },
    {
      slug: "how-canada-is-governed",
      name: "How Canadians govern themselves",
      shortLabel: "Government",
      icon: "🏛️",
      intro: "Canada's system of government, elections, and the three levels of authority.",
      summary:
        "Canada is a federal state, a parliamentary democracy and a constitutional monarchy. This chapter explains the three levels of government, how elections work, and who does what.",
      keyFacts: [
        "Canada is a federal state, a parliamentary democracy and a constitutional monarchy.",
        "The capital of Canada is Ottawa.",
        "There are three levels of government: federal, provincial or territorial, and municipal.",
        "Parliament has three parts: the Sovereign (represented by the Governor General), the Senate, and the House of Commons.",
      ],
      cores: [
        {
          slug: "system-of-government",
          name: "System of government",
          questions: [
            {
              id: "can-gov-1",
              prompt: "What is the capital city of Canada?",
              options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
              answer: 1,
              explanation: "Ottawa, in the province of Ontario, is the capital of Canada.",
            },
            {
              id: "can-gov-2",
              prompt: "Canada is a:",
              options: [
                "Federal state, parliamentary democracy and constitutional monarchy",
                "Republic",
                "Direct democracy",
                "One-party state",
              ],
              answer: 0,
              explanation:
                "Canada is a federal state, a parliamentary democracy and a constitutional monarchy — the three together describe its system of government.",
            },
          ],
        },
      ],
    },
    {
      slug: "symbols-and-regions",
      name: "Canadian symbols and regions",
      shortLabel: "Symbols & regions",
      icon: "🎽",
      intro: "The flag, the anthem, national sports and the regions that make up Canada.",
      summary:
        "From the maple leaf to national sports and the country's five regions, Canada's symbols express its identity. This chapter covers the flag, anthem, emblems and geography candidates should know.",
      keyFacts: [
        "The national flag, adopted in 1965, features a single red maple leaf on a white square between two red bands.",
        "Canada's official national sports are ice hockey (winter) and lacrosse (summer).",
        "The national anthem is 'O Canada'.",
        "Canada has five regions: the Atlantic Provinces, Central Canada, the Prairie Provinces, the West Coast, and the Northern Territories.",
      ],
      cores: [
        {
          slug: "symbols-and-sport",
          name: "Symbols and sport",
          questions: [
            {
              id: "can-sym-1",
              prompt: "What are Canada's official national sports?",
              options: [
                "Hockey and lacrosse",
                "Baseball and basketball",
                "Curling and skiing",
                "Soccer and rugby",
              ],
              answer: 0,
              explanation:
                "Canada has two official national sports: ice hockey (winter) and lacrosse (summer).",
            },
            {
              id: "can-sym-2",
              prompt: "The maple leaf has long been a symbol associated with:",
              options: ["The monarchy", "Canada", "The military only", "Quebec only"],
              answer: 1,
              explanation:
                "The maple leaf is Canada's best-known symbol and has appeared on the national flag since 1965.",
            },
          ],
        },
      ],
    },
  ],
  about:
    "The Canadian citizenship test is a test of 20 questions based on the official study guide, Discover Canada: The Rights and Responsibilities of Citizenship. You need 15 correct answers — 75% — within 30 minutes to pass. Questions are drawn from across the guide, covering the rights and responsibilities of citizenship, Canada's peoples and history, how the country is governed, and its symbols and regions. The test is taken online or in person after IRCC reviews your application.",
  prep: [
    {
      title: "Study Discover Canada by theme",
      body: "Everything on the test comes from the Discover Canada guide. Work through it theme by theme and use the quiz on each chapter page to check what you've retained.",
    },
    {
      title: "Practise full mock tests",
      body: "Sit full 20-question mock tests under the 30-minute limit until 15 out of 20 feels comfortable — and aim higher to absorb any test-day nerves.",
    },
    {
      title: "Wait for your official invitation",
      body: "You don't book the test yourself — IRCC invites you after reviewing your application. Use the waiting period to prepare so you're ready the moment it arrives.",
    },
  ],
};

const curricula: Curriculum[] = [britpass, canadapass];

export function getCurriculum(appSlug: string): Curriculum | undefined {
  return curricula.find((c) => c.appSlug === appSlug);
}

export function getChapter(appSlug: string, chapterSlug: string): Chapter | undefined {
  return getCurriculum(appSlug)?.chapters.find((ch) => ch.slug === chapterSlug);
}

/** Every free (unlocked) question in a chapter, flattened for the quiz panel. */
export function freeQuestions(chapter: Chapter): QuizQuestion[] {
  return chapter.cores.filter((core) => !core.locked).flatMap((core) => core.questions);
}

/** All Template A + Template B slugs for an app, for routing/sitemap. */
export function topicSlugsFor(appSlug: string): string[] {
  const curriculum = getCurriculum(appSlug);
  if (!curriculum) return [];
  return [curriculum.testSlug, ...curriculum.chapters.map((ch) => ch.slug)];
}

/** Resolve what kind of page a slug under /[app]/ maps to. */
export function resolveTopic(
  appSlug: string,
  topicSlug: string,
): { kind: "hub"; curriculum: Curriculum } | { kind: "chapter"; curriculum: Curriculum; chapter: Chapter } | null {
  const curriculum = getCurriculum(appSlug);
  if (!curriculum) return null;
  if (topicSlug === curriculum.testSlug) return { kind: "hub", curriculum };
  const chapter = curriculum.chapters.find((ch) => ch.slug === topicSlug);
  if (chapter) return { kind: "chapter", curriculum, chapter };
  return null;
}
