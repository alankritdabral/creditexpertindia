import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, jsonLd, type BreadcrumbItem } from "@/lib/structuredData";

/**
 * Renders a visible breadcrumb trail AND its matching BreadcrumbList JSON-LD
 * from the same data, so they can never drift apart like the calculator
 * page's previous hand-written schema did (its item 2 repeated item 3's
 * URL). Google shows breadcrumbs on desktop results only (since Jan 2025),
 * but recommends keeping the markup regardless.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(items)) }} />
      <nav aria-label="Breadcrumb" className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#3C4F69]">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.name} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#3C4F69]/50" aria-hidden="true" />}
                {isLast || !item.path ? (
                  <span aria-current={isLast ? "page" : undefined} className="font-semibold text-[#0A2540]">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-[#0052CC] hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
