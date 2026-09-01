// All copy aligned with credit-expert-india-website-redesign.md blueprint
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Debt Solutions", href: "/debt-consolidation" },
  { label: "Personal Loan", href: "/personal-loan" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  headline: "Too Many EMIs? Let's Make Them Simpler.",
  subheadline:
    "Consolidate eligible high-interest loans, credit card dues and scattered EMIs into a simpler repayment plan — or explore personal-loan options based on your profile.",
  highlight: "Rates starting from 9.95% p.a.* for eligible salaried applicants",
  ctas: {
    primary: "Check My Options",
    secondary: "Calculate My Savings",
    whatsapp: "Talk to a Credit Expert",
  },
  bullets: [
    "Free initial consultation",
    "Confidential assistance",
    "Salaried profiles supported",
    "No obligation to apply",
  ],
};

export const whatsBringsYouHere = {
  heading: "What Brings You Here Today?",
  subheading:
    "Select your current situation to explore tailored guidance and eligibility options.",
  existingDebt: {
    badge: "EXISTING DEBT",
    title: "I Have Existing Debt",
    desc: "Reduce the burden of multiple EMIs, credit-card dues and expensive loans into one manageable plan.",
    points: [
      "Multiple personal loans & EMIs",
      "High-interest credit card dues",
      "Expensive fintech & app loans",
      "High overall monthly repayment burden",
      "Loan balance transfer opportunities",
    ],
    cta: "Explore Debt Solutions",
    href: "/debt-consolidation",
  },
  newLoan: {
    badge: "NEW BORROWING",
    title: "I Need a New Loan",
    desc: "Explore personal-loan options based on your income, employer category, and credit eligibility.",
    points: [
      "Fresh personal loans for salaried staff",
      "Competitive interest rates from partner banks",
      "Higher loan amount eligibility assistance",
      "Transparent terms & fast processing",
      "Multiple lender options review",
    ],
    cta: "Check Loan Eligibility",
    href: "/personal-loan",
  },
};

export const problemCards = [
  { title: "Credit Card Debt", text: "Paying high interest or revolving minimum dues?", icon: "credit-card", href: "/credit-card-debt" },
  { title: "App Loans", text: "Managing multiple high-rate digital or fintech app loans?", icon: "smartphone", href: "/app-loan" },
  { title: "High-Interest Loans", text: "Paying expensive interest rates on active personal loans?", icon: "trending-up", href: "/high-interest-loan" },
  { title: "Multiple EMIs", text: "Struggling with scattered repayment dates across lenders?", icon: "layers", href: "/debt-consolidation" },
  { title: "Loan Balance Transfer", text: "Want to transfer your high-rate loan to a lower-rate lender?", icon: "wallet", href: "/loan-balance-transfer" },
];

export const services = [
  {
    id: "credit-card",
    title: "Credit Card Debt",
    desc: "Help customers explore options for replacing expensive revolving credit card dues with a structured, lower-cost personal loan.",
    cta: "Explore Credit Card Payoff",
    href: "/credit-card-debt",
  },
  {
    id: "consolidation",
    title: "Debt Consolidation",
    desc: "Explore whether multiple eligible debts can be consolidated into a single simpler monthly repayment structure.",
    cta: "Explore Debt Consolidation",
    href: "/debt-consolidation",
  },
  {
    id: "high-interest",
    title: "High-Interest Loans",
    desc: "Explore whether a lower-cost loan or refinancing option may be available to lower your annual interest burden.",
    cta: "Explore Interest Reduction",
    href: "/high-interest-loan",
  },
  {
    id: "app-loans",
    title: "App Loans",
    desc: "Guidance for salaried professionals managing multiple or expensive short-term digital loans.",
    cta: "Explore App Loan Consolidation",
    href: "/app-loan",
  },
  {
    id: "personal-loan",
    title: "Personal Loan",
    desc: "Explore personal-loan options based on your income, salary profile, and lender eligibility criteria.",
    cta: "Check Personal Loan Eligibility",
    href: "/personal-loan",
  },
  {
    id: "balance-transfer",
    title: "Balance Transfer",
    desc: "Help customers assess whether transferring an existing high-rate loan to another lender could make financial sense.",
    cta: "Explore Balance Transfer",
    href: "/loan-balance-transfer",
  },
];

export const howItWorks = [
  { step: "01", title: "Tell Us Your Situation", desc: "Share your income, current active loans, credit card dues, and repayment goals through our quick confidential form." },
  { step: "02", title: "We Review Your Profile", desc: "A credit specialist reviews your information and identifies potential loan structure options." },
  { step: "03", title: "Explore Suitable Options", desc: "Potentially suitable lender and financial solutions across our partner bank network are presented to you." },
  { step: "04", title: "Complete Your Application", desc: "Submit the required documents (KYC, salary slips, bank statements) for the selected lender application." },
  { step: "05", title: "Lender Decision", desc: "The relevant bank/NBFC evaluates the application according to their credit policy and makes the final decision." },
];

