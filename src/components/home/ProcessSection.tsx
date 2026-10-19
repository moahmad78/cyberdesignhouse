import React from "react";
import { HOW_WE_WORK_STEPS } from "@/data/siteData";
import { Compass, Palette, Code2, Rocket } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const stepIcons = [
    <Compass key="1" className="w-5 h-5 text-[#071633]" />,
    <Palette key="2" className="w-5 h-5 text-[#071633]" />,
    <Code2 key="3" className="w-5 h-5 text-[#071633]" />,
    <Rocket key="4" className="w-5 h-5 text-[#071633]" />,
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Caption label, Two-tone H2 (PRD 3.6) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#071633] tracking-tight leading-tight">
            How we work. <br />
            <span className="font-light text-[#62748e]">From discovery to ongoing scale.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#45556c] font-light">
            A structured 4-step delivery pipeline engineered to eliminate ambiguity and deliver measurable outcomes on schedule.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_WE_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="light-card p-6 sm:p-7 rounded-2xl bg-white border border-[#e5eaf2] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#071633]">
                    Phase {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#071633] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-[#62748e] mb-3 font-normal">{step.tagline}</p>
                <p className="text-sm text-[#45556c] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6e7d9b] font-medium">
                <span>Verified Milestone</span>
                <span>Sign-off</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
