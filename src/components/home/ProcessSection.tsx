import React from "react";
import { HOW_WE_WORK_STEPS } from "@/data/siteData";
import { Compass, Palette, Code2, Rocket } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const stepIcons = [
    <Compass key="1" className="w-5 h-5 text-sky-400" />,
    <Palette key="2" className="w-5 h-5 text-indigo-400" />,
    <Code2 key="3" className="w-5 h-5 text-blue-400" />,
    <Rocket key="4" className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#090e17] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-sky-400/20 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span>04 / Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How we <span className="text-gradient-cyan">work</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A battle-tested 4-step delivery pipeline engineered to eliminate ambiguity and deliver measurable outcomes on schedule.
          </p>
        </div>

        {/* Process Steps Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Subtle horizontal connecting bar for desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-sky-500/40 via-blue-500/40 to-emerald-500/40 pointer-events-none z-0" />

          {HOW_WE_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative z-10 glass-card p-6 rounded-2xl border border-white/10 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shadow-lg">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-mono text-xs font-bold text-sky-400 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                    Step {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                <p className="text-xs font-mono text-sky-300 mb-3">{step.tagline}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Phase 0{idx + 1}</span>
                <span>Verified Milestones</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
