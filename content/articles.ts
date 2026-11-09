export type Article = {
  slug: string;
  title: string;
  /**
   * Short title for the <title> tag, kept ≤38 chars so the rendered title
   * (with the root layout's " | Credit Expert India" template, 22 chars)
   * stays within Google's ~60-char display budget. `title` is the longer,
   * more descriptive headline shown as the page's H1 — it isn't shortened,
   * since that would mean rewriting editorial copy rather than fixing SEO
   * metadata. Falls back to `title` if omitted.
   */
  seoTitle?: string;
  summary: string;
  /** Real content date (ISO), used for the sitemap and Article JSON-LD (plan Phase 9). Not `new Date()`. */
  publishedAt: string;
  updatedAt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

// All six articles were added in one commit (git log content/articles.ts),
// so they share one publishedAt/updatedAt for now. Update an article's
// updatedAt only when its own text materially changes.
const ARTICLES_ADDED = "2026-11-02T15:06:53+05:30";

export const articles: Article[] = [
  {
    slug: "what-is-emi-and-how-is-it-calculated",
    title: "What is an EMI, and how is it calculated?",
    seoTitle: "EMI Meaning, Full Form & Formula",
    summary: "EMI meaning, full form and the formula lenders use, plus the simple maths behind your monthly loan payment.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED,
    sections: [
      {
        heading: "EMI meaning and full form",
        paragraphs: [
          "EMI full form is Equated Monthly Instalment. It is the fixed amount you pay your lender every month until the loan is cleared. Each EMI has two parts: some repays the principal you borrowed, and the rest is interest.",
          "In the early months most of your EMI goes towards interest. As the balance falls, more of it goes towards principal.",
        ],
      },
      {
        heading: "The formula: how EMI is calculated",
        paragraphs: [
          "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of months.",
          "You don't need to do this by hand. Our EMI calculator does it for you as you move the sliders.",
        ],
      },
      {
        heading: "What moves your EMI the most",
        paragraphs: [
          "A longer tenure lowers your monthly EMI but increases the total interest you pay. A shorter tenure does the opposite. The interest rate matters a lot too: on the same amount and tenure, a few percentage points can change your total cost by a large amount.",
          "That is why it is worth comparing your current rate with what you might be eligible for before you decide anything.",
        ],
      },
      {
        heading: "Common EMI questions",
        paragraphs: [
          "What is the full form of EMI? Equated Monthly Instalment — the same fixed amount repaid each month for the life of the loan.",
          "How does EMI payment work? Your lender splits every instalment between interest and principal, debiting it automatically from your bank account on a fixed date each month.",
          "Is EMI the same as a monthly instalment? Yes, but unlike a plain instalment an EMI stays fixed for the whole tenure, so the interest-to-principal split shifts over time instead of the payment amount changing.",
        ],
      },
    ],
  },
  {
    slug: "debt-consolidation-explained-for-salaried-borrowers",
    title: "Debt consolidation, explained for salaried borrowers",
    seoTitle: "Debt Consolidation Explained",
    summary: "What it means to merge several EMIs into one loan, who it can help, and when it may not be worth it.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED,
    sections: [
      {
        heading: "What is debt consolidation?",
        paragraphs: [
          "Debt consolidation means taking one new loan and using it to pay off several existing ones, such as personal loans, credit-card balances and app loans. You are then left with a single EMI and a single due date.",
        ],
      },
      {
        heading: "When it can help",
        paragraphs: [
          "It tends to make sense when your current debts carry higher interest rates than the new loan, for example credit-card balances or short-term app loans. It can also help if tracking many due dates is causing missed payments.",
        ],
      },
      {
        heading: "When it may not help",
        paragraphs: [
          "If the new loan has a similar rate, a much longer tenure, or high fees, you may end up paying more overall. Foreclosure charges on your existing loans also matter. Always compare the total cost, not just the monthly EMI.",
          "We tell people straight when consolidating isn't worth it. Approval, rate and tenure are always decided by the lender.",
        ],
      },
    ],
  },
  {
    slug: "credit-card-interest-vs-personal-loan-interest",
    title: "Credit-card interest vs personal-loan interest",
    seoTitle: "Personal Loan vs Card Interest Rate",
    summary: "Personal loan interest rate vs credit card interest rate compared, and why carrying a card balance usually costs far more.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED,
    sections: [
      {
        heading: "Why cards cost more",
        paragraphs: [
          "Credit cards often charge a credit card loan interest rate of 3 to 3.5% a month on unpaid balances, which works out to roughly 36 to 42% a year. A personal loan interest rate for salaried borrowers is usually far lower, depending on your profile and the lender.",
        ],
      },
      {
        heading: "The minimum-due trap",
        paragraphs: [
          "Paying only the minimum due keeps your account in good standing but lets the rest of the balance keep growing with interest. Over time that can become a large amount.",
        ],
      },
      {
        heading: "Options to consider",
        paragraphs: [
          "If you carry a card balance month after month, you could look at moving it to a lower-rate personal loan with a fixed EMI. Compare the total interest and any processing fees first. Your eligibility and the final rate depend on the lender.",
        ],
      },
    ],
  },
  {
    slug: "personal-loan-balance-transfer-when-it-makes-sense",
    title: "Personal-loan balance transfer: when does it make sense?",
    seoTitle: "Balance Transfer vs Prepayment",
    summary: "Balance transfer vs prepayment, and the charges and interest rate to check before you move an existing loan to a cheaper lender.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED,
    sections: [
      {
        heading: "What is a balance transfer?",
        paragraphs: [
          "A balance transfer means a new lender pays off your existing loan, and you then repay the new lender, ideally at a lower interest rate.",
        ],
      },
      {
        heading: "Balance transfer vs prepayment",
        paragraphs: [
          "Prepayment means paying down your existing loan faster with your own lump sum, with no new lender involved. A balance transfer instead moves the outstanding amount to a new lender at a lower interest rate. If you have spare cash and no prepayment penalty, prepayment is usually simpler; if the rate gap is large and you don't have a lump sum, a transfer can save more.",
        ],
      },
      {
        heading: "Check these before you switch",
        paragraphs: [
          "Look at the rate difference, the processing fee and other charges on the new loan, any foreclosure charge on the old loan, and how many months remain on your current tenure. A bigger rate gap and a longer remaining tenure usually mean more savings.",
        ],
      },
      {
        heading: "A simple test",
        paragraphs: [
          "Add up everything you would pay on the new loan, including fees, and compare it with what you would pay if you stayed. If the new total is clearly lower, a transfer may be worth exploring.",
        ],
      },
    ],
  },
  {
    slug: "salaried-personal-loan-eligibility-checklist",
    title: "Salaried personal-loan eligibility: a simple checklist",
    seoTitle: "Loan Eligibility Criteria & Checklist",
    summary: "Personal loan eligibility criteria and income requirements lenders check for salaried employees, and how to prepare before you apply.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED,
    sections: [
      {
        heading: "Personal loan eligibility criteria",
        paragraphs: [
          "Most lenders check your age, your employment type and employer category, your net monthly income, your credit score and your existing EMIs compared with your income. The income requirements for a personal loan vary by lender, but a stable salaried income is the main one.",
          "Each lender sets its own criteria, so meeting the general benchmarks improves your chances of being shortlisted but does not guarantee approval.",
        ],
      },
      {
        heading: "Documents to keep ready",
        paragraphs: [
          "Typically PAN and Aadhaar, your latest salary slips, recent bank statements and proof of employment. If you are consolidating, keep your current loan and card statements handy too.",
        ],
      },
      {
        heading: "Before you apply",
        paragraphs: [
          "Avoid applying to many lenders at once, since each full application can leave an enquiry on your credit report. A soft eligibility check helps you see where you stand first.",
        ],
      },
    ],
  },
  {
    slug: "overdraft-vs-personal-loan",
    title: "Overdraft vs personal loan: which suits you?",
    seoTitle: "Overdraft vs Personal Loan",
    summary: "Two ways to borrow, two different ways of paying. A quick comparison for salaried borrowers.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED,
    sections: [
      {
        heading: "How they differ",
        paragraphs: [
          "A personal loan gives you a fixed amount upfront, repaid through fixed EMIs. An overdraft or credit line gives you a limit you can draw from as needed, and interest is generally charged on the amount you actually use. Terms vary a lot between lenders.",
        ],
      },
      {
        heading: "When an overdraft can fit",
        paragraphs: [
          "If your cash needs come in small, irregular amounts, a limit you can dip into may be more flexible than taking a large loan.",
        ],
      },
      {
        heading: "When a personal loan fits better",
        paragraphs: [
          "If you need a known amount for a specific purpose and want a fixed repayment schedule, a personal loan is usually simpler to plan around. Whichever you choose, compare rates, fees and the total cost.",
        ],
      },
    ],
  },
];
