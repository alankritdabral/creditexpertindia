const steps = [
  {
    title: "You tell us where you stand.",
    desc: "Your loans, your EMIs, your salary. A rough idea is fine. You don't need every document ready.",
  },
  {
    title: "We go through it properly.",
    desc: "We look at what you're paying now, at what rate, and what lenders could realistically offer you.",
  },
  {
    title: "We explain it like a friend would.",
    desc: "In plain rupees: what you pay now, what you could pay instead, and whether it's worth the switch.",
  },
  {
    title: "Then it's your call.",
    desc: "Apply, wait, or walk away. Nothing is pushed on you, and the final decision is always yours.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-white text-[#0A2540]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 className="text-[48px] sm:text-[56px] lg:text-[68px] leading-[1.0] tracking-[-0.04em] font-bold">
            What happens after you reach out.
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#3C4F69] max-w-md">
            Four simple steps. You can stop at any of them, no questions asked.
          </p>
        </div>

        <ol>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`grid grid-cols-[72px_1fr] md:grid-cols-[120px_1fr] items-center gap-2 py-8 md:py-10 px-4 md:px-6 -mx-4 md:-mx-6 ${
                i % 2 === 1 ? "bg-[#EAF3FF]" : ""
              }`}
            >
              <span className="text-[56px] md:text-[96px] leading-none font-bold tracking-[-0.05em] text-[#2d6af0]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-2xl md:text-[32px] leading-tight font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-base md:text-lg leading-relaxed text-[#3C4F69] max-w-lg">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
