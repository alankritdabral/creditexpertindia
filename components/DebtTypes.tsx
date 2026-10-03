"use client";

import React from "react";
import Image from "next/image";

export function DebtTypes() {
  return (
    <section className="w-full py-20 bg-[#f7f9fc] border-y border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">

        <div className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(40,50,100,0.1)] border border-white">
          <Image
            src="/logos/5images.png"
            alt="Loan Solutions Overview"
            width={2400}
            height={1600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}
