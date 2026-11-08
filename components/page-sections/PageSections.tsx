import {
  Users, ShieldCheck, Lock, MapPin, Clock, FileText, Scale, CheckCircle2, Percent,
  CalendarCheck, TrendingUp, Wallet, Quote, type LucideIcon,
} from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrackedAccordion } from "@/components/analytics/TrackedAccordion";
import { pageContent, stats, testimonials, type PageKey } from "@/lib/pageContent";

const icons: Record<string, LucideIcon> = {
  users: Users, shield: ShieldCheck, lock: Lock, map: MapPin, clock: Clock, file: FileText,
  scale: Scale, check: CheckCircle2, percent: Percent, calendar: CalendarCheck, trending: TrendingUp, wallet: Wallet,
};

export function TrustStrip() {
  return (
    <section className="bg-[#0A2540] text-white">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[40px] md:text-[56px] leading-none tracking-[-0.04em] font-bold text-white">{s.value}</p>
            <p className="mt-3 text-sm md:text-base text-[#BFDBFE] max-w-[220px] leading-snug">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BenefitCards({ page }: { page: PageKey }) {
  const { heading, intro, benefits } = pageContent[page];
  return (
    <section className="bg-[#EAF3FF] text-[#0A2540]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">{heading}</h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#3C4F69]">{intro}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b) => {
            const Icon = icons[b.icon] ?? CheckCircle2;
            return (
              <div key={b.title} className="rounded-2xl bg-white p-6 shadow-sm border border-[#0052CC]/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0052CC] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{b.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#3C4F69]">{b.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white text-[#0A2540]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold max-w-2xl">
          What people say.
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <figure key={t.quote} className="rounded-2xl bg-[#EAF3FF] p-7 flex flex-col">
              <Quote className="h-8 w-8 text-[#0052CC]" />
              <blockquote className="mt-4 text-lg leading-relaxed flex-1">{t.quote}</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-[#3C4F69]">{t.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageFAQ({ page }: { page: PageKey }) {
  const { faqs } = pageContent[page];
  return (
    <section className="bg-white text-[#0A2540]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16">
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold lg:sticky lg:top-28 self-start">
          Common questions.
        </h2>
        <TrackedAccordion faqSet={`page:${page}`} type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem value={`f-${i}`} key={f.q} className="border-b-0 mb-2 px-4 md:px-6 data-[state=open]:bg-[#e6eefb] transition-colors">
              <AccordionTrigger className="hover:no-underline text-left gap-6 py-5">
                <span className="text-xl md:text-2xl leading-snug font-semibold tracking-[-0.015em]">{f.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8">
                <p className="text-base md:text-lg leading-relaxed max-w-xl">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </TrackedAccordion>
      </div>
    </section>
  );
}

/** Stats strip + benefit cards, placed right after the hero. */
export function PageIntro({ page }: { page: PageKey }) {
  return (
    <>
      <TrustStrip />
      <BenefitCards page={page} />
    </>
  );
}

/** Testimonials + FAQ, placed before the closing lead form. */
export function PageProof({ page }: { page: PageKey }) {
  return (
    <>
      <Testimonials />
      <PageFAQ page={page} />
    </>
  );
}