export const whyUs = [
  {
    title: "Lending Network",
    desc: "Explore applicable options from partner banks and NBFCs where relationships genuinely exist across India.",
    icon: "building",
  },
  {
    title: "Privacy First",
    desc: "Customer information is handled confidentially with bank-grade security according to our strict privacy policy.",
    icon: "lock",
  },
  {
    title: "Human Assistance",
    desc: "Speak with a real credit specialist who understands your specific debt and borrowing requirements.",
    icon: "headphones",
  },
  {
    title: "Transparent Terms",
    desc: "Clearly explain rates, fees, eligibility criteria, lender decisions, and applicable terms before you apply.",
    icon: "eye",
  },
];

export const whoWeHelp = [
  "Salaried professionals managing multiple active EMIs",
  "Borrowers paying high credit card interest (>36% p.a.)",
  "Customers carrying multiple app/fintech loan dues",
  "Salaried employees seeking low-interest personal loans",
  "Borrowers exploring personal loan balance transfers",
  "Profiles wanting to lower overall monthly loan outflows",
];

export const eligibility = [
  "Age: 21 to 58 years",
  "Employment Type: Salaried (Private Ltd, MNC, Govt, PSU)",
  "Minimum Net Monthly Income: ₹25,000+",
  "Credit Profile: Minimum 650 CIBIL preferred (fresh profiles also reviewed)",
  "Existing EMIs: Less than 65% of net monthly income",
];

export const documents = [
  "Identity Proof: PAN Card, Aadhaar Card",
  "Income Proof: Latest 3 months' salary slips",
  "Banking Proof: Latest 6 months' salary bank account statements",
  "Address Proof: Passport, Voter ID, Utility Bill, or Rental Agreement",
  "Existing Liability Proof: Current loan statements or credit card bills (for consolidation)",
];

export const faqs = [
  {
    q: "What is debt consolidation?",
    a: "Debt consolidation is the process of combining multiple eligible high-interest debts—such as credit card dues, personal loans, or app loans—into a single personal loan with one monthly EMI. This simplifies tracking and may lower your overall monthly outflow depending on eligible interest rates.",
  },
  {
    q: "Can I consolidate credit-card dues?",
    a: "Yes. Credit card debt typically carries revolving interest rates of 36%–42% p.a. Consolidating credit card dues into a personal loan at 10%–16% p.a. can significantly reduce your interest payments, subject to lender approval.",
  },
  {
    q: "Can I reduce my EMI?",
    a: "Reducing your monthly EMI may be possible if you obtain a lower interest rate, extend the tenure, or consolidate multiple scattered EMIs. Final EMI reduction depends on your income profile, credit score, and lender terms.",
  },
  {
    q: "What interest rate can I get?",
    a: "Personal loan rates start from 9.95% p.a.* for highly qualified salaried applicants. The actual rate offered depends on your employer category, monthly salary, CIBIL score, and partner lender policy.",
  },
  {
    q: "Does checking eligibility affect my CIBIL score?",
    a: "No. Initial eligibility assessment on Credit Expert India is a soft profile check and does not impact your CIBIL score. A hard enquiry is only conducted by partner banks if you decide to formally submit a loan application.",
  },
  {
    q: "Do you guarantee loan approval?",
    a: "No. Credit Expert India does not guarantee loan approval. Final approval, interest rate, loan amount, and tenure are strictly determined by the respective partner bank or NBFC based on their underwriting criteria.",
  },
  {
    q: "What documents are required?",
    a: "Standard requirements include PAN card, Aadhaar card, latest 3 months' salary slips, 6 months' bank statements, and current loan/card statements. Minimal documentation applies for pre-approved salaried offers.",
  },
  {
    q: "Are there processing fees?",
    a: "Initial credit advisory on Credit Expert India is 100% free. Any loan processing fees or stamp duty charges are charged directly by the lending bank/NBFC and will be clearly disclosed before loan agreement signing.",
  },
];

export const testimonials = [
  {
    name: "Rahul S.",
    role: "Software Engineer, Bengaluru",
    text: "I had 2 personal loans and ₹1.8 Lakhs in credit card debt with 3 different due dates. Credit Expert India helped me consolidate everything into one single EMI, reducing my monthly outflow substantially.",
    rating: 5,
  },
  {
    name: "Ananya M.",
    role: "Senior HR Manager, Mumbai",
    text: "The team guided me transparently through the eligibility check. They didn't make unrealistic promises and connected me with a top private bank balance transfer offer at 10.5% p.a.",
    rating: 5,
  },
  {
    name: "Vikram P.",
    role: "Marketing Lead, Gurgaon",
    text: "Clear, honest advice without pushing debt settlement. They explained how consolidating app loans into a structured personal loan protects CIBIL scores.",
    rating: 5,
  },
];

export const trustBullets = [
  "Free initial consultation",
  "Confidential assistance",
  "Salaried profiles supported",
  "No obligation to apply",
];

