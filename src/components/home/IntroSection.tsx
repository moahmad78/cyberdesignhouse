import React from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_METADATA } from "@/data/siteData";

export const IntroSection: React.FC = () => {
  const points = [
    "Established 2010 — 250+ enterprise & residential projects delivered across India",
    "Single-Point Turnkey IT: Full-cycle software development from design through cloud deployment",
    "Speed & Reliability: Sprint-driven deliveries with rapid prototyping and weekly demonstrable builds",
    "Design-Led Engineering: 3D interactive interfaces, modern motion, and ultra-high speed web architectures",
    "In-House End-to-End Execution: No outsourced developers or junior handoffs",
    "Enterprise Rigor: Strict automated testing, Core Web Vitals < 2.5s, and SEO-first markup",
  ];

  const highlights = [
    {
      title: "One Team From Idea to Launch",
      description: "No fragmented handoffs or finger-pointing. Strategy, engineering, design, and growth live under one single roof.",
    },
    {
      title: "Design-Led and Motion-Ready",
      description: "We bring the tactile beauty of a boutique design atelier to high-availability web and mobile software architectures.",
    },
    {
      title: "Clear Timelines & Honest Terms",
      description: "Transparent sprint roadmaps, realistic milestone commitments, and direct access to senior practitioners.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-[#fafaf8] overflow-hidden">
      {/* Subtle Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Description (VoometDesign Our Story pattern) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] mb-2.5 block">
                THE PHILOSOPHY
              </span>
              <h2 className="text-[#071633] text-[clamp(34px,3.8vw,52px)] font-bold leading-[1.02] tracking-[-0.035em] mb-4">
                Technology with the Precision
                <br />
                <span className="text-slate-500 font-light">of a Design House</span>
              </h2>
            </div>

            <p className="text-[15px] sm:text-[16px] md:text-[17px] font-light leading-[1.85] text-slate-600">
              Cyber Design House is the specialized technology arm of{" "}
              <strong className="text-[#071633] font-semibold">{SITE_METADATA.parentCompany}</strong>,
              an established Bangalore studio founded in {SITE_METADATA.establishedYear}. We bring the same
              end-to-end turnkey execution, strict material craftsmanship, and uncompromising quality standards to
              cutting-edge web applications, mobile platforms, and high-growth digital infrastructure.
            </p>

            {/* Checklist items in VoometDesign check style */}
            <div className="pt-2">
              <ul className="space-y-3">
                {points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 text-[14px] md:text-[15px] font-[500] leading-snug">
                    <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center shrink-0 mt-0.5 text-[#071633]">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Row with VoometDesign style */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#e5eaf2]">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#071633] tracking-tight">
                  {SITE_METADATA.establishedYear}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#6e7d9b] mt-1 font-semibold">
                  VoometDesign Legacy
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#071633] tracking-tight">
                  Bangalore
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#6e7d9b] mt-1 font-semibold">
                  Studio Headquarters
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#071633] hover:text-blue-600 transition-colors group"
              >
                <span>Learn about our Bangalore engineering studio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: VoometDesign Cards (rounded-[24px], border, soft shadow) */}
          <div className="lg:col-span-6 space-y-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="light-card p-7 sm:p-8 rounded-[24px] bg-white border border-[#e5eaf2]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#071633] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-[#45556c] font-light mt-1.5 leading-relaxed">
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
