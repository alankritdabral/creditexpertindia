import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, jsonLd } from "@/lib/structuredData";
import { articles } from "@/content/articles";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seoTitle ?? a.title,
    description: a.summary,
    path: `/learning-center/${a.slug}`,
    type: "article",
    image: { url: `/learning-center/${a.slug}/opengraph-image`, width: 1200, height: 630, alt: a.title },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <div className="min-h-screen bg-white text-[#0A2540]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(a)) }} />
      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Learning Center", path: "/learning-center" },
          { name: a.title },
        ]}
      />
      <article className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <Link href="/learning-center" className="text-base font-semibold text-[#0052CC] hover:underline">
          ← Learning center
        </Link>
        <h1 className="mt-6 text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold max-w-4xl">
          {a.title}
        </h1>
        <p className="mt-3 text-sm text-[#3C4F69]">
          Published {formatDate(a.publishedAt)}
          {a.updatedAt !== a.publishedAt && <> · Updated {formatDate(a.updatedAt)}</>}
        </p>
        <p className="mt-5 text-xl leading-relaxed text-[#3C4F69] max-w-2xl">{a.summary}</p>
        <div className="mt-12 max-w-2xl space-y-10">
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[32px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-[#3C4F69]">{p}</p>
              ))}
            </section>
          ))}
          <p className="text-sm text-[#3C4F69]">
            This article is general information, not financial advice. Approval, rates and terms are decided by
            the lender.
          </p>
        </div>
      </article>
      <LeadForm />
    </div>
  );
}
