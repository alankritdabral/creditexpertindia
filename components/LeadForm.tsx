'use client';
import { EligibilityForm } from './EligibilityForm';

export function LeadForm() {
  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-slate-50 relative z-0 overflow-hidden">
      {/* Background slash / clip path element */}
      <div className="absolute inset-0 -z-10 bg-slate-50" style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)' }} />
      <div className="absolute top-0 right-0 -z-10 w-full h-[150%] max-w-[50%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-icy-blue/30 to-transparent pointer-events-none" />
      
      {/* Subtle mesh behind the form */}
      <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply pointer-events-none -z-20" style={{
        background: `
          radial-gradient(circle at 85% 15%, #F7DCCB 0%, transparent 40%),
          radial-gradient(circle at 15% 85%, #E8F5DF 0%, transparent 40%)
        `
      }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <EligibilityForm />
      </div>
    </section>
  );
}
