import { EMPLOYER_CATEGORIES } from './employers';

// Map employer name to tier
export function getEmployerTier(employerName: string) {
  if (!employerName) return 'Unknown';
  if (EMPLOYER_CATEGORIES["A+"]?.includes(employerName)) return 'A+';
  if (EMPLOYER_CATEGORIES["A"]?.includes(employerName)) return 'A';
  if (EMPLOYER_CATEGORIES["B"]?.includes(employerName)) return 'B';
  if (EMPLOYER_CATEGORIES["C"]?.includes(employerName)) return 'C';
  return 'Unknown';
}

const LENDERS = [
  // Group 1: App Loans + Credit Cards + OD + Multiple PL
  {
    id: "axisfinance",
    name: "Axis Finance",
    type: "NBFC",
    headlineRate: 12.00,
    maxTenure: 84,
    eligibility: {
      min_salary: 20000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "CONFIRMED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "poonawalla",
    name: "Poonawalla Fincorp",
    type: "NBFC",
    headlineRate: 12.00,
    maxTenure: 84,
    eligibility: {
      min_salary: 20000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "CONFIRMED",
      "Overdraft": "CONFIRMED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "fullerton",
    name: "Fullerton",
    type: "NBFC",
    headlineRate: 13.00,
    maxTenure: 84,
    eligibility: {
      min_salary: 20000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "CONFIRMED",
      "Overdraft": "CONFIRMED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },

  // Group 2: PL + Credit Card
  {
    id: "axis",
    name: "Axis Bank",
    type: "Private Bank",
    headlineRate: 9.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 25000,
      eligible_employer_tiers: ["A+", "A", "B"],
      unknown_employer_policy: "POLICY_CHECK"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "NOT_SUPPORTED", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "chola",
    name: "Chola",
    type: "NBFC",
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 15000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "tata",
    name: "Tata Capital",
    type: "NBFC",
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 20000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "abfl",
    name: "Aditya Birla Finance",
    type: "NBFC",
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 15000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "piramal",
    name: "Piramal Finance",
    type: "NBFC",
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 15000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "CONFIRMED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },

  // Group 3: OD + PL
  {
    id: "kotak",
    name: "Kotak Bank",
    type: "Private Bank",
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 25000,
      eligible_employer_tiers: ["A+", "A", "B"],
      unknown_employer_policy: "POLICY_CHECK"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "NOT_SUPPORTED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "CONFIRMED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "indusind",
    name: "IndusInd Bank",
    type: "Private Bank",
    headlineRate: 10.49,
    maxTenure: 84,
    eligibility: {
      min_salary: 25000,
      eligible_employer_tiers: ["A+", "A", "B"],
      unknown_employer_policy: "POLICY_CHECK"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "NOT_SUPPORTED",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "CONFIRMED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "ltfinance",
    name: "L&T Finance",
    type: "NBFC",
    headlineRate: 9.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 20000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "NOT_SUPPORTED",
      "App Loan": "CONFIRMED",
      "Overdraft": "CONFIRMED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "icici",
    name: "ICICI Bank",
    type: "Private Bank",
    headlineRate: 9.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 25000,
      eligible_employer_tiers: ["A+", "A", "B", "C"],
      unknown_employer_policy: "POLICY_CHECK"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "POLICY_CHECK",
      "App Loan": "NOT_SUPPORTED",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  }
];

export function analyzeLenderEligibility({ profile, catBLoans }: { profile: any, catBLoans: any[] }) {
  const { 
    netSalary, employer, employerTier: manualTier, hasBounce, hasLatePayment, hasActiveOverdue, wantsTopUp,
    rentalIncome, monthlyIncentive, quarterlyIncentive, halfYearlyIncentive, monthlyBonus, quarterlyBonus, yearlyBonus, lta,
    wfhStatus, hasEPFO, hasOMID, hasHRMS, has26AS, location, coApplicant, age, cibilMinus1, jobProfile 
  } = profile || {};
  
  const employerTier = manualTier || getEmployerTier(employer);

  // Characterize the liabilities
  const plCount = catBLoans.filter((l: any) => l.type === 'Personal Loan').length;
  const hasCC = catBLoans.some((l: any) => l.type === 'Credit Card');
  const appLoans = catBLoans.filter((l: any) => l.type === 'App Loan');
  const hasApp = appLoans.length > 0;
  const hasOD = catBLoans.some((l: any) => l.type === 'Overdraft');

  const requiresMultiPL = plCount > 1;
  const requiresCC = hasCC;
  const requiresApp = hasApp;
  const requiresOD = hasOD;
  
  const eligibleLenders = [];
  const ineligibleLenders = [];

  for (const lender of LENDERS) {
    const eligibility = lender.eligibility;
    const takeover = lender.takeover_policy;
    const creditPolicy = lender.credit_policy;

    let isEligible = true;
    let matchScore = 100; // Base score out of 100
    const rejectionReasons = [];
    const customOutput: any = {};
    
    // Bank specific NTH calculation
    let nth = Number(netSalary) || 0;
    if (lender.id === 'abfl') {
      nth += (Number(rentalIncome) || 0) * 0.5;
      nth += (Number(monthlyIncentive) || 0) + (Number(quarterlyIncentive) || 0)/3 + (Number(halfYearlyIncentive) || 0)/6;
      nth += (Number(monthlyBonus) || 0) + (Number(quarterlyBonus) || 0)/3 + (Number(yearlyBonus) || 0)/12;
      nth += (Number(lta) || 0)/12;
    }

    // 1. Hard knockouts
    if (nth < eligibility.min_salary) {
      isEligible = false;
      rejectionReasons.push(`Requires minimum salary of ₹${eligibility.min_salary}`);
    }
    
    // Bank specific profile restrictions
    if (lender.id === 'chola') {
      const restrictedProfiles = ['Manpower', 'Law', 'Collection', 'Police', 'Court', 'Belt Job'];
      if (restrictedProfiles.includes(jobProfile)) {
        isEligible = false;
        rejectionReasons.push(`Profile ${jobProfile} is restricted`);
      }
      if (location === 'Delhi NCR' && (profile.cibilScore && profile.cibilScore < 700)) {
        isEligible = false;
        rejectionReasons.push(`Delhi NCR requires minimum CIBIL of 700`);
      }
    }

    // Credit Policy Check
    if (hasActiveOverdue === 'yes') {
      if (creditPolicy.active_overdue === 'NOT_SUPPORTED' || creditPolicy.active_overdue === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not accept active overdue accounts`);
      }
    }
    
    if (hasBounce === 'yes' || hasLatePayment === 'yes') {
      if (creditPolicy.recent_bounce === 'NOT_SUPPORTED' || creditPolicy.recent_bounce === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not accept recent EMI bounces`);
      }
    }

    // Employer Policy
    if (!eligibility.eligible_employer_tiers.includes(employerTier)) {
       if (eligibility.unknown_employer_policy === 'NOT_SUPPORTED' || eligibility.unknown_employer_policy === 'POLICY_CHECK') {
           isEligible = false;
           rejectionReasons.push(`Does not support your employer category (${employerTier})`);
       } else {
           matchScore -= 10;
       }
    } else {
       if (employerTier === 'A+' || employerTier === 'A') matchScore += 5;
    }

    // Takeover Policy Compatibility
    const liabilityFit = 25;
    if (plCount === 1 && !requiresMultiPL && !requiresCC && !requiresApp && !requiresOD) {
      if (takeover["Personal Loan"] === 'NOT_SUPPORTED' || takeover["Personal Loan"] === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not take over single Personal Loans`);
      }
    }
    if (requiresMultiPL) {
      if (takeover["Multiple PLs"] === 'NOT_SUPPORTED' || takeover["Multiple PLs"] === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not consolidate multiple Personal Loans`);
      }
    }
    if (requiresCC) {
      if (takeover["Credit Card"] === 'NOT_SUPPORTED' || takeover["Credit Card"] === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not take over Credit Card debt`);
      }
    }
    if (requiresApp) {
      if (lender.id === 'ltfinance') {
        // App loan specifics for LT Finance
        const invalidAppLoans = appLoans.filter(l => (l.activeEMIs || 0) < 6 || (l.currentExposure || 0) < 200000);
        if (invalidAppLoans.length > 0) {
           isEligible = false;
           rejectionReasons.push(`L&T Finance requires App Loans to have >= 6 active EMIs and >= 2 Lakh exposure`);
        }
      } else {
        if (takeover["App Loan"] === 'NOT_SUPPORTED' || takeover["App Loan"] === 'POLICY_CHECK') {
          isEligible = false;
          rejectionReasons.push(`Does not take over Digital/App Loans`);
        }
      }
    }
    if (requiresOD) {
      if (takeover["Overdraft"] === 'NOT_SUPPORTED' || takeover["Overdraft"] === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not take over Overdrafts`);
      }
    }
    if (wantsTopUp === 'yes') {
      if (takeover["Top Up"] === 'NOT_SUPPORTED' || takeover["Top Up"] === 'POLICY_CHECK') {
        isEligible = false;
        rejectionReasons.push(`Does not offer Top Up on transfers`);
      }
    }

    matchScore = matchScore - 25 + liabilityFit; 
    
    // We removed CIBIL score checks, so we just use a default credit fit or remove it.
    matchScore = matchScore - 20 + 20;

    // Additional output logic for specific banks
    if (lender.id === 'abfl' && isEligible) {
      let maxLoan = 5000000;
      if (nth >= 250000 && employerTier === 'A') maxLoan = 6500000;
      else if (nth >= 175000 && employerTier === 'A') maxLoan = 5000000;
      customOutput.maxLoanAmount = maxLoan;
      customOutput.maxFOIR = "75%";
      if (hasEPFO || hasOMID || hasHRMS || has26AS) {
        customOutput.fiWaiver = true;
      }
    }
    
    if (lender.id === 'chola' && isEligible) {
      if ((employerTier === 'Govt' && nth >= 100000) || (['A+', 'A', 'B'].includes(employerTier) && nth >= 150000)) {
        customOutput.flexiOdEligible = true;
        customOutput.flexiOdStructure = "2 years Flexi + 5 years Drop-line";
      }
      if (cibilMinus1) {
        if (employerTier === 'Govt') customOutput.cibilMinus1MaxLoan = 2000000;
        else if (['A+', 'A', 'B'].includes(employerTier) && coApplicant && age <= 30) customOutput.cibilMinus1MaxLoan = 1000000;
        else {
           isEligible = false; // Rejected for CIBIL -1 without meeting criteria
           rejectionReasons.push(`Does not meet CIBIL -1 criteria for Chola`);
        }
      }
    }
    
    if (lender.id === 'ltfinance' && isEligible) {
      lender.maxTenure = 72;
      customOutput.maxFOIR = "75%+";
      customOutput.fiWaiverThreshold = 750000;
      if (cibilMinus1) customOutput.cibilMinus1MaxLoan = 1000000;
    }

    if (isEligible) {
      eligibleLenders.push({
        ...lender,
        ...customOutput,
        matchConfidence: matchScore,
        outcome: matchScore >= 80 ? 'ELIGIBLE' : 'CONDITIONALLY_ELIGIBLE'
      });
    } else {
      ineligibleLenders.push({
        ...lender,
        reasons: rejectionReasons
      });
    }
  }

  eligibleLenders.sort((a, b) => {
    if (b.matchConfidence !== a.matchConfidence) {
      return b.matchConfidence - a.matchConfidence;
    }
    return a.headlineRate - b.headlineRate;
  });

  return { eligibleLenders, ineligibleLenders };
}

