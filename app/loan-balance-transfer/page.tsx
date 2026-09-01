import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Personal Loan Balance Transfer | Credit Expert India",
  description: "Transfer your high-interest personal loan to partner banks with lower interest rates. Calculate monthly EMI savings and apply for balance transfer.",
};

export default function BalanceTransferPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            BALANCE TRANSFER ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Transfer Your Active Personal Loan <br className="hidden sm:inline" />
            <span className="text-emerald-400">To a Lower Interest Rate</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            If you are paying 16%-24% interest on an existing loan, check if you qualify for a balance transfer to top private banks starting from 9.95% p.a.*
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-xs font-extrabold text-slate-950 uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              Check Balance Transfer Rate
            </a>
          </div>
        </div>
      </section>

      <LoanCalculator />
      <LeadForm />
    </main>
  );
}
