export function ScamProtection() {
  return (
    <section className="py-24 sm:py-32 bg-warm-bg border-t border-gray-100">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Trust & Safety
        </div>
        
        <h2 className="text-3xl font-medium tracking-tight text-text-main sm:text-5xl mb-16">
          Before you share your documents
        </h2>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-left">
          <h3 className="text-xl font-semibold mb-8 text-warning-red flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            We will never
          </h3>
          
          <ul className="space-y-5 text-lg text-text-main font-medium mb-12">
            <li className="flex items-start gap-4">
              <span className="text-warning-red font-bold text-xl leading-none mt-0.5">&times;</span>
              <span>Ask you to send money to a personal UPI</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-warning-red font-bold text-xl leading-none mt-0.5">&times;</span>
              <span>Guarantee loan approval</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-warning-red font-bold text-xl leading-none mt-0.5">&times;</span>
              <span>Guarantee a particular interest rate</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-warning-red font-bold text-xl leading-none mt-0.5">&times;</span>
              <span>Misrepresent ourselves as a bank</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-warning-red font-bold text-xl leading-none mt-0.5">&times;</span>
              <span>Ask for unnecessary documents</span>
            </li>
          </ul>
          
          <div className="pt-8 border-t border-gray-100">
            <p className="text-xl leading-relaxed text-text-main font-semibold text-center">
              Your final lender always makes the credit decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
