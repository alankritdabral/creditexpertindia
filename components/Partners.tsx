'use client';
import React from 'react';

const banks = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Mahindra" },
  { id: "indusind", name: "IndusInd Bank" },
  { id: "yes", name: "Yes Bank" },
  { id: "idfc", name: "IDFC First" },
  { id: "federal", name: "Federal Bank" },
  { id: "bandhan", name: "Bandhan Bank" },
  { id: "rbl", name: "RBL Bank" },
  { id: "southindian", name: "South Indian Bank" },
  { id: "cityunion", name: "City Union Bank" },
  { id: "dcb", name: "DCB Bank" },
  { id: "dhanlaxmi", name: "Dhanlaxmi Bank" },
  { id: "csb", name: "CSB Bank" },
  { id: "karnataka", name: "Karnataka Bank" },
  { id: "kvb", name: "Karur Vysya" },
  { id: "tmb", name: "TMB" },
  { id: "jk", name: "J&K Bank" },
  { id: "nainital", name: "Nainital Bank" },
  { id: "idbi", name: "IDBI Bank" }
];

const duplicatedBanks = [...banks, ...banks];

export function Partners() {
  return (
    <div className="bg-white py-12 border-b border-hairline overflow-hidden w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="text-[14px] font-semibold tracking-[0.5px] leading-[1.15] text-ink-mute uppercase">
            Trusted by 21+ banks of India
          </p>
        </div>
        
        <div className="relative flex overflow-hidden w-full opacity-60 grayscale transition-all duration-500 hover:grayscale-0">
          <div className="animate-marquee flex items-center gap-16 whitespace-nowrap min-w-max py-4">
            {duplicatedBanks.map((bank, i) => (
              <div key={i} className="flex items-center gap-3">
                <img 
                  src={`/logos/${bank.id}.png`} 
                  alt={bank.name} 
                  className="h-8 w-8 object-contain rounded-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-[20px] font-semibold text-ink-mute tracking-tight">{bank.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
