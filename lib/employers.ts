/**
 * Employer Categories — Fallback / Legacy Module
 * 
 * This file is kept for backward compatibility. The primary employer lookup
 * is now handled by lib/employerLookup.ts which uses bank-specific data
 * from the Excel employer listings.
 * 
 * The EMPLOYER_CATEGORIES below serve as a FALLBACK only when the
 * employerLookup module's data hasn't loaded yet.
 */

export const EMPLOYER_CATEGORIES: Record<string, string[]> = {
  "A+": [
    "TCS", "Infosys", "HCLTech", "Wipro", "Accenture",
    "IBM India", "Microsoft India", "Google India", "Amazon India",
    "Reliance Industries", "Tata Consultancy Services", "Larsen & Toubro",
    "ONGC", "Indian Oil Corporation", "Bharat Petroleum", "NTPC",
    "State Bank of India", "LIC", "ISRO", "DRDO", "RBI",
    "Indian Army", "Indian Navy", "Indian Air Force",
    "Central/State Government", "Defence", "Railways",
  ],
  "A": [
    "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
    "IndusInd Bank", "Bajaj Finance", "Sun Pharma", "Cipla",
    "Hindustan Unilever", "ITC", "Bharti Airtel", "Maruti Suzuki",
    "Asian Paints", "Cognizant India", "Capgemini India",
    "Oracle India", "SAP India", "Cisco India", "Adobe India",
  ],
  "B": [
    "Mid-size companies", "Regional manufacturers",
  ],
  "C": [
    "Small / local companies",
  ],
  "Other": [
    "Other / My company isn't listed",
  ],
};

/**
 * Flattened list for backward compatibility.
 * Prefer using searchEmployers() from employerLookup.ts instead.
 */
export const EMPLOYERS = Array.from(
  new Set([
    ...EMPLOYER_CATEGORIES["A+"],
    ...EMPLOYER_CATEGORIES["A"],
    ...EMPLOYER_CATEGORIES["B"],
    ...EMPLOYER_CATEGORIES["C"],
    ...EMPLOYER_CATEGORIES["Other"],
  ])
);
