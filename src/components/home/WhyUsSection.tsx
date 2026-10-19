import React from "react";
import { WHY_CHOOSE_US_CARDS } from "@/data/siteData";
import {
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
  MessageSquare,
  LifeBuoy,
} from "lucide-react";

export const WhyUsSection: React.FC = () => {
  const icons = [
    <Layers key="1" className="w-5 h-5 text-[#071633]" />,
    <Sparkles key="2" className="w-5 h-5 text-[#071633]" />,
    <Zap key="3" className="w-5 h-5 text-[#071633]" />,
    <TrendingUp key="4" className="w-5 h-5 text-[#071633]" />,
    <MessageSquare key="5" className="w-5 h-5 text-[#071633]" />,
    <LifeBuoy key="6" className="w-5 h-5 text-[#071633]" />,
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Caption label, Two-tone H2 (PRD 3.6) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
            The Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#071633] tracking-tight leading-tight">
            Why Cyber Design House. <br />
            <span className="font-light text-[#62748e]">Aesthetics meet engineering rigor.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#45556c] font-light">
            We operate at the exact intersection of visionary design and uncompromising technical execution.
          </p>
        </div>

        {/* 6 Cards Grid (White cards, thin light border, soft shadow - PRD 3.6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="light-card p-8 rounded-2xl bg-white border border-[#e5eaf2] flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center mb-6">
                  {icons[idx]}
                </div>

                <h3 className="text-lg font-semibold text-[#071633]">
                  {card.title}
                </h3>
                <p className="text-xs text-[#62748e] mt-1 mb-3 font-normal">{card.tagline}</p>
                <p className="text-sm text-[#45556c] font-light leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6e7d9b] font-medium">
                <span>0{idx + 1}</span>
                <span>Standard Delivery</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
