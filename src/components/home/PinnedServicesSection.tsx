"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SERVICES } from "@/data/siteData";
import { ArrowRight, Check } from "lucide-react";

const Services3DViewer = dynamic(
  () => import("@/components/3d/Services3DViewer").then((mod) => mod.Services3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#071633] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export const PinnedServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = SERVICES[activeTab];

  return (
    <section id="services-section" className="py-24 sm:py-32 bg-[#f8fafc] border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Caption label, Two-tone H2, Description on right (PRD 3.6) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#071633] tracking-tight leading-tight">
              Four Core Disciplines. <br />
              <span className="font-light text-[#62748e]">One Dedicated Team.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#45556c] font-light max-w-md">
            From conversion-driven web architectures to native mobile apps and high-intent acquisition campaigns in Bangalore.
          </p>
        </div>

        {/* Filter Chips / Tabs (Section 3.6: small uppercase pills, active one filled) */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10">
          {SERVICES.map((s, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={s.slug}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#071633] text-white shadow-sm"
                    : "bg-white text-[#45556c] border border-[#e5eaf2] hover:border-slate-300 hover:text-[#071633]"
                }`}
              >
                <span>{s.number}. </span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Panel: White surface with #e5eaf2 border & soft shadow (PRD 3.2 & 3.6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl bg-white p-6 sm:p-10 lg:p-12 border border-[#e5eaf2] shadow-sm">
          {/* Left Column: Semantic Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-bold text-[#071633]">
                {activeService.number}
              </span>
              <div className="h-5 w-[1px] bg-slate-200" />
              <span className="text-xs uppercase tracking-widest text-[#6e7d9b] font-medium">
                Service Specification
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#071633]">
                {activeService.title}
              </h3>
              <p className="text-base sm:text-lg text-[#314158] font-normal mt-2 leading-relaxed">
                {activeService.oneLine}
              </p>
            </div>

            {/* Checklists: Thin check icons with navy text (PRD 3.6) */}
            <ul className="space-y-3 pt-2">
              {activeService.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#314158]">
                  <div className="p-0.5 rounded bg-slate-100 text-[#071633] mt-0.5 shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Core Stack row */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#6e7d9b] block mb-2 font-medium">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {activeService.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#f8fafc] border border-[#e5eaf2] text-xs text-[#45556c] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* View More Link (PRD 3.6: Navy pill button or text link with arrow) */}
            <div className="pt-4">
              <Link
                href={`/services/${activeService.slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm group"
              >
                <span>View More & Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Scene Layer */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] bg-[#f8fafc] rounded-2xl border border-[#e5eaf2]">
            <Services3DViewer activeIndex={activeTab} />
          </div>
        </div>
      </div>
    </section>
  );
};
