import Link from 'next/link';
import { siteConfig, contact } from '@/lib/config';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-[17px] font-bold tracking-tight text-slate-900">
              {siteConfig.name}
            </span>
            <p className="text-[15px] leading-relaxed text-slate-500 font-medium">
              We're not a bank. We're your credit-side guide to help you find clearer financial options.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-[15px] font-bold leading-6 text-slate-900 mb-6">Services</h3>
                <ul role="list" className="space-y-4">
                  <li>
                    <Link href="/debt-consolidation" className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-medium">
                      Debt Consolidation
                    </Link>
                  </li>
                  <li>
                    <Link href="/personal-loan" className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-medium">
                      Personal Loans
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-medium">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-[15px] font-bold leading-6 text-slate-900 mb-6">Contact</h3>
                <ul role="list" className="space-y-4">
                  <li>
                    <span className="text-[15px] text-slate-600 font-medium">Phone: {contact.phone}</span>
                  </li>
                  <li>
                    <span className="text-[15px] text-slate-600 font-medium">Email: {contact.email}</span>
                  </li>
                  <li>
                    <span className="text-[15px] text-slate-600 font-medium">Address: {contact.address}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-[15px] font-bold leading-6 text-slate-900 mb-6">Legal</h3>
                <ul role="list" className="space-y-4">
                  <li>
                    <Link href="/privacy-policy" className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-medium">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions" className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-medium">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/partner-disclosures" className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-medium">
                      Partner Disclosures
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-slate-200 pt-8 sm:mt-20 lg:mt-24 space-y-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-2">
            <p className="text-[13px] leading-relaxed text-slate-500 font-medium max-w-4xl">
              {contact.legalName}. Credit Expert India is a loan facilitator and not a bank or NBFC. 
            </p>
            <p className="text-[13px] leading-relaxed text-slate-500 font-medium max-w-4xl">
              Final loan approval, interest rate and loan terms are determined by the respective lender based on its policies and eligibility criteria. We do not guarantee loan approval or specific rates.
            </p>
          </div>
          <p className="text-[13px] font-medium text-slate-500 mt-4 md:mt-0">© {new Date().getFullYear()} {siteConfig.name}.</p>
        </div>
      </div>
    </footer>
  );
}
