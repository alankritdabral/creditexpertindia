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
              Credit & debt assistance for people looking for clearer financial options.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <ul role="list" className="space-y-4">
                  <li>
                    <Link href="/#solutions" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/#how-it-works" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/#about-us" className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute hover:text-primary transition-colors">
                      About
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
                    <span className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute">Phone</span>
                  </li>
                  <li>
                    <span className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute">Email</span>
                  </li>
                  <li>
                    <span className="text-[13px] leading-[1.4] tracking-[-0.39px] text-ink-mute">Address</span>
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
                      Disclaimer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-hairline pt-8 sm:mt-20 lg:mt-24">
          <p className="text-[11px] leading-[1.4] text-ink-mute-2 font-light max-w-4xl">
            Credit Expert India is not a lender. Loan approval, interest rates, fees and other terms are determined by the respective lender based on its policies and eligibility criteria.
          </p>
        </div>
      </div>
    </footer>
  );
}
