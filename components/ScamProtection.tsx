export function ScamProtection() {
  return (
    <section className="py-24 bg-white border-t border-hairline relative">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-medium tracking-[-0.5px] text-ink sm:text-4xl mb-4">
          Before you share your documents
        </h2>
        <p className="text-lg leading-[1.5] text-ink-mute font-light mb-12">
          Your final lender always makes the credit decision.
        </p>

        <div className="text-left space-y-4">
          <h3 className="text-xl font-semibold mb-6">We will never:</h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-red-500 font-bold">×</span>
              <span>Ask you to send money to a personal UPI</span>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 font-bold">×</span>
              <span>Guarantee loan approval</span>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 font-bold">×</span>
              <span>Guarantee a particular rate</span>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 font-bold">×</span>
              <span>Ask for unnecessary documents</span>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 font-bold">×</span>
              <span>Misrepresent ourselves as a bank</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
