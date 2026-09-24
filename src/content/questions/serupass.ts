import "server-only";
import type { ProQuestion } from "@/content/questions";

// SeruPass Pro bank — TfL SERU assessment. Original questions written from
// published law (Road Traffic rules, Equality Act 2010, PHV (London) Act 1998)
// and well-established safeguarding practice; not copied from TfL's
// Crown-copyright Private Hire Driver's Handbook.
export const serupassQuestions: ProQuestion[] = [
  // --- Passenger, road and vehicle safety -------------------------------------
  {
    id: "pro-seru-saf-1",
    chapter: "passenger-and-road-safety",
    prompt: "Who is legally responsible for making sure passengers under 14 wear a seat belt where one is required?",
    options: ["The passenger's parent only", "The driver", "The operator", "Nobody — it's optional under 14"],
    answer: 1,
    explanation:
      "The driver is legally responsible for making sure passengers under 14 are properly restrained. Passengers aged 14 and over are responsible for themselves.",
  },
  {
    id: "pro-seru-saf-2",
    chapter: "passenger-and-road-safety",
    prompt: "When is it legal to use a hand-held mobile phone while driving?",
    options: [
      "When you're stopped at traffic lights",
      "When you're queuing in traffic",
      "Only to call 999 or 112 in a genuine emergency when it's unsafe or impractical to stop",
      "When accepting a job from your operator",
    ],
    answer: 2,
    explanation:
      "Using a hand-held phone while driving is illegal, including at lights or in queues. The narrow exception is calling 999/112 in a genuine emergency when it's unsafe or impractical to stop.",
  },
  {
    id: "pro-seru-saf-3",
    chapter: "passenger-and-road-safety",
    prompt: "You're feeling very tired during a shift. What should you do?",
    options: [
      "Open the window and keep driving",
      "Stop somewhere safe and rest before continuing",
      "Drink an energy drink and carry on",
      "Drive faster to finish the shift sooner",
    ],
    answer: 1,
    explanation: "Tiredness seriously affects driving. Stop somewhere safe and legal and rest before you carry on.",
  },
  {
    id: "pro-seru-saf-4",
    chapter: "passenger-and-road-safety",
    prompt: "Where should you let a passenger get out of the vehicle?",
    options: [
      "Wherever they ask, even in moving traffic",
      "Somewhere safe and legal, ideally on the kerb side",
      "In a bus lane, to save time",
      "On a zebra crossing",
    ],
    answer: 1,
    explanation:
      "Pick up and drop off only where it's safe and legal, letting passengers out on the kerb side so they don't step into traffic.",
  },
  {
    id: "pro-seru-saf-5",
    chapter: "passenger-and-road-safety",
    prompt: "Which is the right approach to alcohol and driving?",
    options: [
      "You can drink as long as you feel fine",
      "Alcohol limits don't apply to private hire drivers",
      "Never drive over the legal limit — and the safest approach is not to drink at all before driving",
      "One drink is always under the limit",
    ],
    answer: 2,
    explanation:
      "Driving over the limit is a criminal offence and would put your licence at risk. Alcohol affects people differently, so the safest approach is not to drink before driving.",
  },

  // --- Safeguarding children and adults at risk ------------------------------
  {
    id: "pro-seru-sg-1",
    chapter: "safeguarding",
    prompt: "Which of these could be a sign of child sexual exploitation?",
    options: [
      "A child travelling with a parent to school",
      "A young person picked up late at night from different addresses by older adults, seeming frightened or intoxicated",
      "A teenager travelling to a sports club",
      "A child using their own phone",
    ],
    answer: 1,
    explanation:
      "Young people being moved around late at night by older adults, especially if they seem scared, confused or intoxicated, can be a warning sign. Report your concern to the police.",
  },
  {
    id: "pro-seru-sg-2",
    chapter: "safeguarding",
    prompt: "You have a safeguarding concern but nobody is in immediate danger. Who should you contact?",
    options: ["Nobody", "The police on 101", "The passenger's employer", "A friend"],
    answer: 1,
    explanation:
      "For non-emergency concerns call the police on 101 (and follow your operator's safeguarding procedure). Call 999 if anyone is in immediate danger.",
  },
  {
    id: "pro-seru-sg-3",
    chapter: "safeguarding",
    prompt: "What does 'county lines' describe?",
    options: [
      "Taxi routes between counties",
      "Criminal networks that use children and vulnerable people to move drugs, often by taxi, PHV or train",
      "A type of licence for rural drivers",
      "Roads that cross county borders",
    ],
    answer: 1,
    explanation:
      "County lines is a form of exploitation in which gangs use children and vulnerable adults to carry drugs, often travelling by taxi, private hire or train.",
  },
  {
    id: "pro-seru-sg-4",
    chapter: "safeguarding",
    prompt: "Which could be a sign that a passenger is a victim of modern slavery or trafficking?",
    options: [
      "They pay by card",
      "They seem controlled by someone else, don't hold their own ID and don't know where they're going",
      "They travel with luggage",
      "They speak a language other than English",
    ],
    answer: 1,
    explanation:
      "Signs include appearing controlled by another person, not holding their own documents and not knowing their destination. Speaking another language is not itself a sign.",
  },
  {
    id: "pro-seru-sg-5",
    chapter: "safeguarding",
    prompt: "True or false: once you've reported a safeguarding concern, you should follow the passenger to find out more.",
    options: ["True", "False"],
    answer: 1,
    explanation: "False. Report what you saw and let the authorities act. Never investigate or follow anyone yourself.",
  },

  // --- Equality, disability and the Equality Act 2010 ------------------------
  {
    id: "pro-seru-eq-1",
    chapter: "equality-and-disability",
    prompt: "How many protected characteristics does the Equality Act 2010 list?",
    options: ["Five", "Seven", "Nine", "Twelve"],
    answer: 2,
    explanation:
      "Nine: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.",
  },
  {
    id: "pro-seru-eq-2",
    chapter: "equality-and-disability",
    prompt: "Which of these can be a hidden (non-visible) disability?",
    options: ["Autism", "A broken arm in plaster", "Using a wheelchair", "Using a white cane"],
    answer: 0,
    explanation:
      "Many disabilities, such as autism, epilepsy or hearing loss, aren't visible. Don't assume a passenger isn't disabled because you can't see a disability.",
  },
  {
    id: "pro-seru-eq-3",
    chapter: "equality-and-disability",
    prompt: "A passenger uses a wheelchair. What's the best first step?",
    options: [
      "Push the wheelchair without asking",
      "Ask how they would like to be helped",
      "Tell them to book a different service",
      "Charge a higher fare",
    ],
    answer: 1,
    explanation:
      "Ask the passenger how they'd like to be helped, then give reasonable assistance. They know their needs best.",
  },
  {
    id: "pro-seru-eq-4",
    chapter: "equality-and-disability",
    prompt: "How should you speak to a passenger who is deaf and lip-reads?",
    options: [
      "Shout so they can hear",
      "Face them and speak clearly at a normal pace",
      "Cover your mouth to be polite",
      "Only communicate through their companion",
    ],
    answer: 1,
    explanation: "Face the passenger, keep your mouth visible and speak clearly at a normal pace. Shouting distorts lip patterns.",
  },
  {
    id: "pro-seru-eq-5",
    chapter: "equality-and-disability",
    prompt: "If you hold a medical exemption from carrying assistance dogs, what must you do?",
    options: [
      "Nothing — just refuse dog owners",
      "Display the exemption notice in your vehicle",
      "Tell the passenger after they get in",
      "Charge a cleaning fee instead",
    ],
    answer: 1,
    explanation:
      "Drivers granted an exemption must display the exemption notice in the vehicle. Without an exemption, you must carry assistance dogs at no extra charge.",
  },
  {
    id: "pro-seru-eq-6",
    chapter: "equality-and-disability",
    prompt: "Refusing a passenger because of their race is…",
    options: ["Allowed at night", "Unlawful discrimination", "Up to the driver", "Allowed if the operator agrees"],
    answer: 1,
    explanation: "Race is a protected characteristic. Refusing service because of it is unlawful discrimination.",
  },

  // --- Regulatory understanding ----------------------------------------------
  {
    id: "pro-seru-reg-1",
    chapter: "regulatory-understanding",
    prompt: "Who licenses private hire drivers, vehicles and operators in London?",
    options: ["The DVLA", "Transport for London (TfL)", "The Metropolitan Police", "Each London borough"],
    answer: 1,
    explanation: "Transport for London licenses private hire drivers, vehicles and operators across London.",
  },
  {
    id: "pro-seru-reg-2",
    chapter: "regulatory-understanding",
    prompt: "What must you wear when working as a licensed PHV driver?",
    options: ["A uniform", "Your TfL driver's badge", "A high-visibility vest", "Your operator's logo"],
    answer: 1,
    explanation: "Licensed PHV drivers must wear their TfL-issued driver's badge while working.",
  },
  {
    id: "pro-seru-reg-3",
    chapter: "regulatory-understanding",
    prompt: "What type of insurance must a PHV have while carrying passengers?",
    options: ["Social, domestic and pleasure", "Hire and reward", "Business use only", "Third party, fire and theft only"],
    answer: 1,
    explanation: "A vehicle carrying passengers for payment must have hire and reward insurance.",
  },
  {
    id: "pro-seru-reg-4",
    chapter: "regulatory-understanding",
    prompt: "Is touting — approaching people to offer them a ride — allowed for PHV drivers?",
    options: [
      "Yes, outside stations",
      "Yes, late at night",
      "No, it's a criminal offence",
      "Only if the passenger agrees a fare first",
    ],
    answer: 2,
    explanation: "Touting is a criminal offence and can cost you your licence. All journeys must be booked through a licensed operator.",
  },
  {
    id: "pro-seru-reg-5",
    chapter: "regulatory-understanding",
    prompt: "What must be displayed on a licensed London PHV?",
    options: ["The driver's home address", "The TfL licence discs", "The operator's phone number only", "Nothing"],
    answer: 1,
    explanation: "Licensed private hire vehicles must display their TfL licence discs.",
  },
  {
    id: "pro-seru-reg-6",
    chapter: "regulatory-understanding",
    prompt: "For how long is a London PHV driver's licence normally issued?",
    options: ["1 year", "Up to 3 years", "5 years", "For life"],
    answer: 1,
    explanation: "TfL normally issues PHV driver's licences for up to three years, after which you must renew.",
  },

  // --- Dealing with passengers and difficult situations ----------------------
  {
    id: "pro-seru-dp-1",
    chapter: "dealing-with-passengers",
    prompt: "A passenger makes a complaint about the journey. What should you do?",
    options: [
      "Argue until they agree",
      "Listen calmly, stay professional and let your operator know",
      "Ignore them",
      "Refuse to finish the journey",
    ],
    answer: 1,
    explanation: "Stay calm and professional, listen, and report the complaint to your operator so it can be dealt with properly.",
  },
  {
    id: "pro-seru-dp-2",
    chapter: "dealing-with-passengers",
    prompt: "Which of these is inappropriate behaviour towards a passenger?",
    options: [
      "Confirming their destination",
      "Asking for their phone number to keep in touch",
      "Offering to adjust the temperature",
      "Helping with their luggage",
    ],
    answer: 1,
    explanation:
      "Asking for personal contact details or contacting passengers for personal reasons is inappropriate and can lead to your licence being revoked.",
  },
  {
    id: "pro-seru-dp-3",
    chapter: "dealing-with-passengers",
    prompt: "A lone passenger is very drunk late at night. What should you do?",
    options: [
      "Leave them at the nearest corner",
      "Take extra care to get them safely to their destination, and contact the police if they're at risk",
      "Take a longer route",
      "Refuse to speak to them",
    ],
    answer: 1,
    explanation:
      "A heavily intoxicated passenger can be vulnerable. Make sure they get home safely, and call the police if you think they're at risk.",
  },
  {
    id: "pro-seru-dp-4",
    chapter: "dealing-with-passengers",
    prompt: "Which comment to a passenger is acceptable?",
    options: [
      "A remark about their appearance",
      "A question about their relationship status",
      "Confirming the pick-up and drop-off details",
      "A joke about their religion",
    ],
    answer: 2,
    explanation:
      "Keep conversation professional. Comments about appearance, relationships or religion can be offensive or amount to harassment.",
  },
];
