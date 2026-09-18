export function TheProblem() {
  const problems = [
    {
      title: "Credit Card Debt",
      desc: "High outstanding balances can become expensive when carried month to month.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
      )
    },
    {
      title: "App Loans",
      desc: "Short-term loans and multiple repayment schedules can create pressure.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      )
    },
    {
      title: "High-Interest Personal Loan",
      desc: "You may be paying significantly more interest than expected.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      )
    },
    {
      title: "Too Many EMIs",
      desc: "Different lenders, due dates, rates and repayment schedules make repayment harder to manage.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
      )
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white relative z-0 overflow-hidden">
      {/* Slanted top cut to mimic Stripe */}
      <div className="absolute inset-0 bg-white -z-10" style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 100%)' }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column: Text & Features */}
          <div className="max-w-xl">
            <div className="text-[13px] font-bold tracking-wider text-blue-energy uppercase mb-4">The Challenge</div>
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tighter text-brand-black mb-6 leading-[1.1]">
              What's eating your salary?
            </h2>
            <p className="text-[17px] text-brand-black/80 font-medium mb-10 leading-relaxed">
              Managing debt across multiple platforms can be overwhelming. We identify the common traps that keep you paying more than you should.
            </p>
            
            <div className="space-y-8">
              {problems.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-black border border-icy-blue shadow-sm">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-brand-black mb-1">{p.title}</h3>
                    <p className="text-[15px] text-brand-black/80 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Abstract Mockup */}
          <div className="relative w-full aspect-[4/3] lg:aspect-square bg-slate-50 rounded-2xl border border-icy-blue shadow-sm overflow-hidden flex items-center justify-center">
            {/* Diagonal background slice */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-red-50/50 transform -skew-y-12 scale-150 origin-top-left" />
            
            <div className="relative z-10 w-full max-w-sm flex flex-col gap-4 p-6">
              
              <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 flex items-center justify-between transform -rotate-2">
                <div className="flex flex-col gap-1">
                  <div className="w-20 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-12 h-2 bg-slate-100 rounded-full"></div>
                </div>
                <div className="text-warning-red font-bold">-₹14,500</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 flex items-center justify-between transform translate-x-4">
                <div className="flex flex-col gap-1">
                  <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-24 h-2 bg-slate-100 rounded-full"></div>
                </div>
                <div className="text-warning-red font-bold">-₹8,500</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-lg border border-red-100 flex items-center justify-between transform rotate-2">
                <div className="flex flex-col gap-1">
                  <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                </div>
                <div className="text-warning-red font-bold">-₹6,000</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-[0_0_40px_-10px_rgba(231,71,71,0.3)] border-2 border-warning-red/20 flex items-center justify-between mt-4">
                <div className="text-brand-black font-bold">Total Monthly Outflow</div>
                <div className="text-warning-red font-bold text-xl">₹38,500</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
