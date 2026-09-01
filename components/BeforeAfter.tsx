export function BeforeAfter() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-medium tracking-tight text-text-main sm:text-5xl">
            See the difference.
          </h2>
        </div>

        <div className="mx-auto max-w-5xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* BEFORE */}
            <div className="bg-[#FFF5F3] p-8 sm:p-12 rounded-3xl relative">
              <h3 className="text-sm font-bold tracking-wider text-warning-red uppercase mb-8">BEFORE</h3>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center">
                  <span className="text-text-muted font-medium">Personal Loan</span>
                  <span className="text-xl font-bold text-text-main">₹14,500</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center">
                  <span className="text-text-muted font-medium">Credit Card</span>
                  <span className="text-xl font-bold text-text-main">₹8,500</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center">
                  <span className="text-text-muted font-medium">App Loan</span>
                  <span className="text-xl font-bold text-text-main">₹6,000</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center">
                  <span className="text-text-muted font-medium">Personal Loan</span>
                  <span className="text-xl font-bold text-text-main">₹9,500</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-red-200">
                <div className="flex justify-between items-end text-warning-red">
                  <span className="font-semibold text-lg">Total Outflow</span>
                  <span className="text-4xl font-bold tracking-tight">₹38,500</span>
                </div>
                <p className="text-right text-sm font-medium mt-1 text-warning-red/80">Multiple due dates & rates</p>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-soft-green p-8 sm:p-12 rounded-3xl relative flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-savings-green uppercase mb-8">AFTER REVIEW</h3>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 mb-8">
                  <p className="text-lg font-medium text-text-muted mb-2">ONE CLEAR PLAN</p>
                  <p className="text-5xl font-bold tracking-tight text-text-main">₹27,800 <span className="text-xl text-text-muted font-medium">/ month</span></p>
                  
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center text-text-main font-medium">
                      <svg className="w-5 h-5 text-savings-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      One lender
                    </div>
                    <div className="flex items-center text-text-main font-medium">
                      <svg className="w-5 h-5 text-savings-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      One due date
                    </div>
                    <div className="flex items-center text-text-main font-medium">
                      <svg className="w-5 h-5 text-savings-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Clear repayment structure
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-green-200">
                <div className="flex flex-col text-savings-green">
                  <span className="text-5xl font-bold tracking-tight mb-2">↓ ₹10,700</span>
                  <span className="font-semibold text-lg">Potential monthly difference*</span>
                </div>
              </div>
            </div>
            
          </div>
          
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-sm text-text-muted font-medium leading-relaxed">
              *Estimates are illustrative. Actual rates, eligibility and approval depend on the respective lender and borrower profile. Restructuring debt may lead to paying more interest over the life of the loan depending on the term.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
