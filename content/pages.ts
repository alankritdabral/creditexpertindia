// Copy for the six solution pages. One shape, one template (components/sections/IntentPage.tsx).
// Keep claims general and qualified: rates, savings and approval depend on the lender.

export type IntentPageContent = {
  slug: string;
  path: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  suits: string[];
  notSuits: string[];
  tool: "savings" | "emi";
  showExample?: boolean;
  defaultNeed: string;
  faqs: { q: string; a: string }[];
};

const NO_GUARANTEE = {
  q: "Do you guarantee approval or a particular rate?",
  a: "No. Credit Expert India is a loan facilitator, not a lender. Approval, the interest rate, the loan amount and the tenure are decided by the lender, based on its own criteria.",
};

export const intentPages: IntentPageContent[] = [
  {
    slug: "debt-consolidation",
    path: "/debt-consolidation",
    name: "Debt Consolidation",
    metaTitle: "Debt Consolidation in India",
    metaDescription: "Replace several EMIs and card dues with one loan and one monthly payment. See who it may suit, what to watch for, and estimate the difference.",
    h1: "Simplify Multiple EMIs With Debt Consolidation",
    lead: "Debt consolidation replaces several loans and card dues with one new loan and one monthly EMI. It can make repayment simpler and sometimes cheaper. We help you work out whether it makes sense for you.",
    suits: [
      "You pay several EMIs with different due dates",
      "You carry credit card dues or app loans at high interest rates",
      "You have a regular salary and a reasonable repayment history",
      "You want one predictable monthly payment",
    ],
    notSuits: [
      "Your current loans already have low interest rates, so a new loan may not save money",
      "Most of your loans are almost repaid, so fees could outweigh any saving",
      "The new loan would run much longer, so you would pay more interest overall",
      "You are behind on payments. Talk to your lenders first, and ask us what may be possible",
    ],
    tool: "savings",
    showExample: true,
    defaultNeed: "Reduce existing EMIs",
    faqs: [
      { q: "What is debt consolidation?", a: "It means taking one new loan to pay off several existing debts, so you make a single monthly payment instead of many. Your total cost depends on the new rate, the loan amount and how long you take to repay." },
      { q: "Can you help with multiple loans and credit card dues?", a: "Yes. We review your loans, EMIs and card dues together and help you understand whether consolidation or another option may suit you, depending on your profile and lender criteria." },
      { q: "How is my new EMI worked out?", a: "From the loan amount, the interest rate and the tenure. Our calculator uses the standard formula, so you can see how each one changes the result." },
      { q: "Is the assessment free?", a: "There is no charge for the initial assessment. Any processing fees or charges are set by the lender and should be shown to you before you sign." },
      NO_GUARANTEE,
    ],
  },
  {
    slug: "credit-card-debt",
    path: "/credit-card-debt",
    name: "Credit Card Debt",
    metaTitle: "Credit Card Debt Help",
    metaDescription: "Credit card dues often carry very high interest. Explore whether a lower-rate personal loan could reduce what you pay, and when it may not help.",
    h1: "Credit Card Debt: Explore Ways to Pay Less Interest",
    lead: "Credit card dues often carry some of the highest interest rates of any borrowing. Replacing them with a loan at a lower rate may reduce what you pay, as long as you stop adding new card balances.",
    suits: [
      "You pay only the minimum due and the balance keeps growing",
      "You hold balances on more than one card",
      "You can commit to a fixed monthly EMI until the loan is repaid",
      "You have a regular salary",
    ],
    notSuits: [
      "You clear your card in full each month",
      "Your balance is small and you can repay it within a few months",
      "You might keep using the card after consolidating, which can leave you owing both",
    ],
    tool: "savings",
    defaultNeed: "Credit card debt",
    faqs: [
      { q: "How much interest do credit cards charge?", a: "It varies by card and bank. Many cards charge several percent a month on unpaid balances, which is a high yearly rate. The finance charges on your statement show exactly what you pay." },
      { q: "Will my credit card be closed if I pay it off with a loan?", a: "Not automatically. Paying a card balance with a loan does not close the card unless you or the card issuer choose to close it." },
      { q: "Can I consolidate more than one card?", a: "Often yes. We look at all your cards and other dues together and help you understand which options may fit your profile." },
      NO_GUARANTEE,
    ],
  },
  {
    slug: "app-loan",
    path: "/app-loan",
    name: "App Loans",
    metaTitle: "Managing Several App Loans",
    metaDescription: "Several short-term app loans can be costly and hard to track. Explore whether one structured loan could be simpler and cheaper, and when it may not be.",
    h1: "Managing Several App Loans? Explore a Simpler Plan",
    lead: "Short-term app loans can carry high effective interest, fees and tight due dates. If you have several, one structured loan may be easier to manage and, in some cases, cheaper.",
    suits: [
      "You have two or more app or digital loans",
      "Due dates fall close together and are hard to track",
      "Fees and charges make the real cost unclear",
      "You sometimes borrow from one app to repay another",
    ],
    notSuits: [
      "You have one small loan that you will repay shortly",
      "The total you owe is small compared with the fees on a new loan",
      "You are receiving recovery calls and have missed payments. Ask the lender for a repayment plan and keep a record of every call",
    ],
    tool: "savings",
    defaultNeed: "App loans",
    faqs: [
      { q: "Why are app loans expensive?", a: "Many short-term loans add processing fees and charge high interest over a short period, so the yearly cost can be much higher than the monthly rate suggests. Read the total repayable amount before you borrow." },
      { q: "Can I replace several app loans with one loan?", a: "It may be possible, depending on your income, credit profile and the lender. We review what you owe and explain the options we see." },
      { q: "Is it safe to share my documents?", a: "We never ask you to send money to a personal account. Share documents only through channels you trust, and never share your OTP with anyone." },
      NO_GUARANTEE,
    ],
  },
  {
    slug: "high-interest-loan",
    path: "/high-interest-loan",
    name: "High-Interest Loans",
    metaTitle: "Paying a High Interest Rate?",
    metaDescription: "If your loan carries a high rate, a cheaper loan may exist for your profile. See who it may suit, the costs to check, and estimate the difference.",
    h1: "Paying a High Rate on a Loan? See If a Cheaper One Fits",
    lead: "If your income or repayment record has improved since you took your loan, you may qualify for a lower rate now. A cheaper loan could reduce your EMI or the total interest, once fees are counted.",
    suits: [
      "You took your loan some time ago and your income has grown",
      "Your repayment record is regular",
      "Your rate is well above what current personal loan rates are for your profile",
      "Years remain on your loan, so a lower rate has time to matter",
    ],
    notSuits: [
      "Your loan is close to being repaid",
      "Early repayment charges on your current loan are high",
      "The new loan would run much longer, so you would pay more in total",
    ],
    tool: "savings",
    defaultNeed: "Reduce existing EMIs",
    faqs: [
      { q: "What rate can I get?", a: "It depends on the lender, your income, employer, credit profile and existing obligations. Rates shown anywhere are indicative, not an offer." },
      { q: "What should I compare besides the rate?", a: "Processing fees, charges for repaying your current loan early, and the tenure. A lower rate over a longer tenure can cost more in total." },
      { q: "Will checking my options affect my credit score?", a: "Looking at your own report is generally a soft enquiry. A lender may make a hard enquiry if you formally apply, which can affect your score." },
      NO_GUARANTEE,
    ],
  },
  {
    slug: "loan-balance-transfer",
    path: "/loan-balance-transfer",
    name: "Loan Balance Transfer",
    metaTitle: "Loan Balance Transfer Explained",
    metaDescription: "A balance transfer moves your loan to another lender, ideally at a lower rate. Learn when it can save money and which charges to check first.",
    h1: "Loan Balance Transfer: Is Moving Your Loan Worth It?",
    lead: "A balance transfer moves your existing loan to another lender, ideally at a lower rate. Whether it saves money depends on the rate gap, the time left on the loan and the fees on both sides.",
    suits: [
      "You have several years left on your loan",
      "The new rate is clearly lower than the one you pay now",
      "Your repayment record with the current lender is regular",
      "You can cover the charges for moving the loan",
    ],
    notSuits: [
      "The rate gap is small, so fees could cancel the saving",
      "Your current lender charges a high foreclosure or prepayment fee",
      "Little time is left on your loan",
    ],
    tool: "savings",
    defaultNeed: "Balance transfer",
    faqs: [
      { q: "What costs should I check?", a: "Any foreclosure or prepayment charge from your current lender, the processing fee and other charges from the new lender, and taxes. Add them up before you compare rates." },
      { q: "Does a balance transfer always save money?", a: "No. It helps most when the rate gap is meaningful and many years remain. Use the calculator to compare, and ask a specialist to check the fees." },
      { q: "Can I move more than one loan?", a: "Sometimes. Each loan is assessed on its own terms, and a lender may treat several loans as a consolidation instead." },
      NO_GUARANTEE,
    ],
  },
  {
    slug: "personal-loan",
    path: "/personal-loan",
    name: "Personal Loan",
    metaTitle: "Personal Loans for Salaried Staff",
    metaDescription: "Explore personal loan options for salaried professionals. Estimate your EMI, see typical criteria and documents, and talk to a specialist. Lenders decide.",
    h1: "Personal Loans for Salaried Professionals",
    lead: "Explore personal loan options based on your income, employer and credit profile. We help you understand what you may qualify for and what the loan would cost. The lender makes the final decision.",
    suits: [
      "You are a salaried employee with a regular income",
      "You need funds for a planned expense",
      "You want to compare options across lenders before you apply",
      "You can comfortably afford the EMI alongside your existing ones",
    ],
    notSuits: [
      "Your existing EMIs already take most of your income",
      "You need the money for something a lower-cost option could cover",
      "You are applying to many lenders at once, which can lower your score",
    ],
    tool: "emi",
    defaultNeed: "Personal loan",
    faqs: [
      { q: "What rate can I get?", a: "Rates start from 9.95% a year* for eligible salaried applicants. *The actual rate depends on your income, employer, credit profile, existing obligations, loan amount, tenure and the lender's policy." },
      { q: "What documents do I need?", a: "Typically proof of identity, recent salary slips and bank statements, and address proof. Each lender sets its own list." },
      { q: "How is the EMI calculated?", a: "From the loan amount, rate and tenure, using the standard formula. The calculator on this page shows the result as you change each one." },
      { q: "Are there fees?", a: "Lenders usually charge a processing fee and may charge other fees. They should be shown to you before you accept an offer." },
      NO_GUARANTEE,
    ],
  },
];

export const getIntentPage = (slug: string) => {
  const page = intentPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown intent page: ${slug}`);
  return page;
};

// Questions for /faq: the general ones first, then everything already answered on the homepage.
import { faqs as coreFaqs } from "@/content/site";

export const generalFaqs: { q: string; a: string }[] = [
  { q: "What does Credit Expert India do?", a: "We help you understand your existing debt or borrowing needs and explore loan, consolidation or repayment options for your situation. We are a loan facilitator, not a lender." },
  { q: "Can you help with multiple loans?", a: "Yes. We can review several loans and EMIs together and help you understand whether consolidation or another option may suit you." },
  ...coreFaqs,
  { q: "Do you guarantee lower interest rates?", a: "No. Rates depend on your profile, the lender's policies and prevailing terms. We help you explore options; we cannot promise a rate." },
];
