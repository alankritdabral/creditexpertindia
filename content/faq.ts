/**
 * The single source of truth for the homepage/`/faq` FAQ list, imported by
 * both components/FAQ.tsx (the visible accordion) and app/faq/page.tsx
 * (its FAQPage JSON-LD), so the two can never drift the way /faq's
 * hand-written schema and /debt-consolidation's did before this phase.
 *
 * Note: Google removed the FAQ rich result for all sites on 7 May 2026
 * (developers.google.com/search/updates), so this schema produces no rich
 * result today. It's kept anyway because it costs nothing and exactly
 * matches what's on the page — unlike the two copies this phase removed.
 */
export const siteFaqs = [
  {
    question: "What does Credit Expert India do?",
    answer: "We help customers understand their existing debt or borrowing requirements and explore suitable loan, consolidation or repayment options based on their situation."
  },
  {
    question: "Can you help with multiple loans?",
    answer: "Yes. We can review multiple loans and EMIs together and help you understand whether consolidation or another option may be suitable."
  },
  {
    question: "Can you help with credit-card debt?",
    answer: "We can review your credit-card dues and help you understand potential repayment or consolidation options available based on your situation."
  },
  {
    question: "Do you guarantee loan approval?",
    answer: "No. Final approval, interest rate, loan amount and tenure are decided by the respective lender based on its eligibility criteria."
  },
  {
    question: "Do you guarantee lower interest rates?",
    answer: "No. Rates depend on your profile, lender policies and prevailing terms. We help you explore suitable options."
  },
  {
    question: "Is the assessment free?",
    answer: "The initial assessment can be offered without obligation. Any applicable charges, if any, should always be communicated clearly before proceeding."
  },
  {
    question: "Will taking another loan always help?",
    answer: "No. A new loan isn't always the right solution. We first look at the existing situation and then discuss relevant options."
  }
];
