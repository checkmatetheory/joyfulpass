import "server-only";
import type { ProQuestion } from "@/content/questions";

// CanadaPass Pro bank — Canadian citizenship test. Original questions written
// from well-established civic and historical facts in the spirit of the
// official Discover Canada guide; not copied from it.
export const canadapassQuestions: ProQuestion[] = [
  // --- Rights and responsibilities of citizenship ---------------------------
  {
    id: "pro-ca-rr-1",
    chapter: "rights-and-responsibilities",
    prompt: "In what year was the Canadian Charter of Rights and Freedoms added to the Constitution?",
    options: ["1867", "1931", "1982", "1995"],
    answer: 2,
    explanation:
      "The Charter of Rights and Freedoms was entrenched in the Constitution of Canada in 1982.",
  },
  {
    id: "pro-ca-rr-3",
    chapter: "rights-and-responsibilities",
    prompt: "What are Canada's two official languages?",
    options: ["English and French", "English and Inuktitut", "French and Cree", "English and Spanish"],
    answer: 0,
    explanation: "English and French are Canada's two official languages.",
  },
  {
    id: "pro-ca-rr-4",
    chapter: "rights-and-responsibilities",
    prompt: "Which of these is a fundamental freedom protected by the Charter?",
    options: [
      "Freedom from paying taxes",
      "Freedom of thought, belief, opinion and expression",
      "Freedom to ignore jury duty",
      "Freedom to vote more than once",
    ],
    answer: 1,
    explanation:
      "The Charter protects freedoms including thought, belief, opinion and expression, peaceful assembly, association, and conscience and religion.",
  },
  {
    id: "pro-ca-rr-5",
    chapter: "rights-and-responsibilities",
    prompt: "True or false: voting in elections is both a right and a responsibility of citizenship.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "True. Citizens aged 18 or over have the right to vote, and taking part in elections is considered a responsibility of citizenship.",
  },

  // --- Who we are ------------------------------------------------------------
  {
    id: "pro-ca-who-1",
    chapter: "who-we-are",
    prompt: "Which three groups make up Canada's Aboriginal (Indigenous) peoples?",
    options: [
      "First Nations, Inuit and Métis",
      "Acadians, Inuit and Métis",
      "First Nations, Acadians and Québécois",
      "Inuit, Loyalists and Métis",
    ],
    answer: 0,
    explanation: "The Constitution recognises three groups of Aboriginal peoples: First Nations, Inuit and Métis.",
  },
  {
    id: "pro-ca-who-2",
    chapter: "who-we-are",
    prompt: "The Acadians are descendants of which settlers?",
    options: [
      "British Loyalists who left the United States",
      "French colonists who settled in the Maritimes from the 1600s",
      "Scottish settlers in Nova Scotia",
      "Irish immigrants to Newfoundland",
    ],
    answer: 1,
    explanation:
      "Acadians descend from French colonists who began settling in what are now the Maritime provinces in the 1600s.",
  },
  {
    id: "pro-ca-who-3",
    chapter: "who-we-are",
    prompt: "Inuktitut is the language of which people?",
    options: ["The Métis", "The Acadians", "The Inuit", "The Loyalists"],
    answer: 2,
    explanation: "Inuktitut is spoken by many Inuit, who live mainly in Canada's Arctic.",
  },
  {
    id: "pro-ca-who-4",
    chapter: "who-we-are",
    prompt: "Which is Canada's most populous city?",
    options: ["Montréal", "Vancouver", "Ottawa", "Toronto"],
    answer: 3,
    explanation: "Toronto is Canada's largest city by population.",
  },

  // --- Canada's history ------------------------------------------------------
  {
    id: "pro-ca-hist-1",
    chapter: "history",
    prompt: "In what year did Confederation take place?",
    options: ["1759", "1812", "1867", "1931"],
    answer: 2,
    explanation:
      "Confederation took place in 1867, when Ontario, Quebec, Nova Scotia and New Brunswick united as the Dominion of Canada.",
  },
  {
    id: "pro-ca-hist-3",
    chapter: "history",
    prompt: "In which 1759 battle did the British defeat the French at Quebec City?",
    options: [
      "The Battle of Queenston Heights",
      "The Battle of the Plains of Abraham",
      "The Battle of Vimy Ridge",
      "The Battle of Batoche",
    ],
    answer: 1,
    explanation:
      "The British defeated the French at the Battle of the Plains of Abraham in 1759, ending the French empire in America.",
  },
  {
    id: "pro-ca-hist-4",
    chapter: "history",
    prompt: "In which war did Canadian soldiers capture Vimy Ridge in 1917?",
    options: ["The War of 1812", "The South African War", "The First World War", "The Korean War"],
    answer: 2,
    explanation:
      "Canadian troops captured Vimy Ridge in April 1917 during the First World War — a defining moment in Canada's history.",
  },
  {
    id: "pro-ca-hist-5",
    chapter: "history",
    prompt: "Which province was the last to join Confederation, in 1949?",
    options: ["British Columbia", "Prince Edward Island", "Newfoundland and Labrador", "Saskatchewan"],
    answer: 2,
    explanation: "Newfoundland (now Newfoundland and Labrador) joined Canada in 1949.",
  },

  // --- How Canada is governed ------------------------------------------------
  {
    id: "pro-ca-gov-1",
    chapter: "how-canada-is-governed",
    prompt: "Canada is a federal state, a parliamentary democracy and a…",
    options: ["republic", "constitutional monarchy", "confederacy of provinces", "direct democracy"],
    answer: 1,
    explanation: "Canada has three key facts of government: a federal state, a parliamentary democracy and a constitutional monarchy.",
  },
  {
    id: "pro-ca-gov-2",
    chapter: "how-canada-is-governed",
    prompt: "Who represents the Sovereign in Canada at the federal level?",
    options: ["The Prime Minister", "The Governor General", "The Speaker of the Senate", "The Chief Justice"],
    answer: 1,
    explanation: "The Governor General represents the Sovereign federally; Lieutenant Governors do so in each province.",
  },
  {
    id: "pro-ca-gov-3",
    chapter: "how-canada-is-governed",
    prompt: "What are the three parts of Parliament?",
    options: [
      "The Prime Minister, the Cabinet and the Senate",
      "The Sovereign, the Senate and the House of Commons",
      "The House of Commons, the courts and the police",
      "The Governor General, the provinces and the territories",
    ],
    answer: 1,
    explanation: "Parliament has three parts: the Sovereign (represented by the Governor General), the Senate and the House of Commons.",
  },
  {
    id: "pro-ca-gov-4",
    chapter: "how-canada-is-governed",
    prompt: "How are senators chosen?",
    options: [
      "They are elected by voters in each province",
      "They are appointed by the Governor General on the advice of the Prime Minister",
      "They are chosen by the provincial premiers",
      "They inherit their seats",
    ],
    answer: 1,
    explanation:
      "Senators are appointed by the Governor General on the advice of the Prime Minister. Members of the House of Commons are elected.",
  },
  {
    id: "pro-ca-gov-5",
    chapter: "how-canada-is-governed",
    prompt: "What are the people elected to the House of Commons called?",
    options: ["Senators", "Members of Parliament (MPs)", "Lieutenant Governors", "Premiers"],
    answer: 1,
    explanation: "Voters in each electoral district elect a Member of Parliament (MP) to the House of Commons.",
  },

  // --- Symbols and regions ---------------------------------------------------
  {
    id: "pro-ca-sym-1",
    chapter: "symbols-and-regions",
    prompt: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Montréal", "Quebec City"],
    answer: 1,
    explanation: "Ottawa, in Ontario, is Canada's capital.",
  },
  {
    id: "pro-ca-sym-2",
    chapter: "symbols-and-regions",
    prompt: "How many provinces and territories does Canada have?",
    options: [
      "10 provinces and 3 territories",
      "9 provinces and 4 territories",
      "12 provinces and 1 territory",
      "10 provinces and 2 territories",
    ],
    answer: 0,
    explanation: "Canada has 10 provinces and 3 territories.",
  },
  {
    id: "pro-ca-sym-3",
    chapter: "symbols-and-regions",
    prompt: "Which provinces are known as the Prairie Provinces?",
    options: [
      "Ontario, Manitoba and Saskatchewan",
      "Manitoba, Saskatchewan and Alberta",
      "Alberta, British Columbia and Yukon",
      "Quebec, Ontario and Manitoba",
    ],
    answer: 1,
    explanation: "Manitoba, Saskatchewan and Alberta are the Prairie Provinces.",
  },
  {
    id: "pro-ca-sym-4",
    chapter: "symbols-and-regions",
    prompt: "Which animal is an official symbol of Canada?",
    options: ["The moose", "The bald eagle", "The beaver", "The polar bear"],
    answer: 2,
    explanation: "The beaver is an official symbol of Canada.",
  },
];
