export function ScamProtection() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning-red/10 text-warning-red text-xs font-bold tracking-widest uppercase mb-6">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Trust & Safety
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-navy-electric">
          Before you share documents
        </h2>
      </div>

      <div className="bg-icy-blue rounded-2xl p-6 sm:p-8 border border-icy-blue/60 mt-auto flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-extrabold mb-6 text-warning-red flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          We will never
        </h3>
        
        <ul className="space-y-4 text-base text-brand-black font-semibold mb-8">
          <li className="flex items-start gap-3">
            <span className="text-warning-red font-bold text-lg leading-none mt-0.5">&times;</span>
            <span>Ask you to send money to a personal UPI</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-warning-red font-bold text-lg leading-none mt-0.5">&times;</span>
            <span>Guarantee loan approval</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-warning-red font-bold text-lg leading-none mt-0.5">&times;</span>
            <span>Guarantee a particular interest rate</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-warning-red font-bold text-lg leading-none mt-0.5">&times;</span>
            <span>Misrepresent ourselves as a bank</span>
          </li>
        </ul>
        
        <div className="pt-6 border-t border-icy-blue/60">
          <p className="text-base leading-relaxed text-brand-black font-bold">
            Your final lender always makes the credit decision.
          </p>
        </div>
      </div>
    </div>
  );
}
