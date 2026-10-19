import React from "react";
import { CheckCircle2, Shield, Award, Users } from "lucide-react";
import { SITE_METADATA } from "@/data/siteData";

export const IntroSection: React.FC = () => {
  const highlights = [
    {
      title: "One team from idea to launch",
      description: "No fragmented handoffs or finger-pointing. Strategy, engineering, design, and growth live under one single roof.",
    },
    {
      title: "Design-led & motion-ready",
      description: "We bring the tactile beauty of a boutique design atelier to high-availability cloud and mobile software architectures.",
    },
    {
      title: "Clear timelines & honest communication",
      description: "Transparent sprint roadmaps, realistic milestone commitments, and direct access to senior practitioners.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-[#0b111c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Heritage */}
          <div className="lg:col-span-6 space-y-6">


            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Technology with the precision of a{" "}
              <span className="text-gradient-cyan">design house</span>.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Cyber Design House is the technology arm of{" "}
              <strong className="text-white font-semibold">{SITE_METADATA.parentCompany}</strong>,
              a Bangalore studio established in {SITE_METADATA.establishedYear}. We bring the same
              end-to-end ownership, from planning to launch, to software and digital growth.
            </p>

            {/* Stats Row (Section 6.1) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-400">
                  {SITE_METADATA.establishedYear}
                </div>
                <div className="text-xs text-slate-400 mt-1">Design Legacy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-1">In-House Team</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                  Sub-2s
                </div>
                <div className="text-xs text-slate-400 mt-1">Speed Standard</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Highlights Cards */}
          <div className="lg:col-span-6 space-y-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-sky-400/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
