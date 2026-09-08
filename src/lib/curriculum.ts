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

// ---------------------------------------------------------------------------
// GermanPass — Einbürgerungstest (German naturalisation test)
// ---------------------------------------------------------------------------
const germanpass: Curriculum = {
  appSlug: "germanpass",
  testSlug: "einbuergerungstest",
  testName: "Einbürgerungstest",
  intro:
    "Free Einbürgerungstest practice, organised by theme — politics and democracy, history, society, and your federal state. Every page has a real quiz, so you can see exactly where you stand before you book your test.",
  facts: { questions: "33 questions", toPass: "17 to pass", timeLimit: "60 minutes" },
  fullTest: { questionCount: 33, passMark: 17, minutes: 60 },
  chapters: [
    {
      slug: "politics-and-democracy",
      name: "Politics and democracy",
      shortLabel: "Politics & democracy",
      icon: "🏛️",
      intro: "How Germany is governed — its democratic, federal system and how elections work.",
      summary:
        "This theme covers how Germany is governed: its democratic and federal system, the main institutions, and how elections work. It is the largest part of the catalogue, so it is worth knowing well.",
      keyFacts: [
        "Germany is a democratic, federal, social and constitutional state (Rechtsstaat).",
        "The Bundestag is the elected national parliament; the Bundesrat represents the 16 federal states.",
        "Bundestag elections are normally held every four years.",
        "The Chancellor leads the federal government; the Federal President is the head of state.",
      ],
      cores: [
        {
          slug: "how-germany-is-governed",
          name: "How Germany is governed",
          questions: [
            {
              id: "de-pol-1",
              prompt: "What kind of state is the Federal Republic of Germany?",
              options: [
                "A monarchy",
                "A democratic and federal state",
                "A one-party state",
                "A dictatorship",
              ],
              answer: 1,
              explanation:
                "Germany is a democratic, federal, social and constitutional state (Rechtsstaat).",
            },
            {
              id: "de-pol-2",
              prompt: "What is the German national parliament called?",
              options: ["The Bundesrat", "The Bundestag", "The Reichstag", "The Landtag"],
              answer: 1,
              explanation:
                "The Bundestag is the elected national parliament. The Reichstag is the Berlin building where it meets.",
            },
            {
              id: "de-pol-3",
              prompt: "How often are Bundestag elections normally held?",
              options: ["Every year", "Every four years", "Every six years", "Every ten years"],
              answer: 1,
              explanation: "Members of the Bundestag are normally elected every four years.",
            },
          ],
        },
      ],
    },
    {
      slug: "history",
      name: "History and responsibility",
      shortLabel: "History",
      icon: "📜",
      intro:
        "Modern German history and the responsibility that comes with it — the Nazi era, division, and reunification.",
      summary:
        "This theme covers modern German history and the responsibility that comes with it — from the National Socialist era and the Second World War to the division of Germany and reunification in 1990.",
      keyFacts: [
        "8 May 1945 marks the end of the Second World War in Europe and of the National Socialist dictatorship.",
        "After the war Germany was divided into East (GDR) and West (FRG).",
        "The Berlin Wall was built in 1961 and fell on 9 November 1989.",
        "Germany was reunified on 3 October 1990 — the Day of German Unity.",
      ],
      cores: [
        {
          slug: "modern-german-history",
          name: "Modern German history",
          questions: [
            {
              id: "de-his-1",
              prompt: "In which year was Germany reunified?",
              options: ["1945", "1961", "1989", "1990"],
              answer: 3,
              explanation:
                "Germany was officially reunified on 3 October 1990, now celebrated as the Day of German Unity.",
            },
            {
              id: "de-his-2",
              prompt: "What does 8 May 1945 mark in Germany?",
              options: [
                "The building of the Berlin Wall",
                "The end of the Second World War in Europe",
                "German reunification",
                "The founding of the EU",
              ],
              answer: 1,
              explanation:
                "8 May 1945 marks the end of the Second World War in Europe and of the National Socialist dictatorship.",
            },
          ],
        },
        {
          slug: "division-and-reunification",
          name: "Division & reunification",
          locked: true,
          questions: [
            {
              id: "de-his-3",
              prompt: "When was the Berlin Wall built?",
              options: ["1949", "1961", "1971", "1989"],
              answer: 1,
              explanation: "The Berlin Wall was built in 1961 and fell on 9 November 1989.",
            },
          ],
        },
      ],
    },
    {
      slug: "society",
      name: "People and society",
      shortLabel: "Society",
      icon: "🤝",
      intro: "The rights, freedoms and everyday principles of life in Germany.",
      summary:
        "This theme covers the rights, freedoms and everyday principles of life in Germany, grounded in the Basic Law (Grundgesetz) and the values of a free, pluralistic society.",
      keyFacts: [
        "Article 1 of the Basic Law states that human dignity is inviolable.",
        "Fundamental rights include freedom of expression, faith and religion, and equality before the law.",
        "Germany has freedom of the press and freedom of assembly.",
        "Men and women have equal rights under the Basic Law.",
      ],
      cores: [
        {
          slug: "rights-and-freedoms",
          name: "Rights and freedoms",
          questions: [
            {
              id: "de-soc-1",
              prompt: "What does Article 1 of the German Basic Law (Grundgesetz) guarantee?",
              options: [
                "Freedom of movement",
                "That human dignity is inviolable",
                "The right to bear arms",
                "Free healthcare for all",
              ],
              answer: 1,
              explanation:
                "Article 1 of the Grundgesetz states that human dignity is inviolable — a founding principle of the German constitution.",
            },
            {
              id: "de-soc-2",
              prompt: "Which of these is a fundamental right in Germany?",
              options: [
                "A duty to vote for a set party",
                "Freedom of faith and religion",
                "Compulsory party membership",
                "State-approved newspapers only",
              ],
              answer: 1,
              explanation:
                "Freedom of faith, conscience and religion is a fundamental right protected by the Basic Law.",
            },
          ],
        },
      ],
    },
    {
      slug: "federal-states",
      name: "Your federal state",
      shortLabel: "Federal states",
      icon: "🗺️",
      intro: "Germany's 16 federal states (Bundesländer) and the state-specific part of the test.",
      summary:
        "Germany is a federal country of 16 states (Bundesländer), each with its own government. The test includes 3 questions specific to the state where you take it.",
      keyFacts: [
        "Germany has 16 federal states (Bundesländer).",
        "Berlin is the capital of Germany and is itself a city-state.",
        "Each federal state has its own parliament (Landtag) and state government.",
        "3 of the 33 test questions are about your own federal state.",
      ],
      cores: [
        {
          slug: "the-bundeslaender",
          name: "The Bundesländer",
          questions: [
            {
              id: "de-fed-1",
              prompt: "How many federal states (Bundesländer) does Germany have?",
              options: ["9", "13", "16", "20"],
              answer: 2,
              explanation:
                "Germany is made up of 16 federal states (Bundesländer), each with its own state government.",
            },
            {
              id: "de-fed-2",
              prompt: "What is the capital of Germany?",
              options: ["Munich", "Hamburg", "Frankfurt", "Berlin"],
              answer: 3,
              explanation:
                "Berlin is the capital of Germany and is also one of the 16 federal states (a city-state).",
            },
          ],
        },
      ],
    },
  ],
  about:
    "The Einbürgerungstest is a test of 33 multiple-choice questions — 30 general questions and 3 about your federal state (Bundesland). You need 17 correct within 60 minutes to pass. Every question comes from the official public catalogue of 300 general questions (plus 10 per federal state) published by the BAMF. There is no essay and no spoken element — it is entirely multiple choice.",
  prep: [
    {
      title: "Learn the catalogue by theme",
      body: "The 300 official questions are grouped into a few themes. Work through them theme by theme and use the quiz on each page to check what's actually sticking.",
    },
    {
      title: "Practise full mock tests",
      body: "Once you're comfortable, sit full 33-question mock tests against the 60-minute clock. Aim to score well above 17 before you book.",
    },
    {
      title: "Book through an approved centre",
      body: "You take the Einbürgerungstest at an approved centre such as a Volkshochschule (VHS). Confirm current details with the BAMF and your local Einbürgerungsbehörde.",
    },
  ],
};

