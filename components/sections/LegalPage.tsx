/** Readable long-form layout for the legal pages. The wording lives in each page, not here. */
export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <div className="bg-page py-12 lg:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <h1 className="text-[32px] font-bold leading-10 tracking-tight sm:text-4xl">{title}</h1>
        {updated ? <p className="mt-2 text-sm text-ink-muted">Last updated: {updated}</p> : null}
        <div className="mt-8 rounded-xl border border-line bg-surface p-6 text-base leading-7 sm:p-10 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-1.5 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
