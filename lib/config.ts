// Centralised claims - keep configurable, never hardcode in components
export const claims = {
  personalLoanFrom: "9.95% p.a.*",
  personalLoanFromNote: "Personal loans starting from 9.95% p.a.* for eligible salaried applicants",
  balanceTransferNote: "Help customers reduce their interest burden, potentially to rates around 11% or lower where eligible.",
  disclaimerShort: "*Rates depend on credit profile, income, employer, existing obligations, loan amount, tenure and lender policy. For eligible applicants only.",
  disclaimerFull: "Your actual rate, EMI, savings and eligibility depend on your financial profile and the respective lender's criteria.",
  calculatorDisclaimer: "Illustrative / indicative only. This calculator output is not an approved offer.",
} as const;

export const contact = {
  phone: "+91-00000-00000", // TODO: replace with verified number
  whatsapp: "+91-00000-00000",
  email: "support@creditexpertindia.com",
  address: "Registered office — to be updated",
  legalName: "Credit Expert India",
} as const;

export const lendingPartners = {
  enabled: true,
  headline: "Affiliated Banking & Lending Partners",
  subheadline: "We work with premier private sector banks and RBI-registered NBFC networks across India to find optimal loan and consolidation solutions.",
  partners: [
    { id: "hdfc", name: "HDFC Bank", type: "Private Bank" },
    { id: "icici", name: "ICICI Bank", type: "Private Bank" },
    { id: "axis", name: "Axis Bank", type: "Private Bank" },
    { id: "kotak", name: "Kotak Mahindra Bank", type: "Private Bank" },
    { id: "indusind", name: "IndusInd Bank", type: "Private Bank" },
    { id: "idfc", name: "IDFC FIRST Bank", type: "Private Bank" },
  ],
} as const;

export const siteConfig = {
  name: "Credit Expert India",
  tagline: "Paying Too Much Interest on Your Loans? Let's Find a Better Way Forward.",
  url: "https://creditexpertindia.com",
};