// ---------------------------------------------------------------------------
// SeruPass — TfL SERU Assessment (London private-hire drivers)
// Original practice written from published regulatory facts (Equality Act 2010,
// PHV (London) Act 1998, safeguarding principles) — NOT copied from TfL's
// Crown-copyright Private Hire Driver's Handbook.
// ---------------------------------------------------------------------------
const serupass: Curriculum = {
  appSlug: "serupass",
  testSlug: "seru-assessment",
  testName: "TfL SERU Assessment",
  intro:
    "Free TfL SERU practice, organised around the real assessment — safety, safeguarding, equality, and the regulations London private-hire drivers are tested on. Work through a topic, see your score, and know when you're ready to book.",
  facts: { questions: "~36 questions", toPass: "60% to pass", timeLimit: "~60 minutes" },
  fullTest: { questionCount: 36, passMark: 22, minutes: 60 },
  chapters: [
    {
      slug: "passenger-and-road-safety",
      name: "Passenger, road and vehicle safety",
      shortLabel: "Safety",
      icon: "🛟",
      intro:
        "Keeping passengers, yourself, and other road users safe — the responsibilities that sit at the heart of the 'S' in SERU.",
      summary:
        "This topic covers your duty to keep passengers and other road users safe, from carrying only the number of passengers you're licensed and insured for to knowing what to do after a collision. It's about the practical, everyday safety habits TfL expects of a professional driver.",
      keyFacts: [
        "You may only carry the number of passengers your vehicle is licensed and insured to carry — never more.",
        "Licensed private hire vehicles are smoke-free; smoking is not allowed inside the vehicle.",
        "After a collision you must stop, exchange details, and report it to the police and your insurer as required.",
        "Keeping the vehicle roadworthy — valid MOT, tyres, lights and brakes — is your responsibility, not just the operator's.",
      ],
      cores: [
        {
          slug: "everyday-safety",
          name: "Everyday safety on the job",
          questions: [
            {
              id: "seru-saf-1",
              prompt:
                "A group asks you to take more passengers than your vehicle is licensed and insured to carry. What should you do?",
              options: [
                "Carry them all to keep the customer happy",
                "Only carry up to the number you're licensed and insured for",
                "Carry the extra passengers if the journey is short",
                "Let one sit in the front footwell",
              ],
              answer: 1,
              explanation:
                "You must never exceed the number of passengers your vehicle is licensed and insured to carry — doing so is unsafe and invalidates your insurance.",
            },
            {
              id: "seru-saf-2",
              prompt: "Smoking inside a licensed private hire vehicle is:",
              options: [
                "Allowed if the passenger asks",
                "Allowed with the windows open",
                "Not allowed — it's a smoke-free vehicle",
                "Allowed for the driver only",
              ],
              answer: 2,
              explanation:
                "Licensed vehicles are smoke-free workplaces. Neither the driver nor passengers may smoke inside.",
            },
            {
              id: "seru-saf-3",
              prompt: "You're involved in a road traffic collision while working. What must you do?",
              options: [
                "Drive on if the damage looks minor",
                "Stop, exchange details, and report it as required",
                "Only report it if a passenger asks you to",
                "Wait until your shift ends to deal with it",
              ],
              answer: 1,
              explanation:
                "You must stop, exchange details with anyone involved, and report the collision to the police and your insurer where required.",
            },
          ],
        },
        {
          slug: "vehicle-standards",
          name: "Vehicle standards & emergencies",
          locked: true,
          questions: [
            {
              id: "seru-saf-4",
              prompt: "Keeping your licensed vehicle roadworthy (MOT, tyres, brakes, lights) is:",
              options: [
                "Only the operator's responsibility",
                "Your responsibility as the driver",
                "Only checked once a year by TfL",
                "Optional between MOTs",
              ],
              answer: 1,
              explanation:
                "As the driver you're responsible for making sure the vehicle you use is roadworthy every time you work.",
            },
            {
              id: "seru-saf-5",
              prompt: "A passenger is taken unwell during a journey. Your first priority is:",
              options: [
                "Finishing the booked journey quickly",
                "Their safety — stop safely and get help if needed",
                "Charging a cleaning fee",
                "Asking them to leave the vehicle",
              ],
              answer: 1,
              explanation:
                "Passenger safety comes first. Stop somewhere safe and call for medical help if the situation needs it.",
            },
          ],
        },
      ],
    },
    {
      slug: "safeguarding",
      name: "Safeguarding children and adults at risk",
      shortLabel: "Safeguarding",
      icon: "🛡️",
      intro:
        "Recognising when a child or vulnerable adult may be at risk of harm — and knowing it's your duty to act, not to investigate.",
      summary:
        "Safeguarding means protecting children and adults at risk from harm and abuse. As a licensed driver you're in a position to notice when something isn't right, and TfL expects you to report concerns to the authorities rather than ignore them or try to investigate yourself.",
      keyFacts: [
        "Safeguarding is about protecting children and adults at risk from harm and abuse.",
        "An 'adult at risk' is someone unable to protect themselves because of age, disability, or mental illness.",
        "Your role is to recognise and report concerns — not to investigate them yourself.",
        "If you believe someone is in immediate danger, call 999; use 101 for non-emergency police concerns.",
      ],
      cores: [
        {
          slug: "recognising-risk",
          name: "Recognising and reporting risk",
          questions: [
            {
              id: "seru-sg-1",
              prompt: "'Safeguarding' is best described as:",
              options: [
                "Protecting your vehicle from damage",
                "Protecting children and adults at risk from harm and abuse",
                "Keeping your licence documents safe",
                "Locking the doors during a journey",
              ],
              answer: 1,
              explanation:
                "Safeguarding is about protecting vulnerable people — children and adults at risk — from harm and abuse.",
            },
            {
              id: "seru-sg-2",
              prompt:
                "You pick up a distressed young person late at night who appears to be controlled by an older adult. You're concerned they may be at risk. You should:",
              options: [
                "Ignore it — it's not your business",
                "Confront the older adult directly",
                "Report your concern to the police",
                "Refuse the booking and drive away",
              ],
              answer: 2,
              explanation:
                "Your role is to report concerns so the authorities can act. Don't investigate or confront anyone yourself.",
            },
            {
              id: "seru-sg-3",
              prompt: "If you believe a child is in immediate danger, you should call:",
              options: ["101", "111", "999", "Your operator only"],
              answer: 2,
              explanation:
                "In an emergency where someone is in immediate danger, call 999. Use 101 for non-emergency police matters.",
            },
          ],
        },
        {
          slug: "adults-at-risk",
          name: "Adults at risk in depth",
          locked: true,
          questions: [
            {
              id: "seru-sg-4",
              prompt: "Which best describes an 'adult at risk'?",
              options: [
                "Any passenger over 65",
                "Someone unable to protect themselves due to age, disability or illness",
                "Anyone travelling alone at night",
                "A passenger who has had a drink",
              ],
              answer: 1,
              explanation:
                "An adult at risk is someone who can't protect themselves from harm because of age, disability, or mental illness.",
            },
            {
              id: "seru-sg-5",
              prompt: "If a vulnerable passenger asks to be dropped somewhere that worries you, you should:",
              options: [
                "Always refuse to take them anywhere",
                "Use your judgement, prioritise their safety, and report genuine concerns",
                "Charge extra for the risk",
                "Leave them at the nearest bus stop",
              ],
              answer: 1,
              explanation:
                "Prioritise the passenger's safety and report a genuine safeguarding concern to the police rather than ignoring it.",
            },
          ],
        },
      ],
    },
    {
      slug: "equality-and-disability",
      name: "Equality, disability and the Equality Act 2010",
      shortLabel: "Equality",
      icon: "♿",
      intro:
        "Treating every passenger fairly under the Equality Act 2010 — including your legal duties around disability and assistance dogs.",
      summary:
        "The Equality Act 2010 protects people with certain characteristics from discrimination. For drivers, that means treating passengers fairly regardless of who they are, making reasonable adjustments where needed, and carrying assistance dogs and wheelchair users without charging more.",
      keyFacts: [
        "The Equality Act 2010 protects characteristics including age, disability, race, religion or belief, sex, sexual orientation, gender reassignment, and pregnancy.",
        "You must carry a passenger's assistance dog at no extra charge unless you hold a medical exemption certificate.",
        "Charging a wheelchair user or disabled passenger more for the same journey is unlawful discrimination.",
        "Making reasonable adjustments — such as helping with a wheelchair — is part of your legal duty.",
      ],
      cores: [
        {
          slug: "equality-basics",
          name: "Equality and assistance dogs",
          questions: [
            {
              id: "seru-eq-1",
              prompt:
                "A passenger with a guide dog books your vehicle. Unless you hold a medical exemption certificate, you must:",
              options: [
                "Refuse the booking",
                "Charge extra to clean the vehicle",
                "Carry the passenger and their assistance dog at no extra charge",
                "Ask them to hold the dog on their lap only",
              ],
              answer: 2,
              explanation:
                "Unless you have a medical exemption certificate, you must carry assistance dogs at no additional charge. Refusing is unlawful.",
            },
            {
              id: "seru-eq-2",
              prompt: "Which of these is a protected characteristic under the Equality Act 2010?",
              options: [
                "The car you drive",
                "Disability",
                "How far someone is travelling",
                "The time of day",
              ],
              answer: 1,
              explanation:
                "Disability is one of the nine protected characteristics under the Equality Act 2010.",
            },
            {
              id: "seru-eq-3",
              prompt: "Charging a wheelchair user more than other passengers for the same journey is:",
              options: [
                "Fine if loading takes longer",
                "Allowed with the operator's permission",
                "Unlawful discrimination",
                "Only a problem in central London",
              ],
              answer: 2,
              explanation:
                "Charging a disabled passenger more for the same journey is unlawful discrimination under the Equality Act 2010.",
            },
          ],
        },
        {
          slug: "reasonable-adjustments",
          name: "Reasonable adjustments in depth",
          locked: true,
          questions: [
            {
              id: "seru-eq-4",
              prompt: "A 'reasonable adjustment' for a disabled passenger might include:",
              options: [
                "Refusing the journey to avoid difficulty",
                "Helping stow a wheelchair and offering assistance",
                "Charging a higher fare",
                "Asking them to book a different service",
              ],
              answer: 1,
              explanation:
                "Reasonable adjustments — like helping with a wheelchair — help disabled passengers use your service on equal terms.",
            },
            {
              id: "seru-eq-5",
              prompt: "Refusing to carry a passenger because of their religion would be:",
              options: [
                "Acceptable if you're uncomfortable",
                "Unlawful discrimination",
                "Fine if another driver is available",
                "A matter for the operator only",
              ],
              answer: 1,
              explanation:
                "Religion or belief is a protected characteristic — refusing service on that basis is unlawful discrimination.",
            },
          ],
        },
      ],
    },
    {
      slug: "regulatory-understanding",
      name: "Regulatory understanding: the PHV (London) Act and TfL rules",
      shortLabel: "Regulations",
      icon: "📋",
      intro:
        "The licensing framework you work within — how private hire is regulated in London and the obligations that come with your licence.",
      summary:
        "Private hire in London is governed by the PHV (London) Act 1998. This topic covers the rules that make a journey legal — bookings through a licensed operator, the three licences involved, and your duty to keep TfL informed of anything that affects your fitness to hold a licence.",
      keyFacts: [
        "Private hire in London is regulated under the PHV (London) Act 1998.",
        "PHV journeys must be pre-booked through a licensed operator — you can't ply for hire or pick up in the street.",
        "Three licences are needed to operate legally: driver, vehicle, and operator.",
        "You must tell TfL about relevant changes, including a new address, medical conditions affecting driving, or a conviction.",
      ],
      cores: [
        {
          slug: "licensing-rules",
          name: "How private hire is regulated",
          questions: [
            {
              id: "seru-reg-1",
              prompt: "Someone hails your private hire vehicle in the street and asks for a ride. You should:",
              options: [
                "Accept — a fare is a fare",
                "Decline — PHV journeys must be pre-booked through a licensed operator",
                "Accept only if you're not busy",
                "Accept if they pay cash",
              ],
              answer: 1,
              explanation:
                "Unlike black taxis, private hire vehicles can't ply for hire. Every journey must be pre-booked through a licensed operator.",
            },
            {
              id: "seru-reg-2",
              prompt: "Under the PHV (London) Act 1998, which three licences are needed to operate legally?",
              options: [
                "Driver, vehicle and operator licences",
                "Driver, insurance and MOT",
                "Operator, council and TfL",
                "Driver and vehicle only",
              ],
              answer: 0,
              explanation:
                "Legal private hire in London requires three separate TfL licences: the driver, the vehicle, and the operator.",
            },
            {
              id: "seru-reg-3",
              prompt: "If you're convicted of an offence while licensed, you must:",
              options: [
                "Only mention it at renewal",
                "Notify TfL",
                "Tell your operator instead of TfL",
                "Do nothing unless asked",
              ],
              answer: 1,
              explanation:
                "You must notify TfL of a conviction — it affects your fitness to hold a licence.",
            },
          ],
        },
        {
          slug: "keeping-tfl-informed",
          name: "Keeping TfL informed in depth",
          locked: true,
          questions: [
            {
              id: "seru-reg-4",
              prompt: "Which change should you report to TfL?",
              options: [
                "Buying a new phone",
                "A change of home address",
                "Taking a holiday",
                "Changing your usual route",
              ],
              answer: 1,
              explanation:
                "You must keep TfL updated on relevant changes such as your address, so their records stay accurate.",
            },
            {
              id: "seru-reg-5",
              prompt: "A medical condition that affects your ability to drive safely should be:",
              options: [
                "Kept private",
                "Reported to TfL (and the DVLA where required)",
                "Mentioned only if you have an accident",
                "Handled by your operator",
              ],
              answer: 1,
              explanation:
                "Notify TfL (and the DVLA where relevant) about a medical condition that affects your driving — it's part of holding a licence responsibly.",
            },
          ],
        },
      ],
    },
    {
      slug: "dealing-with-passengers",
      name: "Dealing with passengers and difficult situations",
      shortLabel: "Passengers",
      icon: "🤝",
      intro:
        "The judgement calls of the job — lost property, disputes, and staying calm and professional when a situation gets difficult.",
      summary:
        "Beyond the rules, SERU checks that you can handle real situations well: returning lost property, keeping calm during a dispute, and knowing the difference between a legitimate reason to refuse a journey and unlawful discrimination.",
      keyFacts: [
        "Lost property should be kept safe and returned to the passenger or handed in — never kept.",
        "You can refuse a journey for a legitimate safety reason, but never because of a protected characteristic.",
        "Staying calm and de-escalating is the safest response to an aggressive or upset passenger.",
        "Professional, respectful service is part of what TfL expects from every licensed driver.",
      ],
      cores: [
        {
          slug: "everyday-judgement",
          name: "Everyday judgement calls",
          questions: [
            {
              id: "seru-dp-1",
              prompt: "A passenger leaves a phone in your vehicle. The right thing to do is:",
              options: [
                "Keep it — finders keepers",
                "Keep it safe and arrange to return it or hand it in as lost property",
                "Sell it to cover your time",
                "Leave it at the roadside",
              ],
              answer: 1,
              explanation:
                "Lost property must be kept safe and returned to the owner or handed in — never kept for yourself.",
            },
            {
              id: "seru-dp-2",
              prompt: "You may legitimately refuse a journey when:",
              options: [
                "You don't like the passenger's appearance",
                "There's a genuine safety reason",
                "The passenger has an assistance dog",
                "The fare seems too low",
              ],
              answer: 1,
              explanation:
                "A genuine safety reason can justify refusing a journey. Refusing because of a protected characteristic is unlawful.",
            },
            {
              id: "seru-dp-3",
              prompt: "A passenger becomes aggressive about the fare. Your best first response is to:",
              options: [
                "Argue back firmly",
                "Stay calm and try to de-escalate, prioritising safety",
                "Speed up to end the journey sooner",
                "Refuse to speak to them at all",
              ],
              answer: 1,
              explanation:
                "Staying calm and de-escalating keeps everyone safe. Prioritise safety over winning the argument.",
            },
          ],
        },
      ],
    },
  ],
  about:
    "The TfL SERU assessment — Safety, Equality and Regulatory Understanding — is the test every new London private-hire driver must pass to get licensed. It has around 36 questions in a mix of formats (multiple choice, sentence completion, and reading), you need 60% to pass, and you get roughly an hour. It's open-book: you can refer to the Private Hire Driver's Handbook during the assessment, but it's timed, so the drivers who pass already know the material and use the handbook only to check. You currently get two attempts — fail both and your licence application is cancelled — so it pays to go in genuinely ready.",
  prep: [
    {
      title: "Learn the four SERU pillars",
      body: "Work through safety, safeguarding, equality, and regulatory understanding one topic at a time. Read the notes, then answer questions on that topic straight away so it sticks.",
    },
    {
      title: "Practise every question style",
      body: "SERU isn't only multiple choice — there's sentence completion and reading too. Get comfortable with all of them so nothing on the day is a surprise.",
    },
    {
      title: "Use the handbook like the real test",
      body: "Practise checking the Private Hire Driver's Handbook against the clock, so you know where things are without burning time you don't have.",
    },
    {
      title: "Book only when you're consistently passing",
      body: "You get two attempts before your application is cancelled. Sit full mock tests until you're clearing 60% comfortably, then book through Transport for London.",
    },
  ],
};

const curricula: Curriculum[] = [britpass, canadapass, germanpass, serupass];

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
