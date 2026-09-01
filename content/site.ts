// All copy separated from presentation
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Debt Consolidation", href: "#debt-consolidation" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#lead-form" },
] as const;

export const hero = {
  headline: "Paying Too Much Interest on Your Loans?",
  subheadline: "We help you explore suitable options for high-interest loans, credit-card dues, multiple EMIs, debt consolidation, balance transfers and personal loans through our lending network.",
  highlight: "Personal loans starting from 9.95% p.a.* for eligible salaried applicants",
  ctas: { primary: "Check My Options", secondary: "Talk to a Credit Expert" },
  bullets: ["Multiple lending options", "Expert assistance", "Fast processing", "Secure & confidential"],
};

export const problemCards = [
  { title: "Credit Card Debt", text: "Paying high interest or only minimum dues?", icon: "credit-card" },
  { title: "App Loans", text: "Managing expensive short-term or fintech loans?", icon: "smartphone" },
  { title: "High-Interest Loans", text: "Already paying a high rate on an existing loan?", icon: "trending-up" },
  { title: "Multiple EMIs", text: "Managing several loans and repayment dates?", icon: "layers" },
  { title: "High Monthly Outflow", text: "A large part of your income going toward EMIs?", icon: "wallet" },
];

export const services = [
  {
    title: "Debt Consolidation",
    desc: "Explore options to combine eligible high-cost debt into a more manageable repayment structure.",
    cta: "Explore Debt Consolidation",
  },
  {
    title: "Personal Loan",
    desc: "Explore personal-loan options from our lending network based on your eligibility.",
    cta: "Check Personal Loan Eligibility",
  },
  {
    title: "Balance Transfer",
    desc: "If your existing loan has a high interest rate, explore whether transferring it could offer better terms.",
    cta: "Check My Loan",
  },
  {
    title: "Fresh Loan",
    desc: "Need a new loan? Get assistance in finding suitable personal-loan options.",
    cta: "Get Loan Options",
  },
];

export const howItWorks = [
  { step: "01", title: "Tell Us Your Requirement", desc: "Share basic information about your loan requirement." },
  { step: "02", title: "Understand Your Current Debt", desc: "We understand your existing loans, EMIs and credit obligations." },
  { step: "03", title: "Review Your Profile", desc: "We assess information relevant to available lending options." },
  { step: "04", title: "Explore Suitable Options", desc: "We help identify options from applicable banking/lending partners." },
  { step: "05", title: "Complete Documentation", desc: "Submit the documents required by the relevant lender." },
  { step: "06", title: "Processing & Disbursal", desc: "The selected lender processes the application and, if approved, disburses the loan." },
];

export const whyUs = [
  { title: "Multiple Lending Options", desc: "Access suitable options through our banking/lending network." },
  { title: "Personalized Assistance", desc: "We help customers understand their available options." },
  { title: "Fast Service", desc: "Quick assistance throughout the application process." },
  { title: "Human Support", desc: "Speak directly with a credit expert instead of navigating the process alone." },
  { title: "Transparent Process", desc: "Clearly explain applicable rates, fees, eligibility and lender terms." },
  { title: "Secure & Confidential", desc: "Handle customer information responsibly and securely." },
];

export const whoWeHelp = [
  "Customers with multiple active loans",
  "Customers paying high interest",
  "Customers with credit-card outstanding",
  "Customers managing app/fintech loans",
  "Customers with high monthly EMI obligations",
  "Salaried professionals seeking personal loans",
  "Customers exploring loan balance transfer",
  "Customers looking for fresh loan options",
];

export const eligibility = [
  "Age (typically 21–58 years)",
  "Employment type (salaried preferred)",
  "Monthly income",
  "Credit profile / CIBIL",
  "Existing obligations",
  "Residence / location",
  "Employment history",
];

export const documents = [
  "PAN Card",
  "Aadhaar / KYC documents",
  "Latest salary slips (1–3 months)",
  "Bank statements (3–6 months)",
  "Existing loan statements",
  "Credit-card statements",
  "Employment details",
];

export const faqs = [
  { q: "What is debt consolidation?", a: "Debt consolidation is the process of combining eligible existing debts—such as personal loans, credit-card outstanding or app loans—into a single loan structure with one repayment, where eligible. It may make monthly management simpler; savings are not guaranteed and depend on lender terms." },
  { q: "Can I consolidate credit-card dues?", a: "In many cases, eligible credit-card outstanding can be considered for consolidation via a personal loan from a lending partner, subject to eligibility and lender policy." },
  { q: "Can app loans be consolidated?", a: "App/fintech loans may be considered along with other obligations if they meet lender eligibility. The final decision rests with the lender." },
  { q: "Can I reduce the interest rate on my existing loan?", a: "You may explore a balance transfer / refinance to potentially obtain better terms if you are paying a high rate. Whether a lower rate is available depends on your credit profile and the lender's assessment." },
  { q: "What interest rate can I get?", a: "Personal loans through our network are advertised starting from 9.95% p.a.* for eligible salaried applicants. Your actual rate depends on credit profile, income, employer, existing obligations, loan amount, tenure and lender policy. Not everyone will receive the lowest rate." },
  { q: "What is the minimum salary required?", a: "Minimum income varies by lender and city. A credit expert can check available options based on your income and employer category." },
  { q: "Will applying affect my CIBIL score?", a: "When a lender performs a hard enquiry, it may affect your score temporarily. We explain this before proceeding and only move forward with your consent." },
  { q: "How long does processing take?", a: "Timelines vary by lender and completeness of documentation. We assist to keep the process fast, but we do not promise a fixed disbursal time." },
  { q: "What documents are required?", a: "Typically PAN, Aadhaar/KYC, salary slips, bank statements and existing loan/CC statements. Exact requirements depend on the lender." },
  { q: "Do you charge a consultation fee?", a: "Speaking with a credit expert to understand your options is free. Any lender fees or charges will be clearly disclosed by the lender before you proceed." },
  { q: "Are you a bank or lender?", a: "No. Credit Expert India is a credit assistance facilitator that helps customers explore suitable options through its network of banking/lending partners. The lender makes the final decision on approval, rates and terms." },
  { q: "Which banks/NBFCs do you work with?", a: "We work with a network of banking and lending partners (affiliated with major private banks in India, once verified). Specific partner names are shown here only after verification of the partnership." },
  { q: "Is loan approval guaranteed?", a: "Loan approval is not guaranteed. The final decision, interest rate, fees and terms are determined by the respective lender based on its eligibility and credit policies." },
];

export const testimonialsPlaceholder = {
  enabled: false, // enable only with real, verifiable testimonials
  headline: "What Our Customers Say",
  note: "Real testimonials will appear here once verified. We never create fake reviews.",
};

export const trustBullets = ["Multiple lending options", "Expert assistance", "Fast processing", "Secure & confidential"];
