import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  body: string;
  cta: string;
  image: string;
  points?: string[];
  href?: string;
};

export function ProductHero({ title, body, cta, image, points = [], href = "#lead-form" }: Props) {
  return (
    <>
    <div className="h-[84px] bg-white" aria-hidden="true" />
    <section className="w-full grid grid-cols-1 lg:grid-cols-[6fr_5fr] bg-[#0052CC] text-white">
      <div className="px-4 md:px-10 lg:pl-[max(2rem,calc((100vw-1220px)/2+2rem))] lg:pr-14 pt-14 pb-14 lg:pt-24 lg:pb-24">
        <h1 className="hero-title text-[clamp(36px,10vw,44px)] sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.04em] font-medium max-w-2xl">
          {title}
        </h1>
        <p className="hero-description mt-6 text-base sm:text-lg lg:text-xl leading-[1.5] text-[#BFDBFE] max-w-xl">{body}</p>
        <a
          href={href}
          data-analytics-cta={`hero_${cta.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`}
          data-analytics-location="product_hero"
          className="mt-9 inline-flex items-center gap-2 rounded bg-white text-[#0052CC] font-semibold text-base px-[22px] h-[48px] hover:bg-[#0A2540] hover:text-white transition-colors"
        >
          {cta} <ArrowRight className="w-5 h-5" />
        </a>
        <ul className="mt-10 space-y-2 text-base sm:text-lg text-[#BFDBFE]">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="relative min-h-[320px] lg:min-h-full">
        <Image src={image} alt="" fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
      </div>
    </section>
    </>
  );
}
