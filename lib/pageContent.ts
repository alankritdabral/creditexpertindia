export type PageKey =
  | "about"
  | "how-it-works"
  | "app-loan"
  | "high-interest-loan"
  | "balance-transfer"
  | "personal-loan"
  | "credit-card-debt"
  | "debt-consolidation"
  | "overdraft"
  | "eligibility"
  | "emi-calculator"
  | "city";

export type Benefit = { icon: string; title: string; text: string };
export type Faq = { q: string; a: string };

type PageContent = {
  heading: string;
  intro: string;
  benefits: Benefit[];
  faqs: Faq[];
};

// Facts mirror the rest of the site: 50+ partner lenders, rates from 9.95% p.a.*, up to ₹1 Cr and 84 months.
export const stats = [
  { value: "50+", label: "partner banks and NBFCs compared" },
  { value: "9.95%", label: "p.a.* starting rate for eligible salaried applicants" },
  { value: "₹1 Cr", label: "maximum loan amount from select lenders*" },
  { value: "84", label: "months of maximum repayment tenure*" },
];

// Placeholder stories: replace with real, consented customer quotes before launch.
export const testimonials = [
  {
    quote: "I had four EMIs due on different dates. Now it's one payment and I finally know what I owe.",
    who: "Salaried professional, Bangalore",
  },
  {
    quote: "They told me honestly that switching wouldn't save much on one of my loans. I appreciated that.",
    who: "Salaried professional, Delhi",
  },
  {
    quote: "Simple process, no jargon, and nobody pushed me to sign up for anything.",
    who: "Salaried professional, Pune",
  },
];

const commonFaq: Faq[] = [
  { q: "Is the assessment free?", a: "Yes. The initial assessment is free and carries no obligation. Any applicable charges are always shared clearly before you proceed." },
  { q: "Do you guarantee approval or a lower rate?", a: "No. Approval, rate, amount and tenure are decided by the lender based on your profile and its policy. We help you explore suitable options." },
  { q: "Will checking affect my credit score?", a: "We start with a soft profile review. A hard enquiry only happens if you choose to apply with a lender." },
];

