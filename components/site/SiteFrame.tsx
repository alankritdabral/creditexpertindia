"use client";

import { usePathname } from "next/navigation";

/** Public pages get the header, footer and mobile action bar; staff routes (/admin, /team) get none. */
export function SiteFrame({
  header,
  footer,
  bar,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  bar: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const internal = pathname?.startsWith("/admin") || pathname?.startsWith("/team");

  if (internal) return <main id="main" className="flex-1">{children}</main>;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:font-semibold focus:text-primary focus:shadow-md"
      >
        Skip to main content
      </a>
      {header}
      <main id="main" tabIndex={-1} className="flex-1 pb-20 outline-none lg:pb-0">
        {children}
      </main>
      {footer}
      {bar}
    </>
  );
}
