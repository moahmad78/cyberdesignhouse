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
    <Layers key="1" className="w-5 h-5 text-sky-400" />,
    <Sparkles key="2" className="w-5 h-5 text-cyan-300" />,
    <Zap key="3" className="w-5 h-5 text-amber-400" />,
    <TrendingUp key="4" className="w-5 h-5 text-emerald-400" />,
    <MessageSquare key="5" className="w-5 h-5 text-indigo-400" />,
    <LifeBuoy key="6" className="w-5 h-5 text-blue-400" />,
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#0b111c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-sky-400/20 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span>05 / Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why partner with <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Cyber Design House</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            We operate at the exact intersection of visionary design and uncompromising engineering rigor.
          </p>
        </div>

        {/* 6 Tilt Grid Cards (Section 6.1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="glass-card group p-8 rounded-2xl border border-white/5 hover:border-sky-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(56,189,248,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-sky-400/50 transition-all">
                  {icons[idx]}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-sky-400 mt-1 mb-3">{card.tagline}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Advantage 0{idx + 1}</span>
                <span className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Standard Guarantee
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
