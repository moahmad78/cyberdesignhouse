import React from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_METADATA } from "@/data/siteData";

export const IntroSection: React.FC = () => {
  const highlights = [
    {
      number: "01",
      title: "One Team From Idea to Launch",
      description: "No fragmented handoffs or finger-pointing. Strategy, engineering, design, and growth live under one single roof.",
      bullets: [
        "Turnkey delivery from design to cloud",
        "100% in-house talent, zero outsourcing",
      ],
    },
    {
      number: "02",
      title: "Design-Led and Motion-Ready",
      description: "We bring the tactile beauty of a boutique design atelier to high-availability web and mobile software architectures.",
      bullets: [
        "3D interactive interfaces & smooth motion",
        "Core Web Vitals < 2.5s & sub-second load",
      ],
    },
    {
      number: "03",
      title: "Clear Timelines & Honest Terms",
      description: "Transparent sprint roadmaps, realistic milestone commitments, and direct access to senior practitioners.",
      bullets: [
        "Weekly demo builds & live staging previews",
        "30-day warranty & proactive monitoring",
      ],
    },
  ];

  return (
    <section className="py-10 sm:py-14 relative bg-[#fafaf8] overflow-hidden">
      {/* Subtle Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column: Master Manifesto Card (Wider 7-col layout) */}
          <div className="lg:col-span-7 xl:col-span-7 light-card rounded-[24px] p-6 sm:p-8 lg:p-9 bg-white border border-[#e5eaf2] flex flex-col justify-between h-full shadow-[0_2px_16px_rgba(11,22,53,0.04)]">
            <div>
              <span className="font-heading text-[13px] sm:text-[13.5px] uppercase tracking-[0.2em] font-[900] text-[#3b4c68] mb-2 block">
                THE PHILOSOPHY
              </span>
              <h2 className="text-[#071633] text-[clamp(26px,2.8vw,38px)] font-bold leading-[1.1] tracking-[-0.035em] mb-3">
                Technology with the Precision
                <br />
                <span className="text-slate-600 font-normal">of a Design House</span>
              </h2>

              <p className="text-[15px] sm:text-[16.5px] font-normal leading-[1.75] text-[#314158] mb-5 max-w-xl">
                Cyber Design House is the specialized technology arm of{" "}
                <strong className="text-[#071633] font-semibold">{SITE_METADATA.parentCompany}</strong>{" "}
                (Est. {SITE_METADATA.establishedYear}). We unite turnkey architectural execution, strict craftsmanship, and
                enterprise-grade software engineering.
              </p>

              {/* Architectural Capability Line */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                {["Turnkey IT Execution", "Enterprise Web Platforms", "Mobile Applications", "SEO & Digital Growth"].map((badge, idx) => (
                  <span key={badge} className="flex items-center gap-2 text-[11.5px] font-mono tracking-wider uppercase text-[#314158] font-bold">
                    {idx > 0 && <span className="text-slate-300 font-normal mr-2">/</span>}
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Group: Compact Stats Row + Studio Link */}
            <div className="pt-5 mt-6 border-t border-[#e5eaf2]">
              <div className="grid grid-cols-2 gap-6 mb-4 max-w-md">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#071633] tracking-tight">
                    {SITE_METADATA.establishedYear}
                  </div>
                  <div className="text-[11.5px] uppercase tracking-[0.15em] text-[#45556c] mt-0.5 font-bold">
                    VoometDesign Legacy
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#071633] tracking-tight">
                    Bangalore
                  </div>
                  <div className="text-[11.5px] uppercase tracking-[0.15em] text-[#45556c] mt-0.5 font-bold">
                    Studio Headquarters
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#071633] hover:text-[#0c2452] underline underline-offset-4 transition-colors group"
                >
                  <span>Learn about our Bangalore engineering studio</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Sleek Cards (Compact 5-col layout) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between h-full gap-3.5 sm:gap-4">
            {highlights.map((item) => (
              <div
                key={item.number}
                className="light-card rounded-[22px] p-4.5 sm:p-5 lg:p-5.5 bg-white border border-[#e5eaf2] flex-1 flex flex-col justify-center shadow-[0_2px_14px_rgba(11,22,53,0.03)] hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(11,22,53,0.06)] transition-all duration-300"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-mono text-xs font-bold">{item.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#071633] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] sm:text-[13.5px] text-[#314158] font-normal mt-0.5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Compact Bullet Points inside the card */}
                    <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-slate-100">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-slate-600 font-medium">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{bullet}</span>
                        </div>
                      ))}
                    </div>
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
