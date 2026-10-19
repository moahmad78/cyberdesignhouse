"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SERVICES } from "@/data/siteData";
import { ArrowRight, Check, Code, Smartphone, Search, BarChart3 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

  const serviceIcons = [
    <Code key="web" className="w-5 h-5 text-white" />,
    <Smartphone key="app" className="w-5 h-5 text-white" />,
    <Search key="seo" className="w-5 h-5 text-white" />,
    <BarChart3 key="mkt" className="w-5 h-5 text-white" />,
  ];

  const serviceImages = [
    "/images/work/web-dev-preview.jpg",
    "/images/work/app-dev-preview.jpg",
    "/images/work/seo-preview.jpg",
    "/images/work/mkt-preview.jpg",
  ];

  return (
    <section id="services-section" className="py-20 sm:py-28 bg-[#f8fafc] border-t border-[#e5eaf2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Caption, H2 Two-Tone, Description on right */}
        <SectionHeader
          caption="SERVICES"
          titleLine1="Our Core Capabilities"
          titleLine2="Tailored Digital Products"
          description="Tailored solutions across bespoke web architectures, native mobile platforms, technical SEO indexing, and lead-generating performance marketing."
        />

        {/* VoometDesign Signature Expandable Accordion Service Cards */}
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:h-[340px] lg:h-[380px] mb-12">
          {SERVICES.map((service, idx) => {
            const isSelected = activeTab === idx;
            return (
              <div
                key={service.slug}
                onClick={() => setActiveTab(idx)}
                className={`relative w-full rounded-[28px] overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none h-[280px] md:h-full ${
                  isSelected ? "md:flex-[3.2] ring-2 ring-[#071633]" : "md:flex-1 md:hover:flex-[1.8]"
                } hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(11,22,53,0.14)]`}
              >
                {/* Background image preview */}
                <Image
                  src={serviceImages[idx]}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out z-0"
                />

                {/* VoometDesign Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/45 to-transparent group-hover:from-[#0f172a]/95 group-hover:via-[#0f172a]/60 transition-colors duration-700 z-10" />

                {/* Content inside card */}
                <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between">
                  {/* Top: Icon Badge in Frosted Glass Circle */}
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                    {serviceIcons[idx]}
                  </div>

                  {/* Bottom: Title & Details */}
                  <div className="w-full flex flex-col items-start mt-auto">
                    {/* Collapsed state title for tablet/desktop */}
                    <div
                      className={`w-full transition-all duration-500 ${
                        isSelected
                          ? "hidden"
                          : "md:block md:[writing-mode:vertical-rl] md:rotate-180 md:opacity-90"
                      }`}
                    >
                      <h3 className="text-white text-[20px] lg:text-[24px] font-bold tracking-tight mb-1 drop-shadow-md whitespace-nowrap">
                        {service.title}
                      </h3>
                    </div>

                    {/* Expanded details (visible when card is selected or on mobile) */}
                    <div
                      className={`w-full transition-all duration-500 ${
                        isSelected ? "block" : "block md:hidden"
                      }`}
                    >
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 block mb-1">
                        Phase {service.number}
                      </span>
                      <h3 className="text-white text-[24px] lg:text-[28px] font-bold tracking-tight mb-2 drop-shadow-md">
                        {service.title}
                      </h3>
                      <p className="text-slate-200 text-[13px] lg:text-[14px] leading-relaxed font-light line-clamp-2 mb-4 max-w-sm">
                        {service.oneLine}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] md:text-[13px] font-semibold tracking-widest text-white uppercase bg-white/10 hover:bg-white hover:text-[#0f172a] backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full shadow-sm transition-all"
                      >
                        <span>Explore Specification</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed 3D Showcase Panel (VoometDesign Card Style) */}
        <div className="light-card rounded-[28px] bg-white p-6 sm:p-10 lg:p-12 border border-[#e5eaf2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Semantic Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-bold text-[#071633]">
                  {activeService.number}
                </span>
                <div className="h-5 w-[1px] bg-slate-200" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#6e7d9b] font-semibold">
                  Technical Deliverables
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#071633] tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#45556c] font-light mt-2 leading-relaxed">
                  {activeService.oneLine}
                </p>
              </div>

              {/* Checklists: VoometDesign check icon style */}
              <ul className="space-y-3 pt-2">
                {activeService.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center shrink-0 mt-0.5 text-[#071633]">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#6e7d9b] block mb-2 font-semibold">
                  Engineering Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-xs text-[#45556c] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navy pill button link */}
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href={`/services/${activeService.slug}`}
                  className="h-[48px] px-7 rounded-full bg-[#071633] text-white font-medium text-[14px] tracking-wide shadow-[0_8px_24px_rgba(7,22,51,0.15)] hover:shadow-[0_12px_30px_rgba(7,22,51,0.22)] transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="h-[48px] px-6 rounded-full border border-[#071633]/15 text-[#071633] font-medium text-[14px] hover:bg-slate-50 transition-colors flex items-center"
                >
                  Consult Team
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive 3D Canvas */}
            <div className="lg:col-span-6 bg-[#fafaf8] rounded-[24px] border border-[#e5eaf2] p-4 relative overflow-hidden">
              <div className="w-full h-[360px] sm:h-[420px]">
                <Services3DViewer activeIndex={activeTab} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
