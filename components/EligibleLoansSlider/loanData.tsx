import React from "react";
import { IndianRupee, CreditCard, Smartphone, Banknote, Landmark, ArrowDown } from "lucide-react";

export const loanCategories = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    description: "High-interest personal loans can be refinanced at lower rates.",
    image: "/img/marraige.png",
    icon: <IndianRupee className="w-5 h-5 text-blue-600" />,
    renderActiveContent: () => (
      <div className="flex flex-col h-full text-sm">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-2">
          <p className="font-semibold text-slate-800 mb-3 text-base">Existing Loan</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-slate-500">Outstanding</p>
              <p className="font-semibold text-slate-800">₹4,80,000</p>
            </div>
            <div className="border-l border-r border-gray-200">
              <p className="text-xs text-slate-500">Interest Rate</p>
              <p className="font-semibold text-slate-800">16.5%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">EMI</p>
              <p className="font-semibold text-slate-800">₹15,200</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <div className="bg-white rounded-full p-1 border border-gray-100 shadow-sm">
            <ArrowDown className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-4 shadow-md mt-2 flex justify-between items-center">
          <div>
            <p className="text-blue-200 text-xs mb-1">Potential New Rate</p>
            <p className="font-bold text-lg">9.99% p.a.</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-xs mb-1">Potential New EMI</p>
            <p className="font-bold text-lg">₹12,400</p>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 mt-auto pt-4 text-center">
          Illustrative example. Actual eligibility and rates vary.
        </p>
      </div>
    ),
  },
  {
    id: "credit-card",
    title: "Credit Card Loans",
    description: "Convert high-interest credit card dues into a single, lower-interest EMI.",
    image: "/img/creditcard.png",
    icon: <CreditCard className="w-5 h-5 text-blue-600" />,
    renderActiveContent: () => (
      <div className="flex flex-col h-full text-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col gap-2">
             <div className="flex justify-between text-xs"><span className="text-slate-600">HDFC Card</span><span className="font-medium text-slate-800">₹8,200</span></div>
             <div className="flex justify-between text-xs"><span className="text-slate-600">SBI Card</span><span className="font-medium text-slate-800">₹6,450</span></div>
             <div className="flex justify-between text-xs"><span className="text-slate-600">Axis Card</span><span className="font-medium text-slate-800">₹7,890</span></div>
             <div className="flex justify-between text-xs"><span className="text-slate-600">ICICI Card</span><span className="font-medium text-slate-800">₹5,600</span></div>
             <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                <div>
                   <p className="text-[10px] text-slate-500">Before: 36–42% p.a.</p>
                   <p className="text-xs text-slate-700 font-medium">Total EMI</p>
                </div>
                <p className="font-bold text-slate-800">₹28,140</p>
             </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-3 flex flex-col justify-center items-center text-center relative">
               <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 border border-gray-200 z-10 hidden md:block">
                  <ArrowDown className="w-4 h-4 text-blue-500 -rotate-90" />
               </div>
               <p className="text-xs text-blue-600 font-medium mb-1">One EMI</p>
               <p className="font-bold text-slate-900 text-lg">₹12,500</p>
               <p className="text-xs text-slate-600">@ 9.99% p.a.</p>
            </div>
            
            <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
               <p className="text-[10px] text-emerald-700 uppercase font-bold tracking-wide">Potential EMI Difference</p>
               <p className="font-bold text-emerald-600 text-lg">₹15,640 / month</p>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 mt-auto text-center">
          Illustrative EMI difference. Example for visualization purposes only.
        </p>
      </div>
    ),
  },
  {
    id: "app-loans",
    title: "App Loans",
    description: "Combine multiple app loans and reduce your total interest outgo.",
    image: "/img/teenager.png",
    icon: <Smartphone className="w-5 h-5 text-blue-600" />,
    renderActiveContent: () => (
      <div className="flex flex-col h-full text-sm">
        <div className="flex gap-4 items-center mb-6 px-4">
          <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 text-center relative">
             <p className="text-xs text-slate-500 mb-2">Multiple App EMIs</p>
             <div className="flex flex-col gap-1 text-slate-800 font-medium">
                <span>₹4,200</span>
                <span>₹3,800</span>
                <span>₹5,100</span>
                <span>₹2,900</span>
             </div>
          </div>
          
          <ArrowDown className="w-5 h-5 text-slate-300 -rotate-90 flex-shrink-0" />

          <div className="flex-1 bg-blue-600 rounded-xl p-4 text-center text-white shadow-md">
             <p className="text-xs text-blue-200 mb-2">One Consolidated EMI</p>
             <p className="font-bold text-xl">₹10,900*</p>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 mt-auto text-center">
          *Illustrative example. Actual terms depend on eligibility.
        </p>
      </div>
    ),
  },
  {
    id: "multiple-loans",
    title: "Multiple Loans",
    description: "Merge multiple EMIs into one simple, affordable EMI.",
    image: "/img/multipleloans.png",
    icon: <Banknote className="w-5 h-5 text-blue-600" />,
    renderActiveContent: () => (
      <div className="flex flex-col h-full text-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-6">
          <div className="flex-1 flex flex-col gap-2">
             <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 flex justify-between items-center">
               <span className="text-xs text-slate-500">Personal Loan</span>
               <span className="text-sm font-semibold text-slate-700">₹8,500 EMI</span>
             </div>
             <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 flex justify-between items-center">
               <span className="text-xs text-slate-500">Credit Card</span>
               <span className="text-sm font-semibold text-slate-700">₹6,200 EMI</span>
             </div>
             <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 flex justify-between items-center">
               <span className="text-xs text-slate-500">App Loan</span>
               <span className="text-sm font-semibold text-slate-700">₹4,100 EMI</span>
             </div>
          </div>
          
          <div className="flex items-center justify-center">
             <ArrowDown className="w-5 h-5 text-blue-400 rotate-0 sm:-rotate-90" />
          </div>

          <div className="flex-1 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center text-center text-white shadow-md">
             <p className="text-xs text-slate-400 mb-1">ONE EMI</p>
             <p className="font-bold text-2xl">₹12,900*</p>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 mt-auto text-center">
          *Illustrative example. Actual rates and EMI may vary.
        </p>
      </div>
    ),
  },
  {
    id: "overdraft",
    title: "Overdraft / OD",
    description: "Refinance eligible OD facilities at potentially lower interest rates.",
    image: "/img/od.png",
    icon: <Landmark className="w-5 h-5 text-blue-600" />,
    renderActiveContent: () => (
      <div className="flex flex-col h-full text-sm">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-2 text-center">
          <p className="font-semibold text-slate-800 mb-4">Existing OD</p>
          <div className="flex justify-around">
            <div>
              <p className="text-xs text-slate-500 mb-1">Utilized Amount</p>
              <p className="font-semibold text-slate-800 text-lg">₹7,50,000</p>
            </div>
            <div className="w-[1px] bg-gray-200"></div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Current Rate</p>
              <p className="font-semibold text-slate-800 text-lg">15.5%</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <div className="bg-white rounded-full p-1 border border-gray-100 shadow-sm">
            <ArrowDown className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-2 text-center">
          <p className="text-xs text-blue-600 font-medium mb-1">Potential New Rate</p>
          <p className="font-bold text-blue-700 text-2xl">9.99%*</p>
        </div>

        <p className="text-[10px] text-slate-400 mt-auto pt-4 text-center">
          *Indicative rate. Subject to eligibility.
        </p>
      </div>
    ),
  }
];
