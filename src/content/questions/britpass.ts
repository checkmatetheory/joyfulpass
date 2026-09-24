import "server-only";
import type { ProQuestion } from "@/content/questions";

// BritPass Pro bank — Life in the UK Test. Original questions written from
// well-established civic and historical facts; not copied from the official
// handbook (Crown copyright).
export const britpassQuestions: ProQuestion[] = [
  // --- The values and principles of the UK ---------------------------------
  {
    id: "pro-uk-val-1",
    chapter: "british-values",
    prompt: "Which of these is expected of everyone living in the UK?",
    options: [
      "Joining a political party",
      "Treating others with fairness",
      "Following the Church of England",
      "Voting for the governing party",
    ],
    answer: 1,
    explanation:
      "Residents are expected to treat others fairly, respect the law and look after themselves and their family. Party membership, religion and how you vote are personal choices.",
  },
  {
    id: "pro-uk-val-2",
    chapter: "british-values",
    prompt: "True or false: people living in the UK are expected to look after themselves and their family.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "True. Taking responsibility for yourself and your family is one of the everyday responsibilities of living in the UK.",
  },
  {
    id: "pro-uk-val-3",
    chapter: "british-values",
    prompt: "Which of these is one of the fundamental British values?",
    options: [
      "Loyalty to a single political party",
      "Mutual respect and tolerance of those with different faiths and beliefs",
      "Compulsory religious worship",
      "Speaking only English at home",
    ],
    answer: 1,
    explanation:
      "The fundamental values are democracy, the rule of law, individual liberty, and mutual respect and tolerance of those with different faiths and beliefs.",
  },
  {
    id: "pro-uk-val-4",
    chapter: "british-values",
    prompt: "What do new citizens do at a citizenship ceremony?",
    options: [
      "Sit a final language test",
      "Take an oath or affirmation of allegiance and make a pledge",
      "Choose which country of the UK to live in",
      "Register to vote in local elections only",
    ],
    answer: 1,
    explanation:
      "At the ceremony new citizens swear an oath (or make an affirmation) of allegiance to the King and make a pledge to respect the UK's rights, freedoms and laws.",
  },
  {
    id: "pro-uk-val-5",
    chapter: "british-values",
    prompt: "True or false: in the UK you are expected to respect other people's right to their own opinions.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "True. Individual liberty includes freedom of opinion, and respecting that freedom in others is part of British values.",
  },

  // --- What is the UK? -------------------------------------------------------
  {
    id: "pro-uk-what-1",
    chapter: "what-is-the-uk",
    prompt: "Which countries make up the United Kingdom?",
    options: [
      "England, Scotland and Wales",
      "England, Scotland, Wales and Northern Ireland",
      "England, Scotland, Wales and the Republic of Ireland",
      "England and Wales only",
    ],
    answer: 1,
    explanation:
      "The UK is England, Scotland, Wales and Northern Ireland. Great Britain refers only to England, Scotland and Wales.",
  },
  {
    id: "pro-uk-what-2",
    chapter: "what-is-the-uk",
    prompt: "True or false: Great Britain includes Northern Ireland.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "False. Great Britain is England, Scotland and Wales. Adding Northern Ireland gives the United Kingdom.",
  },
  {
    id: "pro-uk-what-3",
    chapter: "what-is-the-uk",
    prompt: "Which of these is a Crown dependency rather than part of the UK?",
    options: ["The Isle of Wight", "Anglesey", "The Isle of Man", "The Orkney Islands"],
    answer: 2,
    explanation:
      "The Isle of Man and the Channel Islands are Crown dependencies with their own governments. The other islands listed are part of the UK.",
  },
  {
    id: "pro-uk-what-4",
    chapter: "what-is-the-uk",
    prompt: "Which cross represents Scotland on the Union Flag?",
    options: ["The cross of St George", "The cross of St Andrew", "The cross of St Patrick", "The cross of St David"],
    answer: 1,
    explanation:
      "Scotland's cross is the white diagonal cross of St Andrew on a blue background. Wales is not represented on the Union Flag.",
  },
  {
    id: "pro-uk-what-5",
    chapter: "what-is-the-uk",
    prompt: "What is the capital city of Wales?",
    options: ["Swansea", "Cardiff", "Newport", "Wrexham"],
    answer: 1,
    explanation: "Cardiff is the capital of Wales and home to the Senedd, the Welsh Parliament.",
  },

  // --- A long and illustrious history ---------------------------------------
  {
    id: "pro-uk-hist-1",
    chapter: "history",
    prompt: "In which year was the Battle of Hastings?",
    options: ["1066", "1215", "1415", "1588"],
    answer: 0,
    explanation:
      "In 1066 William, Duke of Normandy, defeated King Harold at the Battle of Hastings — the last successful foreign invasion of England.",
  },
  {
    id: "pro-uk-hist-2",
    chapter: "history",
    prompt: "Which charter, agreed in 1215, limited the power of the king?",
    options: ["The Bill of Rights", "The Domesday Book", "Magna Carta", "The Act of Union"],
    answer: 2,
    explanation:
      "Magna Carta (the 'Great Charter') was agreed by King John in 1215 and established that even the king was subject to the law.",
  },
  {
    id: "pro-uk-hist-3",
    chapter: "history",
    prompt: "Who was the first Tudor king?",
    options: ["Henry VIII", "Richard III", "Henry VII", "Edward VI"],
    answer: 2,
    explanation:
      "Henry VII became the first Tudor king after defeating Richard III at the Battle of Bosworth Field in 1485, ending the Wars of the Roses.",
  },
  {
    id: "pro-uk-hist-4",
    chapter: "history",
    prompt: "Who was on the throne when the Spanish Armada was defeated in 1588?",
    options: ["Mary I", "Elizabeth I", "James I", "Victoria"],
    answer: 1,
    explanation: "Elizabeth I was queen when the English defeated the Spanish Armada in 1588.",
  },
  {
    id: "pro-uk-hist-5",
    chapter: "history",
    prompt: "Who was Prime Minister for most of the Second World War?",
    options: ["Neville Chamberlain", "Clement Attlee", "Winston Churchill", "David Lloyd George"],
    answer: 2,
    explanation:
      "Winston Churchill became Prime Minister in 1940 and led the country through most of the Second World War.",
  },
  {
    id: "pro-uk-hist-6",
    chapter: "history",
    prompt: "In which year did women get the vote at 21, the same age as men?",
    options: ["1918", "1928", "1945", "1969"],
    answer: 1,
    explanation:
      "In 1918 some women over 30 gained the vote. Equal voting rights with men, at age 21, followed in 1928.",
  },

  // --- A modern, thriving society -------------------------------------------
  {
    id: "pro-uk-mod-1",
    chapter: "modern-society",
    prompt: "When is St David's Day, the national day of Wales?",
    options: ["1 March", "17 March", "23 April", "30 November"],
    answer: 0,
    explanation:
      "St David's Day is 1 March. St Patrick's Day is 17 March, St George's Day 23 April and St Andrew's Day 30 November.",
  },
  {
    id: "pro-uk-mod-2",
    chapter: "modern-society",
    prompt: "When is St Andrew's Day, the national day of Scotland?",
    options: ["1 March", "23 April", "25 January", "30 November"],
    answer: 3,
    explanation: "St Andrew's Day, Scotland's national day, is 30 November.",
  },
  {
    id: "pro-uk-mod-3",
    chapter: "modern-society",
    prompt: "Which famous tennis tournament is played in London every summer?",
    options: ["The Open", "Wimbledon", "The Ashes", "Royal Ascot"],
    answer: 1,
    explanation:
      "The Wimbledon Championships, held each summer in south-west London, is the oldest tennis tournament in the world.",
  },
  {
    id: "pro-uk-mod-4",
    chapter: "modern-society",
    prompt: "Who wrote the play Romeo and Juliet?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Robert Burns"],
    answer: 1,
    explanation: "William Shakespeare, the playwright and poet from Stratford-upon-Avon, wrote Romeo and Juliet.",
  },
  {
    id: "pro-uk-mod-5",
    chapter: "modern-society",
    prompt: "What does Remembrance Day on 11 November commemorate?",
    options: [
      "The end of the Wars of the Roses",
      "People who died fighting for the UK and its allies",
      "The founding of the NHS",
      "The union of England and Scotland",
    ],
    answer: 1,
    explanation:
      "Remembrance Day remembers those who died in the First World War and later conflicts. Many people wear poppies in the weeks before.",
  },

  // --- The UK government, the law and your role ----------------------------
  {
    id: "pro-uk-gov-1",
    chapter: "government-and-law",
    prompt: "Where does the UK Parliament sit?",
    options: ["Buckingham Palace", "The Palace of Westminster", "10 Downing Street", "The Tower of London"],
    answer: 1,
    explanation:
      "Parliament — the House of Commons and the House of Lords — sits in the Palace of Westminster in London.",
  },
  {
    id: "pro-uk-gov-2",
    chapter: "government-and-law",
    prompt: "How often must a UK general election be held?",
    options: ["At least every three years", "At least every four years", "At least every five years", "Every seven years"],
    answer: 2,
    explanation: "A general election must be held at least every five years.",
  },
  {
    id: "pro-uk-gov-3",
    chapter: "government-and-law",
    prompt: "What is the name of the upper house of the UK Parliament?",
    options: ["The Senate", "The House of Lords", "The Privy Council", "The House of Commons"],
    answer: 1,
    explanation:
      "The House of Lords is the upper house. Its members are not elected by the public; the House of Commons is the elected lower house.",
  },
  {
    id: "pro-uk-gov-4",
    chapter: "government-and-law",
    prompt: "What is the role of a jury in a criminal trial?",
    options: [
      "To decide the sentence",
      "To decide whether the accused is guilty or not guilty",
      "To represent the defendant",
      "To question the witnesses",
    ],
    answer: 1,
    explanation:
      "The jury decides on the verdict — guilty or not guilty. If the defendant is found guilty, the judge decides the sentence.",
  },
  {
    id: "pro-uk-gov-5",
    chapter: "government-and-law",
    prompt: "Who is the head of the UK government?",
    options: ["The King", "The Speaker", "The Prime Minister", "The Lord Chancellor"],
    answer: 2,
    explanation:
      "The Prime Minister leads the government. The King is head of state, and the Speaker chairs debates in the House of Commons.",
  },
];
