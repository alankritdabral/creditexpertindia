export function TheProblem() {
  return (
    <section className="py-24 sm:py-32 bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-medium tracking-[-1px] text-ink sm:text-5xl">
            What's eating your salary?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-ink">Credit Card Debt</h3>
            <p className="text-ink-mute leading-[1.5] font-light">
              High outstanding balances can become expensive when carried month to month.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-ink">App Loans</h3>
            <p className="text-ink-mute leading-[1.5] font-light">
              Short-term loans and multiple repayment schedules can create pressure.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-ink">High-Interest Personal Loan</h3>
            <p className="text-ink-mute leading-[1.5] font-light">
              You may be paying significantly more interest than expected.
            </p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white p-8 rounded-2xl border border-hairline shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-ink">Too Many EMIs</h3>
            <p className="text-ink-mute leading-[1.5] font-light">
              Different lenders, due dates, rates and repayment schedules make repayment harder to manage.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-2xl text-center mt-20">
          <h2 className="text-3xl font-medium tracking-[-1px] text-ink sm:text-4xl">
            We help you find a simpler path.
          </h2>
        </div>
      </div>
    </section>
  );
}