export const pageContent: Record<PageKey, PageContent> = {
  about: {
    heading: "What we stand for.",
    intro: "We're a small team of credit specialists who'd rather give you a straight answer than a sales pitch.",
    benefits: [
      { icon: "users", title: "Real people", text: "Every enquiry is handled by a credit specialist, not a chatbot." },
      { icon: "shield", title: "Modest claims", text: "We tell you what's possible and what isn't, even if it means no sale." },
      { icon: "lock", title: "Careful with your data", text: "Your details are used only to assess your options." },
      { icon: "map", title: "Offices in 3 cities", text: "Visit us in Dehradun, Delhi or Rudrapur." },
    ],
    faqs: [
      { q: "Who is Credit Expert India for?", a: "Salaried professionals juggling multiple EMIs, card dues or high-interest loans who want a clearer way forward." },
      { q: "Are you a lender?", a: "No. We help you compare options with partner banks and NBFCs. The final decision always rests with the lender." },
      ...commonFaq,
    ],
  },
  "how-it-works": {
    heading: "Why the process feels easy.",
    intro: "Four short steps, and you can stop at any of them.",
    benefits: [
      { icon: "clock", title: "A few minutes", text: "Share basic details and get a first view of your options." },
      { icon: "file", title: "Few documents", text: "No uploads needed to start the assessment." },
      { icon: "scale", title: "Compared for you", text: "We look across partner lenders so you don't have to." },
      { icon: "check", title: "You decide", text: "Nothing moves forward without your say-so." },
    ],
    faqs: [
      { q: "How long does it take?", a: "The initial review takes a few minutes. A specialist then calls you to walk through the options." },
      { q: "Do I need documents upfront?", a: "No. Documents are only needed if you decide to apply with a lender." },
      ...commonFaq,
    ],
  },
  "app-loan": {
    heading: "Why roll app loans into one.",
    intro: "Small app loans add up fast. One bank loan can be simpler and cheaper.",
    benefits: [
      { icon: "percent", title: "Lower cost", text: "App loans often carry steep fees and interest. A bank loan can cost less." },
      { icon: "calendar", title: "One due date", text: "Replace several repayment dates with a single EMI." },
      { icon: "trending", title: "Healthier profile", text: "Fewer open accounts can make your credit picture easier to read." },
      { icon: "shield", title: "No upfront fees", text: "We never ask for money to check your options." },
    ],
    faqs: [
      { q: "Which app loans can be combined?", a: "Most short-term app and digital credit-line loans can be reviewed together. Eligibility depends on the lender." },
      ...commonFaq,
    ],
  },
  "high-interest-loan": {
    heading: "Stop overpaying every month.",
    intro: "If your rate is above 16%, it's worth checking whether you can pay less.",
    benefits: [
      { icon: "percent", title: "Compare rates", text: "See how your current rate stacks up against partner banks." },
      { icon: "wallet", title: "Lower monthly burden", text: "A lower rate or longer tenure can ease your EMI." },
      { icon: "scale", title: "Honest verdict", text: "If switching isn't worth it, we'll say so." },
      { icon: "check", title: "You stay in control", text: "No obligation to move your loan." },
    ],
    faqs: [
      { q: "When is refinancing worth it?", a: "Usually when the savings in interest outweigh any processing or foreclosure charges. We help you work that out." },
      ...commonFaq,
    ],
  },
  "balance-transfer": {
    heading: "Why transfer your loan.",
    intro: "Moving a balance to a partner bank can cut interest if you qualify.",
    benefits: [
      { icon: "percent", title: "Rates from 9.95%*", text: "For eligible salaried applicants with partner banks." },
      { icon: "scale", title: "Banks compared", text: "We check several lenders so you don't have to." },
      { icon: "wallet", title: "Save each month", text: "A lower rate can mean a smaller EMI or a shorter loan." },
      { icon: "check", title: "No pressure", text: "Switch only if the numbers make sense for you." },
    ],
    faqs: [
      { q: "Are there charges to transfer a loan?", a: "Your current lender may charge foreclosure fees and the new lender a processing fee. We help you weigh these against the savings." },
      ...commonFaq,
    ],
  },
  "personal-loan": {
    heading: "Why check with us first.",
    intro: "Compare partner banks in one place before you commit to a loan.",
    benefits: [
      { icon: "percent", title: "From 9.95% p.a.*", text: "Starting rates for eligible salaried applicants." },
      { icon: "clock", title: "Quick to check", text: "A soft profile check takes a couple of minutes." },
      { icon: "wallet", title: "Up to ₹1 Cr*", text: "Amounts and tenure vary by lender, up to 84 months." },
      { icon: "check", title: "You decide", text: "No obligation after the assessment." },
    ],
    faqs: [
      { q: "What do lenders look at?", a: "Typically age, income, employer category, existing EMIs and credit score." },
      ...commonFaq,
    ],
  },
  "credit-card-debt": {
    heading: "Break the minimum-due cycle.",
    intro: "Cards can charge 36–42% a year. A lower-rate loan can help you clear them sooner.",
    benefits: [
      { icon: "percent", title: "Much lower interest", text: "Personal loan rates are usually far below card rates." },
      { icon: "calendar", title: "A clear end date", text: "A fixed EMI and tenure means you know when you'll be done." },
      { icon: "wallet", title: "One payment", text: "Replace several card bills with one monthly EMI." },
      { icon: "shield", title: "No upfront money", text: "We never ask you to pay before an assessment." },
    ],
    faqs: [{ q: "Can I move several cards at once?", a: "Yes, balances across cards can be reviewed together to see if a single loan suits you." }, ...commonFaq],
  },
  "debt-consolidation": {
    heading: "Why consolidate.",
    intro: "One plan can be easier to manage than many scattered payments.",
    benefits: [
      { icon: "calendar", title: "One due date", text: "No more tracking multiple EMIs across the month." },
      { icon: "percent", title: "Potentially lower cost", text: "Combine high-interest debt into a lower-rate loan if you qualify." },
      { icon: "trending", title: "Clearer finances", text: "See everything you owe in one place." },
      { icon: "scale", title: "Honest advice", text: "If consolidating won't help, we'll tell you." },
    ],
    faqs: [{ q: "What debts can be combined?", a: "Personal loans, credit-card dues, app loans and similar unsecured debt can usually be reviewed together." }, ...commonFaq],
  },
  overdraft: {
    heading: "Why an overdraft.",
    intro: "Flexible credit that you pay interest on only when you use it.",
    benefits: [
      { icon: "wallet", title: "Use what you need", text: "Interest is charged on the amount drawn, not the full limit." },
      { icon: "clock", title: "Ready when needed", text: "Draw funds quickly for short-term gaps." },
      { icon: "scale", title: "Compared with loans", text: "We check whether another route would cost you less." },
      { icon: "check", title: "No pressure", text: "Decide only after seeing your options." },
    ],
    faqs: commonFaq.slice(0, 3),
  },
  eligibility: {
    heading: "What helps you qualify.",
    intro: "Small things lenders look at, and how you can prepare.",
    benefits: [
      { icon: "wallet", title: "Steady income", text: "A regular salary from an established employer helps." },
      { icon: "trending", title: "Healthy credit score", text: "On-time payments build the profile lenders look for." },
      { icon: "calendar", title: "Manageable EMIs", text: "Lower existing obligations leave room for new credit." },
      { icon: "file", title: "Basic documents", text: "ID, address proof and salary slips are usually enough." },
    ],
    faqs: [{ q: "What credit score do I need?", a: "Requirements vary by lender. A higher score generally improves your options and rate." }, ...commonFaq],
  },
  "emi-calculator": {
    heading: "Plan before you borrow.",
    intro: "A quick estimate helps you pick an amount and tenure you're comfortable with.",
    benefits: [
      { icon: "clock", title: "Instant results", text: "Adjust amount, rate and tenure and see your EMI at once." },
      { icon: "scale", title: "Compare rates", text: "See how a lower rate changes total interest." },
      { icon: "lock", title: "No sign-up", text: "Use the calculator without sharing any details." },
      { icon: "check", title: "Talk to an expert", text: "Want help beyond the numbers? Leave your details." },
    ],
    faqs: commonFaq,
  },
  city: {
    heading: "Why salaried borrowers choose us.",
    intro: "Local needs, honest guidance, and partner banks compared in one place.",
    benefits: [
      { icon: "map", title: "Help from anywhere", text: "Check your options online, wherever you are." },
      { icon: "percent", title: "From 9.95% p.a.*", text: "Rates for eligible salaried applicants." },
      { icon: "users", title: "Real specialists", text: "A credit expert walks you through the numbers." },
      { icon: "check", title: "No obligation", text: "You decide whether to go ahead." },
    ],
    faqs: commonFaq,
  },
};
