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
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    <section className="py-20 sm:py-28 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Centered */}
        <SectionHeader
          caption="THE ADVANTAGE"
          titleLine1="Why Cyber Design House"
          titleLine2="Precision Meets Performance"
          description="We combine the meticulous turnkey execution of VoometDesign with deep engineering expertise to deliver software that drives business growth."
          centered
        />

        {/* 6 Cards Grid (VoometDesign Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="light-card p-7 sm:p-8 rounded-[24px] bg-white border border-[#e5eaf2] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#6e7d9b]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#071633] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-[#62748e] mt-1 mb-3 font-semibold uppercase tracking-wider">
                  {card.tagline}
                </p>
                <p className="text-[14px] text-[#45556c] font-light leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6e7d9b] font-semibold uppercase tracking-wider">
                <span>Core Guarantee</span>
                <span className="text-[#071633] font-bold">Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
