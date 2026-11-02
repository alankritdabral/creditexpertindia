const nevers = [
  "Ask you to pay a personal UPI.",
  "Guarantee loan approval.",
  "Guarantee a particular interest rate.",
  "Pretend to be a bank.",
];

export function ScamProtection() {
  return (
    <section className="w-full bg-[#0A2540] text-white">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-[32px] sm:text-[48px] md:text-[56px] leading-[1.02] tracking-[-0.035em] font-bold max-w-4xl">
          Loan scams are everywhere. So here&apos;s what we will never do:
        </h2>

        <ul className="mt-10 md:mt-14">
          {nevers.map((n, i) => (
            <li
              key={n}
              className={`text-[32px] sm:text-[48px] lg:text-[72px] leading-[1.08] font-bold tracking-[-0.04em] line-through decoration-[3px] md:decoration-[6px] ${
                i % 2 === 0 ? "text-[#BFDBFE]" : "text-white"
              }`}
            >
              {n}
            </li>
          ))}
        </ul>

        <div className="mt-12 md:mt-16 max-w-xl bg-white text-[#0A2540] p-6 md:p-8 rounded-2xl card-elevated">
          <p className="text-lg md:text-xl leading-relaxed font-semibold">
            If anyone using our name asks you to pay to a personal UPI ID, stop and tell us.
          </p>
          <p className="mt-3 text-base md:text-lg leading-relaxed">
            Your final lender always makes the credit decision, not us.
          </p>
        </div>
      </div>
    </section>
  );
}
