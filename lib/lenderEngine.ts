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
      min_salary: 30000,
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
    id: "abfl",
    name: "Aditya Birla Finance",
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
      "App Loan": "POLICY_CHECK",
      "Overdraft": "CONFIRMED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "piramal",
    name: "Piramal Finance",
    type: "NBFC",
    headlineRate: 11.99,
    maxTenure: 72,
    eligibility: {
      min_salary: 25000,
      eligible_employer_tiers: ["A+", "A", "B", "C", "Govt"],
      unknown_employer_policy: "CONFIRMED"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "NOT_SUPPORTED",
      "App Loan": "POLICY_CHECK",
      "Overdraft": "NOT_SUPPORTED",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  },
  {
    id: "kotak",
    name: "Kotak Bank",
    type: "Private Bank",
    headlineRate: 11.75,
    maxTenure: 84,
    eligibility: {
      min_salary: 150000,
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
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 175000,
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
  },
  {
    id: "tatacapital",
    name: "Tata Capital",
    type: "NBFC",
    headlineRate: 10.99,
    maxTenure: 84,
    eligibility: {
      min_salary: 20000,
      eligible_employer_tiers: ["A+", "A", "B", "C", "Govt"],
      unknown_employer_policy: "POLICY_CHECK"
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
    id: "indusind",
    name: "IndusInd Bank",
    type: "Private Bank",
    headlineRate: 10.49,
    maxTenure: 84, 
    eligibility: {
      min_salary: 25000,
      eligible_employer_tiers: ["A+", "A", "B", "C", "Govt"],
      unknown_employer_policy: "POLICY_CHECK"
    },
    takeover_policy: {
      "Personal Loan": "CONFIRMED",
      "Multiple PLs": "CONFIRMED",
      "Credit Card": "POLICY_CHECK",
      "App Loan": "CONFIRMED",
      "Overdraft": "POLICY_CHECK",
      "Top Up": "CONFIRMED"
    },
    credit_policy: { active_overdue: "POLICY_CHECK", recent_bounce: "POLICY_CHECK" }
  }
];

export function analyzeLenderEligibility({ profile, catBLoans, allLoans = [] }: { profile: any, catBLoans: any[], allLoans?: any[] }) {
  const { 
    netSalary, employer, employerTier: manualTier, hasBounce, hasLatePayment, hasActiveOverdue, wantsTopUp,
    rentalIncome, monthlyIncentive, quarterlyIncentive, halfYearlyIncentive, monthlyBonus, quarterlyBonus, yearlyBonus, lta,
    wfhStatus, hasEPFO, hasOMID, hasHRMS, has26AS, location, coApplicant, age, cibilMinus1, jobProfile,
    cibilScore, axisCustomerSegment, casaVintage, residenceType, cityTier
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
    
    if (lender.id === 'tatacapital' && isEligible) {
      const btAmount = catBLoans.reduce((sum: number, l: any) => sum + Number(l.currentOutstanding || 0), 0);
      if (btAmount > 0 && btAmount <= 500000) {
        isEligible = false;
        rejectionReasons.push(`BT loan amount financed must be > ₹5 Lakh`);
      }
    }

    if (lender.id === 'axis') {
      let axisNth = nth;
      // Bonus Add-Back 50%
      axisNth += ((Number(monthlyBonus) || 0) + (Number(quarterlyBonus) || 0)/3 + (Number(halfYearlyIncentive) || 0)/6 + (Number(yearlyBonus) || 0)/12) * 0.5;
      
      const seg = axisCustomerSegment || "NTB";
      let nmiReq = 75000;
      let cibilReq = 780;
      
      if (seg === "CSG") {
        nmiReq = 35000;
        if (axisNth >= 85000) cibilReq = 700;
        else cibilReq = 740;
      } else if (seg === "Non-CSG CASA") {
        nmiReq = 50000;
        cibilReq = 740;
        if (casaVintage !== 'yes') {
           isEligible = false;
           rejectionReasons.push(`Axis Bank requires 90+ days CASA vintage for Non-CSG CASA segment`);
        }
      } else if (seg === "NTB") {
        nmiReq = 75000;
        if (axisNth > 100000) cibilReq = 740;
        else cibilReq = 780;
      } else if (seg === "Blue Collar") {
        nmiReq = 200000;
        cibilReq = 0; 
      }
      
      if (axisNth < nmiReq) {
        isEligible = false;
        rejectionReasons.push(`Requires minimum salary of ₹${nmiReq} for ${seg} segment`);
      }
      if (cibilScore > 0 && cibilScore < cibilReq) {
        isEligible = false;
        rejectionReasons.push(`Requires minimum CIBIL of ${cibilReq} for ${seg} segment with NMI ₹${Math.floor(axisNth)}`);
      }
      
      const restrictedProfiles = ["Government School Teacher", "Class IV Employee", "Local Municipality Staff", "Defence & Army", "State Government Employee"];
      if (restrictedProfiles.some(p => jobProfile?.toLowerCase().includes(p.toLowerCase()))) {
        isEligible = false;
        rejectionReasons.push(`Profile is restricted by Axis Bank`);
      }
      
      if (isEligible) {
        // Calculate custom obligations
        let totalAxisEmi = 0;
        allLoans.forEach(l => {
          if (l.type === "Credit Card") {
             totalAxisEmi += Number(l.currentOutstanding || 0) * 0.04;
          } else if (l.type === "Gold Loan") {
             // 0 obligation
          } else {
             // Existing PL/HL < 6/12 EMIs should be 0, but we assume full since we can't reliably know remaining EMIs right now
             totalAxisEmi += Number(l.emi || 0);
          }
        });
        
        const maxEmi = axisNth * 0.70;
        customOutput.axisMaxEmiCapacity = Math.floor(maxEmi);
        customOutput.axisTotalObligations = Math.floor(totalAxisEmi);
        customOutput.axisUnusedCapacity = Math.max(0, Math.floor(maxEmi - totalAxisEmi));
        
        if (customOutput.axisUnusedCapacity > 0) {
           const ratePerMonth = 10.49 / 12 / 100; 
           const tenureMonths = 84;
           customOutput.axisMaxLoan = Math.floor(
             (customOutput.axisUnusedCapacity * (Math.pow(1 + ratePerMonth, tenureMonths) - 1)) /
             (ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths))
           );
        } else {
           customOutput.axisMaxLoan = 0;
        }
      }
    }

    if (lender.id === 'indusind' && isEligible) {
      if (plCount > 5) {
        isEligible = false;
        rejectionReasons.push(`Maximum 5 Personal Loans can be consolidated for IndusInd`);
      }
      
      const odLoans = catBLoans.filter((l: any) => l.type === 'Overdraft');
      if (odLoans.length > 0) {
        const hasInvalidOD = odLoans.some((l: any) => {
          const b = (l.bankName || "").toLowerCase();
          return !b.includes("kotak") && !b.includes("bajaj");
        });
        if (hasInvalidOD) {
           isEligible = false;
           rejectionReasons.push("OD Balance Transfer is only allowed for Kotak Bank or Bajaj");
        }
      }
      
      let allowedTenure = 60;
      if (nth >= 50000 && (age >= 25 || !age)) { 
         allowedTenure = 84;
      }
      lender.maxTenure = allowedTenure;

      let indusindFoir = 70;
      if (nth >= 80000 || employerTier === 'A' || employerTier === 'A+') {
         indusindFoir = 75;
      }
      customOutput.maxFOIR = `${indusindFoir}%`;
      
      let totalEmi = 0;
      allLoans.forEach(l => {
         totalEmi += Number(l.emi || 0);
      });
      const maxEmi = nth * (indusindFoir / 100);
      const unusedCap = Math.max(0, maxEmi - totalEmi);
      
      customOutput.indusindFOIR = indusindFoir;
      customOutput.indusindUnusedCapacity = Math.floor(unusedCap);
      
      if (unusedCap > 0) {
         const r = 10.49 / 12 / 100;
         customOutput.indusindMaxLoan = Math.floor(
           (unusedCap * (Math.pow(1 + r, allowedTenure) - 1)) / (r * Math.pow(1 + r, allowedTenure))
         );
      } else {
         customOutput.indusindMaxLoan = 0;
      }
    }

    if (lender.id === 'abfl' && isEligible) {
       if (employerTier === 'A' || employerTier === 'A+') {
           if (nth >= 250000) {
               customOutput.abflMaxLoan = 6500000;
           } else if (nth >= 175000) {
               customOutput.abflMaxLoan = 5000000;
           }
       }
    }
    
    if (lender.id === 'piramal' && isEligible) {
       if (cibilScore && cibilScore !== -1 && cibilScore !== 0 && cibilScore < 750) {
           isEligible = false;
           rejectionReasons.push("Piramal requires CIBIL 750+ (or -1/0)");
       }
       if (plCount > 3) {
           isEligible = false;
           rejectionReasons.push("Maximum 3 Personal Loans allowed for BT");
       }
    }
    
    if (lender.id === 'ltfinance' && isEligible) {
       if (cibilScore && cibilScore < 775) {
           isEligible = false;
           rejectionReasons.push("L&T Finance requires minimum CIBIL 775");
       }
       if (cityTier !== "Metro") {
           isEligible = false;
           rejectionReasons.push("L&T Finance is only applicable in Metro cities");
       }
       if (residenceType !== "Owned") {
           isEligible = false;
           rejectionReasons.push("L&T Finance requires owned residential property");
       }
    }
    
    if (lender.id === 'kotak' && isEligible) {
       const kotakNth = nth - (yearlyBonus ? yearlyBonus / 12 : 0);
       
       if (kotakNth < 150000) {
           isEligible = false;
           rejectionReasons.push("Kotak OD requires minimum ₹1.5L NTH (excluding variable pay)");
       } else if (kotakNth >= 150000 && kotakNth < 200000) {
           const hl = allLoans.find((l: any) => l.type === 'Home Loan' && Number(l.currentOutstanding || 0) > 1000000);
           if (!hl) {
               isEligible = false;
               rejectionReasons.push("Kotak OD segment 1 (1.5L-2L NTH) requires active Home Loan > ₹10 Lakhs");
           }
       }
       customOutput.kotakEffectiveNTH = Math.floor(kotakNth);
    }
    
    if (lender.id === 'poonawalla' && isEligible) {
        if (cibilScore && cibilScore < 700) {
           isEligible = false;
           rejectionReasons.push("Poonawalla requires CIBIL 700+");
        }
        
        const ccCount = catBLoans.filter((l: any) => l.type === 'Credit Card').length;
        const appCount = catBLoans.filter((l: any) => l.type === 'App Loan').length;
        const plOdCount = catBLoans.filter((l: any) => l.type === 'Personal Loan' || l.type === 'Overdraft').length;
        
        if (catBLoans.length > 8) {
           isEligible = false;
           rejectionReasons.push("Poonawalla allows maximum 8 BTs total");
        }
        if (appCount > 3) {
           isEligible = false;
           rejectionReasons.push("Poonawalla allows maximum 3 App Loan BTs");
        }
        if (plOdCount > 5) {
           isEligible = false;
           rejectionReasons.push("Poonawalla allows maximum 5 PL/OD BTs");
        }
        if (ccCount > 6) {
           isEligible = false;
           rejectionReasons.push("Poonawalla allows maximum 6 Credit Card BTs");
        }
        
        let poonawallaFoir = 80;
        customOutput.maxFOIR = `${poonawallaFoir}%`;
        
        let totalEmi = 0;
        allLoans.forEach(l => {
           totalEmi += Number(l.emi || 0);
        });
        const maxEmi = nth * (poonawallaFoir / 100);
        const unusedCap = Math.max(0, maxEmi - totalEmi);
        
        customOutput.poonawallaFOIR = poonawallaFoir;
        customOutput.poonawallaUnusedCapacity = Math.floor(unusedCap);
        
        if (unusedCap > 0) {
           const r = 12.00 / 12 / 100;
           customOutput.poonawallaMaxLoan = Math.floor(
             (unusedCap * (Math.pow(1 + r, lender.maxTenure) - 1)) / (r * Math.pow(1 + r, lender.maxTenure))
           );
        } else {
           customOutput.poonawallaMaxLoan = 0;
        }
        
        if (isEligible) {
           rejectionReasons.push("Note: Poonawalla requires applicant to be within 80km of municipal office");
           if (matchScore >= 80) matchScore = 79; // Make it conditional due to geo limit
        }
    }

    if (lender.id === 'chola' && isEligible) {
        if (cibilScore && cibilScore < 700) {
           isEligible = false;
           rejectionReasons.push("Chola requires CIBIL 700+");
        }
        
        if (catBLoans.length > 6) {
           isEligible = false;
           rejectionReasons.push("Chola allows maximum 6 BT tracks across PL/OD/CC");
        }
        
        let addBack = 0;
        addBack += (Number(monthlyIncentive) || 0) + (Number(quarterlyIncentive) || 0)/3 + (Number(rentalIncome) || 0);
        const maxAddBack = nth * 0.60;
        const effectiveAddBack = Math.min(addBack, maxAddBack);
        const cholaEffectiveNTH = nth + effectiveAddBack;
        
        customOutput.cholaEffectiveNTH = Math.floor(cholaEffectiveNTH);
        
        if (employerTier === 'A' || employerTier === 'A+' || employerTier === 'B') {
           if (cholaEffectiveNTH >= 125000) {
               customOutput.cholaMaxLoan = 3000000;
           } else {
               customOutput.cholaMaxLoan = 1000000; 
           }
        } else if (employerTier === 'Govt') {
           if (cholaEffectiveNTH >= 100000) {
               customOutput.cholaMaxLoan = 3000000;
           } else {
               customOutput.cholaMaxLoan = 1000000;
           }
        } else {
           customOutput.cholaMaxLoan = 1000000;
        }
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

