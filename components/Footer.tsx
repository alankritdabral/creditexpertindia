import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-[13px] font-bold tracking-[0.1px] text-ink uppercase">
              CREDIT EXPERT INDIA
            </span>
            <p className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute font-normal">
              We're not a bank. We're your credit-side guide to help you find clearer financial options.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <ul role="list" className="space-y-4">
                  <li>
                    <Link href="/#debt-health-check" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      Debt X-Ray
                    </Link>
                  </li>
                  <li>
                    <Link href="/#solutions" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/#faq" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-[13px] font-semibold leading-[1.4] text-ink">Contact</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <span className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute">Phone: [Real Phone Number]</span>
                  </li>
                  <li>
                    <span className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute">Email: [Real Email Address]</span>
                  </li>
                  <li>
                    <span className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute">Address: [Real Business Address]</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <ul role="list" className="space-y-4">
                  <li>
                    <a href="#" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      Partner Disclosures
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-hairline pt-8 sm:mt-20 lg:mt-24 space-y-4">
          <p className="text-[11px] leading-[1.4] text-ink-mute-2 font-light max-w-4xl">
            [Legal Company Name]. Credit Expert India is a loan facilitator and not a bank or NBFC. 
          </p>
          <p className="text-[11px] leading-[1.4] text-ink-mute-2 font-light max-w-4xl">
            Final loan approval, interest rate and loan terms are determined by the respective lender based on its policies and eligibility criteria. We do not guarantee loan approval or specific rates.
          </p>
        </div>
      </div>
    </footer>
  );
}
