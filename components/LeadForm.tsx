'use client';
import { EligibilityForm } from './EligibilityForm';

export function LeadForm() {
  return (
    <section id="lead-form" className="py-16 md:py-24 bg-[#EAF3FF]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <EligibilityForm />
      </div>
    </section>
  );
}
