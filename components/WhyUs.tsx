export function WhyUs() {
  const items = [
    { t: "Human", d: "Speak with people who understand your situation." },
    { t: "Clear", d: "No unnecessary financial jargon." },
    { t: "Transparent", d: "Understand the applicable terms before moving forward." },
    { t: "Confidential", d: "Your financial information is handled responsibly." },
  ];
  return (
    <section id="about-us" className="bg-[#2E2E2E] text-white">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-extrabold">
          Financial guidance should feel simple.
        </h2>
        <div>
          {items.map((i, n) => (
            <div key={i.t} className={`px-5 md:px-7 py-7 ${n % 2 === 0 ? "bg-[#3A3A3A] border-l-4 border-[#FF5A00]" : "border-l-4 border-transparent"}`}>
              <h3 className="text-[32px] md:text-[40px] leading-none tracking-[-0.03em] font-extrabold text-[#FF5A00]">{i.t}</h3>
              <p className="mt-2 text-lg md:text-xl text-[#D4D4D4] leading-relaxed max-w-lg">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
