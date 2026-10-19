import React from "react";
import { Check } from "lucide-react";
import { SITE_METADATA } from "@/data/siteData";

export const IntroSection: React.FC = () => {
  const highlights = [
    {
      title: "One team from idea to launch",
      description: "No fragmented handoffs or finger-pointing. Strategy, engineering, design, and growth live under one single roof.",
    },
    {
      title: "Design-led and motion-ready",
      description: "We bring the tactile beauty of a boutique design atelier to high-availability web and mobile software architectures.",
    },
    {
      title: "Clear timelines and honest communication",
      description: "Transparent sprint roadmaps, realistic milestone commitments, and direct access to senior practitioners.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#fafaf8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Two-Tone Heading & Copy (Section 3.6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Small uppercase caption label (PRD 3.3 & 3.6) */}
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block">
              The Philosophy
            </span>

            {/* Two-Tone H2: Line 1 semibold navy #071633, Line 2 light slate #62748e */}
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#071633] tracking-tight leading-tight">
              Technology with the precision of a{" "}
              <span className="font-light text-[#62748e] block">design house.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#45556c] font-light leading-relaxed">
              Cyber Design House is the technology arm of{" "}
              <strong className="text-[#071633] font-semibold">{SITE_METADATA.parentCompany}</strong>,
              a Bangalore studio established in {SITE_METADATA.establishedYear}. We bring the same
              end-to-end ownership, from planning to launch, to software and digital growth.
            </p>

            {/* Stats Row (Section 3.6 & 6.1: Large numerals) */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#e5eaf2]">
              <div>
                <div className="text-3xl sm:text-4xl font-semibold text-[#071633]">
                  {SITE_METADATA.establishedYear}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#6e7d9b] mt-1 font-medium">
                  VoometDesign Legacy
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-semibold text-[#071633]">
                  Bangalore
                </div>
                <div className="text-xs uppercase tracking-wider text-[#6e7d9b] mt-1 font-medium">
                  Studio Headquarters
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Highlights Cards (White surface with light border - PRD 3.6) */}
          <div className="lg:col-span-6 space-y-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="light-card p-6 sm:p-7 rounded-2xl bg-white border border-[#e5eaf2]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#071633]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#45556c] font-light mt-1.5 leading-relaxed">
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
